/*const bcrypt = require('bcryptjs');


var pass = '123abc';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(pass,salt, (err,hash) => {
		console.log(hash);
	});
});

hashedPass = '$2a$10$HT8ueb8nH7.TP1XcKsD3Y.ZGhC4ezO/QcmlWrYMs7/Xa775zU2H/q';


bcrypt.compare(pass, hashedPass, (err,res) => {
	console.log(res);
});*/

var obj = [{
	email:'f@gmail.com'
},{
	email:'jg@gmail.com'
}];

var arr = [];

obj.forEach((obj) => arr.push(obj.email));

