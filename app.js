/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;
var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require('fs-extra');       //File System - for file manipulation
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: "uploads" }));    
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var employeeProvider= new EmployeeProvider('localhost', 27017);

//Routes

//index
app.get('/', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'Employees',
            employees:emps
        });
  });
});
app.get('/upload', function(req, res) {
    res.render('upload', {
        title: 'Upload'
    });
});
app.post("/upload", function(req, res) {
    if(req.files.fileUploaded) {
	    fs.readFile(req.files.fileUploaded.path, function (err, data) {
		  // ...
		  var newPath = __dirname + '/files/' + req.files.fileUploaded.name;
		  fs.writeFile(newPath, data, function (err) {
		    res.redirect("back");
		  });
		});

    }
    //Something went wrong -- busboy was not loaded
});

app.get('/contact', function(req, res) {
    res.render('contact', {
        title: 'Contact US'
    });
});
app.post('/contact', function(req, res){
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport")
var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "smtp.gmail.com",
    secureConnection : false,
    port: 587,
    auth : {
            user: "<account>",
            pass: "<pass>"
    }
}));
 var mailOptions={
        from : "waynevo <info@3tiermarketing.com>",
        to : "dinhminhquoi@yahoo.com",
        subject : req.param('subject'),
        html : " Fullname:"+req.param('message')+" Email:"+req.param('email')+" Message:" + req.param('message')
/*
        attachments : [
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: 'Your File path' // stream this file
            }
        ]
*/
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
//new employee
app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
app.post('/employee/new', function(req, res){
    employeeProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/')
    });
});

//update an employee
app.get('/employee/:id/edit', function(req, res) {
	employeeProvider.findById(req.param('_id'), function(error, employee) {
		res.render('employee_edit',
		{ 
			title: employee.title,
			employee: employee
		});
	});
});

//save updated employee
app.post('/employee/:id/edit', function(req, res) {
	employeeProvider.update(req.param('_id'),{
		title: req.param('title'),
		name: req.param('name')
	}, function(error, docs) {
		res.redirect('/')
	});
});

//delete an employee
app.post('/employee/:id/delete', function(req, res) {
	employeeProvider.delete(req.param('_id'), function(error, docs) {
		res.redirect('/')
	});
});
app.get('/api', function(req, res) {
employeeProvider.findAll(function(error, emps){
       res.json(emps);
  });
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Express Started on Port 3000");
});

