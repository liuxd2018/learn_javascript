import {dirname} from 'path';
import {fileURLToPath} from 'url';


// console.log(import.meta.url)
export function getPwd(url) {
    return dirname(fileURLToPath(url))
}