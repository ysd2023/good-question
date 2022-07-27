import styles from './style.module.scss'

function QuestionItemComponent(props) {
	return (
		<div className={styles['question-item-container']}>
			<p className={styles['question-item-title']}>震惊！这是一个问题！震惊！这是一个问题！震惊！这是一个问题！</p>
			<section className={styles['question-item-content']}>
				<div className={styles['question-item-summary']}>这是问题的简要描述！这是问题的简要描述！这是问题的简要描述！
					这是问题的简要描述！这是问题的简要描述！这是问题的简要描述！这是问题的简要描述！这是问题的简要描述！这是问题的简要描述！
				</div>
				<div className={styles['question-item-cover']}>
					{/*<img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.glhSf4Q1CNlebYWcPdmkTwHaKi?w=122&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="封面"/>*/}
					<img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.rhOmaROk-tiAVy8p8aswFwHaE8?w=261&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="封面"/>
				</div>
			</section>
			<section className={styles['question-item-footer']}>
				<span className={styles['question-item-tag']}>社会热点</span>
				<div className={styles['question-item-publisher']}>
					<img src="https://ts1.cn.mm.bing.net/th?id=OIP-C.x09r5tGxTyGiAchyk-KCjQAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" alt="头像"/>
					<span>吾名史珍香</span>
				</div>
			</section>
		</div>
	)
}

export default QuestionItemComponent