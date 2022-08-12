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
app.listen(port, () => {
    console.log(`connection on port ${port}`);
})