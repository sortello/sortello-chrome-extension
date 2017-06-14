chrome.browserAction.disable();
function handleBrowserAction (tabId) {
  chrome.browserAction.disable();
  chrome.tabs.get(tabId, function (tab) {
    if (showingTrelloBoard(tab.url)) {
      chrome.browserAction.enable(tab.id);
    }
  });
}
chrome.tabs.onActiveChanged.addListener(handleBrowserAction);
chrome.tabs.onUpdated.addListener(handleBrowserAction);

function showingTrelloBoard (url) {

  var thisRegex = new RegExp('trello.com/b/');
  return thisRegex.test(url);
}
