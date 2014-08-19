var info = {
    canonical: {
        path: 'icon-19-on.png',
        title: 'Change to original URL'
    },
    original: {
        path: 'icon-19-off.png',
        title: 'Change to canonical URL'
    }
};

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'clicked', function(name) {
        change_action(tab, name);
    });
});

// first time only
chrome.runtime.onMessage.addListener(function(name, sender) {
    change_action(sender.tab, name);
});

function change_action(tab, name) {
    chrome.pageAction.setIcon({
        path: info[name].path,
        tabId: tab.id
    });
    chrome.pageAction.setTitle({
        title: info[name].title,
        tabId: tab.id
    });
    chrome.pageAction.show(tab.id);
}
