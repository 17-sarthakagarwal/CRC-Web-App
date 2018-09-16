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
});

var obj = [{
	email:'f@gmail.com'
},{
	email:'jg@gmail.com'
}];

var arr = [];

obj.forEach((obj) => arr.push(obj.email));

*/
/*var excel = require('excel4node');

var workbook = new excel.Workbook();

var worksheet = workbook.addWorksheet('Sheet 1');
var worksheet2 = workbook.addWorksheet('Sheet 2');

worksheet.cell(1,1).string('content for display');

workbook.write('report.xlsx');*/

v/*ar fs = require('fs');

var jsn = [{
    "name": "Nilesh",
    "school": "RDTC",
    "marks": "77"
   },{
    "name": "Sagar",
    "school": "RC",
    "marks": "99.99"
   },{
    "name": "Prashant",
    "school": "Solapur",
    "marks": "100"
 }];

var data='';
for (var i = 0; i < jsn.length; i++) {
    data=data+jsn[i].name+'\t'+jsn[i].school+'\t'+jsn[i].marks+'\n';
 }
fs.appendFile('Filename.xls', data, (err) => {
    if (err) throw err;
    console.log('File created');
 });*/

 