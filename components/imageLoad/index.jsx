import { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'

function ImageLoadComponent(props) {
    //接收图片链接
    const { normalUrl, compressedUrl } = props
    //定义压缩图片元素的可见性
    const [isMask, setIsMask] = useState(true)
    //绑定原图片dom元素
    const originRef = useRef()

    //当原图片加载完成后，隐藏压缩图片
    useEffect(() => {
        if(originRef.current) {
            //获取原图片
            originRef.current.src = compressedUrl
            originRef.current.onload = () => {
                originRef.current.src = normalUrl
            }
        }
    }, [])
    return (
        <div className={styles['image-container']}>
            <img ref={originRef} className={isMask ? styles['mask-image'] : styles['normal-image']}/>
        </div>
    )
}

export default ImageLoadComponent