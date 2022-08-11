const dao = require("./dao")

class CatRepository {

    getById(id) {
        return dao.get(
            `SELECT * FROM cats WHERE id = ?`,
            [id]
        )
    }

    getAll() {
        return dao.all(`SELECT * FROM cats`)
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS cats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Breed TEXT,
            Name TEXT
        )`
        return dao.run(sql)
    }   

    create(Breed, Name) {
        return dao.run(
            `INSERT INTO cats (Breed, Name) VALUES (?, ?)`,
            [Breed, Name]
        )
    }

    update(cat) {
        const { id, Breed, Name } = cat
        return dao.run(
            `UPDATE cats 
            SET Breed = ?,
            Name = ?
            WHERE id = ?`,
            [Breed, Name, id]
        )
    }

    delete(id) {
        return dao.run(
            `DELETE FROM cats WHERE id = ?`,
            [id]
        )
    }
}

module.exports = new CatRepository()