// 文章列表渲染
$.ajax({
	type: "get",
	url: "/posts",
	success: function(response) {
		// console.log(response);
		// 根据模板引擎拼接html
		let html = template("postsTpl", response);
		// 渲染页面
		$("#postsBox").html(html);
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
