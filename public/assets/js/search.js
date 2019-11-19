// 获取关键字
let key = getUrlParams("key");

// 根据关键字搜索结果
$.ajax({
	type: "get",
	url: `/posts/search/${key}`,
	success: function(response) {
		let html = template("searchTpl", { data: response });
		$("#listBox").html(html);
	}
});
