import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {MenuItems, CartProps, User, Order } from './dbinterface'
import menuInit from '../menudata.json' assert {type: "json"}
import ordersInit from '../orderdb.json' assert {type: "json"}

import dayjs from 'dayjs'
dayjs()

const started= dayjs().format('YYYY-MM-DD HH:mm')
console.log(started)

const __dirname = dirname(fileURLToPath(import.meta.url));

const menufile = join(__dirname, 'menudb.json')
const userfile = join(__dirname, 'userdb.json')
const orderfile = join(__dirname, 'orderdb.json')

const menuadapter = new JSONFile(menufile)
const useradapter = new JSONFile(userfile)
const orderadapter = new JSONFile(orderfile)

const menudb:any = new Low(menuadapter)
const userdb:any = new Low(useradapter)
const orderdb:any = new Low(orderadapter)


menudb.data ||= { menu: menuInit.menu } 
userdb.data ||= { users: [] }


orderdb.data ||= { orders: ordersInit.orders }



async function lol(){
console.log('lol')
return "lol"
}

async function getMenu(){
    const menureply = await menudb.data
    return menureply
}
async function getOrders(){
    const orderreply = await orderdb.data
    return orderreply
}



const menu:MenuItems[] = menudb.data
const users:User[] = userdb.data
const orders:Order[] = orderdb.data


// PUSHA IN OBJECT
// menu.push('hello world')




await userdb.write()
await menudb.write()
await orderdb.write()


export {lol, getMenu, getOrders}