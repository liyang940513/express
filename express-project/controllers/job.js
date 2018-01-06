const jobModel = require("../models/job.js");

module.exports = {
	addJob(req, res) {
		
		const { company, position, salary, address } = req.body;
		const filename = req.file ? req.file.filename : "";
		
		jobModel.addJob( company, position, salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},
	getJobList(req, res) {
		const { page, size } = req.query;
		let totalPage = 0;
		jobModel.getJob({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil(result.length / size) > 0 ? Math.ceil(result.length / size) : 1;
				jobModel.getJobByPage(page, size, (result) => {
					res.json({
						ret: true,
						data: {
							list: result,
							totalPage: totalPage 
						}
					})
				})
			}
		})
	},
	removeJob(req, res) {
		jobModel.removeItemById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},
	getJob(req, res) {
		jobModel.getJobById(req.query.id, (result) => {
			if(result && result !== "error"){
				res.json({
					ret: true,
					data: {
						info: (result && result !== "error") ? result : false
					}
				})
			}
		})
	},
	updateJob(req, res) {
		const {company, position, salary, address, id} = req.body;
		const filename = req.file ? req.file.filename : "";
		
		const params = {
			company,
			position,
			salary,
			address
		}
		
		if(req.file && req.file.filename) {
			params.filename = req.file.filename
		}
		
		jobModel.updateJobById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	}
}
