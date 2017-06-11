chrome.tabs.onActivated.addListener(function (info) {
  chrome.tabs.get(info.tabId, function (tab) {
    if (showingTrelloBoard(tab.url)) {
      chrome.browserAction.enable(tab.id);
    }
    else {
      chrome.browserAction.disable(tab.id);
    }
  });
});

function showingTrelloBoard (url) {
  var thisRegex = new RegExp('trello.com/b/');
  return thisRegex.test(url);
}
