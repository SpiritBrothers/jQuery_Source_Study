## jQuery _ $ _ 类数组对象结构



### 一、 $ === jQuery

*参考整体架构入口*

```javascript
window.$ = window.jQuery
```



### 二、jQuery与原生DOM转换

#### 1、jQuery对象与原生DOM对象的区别

jQuery对象是**包装原生**DOM对象后产生的，jQuery对象只能使用jQuery方式，原生DOM对象只能使用原生DOM方式

####  2、jQuery对象转原生DOM对象方式

```JavaScript
var $content = $("#content") 
// 此处$content只是告诉开发者这个是jQuery对象，
// 不用$也是一个样子，这个只是一个变量，没有任何特殊意义
var content = $content[0] 
// 或者 等价于 
var content = $content.get(0)
var content = $content.eq(0)[0]
```



#### 3、原生DOM对象转jQuery对象

```javascript
var header = document.getElementById('content')
// 将原生DOM对象转jQuery对象
var $header = $(header);
```



#### 4、原生DOM与jQuery对象转换扩展

```JavaScript
$("#div").html()
// 等价于
$("#div")[0].innerHTML
$("#div").eq(0)[0].innerHTML
$("#div").get(0).innerHTML
$(document.getElementById('div')).html()
```



### 三、类数组对象结构





