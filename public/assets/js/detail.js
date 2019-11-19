// 获取文章id
let id = getUrlParams("id");
// 是否人工审核
let review;

// 根据id获取文章详情
$.ajax({
	type: "get",
	url: `/posts/${id}`,
	success: function(response) {
		// console.log(response);
		let html = template("postTpl", response);
		$("#article").html(html);
	}
});

// 点赞功能
$("#article").on("click", "#like", function() {
	$.ajax({
		type: "post",
		url: `/posts/fabulous/${id}`,
		success: function() {
			// 点赞成功
			alert("点赞成功,感谢您的支持!");
		}
	});
});

// 获取网站配置信息
$.ajax({
	type: "get",
	url: "/settings",
	success: function(response) {
		// console.log(response);
		review = response.review;
		if (response.comment) {
			let html = template("commentTpl");
			$("#comment").html(html);
		}
	}
});

// 评论提交
$("#comment").on("submit", "form", function() {
	// 获取用户输入的评论内容
	var content = $(this)
		.find("textarea")
		.val();
	// 代表评论的状态
	var state;

	if (review) {
		// 要经过人工审核
		state = 0;
	} else {
		// 不需要经过人工审核
		state = 1;
	}
	// 向服务器端发送请求 执行添加评论操作
	$.ajax({
		type: "get",
		url: "/comments",
		data: {
			content: content,
			post: id,
			state: state
		},
		success: function() {
			alert("评论成功");
			location.reload();
		},
		error: function() {
			alert("评论失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
