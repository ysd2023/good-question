import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './style.module.scss'
import QuestionItem from '/components/questionItem'

import { getQuestionsApi } from '/middleware/request'

function QuestionContainerComponent(props) {
	//获取模式属性，tab为首页渲染模式， search为搜索渲染模式
	const mode = props.mode 
	//定义问题列表
	const [questionList, setQuestionList] = useState([]) 
	//定义完成状态
	const [isCompleted, setIsCompleted] = useState(false)
	//定义加载状态
	const [isLoading, setIsLoading] = useState(true)
	//定义标签和初始化状态
	let { tab, tabIndex } = useSelector(state => state)
	//定义当前页数
	const [currentPage, setCurrentPage] = useState(0) 

	useEffect(() => {
		if(mode === 'search') {
			setQuestionList(props.questionList)
			setCurrentPage(props.page)
		}
	}, [])

	useEffect(() => {
		if(tab !== '') {
			setCurrentPage(0)
			setQuestionList([])
		}
	}, [tab, tabIndex])

	//定义增加问题列表事件
	const addQuestion = () => {
		//设置加载状态
		setIsCompleted(false)
		setIsLoading(true)
		let queryData = null

		if(mode === 'tab') {
			queryData = {
				pageNum: currentPage,
				tagID: tabIndex
			}
		} else {
			queryData = {
				pageNum: currentPage,
				summary: props.keyword
			}
		}

		getMoreQuestion(queryData)
		
	}

	//获取问题函数
	const getMoreQuestion = (queryData) => {
		//延时发送请求
		setTimeout(() => {
			//获取问题列表
			getQuestionsApi(queryData, ({data}) => {
				//若返回列表为空，则将加载状态设置为完成
				if(data.questionList.length === 0) {
					setIsCompleted(true)
				} else {
					//否则将问题加进列表
					data.questionList.map(item => questionList.push(item))
					setQuestionList([...questionList])
					setCurrentPage(() => data.page + 1)
				}
			}, () => { setIsLoading(false) })
		}, 500)
	}

	/*
	*下滑加载模块
	*/
	//绑定dom元素
	const loadingRef = useRef()
		
	// //添加滚动监听
	useEffect(() => {
		if(loadingRef.current) {
			console.log('进入视野前')
			const IO = new IntersectionObserver((entity, _) => {
				if(entity[0].isIntersecting) {
					console.log('进入视野')
					addQuestion()
					IO.unobserve(loadingRef.current)
				}
			})

			IO.observe(loadingRef.current)

			return () => {
				IO.disconnect()
			}
		}

	}, [currentPage])

	return (
		<div className={styles['question-container']}>
			{questionList.map(item => <QuestionItem key={item.questionID} question={item}/>)}
			{
				isCompleted
				?
				<div className={styles['question-footer']}>
					<span>已全部加载完成</span>
				</div>
				:
				isLoading
				?
				<div className={styles['question-footer']} ref={loadingRef}>
					<span>loading...</span>
				</div>
				:
				<div className={styles['question-footer']}>
					<button onClick={() => { addQuestion() }}>重新加载</button>
					<span>加载失败</span>
				</div>
			}
		</div>
	)
}

QuestionContainerComponent.propTypes = {
	mode: PropTypes.string.isRequired
}

export default QuestionContainerComponent