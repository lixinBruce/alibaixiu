// 文章列表渲染
$.ajax({
	type: "get",
	url: "/posts",
	success: function(response) {
		// console.log(response);
		// 根据模板引擎拼接html
		let html = template("postsTpl", response);
		let pageHtml = template("pageTpl", response);
		// 渲染页面
		$("#postsBox").html(html);
		$("#pageBox").html(pageHtml);
	}
});

// 分页功能
function changePage(page) {
	// 文章列表渲染
	$.ajax({
		type: "get",
		url: "/posts",
		data: { page: page },
		success: function(response) {
			// console.log(response);
			// 根据模板引擎拼接html
			let html = template("postsTpl", response);
			let pageHtml = template("pageTpl", response);
			// 渲染页面
			$("#postsBox").html(html);
			$("#pageBox").html(pageHtml);
		}
	});
}

// 文章分类渲染
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// 根据模板引擎拼接html
		var html = template("categoryTpl", { data: response });
		// 渲染页面
		$("#categoryBox").html(html);
	}
});

// 筛选文章列表功能
$("#filterForm").on("submit", function() {
	// 获取表单选择的数据
	let formData = $(this).serialize();
	// 文章列表渲染
	$.ajax({
		type: "get",
		url: "/posts",
		data: formData,
		success: function(response) {
			// console.log(response);
			// 根据模板引擎拼接html
			let html = template("postsTpl", response);
			let pageHtml = template("pageTpl", response);
			// 渲染页面
			$("#postsBox").html(html);
			$("#pageBox").html(pageHtml);
		}
	});
	// 阻止默认行为
	return false;
});

// 删除文章功能
$("#postsBox").on("click", ".delete", function() {
	if (confirm("您是否确定要删除该文章?")) {
		// 获取需要删除文章的id
		let id = $(this).attr("data-id");
		$.ajax({
			type: "delete",
			url: `/posts/${id}`,
			success: function() {
				// 删除成功,刷新页面
				location.reload();
			}
		});
	}
});

// 评论功能
var id, userId;
$("#postsBox").on("click", ".postCom", function() {
	// 获取文章id
	id = $(this).data("id");
	// console.log(id);
	// 获取登录者id
	userId = JSON.parse(localStorage.getItem("user"))._id;
	// console.log(userId);
	$("#exampleModal").modal("show");
});

// 点击发布评论
$(".addCom").on("click", function() {
	// 获取评论内容
	var content = $("#message-text").val();
	// console.log(content);
	$.ajax({
		type: "post",
		url: "/comments",
		data: {
			author: userId,
			content: content,
			post: id
		},
		success: function(res) {
			// console.log(res);
			// 隐藏模态框
			$("#exampleModal").modal("hide");
		}
	});
});
