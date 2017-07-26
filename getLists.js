function setButtons () {
  var lists = document.getElementsByClassName('list');
  var boardId = window.location.pathname.replace('/b/', '');
  boardId = boardId.substring(0, boardId.lastIndexOf("/"));

  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];

    if (listNotEmpty(lists[i]) && !listHasButton(list)) {
      var title = list.getElementsByClassName('list-header-name-assist')[0];

      var oneCard = list.querySelectorAll('a.list-card')[0];
      var oneCardHref = oneCard.href;
      var oneCardUrl = oneCardHref.replace("https://trello.com/c/", "");
      var oneCardId = oneCardUrl.replace(/\/(.*)/g, "")

      var newElement = '<a class="list-header-extras-menu dark-hover sortello-link" title="Sort cards with Sortello" target="_blank" href="http://sortello.ideato.it/?extId=' + oneCardId + '">' +
          '<span class="icon-sm" style="background: url(' + chrome.runtime.getURL('icon.png') + '); background-size: contain;">' +
          '</span>' +
          '</a>';
      var extras = list.getElementsByClassName('list-header-extras')[0];
      extras.innerHTML = newElement + extras.innerHTML;
    }

    if (!listNotEmpty(lists[i]) && listHasButton(list)) {
      var toRemove = list.getElementsByClassName('sortello-link')[0];
      toRemove.parentNode.removeChild(toRemove);
    }
  }
}

function listNotEmpty (list) {
  return list.getElementsByClassName('list-card').length > 2;
}

function listHasButton (list) {
  return list.getElementsByClassName('sortello-link').length > 0;
}

setButtons();
setInterval(setButtons, 2500);