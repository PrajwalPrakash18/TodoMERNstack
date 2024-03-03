const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const todo = require('./Models/Todo.models')
const { rmSync } = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/test")

app.get('/get' , (req,res) =>{
      todo.find()
      .then(result => res.json(result))
      .catch(err => res.json(err))
})

app.update('/update/:id' , (req,res) => {
      const {id} = req.params;
      todo.findByIdAndUpdate({_id : id} , {done : true})
      .then(result => rmSync.json(result))
      .catch(err => res.json(err))
})

app.post('/add' , (req,res) => {
      const task = req.body.task
      todo.create({
            task : task
      }).then(result => res.json(result))
        .catch(err => res.json(err)) 
})


app.delete('/delete/:id' , (req,res) => {
      const {id} = req.params;
      todo.findByIdAndDelete({_id : id})
      .then(result => res.json(result))
      .catch(err => res.json(err))

})

app.listen(3001 , () => {
      console.log("Server is running !!")
})