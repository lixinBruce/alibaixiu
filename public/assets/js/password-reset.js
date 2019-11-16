$("#modifyForm").on("submit", function() {
	// 获取表单中的内容
	let formData = $(this).serialize();
	$.ajax({
		type: "put",
		url: `/users/password`,
		data: formData,
		success: function() {
			// 修改成功,回到登录页面
			location.href = "/admin/login.html";
		}
	});
	// 阻止默认行为
	return false;
});
