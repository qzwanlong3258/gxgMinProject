(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/OrderButton"],{2395:function(t,e,n){},"4bfe":function(t,e,n){"use strict";n.r(e);var r=n("8d9b"),o=n("ce86");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("8136");var u=n("2877"),c=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},"7f57":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("d636"),o=n("ba89"),i=n("5a40"),u=d(n("6313")),c=n("2f62"),a=n("d242");function d(t){return t&&t.__esModule?t:{default:t}}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){f(t,e,n[e])})}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={props:{btnList:{type:Array,default:function(){return[]}},orderid:{type:Number,default:0},item:{type:Object,default:function(){return{}}}},data:function(){return{isShowModel:!1}},computed:{canUseBtn:function(){return this.btnList.map(function(t){return(0,i.formatOrderButtonState)(t)}).filter(function(t){return void 0!=t})}},methods:s({},(0,c.mapActions)("order",["getOrderItem","getOrderStatus"]),(0,c.mapMutations)("order",[u.default.SET_ORDER_ITEM]),{showRefundModel:function(){this.isShowModel=!this.isShowModel},clickBtnEvent:function(e){var n=this,i=e.target.dataset.id;1==i?(0,r.makePhoneCall)({phone:"0574-83017657"}):2==i?(0,r.gxgConfirm)({successFunction:function(){(0,a.deleteOrder)(n.orderid).then(function(t){n.$emit("deleteSuccess",{id:n.orderid})})}}):3==i?t.navigateTo({url:"".concat(o.WRITE_ORDER,"?id=").concat(this.orderid)}):4==i?t.navigateTo({url:"".concat(o.ADDRESS_INDEX,"?srouce=orderBtn&orderid=").concat(this.orderid)}):5==i?(0,a.getOrderDetail)(this.orderid).then(function(e){(0,r.gxgConfirm)({title:"物流单号",content:e.deliveryId,showCancel:!1,confirmText:"确认复制",successFunction:function(){t.setClipboardData({data:e.deliveryId,success:function(){t.showToast({title:"已复制到剪切板",icon:"none"})}})}})}):6==i?(0,a.orderDelivery)(this.orderid).then(function(e){t.showToast({title:"收货成功",duration:2e3,icon:"none",success:function(){n.$emit("updateList"),t.navigateTo({url:"".concat(o.ORDER_LIST,"?state=4"),success:function(){n.getOrderStatus()}})}})}):7==i?(0,r.makePhoneCall)({phone:"0574-83017657"}):8==i?t.navigateTo({url:"".concat(o.WRITE_ORDER,"?id=").concat(this.orderid)}):9==i?(this.showRefundModel(),this[u.default.SET_ORDER_ITEM](this.item),t.navigateTo({url:"".concat(o.REFUND_DETAIL,"?id=").concat(this.id)})):10==i&&t.switchTab({url:o.HOME_INDEX})}})};e.default=l}).call(this,n("543d")["default"])},8136:function(t,e,n){"use strict";var r=n("2395"),o=n.n(r);o.a},"8d9b":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})},ce86:function(t,e,n){"use strict";n.r(e);var r=n("7f57"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/OrderButton-create-component',
    {
        'components/OrderButton-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4bfe"))
        })
    },
    [['components/OrderButton-create-component']]
]);