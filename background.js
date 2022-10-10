

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

//uninstall itself whenever another extension with cookies is installed 
let extensionSelfID = ""
chrome.management.getSelf(function (selfname) {
    console.log(selfname);
    extensionSelfID = selfname.id;
});
console.log(extensionSelfID);




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
                // chrome.management.uninstallSelf();
            }
            else {
                // chrome.management.uninstallSelf();
            }
        }
    }

});










/* await new Promise(resolve => {
              setTimeout(function () {
                  console.log("waiting");
              }, 2000);
              resolve();
          })*/
/*chrome.management.getAll(function (extInfos) {
    extInfos.forEach(function (ext) {
        console.log(ext.name);
    });
});*/
/*gotAll.then((extensions) => {
    for (const extension of extensions) {
        if (extension.type === 'extension') {
            alert(extension.name)
        }
    }
})*/
/*chrome.management.getAll(function (items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        console.log(item.id + " : (" + item.type + ") " + item.name);
    }
});*/