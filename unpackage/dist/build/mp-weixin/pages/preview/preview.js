(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/preview/preview"],{5641:function(n,e,t){"use strict";var r=t("9f4f"),o=t.n(r);o.a},"5b7b":function(n,e,t){"use strict";(function(n){t("a824"),t("921b");r(t("66fd"));var e=r(t("f3cc"));function r(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"97cd":function(n,e,t){"use strict";var r=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return r}),t.d(e,"b",function(){return o})},"9f4f":function(n,e,t){},b0b4:function(n,e,t){"use strict";t.r(e);var r=t("e17f"),o=t.n(r);for(var c in r)"default"!==c&&function(n){t.d(e,n,function(){return r[n]})}(c);e["default"]=o.a},e17f:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(t("a34a")),o=t("ba89"),c=t("c5af"),u=(i(t("1dd6")),t("2f62")),a=i(t("6313"));function i(n){return n&&n.__esModule?n:{default:n}}function f(n,e,t,r,o,c,u){try{var a=n[c](u),i=a.value}catch(f){return void t(f)}a.done?e(i):Promise.resolve(i).then(r,o)}function l(n){return function(){var e=this,t=arguments;return new Promise(function(r,o){var c=n.apply(e,t);function u(n){f(c,r,o,u,a,"next",n)}function a(n){f(c,r,o,u,a,"throw",n)}u(void 0)})}}function d(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.forEach(function(e){s(n,e,t[e])})}return n}function s(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var p=function(){return t.e("components/SwiperImg").then(t.bind(null,"2410"))},b=function(){return t.e("components/GxgButton").then(t.bind(null,"d1b6"))},v=function(){return Promise.all([t.e("common/vendor"),t.e("components/PreviewBar")]).then(t.bind(null,"68a7"))},h={data:function(){return{clotheInfo:null,orderInfor:{}}},components:{GxgButton:b,SwiperImg:p,PreviewBar:v},onLoad:function(){this.clotheInfo=getApp().globalData.clotheInfo,this.orderInfor=getApp().globalData.previewInfo},onUnload:function(){},methods:d({},(0,u.mapMutations)("order",[a.default.SET_ORDER_ITEM]),{startTodo:function(){n.redirectTo({url:"".concat(o.TODO_DETAIL,"?id=").concat(this.orderInfor.worksId,"&type=2")})},submiOrder:function(){var e=l(r.default.mark(function e(){var t;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,c.createOrder)({goodsid:this.orderInfor.worksId,size:getApp().globalData.clotheInfo.size.sizeId});case 2:t=e.sent,this[a.default.SET_ORDER_ITEM](d({},this.orderInfor,{sizeName:getApp().globalData.clotheInfo.size.name,id:t})),n.navigateTo({url:"".concat(o.WRITE_ORDER,"?id=").concat(t,"&price=").concat(this.orderInfor.price)});case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()})};e.default=h}).call(this,t("543d")["default"])},f3cc:function(n,e,t){"use strict";t.r(e);var r=t("97cd"),o=t("b0b4");for(var c in o)"default"!==c&&function(n){t.d(e,n,function(){return o[n]})}(c);t("5641");var u=t("2877"),a=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,"c3959ee6",null);e["default"]=a.exports}},[["5b7b","common/runtime","common/vendor"]]]);