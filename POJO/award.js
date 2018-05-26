const DBInit = require('../DBHelper')
function AwardPojo() {
	let awardPOJO = {
		award_id: '',
		award_time: '',
		award_name: '',
		award_identity: '',
		award_level: ''
	}
	DBInit.call(this, 'award', awardPOJO)
}
AwardPojo.prototype = new DBInit()
AwardPojo.prototype.constructor = AwardPojo
AwardPojo.prototype.order = function () {
	console.log('custom your own function here')
}

let award = new AwardPojo()

award.add({
	award_id: 'qwe'
})
award.update({
	award_name: '修改测试'
})
	.then(res => {
		award.add({
			award_id: '123',
			award_time: '2018-05-31',
			award_name: '服务外包大赛',
			award_identity: '国赛',
			award_level: '一等奖'
		})
		return award.insert()
	})
	.then(res => {
		award.add({
			award_id: 'qwe'
		})
		return award.delete()
	})
	.then(res => {
		console.log('delete success', res)
	})
	.catch(err => {
		console.log(err)
	})