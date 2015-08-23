---
layout: post
title:  IE compatibility
categories: jekyll update
---

## 浏览器的一般兼容问题 ##

### 1.html5、css3特性支持检测 ###

资源：[modernizr](http://modernizr.com/ "modernizr") (下载时默认勾选 html5shiv ,在IE中模拟 html5 块状元素)

#### IE8及以下使用html5新元素(自己写的话) ####

{% highlight ruby %}
    section, article, aside, footer, header, nav, hgroup {
        display:block;
    }

    <!--[if lt IE 9]>
        <script>
            document.createElement('section');
            document.createElement('article');
            document.createElement('aside');
            document.createElement('footer');
            document.createElement('header');
            document.createElement('nav');
            document.createElement('hgroup');
        </script>
    <![endif]-->
{% endhighlight %}

### 2.IE使用 ###

{% highlight ruby %}
    <!--[if IE 7]>
        <link href="...">
        <script>
            // ie7 单独样式只需加个 .ie7父类即可
            $(document.documentElement).addClass('ie7');

            // IE7及以下::after/:after伪对象无效
            $('.clearfix,.row').append('<h6 style="clear: both;"></h6>');

            // IE7及以下box-sizing: border-box 无效
            $('.row>[class*="col-"]').each(function (index, e){
                var the=$(this);
                if(the.parents('.hide').length){
                    return;
                }
                var borderLeft, paddingLeft, paddingRight, borderRight;
                borderLeft=(the.css('border-left') ? parseFloat(the.css('border-left')) : 0);
                paddingLeft=(the.css('padding-left') ? parseFloat(the.css('padding-left')) : 0);
                paddingRight=(the.css('padding-right') ? parseFloat(the.css('padding-right')) : 0);
                borderRight=(the.css('border-right') ? parseFloat(the.css('border-right')) : 0);
                var width=Math.floor(parseFloat(the.width())-borderLeft-paddingLeft-paddingRight-borderRight);
                if(width>200){
                    width--;
                }
                the.width(width);
            });
        </script>
    <![endif]-->

    <!--[if lt IE 8]>
        <script src="..."></script>
    <![endif]-->

    <!--[if gt IE 8]>
        <script src="..."></script>
    <![endif]-->

    <!--[if lte IE 8]>
        <script src="..."></script>
    <![endif]-->
    
    // 不通过脚本添加类的写法
    <!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
    <!--[if IE 8]>    <html class="no-js lt-ie9"> <![endif]-->
    <!--[if gt IE 8]><!-->
    <html class="no-js" lang="zh-CN">
    <!--<![endif]-->
{% endhighlight %}

### 3.IE下部分CSS3特性模拟 ###

资源：[css3pie](http://css3pie.com/ "css3pie")

使用：必须通过web服务器使用，本地直接测试无效。下载整个资源包后，在对应CSS3代码后直接用 [behavior](https://msdn.microsoft.com/en-us/library/ms530723%28v=vs.85%29.aspx "behavior") 调用 .htc文件即可。

{% highlight ruby %}
    border-radius: 20px;
    behavior: url(PIE-2.0beta1/PIE.htc);

    // rgba
    background: rgba(0,0,0,0.2);
    -pie-background: rgba(0,0,0,0.2);
    behavior: url(PIE-2.0beta1/PIE.htc);
{% endhighlight %}
