// 退出登录功能
$("#logout").on("click", function() {
	var isConfirm = confirm("您真的要退出吗?");
	if (isConfirm) {
		$.ajax({
			type: "post",
			url: "/logout",
			success: function(response) {
				alert(response.message);
				location.href = "login.html";
			},
			error: function() {
				alert("退出失败");
			}
		});
	}
});
