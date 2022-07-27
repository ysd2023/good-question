import Head from 'next/head'

function editorSolutionPage(props) {
	return (
		<div>
			<Head>
		        <title>好问题-编辑</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <p>这是关于{props.question_id}解决方案编辑页面</p>
		</div>
	)
}

export default editorSolutionPage

export async function getServerSideProps(context) {
	const { query } = context
	const { question_id } = query
	return {
		props: {
			question_id
		}
	}
}