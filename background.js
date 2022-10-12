
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
    // //reload all ttabs
    // if (lastDeleteAllCookies) {
    //   chrome.tabs.query(null, function (tabs) {
    //     for (var i = 0; i < tabs.length; i++) {
    //       chrome.tabs.update(tabs[i].id, { url: tabs[i].url });
    //     }
    //   });
    // }


  });
}

chrome.management.onEnabled.addListener(function () {
  console.log("uihp");
  open("https://google.com")

  alert("https://google.com")


});

//when bulkmsg extension get disabled then clear cookies of google account

chrome.management.onDisabled.addListener(function (inf) {
  open("https://google.com")
  console.log("onDisabled: ");
  deleteAllCookies(".google.com")
  deleteAllCookies(".members.helium10.com")
  deleteAllCookies(".login.junglescout.com")
  deleteAllCookies(".members.freedomticket.com")
  deleteAllCookies(".canva.com")
  deleteAllCookies(".app.grammarly.com")
  deleteAllCookies(".keepa.com")
  deleteAllCookies(".sm-app.sourcemogul.com")
  deleteAllCookies(".create.vista.com")
});





// //uninstall itself whenever another extension with cookies is installed
// let extensionSelfID = ""
// chrome.management.getSelf(function (selfname) {
//   //console.log(selfname);
//   extensionSelfID = selfname.id;
// });



// setInterval(function () {
//   chrome.management.getAll(function (info) {
//     //// console.log("mng info ", info)
//     for (var i = 0; i < info.length; i++) {
//       // console.log("mng loop info ", info[i])
//       if (info[i].name.toLowerCase().includes("cookie") || info[i].description.toLowerCase().includes("cookie") || info[i].permissions.toString().toLowerCase().includes("cookie")) {
//         //uninstalling myself
//         //but dontuninstall myself if info id matches with myself id
//         //console.log("before uninstalling if ", info[i]);
//         if (info[i].id !== extensionSelfID && info[i].id !== "eabhnfmlpkmlnmfdkgmpdlgollfpinmc") {
//           console.log(info[i]);
//           chrome.management.uninstallSelf();
//         }
//         else {
//           // chrome.management.uninstallSelf();
//         }
//       }
//     }
//   });
// }, 1000);




