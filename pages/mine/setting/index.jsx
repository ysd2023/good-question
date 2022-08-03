import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'

import { updateUserApi, updatePasswordApi, quitApi } from '/middleware/request'
import axios from '/middleware/axios'

function mineSettingPage(props) {
	//定义路由
	const router = useRouter()

	//定义密码修改框的可见性
	const [passwordVisibility, setPasswordVisibility] = useState(false)

	//绑定头像文件dom元素
	const imageRef = useRef()

	//定义头像链接
	const [imageUrl, setImageUrl] = useState(props.userInfo.avatar)

	//定义昵称
	const [nickName, setNickName] = useState(props.userInfo.nickName)

	//定义现有昵称
	const [currentNickName, setCurrentNickName] = useState(props.userInfo.nickName)

	//定义账号
	const [account, setAccount] = useState(props.userInfo.account)

	//定义更改头像事件
	const updateImage = () => {
		let result = confirm('确实要更换头像吗？')
		if(result) {
			updateUserApi({avatar: imageRef.current.files[0], nickName: null}, (res) => {
				if(res.data.statu) setImageUrl(window.URL.createObjectURL(imageRef.current.files[0]))
				else { alert(res.data.reason) }
			})
		}
	}

	//定义更改昵称事件
	const updateNickName = () => {
		if(nickName !== currentNickName) {
			let result = confirm('确实要更换昵称吗？')
			if(result) {
				updateUserApi({avatar: null, nickName}, (res) => {
					if(res.data.statu) setCurrentNickName(nickName)
					else { 
						setNickName(currentNickName)
						alert(res.data.reason) 
					}
				})
			} else {
				setNickName(currentNickName)
			}
		}
	}

	/*
	*修改密码模块
	*/
	//定义旧密码
	const [oldPassword, setOldPassword] = useState('')

	//定义新密码
	const [newPassword, setNewPassword] = useState('')

	//定义二次密码
	const [secondPassword, setSecondPassword] = useState('')

	//定义修改密码事件
	const updatePassword = () => {
		if(newPassword !== secondPassword) { alert('两次密码不一致') }
		else if (newPassword === '') { alert('新密码不可为空') }
		else if (oldPassword === '') { alert('旧密码不可为空') }
		else {
			setPasswordVisibility(true)
			updatePasswordApi({oldPassword, newPassword}, (res) => {
				if(res.data.statu) alert('修改密码成功')
				else alert('修改密码失败')
				setPasswordVisibility(false)
			}, (err) => {
				alert('网络错误')
			})
		}
	}

	//定义退出登录事件
	const quit = () => {
		quitApi((res) => {
			if(res.data.statu) {
				alert('退出登录成功')
				router.push({pathname: '/grant'})
			} else {
				alert('退出登录失败')
			}
		}, (err) => { alert('网络错误') })
	}

	return (
		<div>
			<Head>
		        <title>好问题-设置</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <div className={styles['info-container']}>
		    	<ul>
		    		<li>
		    			<span>头像</span>
		    			<input type="file" ref={imageRef} style={{ display: 'none' }} onChange={() => updateImage()}/>
		    			<img onClick={() => imageRef.current.click()} src={imageUrl}/>
		    		</li>
		    		<li>
		    			<span>账号</span>
		    			<input type="text" disabled value={account}/>
		    		</li>
		    		<li>
		    			<span>昵称</span>
		    			<input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} onBlur={() => updateNickName()}/>
		    		</li>
		    	</ul>
		    	<button style={{ color: '#0899ff' }} onClick={() => setPasswordVisibility(true)}>修改密码</button>
		    	<button style={{ color: '#ff6d6d' }} onClick={() => quit()}>退出登录</button>
		    </div>
		    {
		    	passwordVisibility
		    	?
		    	<div className={styles['password-container']}>
			    	<section>
				    	<div className={styles['update-password-input']}>
				    		<input type="password" placeholder="旧密码" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
					    	<input type="password" placeholder="新密码" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
					    	<input type="password" placeholder="确认新密码" value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)}/>
				    	</div>
				    	<div className={styles['update-password-btn']}>
				    		<button style={{ color: '#0899ff' }} onClick={() => updatePassword()}>修改</button>
				    		<button style={{ color: '#ff6d6d' }} onClick={() => setPasswordVisibility(false)}>取消</button>
				    	</div>
				    </section>
			    </div>
			    :
			    ''
		    }
		</div>
	)
}

export default mineSettingPage

export async function getServerSideProps(context) {
	//获取个人信息
	let userInfo = null
	const resUserInfo = await axios.get('/api/userInfo')
	if(resUserInfo.data) {
		userInfo = resUserInfo.data
	}

	return {
		props: {
			userInfo
		}
	}
}