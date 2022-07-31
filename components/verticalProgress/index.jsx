import { useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import bubbleStart from '/middleware/bubble'

function VerticalProgressComponent(props) {
	//获取canvasdom元素
	const canvasRef = useRef()

	useEffect(() => {
		if(canvasRef.current) {
			canvasRef.current.width = 500
			canvasRef.current.height = window.innerHeight
			bubbleStart(canvasRef.current, canvasRef.current.width, canvasRef.current.height)
		}
	}, [])

	
	return (
		<div className={styles['progress-container']}>
			<canvas ref={canvasRef}></canvas>
			<div className={styles['publish-tip-container']}>
				<h2>{props.percent > 100 ? 100 : props.percent}%</h2>
				<h2>{props.tip}</h2>
			</div>
			<span style={{ position: 'absolute', bottom: '0',width: '100%', display: 'block', top: `${100 - (props.percent > 100 ? 100 : props.percent)}%` }}></span>
		</div>
	)
}

export default VerticalProgressComponent