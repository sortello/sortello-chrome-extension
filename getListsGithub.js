window.sortello = window.sortello || {interval: null};

function handleButtonsGithub(err, list) {
    if (err) {
        return
    }
    if (!listHasButtonGithub(list)) {
        addButtonGithub(list);
    }else{
        modifyButtonGithub(list,listSortableGithub(list));
    }
}

function cardAppearedGithub(list, cb) {

    let i = 10;

    if (!listSortableGithub(list)) {
        cb(false, list);
        return;
    }

    let interval = setInterval(function () {
        if (list != null) {
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
    let oneListIdToReplace = list.id;
    let oneListId = oneListIdToReplace.replace("column-", "")
    let newElement = '<a style="height:19px; display: block; width: 26px; position: absolute; top: 10px; right: 60px;" class="list-header-extras-menu dark-hover sortello-link" title="Sort cards with Sortello" target="_blank" href="https://sortello.ideato.it:4000/app.html?extId=' + oneListId + '&fw=g">' +
        '<span class="icon-sm" style="background: url(' + chrome.runtime.getURL('icon.png') + '); background-size: contain; display: block; height: 19px; width: 19px;">' +
        '</span>' +
        '</a>';
    let extras = list.getElementsByClassName('hide-sm position-relative p-sm-2')[0];
    extras.innerHTML = extras.innerHTML + newElement;
}

function modifyButtonGithub(list, sortable){
    let oneListIdToReplace = list.id;
    let oneListId = oneListIdToReplace.replace("column-", "")
    let button = list.getElementsByClassName('sortello-link')[0];
    button.href= sortable? "http://sortello.com/app.html?extId=" + oneListId +"&fw=g" : "http://sortello.com/app.html?extId=undefined&fw=g";
}


function listSortableGithub(list) {
    return list.getElementsByClassName('project-card position-relative').length >= 2;
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

function showingGithubBoard() {
    var url = window.location.href;
    var thisRegex = new RegExp('github.com/');
    return thisRegex.test(url);
}

function setButtonsGithub() {
    var lists = document.getElementsByClassName('project-column js-socket-channel');
    for (var i = 0; i < lists.length; i++) {
        var list = lists[i];
        console.log(list);
        if (!buttonIsCompleteGithub(list)) {
            cardAppearedGithub(list, handleButtonsGithub);
        }
    }
}

clearInterval(window.sortello.interval);
if (showingGithubBoard()) {
    setButtonsGithub();
    window.sortello.interval = setInterval(setButtonsGithub, 2000);
}