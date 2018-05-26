const isEmptyObj = obj => {
	for (let k in obj) {
		return false
	}
	return true
}

module.exports = {
	isEmptyObj
}