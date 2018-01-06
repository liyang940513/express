const positionModel = require("../models/position.js");

module.exports = {
	addPosition(req,res) {
		const { company, position, salary, address } = req.body;
		const filename = req.file ? req.file.filename : "";
		
		positionModel.addPosition( company, position, salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},
	getPositionList(req, res) {
		const { page, size } = req.query;
		let totalPage = 0;
		positionModel.getPosition({}, (result) => {
			if(result && result !== "error"){
				totalPage = Math.ceil(result.length / size) > 0 ? Math.ceil(result.length / size) : 1;
				positionModel.getPositionByPage(page, size, (result) => {
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
	removePosition(req, res) {
		positionModel.removeItemById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},
	getPosition(req, res){
		positionModel.getPositionById(req.query.id, (result) => {
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
	updatePosition(req, res) {
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
		
		positionModel.updatePositionById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	}
}
