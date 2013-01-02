require("tabs").on("ready", logURL);
var ss = require("simple-storage");

ss.storage.lastVisit = null;
ss.storage.timeLimit = 9000;

function logURL(tab) {
  runScript(tab);
}
 
function runScript(tab) {
    if ((tab.url+"").match("facebook")){
    
        var today=new Date();
        
        if(ss.storage.lastVisit== null){
            ss.storage.lastVisit=new Date();
        }
        
        if(today.getDay == ss.storage.lastVisit.getDay){
            if(today-ss.storage.lastVisit >=ss.storage.timeLimit){
                tab.attach({
                    contentScript: "if (document.body) document.body.innerHTML = '"+tab.url+"';"
                });
            }else{
                tab.attach({
                    contentScript: "if (document.body) document.body.innerHTML = '"+today-ss.storage.lastVisit+"';"
                });
            }
            
        }else{
            ss.storage.lastVisit=new Date();
        }
        
  
}
}