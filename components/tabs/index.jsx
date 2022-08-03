import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import createAction from '/redux/createAction.js'
import styles from './style.module.scss'

function TabsComponent(props) {
	//获取相关属性
	const { tabList } = props
	//获取相关事件
	let { onTab, onEditor } = props

	onTab = onTab || function(tabName) { console.log(tabName) }


	/*
	*滚动模块相关
	*/
	//绑定标签索引的dom元素
	const indexesRef = useRef()
	//设置监听是否滚动到最右边的变量
	const [isRight, setIsRight] = useState(false)

    //监听滚动事件
	function onTabsScroll(e) {
		//获取相关参数，并判断是否已经位于滚动条右边
		const { scrollLeft, scrollWidth, clientWidth } = e.target
        
        //根据判断结果设置‘编辑’按钮的相关样式
        let distance = (scrollLeft + clientWidth) - scrollWidth
		if(distance < 1 && distance > -1) {
			setIsRight(true)
		} else {
			setIsRight(false)
		}
	}
    
    //为dom元素添加监听事件
	useEffect(() => {
		changeTabName(createAction('change', {tab:tabList[0], tabIndex: 0}))
		indexesRef.current.addEventListener('scroll', onTabsScroll)

		return () => {
			//清除监听器
			if(indexesRef.current) indexesRef.current.removeEventListener('scroll', onTabsScroll)
		}
	}, [])


	/**
	**点击相关模块
	**/
	//定义当前标签
	const [currentTab, setCurrentTab] = useState(0)
	const changeTabName = useDispatch()
	// const [currentTab, setCurrentTab] = useState(0);


	//初始化样式集
	let initStyles = tabList.map(() => false)
	initStyles[0] = true
	//定义标签样式集
	const [tabsStyles, setTabsStyles] = useState(initStyles)
    

	//定义点击事件
	const tabClick = (tabName, tabIndex) => {
		//更新选中标签的样式
		if(currentTab !== null) {
			tabsStyles[currentTab] = false
		}
		setCurrentTab(tabIndex)
		tabsStyles[tabIndex] = true
		setTabsStyles([...tabsStyles])
		changeTabName(createAction('change', {tab: tabName, tabIndex}))
	}

	/*
	*标签下拉面板模块
	*/
	//定义下拉框的可见性
	const [panelVisibility, setPanelVisibility] = useState(false)
	//判断是否使用默认事件
	onEditor = onEditor || function() {}

	//处理打开，关闭回调
	const handleEditor = () => {
		if(panelVisibility) {
			//关闭回调
			console.log('下拉面板关闭了')
			onEditor()
			setPanelVisibility(false)
		} else {
			console.log('下拉面板打开了')
			setPanelVisibility(true)
		}
	}

	return (
		<>
			<div className={styles['my-tabs-title']}>
			    {/*绑定滚动监听事件的dom元素*/}
				<div className={styles['my-tabs-title-indexes']} ref={indexesRef}>
					<ul>
						{
							tabList.map( (item, index) => (
								<li key={item} className={`${tabsStyles[index] ? styles['my-tabs-title-tab-selected'] : ''}`}
								 onClick={ () => tabClick(item, index) }>{ item }</li>
							))
						}
					</ul>
				</div>
				{/*根据滚动条位置，为‘编辑’按钮添加相关样式*/}
				{/*<div className={ `${styles['my-tabs-title-editor']} ${isRight ? styles['my-tabs-title-editor-right'] : ''} 
				${panelVisibility ? styles['my-tabs-title-editor-open'] : ''}` }
				 onClick={() => { handleEditor() }}>
				</div>*/}
			</div>
			{/*<div className={`${ panelVisibility ? styles['my-tabs-panel'] : styles['my-tabs-panel-hide'] }`}>
				{props.children}
			</div>*/}
		</>
	)
}

export default TabsComponent