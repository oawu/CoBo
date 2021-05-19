"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _createForOfIteratorHelper(a,b){var c="undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(!c){if(Array.isArray(a)||(c=_unsupportedIterableToArray(a))||b&&a&&"number"==typeof a.length){c&&(a=c);var d=0,e=function(){};return{s:e,n:function n(){return d>=a.length?{done:!0}:{done:!1,value:a[d++]}},e:function e(a){throw a},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,g=!0,h=!1;return{s:function s(){c=c.call(a)},n:function n(){var a=c.next();return g=a.done,a},e:function e(a){h=!0,f=a},f:function f(){try{g||null==c["return"]||c["return"]()}finally{if(h)throw f}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}Params({create:null});var day=function(a){var b=new Date(1e3*a);return[b.getFullYear(),b.getMonth()+1,b.getDate()].join("/")};Load.init({data:{identifier:"spend",map:new Map,groups:null,offset:0,navPanel:null,popupBox:null},mounted:function mounted(){this.reload("on"===Params.create&&this.create(!1))},computed:{},methods:{reload:function reload(){this.groups=null,this.map=new Map,this.offset=0,this.loadData()},loadData:function loadData(){var a=this;API.GET("spend",{offset:this.offset,limit:10}).auth().done(function(b){var c=b.offset,d=b.spends;a.offset=c,null===a.groups&&(a.groups=[]);var e,f=_createForOfIteratorHelper(d.map(function(a){return _objectSpread(_objectSpread({},a),{},{date:day(a.timeAt)})}));try{for(f.s();!(e=f.n()).done;){var g=e.value,h=a.map.get(g.date)||{header:g.date,items:[]};h.items.push(g),a.map.set(g.date,h)}}catch(a){f.e(a)}finally{f.f()}var i,j=[],k=_createForOfIteratorHelper(a.map.values());try{for(k.s();!(i=k.n()).done;){var l=i.value;j.push(l)}}catch(a){k.e(a)}finally{k.f()}a.groups=j.sort(function(c,a){return new Date(a.title).getTime()-new Date(c.title).getTime()}).map(function(a){return a.memo="\uFF08\u4ECA\u65E5\u82B1\u8CBB\uFF1A"+a.items.reduce(function(c,a){return c+a.money},0)+"\u5143\uFF09",a})}).send()},create:function create(){var a=this,b=!(0<arguments.length&&arguments[0]!==void 0)||arguments[0];this.navPanel=NavPanel(NavView("form","\u65B0\u589E\u958B\u92B7").body({id:0,done:function done(){return a.navPanel.dismiss(function(){return Flash.success("\u65B0\u589E\u5B8C\u6210\uFF01").reload()})},focus:!1})).present(function(a){return a.view._body.focus=!0},b)},update:function update(a){var b=this;this.navPanel=NavPanel(NavView("form","\u4FEE\u6539\u958B\u92B7").body({id:a.id,done:function done(){return Flash.success("\u66F4\u65B0\u5B8C\u6210\uFF01").reload()},focus:!1}).left("\u522A\u9664",function(){return Alert("\u78BA\u5B9A\u522A\u9664\uFF1F").button("\u78BA\u5B9A",function(c){return API.DELETE("spend/"+a.id).auth().before(function(){return c.loading("\u522A\u9664\u4E2D\uFF0C\u8ACB\u7A0D\u5019\u2026")}).fail(function(a){return Toastr.failure(a)}).done(function(){return b.navPanel.dismiss(function(){return Flash.success("\u6210\u529F\u522A\u9664\uFF01").reload()})}).after(function(){return c.dismiss()}).send()}).button("\u53D6\u6D88",function(a){return a.dismiss()}).present()},"_t_red")).present(function(a){return a.view._body.focus=!0})}},template:El.render("\n    layout => :page=this\n\n      span.title => :slot='nav'   *text='\u958B\u92B7\u7D00\u9304'\n      button.right => :slot='nav'   @click=create(true)   *text='\u65B0\u589E'\n\n      div.load => *if=groups===null   *text='\u8B80\u53D6\u4E2D\uFF0C\u8ACB\u7A0D\u5019\u2026'\n\n      template => *else\n\n        div.empty => *if=!groups.length   *text='\u76EE\u524D\u6C92\u6709\u4EFB\u4F55\u7684\u8CC7\u6599\u3002'\n\n        template => *else\n          div._tableview.spends => *for=(group, i) in groups   :key=i   :header=group.header + group.memo\n            label._item_subtitle._pointer.__arrow => *for=(item, j) in group.items   :key=j   @click=update(item)\n              div\n                span._title => *text=item.title\n                span._subtitle => *text=date('Y-m-d H:i:s', new Date(item.timeAt * 1000))\n              span._status => *text=numFormat(item.money)\n\n          div._tableview.__group\n            label._item._pointer._center.__link => *text='\u8F09\u5165\u66F4\u591A\u2026'   @click=loadData   *if=offset !== null\n\n      nav-panel => :bind=navPanel\n        template => :slot:form={ body }\n          index-form => :id=body.id   :focus=body.focus   @done=body.done\n  ")});