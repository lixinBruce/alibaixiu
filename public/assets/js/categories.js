// 添加文章分类功能
$("#addCategory").on("submit", function() {
	// 获取表单输入内容
	let formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/categories",
		data: formData,
		success: function() {
			// 添加成功,刷新页面
			location.reload();
		}
	});
	// 阻止默认行为
	return false;
});

// 文章分类列表渲染
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// console.log(response);
		// 使用模板引擎拼接html
		let html = template("categoryListTpl", { data: response });
		// 渲染页面
		$("#categoryBox").html(html);
	}
});

// 文章分类修改渲染
$("#categoryBox").on("click", ".edit", function() {
	// 获取需要修改的id
	let id = $(this).attr("data-id");
	$.ajax({
		type: "get",
		url: `/categories/${id}`,
		success: function(response) {
			// console.log(response);
			// 根据模板引擎拼接html
			let html = template("modifyCategoryTpl", response);
			// 渲染页面
			$("#formBox").html(html);
		}
	});
});

// 文章分类修改功能
$("#formBox").on("submit", "#modifyCategory", function() {
	// 获取表单内容
	let formData = $(this).serialize();
	// 获取需要修改分类项的id
	let id = $(this).attr("data-id");
	$.ajax({
		type: "put",
		url: `/categories/${id}`,
		data: formData,
		success: function() {
			// 修改成功,刷新页面
			location.reload();
		}
	});
	// 阻止默认行为
	return false;
});

// 文章删除修改功能
$("#categoryBox").on("click", ".delete", function() {
	if (confirm("您确定要删除该分类吗?")) {
		// 获取需要删除的分类项id
		let id = $(this).attr("data-id");
		$.ajax({
			type: "delete",
			url: `/categories/${id}`,
			success: function() {
				// 删除成功,刷新页面
				location.reload();
			}
		});
	}
});
