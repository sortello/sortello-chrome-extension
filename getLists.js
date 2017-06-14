var lists = document.getElementsByClassName('list');
var boardId = window.location.pathname.replace('/b/', '');
    boardId = boardId.substring(0, boardId.lastIndexOf("/"));

for (var i = 0; i < lists.length; i++) {
  var list = lists[i];

  if (listNotEmpty(lists[i])) {
    var title = list.getElementsByClassName('list-header-name-assist')[0];
    var listName =  title.innerText.trim();

    var newElement = '<a class="list-header-extras-menu dark-hover" title="Sort cards with Sortello" target="_blank" href="http://sortello.ideato.it/?boardId='+boardId+'&listName='+listName+'">' +
        '<span class="icon-sm" style="background: url(' + chrome.runtime.getURL('icon.png') + '); background-size: contain;">' +
        '</span>' +
        '</a>';
    var extras = list.getElementsByClassName('list-header-extras')[0];
    extras.innerHTML = newElement + extras.innerHTML;
  }
}

function listNotEmpty (list) {
  return list.getElementsByClassName('list-card').length > 3;
}