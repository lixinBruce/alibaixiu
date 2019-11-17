// 上传轮播图图片
$("#file").on("change", function() {
	// 使用formdata对象上传二进制文件
	let formData = new FormData();
	formData.append("image", this.files[0]);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 不解析请求参数
		processData: false,
		// 不设置请求参数类型
		contentType: false,
		success: function(response) {
			// console.log(response);
			// 设置隐藏域值，上传图片路径
			$("#image").val(response[0].image);
		}
	});
});

// 添加轮播图功能
$("#slideForm").on("submit", function() {
	// 获取表单内容
	let formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/slides",
		data: formData,
		success: function() {
			// 添加成功,刷新页面
			location.reload();
		}
	});
});

// 轮播图列表渲染
$.ajax({
	type: "get",
	url: "/slides",
	success: function(response) {
		// console.log(response);
		let html = template("slideTpl", { data: response });
		$("#slideBox").html(html);
	}
});

// 轮播图列表删除功能
$("#slideBox").on("click", ".delete", function() {
	if (confirm("您确定要删除该轮播图吗?")) {
		// 获取需要删除轮播图的id
		let id = $(this).attr("data-id");
		$.ajax({
			type: "delete",
			url: `/slides/${id}`,
			success: function() {
				// 删除成功,刷新页面
				location.reload();
			}
		});
	}
});
