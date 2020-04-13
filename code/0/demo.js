(function(a, b) {
    console.log(a) // 输出1
    console.log(b) // 输出2
})(1, 2)


/************************/
(function(global, factory) {
    console.log(global); // window
    console.log(factory); // function(){console.log(666)}
})(window, function() {
    console.log('666')
})

/************************/
(function(global, factory) {
    console.log(global); // window
    console.log(factory); // function(){console.log(666)}
})(typeof window !== "undefined" ? window : this, function() {
    console.log('666')
})


/************************/
(function(global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error('jQuery requires a window with a document')
                }
                return factory(w)
            }
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    console.log('666')
})


/************************/
(function(global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error('jQuery requires a window with a document')
                }
                return factory(w)
            }
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var jQuery = {} // ....此处省略jquery对象入口程序，下一章有讲解
    var _jQuery = window.jQuery
    _$ = window.$;
    console.log('666')
    if (typeof noGlobal === 'undefined') {
        window.jQuery = window.$ = jQuery;
    }
    // 此处AMD兼容 与上下逻辑没有太大联系
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    return jQuery;
})