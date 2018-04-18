window.sortello = window.sortello || {interval: null};

function handleButtons(err, list) {
    if (err) {
        return
    }
    ;

    if (listSortable(list) && !listHasButton(list)) {
        addButton(list);
    }


    if (!listSortable(list) && listHasButton(list)) {
        removeButton(list);
    }

    if (listSortable(list) && !listHasButton(list) && !buttonIsComplete(list)) {
        removeButton(list);
        addButton(list);
    }
}

function cardAppeared(list, hb) {

    var i = 10;

    if (!listSortable(list)) {
        hb(false, list);
        return;
    }

    var interval = setInterval(function () {
        var oneList = list;
        console.log("List: ", oneList)
        if (oneList != null) {
            clearInterval(interval);
            hb(false, list);
            return;
        }

        if (i === 0) {
            clearInterval(interval);
            hb(true);
            return;
        }
        i--;
    }, 200);

}

function addButton(list) {
    var oneList = list;
    var oneListIdToReplace = oneList.id;
    var oneListId = oneListIdToReplace.replace("column-", "")
    console.log("ID:", oneListId)

    var newElement = '<a style="height:19px; display: block; width: 26px; position: absolute; top: 10px; right: 60px;" class="list-header-extras-menu dark-hover sortello-link" title="Sort cards with Sortello" target="_blank" href="http://localhost:4000/app.html?extId=' + oneListId + '&fw=g">' +
        '<span class="icon-sm" style="background: url(' + chrome.runtime.getURL('icon.png') + '); background-size: contain; display: block; height: 19px; width: 19px;">' +
        '</span>' +
        '</a>';
    var extras = list.getElementsByClassName('column-menu-container dropdown float-right position-static js-menu-container hide-sm')[0];
    extras.innerHTML = extras.innerHTML + newElement;
    console.log("extras : ", extras)
}

function removeButton(list) {
    var toRemove = list.getElementsByClassName('sortello-link')[0];
    toRemove.parentNode.removeChild(toRemove);
}

function listSortable(list) {
    return list.getElementsByClassName('project-card').length > 2;
}

function listHasButton(list) {
    return list.getElementsByClassName('sortello-link').length > 0;
}

function buttonIsComplete(list) {
    var suffix = 'extId=';
    var sortelloLink = list.getElementsByClassName('sortello-link');
    if (sortelloLink.href === undefined) {
        return false
    }
    return sortelloLink.href.indexOf(suffix, this.length - suffix.length) !== -1;
}

function showingGithubBoard(url) {
    var url = window.location.href;
    var thisRegex = new RegExp('github.com/');
    return thisRegex.test(url);
}

function setButtons() {
    var lists = document.getElementsByClassName('js-socket-channel js-keyboard-movable');
    for (var i = 0; i < lists.length; i++) {
        var list = lists[i];
        if (!buttonIsComplete(list)) {
            cardAppeared(list, handleButtons);
        }
    }
}

console.log("Sono in github")
clearInterval(window.sortello.interval);
if (showingGithubBoard()) {
    setButtons();
    window.sortello.interval = setInterval(setButtons, 5000);
}

/*
    display: block; height: 19px; width: 19px;*/


/*height: 19px;
    display: block;
    width: 26px;
}*/