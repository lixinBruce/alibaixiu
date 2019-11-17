// 评论列表渲染
$.ajax({
	type: "get",
	url: "/comments",
	success: function(response) {
		// console.log(response);
		// 根据模板引擎拼接html
		var html = template("commentsTpl", response);
		$("#commentsBox").html(html);
	}
});
