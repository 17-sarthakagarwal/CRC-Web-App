const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
/*var hbs =  require('hbs');
*/const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
/*const student = require('./routes/students');
const admin = require('./routes/admin');
*/const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
var {mongoose} = require('./db/mongoose');
var {Student} = require('./models/studentModel');
var {Admin} = require('./models/adminModel');
var {Notice} = require('./models/noticeModel');
const hbs = require('express-handlebars');
require('dotenv').config();
/*app.engine('.hbs', exphbs({
  defaultLayout: 'layout',	
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers') 
}));
app.set('view engine', '.hbs');*/




/*hbs.registerHelper('ifEquals', (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});*/


app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
	secret:'A Secret',
	resave: true,
    saveUninitialized: true
	}));

app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: __dirname + '/views/layouts/layout.hbs', 
  helpers: require('./config/handlebars-helpers'), 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir:[ __dirname + '/views/partials1/',  __dirname + '/views/partials2/']
} ) );

app.set( 'view engine', 'hbs' );
/*hbs.registerPartials(path.join(__dirname,'/views/partials'));
*//*app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
*/app.use((req, res, next) => {				//Middleware to pass the session object to the front-end
    app.locals.session = req.session;
    next();
  });




app.get('/', (req,res) => {
	res.render('index',{
		pageTitle:'Welcome to CRC, Invertis University'
	});
});


app.get('/signup', (req,res) => {
	if(typeof req.session.email !== "undefined"){
		if(app.locals.type === 'Student'){
			res.redirect('/profile');
		}
		else{
			res.redirect('/dashboard');
		}
	}
	
	else{
	res.render('signup',{
		pageTitle:'Signup'
	});
}
});

 


app.post('/signup', (req,res,next) => {
	let first_name = req.body.firstname;
	let last_name = req.body.lastname;
	let email = req.body.email;
	let uname = req.body.username;
	let phone = req.body.mobile_no;
	let type = req.body.user_type;
	let password = req.body.password;
	let gender = req.body.gender;
	req.typeOfUser = type;
	req.email = email;
	req.first_name = first_name;
	req.password = password;

	if(type === 'Student'){
		var newStudent = new Student({
			first_name,
			last_name,
			email,
			uname,
			phone,
			type,
			password,
			gender
		});

		newStudent.save().then((student) => {
			//console.log('Student saved in db!!',JSON.stringify(student,undefined,3));
			req.UID = student._id;
			next();
		}).catch((e) => {
			console.log(e.code);
		});
	} // if ends for student
	else{
		var newAdmin = new Admin({
			first_name,
			last_name,
			email,
			uname,
			phone,
			type,
			password,
			gender
		});

		newAdmin.save().then((admin) => {
			//console.log('Admin saved in db!!',JSON.stringify(admin,undefined,3));
			next();
		}).catch((e) => {
			console.log(e);
		});
	}

}, (req,res,next) => {	
	var transporter = nodemailer.createTransport({
  		service: 'gmail',
  		auth: {
    	user: 'troy0870@gmail.com',
    	pass: process.env.Jello
  		}
		});

	var mailOptions = {
  		from: 'troy@gmail.com',
  		to: req.email,
  		subject: 'Thank you for registering with CRC, Invertis University',
  		text: `Dear ${req.first_name}! Your account was successfully created and you can use use your email - 
  		${req.email} and password - ${req.password} to login to your profile. Thanks.`
		};

	transporter.sendMail(mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
  	} 
	});

	next();
}, (req,res,next) => {	
		res.redirect('login');
	}
);

app.get('/login', (req,res) => {
	if(typeof req.session.email !== "undefined"){
		if(app.locals.type === 'Student'){
			res.redirect('/profile');
		}
		else{
			res.redirect('/dashboard');
		}
	}
	
	else{
	res.render('login',{
		pageTitle:'Login'
	});
}
});


app.post('/login', (req,res) => {	//POST /login handler to redirect the request to	
	let email = req.body.email;
	let pass = req.body.pass;
	Student.find({email}).then((student) => {
		Student.checkValidPasswords(pass, student[0].password).then(() => {
			let Type = student[0].type;
			req.session.email = email;
			req.session.pass = pass;
			app.locals.session = req.session;
			global.utype = Type;
			app.locals.type = Type;
			res.redirect('/profile');
		}).catch((e) => {
			res.status(401).send();
		});
	}).catch((e) => 
		Admin.find({email}).then((admin) => {
			Admin.checkValidPasswords(pass, admin[0].password).then(() => {
				let Type = admin[0].type;
				req.session.email = email;
				req.session.pass = pass;
				app.locals.session = req.session;
				global.utype = Type;
				app.locals.type = Type;
				res.redirect('/dashboard');
			}).catch((e) => {
				res.status(401).send();
		});
	})
	.catch((e) => console.log('Error', e))
	);
					//profile page after setting up session	
});



app.post('/register/:UID', (req,res) => {
	let UID = req.params.UID;
	let collegeID = req.body.cid;
	let rollNO = req.body.roll;
	let tenthMarks = Number(req.body.tenthMarks);
	let twelvthMarks = req.body.twelvthMarks;

	if(tenthMarks<10){
		tenthMarks = tenthMarks*9.5;
	}
	
	Student.findOneAndUpdate(
		{_id: UID}, 
		{$set:{collegeID,rollNO,tenthMarks,twelvthMarks}}, 
		{new: true}, (err, doc) => {
    if(err){
        console.log("Something wrong while updating data!");
    }
    res.redirect('/');
});

});

app.get('/profile', (req,res) => {					//GET /profile will be rendered with profile
	if(typeof req.session.email === 'undefined'){	//or will be redirected if not in session
		res.redirect('/login');
	}
	else{
		if(global.utype === 'Admin'){
			res.redirect('/dashboard');
		}
		else{
			let email = req.session.email;
			Student.find({email:email}).then((student) => {
			res.render('profile',{
			layout:'layout.hbs',
			Uname: email,
			student
			});
		}, () => {
			console.log('Error',e);
		});
		}
	
	}
});

app.get('/dashboard', (req,res) => {
	if(typeof req.session.email === 'undefined'){	//or will be redirected if not in session
		res.redirect('/login');
	}
	else{
		if(global.utype === 'Student'){
			res.redirect('/profile');
		}
		else{
				Student.find().then((students) => {
				res.render('dashboard',{
				students
			});
		}, (e) => {
			console.log('Error',e);
		});
	}
}
	
});


app.get('/update', (req,res) => {
	if(typeof req.session.email === 'undefined'){	//or will be redirected if not in session
		res.redirect('/login');
	}
	else{
		res.render('update');	
	}
	
});

app.post('/update', (req,res) => {
	let collegeID = req.body.cid;
	let rollNO = req.body.roll;
	let tenthMarks = Number(req.body.tenthMarks);
	let twelvthMarks = req.body.twelvthMarks;

	if(tenthMarks<10){
		tenthMarks = tenthMarks*9.5;
	}
	
	Student.findOneAndUpdate(
		{email: req.session.email}, 
		{$set:{collegeID,rollNO,tenthMarks,twelvthMarks}}, 
		{new: true}, (err, doc) => {
    if(err){
        console.log("Something wrong while updating data!");
    }
    res.redirect('update');
});
});


app.get('/notices', (req,res) => {
	if(typeof req.session.email === 'undefined'){	
		res.redirect('/login');
	}else{
		Notice.find({}).then((notices) => {
			res.render('notices',{
				title:'Notices',
				notices
			});
		}).catch(
		(e) => console.log(e));
			

	}
});


app.get('/addNotice', (req,res) => {
	if(typeof req.session.email === 'undefined'){	
		res.redirect('/login');
	}
	else{
		res.render('add_notice.hbs');
	}
});

app.post('/addNotice', (req,res,next) => {
	let title = req.body.title;
	let description = req.body.desc;
	let due_date = req.body.due_date;
	let receiver = req.body.target;
	req.title = title;
	req.description = description;
	req.date = due_date;

	var notice = new Notice({
		sender:'CRC',
		receiver:'Students',
		title,
		description,
		due_date
	});

	notice.save().then((notice) =>{
		//console.log(JSON.stringify(notice,undefined,3));
		next();
	}).catch((e) => {
		console.log(e);
	});

}, (req,res,next) => {	
	var studentsEmails = [];
	Student.find({}).then((students) => {
			students.forEach((student) => studentsEmails.push(student.email));
			var transporter = nodemailer.createTransport({
  				service: 'gmail',
  				auth: {
    			user: 'troy0870@gmail.com',
    			pass: process.env.Jello
  				}
			});

			var mailOptions = {
  				from: 'troy@gmail.com',
  				to: studentsEmails,
  				subject: req.title,
  				text: req.description
			};

			transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
    			console.log(error);
  			} 
			});
		}).catch((e) => {
			console.log(e);
		});

		res.redirect('dashboard');
});


app.get('/exportFile', (req,res,next) => {
	Student.find({}).then((students) => {
	var data='';
	for (var i = 0; i < students.length; i++) {
    	data=data+(i+1)+'\t'+students[i].collegeID+'\t'+students[i].rollNO+'\t'
    		+students[i].first_name+'\t'+students[i].last_name+'\t'+students[i].email+'\t'
    		+students[i].phone+'\t'+students[i].tenthMarks+'\t'+students[i].twelvthMarks+'\n';
 	}
	fs.writeFile('studentsRecord.xls', data, (err) => {
    	if (err) throw err;
    	next();
 		});
	}).catch((e) => {
		console.log(e);
	});
}, (req,res,next) => {
		var file = __dirname+'/studentsRecord.xls';
		res.download(file);
});


app.get('/logout', (req,res) => {
	if(typeof req.session.email === 'undefined'){	
		res.redirect('/login');
	}
	else{
		req.session.destroy();
		res.redirect('/');
	}
});


app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}...`);
});