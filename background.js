chrome.browserAction.disable();

function handleBrowserAction(tabId) {
    chrome.browserAction.disable();
    chrome.tabs.get(tabId, function (tab) {
        console.log(tabId);
        console.log(tab);
        if (showingTrelloBoard(tab.url) || showingGithubBoard(tab.url)) {
            chrome.browserAction.enable(tab.id);
        }
    });
}

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.browserAction.disable(details.tabId);
    if (showingTrelloBoard(details.url)) {
        console.log("trello");
        chrome.browserAction.enable(details.tabId);
        chrome.tabs.executeScript(null, {file: "getLists.js"});
    }else if (showingGithubBoard(details.url)) {
        console.log("githubs");
        chrome.browserAction.enable(details.tabId);
        chrome.tabs.executeScript(null, {file: "getListsGithub.js"});
    }
});

chrome.tabs.onActiveChanged.addListener(handleBrowserAction);

function showingTrelloBoard (url) {
    var thisRegex = new RegExp('trello.com/');
    return thisRegex.test(url);
}

function showingGithubBoard(url) {
    var thisRegex = new RegExp('github.com/');
    return thisRegex.test(url);
}