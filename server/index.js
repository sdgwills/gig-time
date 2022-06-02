const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const gigCtrl = require('./Controllers/gigCtrl')
const taskCtrl= require('./Controllers/taskCtrl')
const session = require('express-session')
const authCtrl= require('./Controllers/authCtrl')
const clientCtrl = require("./Controllers/clientCtrl")



const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env



app.use(express.json())

app.use(express.static(`${__dirname}/../build`));  

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log(`1- db is connected`)
  app.listen(SERVER_PORT, () => {
    console.log(`2-server is connected on ${SERVER_PORT}`)
  })
})


app.get('/api/gigs', gigCtrl.getGigs)
app.post('/api/createGig', gigCtrl.createGig)
app.get('/api/gigs/:title', gigCtrl.getGigs)
app.delete('/api/gigs/:id', gigCtrl.delete)
app.put('/api/gigs/:id', gigCtrl.update)

app.get('/api/paid', gigCtrl.paidGigs)
app.get('/api/notpaid', gigCtrl.notPaidGigs)

app.get('/api/clients', clientCtrl.getClientByUser)

app.put('/api/gig/paid/:id', gigCtrl.togglePaid)
app.put('/api/gig/billed/:id', gigCtrl.toggleBilled)

app.put('/api/gigtime/:id', gigCtrl.updateGigTime)


app.get('/api/tasks/:gigId', taskCtrl.getGigTasks)
app.post('/api/tasks/create', taskCtrl.createTask)
app.put('/api/tasks/:taskId', taskCtrl.editTask)
app.delete('/api/tasks/:taskId', taskCtrl.deleteTask)


app.post('/users/register', authCtrl.register)
app.post('/users/login', authCtrl.login)
app.delete('/users/logout', authCtrl.logout)


app.post("/api/clients", clientCtrl.getClient)

app.get('/api/getsession', authCtrl.getSession)


app.post('/feedback', clientCtrl.sendFeedback)

app.post('/billGig/:gigId', gigCtrl.billGig)


app.post('/feedback', clientCtrl.sendFeedback)
  

app.get('/api/getSingleGig/:gigId', gigCtrl.getSingleGig)
app.post('/feedback', clientCtrl.sendFeedback)
app.post('/update/:gig_id', clientCtrl.sendUpdate)
