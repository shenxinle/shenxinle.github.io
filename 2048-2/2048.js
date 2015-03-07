
var newBoxs=[];//keep the number-box number
var score=0;//keep the score
for(var i=0;i<4;i++){
	newBoxs[i]=[];
}
//初始化游戏界面
beginNewGame();

//给New Game按钮绑定初始化游戏界面函数
var newGame=document.getElementById('newgame');
var status;
newGame.onclick=function (){
	status=setTimeout(beginNewGame,100);
}
newGame.ondblclick=function (){
	clearTimeout(status);
}

//给上下左右方向键绑定游戏逻辑函数
window.onkeydown=function (event){
	if(event.keyCode == 37){//Left Arrow
		leftArrow();
		setTimeout(makeNewNum,200);
	}else if(event.keyCode == 38){//Up Arrow
		upArrow();
		setTimeout(makeNewNum,200);
	}else if(event.keyCode == 39){//Right Arrow
		rightArrow();
		setTimeout(makeNewNum,200);
	}else if(event.keyCode == 40){//Down Arrow
		downArrow();
		setTimeout(makeNewNum,200);
	}
}

//下面为函数库

//begin new game
function beginNewGame(){
	var container=document.getElementById('container');
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var newBox=document.getElementById('newBox'+i+j);
			if(newBox){
				container.removeChild(newBox);
			}
			newBoxs[i][j]=0;
		}
	}
	var gameover=document.getElementById('gameover');
	if(gameover){
		container.removeChild(gameover);
	}
	score=0;
	scoreFresh(0,0);
	setTimeout(makeNewNum,50);
	setTimeout(makeNewNum,100);
}

//generate a new number-box. if no space, judge whether it is gameover 
function makeNewNum(){
	//create a div box
	var container=document.getElementById('container');
	var div=document.createElement("div");
	container.appendChild(div);
	//generate a div box position
	var n=0,points=[];//keep void position
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(!newBoxs[i][j]){
				points[n++]=[i,j];
			}
		}
	}
	//judge it is game over or not
	if(!n){
		if(isGameOver() && !document.getElementById('gameover')){
			div.className='gameover';
			div.id='gameover';
			div.innerHTML='Game Over!<br />Your Score: '+score;
			return;
		}else{
			container.removeChild(div);
			return;
		}
	}
	var p=Math.floor(Math.random()*n);
	div.className='newBox';
	div.innerHTML=Math.random()<0.5 ? '2' : '4';
	div.style.background=(div.innerHTML == '2') ? '#EEEEEE' : '#E9E7B4';
	newBoxs[points[p][0]][points[p][1]]=parseInt(div.innerHTML,10);
	div.id='newBox'+points[p][0]+points[p][1];
	div.style.left=100*points[p][1]+10+'px';
	div.style.top=100*points[p][0]+10+'px';
	div.style.width=90+'px';
	div.style.height=90+'px';
}

//judge isgameover or not when box is filled fully
function isGameOver(){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(newBoxs[i][j] == newBoxs[i][j+1] || newBoxs[i][j] == newBoxs[i+1][j]){
				return 0;
			}
		}
	}
	for(var i=0;i<3;i++){
		if(newBoxs[3][i] == newBoxs[3][i+1] || newBoxs[i][3] == newBoxs[i+1][3]){
			return 0;
		}
	}
	return 1;
}

//Left Arrow function, move or merge number-boxes
function leftArrow(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(newBoxs[i][j]){
				var k=j-1;
				while(k>=0){
					if(newBoxs[i][k] == newBoxs[i][j]){
						merge(i,j,i,k);
						break;
					}else if(newBoxs[i][k]){
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
			if(newBoxs[i][j]){
				var k=i-1;
				while(k>=0){
					if(newBoxs[k][j] == newBoxs[i][j]){
						merge(i,j,k,j);
						break;
					}else if(newBoxs[k][j]){
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
			if(newBoxs[i][j]){
				var k=j+1;
				while(k<=3){
					if(newBoxs[i][k] == newBoxs[i][j]){
						merge(i,j,i,k);
						break;
					}else if(newBoxs[i][k]){
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
			if(newBoxs[i][j]){
				var k=i+1;
				while(k<=3){
					if(newBoxs[k][j] == newBoxs[i][j]){
						merge(i,j,k,j);
						break;
					}else if(newBoxs[k][j]){
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
	var container=document.getElementById('container');
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	var toBox=document.getElementById('newBox'+to_i+to_j);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	newBoxs[to_i][to_j]=2*newBoxs[from_i][from_j];
	newBoxs[from_i][from_j]=0;
	moveBox.innerHTML=newBoxs[to_i][to_j];
	moveBox.id='newBox'+to_i+to_j;
	setTimeout(function (){container.removeChild(toBox);},200);
	scoreFresh(to_i,to_j);
}

//move the number-box
function move(from_i,from_j,to_i,to_j){
	if(from_i == to_i && from_j == to_j){
		return;
	}
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	moveBox.id='newBox'+to_i+to_j;
	newBoxs[to_i][to_j]=newBoxs[from_i][from_j];
	newBoxs[from_i][from_j]=0;
}

//update the score
function scoreFresh(i,j){
	score+=newBoxs[i][j];
	var scoreSpan=document.getElementById('score');
	scoreSpan.innerHTML=score;
}
