import { useState } from 'react'
import LinkPlus from '/components/linkPlus'
import styles from './style.module.scss'

function BottomNavComponent(props) {

	return (
		<div className={styles['nav-container']}>
				<div>
					<LinkPlus href="/" className={styles.link} activeName={styles.linkactive}>
						<a>首页</a>
					</LinkPlus>
				</div>
				<div>
					<LinkPlus href="/editor/question" className={styles.link} activeName={styles.linkactive}>
						<a>想法</a>
					</LinkPlus>
				</div>
				<div>
					<LinkPlus href="/mine" className={styles.link} activeName={styles.linkactive}>
						<a>我的</a>
					</LinkPlus>
				</div>
		</div>
	)
}

export default BottomNavComponent