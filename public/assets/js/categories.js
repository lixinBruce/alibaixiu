// 添加文章分类功能
$("#addCategory").on("submit", function() {
	// 获取表单输入内容
	let formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/categories",
		data: formData,
		success: function() {
			// 添加成功,刷新页面
			location.reload();
		}
	});
	// 阻止默认行为
	return false;
});

// 文章分类列表渲染
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// console.log(response);
		// 使用模板引擎拼接html
		let html = template("categoryListTpl", { data: response });
		// 渲染页面
		$("#categoryBox").html(html);
	}
});
