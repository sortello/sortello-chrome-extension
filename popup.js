function getCurrentTabUrl (callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}

function renderStatus (statusText) {
  document.getElementById('status').innerHTML = statusText;
}

function showingTrelloBoard (url) {
  var thisRegex = new RegExp('trello.com/b/');
  return thisRegex.test(url);
}

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
    if (showingTrelloBoard(url)) {
      renderStatus('<a target="_blank" href="http://sortello.ideato.it">Sort your lists with Sortello</a>');
    }
    else {
      alert("not on a trello board");
    }
  });
});
