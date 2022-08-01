import Head from 'next/head'
import styles from './style.module.scss'

function mineSettingPage() {
	return (
		<div>
			<Head>
		        <title>好问题-设置</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <div className={styles['info-container']}>
		    	<ul>
		    		<li>头像</li>
		    		<li>帐号</li>
		    		<li>昵称</li>
		    	</ul>
		    	<button>修改密码</button>
		    	<button>退出登录</button>
		    </div>
		    <div className={'password-container'}>
		    	<section className={styles['update-password-input']}>
		    		<input type="password"/>
			    	<input type="password"/>
			    	<input type="password"/>
		    	</section>
		    	<section className={styles['update-password-btn']}>
		    		<button>取消</button>
		    		<button>修改</button>
		    	</section>
		    </div>
		</div>
	)
}

export default mineSettingPage