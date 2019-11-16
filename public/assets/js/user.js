// 添加用户
$("#userForm").on("submit", function() {
	// 获取表单输入信息
	var userData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/users",
		data: userData,
		success: function() {
			// 添加成功,刷新页面
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

// 用户列表修改渲染
$("#userBox").on("click", ".edit", function() {
	// 获取被点击用户的id
	let id = $(this).attr("data-id");
	$.ajax({
		type: "get",
		url: `/users/${id}`,
		success: function(response) {
			// console.log(response);
			// 使用模板引擎拼接html
			var html = template("modifyTpl", response);
			// 渲染页面
			$("#modifyBox").html(html);
		}
	});
});

// 修改用户功能
$("#modifyBox").on("submit", "#modifyForm", function() {
	// 获取表单修改后的信息
	var modifyData = $(this).serialize();
	// 获取需要修改的用户id
	var id = $(this).attr("data-id");
	$.ajax({
		type: "put",
		url: `/users/${id}`,
		data: modifyData,
		success: function() {
			// 添加成功,刷新页面
			location.reload();
		},
		error: function() {
			alert("修改失败");
		}
	});
	// 阻止默认行为
	return false;
});

// 删除用户功能
$("#userBox").on("click", ".delete", function() {
	// 确认是否删除
	if (confirm("您确认要删除吗?")) {
		// 获取被点击用户的id
		var id = $(this).attr("data-id");
		$.ajax({
			type: "delete",
			url: `/users/${id}`,
			success: function() {
				// 删除成功,刷新页面
				location.reload();
			}
		});
	}
});

// 获取批量删除按钮
let deleteMany = $("#deleteMany");

// 全选
$("#selectAll").on("change", function() {
	// 获取全选框的状态
	var status = $(this).prop("checked");
	// 设置复选框状态与全选框一致
	$("#userBox")
		.find("input")
		.prop("checked", status);
	// 显示批量删除按钮
	if (status) {
		deleteMany.show();
	} else {
		deleteMany.hide();
	}
});

// 复选框
$("#userBox").on("change", ".userStatus", function() {
	// 获取所有复选框
	var inputs = $("#userBox").find("input");
	// 判断复选框总数量是否和复选框中选中的数量相同,如果相同就是全选,否则就是没有全选
	if (inputs.length === inputs.filter(":checked").length) {
		// 全选
		$("#selectAll").prop("checked", true);
	} else {
		// 没有全选
		$("#selectAll").prop("checked", false);
	}
	// 显示批量删除按钮
	if (inputs.filter(":checked").length > 0) {
		deleteMany.show();
	} else {
		deleteMany.hide();
	}
});

// 批量删除功能
deleteMany.on("click", function() {
	var ids = [];
	// 获取所有被选中复选框
	var checkedUsers = $("#userBox")
		.find("input")
		.filter(":checked");
	// 循环获取id
	checkedUsers.each(function(index, element) {
		ids.push($(element).attr("data-id"));
	});
	if (confirm("您是否确定要批量删除?")) {
		$.ajax({
			type: "delete",
			url: `/users/${ids.join("-")}`,
			success: function() {
				// 批量删除成功,刷新页面
				location.reload();
			}
		});
	}
});
