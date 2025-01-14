const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString:"postgresql://canteen_project_user:ZtoxHPJ5fhFLxQEMchh6VLSbupiz89my@dpg-cu2agijv2p9s738pknr0-a.singapore-postgres.render.com/canteen_project",
    ssl: {
        rejectUnauthorized: false,
      },
});
pool.connect((err) => {
    if (err) {
        console.log("Error Connecting to the Database", err);
        return
    } else {
        console.log("Connected to the Database")
    }
})

module.exports = pool;