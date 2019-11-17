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

// 修改评论状态
$("#commentsBox").on("click", ".status", function() {
	// 获取当前状态
	let status = $(this).attr("data-status");
	// 获取需要修改状态的评论id
	let id = $(this).attr("data-id");
	$.ajax({
		type: "put",
		url: `/comments/${id}`,
		data: {
			state: status === "0" ? "1" : "0"
		},
		success: function() {
			// 修改成功,刷新页面
			location.reload();
		}
	});
});

// 删除评论功能
$("#commentsBox").on("click", ".delete", function() {
	// 获取需要修改的id
	let id = $(this).attr("data-id");
	$.ajax({
		type: "delete",
		url: `/comments/${id}`,
		success: function() {
			// 删除成功,刷新页面
			location.reload();
		}
	});
});
