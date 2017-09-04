function FuncOnClick(urlMine,urlNormal,arrButton,index1,index2,n,intervalId,event){
	var flag = this.dataset.number
	var over = false
	if(event.which === 1){
		if(flag==888){
			this.style.backgroundImage=urlMine
			gameOver(intervalId,arrButton,urlMine)
			over = true

		}else if(flag == 0){
			this.style.backgroundColor='white';
			this.disabled = 'disabled';
			response(index1,index2,arrButton,n)
		}else{
			this.style.backgroundColor='white';
			this.innerText='' + flag;
			this.disabled = 'disabled';
		}
	}else if(event.which == 3){
		this.style.backgroundImage=urlNormal
		this.disabled = 'disabled'
		if(document.getElementById('numberofmines').value - 0 > 1){
			console.log('the value')
			console.log(document.getElementById('numberofmines').value)
			document.getElementById('numberofmines').value -= 1
		}else{
			document.getElementById('numberofmines').value -= 1
			gameOver(intervalId,arrButton,urlMine)
			over = true
		}
	}
	if(!over){
		success(intervalId,arrButton,urlMine)
	}

}
function RandomNumber(n,MineNumber){
	var arr=new Array()
	for(var i=0;i<n;i++){
		arr[i]=new Array();
		for(var j=0;j<n;j++){
			arr[i][j]=0;
		}
	}
	var total = 0
	while(total < MineNumber){
		var index1 = Math.floor(n*Math.random())
		var index2 = Math.floor(n*Math.random())
		if(arr[index1][index2] !== 888){
			arr[index1][index2] = 888
			total = total + 1
		}
	}
	for(i=0; i<n; i++){
		for(j=0; j<n; j++){
			if(arr[i][j]==888){
				continue;
			}else{
				for(var k = -1; k < 2; k++){
					for(var l = -1; l < 2; l++){
						index1 = i + k
						index2 = j + l
						if(index1 > -1 && index1 < n && index2 > -1 && index2 < n && arr[index1][index2] === 888)
							arr[i][j] += 1
					}
				}
			}
		}
	}

	return arr;
}

function response(id1,id2,arrButton,n){
	var i,j,index1,index2
	for(i = -1; i < 2; i++){
		index1 = id1 + i
		for(j = -1; j < 2; j++){
			index2 = id2 + j
			if(index1 > -1 && index1 < n && index2 > -1 && index2 < n && arrButton[index1][index2].dataset.number != 888 && !arrButton[index1][index2].disabled){
				console.log(arrButton[index1][index2].dataset.number)
				if(arrButton[index1][index2].dataset.number == 0){
					arrButton[index1][index2].style.backgroundColor = 'white'
					arrButton[index1][index2].disabled = true
					response(index1,index2,arrButton,n)
					console.log(index1)
				}else{
					arrButton[index1][index2].style.backgroundColor='white'
					arrButton[index1][index2].innerText='' + arrButton[index1][index2].dataset.number
					arrButton[index1][index2].disabled = true
				}
		}
		}
	}
}

function gameOver(intervalId,arrButton,urlMine){
	allShow(intervalId,arrButton,urlMine)
	document.getElementById('img').style.backgroundImage = 'url("image/cry.png")'
}

function success(intervalId,arrButton,urlMine){
	var successed = true
	arrButton.forEach(function(ele1){
		ele1.forEach(function(ele2){
			if(ele2.dataset.number == 888 && !ele2.disabled){
				successed = false
			}
		})
	})

	if(!successed){
		arrButton.forEach(function(ele1){
			ele1.forEach(function(ele2){
				if(ele2.dataset.number != 888 && !ele2.disabled){
				successed = false
				}
			})
		})
	}
	if(successed){
		allShow(intervalId,arrButton,urlMine)
		alert('恭喜你顺利通过游戏！')
	}
}

function allShow(intervalId,arrButton,urlMine){
	arrButton.forEach(function(element1){
		element1.forEach(function(element2){
			if(element2.dataset.number == 888){
				element2.style.backgroundImage=urlMine
			}else if(element2.dataset.number == 0){
				element2.style.backgroundImage=''
				element2.style.backgroundColor = 'white'
			}else{
				element2.style.backgroundImage=''
				element2.style.backgroundColor = 'white'
				element2.innerText = element2.dataset.number
			}
			element2.disabled = true
		})
	})
	clearInterval(intervalId)
}