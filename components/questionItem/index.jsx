import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './style.module.scss'

function QuestionItemComponent(props) {
	//使用路由
	const router = useRouter()
	//定义详情跳转事件
	const detailTo = (questionId) => {
		router.push({
			pathname: `/question/detail/${questionId}`
		})
	}

	return (
		<div className={styles['question-item-container']}>
			<p className={styles['question-item-title']} onClick={() => { detailTo(props.question.questionID) }}>{props.question.title}</p>
			<section className={styles['question-item-content']} onClick={() => { detailTo(props.question.questionID) }}>
				<div className={styles['question-item-summary']} dangerouslySetInnerHTML={{__html: props.question.summary}}></div>
				<div className={styles['question-item-cover']}>
					{
						props.question.cover
						?
						<img alt="图片已损坏" src={'/api/uploadFile/compressed/' + props.question.cover}/>
						:
						''
					}
				</div>
			</section>
			<section className={styles['question-item-footer']}>
				<span className={styles['question-item-tag']}>
					{props.question.tag[0]}
					<i>
						<svg t="1659965761559" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3435" width="200" height="200"><path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" p-id="3436" fill="#1296db"></path><path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" p-id="3437" fill="#1296db"></path><path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" p-id="3438" fill="#1296db"></path></svg>
					</i>
					<ul className={styles['question-item-tag-container']}>
						{
							props.question.tag.map(item => <li key={item}>{item}</li>)
						}
					</ul>
				</span>
				<div className={styles['question-item-publisher']}>
					<img alt="" src={'/api/uploadFile/compressed/' + props.question.publisher.avatar}/>
					<span>{props.question.publisher.nickName}</span>
				</div>
			</section>
		</div>
	)
}

export default QuestionItemComponent