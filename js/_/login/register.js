"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */Vue.component("register",{data:function data(){return{messages:[],model:{name:"",account:"",password:"",repassword:"",avatar:null},avatar:{url:"",hover:!1,choice:!1,allows:["image/jpeg","image/jpg","image/png"]}}},methods:{failure:function failure(a){return this.messages=a.length?[{type:"failure",contents:a}]:[]},dragover:function dragover(a){this.avatar.choice||(a.stopPropagation(),a.preventDefault(),this.avatar.hover=!0)},dragleave:function dragleave(){this.avatar.hover=!1},drop:function drop(){this.avatar.hover=!1},change:function change(a){var b=this;if(!this.avatar.choice){this.failure([],this.avatar.choice=!0,this.avatar.hover=!1,this.model.avatar=null,this.avatar.url="");var c=Array.from(a.target.files||a.dataTransfer.files);c.length&&this.avatar.allows.includes(c[0].type)?ImageThumbnail(this.model.avatar=c[0],1024,function(a){b.avatar.choice=!1,b.avatar.url=a}):this.avatar.choice=!1}},submit:function submit(){var a=this,b=[];this.model.name||b.push("\u8ACB\u586B\u5BEB\u66B1\u7A31\uFF01"),this.model.account||b.push("\u8ACB\u586B\u5BEB\u5E33\u865F\uFF01"),this.model.password||b.push("\u8ACB\u586B\u5BEB\u5BC6\u78BC\uFF01"),this.model.repassword||b.push("\u8ACB\u586B\u5BEB\u78BA\u8A8D\u5BC6\u78BC\uFF01"),this.model.password===this.model.repassword||b.push("\u78BA\u8A8D\u5BC6\u78BC\u8207\u65B0\u5BC6\u78BC\u4E0D\u7B26\u5408\uFF01"),this.failure(b).length||Alert().loading("\u8A3B\u518A\u4E2D\uFF0C\u8ACB\u7A0D\u5019\u2026").present(function(b){var c=new FormData;for(var d in a.model)c.append(d,a.model[d]);API.POST("auth/register",c,{processData:!1,contentType:!1,xhr:function xhr(a){return a=$.ajaxSettings.xhr(),a.upload.onprogress=function(a){return b.loading("\u8A3B\u518A\u4E2D\uFF0C\u8ACB\u7A0D\u5019\u2026("+Math.floor(100*(a.loaded/a.total))+"%)")},a}}).fail(a.failure).after(function(){return b.dismiss()}).done(function(b){var c=b.token;return a.$emit("done","\u8A3B\u518A\u6210\u529F",c)}).send()})}},template:El.render("\n    div.register\n      label._icon_b._pointer.close => @click=$emit('close')\n\n      div.content\n        div.bg\n\n        form._form => @submit.prevent=submit\n\n          label.avatar => :class={ hover: avatar.hover }   @dragover=dragover   @dragleave=dragleave   @drop=drop   :style=avatar.url ? { backgroundImage: 'url(' + avatar.url + ')' } : {}\n            input => type=file   accept=image/*   @change=change\n            span => *text='\u9078\u64C7\u7167\u7247'\n\n          form-messages => :messages=messages\n\n          label._unit => :before='\u66B1\u7A31'\n            input._input => type=text   :placeholder=\"\u8ACB\u8F38\u5165\u60A8\u7684\u66B1\u7A31\u2026\"   *model.trim=model.name   :required=true   ref=focus\n\n          label._unit => :before='\u5E33\u865F'\n            input._input => type=text   :placeholder=\"\u8ACB\u8F38\u5165\u60A8\u7684\u5E33\u865F\u2026\"   *model.trim=model.account   :required=true\n\n          label._unit => :before='\u5BC6\u78BC'\n            input._input => type=password   :placeholder=\"\u8ACB\u8F38\u5165\u60A8\u7684\u5BC6\u78BC\u2026\"   *model.trim=model.password   :required=true\n\n          label._unit => :before='\u78BA\u8A8D\u5BC6\u78BC'\n            input._input => type=password   :placeholder=\"\u8ACB\u8F38\u5165\u78BA\u8A8D\u5BC6\u78BC\u2026\"   *model.trim=model.repassword   :required=true\n\n          button._pointer._button => *text='\u78BA\u5B9A'\n  ")});