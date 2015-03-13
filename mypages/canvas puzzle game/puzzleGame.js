//游戏所需变量存储到一个对象里
var canvasGame={
	circles:[],		//圆存储
	circleRadius:15,	//设置圆半径
	thinLineThickness:1,	//细线（圆间连线）
	boldLineThickness:5,	//粗线（圆间连线）
	lines:[],		//圆连线存储
	currentLevel:0 		//所在关卡
};
canvasGame.levels=[	//存储内置关卡数据
	{
		"level":0,
		"circles":[
			{"x":400,"y":156},
			{"x":381,"y":241},
			{"x":84,"y":233},
			{"x":88,"y":73}
		],
		"relationship":{
			"0":{"connectedPoints":[1,2]},
			"1":{"connectedPoints":[0,3]},
			"2":{"connectedPoints":[0,3]},
			"3":{"connectedPoints":[1,2]}
		}
	},
	{
		"level":1,
		"circles":[
			{"x":401,"y":73},
			{"x":400,"y":240},
			{"x":88,"y":241},
			{"x":84,"y":72}
		],
		"relationship":{
			"0":{"connectedPoints":[1,2,3]},
			"1":{"connectedPoints":[0,2,3]},
			"2":{"connectedPoints":[0,1,3]},
			"3":{"connectedPoints":[0,1,2]}
		}
	},
	{
		"level":2,
		"circles":[
			{"x":300,"y":30},
			{"x":450,"y":180},
			{"x":450,"y":350},
			{"x":150,"y":350},
			{"x":150,"y":180}
		],
		"relationship":{
			"0":{"connectedPoints":[2,3]},
			"1":{"connectedPoints":[3,4]},
			"2":{"connectedPoints":[0,4]},
			"3":{"connectedPoints":[0,1]},
			"4":{"connectedPoints":[1,2]}
		}
	},
	{
		"level":3,
		"circles":[
			{"x":92,"y":85},
			{"x":253,"y":23},
			{"x":393,"y":86},
			{"x":390,"y":214},
			{"x":248,"y":275},
			{"x":95,"y":216}
		],
		"relationship":{
			"0":{"connectedPoints":[2,3,4]},
			"1":{"connectedPoints":[3,5]},
			"2":{"connectedPoints":[0,4,5]},
			"3":{"connectedPoints":[0,1,5]},
			"4":{"connectedPoints":[0,2]},
			"5":{"connectedPoints":[1,2,3]}
		}
	},
	{
		"level":4,
		"circles":[
			{"x":300,"y":40},
			{"x":400,"y":120},
			{"x":450,"y":250},
			{"x":390,"y":350},
			{"x":210,"y":350},
			{"x":150,"y":250},
			{"x":200,"y":120}
		],
		"relationship":{
			"0":{"connectedPoints":[2,3,5]},
			"1":{"connectedPoints":[3,4,6]},
			"2":{"connectedPoints":[0,5]},
			"3":{"connectedPoints":[0,1,5]},
			"4":{"connectedPoints":[1,6]},
			"5":{"connectedPoints":[0,2,3]},
			"6":{"connectedPoints":[1,4]}
		}
	}
];

//主函数
$(function (){
	//初始化关卡数据
	setupCurrentLevel();
	//鼠标点下时判断是否落在某个圆内
	$("#game").mousedown(function(e){
		var canvasPosition=$(this).offset();
		var mouseX=(e.pageX-canvasPosition.left)||0;
		var mouseY=(e.pageY-canvasPosition.top)||0;
		for(var i=0;i<canvasGame.circles.length;i++){
			var circleX=canvasGame.circles[i].x;
			var circleY=canvasGame.circles[i].y;
			var radius=canvasGame.circles[i].radius;
			if(Math.pow(mouseX-circleX,2)+Math.pow(mouseY-circleY,2)<Math.pow(radius,2)){
				canvasGame.targetCircle=i;	//定义targetCircle用于保存鼠标点下时位于哪个圆内
				break;
			}
		}
	});
	//鼠标移动时刷新圆的位置、连线、加粗线
	$("#game").mousemove(function (e){
		if(canvasGame.targetCircle!=undefined){
			var canvasPosition=$(this).offset();
			var mouseX=(e.pageX-canvasPosition.left)||0;
			var mouseY=(e.pageY-canvasPosition.top)||0;
			var radius=canvasGame.circles[canvasGame.targetCircle].radius;
			canvasGame.circles[canvasGame.targetCircle]=new Circle(mouseX,mouseY,radius);
			connectCircles();
			intersection();
		}	
	});
	//鼠标松开时判断游戏状态
	$("#game").mouseup(function(e){
		canvasGame.targetCircle=undefined;
		checkLevelCompleteness();
	});
	//游戏循环
	setInterval(gameloop,30);
});

//初始化关卡数据
function setupCurrentLevel(){
	canvasGame.circles=[];
	var level=canvasGame.levels[canvasGame.currentLevel];
	for(var i=0;i<level.circles.length;i++){
		canvasGame.circles.push(new Circle(level.circles[i].x,level.circles[i].y,canvasGame.circleRadius));
	}
	connectCircles();
	intersection();
}

//定义圆和连线构造函数
function Circle(x,y,radius){
	this.x=x;
	this.y=y;
	this.radius=radius;
}
function Line(startPoint,endPoint,thickness){
	this.startPoint=startPoint;
	this.endPoint=endPoint;
	this.thickness=thickness;
}

//初始化关卡连线数据
function connectCircles(){
	canvasGame.lines.length=0;
	var level=canvasGame.levels[canvasGame.currentLevel];
	for(var i in level.relationship){
		var startPoint=canvasGame.circles[i];
		var connectedPoints=level.relationship[i].connectedPoints;
		for(var j in connectedPoints){
			var endPoint=canvasGame.circles[connectedPoints[j]];
			canvasGame.lines.push(new Line(startPoint,endPoint,canvasGame.thinLineThickness));
		}
	}
}

//将相交的线加粗
function intersection(){
	for(var i=0;i<canvasGame.lines.length;i++){
		var lineI=canvasGame.lines[i];
		var is=lineI.startPoint;
		var ie=lineI.endPoint;
		//lineI: a1y=b1x+c1
		var a1=ie.x-is.x,
			b1=ie.y-is.y,
			c1=ie.x*is.y-is.x*ie.y;	
		for(var j=0;j<i;j++){
			var lineJ=canvasGame.lines[j];
			var js=lineJ.startPoint;
			var je=lineJ.endPoint;
			//lineJ: a2y=b2x+c2
			var a2=je.x-js.x,
				b2=je.y-js.y,
				c2=je.x*js.y-js.x*je.y;
			//两条线重复或者平行的话，跳过
			if(a2*b1==a1*b2){
				continue;
			}
			//(x0,y0)为 lineI 和 lineJ 的交点
			var x0=(a1*c2-a2*c1)/(a2*b1-a1*b2),
			    y0=(b1*c2-b2*c1)/(a2*b1-a1*b2);
			//排除浮点数精度问题导致的误判
			if(Math.abs(x0-is.x)<0.000001||Math.abs(x0-ie.x)<0.000001){
				continue;
			}
			//两条线有交点，则加粗
			if(((is.x<x0&&x0<ie.x)||(ie.x<x0&&x0<is.x))&&((js.x<x0&&x0<je.x)||(je.x<x0&&x0<js.x))){
				lineI.thickness=canvasGame.boldLineThickness;
				lineJ.thickness=canvasGame.boldLineThickness;
			}			
		}
	}
}

//游戏循环，用于根据存储数据刷新界面
function gameloop(){
	var canvas=document.getElementById("game");
	var ctx=canvas.getContext("2d");
	clear(ctx);
	//背景颜色渐变设置
	var bg_gradient=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
	bg_gradient.addColorStop(0,"#666");
	bg_gradient.addColorStop(0.34,"#888");
	bg_gradient.addColorStop(0.66,"#888");
	bg_gradient.addColorStop(1,"#666");
	ctx.fillStyle=bg_gradient;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//更新圆的位置
	for(var i=0;i<canvasGame.circles.length;i++){
		var circle=canvasGame.circles[i];
		drawCircle(ctx,circle.x,circle.y,circle.radius);
	}
	//更新连线
	for(var i=0;i<canvasGame.lines.length;i++){
		var line=canvasGame.lines[i];
		drawLine(ctx,line.startPoint.x,line.startPoint.y,line.endPoint.x,line.endPoint.y,line.thickness);
	}
}

//清空画面数据
function clear(ctx){
	ctx.clearRect(0,0,$("#game").width(),$("#game").height());
}

//画圆
function drawCircle(ctx,x,y,radius){
	var circle_gradient=ctx.createRadialGradient(x,y,0,x,y,canvasGame.circleRadius);
	circle_gradient.addColorStop(0,"#f00");
	circle_gradient.addColorStop(0.5,"#0f0");
	circle_gradient.addColorStop(1,"#00f");
	ctx.fillStyle=circle_gradient;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
}
//两点连线
function drawLine(ctx,x1,y1,x2,y2,thickness){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.closePath();
	ctx.lineWidth=thickness;
	ctx.strokeStyle="#cfc";
	ctx.stroke();
}

//判断关卡是否结束
function checkLevelCompleteness(){
	var progress=0;
	for(var i=0;i<canvasGame.lines.length;i++){
		if(canvasGame.lines[i].thickness == canvasGame.boldLineThickness){
			progress++;
		}
	}
	if(progress == 0){
		if(canvasGame.currentLevel+1<canvasGame.levels.length){
			canvasGame.currentLevel++;
		}else{
			alert("恭喜你，通关了！");
			canvasGame.currentLevel=0;
		}
		setupCurrentLevel();
		$("#level").html(canvasGame.currentLevel);
	}
}
