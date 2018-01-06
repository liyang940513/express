var mongoose = require('../utils/database.js');

var Job = mongoose.model('job', {
	company: String,
	position: String,
	salary: String,
	address: String,
	filename: String
});

module.exports = {
	addJob( company, position, salary, address, filename, cb) {
		var job = new Job( {company, position, salary, address, filename} );
		job.save(function(err) {
			cb(err);
		})
	},
	getJob(params, cb) {
		Job.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	getJobByPage(page, size, cb) {
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Job.find({}).limit(size).skip((page - 1) * size).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	removeItemById(id, cb) {
		Job.findByIdAndRemove(id, (err) => {
			cb(err);
		})
	},
	getJobById(id, cb) {
		Job.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	updateJobById(id, params, cb) {
		Job.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	}
}
