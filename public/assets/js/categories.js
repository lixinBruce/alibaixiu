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
