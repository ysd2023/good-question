import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './style.module.scss'

import { getCodeApi, resetApi } from '/middleware/request'

function FindPage() {
	//定义路由
	const router = useRouter()
	
	//定义帐号
	const [email, setEmail] = useState('')

	//定义密码
	const [password, setPassword] = useState('')


	//定义确认密码
	const [confirmPassword, setConfirmPassword] = useState('')

	//定义验证码
	const [validateCode, setValidateCode] = useState('')

	//定义计时器
	const [timer, setTimer] = useState(null)

	//定义时间
	const [remainingTime, setRemainingTime] = useState(0)

	//定义获取验证码事件
	const getValidateCode = () => {
		if(remainingTime == 0) {
			if(email.indexOf('@') === -1) { 
				alert('邮箱格式错误')
				return ;
			 }
			getCodeApi({email: email}, (res) => {
				alert('验证码已发送')
				setRemainingTime(60)
				timer = setInterval(() => {
					setRemainingTime(remainingTime => remainingTime -1)
				}, 1000)
				setTimer(timer)
			}, (err) => {alert('获取验证码失败')})
		}
	}

	//清除计时器
	useEffect(() => {
		if(remainingTime == 0) {
			clearInterval(timer)
		}
	}, [remainingTime, timer])

	//定义注册事件
	const find = () => {
		if(email.indexOf('@') === -1) { alert('邮箱格式错误') }
		else if(password === '' || confirmPassword === '') { alert('密码获取确认密码不可为空') }
		else if(password !== confirmPassword) { alert('两次密码不一致') }
		else if(validateCode === '') { alert('验证码不可为空') }
		else {
			resetApi({account: email, newPassword: password, validateCode}, (res) => {
				//若重置密码成功
				if(res.data.statu) {
					alert('设置新密码成功')
					router.push({pathname: '/grant'}) 
				}
				else { alert(res.data.reason) }
			}, (err) => { alert('网络错误') })
		} 
	}

	return (
		<div>
			<Head>
		        <title>好问题-登录</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <h2 style={{ textAlign: 'center' }}>找回密码</h2>
		    <div className={styles['find']}>
		    	<input type="text" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)}/>
		    	<br/>
		    	<input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)}/>
		    	<br/>
		    	<input type="password" placeholder="确认密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
		    	<br/>
		    	<div className={styles['validate-code-container']}>
		    		<input type="text" placeholder="验证码" value={validateCode} onChange={(e) => setValidateCode(e.target.value)}/>
			    	<span onClick={() => getValidateCode()}>{`${remainingTime === 0 ? '获取验证码' : remainingTime}`}</span>
		    	</div>
		    	<br/>
		    	<button onClick={() => find()}>重置</button>
		    </div>
		</div>
	)
}

export default FindPage