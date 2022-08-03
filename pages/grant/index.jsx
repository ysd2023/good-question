import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './style.module.scss'

import { loginApi, registerApi, getCodeApi } from '/middleware/request'

function grantPage() {
	//定义路由
	const router = useRouter()

	//定义切换模块
	const [currentMode, setCurrentMode] = useState('login')

	/*
	*登录模块
	*/
	//定义帐号
	const [account, setAccount] = useState('')

	//定义登录密码
	const [loginPassword, setLoginPassword] = useState('')

	//定义登录事件
	const login = () => {
		if(account !== '' && loginPassword !== '') {
			loginApi({account, password: loginPassword}, (res) => {
				if(res.data.statu) {
					alert('登录成功')
					router.push({ pathname: '/' })
				} else {
					alert('登录失败')
				}
			}, (err) => { alert('登录失败')})
		} else {
			alert('帐号或密码不可为空！')
		}
	}

	/*
	*注册模块
	*/
	//定义邮箱
	const [email, setEmail] = useState('')

	//定义注册密码
	const [registerPassword, setRegisterPassword] = useState('')

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
	}, [remainingTime])

	//定义注册事件
	const register = () => {
		if(email.indexOf('@') === -1) { alert('邮箱格式错误') }
		else if(registerPassword === '' || confirmPassword === '') { alert('密码获取确认密码不可为空') }
		else if(registerPassword !== confirmPassword) { alert('两次密码不一致') }
		else if(validateCode === '') { alert('验证码不可为空') }
		else {
			registerApi({email, password: registerPassword, validCode: validateCode}, (res) => {
				if(res.data.statu) {
					alert('注册成功')
					setAccount(email)
					setLoginPassword(registerPassword)
					setCurrentMode('login')
				} else {
					alert('注册失败')
				}
			}, (err) => { alert('网络错误') })
		} 
	}

	return (
		<div className={styles['grant-container']}>
			<Head>
		        <title>好问题-登录</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <div className={styles['logo']}>
		    	<span className={styles['logo-1']} onClick={() => router.push({pathname: '/'})}>G</span>
		    	<span className={styles['logo-2']} onClick={() => router.push({pathname: '/'})}>Q</span>
		    	<h4>——解决你灵魂深处的困惑——</h4>
		    </div>
		    <div className={`${styles['login']} ${ currentMode === 'login' ? '' : styles['container-rotate-out'] }`}>
		    	<input type="text" placeholder="帐号" value={account} onChange={(e) => setAccount(e.target.value)}/>
		    	<br/>
		    	<input type="password" placeholder="密码" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
		    	<br/>
	    		<button onClick={() => login()}>登录</button>
	    		<li><a onClick={() => router.push({pathname: '/grant/find'})}>忘记密码？</a></li>
		    </div>
		    <div className={`${styles['register']} ${ currentMode === 'register' ? styles['container-rotate-in'] : '' }`}>
		    	<input type="text" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)}/>
		    	<br/>
		    	<input type="password" placeholder="密码" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
		    	<br/>
		    	<input type="password" placeholder="确认密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
		    	<br/>
		    	<div className={styles['validate-code-container']}>
		    		<input type="text" placeholder="验证码" value={validateCode} onChange={(e) => setValidateCode(e.target.value)}/>
			    	<span onClick={() => getValidateCode()}>{`${remainingTime === 0 ? '获取验证码' : remainingTime}`}</span>
		    	</div>
		    	<br/>
		    	<button onClick={() => register()}>注册</button>
		    </div>
		    <div className={styles['change-mode']}>
		    	<span onClick={() => setCurrentMode('login')} className={`${currentMode === 'login' ? styles['mode-selected'] : ''}`}>登录</span>
		    	·
		    	<span onClick={() => setCurrentMode('register')} className={`${currentMode === 'register' ? styles['mode-selected'] : ''}`}>注册</span>
		    </div>
		</div>
	)
}

export default grantPage