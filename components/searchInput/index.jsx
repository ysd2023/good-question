import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import createAction from '/redux/createAction'
import styles from './style.module.scss'
import { getSuggestionApi } from '/middleware/request'

//定义时间计时器
let timer = null

function SearchInputComponent(props) {
	//定义路由
	const router = useRouter()

	//绑定下拉框的可见性
	const [isShow, setIsShow] = useState(false)

	//定义修改store的keyword
	const changeKeyWord = useDispatch()

	/*
	*搜索联想功能模块
	*/
	//定义绑定搜索框的关键值
	const [keyword, setKeyword] = useState('')
	//定义联想建议事件
	const getSuggestion = () => {
		//发送请求获取建议
		getSuggestionApi({ keyword }, ({data}) => {
			suggestionList.splice(0)
			data.map(item => {suggestionList.push(item)})
			setSuggestionList([...suggestionList])
		}, (err) => { console.log(err) })
	}
	//定义防抖事件
	const deBounce = (value) => {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			if(keyword) { 
				setIsShow(true)
				getSuggestion() 
			}
			else {
				setIsShow(false) 
				setSuggestionList([]) 
			}
		}, 500)
	}
	//当keyword发生变化时，获取建议
	useEffect(deBounce, [keyword])

	/*
	*下拉面板模块
	*/
	//定义建议列表
	const [suggestionList, setSuggestionList] = useState([])
	//定义搜索跳转事件
	const searchTo = (keyword) => {
		changeKeyWord(createAction('changesearch', keyword))
		router.push({ pathname: '/question/search', query: { keyword } })
	}

	/*
	* 定义取消搜索模块
	*/
	//定义取消事件
	const cancleSearch = () => {
		setIsShow(false)
		router.push({ pathname: '/' })	
	}

	//监听键盘回车事件
	const handleEnter = (keycode) => {
		if(keycode == 13) {
			router.push({ pathname: '/question/search', query: { keyword: keyword } })
		}
	}

	//绑定搜索框dom元素
	const inputRef = useRef()
	//添加自动聚焦
	const autoFocus = () => {
		inputRef.current.focus()
	}
	//加载完毕聚焦
	useEffect(() => {
		autoFocus()
	}, [])

	return (
		<div className={styles['input-search']}>
			<section className={styles['input-search-title']}>
				<input type="text" placeholder="搜索" value={keyword} ref={inputRef}
				onChange={(e) => setKeyword(e.target.value)} onKeyUp={(e) => { handleEnter(e.keyCode) }}/>
				<button onClick={() => cancleSearch()}>取消</button>
			</section>
			<section className={`${isShow ? styles['input-search-panel-show'] : styles['input-search-panel-default']}`}>
				<ul>
					{
						suggestionList.map(item => (
						<li key={item} onClick={() => { searchTo(item) }}>
							<svg width="18" height="18" viewBox="0 0 24 24" datanewapi="Search24" dataoldapi="Search" fill="currentColor"><g fillRule="evenodd" clipRule="evenodd"><path d="M11.5 18.389c3.875 0 7-3.118 7-6.945 0-3.826-3.125-6.944-7-6.944s-7 3.118-7 6.944 3.125 6.945 7 6.945zm0 1.5c4.694 0 8.5-3.78 8.5-8.445C20 6.781 16.194 3 11.5 3S3 6.78 3 11.444c0 4.664 3.806 8.445 8.5 8.445z"></path><path d="M16.47 16.97a.75.75 0 011.06 0l3.5 3.5a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06z"></path></g></svg>
							<span>{item}</span>
						</li>))
					}
				</ul>
			</section>
		</div>
	)
}

export default SearchInputComponent