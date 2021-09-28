SURVEY=function(){var a="",b=function(a){if(!SAFARI)chrome.tabs.query({active:!0,currentWindow:!0},function(b){a(b[0])});else{var b=safari||{};b=b.application||{},b=b.activeBrowserWindow||{},a(b.activeTab)}},c=function(a){return(SAFARI||!a.incognito&&"complete"===a.status)&&/^http:/.test(a.url)},d=function(a){ext.pages.query({active:!0,lastFocusedWindow:!0},function(b){if(0!==b.length){page=b[0];var c=require("stats").getBlockedPerPage(page);a(c)}})},e=function(f){var g=function(){h(f,function(b){var c=Math.floor;if(a=c(3e3*Math.random()).toString(),b)if(newSurveyData=i(JSON.stringify(b)),newSurveyData.survey_id===f.survey_id)f=newSurveyData;else return void recordGeneralMessage("survey_ids_do_not_match",void 0,{original_sid:f.survey_id,updated_sid:newSurveyData.survey_id});if(!f.notification_options||!f.notification_options.type||!f.notification_options.message||!f.notification_options.icon_url||isNaN(f.notification_options.priority))return void recordGeneralMessage("invalid_survey_data",void 0,{sid:f.survey_id});var d={title:f.notification_options.title,iconUrl:f.notification_options.icon_url,type:f.notification_options.type,priority:f.notification_options.priority,message:f.notification_options.message};f.notification_options.context_message&&(d.contextMessage=f.notification_options.context_message),f.notification_options.require_interaction&&(d.requireInteraction=f.notification_options.require_interaction),f.notification_options.is_clickable&&(d.isClickable=f.notification_options.is_clickable);var e=function(b){chrome.notifications.onClicked.removeListener(e),chrome.notifications.onButtonClicked.removeListener(g),chrome.notifications.onClosed.removeListener(h),b===a&&f.notification_options.clicked_url?recordGeneralMessage("notification_clicked",void 0,{sid:f.survey_id}):recordGeneralMessage("notification_clicked_no_URL_to_open",void 0,{sid:f.survey_id})},g=function(b,c){chrome.notifications.onClicked.removeListener(e),chrome.notifications.onButtonClicked.removeListener(g),chrome.notifications.onClosed.removeListener(h),f.notification_options.buttons&&(b===a&&0===c&&recordGeneralMessage("button_0_clicked",void 0,{sid:f.survey_id}),b===a&&1===c&&recordGeneralMessage("button_1_clicked",void 0,{sid:f.survey_id}))},h=function(a,b){chrome.notifications.onButtonClicked.removeListener(g),chrome.notifications.onClicked.removeListener(e),chrome.notifications.onClosed.removeListener(h),recordGeneralMessage("notification_closed",void 0,{sid:f.survey_id,bu:b})};if(chrome.notifications.onClicked.removeListener(e),chrome.notifications.onClicked.addListener(e),f.notification_options.buttons){var j=[];f.notification_options.buttons[0]&&j.push({title:f.notification_options.buttons[0].title,iconUrl:f.notification_options.buttons[0].icon_url}),f.notification_options.buttons[1]&&j.push({title:f.notification_options.buttons[1].title,iconUrl:f.notification_options.buttons[1].icon_url}),d.buttons=j}chrome.notifications.onButtonClicked.removeListener(g),chrome.notifications.onButtonClicked.addListener(g),chrome.notifications.onClosed.addListener(h),chrome.notifications.create(a,d,function(){return chrome.runtime.lastError?(recordGeneralMessage("error_survey_not_shown",void 0,{sid:f.survey_id}),chrome.notifications.onButtonClicked.removeListener(g),chrome.notifications.onClicked.removeListener(e),void chrome.notifications.onClosed.removeListener(h)):void recordGeneralMessage("survey_shown",void 0,{sid:f.survey_id})})})},j=function(){setTimeout(function(){e(f)},300000)};chrome&&chrome.notifications&&chrome.notifications.getPermissionLevel&&chrome.notifications.getPermissionLevel(function(a){if("granted"===a){if(isNaN(f.block_count_limit))return void log("invalid block_count_limit",f.block_count_limit);f.block_count_limit=+f.block_count_limit,chrome.idle.queryState(60,function(a){"active"===a?d(function(a){a>=f.block_count_limit?b(function(a){a&&c(a)?g(a):j()}):j()}):j()})}})},f=function(a){var b=function(){setTimeout(function(){h(a,function(){})},1e4)},c=function(){chrome.tabs.onCreated.removeListener(c),b()};chrome.idle.queryState(60,function(a){"active"===a?b():(chrome.tabs.onCreated.removeListener(c),chrome.tabs.onCreated.addListener(c))})},g=function(a){var d=function(b){h(a,function(){var c={command:"showoverlay",overlayURL:a.open_this_url,tabURL:b.url},d=function(a){chrome.runtime.lastError?chrome.runtime.lastError.message?recordErrorMessage("overlay_message_error ",void 0,{errorMessage:chrome.runtime.lastError.message}):recordErrorMessage("overlay_message_error ",void 0,{error:JSON.stringify(chrome.runtime.lastError)}):(!a||a.ack!==c.command)&&recordErrorMessage("invalid_response_from_notification_overlay_script",void 0,{response:a})};SAFARI?chrome.extension.sendRequest(c,d):chrome.tabs.sendRequest(b.id,c,d)})},e=function(){setTimeout(function(){g(a)},300000)};b(function(a){a&&c(a)?d(a):e()})},h=function(a){var b={cmd:"survey",u:STATS.userId(),sid:a.survey_id};"E"===STATS.flavor&&Prefs.blocked_total&&(b.b=Prefs.blocked_total)},i=function(a){if(0===a.length||0===a.trim().length)return null;try{var b=JSON.parse(a);if(!b)return}catch(a){return null}return b};return{maybeSurvey:function(a){if(!1!==getSettings().show_survey){var b=i(a);b&&("overlay"===b.type?g(b):"tab"===b.type?f(b):"notification"===b.type&&e(b))}},types:function(a){return chrome&&chrome.notifications&&chrome.notifications.getPermissionLevel?void chrome.notifications.getPermissionLevel(function(b){"granted"===b?a("OTN"):a("OT")}):void a("OT")}}}();