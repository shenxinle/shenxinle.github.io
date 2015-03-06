var newBoxs=[];//keep the number box coordinate
for(var i=0;i<4;i++){
	newBoxs[i]=[];
}
beginNewGame();
var newGame=document.getElementById('newgame');

newGame.onclick=beginNewGame;

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
	makeNewNum();
}

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
	setTimeout(makeNewNum,250);
	setTimeout(makeNewNum,500);
}

//generate a new box and number
function makeNewNum(){
	//create a div box
	var container=document.getElementById('container');
	var div=document.createElement("div");
	div.className='newBox';
	div.innerHTML=Math.random()<0.5 ? '2' : '4';
	div.style.background=(div.innerHTML == '2') ? '#EEEEEE' : '#E9E7B4';
	container.appendChild(div);
	//generate the div box position
	var n=0,points=[];
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(!newBoxs[i][j]){
				points[n++]={
					x:j,
					y:i
				};
			}
		}
	}
	var p=Math.floor(Math.random()*n);
	newBoxs[points[p].y][points[p].x]=parseInt(div.innerHTML,10);
	div.id='newBox'+points[p].y+points[p].x;
	div.style.left=100*points[p].x+10+'px';
	div.style.top=100*points[p].y+10+'px';
}

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

function merge(from_i,from_j,to_i,to_j){
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	var toBox=document.getElementById('newBox'+to_i+to_j);
	toBox.parentNode.removeChild(toBox);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	moveBox.id='newBox'+to_i+to_j;
	newBoxs[to_i][to_j]=2*newBoxs[from_i][from_j];
	newBoxs[from_i][from_j]=0;
	moveBox.innerHTML=newBoxs[to_i][to_j];
}

function move(from_i,from_j,to_i,to_j){
	var moveBox=document.getElementById('newBox'+from_i+from_j);
	moveBox.style.left=100*to_j+10+'px';
	moveBox.style.top=100*to_i+10+'px';
	moveBox.id='newBox'+to_i+to_j;
	newBoxs[to_i][to_j]=newBoxs[from_i][from_j];
	newBoxs[from_i][from_j]=0;
}
