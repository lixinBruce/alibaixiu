// 评论列表渲染
$.ajax({
	type: "get",
	url: "/comments",
	success: function(response) {
		// console.log(response);
		// 根据模板引擎拼接html
		var html = template("commentsTpl", response);
		var pageHtml = template("pageTpl", response);
		// 渲染页面
		$("#commentsBox").html(html);
		$("#pageBox").html(pageHtml);
	}
});

// 分页功能
function changePage(page) {
	// 评论列表渲染
	$.ajax({
		type: "get",
		url: "/comments",
		data: { page: page },
		success: function(response) {
			// console.log(response);
			// 根据模板引擎拼接html
			var html = template("commentsTpl", response);
			var pageHtml = template("pageTpl", response);
			// 渲染页面
			$("#commentsBox").html(html);
			$("#pageBox").html(pageHtml);
		}
	});
}
