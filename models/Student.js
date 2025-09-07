const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name : String,
    rollNo:{type:String, unique :true},
    email:{type:String, unique :true},
    collegeId:String
});

module.exports= mongoose.model("Student", studentSchema);