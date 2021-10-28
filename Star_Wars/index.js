const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/src/index.html')
})

app.use(express.static(__dirname + '/src')); //Pasta aonde estão os arquivos usados na pagina

app.get('/Contato', (req, res) => {
  res.send('Fernando Antonio - (31) 9-9647-3131')
})

app.get('/Sobre', (req, res) => {
  res.send('Somos uma empresa foda.')
})

app.get('/Blog', (req, res) => {
  res.send('Blog da massa!')
})



app.listen(port, () => {
  console.log(`Aplicativo está sendo hospeado em: http://localhost:${port}`)
})