let bodyParser = require('body-parser');

module.exports = function({ local, database }) {

    local.use(bodyParser.json());

    local.use('/api/saveNew', (req, res) => {

        let {hash, value} = req.body;

        let query = `
            INSERT INTO pastes(route,code,public)
            VALUES (?,?,?)
        `;

        database.run(query, [hash, value, true], 
            (err,data) => {
                if (err) res.json({err})
                else res.json({data})
            }
        )
    })

}