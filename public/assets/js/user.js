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
