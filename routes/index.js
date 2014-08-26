'use strict';


var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var appdata = require('../data.json');

// create reusable transporter object for sending emails
var transporter = nodemailer.createTransport({ 
	host: "mail.privateemail.com",
	port: 465,
	secure: true,                    
	auth: {
		user: "contact@terriregan.com",
		pass: "***REMOVED***"
	}
});


// home
router.get('/', function (req, res) {
	res.render('home', {
		home: true, 
		module: 'hero'
	});
});

// story 
router.get('/story', function (req, res) {
	res.render('story', {
		story: true
	});
});

// work
router.get('/work', function (req, res) {
	res.render('work', {
		work: true, 
		projects: appdata.projects
	});
});

router.get('/work/:workid', function (req, res) {
	var result = appdata.projects.filter(function (project) {  // TODO: db call
		return project.id === req.params.workid;
	});

	if (result.length) {
		res.render('project', {
			work: true, 
			project: result[0]
		});
	} else {
		next();
	}
});

// contact
router.get('/contact', function (req, res) {
	res.render('contact', {
		contact: true, 
		module: 'form',
		form: {}
	});
});

// display after after email success
router.get('/contact/success', function (req, res) {
	res.render('contact', {
		contact: true, 
		module: 'form'
	});
});

router.post('/contact', function (req, res) {
	req.assert('name', 'Required. Please fill.').notEmpty();
  	req.assert('email', 'Email address seems invalid.').isEmail();  
  	req.assert('email', 'Required. Please fill.').notEmpty();
  	
  	var errors = req.validationErrors(true);
	
	var options = {
    	from: 'contact@terriregan.com',
    	to: 'contact@terriregan.com',
    	subject: req.body.subject || 'Inquiry', 
    	text: 'From: ' +  req.body.name + " - " + req.body.email + '\n\n' + (req.body.info || 'NONE')
	}
	if(!errors) {
		transporter.sendMail(options, function(err, info) {
			if(err) {
				console.log(err);
			} else {
				console.log('Message sent: ' + info.response);
				// Contact template displays both the form and success message views.
				// Redirect so a page refresh from the success view does not cause
				// a form resubmission
				res.redirect('/contact/success');  
			}
			transporter.close();
		});	
	} else {
		res.render('contact', {
			contact: true,
			module: 'form',
			form: {
				errors: errors,
				name: req.body.name,
				email: req.body.email,
				subject: req.body.subject,
				info: req.body.info
			}
		});
	}
});

module.exports = router;