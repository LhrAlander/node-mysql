## 面向对象地调用mysql库
在POJO文件夹下建立与数据库表字段名相对应地对象后，使得该类继承自DBHelper类，DBHelper类实现增删改查。
调用add方法以添加筛选条件，再调用相应的search、delete、update和insert方法完成操作
````
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
````