hubble.getXML('http://feed.mtime.com/movienews.rss', function (error, response, data) {
	data.result.forEach(function(item) {
		var url = item.link;
		var key = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

		articles.get('key', key, function (article) {
			if (article) return;

			var title   = item.title;
			var summary = item.description;

			hubble.getHtml(url, function (error, response, $) {
				var content = '<div class="video">' + $('#db_videobox').html() + '</div>';
				content += '<div class="content">' + $('#newsContent').html() + '</div>';

				var article = {
					key: key,
					title: title,
					content: content,
					summary: summary,
					url: url
				};
				articles.append(article);
			});
		})
	})
});
