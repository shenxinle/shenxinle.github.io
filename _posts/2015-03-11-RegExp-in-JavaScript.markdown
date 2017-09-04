---
layout: post
title:  RegExp in JavaScript
date:   2015-03-11 09:17:23
categories: jekyll update
---
<h2>RegExp定义</h2>
- 字面量形式：`var reg=/javascript/i;`<br>
- 构造函数形式：`var reg=new RegExp("javascript","i");`<br>

<h2>字符类</h2>
- `[...]` 方括号内任意字符 <br>
- `[^...]` 不在方括号内的任意字符 <br>
- `.` 除换行符和其他Unicode行终止符之外的任意字符 <br>
- `\w` ASCII字符，等价于`[a-zA-Z0-9]` <br>
- `\W` 等价于`[^a-zA-Z0-9]` <br>
- `\s` 任何Unicode空白符 <br>
- `\S` 任何非Unicode空白符的字符 <br>
- `\d` 数字，等价于`[0-9]` <br>
- `\D` 等价于`[^0-9]`  <br>

<h2>重复</h2>
- `{n,m}` 匹配前一项n到m次（包含n、m） <br>
- `{n,}` 匹配前一项大于等于n次 <br>
- `{n}` 匹配前一项n次 <br>
- `？` 匹配前一项0或1次 <br>
- `+` 匹配前一项1次及以上 <br>
- `*` 匹配前一项0次及以上 <br>

上述表示默认为贪婪模式，即尽可能多地匹配字符数，如`/a+/`会匹配`"aaa"`中的三个字符。在正则表达式中待匹配的字符后面跟随一个`?`即可改为非贪婪模式，即尽可能匹配少的字符，如`/a+?/`只匹配`"aaa"`中的第一个字符。另外，正则表达式是从左到右匹配的，所以`/a+?b/`还是会匹配`"aaab"`的全部字符。

<h2>选择、分组和引用</h2>
- `|` 用于表示或选择，如 `/a|b/` 会先查找字符串是否有a,没有的话再查找是否有b。 <br>
- `( )` 括号的作用有三，一是把一些字符组合为子表达式； 二是记忆/捕获与括号内容相匹配的字符； 三是引用，在正则表达式的后面可以通过`\n (n为正整数)`来引用前面括号中的内容， 如`/(Java)Script\s+is\s+more\s+fun\s+than\s+\1`最后的`\1`即指代前面括号中的`Java`。引用的一个常见用法是匹配引号，如`/(['"])[^'"]*\1/` 。另外，正则表达式不允许双引号括起的内容中有单引号，反之亦然。<br>
- (?: ) 只起()三个作用中的第一个作用。

<h2>指定匹配的位置（类似于锚）</h2>
- `^` 匹配字符串开始 <br>
- `$` 匹配字符串结束 <br>
- `\b` 匹配一个单词的边界 <br>
- `\B` 与`\b`相反，匹配一个单词的非边界处 <br>
- `x(?=y)` 仅当x后面直接跟着y时,匹配x <br>
- `x(?!y)` 仅当x后面不直接跟着y时,匹配x <br>

<h2>修饰符</h2>
- `i` ingnoreCase，忽略大小写 <br>
- `g` global，全局匹配 <br>
- `m` multiline，多行匹配，在这种模式下，`^`可以匹配换行符`\n`后一行的开头，`$`可以匹配换行符`\n`这一行的结尾， <br>

<h2>用于模式匹配的String方法</h2>
search(), replace(), match(), split()。 <br>
1. `"JavaScript".search(/script/i);  //=>4` 一个参数，为RegExp或String，但String会自动转换为RegExp。返回匹配的第一个子串的index值，未匹配则返回 -1。 <br>
2. `"Java".replace(/java/ig,"JavaScript");  //=>JavaScript` 两个参数，第一个参数可以是RegExp，也可以是String，不会自动转换。若RegExp是global的，则匹配的全部替换，否则只替换匹配到的第一个子串。 <br>
3. `"1add2==1add2".match(/\d(\w+)\d/g); //=>["1add2","1add2"] `，`"1add2==1add2".match(/\d(\w+)\d/); //=>["1add2","add"] `，global模式全匹配，否则匹配第一个和记忆的内容。未匹配则返回null。 <br>
4. `"1, 2, 3, 4".split(/\s*,\s*/); //=>["1","2","3","4"]` 分割字符串为数组。

<h2>RegExp的属性和方法</h2>
<h3>属性</h3>
- `source` 只读，包含正则表达式的文本 <br>
- `global` 只读，即带修饰符`g` <br>
- `ignoreCase` 只读，即带修饰符`i` <br>
- `multiline` 只读，即带修饰符`m` <br>
- `lastIndex` 可读写，字符串下一次开始检索的位置 <br>

<h3>方法</h3>
- exec()，未匹配时返回 null， 非 global 时返回匹配的第一个及括号中记忆的， global 时返回 lastIndex 后匹配的第一个及括号中记忆的。
{% highlight ruby %}
var reg=/Ja(va)\S/;
var text="JavaScript is not Java!";
console.log(reg.exec(text));
console.log(reg.exec(text));
console.log(reg.exec(text));
console.log(reg.exec(text));

=>["JavaS","va"]
=>["JavaS","va"]
=>["JavaS","va"]
=>["JavaS","va"]
{% endhighlight %}

{% highlight ruby %}
var reg=/Ja(va)\S/g;
var text="JavaScript is not Java!";
console.log(reg.exec(text));
console.log(reg.exec(text));
console.log(reg.exec(text));
console.log(reg.exec(text));

=>["JavaS","va"]
=>["Java!","va"]
=>null
=>["JavaS","va"]
{% endhighlight %}

对非 global 来说每次匹配后 lastIndex 不变，还是为 0 。但对 global 来说，每次匹配后 lastIndex 变为匹配子串的后一个字符的位置，直到未匹配到之后再重新变为 0 。lastIndex可以手动改变。 <br>

- test()， 未匹配到时返回 null， 匹配到返回 true。其 lastIndex 与 global 关系类似 exec()。
