import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './style.module.scss'

const SolutionEditor = dynamic(() => import('/components/solutionEditor'), {
  ssr: false
})


function editorSolutionPage(props) {
	//定义上传图片列表
	//每张图片有三个属性 id, base64, file
	const [imageList, setImageList] = useState([])

	return (
		<div>
			<Head>
		        <title>好问题-编辑</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <div className={styles['question-container']}>
		    	<h3>{props.question.title + props.question_id}</h3>
		    	<p>{props.question.summary}</p>
		    </div>
		    <div className={styles['editor-container']}>
		    	<SolutionEditor/>
		    </div>
		    <button className={styles['btn-image-upload']}>
		    	<svg t="1659110803949" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5765" width="200" height="200"><path d="M725.333333 128H298.666667C181.034667 128 85.333333 223.701333 85.333333 341.333333v341.333334c0 117.632 95.701333 213.333333 213.333334 213.333333h426.666666c117.632 0 213.333333-95.701333 213.333334-213.333333V341.333333c0-117.632-95.701333-213.333333-213.333334-213.333333zM298.666667 213.333333h426.666666c70.570667 0 128 57.429333 128 128v195.669334l-152.874666-152.874667a85.632 85.632 0 0 0-120.917334 0L384 579.669333l-24.874667-24.874666a85.632 85.632 0 0 0-120.917333 0L170.666667 622.336V341.333333c0-70.570667 57.429333-128 128-128z m-21.333334 170.666667a64 64 0 1 1 128.042667 0.042667A64 64 0 0 1 277.333333 384z" fill="#40A9FF" p-id="5766"></path><path d="M579.541333 384.128a85.632 85.632 0 0 1 120.917334 0l78.677333 78.677333L345.898667 896H298.666667a213.12 213.12 0 0 1-169.941334-84.48l243.584-243.541333 11.690667 11.690666z m219.52-242.986667a214.058667 214.058667 0 0 1 136.704 165.034667L853.333333 388.522667V341.333333a128.170667 128.170667 0 0 0-120.490666-127.786666l-5.973334-0.170667z" fill="#53B1FF" p-id="5767"></path><path d="M170.666667 467.84v154.453333l67.541333-67.498666a85.632 85.632 0 0 1 120.917333 0l13.141334 13.141333-243.541334 243.541333a212.181333 212.181333 0 0 1-43.178666-119.552L85.333333 682.666667v-129.493334l85.333334-85.333333zM341.333333 320a64 64 0 1 1-0.042666 128.042667A64 64 0 0 1 341.333333 320zM725.333333 128c25.898667 0 50.773333 4.650667 73.728 13.141333L726.826667 213.333333H425.216l85.333333-85.333333z" fill="#66BAFF" p-id="5768"></path><path d="M510.506667 128l-85.333334 85.333333H298.666667a128.170667 128.170667 0 0 0-127.786667 120.490667L170.666667 341.333333v126.506667l-85.333334 85.333333V341.333333a213.589333 213.589333 0 0 1 204.074667-213.12L298.666667 128h211.84z" fill="#8CCBFF" p-id="5769"></path></svg>
		    </button>
		    <div className={styles['editor-image-upload']}>
		    	<ul>
		    		{
		    			imageList.map(item => <li key={item.lenth}></li>)
		    		}
		    		<li>
		    			<img src=""/>
		    		</li>
		    	</ul>
		    </div>
		</div>
	)
}

export default editorSolutionPage

export async function getServerSideProps(context) {
	const { query } = context
	const { question_id } = query
	const question = {
		title: '这是一个问题' + question_id,
		summary: '没有什么好描述的'
	}
	return {
		props: {
			question_id,
			question
		}
	}
}