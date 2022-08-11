const dao = require("./dao")

class DuckRepository {

    getById(id) {
        return dao.get(
            `SELECT * FROM ducks WHERE id = ?`,
            [id]
        )
    }

    getAll() {
        return dao.all(`SELECT * FROM ducks`)
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ducks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Color TEXT,
            Name TEXT
        )`
        return dao.run(sql)
    }

    create(Color, Name) {
        return dao.run(
            `INSERT INTO ducks (Color, Name) VALUES (?, ?)`,
            [Color, Name]
        )
    }

    update(duck) {
        const { id, Color, Name } = duck
        return dao.run(
            `UPDATE ducks 
            SET Color = ?,
            Name = ?
            WHERE id = ?`,
            [Color, Name]
        )
    }

    delete(id) {
        return dao.run(
            `DELETE FROM ducks WHERE id = ?`,
            [id]
        )
    }
}

module.exports = new DuckRepository