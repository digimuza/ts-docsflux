import { existsSync, readFileSync, readJSONSync } from 'fs-extra'
import { resolve } from 'path'
import { PackageJson } from 'types-package-json'


export namespace PackageJSON {
    export function getPackageJSONFilePath(folder: string): string {
        const path = resolve(folder, 'package.json')


        if (existsSync(path)) {
            return path
        }


        return getPackageJSONFilePath(resolve(folder, "../"))
    }


    export function getPackageJSON(folder: string): PackageJson {
        const packageJSONPath = getPackageJSONFilePath(folder)
        return readJSONSync(packageJSONPath)
     }
}
