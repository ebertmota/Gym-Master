const Student = require('../models/StudentsModel');

//get routes

module.exports.new = (req,res) => {
  res.render('students', {
    student: {}
  });
};

module.exports.status = async (req, res) => {
  const student = await Student.findDebits();
  res.render('status', { student });
};

//post routes


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

module.exports.searchIdForEditOrCreate= async (req, res) => {
  if (!req.params.id) return res.send('404');

  const student = await Student.searchId(req.params.id);
  if (!student) return res.send('404');

  res.render('students', { student })
};

module.exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.send('404');
    const student = new Student (req.body);
    await student.edit(req.params.id);

    if (student.errors.length > 0) {
      req.flash('errors', student.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Informações do aluno editadas com sucesso.')
    req.session.save(() => res.redirect('/'));
    return;

  } catch (err) { 
    console.log(err);
  };
}