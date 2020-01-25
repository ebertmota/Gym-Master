const mongoose = require('mongoose');
const validator = require('validator');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    default: '',
    required: false,
  },
  phone_number: {
    type: String,
    default: '',
    required: false,
  },
  due_date: {
    type: String,
    required: true,
  },
  situation: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now,
  }
});

const StudentModel = mongoose.model('Student', StudentSchema);

class Student{
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.debits = [];
    this.student = null;
  }

  async create() {
    this.validate();
    if(this.errors.length > 0) return;
    this.student = await StudentModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    //Validando campos obrigatorios
    if (!this.body.situation) {
      this.errors.push('Você precisa marcar se o aluno pagou a mensalidade!')
    }
    if (!this.body.due_date) {
      this.errors.push('A data de vencimento da mensalidade deve ser preenchida!')
    }
    if (!this.body.name) {
      this.errors.push('O nome do aluno é um campo obrigatorio!')
    }

  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      age: this.body.age,
      address: this.body.address,
      phone_number: this.body.phone_number,
      due_date: this.body.due_date,
      situation: this.body.situation,
    }
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;
    this.student = await StudentModel.findByIdAndUpdate(id, this.body, {new: true });
  }

  //static

  static async findDebits() {
    const date = new Date();
    const currentDate = date.getDate().toString();
    //primeiro param do find vai ser os filtros
    const student = await StudentModel.find({
      due_date: {$lt: currentDate}, //se a data de vencimento é menor ($lt) que o currentDate
      situation: 'Não Paga',
    })
    return student;
  }

  static async searchStudents() {
    const student = await StudentModel.find()
      .sort({ created_At: -1 }); //ordenados em decrescente a partir da data de cadastro
    return student;
  }

  static async searchId(id) {
    if (typeof id !== 'string') return;
    const student = await StudentModel.findById(id);
    return student;
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    const student = await StudentModel.findByIdAndDelete(id);
    return student;
  }
}



module.exports = Student;