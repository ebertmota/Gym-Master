const Student = require('../models/StudentsModel');

module.exports.index = async (req, res) => {
  const student = await Student.searchStudents();
  res.render('index', { student });
}