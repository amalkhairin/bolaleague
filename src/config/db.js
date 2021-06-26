const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'remotemysql.com',
        user: 'TkFSG21ulZ',
        password: 'qzXIrrlJDa',
        database: 'TkFSG21ulZ',
    },
    pool: {min: 0, max: 50}
})

module.exports = knex;