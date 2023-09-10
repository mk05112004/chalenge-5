const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const Router = express.Router()
const bodyParser = require("body-parser")
const shortid = require("shortid")

let data = JSON.parse(fs.readFileSync(path.resolve(__dirname , "data.json")))


Router.use(cors())
Router.use(bodyParser.urlencoded({extended : false}))
Router.use(express.urlencoded({extended : false}))
Router.use(express.json())


//send data


/* 
user loged in 
we need to find the user who loged in 
to send to him the right data (url inputs)
*/
const findAccountLoged = data.user.findIndex(accountIndex => accountIndex.isloged === true)
Router.get("/data" , (req , res)=>{
  const dataExist = data.url.findIndex(dataId=> dataId.id === data.user[findAccountLoged].id)
    if (dataExist != -1) {
      return res.status(200).json({url : data.url[dataExist]})
    }else {
      return res.status(404).json({message : "no data"})
    }
  })
  
  // create the short url 

  Router.post("/shorten", (req, res) => {
    const { url } = req.body ;
    const shortUrl = shortid.generate() ;
    const dataExist = data.url.findIndex(dataId => dataId.id === data.user[findAccountLoged].id)
      if (dataExist != -1) {
        data.url[dataExist].sites.push({shortUrl , fullUrl : url })
        if (!data.url[dataExist].id) {
           data.url[dataExist].id =data.user[findAccountLoged].id
        }
      } else {
        data.url[data.url.length - 1].sites.push({shortUrl , fullUrl : url })
        if (!data.url[data.url.length - 1].id) {
          data.url[data.url.length -1].id =data.user[findAccountLoged].id
       }
      }
      fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(data));
      return res.status(200).json(data);
  });

  //redirect to the full url from the short one
  
  Router.get("/:shortUrl", (req, res) => {
    const shortUrl = req.params.shortUrl;
    let findShort;
    for (let index = 0; index < data.url.length; index++) {
        findShort = data.url[index].sites.find(shorturl => shorturl.shortUrl === shortUrl);
        if (findShort) {
            break;
        }
    }
    if (findShort) {
        console.log("Redirecting to:", findShort.fullUrl); 
        return res.status(200).redirect(findShort.fullUrl);
    } else {
        return res.status(404).send("Short URL not found");
    }
});



  module.exports = {url : Router}