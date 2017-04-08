let bodyParser = require('body-parser');

module.exports = function({ local, database }) {

    local.use(bodyParser.json());

    local.use('/api/save', (req, res) => {

        let {hash, value} = req.body;

        let query = `
            INSERT OR REPLACE INTO snippets(route,code,public)
            VALUES (?,?,?)
        `;

        database.run(query, [hash, value, true], 
            (err,data) => {
                if (err) res.json({err});
                else res.json({});
            }
        )
    })

    local.use('/api/load', (req, res) => {

        let {hash} = req.body;

        let query = `
            SELECT code FROM snippets WHERE route = ?
        `;

        database.get(query, [hash], 
            (err,data) => {
                if (err) {
                    res.json({err});
                }
                else if (data && data.code) {
                    res.json({code:data.code});
                }
            }
        )
    })

}