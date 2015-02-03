/**
 ** jquery.sway - 
 ** @author Vadim Petrov <imposibrus@gmail.com>
 ** @version v0.0.2
 ** @license vMIT
 **/
/*
 * File: iframeReizer.js
 * Desc: Force iframes to size to content.
 * Requires: iframeResizer.contentWindow.js to be loaded into the target frame.
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 */
!function(){"use strict";function e(e,n,t){"addEventListener"in window?e.addEventListener(n,t,!1):"attachEvent"in window&&e.attachEvent("on"+n,t)}function n(){var e,n=["moz","webkit","o","ms"];for(e=0;e<n.length&&!M;e+=1)M=window[n[e]+"RequestAnimationFrame"];M||o(" RequestAnimationFrame not supported")}function t(){var e="Host page";return window.top!==window.self&&(e=window.parentIFrame?window.parentIFrame.getId():"Nested host page"),e}function i(e){return k+"["+t()+"]"+e}function o(e){z.log&&"object"==typeof window.console&&console.log(i(e))}function r(e){"object"==typeof window.console&&console.warn(i(e))}function a(e){function n(){function e(){d(N),s(),z.resizedCallback(N)}a("Height"),a("Width"),f(e,N,"resetPage")}function t(e){var n=e.id;o(" Removing iFrame: "+n),e.parentNode.removeChild(e),z.closedCallback(n),o(" --")}function i(){var e=R.substr(F).split(":");return{iframe:document.getElementById(e[0]),id:e[0],height:e[1],width:e[2],type:e[3]}}function a(e){var n=Number(z["max"+e]),t=Number(z["min"+e]),i=e.toLowerCase(),r=Number(N[i]);if(t>n)throw new Error("Value for min"+e+" can not be greater than max"+e);o(" Checking "+i+" is in range "+t+"-"+n),t>r&&(r=t,o(" Set "+i+" to min value")),r>n&&(r=n,o(" Set "+i+" to max value")),N[i]=""+r}function u(){var n=e.origin,t=N.iframe.src.split("/").slice(0,3).join("/");if(z.checkOrigin&&(o(" Checking connection is from: "+t),""+n!="null"&&n!==t))throw new Error("Unexpected message received from: "+n+" for "+N.iframe.id+". Message was: "+e.data+". This error can be disabled by adding the checkOrigin: false option.");return!0}function m(){return k===(""+R).substr(0,F)}function g(){var e=N.type in{"true":1,"false":1};return e&&o(" Ignoring init message from meta parent page"),e}function p(e){return R.substr(R.indexOf(":")+v+e)}function w(e){o(" MessageCallback passed: {iframe: "+N.iframe.id+", message: "+e+"}"),z.messageCallback({iframe:N.iframe,message:JSON.parse(e)}),o(" --")}function h(){if(null===N.iframe)throw new Error("iFrame ("+N.id+") does not exist on "+I);return!0}function y(e){var n=e.getBoundingClientRect();return c(),{x:parseInt(n.left,10)+parseInt(C.x,10),y:parseInt(n.top,10)+parseInt(C.y,10)}}function x(e){function n(){C=a,M(),o(" --")}function t(){return{x:Number(N.width)+i.x,y:Number(N.height)+i.y}}var i=e?y(N.iframe):{x:0,y:0},a=t();o(" Reposition requested from iFrame (offset x:"+i.x+" y:"+i.y+")"),window.top!==window.self?window.parentIFrame?e?parentIFrame.scrollToOffset(a.x,a.y):parentIFrame.scrollTo(N.width,N.height):r(" Unable to scroll to requested position, window.parentIFrame not found"):n()}function M(){!1!==z.scrollCallback(C)&&s()}function E(e){function n(e){var n=y(e);o(" Moving to in page link (#"+t+") at x: "+n.x+" y: "+n.y),C={x:n.x,y:n.y},M(),o(" --")}var t=e.split("#")[1]||"",i=decodeURIComponent(t),r=document.getElementById(i)||document.getElementsByName(i)[0];window.top!==window.self?window.parentIFrame?parentIFrame.moveToAnchor(t):o(" In page link #"+t+" not found and window.parentIFrame not found"):r?n(r):o(" In page link #"+t+" not found")}function O(){switch(N.type){case"close":t(N.iframe),z.resizedCallback(N);break;case"message":w(p(6));break;case"scrollTo":x(!1);break;case"scrollToOffset":x(!0);break;case"inPageLink":E(p(9));break;case"reset":l(N);break;case"init":n(),z.initCallback(N.iframe);break;default:n()}}var R=e.data,N={};m()&&(o(" Received: "+R),N=i(),!g()&&h()&&u()&&(O(),b=!1))}function c(){null===C&&(C={x:void 0!==window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop},o(" Get page position: "+C.x+","+C.y))}function s(){null!==C&&(window.scrollTo(C.x,C.y),o(" Set page position: "+C.x+","+C.y),C=null)}function l(e){function n(){d(e),u("reset","reset",e.iframe)}o(" Size reset requested by "+("init"===e.type?"host page":"iFrame")),c(),f(n,e,"init")}function d(e){function n(n){e.iframe.style[n]=e[n]+"px",o(" IFrame ("+e.iframe.id+") "+n+" set to "+e[n]+"px")}z.sizeHeight&&n("height"),z.sizeWidth&&n("width")}function f(e,n,t){t!==n.type&&M?(o(" Requesting animation frame"),M(e)):e()}function u(e,n,t){o("["+e+"] Sending msg to iframe ("+n+")"),t.contentWindow.postMessage(k+n,"*")}function m(){function n(){function e(e){1/0!==z[e]&&0!==z[e]&&(s.style[e]=z[e]+"px",o(" Set "+e+" = "+z[e]+"px"))}e("maxHeight"),e("minHeight"),e("maxWidth"),e("minWidth")}function t(e){return""===e&&(s.id=e="iFrameResizer"+y++,o(" Added missing iframe ID: "+e+" ("+s.src+")")),e}function i(){o(" IFrame scrolling "+(z.scrolling?"enabled":"disabled")+" for "+d),s.style.overflow=!1===z.scrolling?"hidden":"auto",s.scrolling=!1===z.scrolling?"no":"yes"}function r(){("number"==typeof z.bodyMargin||"0"===z.bodyMargin)&&(z.bodyMarginV1=z.bodyMargin,z.bodyMargin=""+z.bodyMargin+"px")}function a(){return d+":"+z.bodyMarginV1+":"+z.sizeWidth+":"+z.log+":"+z.interval+":"+z.enablePublicMethods+":"+z.autoResize+":"+z.bodyMargin+":"+z.heightCalculationMethod+":"+z.bodyBackground+":"+z.bodyPadding+":"+z.tolerance}function c(n){e(s,"load",function(){var e=b;u("iFrame.onload",n,s),!e&&z.heightCalculationMethod in E&&l({iframe:s,height:0,width:0,type:"init"})}),u("init",n,s)}var s=this,d=t(s.id);i(),n(),r(),c(a())}function g(e){if("object"!=typeof e)throw new TypeError("Options is not an object.")}function p(e){e=e||{},g(e);for(var n in O)O.hasOwnProperty(n)&&(z[n]=e.hasOwnProperty(n)?e[n]:O[n])}function w(){function e(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==e.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+e.tagName+">.");m.call(e)}return function(n,t){switch(p(n),typeof t){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(t||"iframe"),e);break;case"object":e(t);break;default:throw new TypeError("Unexpected data type ("+typeof t+").")}}}function h(e){e.fn.iFrameResize=function(e){return p(e),this.filter("iframe").each(m).end()}}var y=0,b=!0,x="message",v=x.length,k="[iFrameSizer]",F=k.length,I="",C=null,M=window.requestAnimationFrame,E={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},z={},O={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,enablePublicMethods:!1,heightCalculationMethod:"offset",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,closedCallback:function(){},initCallback:function(){},messageCallback:function(){},resizedCallback:function(){},scrollCallback:function(){return!0}};n(),e(window,"message",a),window.jQuery&&h(jQuery),"function"==typeof define&&define.amd?define([],w):"object"==typeof exports?module.exports=w():window.iFrameResize=w()}();
!function(t,i){var o=function(t){var i=document.createElement("a");return i.href=t,i},n=document.getElementsByTagName("script"),e=n[n.length-1],s=o(e.src).hostname||"swayco.co",a=o(e.src).protocol||"http:",r=a+"//"+s,c=function(t){var i=[];for(var o in t)t.hasOwnProperty(o)&&i.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return i.join("&")},p=t.SwayIcon=function(o){var n=this;if(this.options=i.extend({distribution_id:"test",application_type:"web",application_id:null,user:{},onEnd:function(){},onQuestions:function(){},onLoaded:function(){},onSuccess:function(){},onTerminated:function(){},onAudienceMismatch:function(){},onError:function(){}},o),o.apiUrl&&(r=o.apiUrl),this.options.distribution_id=i.trim(this.options.distribution_id),this.options.application_id=i.trim(this.options.application_id),this.options.application_type=i.trim(this.options.application_type),!this.options.distribution_id)throw new Error("distribution_id is required");if(!this.options.application_id)throw new Error("application_id is required");return this._$container=this.options.container?i(this.options.container):i("<div/>",{id:"sway_container"}),this._hideContainer=function(){n._$container.hide(),n._$logo.css("right",n.options.right)},this._showContainer=function(){n._$container.show(),n._$logo.css("right",parseInt(n.options.right,10)+parseInt(n._$container.outerWidth(),10)),n._$container.find("iframe").iFrameResize({enablePublicMethods:!0,autoResize:!1,sizeWidth:!0,resizedCallback:function(t){n._$container.css({width:t.width,height:t.height}),n._$logo.css({right:n._$container.outerWidth(!0)+parseInt(n._$container.css("right"),10)})},initCallback:function(t){t.contentWindow.postMessage("set:id:"+i(t).attr("id"),"*")}})},this._makeUrl=function(t){var i=r+"/distribution/"+this.options.distribution_id+"/"+this.options.application_type+(this.options.application_id?"/"+this.options.application_id:""),o=c(this.options.user);return t===!0&&(o?o+="&floating=1":o="floating=1"),o&&(i=i+"?"+o),i},this._createIframe=function(n){var e=this;this.options=i.extend(this.options,{width:"100%",height:"300px",name:"sway_distribution_frame_"+Date.now(),id:"sway_distribution_frame_"+Date.now()},o);var s=this._makeUrl(n.data("floating"));this._$iframe=i("<iframe />",{name:this.options.name,id:this.options.id,src:s,width:this.options.width,height:this.options.height,frameBorder:0,scrolling:"no"});var a=new RegExp("^"+this._$iframe.attr("id")+":"),c=function(t){if(t.origin==r&&a.test(t.data)){var o=t.data.replace(a,"");if("surveyEnd"==o){var s=i("#sway_logo");1==e.data("floating")&&s.css("right",s.data("right")),e.options.onEnd.call(e,t)}else if("distributionReady"==o)n.trigger("sway:loaded"),e.options.onLoaded.call(e);else if(/^surveyQuestionsText:/.test(o)){var c=JSON.parse(o.replace("surveyQuestionsText:",""));n.trigger("sway:questions",c),e.options.onQuestions.call(e,c)}else if(/^success:/.test(o)){var p=o.replace("success:","");n.trigger("sway:success",p),e.options.onSuccess.call(e,p)}else"terminated"==o?(n.trigger("sway:terminated"),e.options.onTerminated.call(e)):"audience"==o?(n.trigger("sway:audienceMismatch"),e.options.onAudienceMismatch.call(e)):("wrong_id"==o||"wrongDistribution"==t.data)&&(n.trigger("sway:error"),e.options.onError.call(e,"wrong distribution or application id"))}},p=t.addEventListener?"addEventListener":"attachEvent",h=t[p],d="attachEvent"==p?"onmessage":"message";return h(d,c,!1),this.close=function(){return this._$iframe.remove(),this},n&&n.jquery&&n.html(this._$iframe),this._$iframe.on("load",function(){console.debug("iframe loaded"),e._$iframe[0].contentWindow.postMessage("set:id:"+e._$iframe.attr("id"),"*")}),this},this.options.container&&(this.options.container.jquery||(this.options.container=i(this.options.container)),this._createIframe(this.options.container)),this};p.prototype.showIcon=function(t){console.log("showIcon called");var o=this;this.options=i.extend(this.options,{left:"auto",right:"20px",top:"90px",bottom:"auto",width:"500px"},t);var n=i("#sway_logo");this._$logo=n.length?n:i("<div/>",{id:"sway_logo"}),this._$logo.css({left:this.options.left,right:this.options.right,top:this.options.top,bottom:this.options.bottom,position:"fixed",background:"#D7D7D7 url("+r+"/public/images/blue_2.png) no-repeat center center",width:"65px",height:"65px",borderRadius:"10px",zIndex:"5600",cursor:"pointer"}).data("right",this.options.right),this._$logo.unbind("click").bind("click",function(){o._$container.find("iframe").length||o.loadSurvey(o.options),o._$container.is(":visible")?o._hideContainer():o._$container.is(":empty")||o._showContainer()}),i("body").append(this._$logo),o._$container.is(":visible")&&o._$logo.css("right",parseInt(o.options.right,10)+parseInt(o._$container.outerWidth(),10))},p.prototype.hideIcon=function(){this._hideContainer(),this._$logo.remove()},p.prototype.loadSurvey=function(t,o){var n=this;this.options=i.extend(this.options,{left:"auto",right:"20px",top:"90px",bottom:"auto",width:"500px"},t);var e=i("#sway_container");return this._$container=e.length?e:i("<div/>",{id:"sway_container"}),this._$container.css({left:this.options.left,right:this.options.right,top:this.options.top,bottom:this.options.bottom,position:"fixed",zIndex:"5600",width:this.options.width,height:"200px",display:"none"}).data("floating",!0),this._createIframe(this._$container),i("body").append(this._$container),this._$container.one("sway:loaded",function(){console.warn("sway:loaded"),"function"==typeof o&&o.call(n)}),this},p.prototype.checkUserCompatibility=function(t,o){return i.ajax({url:r+"/misc/checkUserCompatibility",jsonp:"callback",dataType:"jsonp",data:{distribution_id:this.options.distribution_id,distribution_type:this.options.application_type,app_id:this.options.application_id,user:JSON.stringify(t)}}).done(function(t){"function"==typeof o&&o(t)}).fail(function(){"function"==typeof o&&o("no")})}}(window,jQuery);