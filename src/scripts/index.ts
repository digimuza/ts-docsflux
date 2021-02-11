import * as path from 'path';
import {
    Extractor,
    ExtractorConfig,
    ExtractorResult
} from '@microsoft/api-extractor';
import { ensureFileSync, readFileSync, writeFileSync, copySync, existsSync, removeSync, readJsonSync, readdir, readdirSync } from 'fs-extra'
import { getMembers } from '..';
import { basename, dirname, extname, resolve } from 'path';
import { TsDocFluxConfig } from '../helpers/tsDocFluxConfig';
import * as P from 'ts-prime'
import { jsonc } from 'jsonc'
import { PackageJSON } from '../helpers/packageJSON';
import { Documentation } from '../types';
async function asd(): Promise<any> {
    const rootFolder = dirname(PackageJSON.getPackageJSONFilePath(process.cwd()))

    const tsDocFluxConfig = await TsDocFluxConfig.get({ rootFolder })
    if (P.isError(tsDocFluxConfig)) return tsDocFluxConfig

    const apiExtractorJsonPath: string = path.join(__dirname, '../../config/api-extractor.json');
    const template = jsonc.parse(readFileSync(apiExtractorJsonPath).toString())

    const root = process.cwd()
    const packageJSON = PackageJSON.getPackageJSON(process.cwd())
    const templateFile = path.resolve(root, 'api-extractor.json')



    writeFileSync(templateFile, JSON.stringify(
        {
            ...template,
            mainEntryPointFilePath: tsDocFluxConfig.mainEntryPointFilePath.replace("./", '<projectFolder>')
        },
        undefined,
        "\t"
    ))

    // Load and parse the api-extractor.json file
    const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(templateFile);
    // Invoke API Extractor
    const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
        // Equivalent to the "--local" command-line parameter
        localBuild: true,
        // Equivalent to the "--verbose" command-line parameter
        showVerboseMessages: false
    });
    const tempFolder = path.resolve(root, `./temp/`)
    const libDTsFile = path.resolve(tempFolder, `./${packageJSON.name}.d.ts`)
    const libDTs = readFileSync(libDTsFile).toString()

    const readmeFile = path.resolve(root, './README.md')
    const readme = readFileSync(readmeFile).toString()

    const libMetaFile = path.resolve(tempFolder, `./${packageJSON.name}.api.json`)
    const metaData = JSON.parse(readFileSync(libMetaFile).toString())
    const finalData = path.resolve(root, "./docs/data/data.json")
    const configFinalData = path.resolve(root, "./docs/data/config.json")


    const themeLibPath = path.resolve(__dirname, "../../themes/ts-docsflux-ts-prime/build")

    const files = await readdir(themeLibPath)

    const themeDestPath = path.resolve(root, "docs/")
    // if (existsSync(themeDestPath)) {
    //     removeSync(themeDestPath)
    // }

    const excludeIfExists = [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon.ico',
        'logo.svg',
        'manifest.json',
        'robots.txt',
    ]
    files.map((file) => {
        if (excludeIfExists.includes(file)) {
            if (existsSync(resolve(themeDestPath, file))) {
                return
            }
        }
        copySync(resolve(themeLibPath, file), resolve(themeDestPath, file))
    })

    const indexHTMLFile = path.resolve(themeDestPath, "./index.html")

    const indexHTMLContent = readFileSync(indexHTMLFile)
        .toString()
        .replace(/@##TEMPLATE_URL##@/gm, `/${packageJSON.name}`)
        .replace(/@##TITLE##@/gm, `${packageJSON.name} - ${packageJSON.description}`)
        .replace(/@##DESCRIPTION##@/gm, `${packageJSON.name} - ${packageJSON.description}`)

    writeFileSync(indexHTMLFile, indexHTMLContent)

    const sourceFolder = resolve(rootFolder, './src')
    const mdFiles = readdirSync(sourceFolder).filter((q) => extname(q) === '.md').map((file) => {
        return {
            file,
            content: readFileSync(resolve(sourceFolder, file)).toString()
        }
    })

    const indexedMdFiles = P.pipe(mdFiles, P.indexBy((q) => q.file), P.mapRecord(([k, v]) => [k, v.content]))

    ensureFileSync(finalData)
    writeFileSync(finalData, JSON.stringify({
        docs: getMembers(metaData as Documentation, libDTs, indexedMdFiles),
        articles: {
            readme: readme
        }
    }, undefined, '\t'))
    writeFileSync(configFinalData, JSON.stringify({
        "repositoryUrl": packageJSON.repository?.url
    }, undefined, '\t'))
    // removeSync(tempFolder)
    removeSync(templateFile)


    if (extractorResult.succeeded) {
        console.log(`API Extractor completed successfully`);
        process.exitCode = 0;
    } else {
        console.error(`API Extractor completed with ${extractorResult.errorCount} errors`
            + ` and ${extractorResult.warningCount} warnings`);
        process.exitCode = 1;
    }
}



asd()