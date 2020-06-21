const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    console.log('func 1');    
    res.status(200).send("My Backend")
})

app.listen(3000, () =>{
    console.log('Funcionando ...');
    
})