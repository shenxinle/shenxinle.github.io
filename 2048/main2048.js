var board=[];
var score=0;
var hasConflicted=[];
var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function (){
	prepareForMobile();
	newgame();
});
$('#newgame').click(function (){
	newgame();
});
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.04*gridContainerWidth);
	
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.1*cellSideLength);
}
function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子里生成数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		board[i]=[];
		hasConflicted[i]=[];
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	updateBoardView();
	score=0;
	updatescore(score);
}
function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	}
	$('.number-cell').css('line-height',cellSideLength+'px');
	$('.number-cell').css('font-size',0.6*cellSideLength+'px');
}
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var board0=[];
	var rand;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				board0.push([i,j]);
			}
		}
	}
	rand=board0[parseInt(Math.floor(Math.random()*board0.length))];
	//随机一个数
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[rand[0]][rand[1]]=randNumber;
	showNumberWithAnimation(rand[0],rand[1],randNumber);
	return true;
}
$(document).keydown(function (event){
	switch(event.keyCode){
		case 37://left
			event.preventDefault();
			if(moveLeft()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
			break;
		case 38://up
			event.preventDefault();
			if(moveUp()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
			break;	
		case 39://right
			event.preventDefault();
			if(moveRight()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
			break;
		case 40://down
			event.preventDefault();
			if(moveDown()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
			break;
		default: 
			break;
	}
});
document.addEventListener('touchstart',function (event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function (event){
	event.preventDefault();
});
document.addEventListener('touchend',function (event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var deltax=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(deltax)<0.1*documentWidth && Math.abs(deltay)<0.1*documentWidth){
		return;
	}
	if(Math.abs(deltax)>Math.abs(deltay)){
		if(endx>startx){
			if(moveRight()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		}else{
			if(moveLeft()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		}
	}else{
		if(endy>starty){
			if(moveDown()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		}else{
			if(moveUp()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		}
	}
});
function moveLeft(){
	if(!canMoveLeft(board)){return false;}
	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]){
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updatescore(score);
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board)){return false;}
	//moveRight
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updatescore(score);
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board)){return false;}
	//moveUp
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]){
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockVertical(k,i,j,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(k,i,j,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updatescore(score);
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	return true;
}
function moveDown(){
	if(!canMoveDown(board)){return false;}
	//moveDown
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockVertical(i,k,j,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updatescore(score);
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	return true;
}
function updatescore(score){
	$('#score').text(score);
}
function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}
