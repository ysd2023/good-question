import Head from 'next/head'

function editorSolutionCitePage(props) {
	return (
		<div>
			<Head>
		        <title>好问题-编辑</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <p>这是关于{props.question_id}解决方案编辑页面,引用了{props.cite_solution_id}</p>
		</div>
	)
}

export default editorSolutionCitePage

export async function getServerSideProps(context) {
	const { query } = context
	const { question_id, cite_solution_id } = query
	return {
		props: {
			question_id,
			cite_solution_id
		}
	}
}