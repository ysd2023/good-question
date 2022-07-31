//定义气泡类
class Bubble {
	constructor(x, y, r) {
		this.x = x
		this.y = y
		this.radius = r
		this.speed = rangeRandom(0.1, 2)
		this.alpha = 1
	}

	update(arr, index) {
		this.y -= this.speed
		// this.speed += 0.1
		// this.alpha -= 0.01

		if(this.y <= 0) {
			arr.splice(index, 1)
		}
	}

	draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fill()
    }
}


//绘制所有气泡
function drawBublle(bubleArr) {
    bubleArr.forEach((bubble, index) => {
        bubble.update(bubleArr, index)
        bubble.draw(ctx)
    })
}

function tick() {
   try {
   	 ctx.globalCompositeOperation = 'destination-out'
     ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
     ctx.fillRect(0, 0, canvasObject.width, canvasObject.height)
     ctx.globalCompositeOperation = 'lighter'
   } catch(err) {
   	console.log('wrong go')
   	return;
   }
    drawBublle(bubbleArr)
    requestAnimationFrame(tick)
}

//产生随机数
function rangeRandom(min, max) {
    return Math.random() * (max - min) + min
}

//定义气泡数组
const bubbleArr = []
//定义画布长宽
const canvasObject = {
	width: 0,
	height: 0
}

let ctx = null

export default function bubbleStart(canvas, w, h) {
	canvasObject.width = w
	canvasObject.height = h
	ctx = canvas.getContext('2d')
    tick()
    //定时产生气泡
    setInterval(() => {
        // for(let i = 0; i < 10; i++) {
        bubbleArr.push(new Bubble(Math.random() * 500, canvasObject.height, Math.random() * 10))
        // }
    }, 300)
}

