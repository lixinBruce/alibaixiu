// 获取分类id
let categoryId = getUrlParams("categoryId");

// 根据id获取文章
if (categoryId != -1) {
	$.ajax({
		type: "get",
		url: `/posts/category/${categoryId}`,
		success: function(response) {
			// console.log(response);
			let html = template("listTpl", { data: response });
			$("#listBox").html(html);
		}
	});
}

// 根据id获取分类信息
if (categoryId != -1) {
	$.ajax({
		type: "get",
		url: `/categories/${categoryId}`,
		success: function(response) {
			// console.log(response);
			$("#categoryTitle").html(response.title);
		}
	});
}
