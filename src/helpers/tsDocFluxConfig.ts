import { existsSync, readdir, readJson } from 'fs-extra'
import { extname, resolve } from 'path'
import * as zod from 'zod'
import * as P from 'ts-prime'

export type TsDocFluxConfig = zod.TypeOf<typeof TsDocFluxConfig.EXTRACTED_SCHEMA>
export namespace TsDocFluxConfig {
    export const PARTIAL_SCHEMA = zod.object({
        extends: zod.union([
            zod.string(),
            zod.array(zod.string())
        ]).optional(),
        mainEntryPointFilePath: zod.string().optional()
    })


    export const EXTRACTED_SCHEMA = zod.object({
        mainEntryPointFilePath: zod.string()
    })

    export type PartialTsDocFluxConfig = zod.TypeOf<typeof TsDocFluxConfig.PARTIAL_SCHEMA>

    export interface GetOptions {
        rootFolder: string
    }

    export async function fromFile(options: { filePath: string }): Promise<Error | PartialTsDocFluxConfig> {
        if (extname(options.filePath) === '.json') {
            const result = await readJson(options.filePath)
            return P.canFail(() => PARTIAL_SCHEMA.nonstrict().parse(result))
        }

        if (extname(options.filePath) === '.jsonc') {
            const result = await readJson(options.filePath)
            console.log(result)
            return P.canFail(() => PARTIAL_SCHEMA.nonstrict().parse(result))
        }

        if (extname(options.filePath) === '.js') {
            const result = require(options.filePath)
            return P.canFail(() => PARTIAL_SCHEMA.nonstrict().parse(result))
        }

        return new Error(`Unknown file format. ${options.filePath}`)
    }

    export async function get(options: GetOptions): Promise<TsDocFluxConfig | Error> {
        const getConfig = async () => {
            const packageJSON = await readJson(resolve(options.rootFolder, 'package.json'))
            const generatedSchema = PARTIAL_SCHEMA
            const tsDocFluxPackageJSONConfig = zod.object({
                tsDocFluxConfig: generatedSchema
            }).nonstrict()

            if ('tsDocFluxConfig' in packageJSON) {
                const out = P.canFail(() => tsDocFluxPackageJSONConfig.parse(packageJSON))
                if (P.isError(out)) return out

                return extract({
                    config: out.tsDocFluxConfig
                })
            }

            const files = await readdir(options.rootFolder)

            const file = P.first(P.sortBy(files.filter((f) => f.startsWith("ts-docflux.config")), (q) => q))
            if (file == null) {
                return new Error(`Failed to find ts-docflux config. Please execute "ts-docflux init"`)
            }

            const config = await fromFile({ filePath: resolve(options.rootFolder, file) })
            if (P.isError(config)) return config

            return extract({ config })
        }

        const baseConfig = await getConfig()
        if (P.isError(baseConfig)) return baseConfig

        return P.canFail(() => EXTRACTED_SCHEMA.parse(P.omit(baseConfig, ['extends'])))
    }

    export interface ExtractOptions {
        config: PartialTsDocFluxConfig
    }


    export async function extract(options: ExtractOptions): Promise<PartialTsDocFluxConfig | Error> {
        const { config } = options
        const merge = await Promise.all(
            P.ensureArray(config.extends).filter(P.isString).map(async (filePath) => {
                return fromFile({ filePath })
            })
        )

        const errors = merge.filter(P.isError)
        if (errors.length !== 0) {
            return errors[0]
        }

        const configs = merge.filter(P.isNot(P.isError))
        const extracted = await Promise.all(configs.map((config) => extract({ config })))
        const extractedErrors = merge.filter(P.isError)
        if (extractedErrors.length !== 0) {
            return extractedErrors[0]
        }
        const final = extracted.filter(P.isNot(P.isError))

        return P.deepMergeLeft(config, ...final)
    }
}


