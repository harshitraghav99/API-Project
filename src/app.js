const express = require("express");
require("./database/connection")
const Student = require("./models/students")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// app.get("/",(req,res)=>{
//     console.log("root");
//     res.send("root");
// })

// create a new Student

// app.post("/students", (req, res) => {
//     // res.send("post request");
//     console.log(req.body);
//     const student = new Student(req.body);
//     student.save().then(() => {
//         res.status(201).send(student)
//     }).catch((e) => {

//         res.status(400).send(e);
//     });
// })

app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        const createUser = await student.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }

})
// app.get("/students", async (req, res) => {
//     try{
//         const students = await Student.find();
//         res.send(students)
//     }catch(e){
//         res.send(e);
//     }

// })
app.get("/students", (req, res) => {
    const students = Student.find().then(() => {
        res.status(200).send(students);
    }).catch((e) => {
        res.status(500).send(e);
    });
})
// app.get("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const studentData = await Student.findById(_id);
//         if (!studentData) {
//             res.status(404).send("not found");
//         } else {
//             res.status(200).send(studentData);
//         }
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })
app.get("/students/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const studentData = await Student.findOne({name:name}).exec();
        if (!studentData) {
            res.status(404).send("not found");
        } else {
            res.status(200).send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})
app.patch("/students/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const upadteStudent= await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.status(200).send(upadteStudent);

    } catch (e) {
        res.status(404).send(e);
    }
})
app.listen(port, () => {
    console.log(`connection on port ${port}`);
})