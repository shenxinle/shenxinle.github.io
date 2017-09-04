---
layout: post
title:  Mobile dev
categories: jekyll update
---

## common

{% highlight ruby %}
## viewport
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no;">

## orientation
window.addEventListener('orientationchange', function () {
    // ...
}, false);
console.log(window.orientation);    // 0,90,180,-90

@media (orientation:portrait) {...}
@media (orientation:landscape) {...}

## open numeric keyboard
<input type="tel" name="" value="">

## hide address field
setTimeout(function () {
    window.scrollTo(0, 1);
}, 0);

## apple-touch-icon
<link rel="apple-touch-icon" href="apple-touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-iphone4.png" />

{% endhighlight %}

## debug

[weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/)
{% highlight ruby %}
npm install -g weinre   // install
weinre --boundHost -all- --httpPort 8080    // start
add target script to the webpage which you debug
{% endhighlight %}

[browser-sync](http://www.browsersync.io/)