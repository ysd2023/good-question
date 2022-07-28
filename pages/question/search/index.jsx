import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import tabStore from '/redux/store/tabStore'
import styles from './style.module.scss'
import SearchInput from '/components/searchInput'
import QuestionContainer from '/components/questionContainer'

function questionSearchPage(props) {
	//定义路由
	const router = useRouter()
	//定义问题列表
	const [questionList, setQuestionList] = useState(props.questionList)

	return (
		<Provider store={ tabStore }>
			<div>
				<Head>
			        <title>好问题-搜索</title>
			        <link rel="icon" href="/favicon.png" />
			    </Head>
				    {
				    	props.status
				    	?
				    	<div>
				    		<SearchInput/>
				    	</div>
				    	:
				    	<div className={styles['search-container']}>
					    	<div className={styles['search-title']}>
						    	<span onClick={() => { router.push({pathname: '/' }) }}>
						    		<svg t="1658932775369" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2275" width="200" height="200"><path d="M840.192497 1024h-178.309309a64.604822 64.604822 0 0 1-64.604823-64.604822V646.06179H419.615104v311.395243a64.604822 64.604822 0 0 1-64.604822 64.604822H181.22331a64.604822 64.604822 0 0 1-64.604822-64.604822V525.250772H76.563498a58.14434 58.14434 0 0 1-58.790388-38.762893A64.604822 64.604822 0 0 1 31.340122 416.068622L470.652914 18.102917a64.604822 64.604822 0 0 1 89.800703 0l432.852309 396.673609a64.604822 64.604822 0 0 1-45.869424 109.828198h-44.577327v436.728598a64.604822 64.604822 0 0 1-62.666678 62.666678zM422.199297 585.979305h179.601406a64.604822 64.604822 0 0 1 64.604822 64.604822v313.333388h175.725117V465.168287h109.182149L515.876289 64.618389 76.563498 462.584094h107.890053v501.333421h178.955358v-310.749195a64.604822 64.604822 0 0 1 58.790388-67.189015z" p-id="2276"></path></svg>
						    	</span>
				    			<p className={styles['search-btn']} onClick={() => { router.push({pathname: '/question/search', query: {status: 'suggest'}}) }}>
					                <svg t="1658849538359" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" pid="2256" width="200" height="200"><path d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z" pid="2257"></path></svg>
					                <span>{props.keyword}</span>
					            </p>
					    	</div>
					    	<div className={styles['search-question']}>
					    		<QuestionContainer mode="search" questionList={props.questionList}/>
					    	</div>
				    	</div>
				    }
			</div>
		</Provider>
	)
}

export default questionSearchPage

export async function getServerSideProps(context) {
	const { query } = context
	query.keyword = query.keyword ||  ''
	query.status = query.status === 'suggest' ? 'suggest' : null
	const questionList = Array.from(new Array(10).keys())

	return {
		props: {
			keyword: query.keyword,
			status: query.status,
			questionList
		}
	}
}

