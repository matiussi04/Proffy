const { subjects, weekdays, getSubject, convertTimeToMinutes } = require('./utils/format');
const Database = require('./database/db');

const pageLanding = (req,res) => res.render("index.html");

const pageGiveClasses = (req,res) => res.render("give-classes.html", { subjects, weekdays });

const pageStudy = async (req,res) => {
    const filters = req.query;

    if (!filters.weekday || !filters.subject || !filters.time){
        return res.render("study.html", { filters, subjects, weekdays });
    }

    const timeToMinutes = convertTimeToMinutes(filters.time);

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    try {
        const db = await Database;
        const proffys = await db.all(query);

        proffys.map(proffy => proffy.subject = getSubject(proffy.subject));

        return res.render("study.html", { proffys, filters, subjects, weekdays }); 

    } catch (error) {
        console.warn(error);
    }
}



const saveClasses = async (req,res) => {
    const createProffy = require("./database/createProffy");
    
    const { name,avatar,whatsapp,bio,subject,cost,weekday,time_from,time_to } = req.body;

    const proffyValue = {
        name,
        avatar,
        whatsapp,
        bio
    }

    const classValue = {
        subject,
        cost
    }

    const classScheduleValues = weekday.map((weekday,index) => ({
        weekday,
        time_from: convertTimeToMinutes(time_from[index]),
        time_to: convertTimeToMinutes(time_to[index])
    }))

    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        const queryString = "?subject=" + subject + "&weekday=" + weekday[0] + "&time=" + time_from[0];

        return res.redirect('/study' + queryString);

    } catch (error) {
        console.log(error);
    }
}

module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClasses };