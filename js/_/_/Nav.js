"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */var NavView=function(a,b){return this instanceof NavView?void(this._header={title:"",right:null,left:null},this._identifier=null,this._body=null,this._loading=null,this._appear=!1,this._pushed=!1,this._headerIsHide=!1,this.identifier(a).title(b).headerIsHide(!1)):new NavView(a,b)};NavView.prototype.headerIsHide=function(a){return"boolean"==typeof a&&(this._headerIsHide=a),this},NavView.prototype.identifier=function(a){return"string"==typeof a&&(this._identifier=a),this},NavView.prototype.title=function(a){return"string"==typeof a&&(this._header.title=a),this},NavView.prototype.right=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){},c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";return"function"==typeof a&&(c=b,b=a,a=""),"string"!=typeof a&&(a=""),"function"!=typeof b&&(b=null),"string"!=typeof c&&(c=""),this._header.right={text:a,action:b,className:c},this},NavView.prototype.left=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){},c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";return"function"==typeof a&&(c=b,b=a,a=""),"string"!=typeof a&&(a=""),"function"!=typeof b&&(b=null),"string"!=typeof c&&(c=""),this._header.left={text:a,action:b,className:c},this},NavView.prototype.loading=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"\u8ACB\u7A0D\u5019\u2026";return this._loading=a,this},NavView.prototype.body=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null;return this._body=a,this},NavView.prototype.push=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:function(){},c=!(2<arguments.length&&arguments[2]!==void 0)||arguments[2];return this._navPanel&&this._navPanel.push(a,b,c)},NavView.prototype.pop=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},b=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return this._navPanel&&this._navPanel.pop(a,b)},NavView.prototype.popRoot=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},b=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return this._navPanel&&this._navPanel.popRoot(a,b)};var NavPanel=function(a){return this instanceof NavPanel?void(this._display=!1,this._present=!1,this._views=[],this.view=a):new NavPanel(a)};Object.defineProperty(NavPanel.prototype,"view",{get:function get(){return this._views.length?this._views[this._views.length-1]:null},set:function set(a){return this.push(a,function(){},!!this._views.length),this}}),NavPanel.prototype.push=function(a){var b=this,c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:function(){},d=!(2<arguments.length&&arguments[2]!==void 0)||arguments[2];0==this._views.length&&null===a._header.right&&a.right("\u95DC\u9589",function(a){return a.dismiss()}),this._views.length&&null===a._header.left&&a.left("\u8FD4\u56DE",function(a){return a.pop()},"back");var e=this.view;return a._navPanel=this,d?setTimeout(function(){return c(b,a,a._appear=!0,e&&(e._pushed=!0))},100,this._views.push(a)):c(this,a,this._views.push(a),a._appear=!0,e&&(e._pushed=!0)),this},NavPanel.prototype.pop=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1],d=this.view,e=1<this._views.length?this._views[this._views.length-2]:null;return c?setTimeout(function(){return b(a,a._views.pop())},300,d._appear=!1,e&&(e._pushed=!1)):b(this,this._views.pop(),d._appear=!1,e&&(e._pushed=!1),this._views.pop()),this},NavPanel.prototype.popRoot=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];1<this._views.length?this.pop(function(){return a.popRoot(b,c)},c):b(this,this.view)},NavPanel.prototype.present=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return c?setTimeout(function(){return b(a,a.view,a._present=!0)},100,this._display=!0):b(this,this.view,this._present=!0,this._display=!0),this},NavPanel.prototype.dismiss=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return c?setTimeout(function(){return b(a,a.view,a._display=!1)},300,this._present=!1):b(this,this.view,this._present=!1,this._display=!1),this},Vue.component("nav-panel",{props:{bind:{type:NavPanel,default:null,required:!0}},computed:{views:function views(){return this.bind instanceof NavPanel?this.bind._views:[]}},template:El.render("\n    div#nav-panel => *if=bind && bind._display   :class={ __present: bind._present }\n      div._window\n        div._view => *for=(view, i) in views   :class={ __appear: view._appear, __pushed: view._pushed }\n          header => *if=!view._headerIsHide\n            template => *if=view._header.left\n              label._left       => *if=view._header.left.action == null   *text=view._header.left.text   :class=view._header.left.className\n              label._left.__click => *else   *text=view._header.left.text   @click=view._header.left.action(bind, view)   :class=view._header.left.className\n            label._left => *else\n\n            span._title => *text=view._header.title\n\n            template => *if=view._header.right\n              label._right       => *if=view._header.right.action == null   *text=view._header.right.text   :class=view._header.right.className\n              label._right.__click => *else   *text=view._header.right.text   @click=view._header.right.action(bind, view)   :class=view._header.right.className\n            label._right => *else\n          \n          div._loading => *if=view._loading   :text=view._loading\n\n          slot => *else   :name=view._identifier   :body=view._body")});var PopupBox=function(a,b){return this instanceof PopupBox?void(this._identifier=null,this._display=!1,this._present=!1,this._body=null,this.identifier(a).body(b)):new PopupBox(a,b)};PopupBox.prototype.identifier=function(a){return"string"==typeof a&&(this._identifier=a),this},PopupBox.prototype.body=function(a){return this._body=a,this},PopupBox.prototype.present=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return c?setTimeout(function(){return b(a,a._present=!0)},100,this._display=!0):b(this,this._present=!0,this._display=!0),this},PopupBox.prototype.dismiss=function(){var a=this,b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:function(){},c=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return c?setTimeout(function(){return b(a,a._display=!1)},300,this._present=!1):b(this,this._present=!1,this._display=!1),this},Vue.component("popup-box",{props:{bind:{type:PopupBox,default:null,required:!0}},template:El.render("\n    div#popup-box => *if=bind && bind._display   :class={ __present: bind._present }\n      div._cover => @click=_=>bind.dismiss()\n      div._box\n        slot => :name=bind._identifier   :body=bind._body")});