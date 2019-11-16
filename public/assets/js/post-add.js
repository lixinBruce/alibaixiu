// 获取文章分类下拉菜单
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// 根据模板引擎拼接html
		let html = template("categoryTpl", { data: response });
		// 渲染页面
		$("#category").html(html);
	}
});
