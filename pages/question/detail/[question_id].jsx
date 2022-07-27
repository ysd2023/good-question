import Head from 'next/head'
import { useRouter } from 'next/router'

function questionDetailPage(props) {
	return (
		<div>
			<Head>
		        <title>好问题-详情</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <p>这是问题"{props.question_id}"详情页面</p>
		</div>
	)
}

export default questionDetailPage

export async function getServerSideProps(context) {
	const { query } = context
	query.question_id = query.question_id || ''
	return {
		props: {
			question_id: query.question_id
		}
	}
}