(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"29f5":function(t,n,e){"use strict";var i=e("4ea4");e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("20d7")),r=i(e("acf5")),o=e("8eed"),l={data:function(){return{breadth:!1,data:{},form:{pageSize:20,pageIndex:1},list:[],total:0,id:0}},onLoad:function(){document.body.clientWidth<450&&(this.breadth=!0),this.auto()},methods:{auto:function(){var t=this;(0,o.gethomepage)().then((function(n){n.data.fil_pledge_amount=Number(n.data.fil_pledge_amount).toFixed(2),t.data=n.data})),0==this.id?(0,o.transferleaderboard)(this.form).then((function(n){for(var e=0;e<n.data.list.length;e++)n.data.list[e].wallet_cid=n.data.list[e].wallet_cid.substring(0,6)+"..."+n.data.list[e].wallet_cid.substring(n.data.list[e].wallet_cid.length-6,n.data.list[e].wallet_cid.length),n.data.list[e].wallet_from=n.data.list[e].wallet_from.substring(0,6)+"..."+n.data.list[e].wallet_from.substring(n.data.list[e].wallet_from.length-6,n.data.list[e].wallet_from.length),n.data.list[e].wallet_to=n.data.list[e].wallet_to.substring(0,6)+"..."+n.data.list[e].wallet_to.substring(n.data.list[e].wallet_to.length-6,n.data.list[e].wallet_to.length);t.list=n.data.list,t.total=n.data.total})):1==this.id&&(0,o.getlistRichList)(this.form).then((function(n){for(var e=0;e<n.data.list.length;e++)n.data.list[e].balance_address.length>10&&(n.data.list[e].balance_address=n.data.list[e].balance_address.substring(0,6)+"..."+n.data.list[e].balance_address.substring(n.data.list[e].balance_address.length-6,n.data.list[e].balance_address.length));t.list=n.data.list,t.total=n.data.total}))},change:function(t){this.form.pageIndex=t,this.auto()},changes:function(t){this.form.pageIndex=t,this.auto()},num:function(t){this.id=t,this.form.pageIndex=1,this.auto()}},components:{Top:a.default,Footer:r.default}};n.default=l},"72ed":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}));var i={uniTable:e("8bf8").default,uniTr:e("965b").default,uniTh:e("2e26").default,uniTd:e("3d7f").default,pagePagination:e("a36b").default},a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"index"},[i("Top"),i("v-uni-view",{staticClass:"content-container"},[i("v-uni-view",{staticClass:"network"},[i("v-uni-view",{staticClass:"title"},[i("v-uni-image",{attrs:{src:e("9422"),mode:""}}),t._v("全网概况")],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",[i("v-uni-view",[t._v("全网有效算力")]),i("v-uni-view",[t._v(t._s(t.conversion(t.data.all_power)))])],1),i("v-uni-view",[i("v-uni-view",[t._v("活跃存储提供者")]),i("v-uni-view",[t._v(t._s(t.data.active_storage))])],1),i("v-uni-view",[i("v-uni-view",[t._v("每区块奖励")]),i("v-uni-view",[t._v(t._s(Number(t.data.reward_block).toFixed(4))+" FIL")])],1),i("v-uni-view",[i("v-uni-view",[t._v("24h平均存储收益")]),i("v-uni-view",[t._v(t._s(Number(t.data.average_revenue).toFixed(4))+" FIL/TiB")])],1)],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",[i("v-uni-view",[t._v("FIL质押量")]),i("v-uni-view",[t._v(t._s(t.money(t.moneyFormat(t.data.fil_pledge_amount)))+" FIL/TiB")])],1),i("v-uni-view",[i("v-uni-view",[t._v("FIL流通量")]),i("v-uni-view",[t._v(t._s(t.money(t.moneyFormat(t.data.fil_circulation)))+" FIL/TiB")])],1),i("v-uni-view",[i("v-uni-view",[t._v("总账户数")]),i("v-uni-view",[t._v(t._s(t.data.total_accounts))])],1),i("v-uni-view",[i("v-uni-view",[t._v("单T收益")]),i("v-uni-view",[t._v(t._s(Number(t.data.single_t_income).toFixed(4))+" FIL/TiB")])],1)],1)],1),i("v-uni-view",{staticClass:"transfer_list"},[i("v-uni-view",[i("v-uni-image",{attrs:{src:e("afc8"),mode:""}}),t._v("排行榜")],1),i("v-uni-view",{staticClass:"name"},[i("v-uni-view",{staticClass:"menu"},[i("v-uni-view",{class:{bct:0==t.id},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.num(0)}}},[t._v("转账排行榜")]),i("v-uni-view",{class:{bct:1==t.id},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.num(1)}}},[t._v("富豪榜")])],1),i("v-uni-view",[t._v("共有 "+t._s(t.total)+" 条数据")])],1),0==t.id?i("v-uni-view",[t.breadth?t._e():i("v-uni-view",[i("uni-table",{ref:"table",attrs:{border:!0,stripe:!0,stripe:!0,emptyText:"暂无更多数据"}},[i("uni-tr",[i("uni-th",{attrs:{align:"center"}},[t._v("区块高度")]),i("uni-th",{attrs:{align:"center"}},[t._v("消息ID")]),i("uni-th",{attrs:{align:"center"}},[t._v("转出地址")]),i("uni-th",{attrs:{align:"center"}},[t._v("转入地址")]),i("uni-th",{attrs:{align:"center"}},[t._v("数额")])],1),t._l(t.list,(function(n,e){return i("uni-tr",{key:e},[i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.wallet_epoch))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.wallet_cid))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.wallet_from))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.wallet_to))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s((Number(n.wallet_amount)/1e17).toFixed(4))+" FIL")])],1)}))],2)],1),t.breadth?i("v-uni-view",{staticClass:"entry"},t._l(t.list,(function(n,e){return i("v-uni-view",{key:e,staticClass:"expires"},[i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("区块高度")]),i("v-uni-view",[t._v(t._s(n.wallet_epoch))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("消息ID")]),i("v-uni-view",[t._v(t._s(n.wallet_cid))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("转出地址")]),i("v-uni-view",[t._v(t._s(n.wallet_from))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("转入地址")]),i("v-uni-view",[t._v(t._s(n.wallet_to))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("数额")]),i("v-uni-view",[t._v(t._s((Number(n.wallet_amount)/1e17).toFixed(4))+" FIL")])],1)],1)})),1):t._e()],1):t._e(),1==t.id?i("v-uni-view",[t.breadth?t._e():i("v-uni-view",[i("uni-table",{ref:"table",attrs:{border:!0,stripe:!0,stripe:!0,emptyText:"暂无更多数据"}},[i("uni-tr",[i("uni-th",{attrs:{align:"center"}},[t._v("钱包ID")]),i("uni-th",{attrs:{align:"center"}},[t._v("钱包地址")]),i("uni-th",{attrs:{align:"center"}},[t._v("钱包余额")])],1),t._l(t.list,(function(n,e){return i("uni-tr",{key:e},[i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.balance_id))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.balance_address))]),i("uni-td",{attrs:{align:"center"}},[t._v(t._s(Number(n.available_balance).toFixed(4))+" FIL")])],1)}))],2)],1),t.breadth?i("v-uni-view",{staticClass:"entry"},t._l(t.list,(function(n,e){return i("v-uni-view",{key:e,staticClass:"expires"},[i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("钱包ID")]),i("v-uni-view",[t._v(t._s(n.balance_id))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("钱包地址")]),i("v-uni-view",[t._v(t._s(n.balance_address))])],1),i("v-uni-view",{staticClass:"expire"},[i("v-uni-view",[t._v("钱包余额")]),i("v-uni-view",[t._v(t._s(Number(n.available_balance).toFixed(4))+" FIL")])],1)],1)})),1):t._e()],1):t._e(),i("v-uni-view",{staticStyle:{"margin-top":"16px"}},[i("page-pagination",{attrs:{pageSize:t.form.pageSize,currentPage:t.form.pageIndex,numAround:!0,btnText:!0,total:t.total,showGoPage:!0,trigger:"click"},on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.change.apply(void 0,arguments)}}})],1)],1)],1),i("Footer")],1)},r=[]},8827:function(t,n,e){"use strict";e.r(n);var i=e("29f5"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},9422:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUEAYAAADdGcFOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAnpJREFUSMft0V1IU3EYBvDnncPjJwoxyXPOonSI5IWUlBcWeGGKd30o6CALY4SCpVYaIWgmQoGEmx+UIMREiwhCsLopErSLhuxGGSReJLPaItDO3GZ4zttNhplDtwbzouf2fd/n/PgfYI+HVkVbmlSUn89feYxftrXxGKboanp6zEDVOMG9y8tkoGoq7+oiX4b1ulTrcvEA4sFuNwmo4rWZmVgBeQ2PSSgooHr8AMkyFMVqlSRmhW0scXFxrGAb2XBsuHSxBu2UkEBfRt+ccSovz1dnk8WRhYWwX+KKNU0ct9uVszaSPlosUQeyhw9rRQYD3+MWas3KCru5AwmQZRnPNA0HJCnqwL2SiIHeJ/0VhsqUFH+O7bnxriiGe7/yrr9CbjKZmNsZ0IV0RAxMHFkfi89raFDPsUX9NDwc9svMqcWaZXZW6TYcF78XFkYdiHHo0S4IuAEdLghC2PdV0OiUINAtfk+poe/1IQucXE7NzNiPeZaYAQBLm+afdTl8jBlBnsYbZgCmP+6XMQ0TM4K/9rZGQS8kZszzC2reZr4TMOWIcEbNdThWzwc/0GuzGUDP5rmatO7Re+32uEx9tpo6OflXwSHKptTOTnVl3RPnXVzcOqYWPs1BsznZnpCj5TocAF5t5yDFYz0otXo86MFTvjQ6SichoGNiIuxfFqXwZbpDpWVlcLIDrpoaPR7gIT2qq8M1VAKDg5yEZkw2NsYKCCc7YPR6f7v+5x9Du130Ddu+yE1mM9/ki9xtNEb8wVJUwh8IJNu/1S7t6+sjuk2ApoXa1++6OVHzslhSggE6ivrIgXiLFmT6/UDakNw0NAQA7vuBQMR9sc5PxsX/SbtnlxwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMjFUMTc6NTU6MTUrMDg6MDCd1CQ4AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTIxVDE3OjU1OjE1KzA4OjAw7ImchAAAAFF0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fZmtrcGE5dHRraDUvcXVhbndhbmdnYWlsYW4uc3Zn+c660wAAAABJRU5ErkJggg=="},abbf:function(t,n,e){"use strict";e.r(n);var i=e("72ed"),a=e("8827");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("dbb1");var o,l=e("f0c5"),s=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"862280f6",null,!1,i["a"],o);n["default"]=s.exports},afc8:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUEAYAAADdGcFOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAUVJREFUSMdjYBgFlAFGSg34cnfSa6ltxcUM1xieMywRFYVLhP6XZ/j++DHPj3z+Z+unTiXXfBaKvejOwMXYk5r6/zzDAYab6upwnzcwPv2/+NQphgoGBgYKHMhEsQNpDEYdSCmgPA0SCT61TjGV+qSmxvj231zGlcuWYSiYzzjpn8P06bzvc+c8V507l+4OZD7/+xTDDi6uf/OZJzM0GBtjKND8b8C4W1KSIRVVeOhF8ZeYySnSai0t/6f/12P4Wl2NoeM2w7a/btravEZ5O17Mv3aN1g4c9CE46sBRBw40GPQOxChm/tv/lWc8uGsXgzLTtv8Cnz9j6JD51cK46NUrBgaGHQzzGRj+6zHyMMzv7WVQ/u/OICYkBFPGyMJ4nNHl+XO4uRwcbn9nP3vGoPybmeVORQWGvav/xzO0HD480AEy/AAAol9nlu8XzL8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDUtMzBUMTE6NDM6MzErMDg6MDC5562GAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA1LTMwVDExOjQzOjMxKzA4OjAwyLoVOgAAAE50RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fN3hnZ3F0ZHZldTkvcGFpeGluZ2Jhbmcuc3ZnIpLwEwAAAABJRU5ErkJggg=="},c31d:function(t,n,e){var i=e("ef5f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("2ba5ac21",i,!0,{sourceMap:!1,shadowMode:!1})},dbb1:function(t,n,e){"use strict";var i=e("c31d"),a=e.n(i);a.a},ef5f:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,"@media (max-width:450px){.content-container[data-v-862280f6]{padding-top:94.67px;line-height:24px}.content-container .network[data-v-862280f6]{padding:16px}.content-container .network .title uni-image[data-v-862280f6]{width:20px;height:20px;vertical-align:middle;margin-right:10px}.content-container .network .content[data-v-862280f6]{overflow:hidden}.content-container .network .content>uni-view[data-v-862280f6]{float:left;width:48%;height:70px;text-align:center;background:#f1f6fd;font-size:13px;margin-top:10px;margin-right:4%;padding-top:12px;box-sizing:border-box}.content-container .network .content>uni-view[data-v-862280f6]:nth-child(2),\n\t.content-container .network .content>uni-view[data-v-862280f6]:nth-child(4){margin-right:0}.content-container .network .content>uni-view uni-view[data-v-862280f6]:nth-child(2){color:#f3921b;font-weight:700}.content-container .transfer_list[data-v-862280f6]{padding:16px;border-top:6px solid #f0f6fe}.content-container .transfer_list>uni-view:nth-child(1) uni-image[data-v-862280f6]{width:20px;height:20px;vertical-align:middle;margin-right:10px}.content-container .transfer_list .name[data-v-862280f6]{display:flex;margin:16px 0}.content-container .transfer_list .name>uni-view[data-v-862280f6]:nth-child(2){flex:1;text-align:right;font-size:14px;line-height:40px}.content-container .transfer_list .name .menu[data-v-862280f6]{flex:1;height:40px;line-height:40px;display:flex;text-align:center;font-size:14px}.content-container .transfer_list .name .menu uni-view[data-v-862280f6]{flex:1;cursor:pointer}.content-container .transfer_list .name .menu .bct[data-v-862280f6]{color:#f3921b;border-bottom:1px solid #f3921b}.content-container .expires[data-v-862280f6]{border:1px solid #eee;box-shadow:0 2px 4px 1px #e5e5e5;padding:10px;margin:10px 0;border-radius:4px}.content-container .expire[data-v-862280f6]{display:flex;font-size:12px}.content-container .expire uni-view[data-v-862280f6]{flex:1}.content-container .expire uni-view[data-v-862280f6]:nth-child(2){text-align:right}}@media (min-width:450px){.content-container[data-v-862280f6]{width:100%;background:#f1f6fd;padding-top:16px;padding-bottom:16px}.content-container .network[data-v-862280f6]{width:1400px;margin:0 auto;padding:16px;box-sizing:border-box;background:#fff}.content-container .network .title[data-v-862280f6]{font-size:18px}.content-container .network .title uni-image[data-v-862280f6]{width:20px;height:20px;vertical-align:middle;margin-right:10px}.content-container .network .content[data-v-862280f6]{display:flex;margin-top:16px}.content-container .network .content>uni-view[data-v-862280f6]{flex:1;height:120px;margin-right:16px;text-align:center;background:#f1f6fd;padding-top:29px;box-sizing:border-box}.content-container .network .content>uni-view[data-v-862280f6]:nth-child(4),\n\t.content-container .network .content>uni-view[data-v-862280f6]:nth-child(8){margin-right:0}.content-container .network .content>uni-view uni-view[data-v-862280f6]:nth-child(2){color:#f3921b;font-size:24px;margin-top:10px;font-weight:700}.content-container .transfer_list[data-v-862280f6]{width:1400px;margin:16px auto;padding:16px;box-sizing:border-box;background:#fff}.content-container .transfer_list>uni-view[data-v-862280f6]:nth-child(1){font-size:18px}.content-container .transfer_list>uni-view:nth-child(1) uni-image[data-v-862280f6]{width:20px;height:20px;vertical-align:middle;margin-right:10px}.content-container .transfer_list .name[data-v-862280f6]{display:flex;margin:16px 0}.content-container .transfer_list .name>uni-view[data-v-862280f6]:nth-child(2){flex:1;text-align:right;line-height:44px}.content-container .transfer_list .name .menu[data-v-862280f6]{flex:1;height:44px;line-height:44px;display:flex;text-align:center}.content-container .transfer_list .name .menu uni-view[data-v-862280f6]{width:120px;cursor:pointer}.content-container .transfer_list .name .menu .bct[data-v-862280f6]{color:#f3921b;border-bottom:1px solid #f3921b}}",""]),t.exports=n}}]);