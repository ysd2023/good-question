import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { getSolutionApi } from '/middleware/request'
import styles from './style.module.scss'
import CommentArea from '/components/commentArea'

function questionDetailPage(props) {
	//解构 发布者、问题、解决方案
	const { publisher, question, solutions } = props

	//定义路由
	const router = useRouter()

	//绑定解决方案段落的dom元素
	const solutionRef = useRef()

	/*
	*解决方案加载、切换模块
	*/
	//定义并初始化解决方案列表
	const [solutionList, setSolutionList] = useState(solutions.solutionList)

	//定义并初始化显示的解决方案
	const [currentSolution, setCurrentSolution] = useState(solutions.solutionList[0] || {})

	//定义并初始化解决方案的索引
	const [currentIndex, setCurrentIndex] = useState(0)

	//定义解决方案切换事件 'up': '上一个解决方案', 'down': '下一个解决方案'
	const changeSolution = (direction) => {
		if(direction === 'up') {
			//将当前解决方案更改为上一个
			if(currentIndex === 0) {
				//若当前为第一个解决方案，则决绝操作
				alert('当前为第一个方案')
			} else {
				//更改索引
				setCurrentIndex(currentIndex - 1)
			}
		} else if(direction === 'down') {
			//将当前解决方案更改为下一个
			if(currentIndex === (solutionList.length - 1)) {
				//若当前为最后一个方案，则请求新的方案
				getSolutionApi(null, ({data}) => {
					if(data.solutionList.length === 0) {
						//返回列表为空，显示已加载完成
						alert('已加载所有方案')
					} else {
						//将新的方案列表，添加到后面
						console.log(data.solutionList)
						setSolutionList(solutionList.concat(data.solutionList))
						setCurrentIndex(currentIndex + 1)
					}
				})
			} else {
				//更改索引
				setCurrentIndex(currentIndex + 1)
			}
		}
	}

	//监听索引变化，更新当前解决方案
	useEffect(() => {
		if(solutionList.length !== 0) {
			setCurrentSolution(solutionList[currentIndex])
		}
		console.log(currentIndex)
	}, [currentIndex])

	//监听currentSolution变化，解决方案段落内容
	useEffect(() => {
		if(solutionRef.current) {
			solutionRef.current.innerHTML = currentSolution.solution.content
		}
	}, [currentSolution])


	/*
	*评论模块
	*/
	//定义评论列表

	//定义评论区打开状态
	const [commentStatus, setCommentStatus] = useState(false)


	//定义dock工具栏的开关状态
	const [isDockOpen, setIsDockOpen] = useState(true)

	return (
		<div>
			<Head>
		        <title>好问题-详情</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <h2 className={styles['question-title']}>{question.title}</h2>
		    <div className={styles['publisher-container']}>
		    	<span className={styles['question-avatar']}>
		    		<img src={publisher.avatar} alt="这是头像"/>
		    	</span>
		    	<span>{publisher.nickName}</span>
		    </div>
		    <div className={styles['question-container']}>
		    	<p className={styles['question-summary']}>{question.summary}</p>
		    	<section className={styles['question-image']}>
			    	{
			    		question.imageDescription.map(item => <div key={item}><img src={item}/></div>)
			    	}
		    	</section>
		    </div>
		    <p className={styles['solution-num']}>{props.solutionNum}个解决方案</p>
		    <div className={styles['solution-container']}>
		    	<section className={styles['solution-resolver']}>
		    		<span className={styles['question-avatar']}>
		    			<img src={currentSolution.resolver.avatar} alt="这是头像"/>
		    		</span>
		    		<span>{currentSolution.resolver.nickName}</span>
		    	</section>
		    	<section className={styles['solution-cite']}>
		    		“<p>{currentSolution.citeSolution.resolverName}:</p>
		    		<p>{currentSolution.citeSolution.content}</p>”
		    	</section>
		    	<div ref={solutionRef} className={styles['solution-content']}></div>
		    	<hr/>
		    	<section className={styles['solution-attitude']}>
		    		<span onClick={() => {setCommentStatus(!commentStatus)}}>评论{currentSolution.solution.comment}</span>
		    		<span>赞同{currentSolution.solution.favor}</span>
		    		<span>反对{currentSolution.solution.opposition}</span>
		    		<br/>
		    		<br/>
		    	</section>
		    </div>
		    <button className={styles['dock-btn']} onClick={() => setIsDockOpen(!isDockOpen)}>
		    	<svg t="1658990316794" className={`${!isDockOpen ? styles['dock-btn-open'] : styles['dock-btn-close']}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3439" width="200" height="200"><path d="M128 42.666667h256c46.933333 0 85.333333 38.4 85.333333 85.333333v256c0 46.933333-38.4 85.333333-85.333333 85.333333H128c-46.933333 0-85.333333-38.4-85.333333-85.333333V128c0-46.933333 38.4-85.333333 85.333333-85.333333z" fill="#3399FF" p-id="3440"></path><path d="M384 490.666667H128c-59.733333 0-106.666667-46.933333-106.666667-106.666667V128c0-59.733333 46.933333-106.666667 106.666667-106.666667h256c59.733333 0 106.666667 46.933333 106.666667 106.666667v256c0 59.733333-46.933333 106.666667-106.666667 106.666667zM128 64C91.733333 64 64 91.733333 64 128v256c0 36.266667 27.733333 64 64 64h256c36.266667 0 64-27.733333 64-64V128c0-36.266667-27.733333-64-64-64H128z" p-id="3441"></path><path d="M640 42.666667h256c46.933333 0 85.333333 38.4 85.333333 85.333333v256c0 46.933333-38.4 85.333333-85.333333 85.333333H640c-46.933333 0-85.333333-38.4-85.333333-85.333333V128c0-46.933333 38.4-85.333333 85.333333-85.333333z" fill="#FFFFFF" p-id="3442"></path><path d="M896 490.666667H640c-59.733333 0-106.666667-46.933333-106.666667-106.666667V128c0-59.733333 46.933333-106.666667 106.666667-106.666667h256c59.733333 0 106.666667 46.933333 106.666667 106.666667v256c0 59.733333-46.933333 106.666667-106.666667 106.666667zM640 64c-36.266667 0-64 27.733333-64 64v256c0 36.266667 27.733333 64 64 64h256c36.266667 0 64-27.733333 64-64V128c0-36.266667-27.733333-64-64-64H640z" p-id="3443"></path><path d="M128 554.666667h256c46.933333 0 85.333333 38.4 85.333333 85.333333v256c0 46.933333-38.4 85.333333-85.333333 85.333333H128c-46.933333 0-85.333333-38.4-85.333333-85.333333V640c0-46.933333 38.4-85.333333 85.333333-85.333333z" fill="#FFFFFF" p-id="3444"></path><path d="M384 1002.666667H128c-59.733333 0-106.666667-46.933333-106.666667-106.666667V640c0-59.733333 46.933333-106.666667 106.666667-106.666667h256c59.733333 0 106.666667 46.933333 106.666667 106.666667v256c0 59.733333-46.933333 106.666667-106.666667 106.666667zM128 576c-36.266667 0-64 27.733333-64 64v256c0 36.266667 27.733333 64 64 64h256c36.266667 0 64-27.733333 64-64V640c0-36.266667-27.733333-64-64-64H128z" p-id="3445"></path><path d="M640 554.666667h256c46.933333 0 85.333333 38.4 85.333333 85.333333v256c0 46.933333-38.4 85.333333-85.333333 85.333333H640c-46.933333 0-85.333333-38.4-85.333333-85.333333V640c0-46.933333 38.4-85.333333 85.333333-85.333333z" fill="#FFBF80" p-id="3446"></path><path d="M896 1002.666667H640c-59.733333 0-106.666667-46.933333-106.666667-106.666667V640c0-59.733333 46.933333-106.666667 106.666667-106.666667h256c59.733333 0 106.666667 46.933333 106.666667 106.666667v256c0 59.733333-46.933333 106.666667-106.666667 106.666667zM640 576c-36.266667 0-64 27.733333-64 64v256c0 36.266667 27.733333 64 64 64h256c36.266667 0 64-27.733333 64-64V640c0-36.266667-27.733333-64-64-64H640z" p-id="3447"></path></svg>
		    	<svg t="1658990687360" className={`${isDockOpen ? styles['dock-btn-open'] : styles['dock-btn-close']}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5243" width="200" height="200"><path d="M913.15 260.51a480.53 480.53 0 0 0-203.8-174 40 40 0 0 0-32.92 72.91C819.53 224.06 912 367.23 912 524.19c0 220.56-179.44 400-400 400s-400-179.44-400-400c0-157 92.47-300.14 235.57-364.75a40 40 0 0 0-32.92-72.91 480 480 0 1 0 598.5 174z" fill="#FF8429" p-id="5244"></path><path d="M172.06 524.19a15 15 0 1 0-30 0 369.94 369.94 0 1 0 739.88 0 369 369 0 0 0-120.59-273.27 15 15 0 1 0-20.23 22.16 340.79 340.79 0 0 1 110.82 251.11c0 187.44-152.5 339.94-339.94 339.94S172.06 711.64 172.06 524.19z" fill="#FF8429" p-id="5245"></path><path d="M692.89 218.75m-15 0a15 15 0 1 0 30 0 15 15 0 1 0-30 0Z" fill="#FF8429" p-id="5246"></path><path d="M512 595.26a40 40 0 0 0 40-40V59.81a40 40 0 0 0-80 0v495.45a40 40 0 0 0 40 40z" fill="#00CEDD" p-id="5247"></path></svg>
		    </button>
		    <div className={`${styles['dock-operation-default']} ${isDockOpen ? styles['dock-operation-open'] : styles['dock-operation-close']}`}>
		    	<button onClick={() => router.push({ pathname: `/editor/solution/${props.question_id}` })}>
		    		<svg t="1658995852328" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8504" width="200" height="200"><path d="M112.5 650l542.4-542.4c10.3-10.3 24.1-16 38.9-16s28.6 5.7 38.9 16l183.8 183.8c10.3 10.3 16 24.1 16 38.9s-5.7 28.6-16 38.9L374.1 911.6 112.5 650z" fill="#FFCC72" p-id="8505"></path><path d="M693.7 116.6c8.1 0 15.6 3.1 21.2 8.7l183.8 183.8c5.6 5.6 8.7 13.1 8.7 21.2s-3.1 15.6-8.7 21.2L374.1 876.3 147.8 650l524.7-524.7c5.6-5.6 13.2-8.7 21.2-8.7m0-50c-20.5 0-41 7.8-56.6 23.3l-560 560 297 297 560-560c31.1-31.1 31.1-82 0-113.1L750.3 90c-15.6-15.6-36.1-23.4-56.6-23.4z" fill="#3A3644" p-id="8506"></path><path d="M557.3 205.2l97.6-97.6c10.3-10.3 24.1-16 38.9-16s28.6 5.7 38.9 16l183.8 183.8c10.3 10.3 16 24.1 16 38.9 0 14.8-5.7 28.6-16 38.9l-97.6 97.6-261.6-261.6z" fill="#F95360" p-id="8507"></path><path d="M693.7 116.6c8.1 0 15.6 3.1 21.2 8.7l183.8 183.8c5.6 5.6 8.7 13.1 8.7 21.2s-3.1 15.6-8.7 21.2l-79.9 79.9-226.2-226.2 79.9-79.9c5.6-5.6 13.2-8.7 21.2-8.7m0-50c-20.5 0-41 7.8-56.6 23.3L521.9 205.2l297 297L934.1 387c31.1-31.1 31.1-82 0-113.1L750.3 90c-15.6-15.6-36.1-23.4-56.6-23.4z" fill="#3A3644" p-id="8508"></path><path d="M582 265.3l35.4 35.4-409.2 409.2-35.4-35.4L582 265.3zM243.5 745.2l35.4 35.4 409.2-409.2-35.4-35.4-409.2 409.2z m479.9-338.4L314.2 815.9l35.4 35.4 409.2-409.2-35.4-35.3z" fill="#ED9D29" p-id="8509"></path><path d="M621.064 176.827L847.336 403.1l-28.284 28.284L592.78 205.111z" fill="#ED3248" p-id="8510"></path><path d="M557.202 240.573l226.272 226.272-28.284 28.284-226.272-226.272z" fill="#A87729" p-id="8511"></path><path d="M101.8 660.7l10.9-10.9 261.2 261.1-11 11-270.5 9.3z" fill="#E5E5E5" p-id="8512"></path><path d="M125.5 697.9l200.2 200.2-207.4 7.1 7.2-207.3m-12.8-83.5L77.1 650 66.5 957.1l307.1-10.6 35.6-35.6-296.5-296.5z" fill="#3A3644" p-id="8513"></path><path d="M95.5 875.8l52.8 52.8-55.3 2.5z" fill="#E5E5E5" p-id="8514"></path><path d="M73.1 818.1l-6.3 139.3 139.3-6.4-133-132.9z" fill="#3A3644" p-id="8515"></path><path d="M326.2 898.4l-168.4 4.3-15-15 117.8-54.9z" fill="#BFBFBF" p-id="8516"></path></svg>
		    	</button>
		    	<button onClick={() => router.push({ pathname: `/editor/solution/${props.question_id}/${currentSolution.rid}` })}>
		    		<svg t="1658995930595" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11739" width="200" height="200"><path d="M277.942857 416.914286h285.257143V204.8H219.428571v51.2h292.571429V365.714286H219.428571v219.428571h292.571429c0 87.771429-7.314286 146.285714-14.628571 168.228572-7.314286 21.942857-36.571429 36.571429-95.085715 36.571428h-73.142857l14.628572 51.2h65.828571c80.457143 0 124.342857-21.942857 131.657143-65.828571 21.942857-36.571429 29.257143-117.028571 29.257143-234.057143h-292.571429V416.914286zM950.857143 0H73.142857C36.571429 0 0 36.571429 0 73.142857v877.714286c0 36.571429 36.571429 73.142857 73.142857 73.142857h877.714286c36.571429 0 73.142857-36.571429 73.142857-73.142857V73.142857c0-36.571429-36.571429-73.142857-73.142857-73.142857z m21.942857 950.857143c0 14.628571-7.314286 21.942857-21.942857 21.942857H73.142857c-14.628571 0-21.942857-7.314286-21.942857-21.942857V73.142857C51.2 58.514286 58.514286 51.2 73.142857 51.2h877.714286c14.628571 0 21.942857 7.314286 21.942857 21.942857v877.714286zM731.428571 848.457143h51.2V175.542857H731.428571v672.914286z" p-id="11740" fill="#f89a5a"></path></svg>
		    	</button>
		    	<button onClick={() => { changeSolution('up') }}>
		    		<svg t="1658996028829" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19008" width="200" height="200"><path d="M517.5 288L215.4 665.2c-13.2 16.5-0.7 40.3 20.9 39.7l625.3-17.8c21.5-0.6 48.7-32.9 34.6-48.6L557 286.8c-10.5-11.7-29.6-11.2-39.5 1.2z" fill="#25B195" p-id="19009"></path><path d="M877 707.5H153.2c-18.8 0-35.5-10.5-43.7-27.4-8.2-16.9-6-36.5 5.6-51.3L477 171.3c9.3-11.7 23.1-18.4 38.1-18.4 14.9 0 28.8 6.7 38.1 18.4l361.9 457.5c11.6 14.7 13.8 34.4 5.6 51.3s-24.9 27.4-43.7 27.4zM506.1 194.3L144.2 651.8c-4.1 5.1-2.3 10.2-1.3 12.2 0.9 2 3.9 6.5 10.4 6.5H877c6.5 0 9.5-4.6 10.4-6.5 0.9-2 2.7-7.1-1.3-12.2L524.2 194.3c-3-3.8-7-4.4-9.1-4.4-2.1 0-6 0.6-9 4.4z" fill="#595857" p-id="19010"></path></svg>
		    	</button>
		    	<button onClick={() => { changeSolution('down') }}>
		    		<svg t="1658996009272" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17019" width="200" height="200"><path d="M288.6 389.1H866c13 0-26.7 10.8-21 24 5.7 13.2-19.5 25.8-27.6 37.3L566.3 806.7c-6.4 9.1-16.1 14.4-26.4 14.4-10.4 0-49.8-1.4-56.3-10.5L262.2 450.4c-8.1-11.5-9.6-26.8-3.9-39.9s17.3-21.4 30.3-21.4z m-7.2 33.9" fill="#25B195" p-id="17020"></path><path d="M153.2 292.4H877c18.8 0 35.5 10.5 43.7 27.4 8.2 16.9 6 36.5-5.6 51.3L553.2 828.5c-9.3 11.7-23.1 18.4-38.1 18.4-14.9 0-28.8-6.7-38.1-18.4L115.2 371c-11.6-14.7-13.8-34.4-5.6-51.3s24.9-27.3 43.6-27.3z m371 513.2L886 348.1c4.1-5.1 2.3-10.2 1.3-12.2-0.9-2-3.9-6.5-10.4-6.5H153.2c-6.5 0-9.5 4.6-10.4 6.5-0.9 2-2.7 7.1 1.3 12.2L506 805.6c3 3.8 7 4.4 9.1 4.4 2.1 0 6.1-0.6 9.1-4.4z" fill="#595857" p-id="17021"></path></svg>
		    	</button>
		    </div>
		    <div className={`${styles['comment-container-default']} ${ commentStatus ? styles['comment-container-open'] : styles['comment-container-close']}`}>
	    		<div className={styles['comment-area']}>
	    			<CommentArea rid={currentSolution.rid || 'null'}/>
	    		</div>
		    </div>
		    <footer className={styles['question-detail-footer']}>
		    	<p>
		    		<span>这里是页脚</span>
		    		<span>没有特别鸣谢</span>
		    		<span>没有友情链接</span>
		    	</p>
		    	<br/>
		    	<br/>
		    	<br/>
		    	<br/>
		    </footer>
		</div>
	)
}

export default questionDetailPage

export async function getServerSideProps(context) {
	const { query } = context
	query.question_id = query.question_id || ''
	console.log(query.question_id)

	const question = {
		title: '震惊？震惊！这是有史以来最大的一个问题！',
		summary: '为什么会有震惊？为什么会有震惊？为什么吸引眼球要使用震惊？',
		imageDescription: [
			'https://inews.gtimg.com/newsapp_bt/0/13461437480/1000',
			'https://inews.gtimg.com/newsapp_bt/0/13461437520/1000'
		],
		tag: '社会热点'
	}

	const publisher = {
		nickName: '吾名史珍香',
		avatar: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.x09r5tGxTyGiAchyk-KCjQAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2'
	}

	const res = await fetch('http://localhost:3000/api/getSolution')
	const data = await res.json()

	return {
		props: {
			question_id: query.question_id,
			solutions: data,
			question,
			publisher,
			solutionNum: 10
		}
	}
}