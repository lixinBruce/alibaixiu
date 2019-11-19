// 获取文章id
let id = getUrlParams("id");

// 根据id获取文章详情
$.ajax({
	type: "get",
	url: `/posts/${id}`,
	success: function(response) {
		// console.log(response);
		let html = template("postTpl", response);
		$("#article").html(html);
	}
});

// 点赞功能
$("#article").on("click", "#like", function() {
	$.ajax({
		type: "post",
		url: `/posts/fabulous/${id}`,
		success: function() {
			// 点赞成功
			alert("点赞成功,感谢您的支持!");
		}
	});
});
