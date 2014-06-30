(function() {
	if (window.self !== window.top)
		return;

	var link = document.querySelector('link[rel="canonical"]');
	if (link !== null && link.href.indexOf(location.origin + '/') === 0 && link.href !== location.href) {
		var data = {
			originalUrl: location.href
		};
		history.replaceState(data, '', link.href);
	}
})();
