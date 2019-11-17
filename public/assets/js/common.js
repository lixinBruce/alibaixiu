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

// 修改时间格式
function dateFormate(date) {
	// 把date字符串格式转换成日期对象
	date = new Date(date);
	// 拼接字符串
	return (
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
	);
}
