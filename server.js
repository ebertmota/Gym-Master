const dotenv = require('dotenv').config();
const express = require('express');
const app = express(); //instanciando express

app.use( express.urlencoded({ extended: true }) );


//Conexão com Mongo
const mongoose = require('mongoose');
mongoose.connect(process.env.connectionString,
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.emit('Ready');
  })
  .catch(err => console.log(err));

//Conexao com as flahs messages
const flash = require('connect-flash');
app.use(flash())


//Configurando sessão do express, e conectando com o Mongo
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sessionOptions = session(
  {
    secret: 'anyone that nobody knows',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 dias
      httpOnly: true,
    },
  }
);

app.use(sessionOptions);

// Addons para Segurança no envio de forms
const helmet = require('helmet');
const csrf = require('csurf');
app.use(helmet());
app.use(csrf());

// configurando middleware global
const { checkMessages,checkCsrfError, csrfMiddleware } = require('./src/MiddleWares/GlobalMiddleware');
app.use(checkMessages)
app.use(checkCsrfError)
app.use(csrfMiddleware)




// Importando arquivo de rotas
const routes = require('./routes');
app.use(routes)


// Informando a View e View-engine
const path = require('path');
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs');



app.use( express.json() )
// Informando Conteudo estático
app.use(express.static('./frontend/public') );

app.on('Ready', () => {

  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });

});

