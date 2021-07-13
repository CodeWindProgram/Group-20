
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');

var cors = require('cors');
const { response } = require('express');
const PORT = 3001;

let pool = new pg.Pool({
    port: 5432,
    password: 'tanvi',
    database: 'QnA',
    host: 'localhost',
    user: 'postgres'
});
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.use(cors())

app.post('/api/new-country', function (req, res) {
    var que_discription = req.body.Question;
    var qt = req.body.Tags;
    var que_tag = qt.toLowerCase();
    var que_type = 'not reported';
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            db.query('INSERT INTO question (que_discription,que_type,que_tag,que_date,que_time) VALUES($1,$2,$3,$4,$5)', [que_discription, que_type, que_tag, date, time], (err, table) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    console.log('Data inserted');
                    res.status(201).send({ message: 'Data inserted' });
                    db.query('INSERT INTO question_tag (tag_desc) VALUES($1)', [que_tag], (err, table) => {
                        if (err) {
                            console.log(`Not entered`)
                            db.end();
                        }
                        else {
                            console.log(`OK`)
                            db.end();
                        }
                    });
                }
            });
        }


    })
});

app.get('/api/question-answers', function (req, res) {

    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            db.query('SELECT question.que_discription ,question.que_tag ,answers.ans_discription FROM question JOIN answers ON question.que_id = answers.que_id;', (err, table) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    console.log(table.rows);
                    //res.json(table.rows)
                    res.send(JSON.stringify(table.rows));

                }
            });
        }


    })
});

app.get('/api/not-answered', function (req, res) {

    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            db.query('SELECT que_discription,que_tag FROM question WHERE que_id NOT IN (SELECT que_id FROM answers);', (err, table) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    console.log(table.rows);
                    //res.json(table.rows)
                    res.send(JSON.stringify(table.rows));

                }
            });
        }


    })
});
app.listen(PORT, () => console.log('Listening on port ' + PORT));