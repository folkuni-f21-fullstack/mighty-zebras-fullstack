import express, { Request, Response } from "express";
import { User, LoginCreds, Order } from "../lowDb/dbinterface";
import db, { findUser, createAccount, findAccount } from "../lowDb/database.js";
import { data as defaultData } from '../defaultData.js'
import { isValidUser } from "../validators/validUser.js";
const app = express();
app.use(express.json());
const userRoute = express.Router();


// SIGNUP

userRoute.post('/signup', async (req, res) => {

    const userData: User = req.body
    const resObj = {
        success: true,
        userExist: false,
        message: `Konto skapat för: ${userData.name}`
    }
    if( !userData ) {
        resObj.message = '400 No data'
        res.json(resObj)
    } else if( isValidUser(userData) ) {
        const userExist = await findUser(userData)
        if( userExist.length > 0 ) {
            resObj.userExist = true
            resObj.message = `Konto finns redan för ${userData.name}`
        } 
        if( resObj.userExist ) {
            resObj.success = false
        } else {
            createAccount(userData)
        }
    }
        res.send(resObj)
})

// LOGIN
userRoute.get('/login', async (req, res) => {
    if( !db.data ) {
        db.data = defaultData
  }
    const userData: LoginCreds = req.body

    const resObj = {
        success: false,
        user: '',
        accountId: '',
        userOrders: [],
        message: 'No credentials'
    }
    console.log('userData: ', userData);
    
    const foundAccount = await findAccount(userData)
    console.log('account: ', foundAccount)
    let account = foundAccount[0]
    if( foundAccount.length < 0) {
        resObj.success = false
        resObj.message = `Account <${userData.name}> not found.`
    }
    if( foundAccount.length > 0 && foundAccount.length < 2) {
        if( userData.name === account.name && userData.password === account.password) {
            resObj.success = true
            resObj.user = account.name
            resObj.accountId = account.accountId
            resObj.message = `${account.name} logged in!`
        } else {
            resObj.success = false
            resObj.message = 'Failed to log in, check name and password'
        }
    }
    console.log(resObj)
    res.json(resObj)
    

})

// UPDATE USER

//user{name: , email: , accountId: , accountID: , phoneNumber: ,admin: , }



//{
  //  "cart": {[cartItems:[ ],  "totalPrice": 0}
  //  "user": { "name": "",
  //  "email": "",
  //  "accountId": "",
  //  "phoneNumber": "",
  //  "admin": false },

  //  "userComment": "",
  //  "adminComment": "",
  //  "locked": false,
  //  "completed": false,
  //  "orderPlaced": "",
  //  "id":""
  //} 



export default userRoute