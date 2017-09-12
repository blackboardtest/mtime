hubble.getXML('http://feed.mtime.com/movienews.rss', function (error, response, $) {
	$('item').each(function (index, value) {
		var url = $(this).find('link').text();
		var key = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));
		var dom = $(this);

		articles.get('key', key, function (article) {
			if (article) return;

			var title   = dom.find('title').text().trim();
			var summary = dom.find('description').text().trim();

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
