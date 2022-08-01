import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'

function mineSettingPage(props) {
	//定义密码修改框的可见性
	const [passwordVisibility, setPasswordVisibility] = useState(false)

	//绑定头像文件dom元素
	const imageRef = useRef()

	//定义头像链接
	const [imageUrl, setImageUrl] = useState('')

	//定义昵称
	const [nickName, setNickName] = useState('')

	//定义现有昵称
	const [currentNickName, setCurrentNickName] = useState('')

	//定义账号
	const [account, setAccount] = useState('')

	//定义更改头像事件
	const updateImage = () => {
		let result = confirm('确实要更换头像吗？')
		if(result) {
			setImageUrl(window.URL.createObjectURL(imageRef.current.files[0]))
		}
	}

	//定义更改昵称事件
	const updateNickName = () => {
		if(nickName !== currentNickName) {
			let result = confirm('确实要更换昵称吗？')
			if(result) {
				setCurrentNickName(nickName)
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
			console.log(oldPassword, newPassword, secondPassword)
			alert('修改密码成功')
			setPasswordVisibility(false)
		}
	}

	//定义退出登录事件
	const quit = () => {
		console.log('退出成功')
	}

	useEffect(() => {
		setNickName('樱木花道')
		setCurrentNickName('樱木花道')
		setAccount('123123@qq.com')
		setImageUrl('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202102%2F26%2F20210226143822_d462c.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661932100&t=72ff4afb2faa87ed9deb2d6cb1428e66')
	}, [])

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