import * as P from 'ts-prime'
import { Documentation } from './types'
export function getPackageName(data: Documentation) {
    return {
        name: data.name,
        version: data.version
    }
}

export function excerptTokensToString(data: ReadonlyArray<Documentation.ExcerptToken>) {
    return data.map((q) => q.text).join("").replace(/\s+/gm, ' ').replace("declare", '').replace(/ +/, ' ')
}

function extractCommentsOf(name: string, declaration: string, dtsContent: string) {
    const lines = dtsContent.split("\n")
    
    const findLine = () => {
        const r = lines.findIndex((q) => {
            return q.replace("declare", '').replace(/ +/, ' ').includes(declaration)
        })
        if (r !== -1) {
            return r
        }
        return lines.findIndex((q) => {
            return q.includes("export") && q.includes(name)
        })

    }

    const declarationIndex = findLine()
    if (declarationIndex === -1) {
        throw new Error("Failed to find declaration")
    }
    
    const comments: Array<string> = []
    let track = declarationIndex - 1
    let line = lines[track]
    while (true) {
       
        const match = line.match(/((\/\*\*)|(^( ?\*\/?)))|(\/\/)/gm)
        if (match == null) {
            break
        }
        comments.push(line)
        track = track - 1
        line = lines[track]
    }

    // const comments = [lines[16], lines[15], lines[14], lines[13], lines[12], lines[11], lines[10], lines[9]].reverse()
    return comments.reverse().join("\n")
}
export function getMembers(data: Documentation, dtsContent: string) {
    const members = data.members.find((q) => q.kind === 'EntryPoint')
    if (members == null) throw new Error("Failed to find entry point")
    return P.pipe(
        members.members,
        P.map((w) => {
            return {
                kind: w.kind,
                name: w.name,
                comment: parseComment(extractCommentsOf(w.name, excerptTokensToString(w.excerptTokens), dtsContent)),
                excerptTokens: w.excerptTokens,
                canonicalReference: w.canonicalReference,
                package: w.canonicalReference.replace(/(!.+)/gm, ''),
                canonicalReferenceGroup: w.canonicalReference.replace(/(:.*)/, '')
            }
        }),
        P.groupBy((q) => q.canonicalReferenceGroup),
        P.mapRecord(([k, v]) => [k, P.omit({ members: v.map((q) => P.omit(q, ['name', 'package'])), ...v[0] }, ['excerptTokens', 'comment'])]),
        P.mapRecord(([k, v]) => {
            const tags = P.pipe(
                v.members,
                P.flatMap((q) => {
                    return q.comment.parsed
                        .filter((q) => ["@category", "@pipe"].includes(q.tag))
                        .flatMap((q) => {
                            if (P.isArray(q.content)) {
                                return q.content.map((z) => {
                                    return {
                                        tag: q.tag,
                                        value: z
                                    }
                                });
                            }
                            return [];
                        })
                }
                ),
                P.uniqBy((q) => `${q.tag}/${q.value}`),
                P.filter((q) => q.tag !== "/")
            )

            return [k, { ...v, tags }]
        }),
        P.toPairs,
        P.map(([, v]) => v)
    )
}

export function parseComment(comment: string) {
    const row = comment.replace(/(?:\/\*\*)?\*(.*)(?:\s+\*\/)?/gm, '$1').replace("/*", '').trim().replace(/(@\w+)/gm, "###$1").split("###").map((q) => q.trim())
    const description = row.filter((q) => !/\@\w+/.test(q))[0]
    const parsed = row.filter((q) => /\@\w+/.test(q)).map((w) => {
        const cc = w.replace(/(\@\w+)/, '$1##').split("##")
        const tag = cc[0]

        const content = P.pipe(cc.slice(1), P.flatMap((q) => q.split("\n").map((q) => q.trim()).filter((q) => q)))
        if (tag === '@param') {
            return {
                tag,
                content: content.map((q) => {
                    return {
                        description: q.replace(/\w+/, '').trim().replace(/^-/, '').trim(),
                        name: q.match(/\w+/)?.[0]
                    }
                })[0]
            }
        }

        if (tag === '@example') {
            return {
                tag,
                content: [content.join("\n")]
            }
        }
        return {
            tag,
            content: content.flatMap((q) => q.split(",").map((q) => q.trim()))
        }
    })

    const prettifyExample = () => {
        const example = parsed.find((q) => q.tag === '@example')?.content as ReadonlyArray<string> | undefined
        if (example == null) return
        return `${example[0]}`
    }



    return {
        description,
        example: prettifyExample(),
        parsed: parsed.filter((q) => q.tag !== '@example'),
    }
}

