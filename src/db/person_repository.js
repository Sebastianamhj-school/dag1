const dao = require("./dao")

class PersonRepository {

    getById(id) {
        return dao.get(
            `SELECT * FROM people WHERE id = ?`,
            [id]
        )
    }

    getAll() {
        return dao.all(`SELECT * FROM people`)
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT,
            email TEXT,
			student INTEGER,
			note TEXT
        )`
        return dao.run(sql)
    }   

    create(fullname, email, student, note) {
        return dao.run(
            `INSERT INTO people (fullname, email, student, note) VALUES (?, ?, ?, ?)`,
            [fullname, email, student, note]
        )
    }

    update(person) {
        const { id, fullname, email, student, note } = person
        return dao.run(
            `UPDATE people 
            SET fullname = ?,
            email = ?,
			student = ?,
			note = ?
            WHERE id = ?`,
            [fullname, email, student, note, id]
        )
    }

    delete(id) {
        return dao.run(
            `DELETE FROM people WHERE id = ?`,
            [id]
        )
    }
}

module.exports = new PersonRepository()