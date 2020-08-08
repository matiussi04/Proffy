const subjects = [
    "Arte",
    "Biologia",
    "Ciência",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
];

const getSubject = subjectNumber => subjects[subjectNumber - 1];

const convertTimeToMinutes = time => {
    const [hours,minutes] = time.split(':').map(valor => Number(valor));
    return hours * 60 + minutes;
};

module.exports = { subjects, weekdays, getSubject, convertTimeToMinutes };