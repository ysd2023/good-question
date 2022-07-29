import Head from 'next/head'
import Dynamic from 'next/dynamic'
import styles from './style.module.scss'
// import SoutionEditor from '/components/solutionEditor'
const SolutionEditor = Dynamic(import ('/components/solutionEditor'))

function editorSolutionPage(props) {
	return (
		<div>
			<Head>
		        <title>好问题-编辑</title>
		        <link rel="icon" href="/favicon.png" />
		    </Head>
		    <div className={styles['question-container']}></div>
		    <div className={styles['editor-container']}>
		    	<SolutionEditor/>
		    </div>
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