const mongoose = require("mongoose");
const validator= require("validator");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        // max:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})
// creating a new collection
const Student=new mongoose.model('Students',studentSchema);
module.exports = Student;