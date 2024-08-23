import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})


const userModel = model("User",userSchema)


export default userModel