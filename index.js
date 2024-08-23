import express from 'express'
const app = express()
const port = 3000

import path from "path"
import  connection  from './db/connection.js'
import userModel from './db/user.model.js'




app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve("public")))



app.get('/', async (req, res) =>{

    const users = await userModel.find()

    res.render("index.ejs",{users})
})




connection()


app.post("/addUser",async(req,res,next)=>{
    const {name , email , password }=req.body
    await userModel.create({name , email , password})
    return res.redirect("/")
})

app.get("/editUser/:id",async(req,res,next)=>{

    const user = await userModel.findById(req.params.id)

    res.render("editUser.ejs",{user})
})

app.post("/updateUser/:id", async(req,res)=>{
    const {id}=req.params
    const {name, email, password}= req.body
    await userModel.updateOne({_id:id},{name,email,password})
    return res.redirect("/")
})

app.get("/deleteUser/:id",async(req,res,next)=>{
    await userModel.deleteOne({_id:req.params.id})
    return res.redirect("/")
})

app.use("*",(req,res)=>{
    res.json({msg:"404 page not found"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))