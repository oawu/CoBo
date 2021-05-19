"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */Vue.component("password",{props:{},data:function data(){return{messages:[],model:{old:"",new:"",rep:""}}},mounted:function mounted(){},methods:{failure:function failure(a){return this.messages=a.length?[{type:"failure",contents:a}]:[]},submit:function submit(){var a=this,b=[];this.model.old||b.push("\u8ACB\u8F38\u5165\u539F\u672C\u820A\u7684\u5BC6\u78BC\uFF01"),this.model["new"]||b.push("\u8ACB\u8F38\u5165\u65B0\u7684\u5BC6\u78BC\uFF01"),this.model.rep||b.push("\u8ACB\u518D\u6B21\u8F38\u5165\u65B0\u7684\u5BC6\u78BC\uFF01"),this.model["new"]===this.model.rep||b.push("\u78BA\u8A8D\u5BC6\u78BC\u8207\u65B0\u5BC6\u78BC\u4E0D\u7B26\u5408\uFF01"),this.failure(b).length||API.PUT("auth/password",this.model).auth().fail(this.failure).done(function(b){var c=b.token;return a.$emit("done",Auth.logout().login(c,!0))}).send()}},template:El.render("\n    form._form => @submit.prevent=submit\n      form-messages => :messages=messages\n\n      label._unit => :before='\u539F\u672C\u820A\u7684\u5BC6\u78BC'\n        input._input => type=password   :placeholder=\"\u8ACB\u8F38\u5165\u60A8\u539F\u672C\u820A\u7684\u5BC6\u78BC\u2026\"   *model.trim=model.old   :required=true\n      \n      label._unit => :before='\u8981\u6539\u7684\u65B0\u5BC6\u78BC'\n        input._input => type=password   :placeholder=\"\u8ACB\u8F38\u5165\u60A8\u7684\u65B0\u5BC6\u78BC\u2026\"   *model.trim=model.new   :required=true\n      \n      label._unit => :before='\u518D\u6B21\u78BA\u8A8D\u65B0\u5BC6\u78BC'\n        input._input => type=password   :placeholder=\"\u8ACB\u518D\u6B21\u8F38\u5165\u65B0\u7684\u5BC6\u78BC\u2026\"   *model.trim=model.rep   :required=true\n\n      button._pointer._button => *text='\u78BA\u5B9A'\n  ")});