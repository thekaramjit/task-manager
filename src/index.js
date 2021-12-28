const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task=require("./models/tasks")
const { use } = require('express/lib/application')
const { Router } = require('express')
const taskRouter=require("./routers/tasksRouter")
const userRouter=require("./routers/usersRouter")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
