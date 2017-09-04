(function dom(){

	var body=document.getElementById('body')
	var arrbutton=[]
	var n=9
	var mineNumber = 10
	var urlMine = 'url(image/mine.png)'
	var urlFlag = 'url(image/flag3.png)'
	var funcOnClick = []

	function build(){
		var temp = []
		
		//屏蔽鼠标右击
		document.getElementById('body').oncontextmenu = function(event){event.returnValue = false}
		//生成雷
		var arr = RandomNumber(n,mineNumber)
		for(var i=0,element;i<9;i++){
			for(var j=0;j<9;j++){
				element=document.createElement('button')
				element.setAttribute('class','button mine')
				element.setAttribute('disabled',true)
				element.dataset.number = arr[i][j]
				element.dataset.id = j + i * n
				body.appendChild(element)
				temp.push(element)
			}
			arrbutton.push(temp)
			temp = []
			body.appendChild(document.createElement('br'))
		};
		var clearfix = document.createElement('div')
		clearfix.style.clear = 'both'
		body.appendChild(clearfix)
		delete(element)
		body.style.width=n*50+2*(n+9)+'px'
	}

	build()//生成页面

	var inputNumberMines = document.getElementById('numberofmines')
	var inputTime = document.getElementById('time')
	inputTime.value = '0 s'
	inputNumberMines.value = mineNumber
	//开始按钮添加响应函数
	var intervalId
	function start(){

		var t = 1
		intervalId = setInterval(function(){
			inputTime.value = t + ' s'
			t = t + 1
		},1000)
		var i = 0
		var j = 0
		arrbutton.forEach(function(ele1){
			j=0
			funcOnClick.push([])
			ele1.forEach(function(ele2){
				ele2.disabled = false
				funcOnClick[i].push(FuncOnClick.bind(ele2,urlMine,urlFlag,arrbutton,i,j,n,intervalId))
				ele2.addEventListener('mousedown',funcOnClick[i][j])
				j++
			})
			i++
		})

		document.getElementById('img').style.backgroundImage = "url('image/smile.svg')"


		this.disabled = true
	}
	document.getElementById('start').addEventListener('click',start)

	//重置页面
	function reset(){
		var arr = RandomNumber(n,mineNumber)
		document.getElementById('start').disabled = false
		clearInterval(intervalId)
		inputTime.value = '0 s'
		inputNumberMines.value = mineNumber
		var i = 0
		var j
		arrbutton.forEach(function(ele1){
			j = 0
			ele1.forEach(function(ele2){
				ele2.removeEventListener('mousedown',funcOnClick[i][j])
				ele2.style = {}
				ele2.innerText = ''
				ele2.setAttribute('class','button mine')
				ele2.setAttribute('disabled',true)
				ele2.dataset.number = arr[i][j]
				ele2.dataset.id = j + i * n
				j++
			})
			i++
		})
	}
	document.getElementById('reset').addEventListener('click',reset)
	document.getElementById('img').style.backgroundImage = 'url("image/smile.svg")'


})()