var _2048={
	numbers:[],	//storage the number in every row and col
	score:0	//storage the score
};
for(var i=0;i<4;i++){
	_2048.numbers[i]=[];
}

window.onload=init;
document.getElementById('newgame').onclick=init;

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			_2048.numbers[i][j]=0;
		}
	}
	_2048.score=0;
	//if it has gameover div, remove it
	var gameover=document.getElementById('gameover');
	if(gameover){
		gameover.parentNode.removeChild(gameover);
	}
	//generate two numbers and update the view
	generateOneNumber();
	generateOneNumber();
	updateGameView();
}

//generate one number in _2048.numbers[][] 
function generateOneNumber(){
	var n=0,nums=[];//keep void position
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(!_2048.numbers[i][j]){
				nums[n++]=[i,j];
			}
		}
	}
	//judge gameover or not
	if(!n){
		if(isGameOver() && !document.getElementById('gameover')){
			var container=document.getElementById('container');
			var div=document.createElement('div');
			container.appendChild(div);
			div.className='gameover';
			div.id='gameover';
			div.innerHTML='Game Over!<br />Your Score: '+_2048.score;
			return;
		}else{
			return;
		}
	}
	var index=Math.floor(Math.random()*n);
	_2048.numbers[nums[index][0]][nums[index][1]]=Math.random()<0.5 ? 2 : 4;
}

//update the game view
function updateGameView(){
	var container=document.getElementById('container');
	if(!container) alert('not found container!!!');
	//delete all number-boxes
	var newBoxs=container.getElementsByClassName('newBox');
	for(var i=newBoxs.length-1;i>=0;i--){
		container.removeChild(newBoxs[i]);
	}
	//create new number-boxes
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var newBox=document.createElement('div');
			container.appendChild(newBox);
			newBox.className='newBox';
			newBox.id='newBox'+i+j;
			if(_2048.numbers[i][j]){
				newBox.style.left=100*j+10+'px';
				newBox.style.top=100*i+10+'px';
				newBox.style.width=90+'px';
				newBox.style.height=90+'px';
				newBox.innerHTML=_2048.numbers[i][j];
				newBox.style.backgroundColor=getNumberBackgroundColor(_2048.numbers[i][j]);
			}else{
				newBox.style.left=100*j+55+'px';
				newBox.style.top=100*i+55+'px';
				newBox.style.width=0;
				newBox.style.height=0;
			}
		}
	}
	//update the score
	var score=document.getElementById('score');
	score.innerHTML=_2048.score;
}

//给上下左右方向键绑定游戏逻辑函数
window.onkeydown=function (event){
	if(event.keyCode == 37){//Left Arrow
		leftArrow();
	}else if(event.keyCode == 38){//Up Arrow
		upArrow();
	}else if(event.keyCode == 39){//Right Arrow
		rightArrow();
	}else if(event.keyCode == 40){//Down Arrow
		downArrow();
	}
	generateOneNumber();
	setTimeout(updateGameView,200);
}

//Left Arrow function, move or merge number-boxes
function leftArrow(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(_2048.numbers[i][j]){
				var k=j-1;
				while(k>=0){
					if(_2048.numbers[i][k] == _2048.numbers[i][j]){
						merge(i,j,i,k);
						break;
					}else if(_2048.numbers[i][k]){
						move(i,j,i,k+1);
						break;
					}else if(k==0){
						move(i,j,i,k);
						break;
					}
					k--;
				}
			}
			
		}
	}
}

//Up Arrow function, move or merge number-boxes
function upArrow(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(_2048.numbers[i][j]){
				var k=i-1;
				while(k>=0){
					if(_2048.numbers[k][j] == _2048.numbers[i][j]){
						merge(i,j,k,j);
						break;
					}else if(_2048.numbers[k][j]){
						move(i,j,k+1,j);
						break;
					}else if(k==0){
						move(i,j,k,j);
						break;
					}
					k--;
				}
			}
			
		}
	}
}

//Right Arrow function, move or merge number-boxes
function rightArrow(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(_2048.numbers[i][j]){
				var k=j+1;
				while(k<=3){
					if(_2048.numbers[i][k] == _2048.numbers[i][j]){
						merge(i,j,i,k);
						break;
					}else if(_2048.numbers[i][k]){
						move(i,j,i,k-1);
						break;
					}else if(k==3){
						move(i,j,i,k);
						break;
					}
					k++;
				}
			}
			
		}
	}
}

//Down Arrow function, move or merge number-boxes
function downArrow(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(_2048.numbers[i][j]){
				var k=i+1;
				while(k<=3){
					if(_2048.numbers[k][j] == _2048.numbers[i][j]){
						merge(i,j,k,j);
						break;
					}else if(_2048.numbers[k][j]){
						move(i,j,k-1,j);
						break;
					}else if(k==3){
						move(i,j,k,j);
						break;
					}
					k++;
				}
			}
			
		}
	}
}

//merge two number-boxes
function merge(from_i,from_j,to_i,to_j){
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	_2048.numbers[to_i][to_j]=2*_2048.numbers[from_i][from_j];
	_2048.numbers[from_i][from_j]=0;
	//update score
	_2048.score+=_2048.numbers[to_i][to_j];
}

//move the number-box
function move(from_i,from_j,to_i,to_j){
	if(from_i==to_i && from_j==to_j) return;
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	_2048.numbers[to_i][to_j]=_2048.numbers[from_i][from_j];
	_2048.numbers[from_i][from_j]=0;
}

//judge isgameover or not when box is filled fully
function isGameOver(){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(_2048.numbers[i][j] == _2048.numbers[i][j+1] || _2048.numbers[i][j] == _2048.numbers[i+1][j]){
				return 0;
			}
		}
	}
	for(var i=0;i<3;i++){
		if(_2048.numbers[3][i] == _2048.numbers[3][i+1] || _2048.numbers[i][3] == _2048.numbers[i+1][3]){
			return 0;
		}
	}
	return 1;
}

//set diffrent background-color for diffrent number
function getNumberBackgroundColor(number){
	switch(number){
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return 'black';
}
