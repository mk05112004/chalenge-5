const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const Router = express.Router()
const bodyParser = require("body-parser")


let data = JSON.parse(fs.readFileSync(path.resolve(__dirname , "data.json")))


Router.use(cors())
Router.use(bodyParser.urlencoded({extended : true}))
Router.use(express.urlencoded({extended : true}))

//create an account

Router.post("/create" ,  (req , res)=>{ 
    const {email , password} = req.body
    const id = Math.floor(Math.random() * 100000) ;
    // checck if the email is used in other account
    const dataExist = data.user.find((data)=> data.email == email)
    if (dataExist) {
      return res.status(404).json({error : "This Compte exist"})
    } else {
      data.user.push({id , email , password})
      fs.writeFileSync(path.resolve(__dirname , "data.json") , JSON.stringify(data))
      return res.status(200).json(data)
    }
})

// check if the account is already in use

Router.post("/check" , (req , res)=> {
  const {email , password} = req.body
  /* the user when he login we need to check if the email
  and password he wrote are true so first check if the email exist
  */
  const checkEmailFound = data.user.find(emailUser => emailUser.email == email)
  if (checkEmailFound) {
    // if the email is exist in db so will check if the password are match with the email
    if (checkEmailFound.password === password) {
      //if all good will redirect to home page 
      
      //and this code here from this one to for statement is to change proprties
      // of the active user to true to to know which user is connect and send the
      // right data of user
      const findUserIndex = data.user.findIndex(userIndex => userIndex.email === email)
      data.user[findUserIndex].isloged = true
      console.log(data.user[findUserIndex].isloged)
      for (let index = 0; index < data.user.length; index++) {
        if (index != findUserIndex) {
          data.user[index].isloged = false 
        }
      }
      fs.writeFileSync(path.resolve(__dirname , "data.json") , JSON.stringify(data))
      return res.status(200).json(data)
    }else {
      return res.status(404).json({passwordError : "Password incorrect"})
    }
  } else {
    return res.status(404).json({emailError : "Email not found"})
  }
})


  module.exports = {auth : Router }


