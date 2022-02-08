const express = require('express')

const app = express()

app.use(express.json())

let users = [
    { name: "Hichem", email: "hichem@gmail.com", id: 1 },
    { name: "Rimen", email: "rimen@gmail.com", id: 2 },
    { name: "Mouna", email: "mouna@gmail.com", id: 3 },
]

app.get('/', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    let id = +req.params.id
    let user = users.find(el => el.id === id)
    res.send(user)
})

app.post('/users', (req, res) => {
    let newUser = { ...req.body, id: Math.random() }
    // console.log(req);
    users.push(newUser)
    res.send(users)
})

app.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id)
    users = users.filter(el => el.id !== id)
    res.status(200).json({ msg: "User deleted with successfly", users })
})

app.put('/users/:id', (req, res) => {
    let id = Number(req.params.id)
    users = users.map(el => el.id === id ? { ...el, ...req.body } : el)
    res.status(200).json({ msg: "User updated with successfly", users })
})

const port = process.env.PORT || 7000
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`The server is running on port ${port}`);;
})