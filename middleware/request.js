import axios from './axios'

//获取联想建议
function getSuggestionApi(data, success, fail) {
	axios.get(`/api/suggest?keyword=${data.keyword}`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取问题列表
function getQuestionsApi(data, success, fail) {
	axios.get(`/api/getQuestions`, { params: data })
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取解决方案列表
function getSolutionApi(data, success, fail) {
	axios.get(`/api/getSolution?questionID=${data.question_id}&pageNum=${data.pageNum}`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取评论
function getCommentApi(data, success, fail) {
	axios.get(`/api/getComment?solutionID=${data.solutionID}&page=${data.page}`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//上传图片
function uploadImageApi(data, success, fail) {
	if(data.get('uploadImage') === 'undefined') {
		success({ data: {errno: -1} })
	} else {
		axios.post(`/api/uploadImage`, data)
		.then(res => success(res))
		.catch(err => fail(err))
	}
	
}

//获取分类标签
function getTabsApi() {
	return axios.get('/api/getType')
}

//表态
function indicateAttitudeApi(data, success, fail) {
	axios.post('/api/indicateAttitude', {solutionID: data.solutionID, attitude: data.attitude})
	.then(res => success(res))
	.catch(err => fail(err))
}

//发布评论
function publishCommentApi(data, success, fail) {
	axios.post('/api/Comment', {content: data.content, replyTarget: data.replyTarget, solutionID: data.solutionID})
	.then(res => success(res))
	.catch(err => fail(err))
}

//发布解决方案
function publishSolutionApi(data, success, fail) {
	axios.post('/api/publishSolution', {citeSolutionID: data.citeSolutionID, content: data.content, questionID: data.questionID})
	.then(res => success(res))
	.catch(err => fail(err))
}

//发布问题
function publishQuestionApi(data, success, fail) {
	axios.post('/api/publishQuestion', {
		question: {
			title: data.title,
			summary: data.summary,
			cover: data.cover,
			imageDescription: data.imageDescription,
			type: data.type,
			tag: data.tag
		}
	}).then(res => success(res)).catch(err => fail(err))
}

//修改个人信息
function updateUserApi(data, success, fail) {
	let userInfo = new FormData()
	if(data.avatar) userInfo.append('avatar', data.avatar)
	if(data.nickName) userInfo.append('nickName', data.nickName)
	axios.post('/api/updateUser', userInfo)
	.then(res => success(res))
	.catch(err => fail(err))
}

//修改密码
function updatePasswordApi(data, success, fail) {
	axios.post('/api/updatePassword', {newPassword: data.newPassword, oldPassword: data.oldPassword})
	.then(res => success(res))
	.catch(err => fail(err))
}

//退出登录
function quitApi(success, fail) {
	axios.get('/api/quit')
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取个人发布问题
function userQuestionApi(success, fail) {
	axios.get('/api/myQuestion')
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取个人发布解决方案
function userSolutionApi(success, fail) {
	axios.get('/api/mySolution')
	.then(res => success(res))
	.catch(err => fail(err))
}

//登录
function loginApi(data, success, fail) {
	axios.post('/api/login', {account: data.account, password: data.password})
	.then(res => success(res))
	.catch(err => fail(err))
}

//注册
function registerApi(data, success, fail) {
	axios.post('/api/register', {email: data.email, password: data.password, validCode: data.validCode})
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取验证码
function getCodeApi(data, success, fail) {
	axios.get(`/api/getCode?email=${data.email}`)
	.then(res => success(res))
	.catch(err => fail(err))
} 


//找回密码
function resetApi(data, success, fail) {
	axios.post('/api/reset', {account: data.account, newPassword: data.newPassword, validateCode: data.validateCode})
	.then(res => success(res))
	.catch(err => fail(err))
}

//登录状态验证
function authApi(success, fail) {
	axios.get('/api/auth')
	.then(res => success(res))
	.catch(err => fail(err))
}

export {
	getSuggestionApi,
	getQuestionsApi,
	getSolutionApi,
	getCommentApi,
	uploadImageApi,
	getTabsApi,
	indicateAttitudeApi,
	publishCommentApi,
	publishSolutionApi,
	publishQuestionApi,
	updateUserApi,
	updatePasswordApi,
	quitApi,
	userQuestionApi,
	userSolutionApi,
	loginApi,
	registerApi,
	getCodeApi,
	resetApi,
	authApi,
}