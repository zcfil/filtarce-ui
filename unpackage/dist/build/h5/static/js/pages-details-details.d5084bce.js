(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-details-details"],{"166b":function(t,n,e){"use strict";e.r(n);var a=e("a480"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},"2afa":function(t,n,e){var a=e("77ff");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("04f0d57c",a,!0,{sourceMap:!1,shadowMode:!1})},"77ff":function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,".content-container .expires[data-v-045d825c]{border:1px solid #eee;box-shadow:0 2px 4px 1px #e5e5e5;padding:10px;margin:10px 0;border-radius:4px}.content-container .expire[data-v-045d825c]{display:flex;font-size:12px}.content-container .expire>uni-view[data-v-045d825c]{flex:1}.content-container .expire>uni-view[data-v-045d825c]:nth-child(2){text-align:right}.content-container .aaa[data-v-045d825c]{color:#16c22d}@media (max-width:450px){.content-container[data-v-045d825c]{padding-bottom:16px;font-size:14px;line-height:24px;padding-top:94.67px}.content-container .head[data-v-045d825c]{padding:10px 16px;border-bottom:1px solid #eee}.content-container .content[data-v-045d825c]{padding:10px 16px;font-size:12px;border-bottom:6px solid #f0f6fe;display:flex}.content-container .content .power[data-v-045d825c]{flex:1}.content-container .content .count[data-v-045d825c]{flex:1}.content-container .total[data-v-045d825c]{padding:10px 16px 0;display:flex}.content-container .total uni-view[data-v-045d825c]{flex:1}.content-container .total uni-view[data-v-045d825c]:nth-child(2){text-align:right;font-size:12px}.content-container .entry[data-v-045d825c]{padding:0 16px}.content-container .paging[data-v-045d825c]{padding:0 16px}}@media (min-width:450px){.content-container[data-v-045d825c]{width:100%;background:#f1f6fd;padding-top:16px;padding-bottom:16px}.content-container .head[data-v-045d825c]{width:1400px;margin:0 auto;box-sizing:border-box;background-color:#fff;padding:16px;border-bottom:1px solid #eee}.content-container .content[data-v-045d825c]{width:1400px;margin:0 auto;box-sizing:border-box;font-size:15px;padding:16px;background-color:#fff}.content-container .content .power>uni-view[data-v-045d825c],\n\t.content-container .content .count>uni-view[data-v-045d825c]{display:flex}.content-container .content .power>uni-view uni-text[data-v-045d825c]:nth-child(1),\n\t.content-container .content .count>uni-view uni-text[data-v-045d825c]:nth-child(1){flex:1}.content-container .content .power>uni-view uni-text[data-v-045d825c]:nth-child(2),\n\t.content-container .content .count>uni-view uni-text[data-v-045d825c]:nth-child(2){flex:6}.content-container .total[data-v-045d825c]{width:1400px;margin:0 auto;box-sizing:border-box;padding:16px;display:flex;background-color:#fff;margin-top:16px}.content-container .bg[data-v-045d825c]{width:1400px;margin:0 auto;padding:0 16px;box-sizing:border-box;background-color:#fff}.content-container .total uni-view[data-v-045d825c]{flex:1}.content-container .total uni-view[data-v-045d825c]:nth-child(2){text-align:right}.content-container .entry[data-v-045d825c]{background-color:#fff}.content-container .paging[data-v-045d825c]{width:1400px;margin:0 auto;box-sizing:border-box;padding:10px 16px;background-color:#fff}}",""]),t.exports=n},"94e0":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var a={uniTable:e("8bf8").default,uniTr:e("965b").default,uniTh:e("2e26").default,uniTd:e("3d7f").default,pagePagination:e("a36b").default},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"details"},[e("Top"),e("v-uni-view",{staticClass:"content-container"},[e("v-uni-view",{staticClass:"head"},[t._v(t._s(t.queryParams.miners)+"扇区详情")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"power"},[e("v-uni-view",[e("v-uni-text",[t._v("扇区大小：")]),e("v-uni-text",[t._v(t._s(t.data.sector_size)+"G")])],1),e("v-uni-view",[e("v-uni-text",[t._v("扇区总数：")]),e("v-uni-text",[t._v(t._s(t.data.total_sectors))])],1),e("v-uni-view",[e("v-uni-text",[t._v("有效扇区：")]),e("v-uni-text",{staticClass:"aaa"},[t._v(t._s(t.data.active_sectors))])],1)],1),e("v-uni-view",{staticClass:"count"},[e("v-uni-view",[e("v-uni-text",[t._v("错误扇区：")]),e("v-uni-text",{staticStyle:{color:"red"}},[t._v(t._s(t.data.faulty_sectors))])],1),e("v-uni-view",[e("v-uni-text",[t._v("可续约扇区：")]),e("v-uni-text",[t._v(t._s(t.data.renew))])],1),e("v-uni-view",[e("v-uni-text",[t._v("不可续扇区：")]),e("v-uni-text",[t._v(t._s(t.data.renewed))])],1)],1)],1),e("v-uni-view",{staticClass:"total"},[e("v-uni-view",[t._v("扇区生命周期列表")]),e("v-uni-view",[t._v("共 "+t._s(t.total)+" 条数据")])],1),t.breadth?e("v-uni-view",{staticClass:"entry"},t._l(t.list,(function(n,a){return e("v-uni-view",{key:a,staticClass:"expires"},[e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("到期月份")]),e("v-uni-view",[t._v(t._s(n.exceed))])],1),e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("最早到期时间")]),e("v-uni-view",[t._v(t._s(t.parseTime(n.frist_date)))])],1),e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("到期数量")]),e("v-uni-view",[t._v(t._s(n.sectors_count))])],1),e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("到期算力")]),e("v-uni-view",[t._v(t._s(n.exp_power))])],1),e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("到期释放（FIL）")]),e("v-uni-view",[t._v(t._s(n.fil_count))])],1),e("v-uni-view",{staticClass:"expire"},[e("v-uni-view",[t._v("可否续签")]),e("v-uni-view",[0==n.seal_proof?e("v-uni-view",[t._v("否")]):t._e(),1==n.seal_proof?e("v-uni-view",[t._v("是")]):t._e()],1)],1)],1)})),1):t._e(),t.breadth?t._e():e("v-uni-view",{staticClass:"bg"},[e("uni-table",{ref:"table",attrs:{border:!0,stripe:!0,loading:t.loading,stripe:!0,emptyText:"暂无更多数据"}},[e("uni-tr",[e("uni-th",{attrs:{align:"center"}},[t._v("到期月份")]),e("uni-th",{attrs:{align:"center"}},[t._v("最早到期时间")]),e("uni-th",{attrs:{align:"center"}},[t._v("到期数量")]),e("uni-th",{attrs:{align:"center"}},[t._v("到期算力")]),e("uni-th",{attrs:{align:"center"}},[t._v("到期释放（FIL）")]),e("uni-th",{attrs:{align:"center"}},[t._v("可否续签")])],1),t._l(t.list,(function(n,a){return e("uni-tr",{key:a},[e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.exceed))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(t.parseTime(n.frist_date)))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.sectors_count))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.exp_power))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.fil_count))]),e("uni-td",{attrs:{align:"center"}},[0==n.seal_proof?e("v-uni-view",[t._v("否")]):t._e(),1==n.seal_proof?e("v-uni-view",[t._v("是")]):t._e()],1)],1)}))],2)],1),e("v-uni-view",{staticClass:"paging"},[e("page-pagination",{attrs:{pageSize:t.queryParams.pageSize,currentPage:t.queryParams.pageNum,numAround:!0,btnText:!0,total:t.total},on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.change.apply(void 0,arguments)}}})],1)],1),e("Footer")],1)},o=[]},"9d7d":function(t,n,e){"use strict";e.r(n);var a=e("94e0"),i=e("166b");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("b12e");var r,c=e("f0c5"),d=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"045d825c",null,!1,a["a"],r);n["default"]=d.exports},a480:function(t,n,e){"use strict";var a=e("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("8eed"),o=a(e("20d7")),r=a(e("acf5")),c={data:function(){return{breadth:!1,data:{},list:[],queryParams:{pageNum:1,pageSize:20,miners:""},total:0,loading:!1}},onLoad:function(t){document.body.clientWidth<450&&(this.breadth=!0),this.queryParams.miners=t.miners,this.auto(),this.details()},methods:{auto:function(){var t=this;this.loading=!0,(0,i.sectorslist)(this.queryParams).then((function(n){for(var e=0;e<n.data.list.length;e++)n.data.list[e].exp_power=t.conversion(n.data.list[e].exp_power),n.data.list[e].sectors_count=t.money(n.data.list[e].sectors_count),n.data.list[e].fil_count=t.money(n.data.list[e].fil_count);t.list=n.data.list,t.total=n.data.total,t.loading=!1}))},details:function(){var t=this;(0,i.getminerdata)({miners:this.queryParams.miners}).then((function(n){n.data[0].active_sectors=t.money(n.data[0].active_sectors),n.data[0].faulty_sectors=t.money(n.data[0].faulty_sectors),n.data[0].renew=t.money(n.data[0].renew),n.data[0].renewed=t.money(n.data[0].renewed),n.data[0].total_sectors=t.money(n.data[0].total_sectors),t.data=n.data[0]}))},change:function(t){this.queryParams.pageNum=t,this.auto()},copy:function(t){uni.setClipboardData({data:t,success:function(t){uni.showToast({title:"复制成功"})}})}},components:{Top:o.default,Footer:r.default}};n.default=c},b12e:function(t,n,e){"use strict";var a=e("2afa"),i=e.n(a);i.a}}]);