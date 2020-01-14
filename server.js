const express = require('express');
const app = express(); //instanciando express

app.use( express.urlencoded({ extended: true }) );


// Importando arquivo de rotas
const routes = require('./routes');
app.use(routes)


// Informando a View e View-engine
const path = require('path');
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs');

// Informando Conteudo estático
app.use(express.static('./frontend/public') );

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
})