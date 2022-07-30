import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { nanoid } from 'nanoid'
import styles from './style.module.scss'
import ImageItem from '/components/imageItem'

const SolutionEditor = dynamic(() => import('/components/solutionEditor'), {
  ssr: false
})


function editorSolutionPage(props) {
	//定义上传图片列表
	//每张图片有三个属性 id, base64, file
	const [imageList, setImageList] = useState([])

	//绑定文件选择dom元素
	const inputFilesRef = useRef()

	//定义显示图片列表
	const [isShowImageList, setIsShowImageList] = useState(false)

	//添加图片事件
	const addImage = () => {
		//获取新增图片列表长度
		let fileLength = inputFilesRef.current.files.length
		//限制上传图片的个数最多为9张
		if(imageList.length + fileLength > 9) {
			alert(`选择图片数量超过了限制，最多还可添加${9 - imageList.length}张图片`)
		} else {
			//遍历添加图片
			for(let i = 0; i < fileLength; i++) {
				let file = inputFilesRef.current.files[i]
				imageList.push({
					id: nanoid(),
					dataUrl: window.URL.createObjectURL(file),
					file
				})
			}
			setImageList([...imageList])
		}
	}

	//定义删除图片
	const deleteImage = (index) => {
		imageList.splice(index, 1)
		setImageList([...imageList])
	}


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
		    <button className={styles['btn-image-upload']} onClick={() => setIsShowImageList(!isShowImageList)}>
		    	<svg t="1659110803949" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5765" width="200" height="200"><path d="M725.333333 128H298.666667C181.034667 128 85.333333 223.701333 85.333333 341.333333v341.333334c0 117.632 95.701333 213.333333 213.333334 213.333333h426.666666c117.632 0 213.333333-95.701333 213.333334-213.333333V341.333333c0-117.632-95.701333-213.333333-213.333334-213.333333zM298.666667 213.333333h426.666666c70.570667 0 128 57.429333 128 128v195.669334l-152.874666-152.874667a85.632 85.632 0 0 0-120.917334 0L384 579.669333l-24.874667-24.874666a85.632 85.632 0 0 0-120.917333 0L170.666667 622.336V341.333333c0-70.570667 57.429333-128 128-128z m-21.333334 170.666667a64 64 0 1 1 128.042667 0.042667A64 64 0 0 1 277.333333 384z" fill="#40A9FF" p-id="5766"></path><path d="M579.541333 384.128a85.632 85.632 0 0 1 120.917334 0l78.677333 78.677333L345.898667 896H298.666667a213.12 213.12 0 0 1-169.941334-84.48l243.584-243.541333 11.690667 11.690666z m219.52-242.986667a214.058667 214.058667 0 0 1 136.704 165.034667L853.333333 388.522667V341.333333a128.170667 128.170667 0 0 0-120.490666-127.786666l-5.973334-0.170667z" fill="#53B1FF" p-id="5767"></path><path d="M170.666667 467.84v154.453333l67.541333-67.498666a85.632 85.632 0 0 1 120.917333 0l13.141334 13.141333-243.541334 243.541333a212.181333 212.181333 0 0 1-43.178666-119.552L85.333333 682.666667v-129.493334l85.333334-85.333333zM341.333333 320a64 64 0 1 1-0.042666 128.042667A64 64 0 0 1 341.333333 320zM725.333333 128c25.898667 0 50.773333 4.650667 73.728 13.141333L726.826667 213.333333H425.216l85.333333-85.333333z" fill="#66BAFF" p-id="5768"></path><path d="M510.506667 128l-85.333334 85.333333H298.666667a128.170667 128.170667 0 0 0-127.786667 120.490667L170.666667 341.333333v126.506667l-85.333334 85.333333V341.333333a213.589333 213.589333 0 0 1 204.074667-213.12L298.666667 128h211.84z" fill="#8CCBFF" p-id="5769"></path></svg>
		    </button>
		    <div className={`${ styles['editor-image-upload'] } ${ isShowImageList ? styles['editor-image-upload-open'] : styles['editor-image-upload-close']}`}>
		    	<ul>
		    		<ImageItem>
		    			{
			    			imageList.map((item, index) => (
			    				<li key={item.id} className="hello">
				    				<img src={item.dataUrl}/>
				    				<button onClick={() => deleteImage(index)}>
				    					<svg t="1659160844668" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17194" width="200" height="200"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m202.24 683.52c10.24 10.24 10.24 26.112 0 36.352s-26.112 10.24-36.352 0l-167.936-167.936-167.424 167.424c-10.24 10.24-26.112 10.24-36.352 0s-10.24-26.112 0-36.352l167.424-167.424-168.96-169.984c-10.24-10.24-10.24-26.112 0-36.352s26.112-10.24 36.352 0l169.472 169.472 169.984-169.984c10.24-10.24 26.112-10.24 36.352 0s10.24 26.112 0 36.352l-169.984 169.984 167.424 168.448z" fill="#CD292A" p-id="17195"></path></svg>
				    				</button>
				    			</li>
			    			))
			    		}
		    		</ImageItem>
		    		<li onClick={() => inputFilesRef.current.click()}>
		    			<svg t="1659157155473" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8756" width="200" height="200"><path d="M553.924855 171.920558c-0.00921-13.028735 0.234337-26.574239-3.067872-38.96443-5.119601-19.218714-18.909675-30.887474-39.641859-30.297027-20.61348 0.585331-34.056654 12.429077-37.930891 32.254611-2.798742 14.3181-2.785439 29.319769-2.830465 44.020586-0.24764 80.400145 0.007163 160.801313-0.243547 241.201457-0.049119 15.670911-1.564635 31.338752-2.577708 50.239218-98.885148 0-192.211696-0.076748-285.538245 0.080841-14.731516 0.023536-29.743418-0.484024-44.128033 2.062985-21.678742 3.839445-35.698037 17.189498-35.279504 40.448224 0.417509 23.198352 15.137769 35.647895 36.541241 39.732933 11.136641 2.125407 22.8668 1.454118 34.331923 1.486864 47.583738 0.1361 95.1685 0.059352 142.752238 0.059352 48.931432 0.001023 97.861842 0.001023 154.017816 0.001023 0 23.531949 0 39.740096 0.001023 55.95029 0.002047 78.759785-0.140193 157.51957 0.134053 236.279355 0.051165 14.685467 0.190335 29.689183 3.109828 43.971467 4.095271 20.032242 18.065448 30.807656 38.755676 30.91408 20.958334 0.105401 34.201963-11.717879 38.899962-31.088042 3.034103-12.508895 2.701528-25.999141 2.709715-39.050388C554.080397 624.788809 554.087561 398.354684 553.924855 171.920558z" p-id="8757" fill="#e6e6e6"></path><path d="M875.004571 471.123011c-31.028691-1.725294-62.22725-0.382717-93.352131-0.410346-32.763195-0.027629-65.586764-1.266853-98.271164 0.338714-29.446659 1.445932-46.768163 17.430998-47.673789 39.670511-0.910743 22.390963 16.537651 41.936111 44.455491 42.623773 65.485457 1.613754 131.064035 1.636267 196.550515 0.061398 29.308513-0.706081 45.031613-18.176988 44.598754-41.958624C920.885528 487.927745 905.33332 472.807373 875.004571 471.123011z" p-id="8758" fill="#e6e6e6"></path></svg>
		    		</li>
		    	</ul>
		    </div>
		    <input type="file" multiple ref={inputFilesRef} style={{ display: 'none' }} onChange={() => addImage()}/>
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