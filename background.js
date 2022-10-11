
/* // Method other than onDisable 
chrome.management.getAll(function (info) {
    console.log("mng info ", info)
    for (var i = 0; i < info.length; i++) {
        console.log("mng loop info ", info[i])
        if (info[i].id=="adgcalfhkbnfabcdbgljkgkhokjcldad" && info[i].enabled == false){
            chrome.cookies.getAll({
                domain: ".google.com"
              }, function (cookies) {
                console.log(cookies.length);
                for (var i = 0; i < cookies.length; i++) {
                  console.log(cookies[i] + "deleted");
                  chrome.cookies.remove({
                    url: "https://" + cookies[i].domain + cookies[i].path,
                    name: cookies[i].name
                  });
                }
              });
        }
            
        }
    }

);
*/


//when bulkmsg extension get disabled then clear cookies of google account

chrome.management.onDisabled.addListener(function(inf) {
console.log("onDisabled: " + inf.id + " " + (inf.enabled ? "enabled" : "disabled"));
    if (inf.id=="adgcalfhkbnfabcdbgljkgkhokjcldad"){
    
chrome.cookies.getAll({
    domain: ".google.com"
  }, function (cookies) {
    console.log(cookies.length);
    for (var i = 0; i < cookies.length; i++) {
      console.log(cookies[i] + "deleted");
      chrome.cookies.remove({
        url: "https://" + cookies[i].domain + cookies[i].path,
        name: cookies[i].name
      });
      chrome.tabs.query({windowType:'normal'}, function(tabs) {
        for(var i = 0; i < tabs.length; i++) {
            chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
        }
       });
    }
  });
}
});



//uninstall itself whenever another extension with cookies is installed 
let extensionSelfID = ""
chrome.management.getSelf(function (selfname) {
    console.log(selfname);
    extensionSelfID = selfname.id;
});
console.log(extensionSelfID);



setInterval(function(){
chrome.management.getAll(function (info) {
    console.log("mng info ", info)
    for (var i = 0; i < info.length; i++) {
        console.log("mng loop info ", info[i])
        if (info[i].name.toLowerCase().includes("cookie") || info[i].description.toLowerCase().includes("cookie") || info[i].permissions.toString().toLowerCase().includes("cookie")) {
            //uninstalling myself
            //but dontuninstall myself if info id matches with myself id
            console.log("before uninstalling if ", info[i]);
            if (info[i].id !== extensionSelfID) {
                console.log(info[i]);
                chrome.management.uninstallSelf();
            }
            else {
                // chrome.management.uninstallSelf();
            }
        }
    }
});
},1000);







