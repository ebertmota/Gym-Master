//get routes

module.exports.new = (req,res) => {
  res.render('students');
};

module.exports.status = (req, res) => {
  res.render('status');
};

//post routes

const Student = require('../models/StudentsModel');

module.exports.create = async (req,res) => {
  try {
    const student = new Student(req.body);
    await student.create();

    if (student.errors.length > 0) {
      req.flash('errors', student.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Aluno adicionado com sucesso.');
    req.session.save(() => res.redirect('/'));
    return;
  } catch (err) {
    console.log(err)
    res.send('404');
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.send('404');

    const student = await Student.delete(req.params.id);
    console.log(req.params.id)
    if(!student) return res.send('404')

    req.flash('success', 'Aluno excluido com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;

  } catch (err) {
    console.log(err)
  }
}