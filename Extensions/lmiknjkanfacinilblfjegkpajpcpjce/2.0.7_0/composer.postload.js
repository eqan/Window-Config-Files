"use strict";let blockelementPopupId=null,currentlyPickingElement=!1,lastMouseOverEvent=null,currentElement=null,highlightedElementsSelector=null,highlightedElementsInterval=null,lastRightClickEvent=null,lastRightClickEventIsMostRecent=!1;function getFiltersForElement(a,b){let c=a.getAttribute("src");ext.backgroundPage.sendMessage({type:"composer.getFilters",tagName:a.localName,id:a.id,src:c&&1e3>=c.length?c:null,style:a.getAttribute("style"),classes:Array.prototype.slice.call(a.classList),urls:getURLsFromElement(a),mediatype:typeMap.get(a.localName),baseURL:document.location.href},a=>{b(a.filters,a.selectors)})}function getBlockableElementOrAncestor(a,b){for(;a&&a!=document.documentElement&&a!=document.body;)if(!(a instanceof HTMLElement)||"area"==a.localName)a=a.parentElement;else if("map"==a.localName){let b=document.querySelectorAll("img[usemap]"),c=null;for(let d of b){let b=d.getAttribute("usemap"),e=b.indexOf("#");if(-1!=e&&b.substr(e+1)==a.name){c=d;break}}a=c}else return void getFiltersForElement(a,c=>{0<c.length?b(a):getBlockableElementOrAncestor(a.parentElement,b)});b(null)}function addElementOverlay(a){let b="absolute",c=window.scrollX,d=window.scrollY;for(let f,g=a;g;g=g.parentElement){if(f=getComputedStyle(g),"none"==f.display)return null;"fixed"==f.position&&(b="fixed",c=d=0)}let e=document.createElement("div");e.prisoner=a,e.className="__adblockplus__overlay",e.setAttribute("style","opacity:0.4; display:inline-block !important; overflow:hidden; box-sizing:border-box;");let f=a.getBoundingClientRect();return e.style.width=f.width+"px",e.style.height=f.height+"px",e.style.left=f.left+c+"px",e.style.top=f.top+d+"px",e.style.position=b,e.style.zIndex=2147483646,document.documentElement.appendChild(e),e}function highlightElement(a,b,c){unhighlightElement(a);"prisoner"in a?(()=>{let d=a.style.getPropertyValue("box-shadow"),e=a.style.getPropertyPriority("box-shadow"),f=a.style.getPropertyValue("background-color"),g=a.style.getPropertyPriority("background-color");a.style.setProperty("box-shadow","inset 0px 0px 5px "+b,"important"),a.style.setProperty("background-color",c,"important"),a._unhighlight=()=>{a.style.removeProperty("box-shadow"),a.style.setProperty("box-shadow",d,e),a.style.removeProperty("background-color"),a.style.setProperty("background-color",f,g)}})():(()=>{let d=addElementOverlay(a);d&&(highlightElement(d,b,c),d.style.pointerEvents="none",a._unhighlight=()=>{d.parentNode.removeChild(d)})})()}function unhighlightElement(a){a&&"_unhighlight"in a&&(a._unhighlight(),delete a._unhighlight)}function highlightElements(a){unhighlightElements();let b=Array.prototype.slice.call(document.querySelectorAll(a));highlightedElementsSelector=a,highlightedElementsInterval=setInterval(()=>{if(0<b.length){let a=b.shift();a!=currentElement&&highlightElement(a,"#fd6738","#f6e1e5")}else clearInterval(highlightedElementsInterval),highlightedElementsInterval=null},0)}function unhighlightElements(){highlightedElementsInterval&&(clearInterval(highlightedElementsInterval),highlightedElementsInterval=null),highlightedElementsSelector&&(Array.prototype.forEach.call(document.querySelectorAll(highlightedElementsSelector),unhighlightElement),highlightedElementsSelector=null)}function stopEventPropagation(a){a.stopPropagation()}function mouseOver(a){lastMouseOverEvent=a,getBlockableElementOrAncestor(a.target,b=>{a==lastMouseOverEvent&&(lastMouseOverEvent=null,currentlyPickingElement&&(currentElement&&unhighlightElement(currentElement),b&&highlightElement(b,"#d6d84b","#f8fa47"),currentElement=b))}),a.stopPropagation()}function mouseOut(a){currentlyPickingElement&&currentElement==a.target&&(unhighlightElement(currentElement),a.stopPropagation())}function keyDown(a){a.ctrlKey||a.altKey||a.shiftKey||(13==a.keyCode?elementPicked(a):27==a.keyCode&&deactivateBlockElement())}function startPickingElement(){currentlyPickingElement=!0,Array.prototype.forEach.call(document.querySelectorAll("object,embed,iframe,frame"),a=>{getFiltersForElement(a,b=>{0<b.length&&addElementOverlay(a)})}),document.addEventListener("mousedown",stopEventPropagation,!0),document.addEventListener("mouseup",stopEventPropagation,!0),document.addEventListener("mouseenter",stopEventPropagation,!0),document.addEventListener("mouseleave",stopEventPropagation,!0),document.addEventListener("mouseover",mouseOver,!0),document.addEventListener("mouseout",mouseOut,!0),document.addEventListener("click",elementPicked,!0),document.addEventListener("contextmenu",elementPicked,!0),document.addEventListener("keydown",keyDown,!0),ext.onExtensionUnloaded.addListener(deactivateBlockElement)}function elementPicked(a){if(currentElement){let b=currentElement.prisoner||currentElement;getFiltersForElement(b,(a,b)=>{currentlyPickingElement&&stopPickingElement(),ext.backgroundPage.sendMessage({type:"composer.openDialog"},b=>{ext.backgroundPage.sendMessage({type:"forward",targetPageId:b,payload:{type:"composer.dialog.init",filters:a}}),window==window.top?blockelementPopupId=b:ext.backgroundPage.sendMessage({type:"forward",payload:{type:"composer.content.dialogOpened",popupId:b}})}),0<b.length&&highlightElements(b.join(",")),highlightElement(currentElement,"#fd1708","#f6a1b5")}),a.preventDefault(),a.stopPropagation()}}function stopPickingElement(){currentlyPickingElement=!1,document.removeEventListener("mousedown",stopEventPropagation,!0),document.removeEventListener("mouseup",stopEventPropagation,!0),document.removeEventListener("mouseenter",stopEventPropagation,!0),document.removeEventListener("mouseleave",stopEventPropagation,!0),document.removeEventListener("mouseover",mouseOver,!0),document.removeEventListener("mouseout",mouseOut,!0),document.removeEventListener("click",elementPicked,!0),document.removeEventListener("contextmenu",elementPicked,!0),document.removeEventListener("keydown",keyDown,!0)}function deactivateBlockElement(){currentlyPickingElement&&stopPickingElement(),null!=blockelementPopupId&&(ext.backgroundPage.sendMessage({type:"forward",targetPageId:blockelementPopupId,payload:{type:"composer.dialog.close"}}),blockelementPopupId=null),lastRightClickEvent=null,currentElement&&(unhighlightElement(currentElement),currentElement=null),unhighlightElements();for(let a=document.getElementsByClassName("__adblockplus__overlay");0<a.length;)a[0].parentNode.removeChild(a[0]);ext.onExtensionUnloaded.removeListener(deactivateBlockElement)}document instanceof HTMLDocument&&(document.addEventListener("contextmenu",a=>{lastRightClickEvent=a,lastRightClickEventIsMostRecent=!0,ext.backgroundPage.sendMessage({type:"forward",payload:{type:"composer.content.clearPreviousRightClickEvent"}})},!0),ext.onMessage.addListener((a,b,c)=>{switch(a.type){case"composer.content.getState":window==window.top&&c({active:currentlyPickingElement||null!=blockelementPopupId});break;case"composer.content.startPickingElement":window==window.top&&startPickingElement();break;case"composer.content.contextMenuClicked":let b=lastRightClickEvent;deactivateBlockElement(),b&&getBlockableElementOrAncestor(b.target,a=>{a&&(currentElement=a,elementPicked(b))});break;case"composer.content.finished":currentElement&&a.remove&&(checkCollapse(currentElement.prisoner||currentElement),elemhide.apply()),deactivateBlockElement();break;case"composer.content.clearPreviousRightClickEvent":lastRightClickEventIsMostRecent||(lastRightClickEvent=null),lastRightClickEventIsMostRecent=!1;break;case"composer.content.dialogOpened":window==window.top&&(blockelementPopupId=a.popupId);break;case"composer.content.dialogClosed":window==window.top&&blockelementPopupId==a.popupId&&ext.backgroundPage.sendMessage({type:"forward",payload:{type:"composer.content.finished"}});}}),window==window.top&&ext.backgroundPage.sendMessage({type:"composer.ready"}));