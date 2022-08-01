import Head from 'next/head'
import { useState, useEffect } from 'react'
import DropDownContainer from '/components/dropDownContainer'
import styles from './style.module.scss'

function mineQandAPage() {
	//定义问题列表
	const [questionList, setQuestionList] = useState([])

	//定义解决方案列表
	const [solutionList, setSolutionList] = useState([])

	useEffect(() => {
		for(let item of 'qwerty') {
			questionList.push({
				title: '这是你发布的问题',
				summary: '是的，这是你发布的问题',
				date: '2022-2-22',
				questionID: item + Date.now()
			})
		}
		setQuestionList([...questionList])

		for(let item of 'qwerty') {
			solutionList.push({
				title: '这是你发布的问题',
				summary: '是的，这是你发布的问题',
				solution: '这是万中无一的解决方案，信我，保你长生，永垂不朽，你先这样，在那样，最后这样，就可以了<img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA107bQo.img?w=640&h=236&m=6"/><img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA107bQm.img?w=640&h=269&m=6"/>',
				date: '2022-2-22',
				questionID: item + Date.now()
			})
		}

		setSolutionList([...solutionList])
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