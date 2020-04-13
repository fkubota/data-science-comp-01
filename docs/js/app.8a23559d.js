(function(e){function t(t){for(var a,s,i=t[0],c=t[1],l=t[2],p=0,d=[];p<i.length;p++)s=i[p],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&d.push(n[s][0]),n[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,i=1;i<r.length;i++){var c=r[i];0!==n[c]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var a={},n={app:0},o=[];function s(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=a,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[[r("v-overlay",{attrs:{value:e.show_overlay}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1),r("v-snackbar",{attrs:{top:"",dark:"",color:"red",timeout:2e3},model:{value:e.show_score_alert,callback:function(t){e.show_score_alert=t},expression:"show_score_alert"}},[r("h4",[e._v("select your name")]),r("v-btn",{attrs:{icon:"",dark:"",color:"white"},nativeOn:{click:function(t){e.show_score_alert=!1}}},[r("v-icon",{attrs:{dark:""}},[e._v("mdi-close")])],1)],1),r("v-snackbar",{attrs:{top:"",dark:"",color:"red",timeout:2e3},model:{value:e.show_name_alert,callback:function(t){e.show_name_alert=t},expression:"show_name_alert"}},[r("h4",[e._v("invalid submission style")]),r("v-btn",{attrs:{icon:"",dark:"",color:"white"},nativeOn:{click:function(t){e.show_name_alert=!1}}},[r("v-icon",{attrs:{dark:""}},[e._v("mdi-close")])],1)],1)],r("v-app-bar",{staticClass:"title",attrs:{color:"primary",dark:"",app:""}},[r("v-toolbar-title",[e._v("Data Science Competition #1")]),r("v-spacer"),r("v-btn",{attrs:{"x-large":"",icon:"",dark:""},on:{click:e.getRankingTable}},[r("v-icon",{attrs:{dark:""}},[e._v("mdi-cached")])],1)],1),r("v-footer",{attrs:{color:"primary",dark:"",app:""}}),r("v-card",{staticClass:"mx-auto",attrs:{width:"1000"}},[r("v-content",[r("v-container",[r("v-row",[r("v-select",{staticStyle:{width:"50px"},attrs:{items:e.names,label:"select your name","prepend-icon":"mdi-account-circle"},model:{value:e.selection_name,callback:function(t){e.selection_name=t},expression:"selection_name"}}),r("v-file-input",{staticStyle:{width:"50px"},attrs:{"show-size":"",label:"selec your submission file",accept:".csv"},on:{change:e.fileSelect}}),r("v-btn",{staticClass:"ma-2",attrs:{large:"",color:"primary",outlined:"",target:"#de"},on:{click:e.getScore}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-cloud-upload")]),e._v(" submit ")],1)],1),r("v-row",{staticStyle:{"margin-top":"50px"}},[r("v-spacer"),r("v-card",{attrs:{width:"500",height:"100"}},[r("div",{staticClass:"title grey--text text--darken-2",attrs:{align:"center"}},[e._v(" your submission score is ")]),r("transition",{attrs:{mode:"out-in"}},[this.show_score?r("div",{staticClass:"primary--text",staticStyle:{fontSize:"40px"},attrs:{align:"center"}},[r("p",[e._v(e._s(e.score))])]):e._e()])],1),r("v-spacer")],1),r("div",{staticClass:"title grey--text text--darken-2",staticStyle:{"margin-top":"50px"},attrs:{align:"center"}},[r("p",[e._v("Leaderboard")])]),r("v-data-table",{staticClass:"table-striped table-bordered",attrs:{headers:e.headers,items:e.participants,"items-per-page":100,"table-striped":"true"},scopedSlots:e._u([{key:"item.rank",fn:function(t){var a=t.item;return[r("v-chip",{attrs:{color:e.getColor(a.rank)}},[e._v(e._s(a.rank))])]}}])})],1)],1)],1)],2)},o=[],s=(r("4160"),r("d3b7"),r("ac1f"),r("5319"),r("1276"),r("159b"),r("96cf"),r("1da1")),i=r("bc3a"),c=r.n(i),l={data:function(){return{heroku_addr:"https://data-science-comp-01.herokuapp.com/",show_score_alert:!1,show_name_alert:!1,show_score:!1,show_overlay:!1,test_api:"test_api",score:"...",hello:"",subData:"",rankingTable:"",sortBy:"rank",sortDesc:!1,selection_name:"",names:["A","B","C"],dropdown_font:["Arial","Calibri","Courier","Verdana"],headers:[{text:"#",align:"center",sortable:!1,value:"rank"},{text:"Name",value:"name"},{text:"Score",value:"score"},{text:"N_Submission",value:"n_submission"}],participants:[{rank:"...",name:"...",score:"...",n_submission:"..."}]}},methods:{testApi:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("func-↓testApi"),t.next=3,c.a.post(e.heroku_addr+"test_func",{test:"hello_api"}).then((function(t){e.test_api=t.data.test_return}));case 3:case"end":return t.stop()}}),t)})))()},readFileAsync:function(e){return new Promise((function(t,r){var a=new FileReader;a.onload=function(){t(a.result)},a.onerror=r,a.readAsText(e)}))},fileSelect:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return console.log("func-↓fileSelect"),r.prev=1,r.next=4,t.readFileAsync(e);case 4:a=r.sent,a=a.replace(/\r?\n/g,"\n"),t.subData=a,r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](1),console.log(r.t0);case 12:case"end":return r.stop()}}),r,null,[[1,9]])})))()},getScore:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("func-↓getScore"),""!=e.selection_name){t.next=4;break}return e.show_score_alert=!0,t.abrupt("return");case 4:return e.show_score=!1,e.show_overlay=!0,t.next=8,c.a.post(e.heroku_addr+"get_score",{arg_subData:e.subData,arg_selection_name:e.selection_name}).then((function(t){var r=t.data.score;"bad_submission"==r?e.show_score_alert=!0:(e.score=r,e.getRankingTable()),e.show_score=!0,e.show_overlay=!1}));case 8:case"end":return t.stop()}}),t)})))()},getRankingTable:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("func-↓getRankingTable"),t.next=3,c.a.post(e.heroku_addr+"get_ranking_table",{}).then((function(t){e.rankingTable=t.data.ranking_table}));case 3:e.updateRankingTable();case 4:case"end":return t.stop()}}),t)})))()},getParticipants:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("func-↓getParticipants"),t.next=3,c.a.post(e.heroku_addr+"get_participants",{}).then((function(t){var r=t.data.participants,a=r.split(",");e.names=a}));case 3:case"end":return t.stop()}}),t)})))()},updateRankingTable:function(){var e=this;console.log("func-↓updateRankingTable");var t=[],r=this.rankingTable.split("\n");r.forEach((function(r){var a=r.split(","),n={rank:a[0],name:a[1],score:a[2],n_submission:a[3]};t.push(n),e.participants=t}))},getColor:function(e){return 1==e?"amber accent-2":2==e?"blue-grey lighten-4":3==e?"brown lighten-3":"white"}},created:function(){console.log("func-↓mounted"),console.log(this.participants),this.getParticipants(),this.getRankingTable()}},u=l,p=(r("5c0b"),r("2877")),d=r("6544"),f=r.n(d),v=r("7496"),h=r("40dc"),b=r("8336"),_=r("b0af"),m=r("cc20"),g=r("a523"),w=r("a75b"),k=r("8fea"),y=r("23a7"),x=r("553a"),S=r("132d"),O=r("a797"),R=r("490a"),V=r("0fd9"),C=r("b974"),T=r("2db4"),j=r("2fa4"),P=r("2a7f"),A=Object(p["a"])(u,n,o,!1,null,null,null),D=A.exports;f()(A,{VApp:v["a"],VAppBar:h["a"],VBtn:b["a"],VCard:_["a"],VChip:m["a"],VContainer:g["a"],VContent:w["a"],VDataTable:k["a"],VFileInput:y["a"],VFooter:x["a"],VIcon:S["a"],VOverlay:O["a"],VProgressCircular:R["a"],VRow:V["a"],VSelect:C["a"],VSnackbar:T["a"],VSpacer:j["a"],VToolbarTitle:P["a"]});var F=r("f309");a["a"].use(F["a"]);var B=new F["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:B,render:function(e){return e(D)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var a=r("7694"),n=r.n(a);n.a},7694:function(e,t,r){}});
//# sourceMappingURL=app.8a23559d.js.map