(function(L) {
    var state = {
        index: 0,
        names: ['original', 'canonical'],
        url: [L.href]
    };
    var unnecessaryParams = arr2hash([
        'action_object_map',
        'action_ref_map',
        'action_type_map',
        'fb_action_ids',
        'fb_action_types',
        'fb_aggregation_id',
        'fb_comment_id',
        'fb_source',
        'fb_xd_fragment',
        'utm_campaign',
        'utm_content',
        'utm_medium',
        'utm_source',
        'utm_term'
    ]);

    function init() {
        var canonical;

        var link = document.querySelector('link[rel="canonical"]');
        if (link && link.href.indexOf(L.origin + '/') === 0) {
            canonical = link.href;
        }
        else if (L.search !== '') {
            canonical = clean_url();
        }

        if (canonical && canonical !== L.href) {
            state.url.push(canonical);

            chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
                sendResponse(change_url());
            });
            chrome.runtime.sendMessage(change_url());
        }
    }

    function change_url() {
        state.index = 1 - state.index;
        history.replaceState(null, null, state.url[state.index]);
        return state.names[state.index];
    }

    function clean_url() {
        var params = [];
        L.search.substr(1).split('&').forEach(function(param) {
            if (!unnecessaryParams[ param.split('=')[0] ]) {
                params.push(param);
            }
        });
        return L.protocol + '//' + L.host + L.pathname + '?' + params.join('&') + L.hash;
    }

    function arr2hash(arr) {
        var hash = {};
        arr.forEach(function(value) {
            hash[value] = true;
        });
        return hash;
    }

    init();
})(location);
