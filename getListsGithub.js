window.sortello = window.sortello || {interval: null};

function handleButtons(err, list) {
    if (err) {
        return
    }
    ;
    if (listSortableGithub(list) && !listHasButtonGithub(list)) {
        addButtonGithub(list);
    }


    if (!listSortableGithub(list) && listHasButtonGithub(list)) {
        removeButton(list);
    }

    if (listSortableGithub(list) && !listHasButtonGithub(list) && !buttonIsCompleteGithub(list)) {
        removeButton(list);
        addButtonGithub(list);
    }
}

function cardAppeared(list, cb) {

    var i = 10;

    if (!listSortableGithub(list)) {
        cb(true, list);
        return;
    }

    var interval = setInterval(function () {
        var oneList = list;
        if (oneList != null) {
            clearInterval(interval);
            cb(false, list);
            return;
        }

        if (i === 0) {
            clearInterval(interval);
            cb(true);
            return;
        }
        i--;
    }, 200);

}

function addButtonGithub(list) {
    var oneList = list;
    var oneListIdToReplace = oneList.id;
    var oneListId = oneListIdToReplace.replace("column-", "")
    var newElement = '<a style="height:19px; display: block; width: 26px; position: absolute; top: 10px; right: 60px;" class="list-header-extras-menu dark-hover sortello-link" title="Sort cards with Sortello" target="_blank" href="https://sortello.ideato.it:4000/app.html?extId=' + oneListId + '&fw=g">' +
        '<span class="icon-sm" style="background: url(' + chrome.runtime.getURL('icon.png') + '); background-size: contain; display: block; height: 19px; width: 19px;">' +
        '</span>' +
        '</a>';
    var extras = list.getElementsByClassName('hide-sm position-relative p-sm-2')[0];
    extras.innerHTML = extras.innerHTML + newElement;
}

function removeButton(list) {
    var toRemove = list.getElementsByClassName('sortello-link');
    toRemove.parentNode.removeChild(toRemove);
}

function listSortableGithub(list) {
    return list.getElementsByClassName('project-card').length >= 2;
}

function listHasButtonGithub(list) {
    return list.getElementsByClassName('sortello-link').length > 0;
}

function buttonIsCompleteGithub(list) {
    var suffix = 'extId=';
    var sortelloLink = list.getElementsByClassName('sortello-link');
    if (sortelloLink.href === undefined) {
        return false
    }
    return sortelloLink.href.indexOf(suffix, this.length - suffix.length) !== -1;
}

function showingGithubBoard2() {
    var url = window.location.href;
    var thisRegex = new RegExp('github.com/');
    return thisRegex.test(url);
}

function setButtons() {
    var lists = document.getElementsByClassName('js-socket-channel js-keyboard-movable');
    for (var i = 0; i < lists.length; i++) {
        var list = lists[i];
        if (!buttonIsCompleteGithub(list)) {
            cardAppeared(list, handleButtons);
        }
    }
}

clearInterval(window.sortello.interval);
if (showingGithubBoard2()) {
    setButtons();
    window.sortello.interval = setInterval(setButtons, 5000);
}

/*
    display: block; height: 19px; width: 19px;*/


/*height: 19px;
    display: block;
    width: 26px;
}*/