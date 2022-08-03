import Head from 'next/head'
import { useState, useEffect } from 'react'
import DropDownContainer from '/components/dropDownContainer'
import styles from './style.module.scss'

import { userQuestionApi, userSolutionApi } from '/middleware/request'

function mineQandAPage() {
	//定义问题列表
	const [questionList, setQuestionList] = useState([])

	//定义解决方案列表
	const [solutionList, setSolutionList] = useState([])

	useEffect(() => {
		userSolutionApi((res) => {
			if(res.data) {
				setSolutionList([...res.data.solutionList])
			} else {
				alert('网络错误，请刷新页面')
			}
		}, (err) => {console.log(err)})
		userQuestionApi((res) => {
			if(res.data) {
				setQuestionList([...res.data.questionList])
			} else {
				alert('网络错误，请刷新页面')
			}
		}, (err) => {alert('网络错误，请刷新页面')})		
	}, [])

	return (
		<div>
			<Head>
		        <title>好问题-活跃</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <p className={styles['page-title']}>活跃相关</p>
		    <div>
		    	<DropDownContainer title="发布的问题">
		    		{
		    			questionList.map(question => (
		    				<div key={question.questionID} className={styles['list-item-container']}>
		    					<h2>{question.title}</h2>
		    					<p>{question.summary}</p>
		    					<div>{question.date}</div>
		    				</div>
	    				))
		    		}
		    	</DropDownContainer>
		    	<DropDownContainer title="发布的解决方案">
		    		{
		    			solutionList.map(solution => (
		    				<div key={solution.questionID} className={styles['list-item-container']}>
		    					<h2>{solution.title}</h2>
		    					<p>{solution.summary}</p>
		    					<h3>你的方案:</h3>
		    					<section dangerouslySetInnerHTML={{__html: solution.solution}}></section>
		    					<div>{solution.date}</div>
		    				</div>
	    				))
		    		}
		    	</DropDownContainer>
		    </div>
		</div>
	)
}

export default mineQandAPage

export async function getServerSideProps(context) {
	if(!context.req.headers.cookie) {
		return {
			 	redirect: {
				 		destination: '/grant'
			 	}
		 }
	}
	//验证登录状态
	let resLogin = await axios({
		method: 'get',
		url: '/api/auth',
		headers: { cookie: context.req.headers.cookie }
	})


	//未登录则重定向登录界面
	if(!resLogin.data.statu) {
		 return {
			 	redirect: {
				 		destination: '/grant'
			 	}
		 }
	}

	return {
		props: {}
	}
}