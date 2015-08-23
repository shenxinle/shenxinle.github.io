---
layout: post
title:  Function and Object in JS
date:   2015-03-26 21:17:23
categories: jekyll update
---
<h2>问题起源</h2>
问题起源于Douglas Crockford的《JavaScript语言精粹》，里面有这么一段扩充类型功能的代码

{% highlight ruby %}
Function.prototype.method=function (name,func){
  if(!this.prototype[name]){
    this.prototype[name]=func;
  }
  return this;
};
{% endhighlight %}

验证了一下这个方法对 String、Number、Function、Array、Object 都是有效的。

{% highlight ruby %}
String.method("add",function (str){
  return this+str;
});
document.writeln(("str").add("str")+"<br>");    // "strstr"

Number.method("add",function (num){
  return this+num;
});
document.writeln((2).add(3)+"<br>");    // 5

Function.method("copy",function (){
  return arguments[0];
});
document.writeln((function (){}).copy(2)+"<br>");   // 2

Array.method("add",function (){
  return this;
});
document.writeln([1,2,3].add()+"<br>");     // [1,2,3]

Object.method("add",function (){
  return this.name;
});
document.writeln({name:"qing"}.add()+"<br>");   // "qing"
{% endhighlight %}

既然 String、Number、Function、Array、Object 都能够使用 method() 方法，肯定是继承自 Function 的原型对象 Function.prototype, 那么可以简单的认为 String、Number、Function、Array、Object 都是 Function 的实例，验证如下

{% highlight ruby %}
String instanceof Function  //true
Number instanceof Function  //true
Function instanceof Function    //true
Array instanceof Function   //true
Object instanceof Function  //true
{% endhighlight %}

另一方面，下面的代码构造的method()方法对 String、Number、Function、Array、Object 也都是有效的，所以 String、Number、Function、Array、Object 也可以认为都是 Object 的实例

{% highlight ruby %}
Object.prototype.method=function (name,func){
  if(!this.prototype[name]){
    this.prototype[name]=func;
  }
  return this;
};
{% endhighlight %}

{% highlight ruby %}
String instanceof Object    //true
Number instanceof Object    //true
Function instanceof Object    //true
Array instanceof Object    //true
Object instanceof Object    //true
{% endhighlight %}

<h2>有趣的问题</h2>

由前面的叙述可以得到下面的表达式

{% highlight ruby %}
Object instanceof Function  //true
Function instanceof Object  //true
{% endhighlight %}

另外，还有

{% highlight ruby %}
Object.constructor === Function   //true
Function.constructor === Function   //true
{% endhighlight %}