// 添加用户
$("#userForm").on("submit", function() {
	// 获取表单输入信息
	var userData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/users",
		data: userData,
		success: function() {
			// 刷新页面
			location.reload();
		},
		error: function() {
			alert("添加失败");
		}
	});
	// 阻止默认提交行为
	return false;
});

// 上传头像
$("#modifyBox").on("change", "#avatar", function() {
	// 使用formdata对象上传二进制文件
	var fomeData = new FormData();
	fomeData.append("avatar", this.files[0]);
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
			// 头像预览
			$("#preview").attr("src", response[0].avatar);
			// 设置隐藏域值，上传图片路径
			$("#hiddenAvatar").val(response[0].avatar);
		}
	});
});

// 用户列表渲染
$.ajax({
	type: "get",
	url: "/users",
	success: function(response) {
		// console.log(response);
		// 使用模板引擎拼接
		var html = template("userTpl", { data: response });
		// 渲染页面
		$("#userBox").html(html);
	}
});
