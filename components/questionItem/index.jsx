import { useRouter } from 'next/router'
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
				<div className={styles['question-item-summary']}>{props.question.summary}</div>
				<div className={styles['question-item-cover']}>
					<img src={props.question.cover} alt="封面"/>
				</div>
			</section>
			<section className={styles['question-item-footer']}>
				<span className={styles['question-item-tag']}>{props.question.tag.context}</span>
				<div className={styles['question-item-publisher']}>
					<img src={props.question.publisher.avatar} alt="头像"/>
					<span>{props.question.publisher.nickName}</span>
				</div>
			</section>
		</div>
	)
}

export default QuestionItemComponent