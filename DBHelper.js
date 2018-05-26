const isEmptyObj = require('./utils').isEmptyObj
const db = require('mysql')
const config = require('./config')

let pools = db.createPool({
	user: config.db.user,
	port: config.db.port,
	password: config.db.password,
	database: config.db.db,
	host: config.db.host,
	connectionLimit: 20
})

let formatFilter = filter => {
	let fq = `where `
	for (let k in filter) {
		let v = filter[k]
		fq += `${k}='${v}' and `
	}
	fq = fq.slice(0, fq.length - 4)
	return fq
}

let querySql = payload => {
	return new Promise((resolve, reject) => {
		pools.getConnection((err, connection) => {
			let pojos = null
			if (err) {
				console.log(err)
				reject(pojos)
			}
			let sql = payload.sql || null
			let value = payload.value || null
			connection.query(sql, value, (err, results) => {
				connection.release()
				if (err) {
					console.log(err)
					reject(pojos)
				}
				else {
					resolve(results)
				}
			})
		})
	})
}



function DBInit(tb, _columns) {
	if (tb) this.tableName = tb
	if (_columns) this.columns = JSON.parse(JSON.stringify(_columns))
	this.filter = {}
}

/**
 * 
 * @param {添加筛选条件} _filter 
 */
DBInit.prototype.add = function (_filter) {
	this.filter = {}
	for (let k in _filter) {
		let v = _filter[k]
		this.filter[k] = v
	}
}

/**
 * 查询数据库表
 * @param {开始行数} start 
 * @param {结束函数} end 
 */
DBInit.prototype.search = function (start, end) {
	let sql = `select * from ${this.tableName}`
	if (!isEmptyObj(this.filter)) {
		sql += ` ${formatFilter(this.filter)}`
	}
	if (start && end) {
		sql += `limit ${start}, ${end}`
	}
	return querySql({
		sql
	})
}

DBInit.prototype.delete = function () {
	let sql = `delete from ${this.tableName}`
	if (!isEmptyObj(this.filter)) {
		sql += ` ${formatFilter(this.filter)}`
	}
	return querySql({
		sql
	})
}

DBInit.prototype.update = function (newOne) {
	let sql = `update ${this.tableName} set ? ${formatFilter(this.filter)}`
	return querySql({
		sql,
		value: newOne
	})
}

DBInit.prototype.insert = function () {
	let sql = `insert into ${this.tableName} set ?`
	return querySql({
		sql,
		value: this.filter
	})
}

module.exports = DBInit