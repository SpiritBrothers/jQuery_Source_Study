## jQuery源码分析-入门

以当前时间2020年4月11日版本为主【3.5.0】

作者  [John Resig]( [https://baike.baidu.com/item/John%20Resig/6336344?fr=aladdin](https://baike.baidu.com/item/John Resig/6336344?fr=aladdin) )  2006

 JavaScript做了CSS选择引擎，之后还做了个动画引擎 

### 一、Download相关联

浏览器支持，兼容旧代码以及旧的浏览器

```
## jQuery Migrate Plugin ##

We have created the jQuery Migrate plugin to simplify the transition from older versions of jQuery. The plugin restores deprecated features and behaviors so that older code will still run properly on newer versions of jQuery. Use the uncompressed development version to diagnose compatibility issues, it will generate warnings on the console that you can use to identify and fix problems. Use the compressed production version to simply fix compatibility issues without generating console warnings.

There are two versions of Migrate. The first will help you update your pre-1.9 jQuery code to jQuery 1.9 up to 3.0. You can get that version here:



The second version helps you update code to run on jQuery 3.0 or higher, once you have used Migrate 1.x and upgraded to jQuery 1.9 or higher:


```

###  二、jQuery

- 只是一个JavaScript库
- jQuery的所有功能都可以通过JavaScript进行访问 
- The Write Less,Do More（写更少，做更多），无疑就是jQuery的核心理念 
-  轻量级的js库 ，它兼容CSS3，还兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+），jQuery2.0及后续版本将不再支持IE6/7/8浏览器。
- jQuery使用户能更方便地处理HTML（标准通用标记语言下的一个应用）、events、实现动画效果，并且方便地为网站提供AJAX交互 
- 简洁的API、优雅的链式、强大的查询与便捷的操作。

### 三、阅读源码必要性

如果要我们自己实现一个定制的动画呢？我们要考虑的问题太多太多了，

浏览器兼容、

各种属性的获取、

逻辑流程、

性能等等，

这些才是前端开发的基础核心 

### 四、代码入口



```javascript
var global = typeof window !== "undefined" ? window : this;
var factory //line 40 第二个参数
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )(global, factory);
```

