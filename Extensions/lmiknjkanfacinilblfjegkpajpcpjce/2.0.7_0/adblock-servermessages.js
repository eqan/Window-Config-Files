var recordErrorMessage=function(a,b,c){recordMessageWithUserID(a,"error",b,c)},recordStatusMessage=function(a,b,c){recordMessageWithUserID(a,"stats",b,c)},recordGeneralMessage=function(a,b,c){recordMessageWithUserID(a,"general",b,c)},recordAdreportMessage=function(a,b,c){recordMessageWithUserID(a,"adreport",b,c)},recordMessageWithUserID=function(a,b,c,d){if(a&&b){var e={u:STATS.userId(),f:STATS.flavor,o:STATS.os,l:determineUserLanguage(),t:b};if("object"==typeof d)for(var f in d)e[f]=d[f];var e={event:a,payload:e};sendMessageToLogServer(e,c)}},recordAnonymousMessage=function(a,b,c,d){if(a&&b){var e={f:STATS.flavor,o:STATS.os,l:determineUserLanguage(),t:b};if("object"==typeof d)for(var f in d)e[f]=d[f];var e={event:a,payload:e};sendMessageToLogServer(e,c)}},sendMessageToLogServer=function(){},postFilterStatsToLogServer=function(a){if(a);};