const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const todos = require('./Models/Todo.models')
const { rmSync } = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/test")

app.get('/get' , (req,res) =>{
      todos.find()
      .then(result => res.json(result))
      .catch(err => res.json(err))
})

app.put('/update/:id' , (req,res) => {
      const {id} = req.params;
      todos.findByIdAndUpdate({_id : id} , {done : true})
      .then(result => res.json(result))
      .catch(err => res.json(err))
})

app.post('/add' , (req,res) => {
      const task = req.body.task
      todos.create({
            task : task
      }).then(result => res.json(result))
        .catch(err => res.json(err)) 
})


app.delete('/delete/:id' , (req,res) => {
      const {id} = req.params;
      todos.findByIdAndDelete({_id : id})
      .then(result => res.json(result))
      .catch(err => res.json(err))

})

app.listen(3001 , () => {
      console.log("Server is running !!")
      console.log("mongoose connected")
})