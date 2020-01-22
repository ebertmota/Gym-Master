const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AuthenticationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthenticationModel = mongoose.model('Authentication', AuthenticationSchema)

class Authentication {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.lenght > 0) return;

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.user = await AuthenticationModel.create(this.body);
  }

  //Valida o form
  validate() {
    this.cleanUp();

    //validando email
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido.')
    }

    //Validando senha
    if (this.body.password.length < 3 || this.body.password.length >= 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
    }
  }

  //Garante que tudo dentro do body vai ser uma string
  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };

  }

  async login() {
    this.validate();
    if (this.errors.length > 0) return;
    this.user = await AuthenticationModel.findOne({ email: this.body.email });
    
    if (!this.user) {
      this.errors.push('Usuario não existe');
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha ou e-mail inválidos!')
      this.user = null;
      return;
    }

  }
  

}

module.exports = Authentication;