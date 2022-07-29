import { useState, useEffect } from 'react'
import { getCommentApi } from '/middleware/request'
import styles from './style.module.scss'


function CommentAreaComponent(props) {
	//定义评论列表
	const [commentList, setCommentList] = useState([])

	//获取评论列表
	useEffect(() => {
		getComment()
		console.log('I change')
	}, [props.rid])

	//定义获取评论事件
	const getComment = () => {
		getCommentApi({ rid: props.rid }, ({data}) => {
			commentList.splice(0)
			setCommentList([...data.commentList])
		}, (err) => { console.log(err) })
	}

	//定义评论书写状态
	const [isWriting, setIsWriting] = useState(false)

	//定义评论回复对象
	const [replyTarget, setReplyTarget] = useState('')

	//定义评论内容
	const [commentContent, setCommentContent] = useState('')

	//取消编辑事件
	const cancleEditor = () => {
		setReplyTarget(null)
		setIsWriting(false)
	}

	//回复评论事件
	const replyEditor = (target) => {
		setReplyTarget(target)
		setIsWriting(true)
	}

	//定义完成状态
	const [isCompleted, setIsCompleted] = useState(false)
	//定义加载状态
	const [isLoading, setIsLoading] = useState(false)

	//定义获取新的评论
	const addComment = () => {
		setIsLoading(true)
		getCommentApi({ rid: props.rid }, ({data}) => {
			setCommentList([...commentList, ...data.commentList])
			setIsLoading(false)
		}, (err) => { console.log(err) })
	}

	return (
		<div className={styles['comment-container-all']}>
			<h3 className={styles['comment-title-tip']}>评论区</h3>
			<div className={styles['comment-container']}>
				<ul>
					{
						commentList.map(item => (
							<li key={item.cid} onClick={() => replyEditor('@' + item.commentor.nickName)}>
								<div className={styles['commentor-container']}>
									<span className={styles['commentor-avatar']}><img src={item.commentor.avatar}/></span>
									<span>{item.commentor.nickName}</span>
								</div>
								<span>{`${ item.replyTarget ? ('@' + item.replyTarget) : '' }`}:</span>
								<span>{item.content + item.cid}</span>
							</li>
						))
					}
				</ul>
				{
					isCompleted
					?
					<div className={styles['question-footer']}>
						<span>已全部加载完成</span>
						<button>回到顶部</button>
					</div>
					:
					isLoading
					?
					<div className={styles['question-footer']}>
						<span>loading...</span>
					</div>
					:
					<div className={styles['question-footer']}>
						<button onClick={() => addComment()}>点击</button>
						<span>加载更多</span>
					</div>
				}
			</div>
			<div className={`${ isWriting ? styles['comment-publish-writing'] : styles['comment-publish'] }`}>
				{
					isWriting
					?
					<div className={styles['comment-writing-area']}>
						<div className={styles['comment-writing-overlay']} onClick={() => cancleEditor()}></div>
						<div className={styles['comment-writing-content']}>
							<button>
								<svg t="1659084866063" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5633" width="200" height="200"><path d="M0 0h1024v1024H0z" fill="#1296db" fillOpacity=".01" p-id="5634"></path><path d="M893.44 75.849143L99.693714 466.432a36.571429 36.571429 0 0 0-4.681143 62.829714l183.369143 126.756572c15.798857 7.899429 31.524571 7.899429 47.323429-7.899429l434.102857-370.980571-378.88 402.505143c-7.826286 7.899429-7.826286 15.798857-7.826286 23.698285v173.641143c0 15.798857 7.899429 31.597714 23.625143 39.497143 15.798857 7.899429 31.597714 0 39.497143-7.899429l86.820571-88.429714 192.073143 128.146286a36.571429 36.571429 0 0 0 56.027429-22.674286L945.298286 116.297143a36.571429 36.571429 0 0 0-51.931429-40.521143z" fill="#1296db" p-id="5635"></path></svg>
							</button>
							<button onClick={() => cancleEditor()}>
								<svg t="1659084949195" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6970" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m256-563.2H256v102.4h512V460.8z" fill="#FF7E11" p-id="6971"></path></svg>
							</button>
							<textarea placeholder={replyTarget ? replyTarget : '说说你的看法'} maxLength="100" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
						</div>
					</div>
					:
					<span onClick={() => setIsWriting(true)}>
						说两句
						<svg t="1659072618170" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2274" width="200" height="200"><path d="M686.4 224c-6.4-6.4-6.4-16 0-22.4l68-68c6.4-6.4 16-6.4 22.4 0l112.8 112.8c6.4 6.4 6.4 16 0 22.4l-68 68c-6.4 6.4-16 6.4-22.4 0L686.4 224zM384 776l372-372c5.6-5.6 4.8-15.2-1.6-20.8L641.6 269.6c-6.4-6.4-16-7.2-20.8-1.6L248 640l-56 192 192-56zM64 896v64h896v-64H64z" p-id="2275" fill="#8a8a8a"></path></svg>
					</span>
				}
			</div>
		</div>
	)
}

export default CommentAreaComponent