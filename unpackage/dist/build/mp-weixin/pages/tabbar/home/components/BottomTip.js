(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/home/components/BottomTip"],{"513d":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=e("d636"),o={methods:{connectWx:function(){(0,c.gxgConfirm)({title:"gxg微信号",content:"gxgbasic001",showCancel:!1,confirmText:"确认复制",successFunction:function(){n.setClipboardData({data:"gxgbasic001",success:function(){n.showToast({title:"已复制到剪切板",icon:"none"})}})}})},makePhone:function(n){(0,c.makePhoneCall)({phone:n})}}};t.default=o}).call(this,e("543d")["default"])},"749c":function(n,t,e){},9035:function(n,t,e){"use strict";e.r(t);var c=e("513d"),o=e.n(c);for(var a in c)"default"!==a&&function(n){e.d(t,n,function(){return c[n]})}(a);t["default"]=o.a},a68e:function(n,t,e){"use strict";var c=e("749c"),o=e.n(c);o.a},d612:function(n,t,e){"use strict";var c=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",function(){return c}),e.d(t,"b",function(){return o})},f5ef:function(n,t,e){"use strict";e.r(t);var c=e("d612"),o=e("9035");for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);e("a68e");var u=e("2877"),i=Object(u["a"])(o["default"],c["a"],c["b"],!1,null,"3e7b0cc4",null);t["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/tabbar/home/components/BottomTip-create-component',
    {
        'pages/tabbar/home/components/BottomTip-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f5ef"))
        })
    },
    [['pages/tabbar/home/components/BottomTip-create-component']]
]);
