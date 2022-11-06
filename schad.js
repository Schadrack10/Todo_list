const express =  require('express')
const app =  express()
const todoController =  require('./controllers/todoControler')
const port = 3000
app.set('view engine','ejs')
app.use(express.static('./public'))


//fire controllers 0-0-0=()=> let's goooo!!!
todoController.todoController(app)



app.listen(port,()=> console.log(`listening to port ${port}`))