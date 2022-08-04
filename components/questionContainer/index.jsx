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
			//设置加载状态
			setIsCompleted(false)
			setIsLoading(true)
			setQuestionList([])
			let queryData = {tag: {id:tabIndex, context:tab}, page: currentPage}
			questionList.splice(0)
			getMoreQuestion(queryData)
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
				page: currentPage,
				tag: {id: tabIndex, context: tab}
			}
		} else {
			queryData = {
				page: currentPage,
				summary: props.keyword
			}
		}

		getMoreQuestion(queryData)
		
	}

	//获取问题函数
	const getMoreQuestion = (queryData) => {
		//获取问题列表
		getQuestionsApi(queryData, ({data}) => {
			//若返回列表为空，则将加载状态设置为完成
			if(data.questionList.length === 0) {
				setIsCompleted(true)
				setIsLoading(false)
			} else {
				//否则将问题加进列表
				data.questionList.map(item => questionList.push(item))
				setQuestionList([...questionList])
				setIsLoading(false)
				setCurrentPage(currentPage => currentPage +1)
			}
		}, () => { setIsLoading(false) })
	}

	/*
	*下滑加载模块
	*/
	//绑定dom元素
	const questionContainerRef = useRef()
	//添加滚动处理事件
	function handleScroll(e) {
		const { scrollTop, scrollHeight, clientHeight } = e.target
		let distance = scrollHeight - scrollTop - clientHeight
		if(distance <= 1 && distance >= -1) {
			addQuestion()
		}
	}
		
	//添加滚动监听
	useEffect(() => {
		questionContainerRef.current.addEventListener('scroll', handleScroll)
		return () => {
			if(questionContainerRef.current) questionContainerRef.current.removeEventListener('scroll', handleScroll)
		}
	}, [tab, tabIndex])

	return (
		<div className={styles['question-container']} ref={questionContainerRef}>
			{questionList.map(item => <QuestionItem key={item.questionID} question={item}/>)}
			{
				isCompleted
				?
				<div className={styles['question-footer']}>
					<span>已全部加载完成</span>
					<button>回到顶部</button>
				</div>
				:
				isLoading
				?
				<div className={styles['question-footer']}>
					<span>loading...</span>
				</div>
				:
				<div className={styles['question-footer']}>
					<button onClick={() => { addQuestion() }}>点击</button>
					<span>加载更多</span>
				</div>
			}
		</div>
	)
}

QuestionContainerComponent.propTypes = {
	mode: PropTypes.string.isRequired
}

export default QuestionContainerComponent