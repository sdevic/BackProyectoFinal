const express = require('express')
const routs = require('./Routes/index')

const app = express()
//para poder enviar json
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//mando a buscar las rutas
app.use('/', routs)

const PORT = process.env.PORT || 8080


app.listen(PORT, ()=>{
    console.log(`Escuchando en el  puerto :${PORT}`)
})