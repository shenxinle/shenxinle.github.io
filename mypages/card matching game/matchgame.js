var matchGame={};
matchGame.card=[
	"AJ","AJ",
	"AQ","AQ",
	"AK","AK",
	"BJ","BJ",
	"BQ","BQ",
	"BK","BK",
];
$(function (){
	matchGame.card.sort(shuffle);
	for(var i=0;i<11;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	$("#cards").children().each(function(index){
		$(this).css({
		  "left":($(this).width()+20)*(index%4),
		  "top":($(this).height()+20)*Math.floor(index/4)
		});
		var pattern=matchGame.card.pop();
		$(this).find(".back").addClass(pattern);
		$(this).attr("data-pattern",pattern);//以'data-'为前缀创建自定义数据属性（H5新增）
		$(this).click(selectCard);
	});
});

function shuffle(){
	return 0.667-Math.random();
}
function selectCard(){
	if($(".card-flipped").size()>1){
		return;
	}
	$(this).addClass("card-flipped");
	if($(".card-flipped").size()==2){
		setTimeout(checkPattern,700);
	}
}
function checkPattern(){
	if(isMatchPattern()){
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").remove();
		if($("#cards").children().size()==0){
			alert("Congratulations, you win!");
		}
	}else{
		$(".card-flipped").removeClass("card-flipped");
	}
}
function isMatchPattern(){
	var cards=$(".card-flipped");
	var pattern=$(cards[0]).data("pattern");
	var anotherPattern=$(cards[1]).data("pattern");
	return (pattern==anotherPattern);
}