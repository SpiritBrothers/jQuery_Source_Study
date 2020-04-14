## jQuery对象【无new构建对象】

### 一、 JS 创建对象方式

#### 1.1 JavaScript-new做了什么

 https://github.com/WHB1/My_FE/issues/7 

#### 1.2 JavaScript创建对象









### 二、 jQuery对象创建



> 代码

```javascript
// 官方代码
var
	version = "3.5.0",
	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};
jQuery.fn = jQuery.prototype = {
    jquery: version,
	constructor: jQuery,
    length: 0,
	toArray: function() {
		return slice.call( this );
	},
    get: function( num ) {
		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}
		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},
    //...
    
}


var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
        var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;
        // ....
        return jQuery.makeArray( selector, this )||this;
    }
init.prototype = jQuery.fn;
```



#### 1、闭包

##### 1.1 概念

**闭包函数：**声明在一个函数中的函数，叫做闭包函数。

**闭包：**内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

##### 1.2 特点

让外部访问函数内部变量成为可能；

局部变量会常驻在内存中；（手动即使清空null 释放掉）

可以避免使用全局变量，防止全局变量污染；

会造成内存泄漏（有一块内存空间被长期占用，而不被释放）

 https://blog.csdn.net/weixin_43586120/article/details/89456183 



##### 1.3 扩展--JavaScript内存泄漏

 https://www.cnblogs.com/leftJS/p/11083191.html 



#### 2、原型链



#### 3、无new生成对象前世今生

##### 3.1 常规生成对象方式

```JavaScript
var aQuery = function(selector, context){
    // 构造函数
}
aQuery.prototype = {
    name:function(){},
    age:function(){}
}

var a = new aQuery();
a.name();
// 此种方式仍然无法实现无new方式
// jQuery方式
// jQuery().ready() || $().ready()
```

##### 3.2 jQuery实现方式

使用 **jQuery() | $()** 直接返回对象实例

```javascript
var aQuery = function(selector, context){
    return aQuery.prototype.init()
}
aQuery.prototype = {
    init:function(){
        return this;
    },
    name:function(){},
	age:function(){}
}
aQuery()//返回aQuery实例
// init 中 this指向aQuery类实例
/**************如下***********/
aQuery.prototype = {
    init:function(){
        this.age = 18;
        return this;
    },
    name:function(){},
	age:20
}
aQuery().age // 18
// 此种情况this指向就出错啦，需要设计独立作用域才行
```

jQuery库分割作用域的处理

```javascript
jQuery = function( selector, context ) {
   // The jQuery object is actually just the init constructor 'enhanced'
   return new jQuery.fn.init( selector, context, rootjQuery );
}
```

 实例init函数，每次都构建新的init实例对象，来分隔this,避免交互混淆 

 既然都不是同一个对象那么肯定又出现一个新的问题 

```JavaScript
var aQuery = function(selector, context) {
       return  new aQuery.prototype.init();
}
aQuery.prototype = {
    init: function() {
        this.age = 18
        return this;
    },
    name: function() {},
    age: 20
}

//Uncaught TypeError: Object [object Object] has no method 'name' 
console.log(aQuery().name())
```

 抛出错误，无法找到这个方法，所以很明显new的init跟jquery类的this分离了 

 做到既能隔离作用域还能使用jQuery原型对象的作用域呢，还能在返回实例中访问jQuery的原型对象? 

```JavaScript
// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;
```

通过原型传递解决问题，把jQuery的原型传递给jQuery.prototype.init.prototype

换句话说jQuery的原型对象覆盖了init构造器的原型对象

 因为是引用传递所以不需要担心这个循环引用的性能问题 

```JavaScript
var aQuery = function(selector, context) {
       return  new aQuery.prototype.init();
}
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this.age
    },
    age: 20
}

aQuery.prototype.init.prototype = aQuery.prototype;

console.log(aQuery().name()) //20
```



### 三、jQuery对象和原生DOM对象关联





