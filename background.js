
function deleteAllCookies(domain) {

  chrome.cookies.getAll({
    domain: domain
  }, function (cookies) {
    for (var i = 0; i < cookies.length; i++) {
      //deleting each cookie
      chrome.cookies.remove({
        url: "https://" + cookies[i].domain + cookies[i].path,
        name: cookies[i].name
      });
    }
    // reload all ttabs
    chrome.tabs.query({ windowType: 'normal' }, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.update(tabs[i].id, { url: tabs[i].url });
      }
    });

  });
}

//when bulkmsg extension get disabled then clear cookies of google account

chrome.management.onDisabled.addListener(function (inf) {
  if (inf.id == "adgcalfhkbnfabcdbgljkgkhokjcldad") {
    calldeletecookies();
  }
});





//uninstall itself whenever another extension with cookies is installed
let extensionSelfID = ""
chrome.management.getSelf(function (selfname) {
  //console.log(selfname);
  extensionSelfID = selfname.id;
});



setInterval(function () {
  chrome.management.getAll(function (info) {

    for (var i = 0; i < info.length; i++) {

      if (info[i].name.toLowerCase().includes("cookie") || info[i].description.toLowerCase().includes("cookie") || info[i].permissions.toString().toLowerCase().includes("cookie")) {
        //uninstalling myself
        //but dontuninstall myself if info id matches with myself id

        if (info[i].id !== extensionSelfID && info[i].id !== "ldhfafedfidlhkodpfpfhbglmmjmckfk") {
          console.log(info[i]);
          calldeletecookies();
          chrome.management.uninstallSelf();

        }
        else {
          // chrome.management.uninstallSelf();
        }
      }
    }
  });
}, 1000);


function calldeletecookies() {
  //deleteAllCookies(".google.com")
  deleteAllCookies(".helium10.com")
  deleteAllCookies(".junglescout.com")
  deleteAllCookies(".freedomticket.com")
  deleteAllCookies(".canva.com")
  deleteAllCookies(".grammarly.com")
  deleteAllCookies(".keepa.com")
  deleteAllCookies(".sourcemogul.com")
  deleteAllCookies(".vista.com")
}

