import { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import differentArray from '/middleware/differentArray'

function ImageItemComponent(props) {
	const [children, setChildren] = useState(props.children)

	useEffect(() => {
		const propsChildrenKeys = props.children.map(child => child.key)
		const childrenKeys = children.map(child => child.key)
		const changeElementKeys = differentArray(propsChildrenKeys, childrenKeys)
		const changeKeySet = new Set()
		changeElementKeys.map(key => changeKeySet.add(key))

		//判断是删除还是增加
		if(props.children.length > children.length) {
			//若是增加，则给新增元素添加入场动画
			const newChildren = props.children.map(child => {
				const newChild = child.props.children
				if(changeKeySet.has(child.key)) return Object.assign({}, child, { props: { className: styles['item-in'], children: newChild } })
				else return child
			})
			setChildren(newChildren)
		} else if(props.children.length < children.length) {
			//若是减少，则给删除元素添加退场动画
			setChildren(props.children)
		}
	}, [props.children])

	return (
		<>
			{
				children
			}
		</>
	)
}

export default ImageItemComponent