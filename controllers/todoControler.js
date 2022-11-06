require('dotenv').config()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//mongoose -> connection with our database

var mongoose = require('mongoose')
// const dbUrl = 'mongodb://schadTest:i5GY6PAhAXhTH1do@cluster0.5pqa1yh.mongodb.net/?retryWrites=true&w=majority'

//mongodb+srv://schadTest:apocalypto1@cluster0.5pqa1yh.mongodb.net/?retryWrites=true&w=majority

const envString = process.env.DATABASE_URL

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true, //i added this option
}

mongoose.connect(envString, connectionParams) // connecting to mongo with params

const db = mongoose.connection //initailising the database =>finalising the connection

//listening to db events

db.on("error", (err) => console.log(err))    // checking error logs

db.once("open", () => console.log('database succesfully connected')) //checking success logs



const mongooseSchema = new mongoose.Schema(
    {
        item: String,
        // todo_id: Number,
        // todo_options:Object
    })


const TodoModel = mongoose.model('customTodoList', mongooseSchema)

// var itemOne =  TodoModel({item:'item with options', todo_id:Math.floor(Math.random()*100) , todo_options:['isTask' , 'another task']}).save((err) =>{

//     if(err) throw new Error('unable to save') ;
//      console.log('saved data succesfully')
// }
// )       


// const connectParams = {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useFindAndModify:true,
//     // useCreateIndex:true
// }

// mongoose.connect(dbUrl,connectParams).then(()=>{

//     console.log('succesfully connected to mongo db')

// }).catch(err=>{
//     console.log('unable to connect to mongo bcz => '+ err.message)
// })



//schema

// const schema = new mongoose.schema({
//     item:String
// })

// //model
// const Todo = mongoose.model('Todo', schema)



// var data = [
//     { item: 'make money', code: Math.floor(Math.random() * 100) },
//     { item: 'start youtube chanel', code: Math.floor(Math.random() * 100) },
//     { item: 'make more money', code: Math.floor(Math.random() * 100) }
// ]

function Server(app) {

    app.get('/todo', (req, res) => {
        //get data from mongo db and pass it to view-template

        TodoModel.find({}, (err, data) => {
            if (err) throw err
            res.render('todo', { data: data })
        })

        // res.render('todo', { data: data })
    });

    app.post('/todo', urlencodedParser, (req, res) => {

        //get data from the view-template and add it to the view
        const body = req.body
        const newItem = TodoModel(body).save((err, data) => {
            if (err) throw err;
            res.json(data)
        })
    });

    app.delete('/todo/:item', (req, res) => {

        //delete the requested item from mongo db
        TodoModel.find({ item: req.params.item.replace(/\-/g, " ") }).remove((err, data) => {
            if (err) throw err;
            res.json(data)
            console.log('item succesfully deleted')
        })

        //     data = data.filter(function (todo) {
        //         return todo.item.replace(/ /g, "-") !== req.params.item
        //     })
        //     res.json(data)
        //     console.log(req.params.item)
    })
}

module.exports = {
    todoController: Server
}
