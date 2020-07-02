import {readFile} from 'fs/promises'
import {join, dirname } from 'path'
import {fileURLToPath} from 'url'



async function userList() {
    const usersFile = join(dirname(fileURLToPath(import.meta.url)), 'users.json')
    const data = await readFile(usersFile);
    return JSON.parse(data);
}

export async function list(opts = {}) {
    console.log(opts)
    const {offset = 0, limit = 25} = opts;
    const users = await userList();
    return users
            .slice(offset, offset + limit);
}

export async function get(id) {
    // console.log(id)
    const users = await userList();
    // console.log(users)
     const user = users.find(user => user.id == id);
    //  console.log(user)
     return user;
}