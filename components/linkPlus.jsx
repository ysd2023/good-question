import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const LinkPlus = (props) => {
	const currentPath = useRouter()
	const className = currentPath.pathname === props.href ? props.activeName : props.className

	return (
		<Link className={className} href={props.href}>
			{React.cloneElement(props.children, {
		        className: className,
	        })}
		</Link>
	)
}

export default LinkPlus