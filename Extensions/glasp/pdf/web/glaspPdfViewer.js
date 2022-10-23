function waitForElm(e){return new Promise((o=>{if(document.querySelector(e))return o(document.querySelector(e));const n=new MutationObserver((t=>{document.querySelector(e)&&(o(document.querySelector(e)),n.disconnect())}));n.observe(document.body,{childList:!0,subtree:!0})}))}function loadHighlightData(){let e,o;const n=window.location.protocol;if(e=window.location.hostname+window.location.pathname+window.location.search,o=n+"//"+e,"blillmbchncajnhkjfdnincfndboieik"==window.location.hostname&&"/pdf/web/viewer.html"==window.location.pathname&&window.location.search&&window.location.search.includes("?file=")){const n=new URL(window.location.search.replace("?file=",""));e=n.hostname+n.pathname+n.search,o=n.protocol+"//"+e}if(null!=e&&null!=e){const n="on";chrome.runtime.sendMessage({action:"initial_load",data:[e,o,n]})}}function pdfDropdownMenuToggle(e){Array.from(document.getElementsByClassName("glasp_pdf_dropdown_menu")).forEach((o=>{o.getAttribute("id")==e?o.classList.toggle("glasp_pdf_dropdown_menu_show"):o.classList.remove("glasp_pdf_dropdown_menu_show")}))}function _getPdfFilenameFromUrl(e,o){if("string"!=typeof e)return o;const n=/[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i,t=/^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/.exec(e);let d=n.exec(t[1])||n.exec(t[2])||n.exec(t[3]);if(d&&(d=d[0],d.includes("%")))try{d=n.exec(decodeURIComponent(d))[0]}catch(e){}return d||o}window.onload=()=>{let e=location.search.replace("?file=","");if(document.getElementById("glasp-pdf-title").innerHTML=_getPdfFilenameFromUrl(e,"Glasp PDF Viewer"),chrome.runtime.sendMessage({action:"amplitude_log",evtName:"glasp_pdf_viewer_loaded"}),document.querySelector("#glasp_pdf_download_btn").addEventListener("click",(()=>{pdfDropdownMenuToggle("glasp_pdf_download_dropdown_menu")})),document.querySelector("#glasp_pdf_print_btn").addEventListener("click",(()=>{pdfDropdownMenuToggle("glasp_pdf_print_dropdown_menu")})),document.querySelector("#glasp_pdf_header_glasp_btn").addEventListener("click",(()=>{pdfDropdownMenuToggle("glasp_pdf_glasp_dropdown_menu")})),document.querySelector("#glasp_pdf_open_original").addEventListener("click",(()=>{chrome.runtime.sendMessage({action:"amplitude_log",evtName:"glasp_pdf_viewer_view_original"}),window.location.href=e})),document.querySelector("#glasp_pdf_open_glasp_sidebar").addEventListener("click",(()=>{chrome.runtime.sendMessage({action:"sidebar_toggle_from_pdf"})})),"/pdf/web/viewer.html"==window.location.pathname&&window.location.search&&window.location.search.includes("?file=")){const e=new URL(window.location.search.replace("?file=",""));"file:"!=e.protocol&&"localhost"!=e.hostname||document.querySelector("#glasp_pdf_open_glasp_sidebar").remove()}waitForElm(".textLayer").then((()=>{loadHighlightData()})),document.querySelector("#glasp_pdf_fullscreen_toggle_btn").addEventListener("click",(()=>{document.getElementById("glasp_pdf_fullscreen_toggle_checkbox").checked?document.querySelector("#glasp_pdf_fullscreen_toggle").innerHTML='\n            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path d="M5 9H9V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                <path d="M9 19V15H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                <path d="M19 15H15V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                <path d="M15 5V9H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n            </svg>':document.querySelector("#glasp_pdf_fullscreen_toggle").innerHTML='\n        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M9 5H5V9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n            <path d="M5 15V19H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n            <path d="M15 19H19V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n            <path d="M19 9V5L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n        </svg>'})),$(document).find("body").bind("mousedown",(function(e){$(e.target).closest(".glasp_pdf_dropdown_menu, #glasp_pdf_download_btn, #glasp_pdf_print_btn, #glasp_pdf_header_glasp_btn").length||Array.from(document.getElementsByClassName("glasp_pdf_dropdown_menu")).forEach((e=>{e.classList.remove("glasp_pdf_dropdown_menu_show")}))}))};