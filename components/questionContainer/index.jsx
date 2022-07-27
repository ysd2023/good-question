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
	const [questionList, setQuestionList] = mode === 'tab' ? useState([]) : useState(props.questionList)
	//定义完成状态
	const [isCompleted, setIsCompleted] = useState(false)
	//定义加载状态
	const [isLoading, setIsLoading] = useState(true)
	//定义标签和初始化状态
	const { tab, keyword } = useSelector(state => state)

	useEffect(() => {
		if(tab !== '') {
			setIsLoading(true)
			setQuestionList([])
			setTimeout(() => {
				getQuestionsApi({tag: tab}, ({data}) => {
					questionList.splice(0)
					data.questionList.map(item => questionList.push(item))
					setQuestionList([...questionList])
					setIsLoading(false)
				}, () => { setIsloading(false) })
			}, 1000)
		}
	}, [tab])

	//定义增加问题列表事件
	const addQuestion = () => {
		if(mode == 'tab') console.log(tab)
		else console.log(keyword)
		setIsLoading(true)
		setTimeout(() => {
			const newList = Array.from(new Array(10).keys())
			newList.map(item => {
				questionList.push(Date.now() + item)
			})
			setQuestionList([...questionList])
			setIsLoading(false)
		}, 800)
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
			console.log('到底了')
			addQuestion()
		}
	}
		
	//添加滚动监听
	useEffect(() => {
		// if(mode == 'search') setQuestionList([...props.questionList])
		questionContainerRef.current.addEventListener('scroll', handleScroll)
		return () => {
			if(questionContainerRef.current) questionContainerRef.current.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className={styles['question-container']} ref={questionContainerRef}>
			{questionList.map(item => <QuestionItem key={item}/>)}
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