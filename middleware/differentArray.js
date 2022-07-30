export default function differentArray(arr1, arr2) {

	//找出长度最小数组
	let [arrMin, arrMax] = arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1]
	
	//定义集合，结果
	const shortSet = new Set()

	const differentElement = []

	arrMin.map(item => {
		shortSet.add(item)
	})

	arrMax.map(item => {
		if(!shortSet.has(item)) {
			differentElement.push(item)
		}
	})

	return differentElement
}