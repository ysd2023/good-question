import { useEffect, useRef } from 'react'
import styles from './style.module.scss'

/*notification 对象 包括
{
	title: String //标题
	message: String //消息内容
	type: String // success, error, warning, default
	delay: Number //消息持续时间， 默认3s
}
*/

function NotificationComponent(notification) {
	//创建通知框容器
	let notificationContainer = document.createElement('div')
	notificationContainer.className = styles['notification-container']
	//创建通知框头部元素
	let notificationTitle = document.createElement('section')
	notificationTitle.className = styles[`notification-title-${notification.type || 'default'}`]
	notificationTitle.innerHTML = `<h3>${notification.title || ''}</h3>`
	//创建通知框内容元素
	let notificationBody = document.createElement('section')
	notificationBody.className = styles['notification-body']
	notificationBody.innerHTML = `<h4>${notification.message || ''}</h4>`

	//将头部、内容元素添加到容器，并把容器添加到document.body
	notificationContainer.appendChild(notificationTitle)
	notificationContainer.appendChild(notificationBody)

	document.body.appendChild(notificationContainer)

	//定时将通知框移除
	setTimeout(() => {
		document.body.removeChild(notificationContainer)
	}, notification.delay || 3000)
}

export default NotificationComponent