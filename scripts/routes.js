
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/halpdesk';
var db = pgp(connectionString);

module.exports = function(app) {
    // create todo and send back all todos after creation
	app.post('/api/ticket', function(req, res) {
        console.log("routes.js'e post geldi:" + req.body.name);
        let params = [req.body.author, req.body.subject, req.body.issue, req.body.chatUrl, '0', '1'];
        const tickets = db.any('INSERT INTO tickets(author, subject, issue, chatUrl, archive, status) values ($1, $2, $3, $4, $5, $6)', params);
    });

    app.get('/api/ticket', function(req, res) {
        //console.log("routes.js'e get geldi");
        db.query('select * from tickets').then(function (data) 
        {
            res.status(200).json(
            {
                status: 'success',
                data: data,
                message: 'Retrieved ALL tickets'
            });
        })
        .catch(function (err) {
            return err;
        });
    });

    app.post('/api/delete', function(req, res) {
        console.log("routes.js'e delete geldi:" + req.body.parameter);
        const tickets = db.any('DELETE FROM tickets WHERE tickets.author = $1', req.body.parameter);
    });

    //--------------------------------------------------------------//
    //Test amaçlı comment//
    app.post('/api/request', function(req, res) {
        console.log("routes.js'e request post geldi");
        let params = [  req.body.nameAndSurname, 
                        req.body.department, 
                        req.body.requestDate, 
                        req.body.requestType,
                        req.body.dayCount,
                        req.body.startDate,
                        req.body.nextDate,
                        req.body.phone,
                        req.body.replacementEmployee,
                        req.body.address];
        const tickets = db.any('INSERT INTO request(nameandsurname, department, requestdate, requesttype, dayCount, startdate, nextdate, phone, replacementemployee,address) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', params);
    });
    
    // application -------------------------------------------------------------
	app.get('*', function(req, res) {
        // res.sendfile('scripts/main.html'); // load the single view file (angular will handle the page changes on the front-end)
        res.sendfile('scripts/izin_talep.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};