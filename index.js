const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const studentDirectory = {}

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the PennApps Sign In application")
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/signin', (req, res) => {
    if (studentDirectory[req.body.schoolName] === undefined) {
        studentDirectory[req.body.schoolName] = [req.body.studentName]
    } else {
        studentDirectory[req.body.schoolName].push(req.body.studentName)
    }
    res.status(200).send(`${req.body.studentName} has been signed in`)
})

app.get('/directory', (req, res) => {
    res.status(200).json(studentDirectory)
})


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})