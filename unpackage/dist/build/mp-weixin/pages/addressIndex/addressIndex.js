(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addressIndex/addressIndex"],{"0776":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},"22a3":function(e,t,n){"use strict";n.r(t);var r=n("0776"),a=n("e727");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("8e2d");var o=n("2877"),u=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,null,null);t["default"]=u.exports},"331b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("4ee9"),a=n("ba89"),i=n("a127"),o=s(n("6313")),u=n("2f62");function s(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){d(e,t,n[t])})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){return n.e("components/GxgButton").then(n.bind(null,"d1b6"))},l={data:function(){return{page:1,pages:0,addressList:[],pageSize:10,defaultImg:r.NULL_DATA,isLoading:!0,isChoose:!1,isIpx:!1,pageSrouce:"mine",rightName:"编辑"}},onLoad:function(e){this.options=e,e.srouce&&(this.pageSrouce=e.srouce,"mine"!=this.pageSrouce&&(this.rightName="选择"))},onShow:function(){this.loadData()},methods:c({},(0,u.mapMutations)("order",[o.default.SET_ORDER_ITEM]),{loadData:function(){var e=this;(0,i.getReceiveAddress)().then(function(t){e.addressList=t})},changeAdress:function(t){var n=t.currentTarget.dataset.id,r=(t.currentTarget.dataset.index,this.addressList.find(function(e){return e.id==n}));if("orderBtn"==this.pageSrouce)return(0,i.updateOrderAddress)({orderid:this.options.orderid,receiveid:n}).then(function(t){e.navigateBack({delta:1})});"gxgAddress"==this.pageSrouce&&(getApp().globalData.addressInfor=r,e.navigateBack({delta:1}))},addAddress:function(){e.navigateTo({url:"".concat(a.ADDRESS_DETAIL,"?srouce=").concat(this.pageSrouce)})},exitAddress:function(e){if("mine"==this.pageSrouce){var t=this.addressList.find(function(t){return t.id==e.currentTarget.dataset.id});wx.navigateTo({url:"".concat(a.ADDRESS_DETAIL,"?address=").concat(JSON.stringify(t))})}else this.changeAdress(e)}}),components:{GxgButton:f}};t.default=l}).call(this,n("543d")["default"])},"64e5":function(e,t,n){"use strict";(function(e){n("a824"),n("921b");r(n("66fd"));var t=r(n("22a3"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"8e2d":function(e,t,n){"use strict";var r=n("9856"),a=n.n(r);a.a},9856:function(e,t,n){},e727:function(e,t,n){"use strict";n.r(t);var r=n("331b"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);t["default"]=a.a}},[["64e5","common/runtime","common/vendor"]]]);