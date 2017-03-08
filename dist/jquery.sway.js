/**
 ** jquery.sway - SDK for adding SWAYco surveys to your site
 ** @author Vadim Petrov <imposibrus@gmail.com>
 ** @version v0.0.5
 ** @license MIT
 **/
/*
 * File: iframeResizer.js
 * Desc: Force iframes to size to content.
 * Requires: iframeResizer.contentWindow.js to be loaded into the target frame.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Reed Dadoune - reed@dadoune.com
 */
!function(){"use strict";function e(e,n,t){"addEventListener"in window?e.addEventListener(n,t,!1):"attachEvent"in window&&e.attachEvent("on"+n,t)}function n(){var e,n=["moz","webkit","o","ms"];for(e=0;e<n.length&&!z;e+=1)z=window[n[e]+"RequestAnimationFrame"];z||o(" RequestAnimationFrame not supported")}function t(){var e="Host page";return window.top!==window.self&&(e=window.parentIFrame?window.parentIFrame.getId():"Nested host page"),e}function i(e){return x+"["+t()+"]"+e}function o(e){b&&"object"==typeof window.console&&console.log(i(e))}function r(e){"object"==typeof window.console&&console.warn(i(e))}function a(e){function n(){function e(){u(N),c(),C[T].resizedCallback(N)}a("Height"),a("Width"),d(e,N,"resetPage")}function t(e){var n=e.id;o(" Removing iFrame: "+n),e.parentNode.removeChild(e),C[n].closedCallback(n),delete C[n],o(" --")}function i(){var e=O.substr(F).split(":");return{iframe:document.getElementById(e[0]),id:e[0],height:e[1],width:e[2],type:e[3]}}function a(e){var n=Number(C[T]["max"+e]),t=Number(C[T]["min"+e]),i=e.toLowerCase(),r=Number(N[i]);if(t>n)throw new Error("Value for min"+e+" can not be greater than max"+e);o(" Checking "+i+" is in range "+t+"-"+n),r<t&&(r=t,o(" Set "+i+" to min value")),r>n&&(r=n,o(" Set "+i+" to max value")),N[i]=""+r}function f(){function n(){function e(){o(" Checking connection is from allowed list of origins: "+i);var e;for(e=0;e<i.length;e++)if(i[e]===t)return!0;return!1}function n(){return o(" Checking connection is from: "+r),t===r}return i.constructor===Array?e():n()}var t=e.origin,i=C[T].checkOrigin,r=N.iframe.src.split("/").slice(0,3).join("/");if(i&&""+t!="null"&&!n())throw new Error("Unexpected message received from: "+t+" for "+N.iframe.id+". Message was: "+e.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function m(){return x===(""+O).substr(0,F)}function g(){var e=N.type in{"true":1,"false":1,undefined:1};return e&&o(" Ignoring init message from meta parent page"),e}function w(e){return O.substr(O.indexOf(":")+k+e)}function p(e){o(" MessageCallback passed: {iframe: "+N.iframe.id+", message: "+e+"}"),C[T].messageCallback({iframe:N.iframe,message:JSON.parse(e)}),o(" --")}function h(){return null!==N.iframe||(r(" IFrame ("+N.id+") not found"),!1)}function y(e){var n=e.getBoundingClientRect();return s(),{x:parseInt(n.left,10)+parseInt(I.x,10),y:parseInt(n.top,10)+parseInt(I.y,10)}}function v(e){function n(){I=a,z(),o(" --")}function t(){return{x:Number(N.width)+i.x,y:Number(N.height)+i.y}}var i=e?y(N.iframe):{x:0,y:0},a=t();o(" Reposition requested from iFrame (offset x:"+i.x+" y:"+i.y+")"),window.top!==window.self?window.parentIFrame?e?window.parentIFrame.scrollToOffset(a.x,a.y):window.parentIFrame.scrollTo(N.width,N.height):r(" Unable to scroll to requested position, window.parentIFrame not found"):n()}function z(){!1!==C[T].scrollCallback(I)&&c()}function M(e){function n(e){var n=y(e);o(" Moving to in page link (#"+t+") at x: "+n.x+" y: "+n.y),I={x:n.x,y:n.y},z(),o(" --")}var t=e.split("#")[1]||"",i=decodeURIComponent(t),r=document.getElementById(i)||document.getElementsByName(i)[0];window.top!==window.self?window.parentIFrame?window.parentIFrame.moveToAnchor(t):o(" In page link #"+t+" not found and window.parentIFrame not found"):r?n(r):o(" In page link #"+t+" not found")}function E(){switch(N.type){case"close":t(N.iframe);break;case"message":p(w(6));break;case"scrollTo":v(!1);break;case"scrollToOffset":v(!0);break;case"inPageLink":M(w(9));break;case"reset":l(N);break;case"init":n(),C[T].initCallback(N.iframe);break;default:n()}}function R(e){var n=!0;return C[e]||(n=!1,r(N.type+" No settings for "+e+". Message was: "+O)),n}var O=e.data,N={},T=null;m()&&(N=i(),T=N.id,!g()&&R(T)&&(b=C[T].log,o(" Received: "+O),h()&&f()&&(C[T].firstRun=!1,E())))}function s(){null===I&&(I={x:void 0!==window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop},o(" Get page position: "+I.x+","+I.y))}function c(){null!==I&&(window.scrollTo(I.x,I.y),o(" Set page position: "+I.x+","+I.y),I=null)}function l(e){function n(){u(e),f("reset","reset",e.iframe,e.id)}o(" Size reset requested by "+("init"===e.type?"host page":"iFrame")),s(),d(n,e,"init")}function u(e){function n(n){e.iframe.style[n]=e[n]+"px",o(" IFrame ("+t+") "+n+" set to "+e[n]+"px")}var t=e.iframe.id;C[t].sizeHeight&&n("height"),C[t].sizeWidth&&n("width")}function d(e,n,t){t!==n.type&&z?(o(" Requesting animation frame"),z(e)):e()}function f(e,n,t,i){t&&t.contentWindow?(o("["+e+"] Sending msg to iframe ("+n+")"),t.contentWindow.postMessage(x+n,"*")):(r("["+e+"] IFrame not found"),C[i]&&delete C[i])}function m(n){function t(){function e(e){1/0!==C[g][e]&&0!==C[g][e]&&(m.style[e]=C[g][e]+"px",o(" Set "+e+" = "+C[g][e]+"px"))}e("maxHeight"),e("minHeight"),e("maxWidth"),e("minWidth")}function i(e){return""===e&&(m.id=e="iFrameResizer"+y++,b=(n||{}).log,o(" Added missing iframe ID: "+e+" ("+m.src+")")),e}function r(){o(" IFrame scrolling "+(C[g].scrolling?"enabled":"disabled")+" for "+g),m.style.overflow=!1===C[g].scrolling?"hidden":"auto",m.scrolling=!1===C[g].scrolling?"no":"yes"}function a(){"number"!=typeof C[g].bodyMargin&&"0"!==C[g].bodyMargin||(C[g].bodyMarginV1=C[g].bodyMargin,C[g].bodyMargin=""+C[g].bodyMargin+"px")}function s(){return g+":"+C[g].bodyMarginV1+":"+C[g].sizeWidth+":"+C[g].log+":"+C[g].interval+":"+C[g].enablePublicMethods+":"+C[g].autoResize+":"+C[g].bodyMargin+":"+C[g].heightCalculationMethod+":"+C[g].bodyBackground+":"+C[g].bodyPadding+":"+C[g].tolerance+":"+C[g].enableInPageLinks+":"+C[g].resizeFrom}function c(n){e(m,"load",function(){var e=C[g].firstRun;f("iFrame.onload",n,m),!e&&C[g].heightCalculationMethod in M&&l({iframe:m,height:0,width:0,type:"init"})}),f("init",n,m)}function u(e){if("object"!=typeof e)throw new TypeError("Options is not an object.")}function d(e){e=e||{},C[g]={firstRun:!0},u(e);for(var n in R)R.hasOwnProperty(n)&&(C[g][n]=e.hasOwnProperty(n)?e[n]:R[n]);b=C[g].log}var m=this,g=i(m.id);d(n),r(),t(),a(),c(s())}function g(e,n){null===E&&(E=setTimeout(function(){E=null,e()},n))}function w(){function e(e){return"parent"===C[e].resizeFrom&&C[e].autoResize&&!C[e].firstRun}g(function(){for(var n in C)e(n)&&f("Window resize","resize",document.getElementById(n),n)},66)}function p(){function t(e,n){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==e.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+e.tagName+">.");m.call(e,n)}return n(),e(window,"message",a),e(window,"resize",w),function(e,n){switch(typeof n){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(n||"iframe"),function(n){t(n,e)});break;case"object":t(n,e);break;default:throw new TypeError("Unexpected data type ("+typeof n+").")}}}function h(e){e.fn.iFrameResize=function(e){return this.filter("iframe").each(function(n,t){m.call(t,e)}).end()}}var y=0,b=!1,v="message",k=v.length,x="[iFrameSizer]",F=x.length,I=null,z=window.requestAnimationFrame,M={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},C={},E=null,R={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,enableInPageLinks:!1,enablePublicMethods:!1,heightCalculationMethod:"offset",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,closedCallback:function(){},initCallback:function(){},messageCallback:function(){},resizedCallback:function(){},scrollCallback:function(){return!0}};window.jQuery&&h(jQuery),"function"==typeof define&&define.amd?define([],p):"object"==typeof module&&"object"==typeof module.exports?module.exports=p():window.iFrameResize=window.iFrameResize||p()}();
!function(i,t){var o="undefined"!=typeof debug?debug("SwayIcon"):function(){},n=function(i){var t=document.createElement("a");return t.href=i,t},e=document.getElementsByTagName("script"),s=e[e.length-1],a=n(s.src).hostname||"swayco.co",r=n(s.src).protocol||"http:",c=r+"//"+a;o("original apiUrl:",c);var h=function(i){var t=[];for(var o in i)i.hasOwnProperty(o)&&t.push(encodeURIComponent(o)+"="+encodeURIComponent(i[o]));return t.join("&")},d=i.SwayIcon=function(n){var e=this;if(o("constructor options:",n),this.options=t.extend({distribution_id:"test",application_type:"web",application_id:null,user:{},onEnd:function(){},onQuestions:function(){},onLoaded:function(){this.showIcon()},onSuccess:function(){this.hideIcon()},onTerminated:function(){this.hideIcon()},onAudienceMismatch:function(){this.hideIcon()},onError:function(){this.hideIcon()},onCintLink:function(){}},n),n.apiUrl&&(c=n.apiUrl),this.options.distribution_id=t.trim(this.options.distribution_id),this.options.application_id=t.trim(this.options.application_id),this.options.application_type=t.trim(this.options.application_type),!this.options.distribution_id)throw new Error("distribution_id is required");if(!this.options.application_id)throw new Error("application_id is required");return this.options.container?this._$container=t(this.options.container):this._$container=t("<div/>",{id:"sway_container"}),this._hideContainer=function(){o("_hideContainer called"),e._$container.hide(),e._$logo&&e._$logo.length&&e._$logo.css("right",e.options.right)},this._showContainer=function(){o("_showContainer called"),e._$container.show(),e._$logo.css("right",parseInt(e.options.right,10)+parseInt(e._$container.outerWidth(),10)),e._$container.find("iframe").iFrameResize({enablePublicMethods:!0,autoResize:!1,sizeWidth:!0,resizedCallback:function(i){o("iFrameResize:resizedCallback: ",i),e._$container.css({width:i.width,height:i.height}),e._$logo.css({right:e._$container.outerWidth(!0)+parseInt(e._$container.css("right"),10)})},initCallback:function(i){o("iFrameResize:initCallback: ",i),i.contentWindow.postMessage("set:id:"+t(i).attr("id"),"*")}})},this._makeUrl=function(i){o("_makeUrl called"),o("_makeUrl:isFloating:",i);var t=c+"/distribution/"+this.options.distribution_id+"/"+this.options.application_type+(this.options.application_id?"/"+this.options.application_id:""),n=h(this.options.user);return i===!0&&(n?n+="&floating=1":n="floating=1"),o("_makeUrl:queryString:",n),n&&(t=t+"?"+n),t},this._createIframe=function(e){o("_createIframe called");var s=this;o("_createIframe:$container: ",e),this.options=t.extend(this.options,{width:"100%",height:"300px",name:"sway_distribution_frame_"+Date.now(),id:"sway_distribution_frame_"+Date.now()},n);var a=this._makeUrl(e.data("floating"));o("_createIframe:url: ",a),this._$iframe=t("<iframe />",{name:this.options.name,id:this.options.id,src:a,width:this.options.width,height:this.options.height,frameBorder:0,scrolling:"no"});var r=new RegExp("^"+this._$iframe.attr("id")+":"),c=function(i){if(o("postMessageController:data: ",i.data),r.test(i.data)){var n=i.data.replace(r,"");if("surveyEnd"==n){var a=t("#sway_logo");1==s.data("floating")&&a.css("right",a.data("right")),s.options.onEnd.call(s,i)}else if("distributionReady"==n)e.trigger("sway:loaded"),s.options.onLoaded.call(s);else if(/^surveyQuestionsText:/.test(n)){var c=JSON.parse(n.replace("surveyQuestionsText:",""));e.trigger("sway:questions",c),s.options.onQuestions.call(s,c)}else if(/^success:/.test(n)){var h=n.replace("success:","");e.trigger("sway:success",h),s.options.onSuccess.call(s,h)}else if("terminated"==n)e.trigger("sway:terminated"),s.options.onTerminated.call(s);else if("audience"==n)e.trigger("sway:audienceMismatch"),s.options.onAudienceMismatch.call(s);else if("wrong_id"==n||"wrongDistribution"==i.data)e.trigger("sway:error"),s.options.onError.call(s,"wrong distribution or application id");else if(/^cintlink:/.test(n)){var d=decodeURIComponent(n.replace("cintlink:",""));s._$container.show(),e.trigger("sway:cintLink",d),s.options.onCintLink.call(s,d)}}},h=i.addEventListener?"addEventListener":"attachEvent",d=i[h],p="attachEvent"==h?"onmessage":"message";return d(p,c,!1),this.close=function(){return this._$iframe.remove(),this},e&&e.jquery&&(e.html(this._$iframe),o("_createIframe: iframe has been inserted to DOM")),this._$iframe.on("load",function(){o("_createIframe: iframe load event"),s._$iframe[0].contentWindow.postMessage("set:id:"+s._$iframe.attr("id"),"*")}),this},this.options.container&&(this.options.container.jquery||(this.options.container=t(this.options.container)),this._createIframe(this.options.container)),this};d.prototype.showIcon=function(i){var n=this;o("showIcon:options",i),this.options=t.extend(this.options,{left:"auto",right:"20px",top:"90px",bottom:"auto"},i||{});var e=t("#sway_logo");this._$logo=e.length?e:t("<div/>",{id:"sway_logo"}),this._$logo.css({left:this.options.left,right:this.options.right,top:this.options.top,bottom:this.options.bottom,position:"fixed",background:"#D7D7D7 url("+c+"/misc/icon/"+this.options.distribution_id+"/"+this.options.application_id+"?distribution=web) no-repeat center center",width:"65px",height:"65px",borderRadius:"10px",zIndex:"5600",cursor:"pointer"}).data("right",this.options.right),this._$logo.unbind("click").bind("click",function(){o("showIcon:logo:click"),n._$container.find("iframe").length||(n.loadSurvey(n.options),o("showIcon:logo:click:loadSurvey")),n._$container.is(":visible")?(n._hideContainer(),o("showIcon:logo:click:_hideContainer")):n._$container.is(":empty")||(n._showContainer(),o("showIcon:logo:click:_showContainer"))}),t("body").append(this._$logo),n._$container.is(":visible")&&n._$logo.css("right",parseInt(n.options.right,10)+parseInt(n._$container.outerWidth(),10))},d.prototype.hideIcon=function(){this._hideContainer(),o("hideIcon _hideContainer called"),this._$logo&&this._$logo.length&&(this._$logo.remove(),o("hideIcon logo removed"))},d.prototype.loadSurvey=function(i,n){var e=this;o("loadSurvey:options",i),"function"==typeof i&&(n=i,i={}),this.options=t.extend(this.options,{left:"auto",right:"20px",top:"90px",bottom:"auto",width:"500px"},i);var s=t("#sway_container");return s.length?(o("loadSurvey: has existing container"),this._$container=s):(o("loadSurvey: no existing container"),this._$container=t("<div/>",{id:"sway_container"})),this._$container.css({left:this.options.left,right:this.options.right,top:this.options.top,bottom:this.options.bottom,position:"fixed",zIndex:"5600",width:this.options.width,height:"200px",display:"none"}).data("floating",!0),this._createIframe(this._$container),t("body").append(this._$container),o("loadSurvey: container inserted in DOM"),this._$container.one("sway:loaded",function(){o("loadSurvey: container sway:loaded event"),"function"==typeof n&&n.call(e)}),this},d.prototype.checkUserCompatibility=function(i,n){return o("checkUserCompatibility:user",i),t.ajax({url:c+"/misc/checkUserCompatibility",jsonp:"callback",dataType:"jsonp",data:{distribution_id:this.options.distribution_id,distribution_type:this.options.application_type,app_id:this.options.application_id,user:JSON.stringify(i)}}).done(function(i){o("checkUserCompatibility:done",i),"function"==typeof n&&n(i)}).fail(function(){o("checkUserCompatibility:fail",arguments),"function"==typeof n&&n("no")})}}(window,jQuery);