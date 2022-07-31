import { useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import bubbleStart from '/middleware/bubble'

function VerticalProgressComponent(props) {
	//获取canvasdom元素
	const canvasRef = useRef()

	//定义进度条状态
	const [progressStatus, setProgressStatus] = useState('normal')

	useEffect(() => {
		if(canvasRef.current) {
			canvasRef.current.width = 500
			canvasRef.current.height = window.innerHeight
			bubbleStart(canvasRef.current, canvasRef.current.width, canvasRef.current.height)
		}
	}, [])

	useEffect(() => {
		if(props.progressStatus) setProgressStatus(props.progressStatus)
	}, [props.progressStatus])

	
	return (
		<div className={styles['progress-container']}>
			<canvas ref={canvasRef}></canvas>
			<div className={styles['publish-tip-container']}>
				<h2>{props.percent > 100 ? 100 : props.percent}%</h2>
				<h2>
					{ 
						props.progressStatus === 'success' 
						? 
						(props.successTip ? props.successTip : '成功！') 
						: 
						props.progressStatus === 'error'
						?
						(props.errorTip ? props.errorTip : '失败！')
						:
						props.tip  
					}
				</h2>
			</div>
			{
				props.progressStatus === 'success' 
				?
				<div className={styles['result-container']}>
					{props.successSlot}
				</div>
				:
				''
			}
			{
				props.progressStatus === 'error' 
				?
				<div className={styles['result-container']}>
					{props.errorSlot}
				</div>
				:
				''
			}
			<span style={{ top: `${100 - (props.percent > 100 ? 100 : props.percent)}%` }}
			className={`${styles['progress-default']} ${styles[`progress-background-${progressStatus}`]}`}></span>
		</div>
	)
}

export default VerticalProgressComponent