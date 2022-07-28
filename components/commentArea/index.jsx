import { useState, useEffect } from 'react'
import { getCommentApi } from '/middleware/request'
import styles from './style.module.scss'


function CommentAreaComponent(props) {
	//定义评论列表
	const [commentList, setCommentList] = useState([])

	//获取评论列表
	useEffect(() => {
		getCommentApi(null, ({data}) => {
			commentList.splice(0)
			setCommentList([...data.commentList])
		})
	})

	return (
		<div>
			<h3>评论区</h3>
			<div className={styles['comment-container']}>
				<ul>
					{
						commentList.map(item => (
							<li key={item.cid}>
								<div className={styles['commentor-container']}>
									<img src={item.commentor.avatar}/>
									<span>{item.commentor.nickName}</span>
								</div>
								<span>@{item.replyTarget}:</span>
								<span>{item.content}</span>
							</li>
						))
					}
				</ul>
			</div>
		</div>
	)
}

export default CommentAreaComponent