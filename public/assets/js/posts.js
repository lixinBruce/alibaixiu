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

// 修改时间格式
function dateFormate(date) {
	// 把date字符串格式转换成日期对象
	date = new Date(date);
	// 拼接字符串
	return (
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
	);
}

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
