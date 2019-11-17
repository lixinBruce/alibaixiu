// logo上传
$("#logo").on("change", function() {
	// 使用formdata对象上传二进制文件
	var fomeData = new FormData();
	fomeData.append("logo", this.files[0]);
	$.ajax({
		type: "post",
		url: "/upload",
		data: fomeData,
		// 不解析请求参数
		processData: false,
		// 不设置请求参数类型
		contentType: false,
		success: function(response) {
			// console.log(response);
			// logo预览
			$("#preview").attr("src", response[0].logo);
			// 设置隐藏域值，上传图片路径
			$("#hiddenLogo").val(response[0].logo);
		}
	});
});

// 网站设置添加
$("#settingsForm").on("submit", function() {
	// 获取表单数据
	let formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/settings",
		data: formData,
		success: function() {
			// 添加成功,刷新页面
			location.reload();
		}
	});
	// 阻止默认行为
	return false;
});

// 网站设置渲染
$.ajax({
	type: "get",
	url: "/settings",
	success: function(response) {
		// console.log(response);
		if (response) {
			// 将logo地址防在隐藏域中
			$("#hiddenLogo").val(response.logo);
			// 将logo显示在页面中
			$("#preview").attr("src", response.logo);
			// 网站标题显示
			$('input[name="title"]').val(response.title);
			// 开启评论功能显示
			$('input[name="comment"]').prop("checked", response.comment);
			// 人工审核评论显示
			$('input[name="review"]').prop("checked", response.review);
		}
	}
});
