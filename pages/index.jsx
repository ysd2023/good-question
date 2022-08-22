import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '/styles/index.module.scss'
//引入redux相关
import { Provider } from 'react-redux'
import tabStore from '/redux/store/tabStore'

//引入其他组件
import Tabs from '/components/tabs'
import QuestionContainer from '/components/questionContainer'
import BottomNav from '/components/bottomNav'

import { getTabsApi } from '/middleware/request'

export default function Home(props) {
  //定义标签数组
  const { tabList } = props

  const router = useRouter()
  return (
    <div className={styles['index-container']}>
        <Head>
            <title>好问题-首页</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Provider store={tabStore}>
            <div className={styles['index-search']}>
            <p className={styles['search-btn']} onClick={() => { router.push({pathname: '/question/search', query: {status: 'suggest'}}) }}>
                <svg t="1658849538359" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" pid="2256" width="200" height="200"><path d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z" pid="2257"></path></svg>
                <span>搜索</span>
            </p>
            </div>
            <div className={styles['index-tab']}>
                <Tabs tabList={tabList}/>
            </div>
            <div className={styles['index-question']}>
                <QuestionContainer mode="tab"/>
            </div>
            <div className={styles['index-nav']}>
                <BottomNav/>
            </div>
         </Provider>
    </div>
  )
}

//定义服务端渲染函数
export async function getServerSideProps(context) {
    let resTabs = await getTabsApi()

    return {
        props: {
            tabList: resTabs.data.types
        }
    }
}
