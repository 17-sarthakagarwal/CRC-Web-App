var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var StudentSchema = new mongoose.Schema({
	first_name:{
		type:String,
		required:true,
		trim:true,
		minLength:1
	},
	last_name:{
		type:String,
		required:true,
		trim:true,
		minLength:1,
		default:'---'
	},
	email:{
		type:String,
		required: true,
		minLength:1,
		unique:true,
		trim: true
	},
	uname:{
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	phone:{
		type:Number,
		required:true,
		trim:true,
		minLength:1,
	},
	type:{
		type:String,
		required: true,
		minLength:1,
		trim: true,
		default: 'Student'
	},
	password:{
		type:String,
		required: true,
		minLength:1,
		trim: true
	},
	gender:{
		type:String,
		required: true,
		minLength:1,
		trim: true
	},
	collegeID:{
		type:String,
		required:true,
		trim:true,
		default:'Not set yet',
		minLength:1
	},
	rollNO:{
		type:Number,
		required:true,
		default:0,
		trim:true,
		minLength:1
	},
	tenthMarks:{
		type:Number,
		required:true,
		default: 0,
		trim:true,
		minLength:1
	},
	twelvthMarks:{
		type:Number,
		required:true,
		default: 0,
		trim:true,
		minLength:1
	}
});


StudentSchema.statics.checkValidPasswords =  function(password, hashPassword) {

	return new Promise((resolve, reject) => {
		bcrypt.compare(password,hashPassword, (err, res) => {
			if(res){
				resolve();
			}
			else
			{
				reject();
			}
		});
	});
};


StudentSchema.pre('save', function (next){
	var student = this;
	if(student.isModified('password')){
		bcrypt.genSalt(5, (err, salt) => {
			bcrypt.hash(student.password,salt, (err,hash) => {
				student.password = hash;
				next();
		});
	});
	}
	else{
		next();
	}
});

var Student = mongoose.model('Student', StudentSchema);

module.exports = {Student};