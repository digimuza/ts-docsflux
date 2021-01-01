import * as path from 'path';
import {
    Extractor,
    ExtractorConfig,
    ExtractorResult
} from '@microsoft/api-extractor';
import { ensureFileSync, readFileSync, writeFileSync, copySync, existsSync, removeSync } from 'fs-extra'
import { getMembers } from '..';
import { Documentation } from '../types';

const apiExtractorJsonPath: string = path.join(__dirname, '../../config/api-extractor.json');

const template = readFileSync(apiExtractorJsonPath)
const root = process.cwd()
const packageJSON = {
    name: 'ts-prime'
}
const templateFile = path.resolve(root, 'api-extractor.json')
writeFileSync(templateFile, template)

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


const themeLibPath = path.resolve(__dirname, "../../themes/ts-docflux-ts-prime")
const themeDestPath = path.resolve(root, "docs/")
if (existsSync(themeDestPath)) {
    removeSync(themeDestPath)
}
copySync(themeLibPath, themeDestPath)

const indexHTMLFile = path.resolve(themeDestPath, "./index.html")
writeFileSync(indexHTMLFile, readFileSync(indexHTMLFile).toString().replace(/@##TEMPLATE_URL##@/gm, "/ts-prime"))


ensureFileSync(finalData)
writeFileSync(finalData, JSON.stringify({
    docs: getMembers(metaData as Documentation, libDTs),
    articles: {
        readme: readme
    }
}, undefined, '\t'))

removeSync(tempFolder)
removeSync(templateFile)


if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
} else {
    console.error(`API Extractor completed with ${extractorResult.errorCount} errors`
        + ` and ${extractorResult.warningCount} warnings`);
    process.exitCode = 1;
}