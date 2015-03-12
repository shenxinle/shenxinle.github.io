addLoadEvent(highlightPage);	//all webpages
addLoadEvent(prepareSlideshow);	//home
addLoadEvent(prepareIntervalnav);	//about
addLoadEvent(preparePlaceholder);	//photos
addLoadEvent(showPic);	//photos
addLoadEvent(stripeTables);	//live
addLoadEvent(highlightRow);	//live
addLoadEvent(displayAbbreviations);	//live


function displayAbbreviations(){//live page's abbr generate
	var abbrs=document.getElementsByTagName("abbr");
	if(!abbrs.length)  return false;
	var h2=document.createElement("h2");
	h2.innerHTML="Abbreviation";
	var dl=document.createElement("dl");
	
	for(var i=0;i<abbrs.length;i++){
		var dt=document.createElement("dt");
		var dd=document.createElement("dd");
		dt.innerHTML=abbrs[i].innerHTML;
		dd.innerHTML=abbrs[i].title;
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	var tables=document.getElementsByTagName("table");
	if(!tables.length) return false;
	insertAfter(dl,tables[0]);
	insertAfter(h2,tables[0]);
}
function highlightRow(){
	var trs=document.getElementsByTagName("tr");
	if(!trs.length) return false;
	for(var i=0;i<trs.length;i++){
		trs[i].oldClassName=trs[i].className;
		trs[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		trs[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}
function stripeTables(){
	var tables=document.getElementsByTagName("table");
	if(!tables.length) return false;	
	for(var i=0;i<tables.length;i++){		
		var trs=tables[i].getElementsByTagName("tr");
		for(var j=0;j<trs.length;j++){
			if(j%2==1){
				addClass(trs[j],"odd");
				//trs[j].className="odd";
			}
		}
	}
}
function showPic(){
	var imagegallery=document.getElementById("imagegallery");
	if(!imagegallery) return false;
	var links=imagegallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			var description=document.getElementById("description");
			var placeholder=document.getElementById("placeholder");
			description.innerHTML=this.title;
			placeholder.src=this.href;
			return false;
		}
	}
}
function preparePlaceholder(){
	var imagegallery=document.getElementById("imagegallery");
	if(!imagegallery) return false; 
	var description=document.createElement("p");
	var placeholder=document.createElement("img");
	description.innerHTML="Choose an image";
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","image gallery");
	description.setAttribute("id","description");
	placeholder.setAttribute("id","placeholder");
	insertAfter(description,imagegallery);
	insertAfter(placeholder,description);
}
function prepareIntervalnav(){
	var articles=document.getElementsByTagName("article");
	if(!articles.length) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(!navs.length) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			var id=this.href.split("#")[1];
			showSection(id);
		}
	}
}
function showSection(id){
	var sections=document.getElementsByTagName("section");
	if(!sections.length) return false;
	for(var i=0;i<sections.length;i++){
		if(id==sections[i].id) {
			sections[i].style.display="block";
		}else{
			sections[i].style.display="none";
		}
	}
}
function prepareSlideshow(){
	if(!document.getElementsByName("a")) return false;
	var intro=document.getElementById("intro");
	if(!intro) return false;
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");	
	var preview=document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var imgframe=document.createElement("img");
//	imgframe.setAttribute("src","images/frame.gif");
//	imgframe.setAttribute("alt","frame");
//	imgframe.setAttribute("id","imgframe");
	imgframe.src="images/frame.gif";
	imgframe.alt="frame";
	imgframe.id="imgframe";
	slideshow.appendChild(imgframe);
	var links=document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html") !=-1){
				moveElement("preview",0,0,1);
			}
			if(destination.indexOf("about.html") !=-1){
				moveElement("preview",-150,0,1);
			}
			if(destination.indexOf("photos.html") !=-1){
				moveElement("preview",-300,0,1);
			}
			if(destination.indexOf("live.html") !=-1){
				moveElement("preview",-450,0,1);
			}
			if(destination.indexOf("contact.html") !=-1){
				moveElement("preview",-600,0,1);
			}
		}
	}
}
//移动图片
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement) clearTimeout(elem.movement);
	if(!elem.style.left) elem.style.left="0px";
	if(!elem.style.top) elem.style.top="0px";
	var xpos=parseInt(elem.style.left),
		ypos=parseInt(elem.style.top);
	if(xpos<final_x) xpos+=Math.ceil((final_x-xpos)/10);
	if(xpos>final_x) xpos-=Math.ceil((xpos-final_x)/10);
	if(ypos<final_y) ypos+=Math.ceil((final_y-ypos)/10);
	if(ypos>final_y) ypos-=Math.ceil((ypos-final_y)/10);
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	elem.movement=setTimeout(function(){moveElement(elementID,final_x,final_y,interval);},interval);
}
//本页面的nav文字高亮显示，并给body加id
function highlightPage(){
	var headers=document.getElementsByTagName("header");
	if(!headers.length) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) !=-1){
			links[i].className="here";
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.id=linktext;
		}
	}
}
//添加window加载完毕执行的事件
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload =="function"){
		window.onload=function(){
			oldonload();
			func();
		}
	}else{
		window.onload=func;
	}	
}
//与内置的insertBefore相对应
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//添加类
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		var newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}
