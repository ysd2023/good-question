import axios from './axios'

//获取联想建议
function getSuggestionApi(data, success, fail) {
	axios.get(`/api/suggestion?keyword=${data.keyword}`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取问题列表
function getQuestionsApi(data, success, fail) {
	axios.get(`/api/getQuestions?tag=${data.tag}`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取解决方案列表
function getSolutionApi(data, success, fail) {
	axios.get(`/api/getSolution`)
	.then(res => success(res))
	.catch(err => fail(err))
}

//获取评论
function getCommentApi(data, success, fail) {
	axios.get(`/api/getComment`)
	.then(res => success(res))
	.catch(err => fail(err))
}

function uploadImageApi(data, success, fail) {
	axios.post(`/api/uploadImage`, data)
	.then(res => success(res))
	.catch(err => fail(err))
}

export {
	getSuggestionApi,
	getQuestionsApi,
	getSolutionApi,
	getCommentApi,
	uploadImageApi
}