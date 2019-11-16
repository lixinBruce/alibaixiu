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

// 文章封面上传功能
$("#feature").on("change", function() {
	// 获取选择的文件
	var file = this.files[0];
	// 创建formdata对象
	var formData = new FormData();
	// 传入文件
	formData.append("cover", file);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 不修改传入数据格式
		processData: false,
		// 不修改传入数据类型
		contentType: false,
		success: function(response) {
			// console.log(response);
			// 在隐藏域中保存图片路径
			$("#thumbnail").val(response[0].cover);
		}
	});
});
