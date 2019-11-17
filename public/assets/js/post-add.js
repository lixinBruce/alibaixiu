// 获取文章分类下拉菜单
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// 根据模板引擎拼接html
		let html = template("categoryTpl", { data: response });
		// 渲染页面
		$("#category").html(html);
	}
});

// 文章封面上传功能
$("#feature").on("change", function() {
	// 获取选择的文件
	let file = this.files[0];
	// 创建formdata对象
	let formData = new FormData();
	// 传入文件
	formData.append("cover", file);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 不修改传入数据格式
		processData: false,
		// 不修改传入数据类型
		contentType: false,
		success: function(response) {
			// console.log(response);
			// 在隐藏域中保存图片路径
			$("#thumbnail").val(response[0].cover);
		}
	});
});

// 文章添加功能
$("#addForm").on("submit", function() {
	// 获取表单输入信息
	let formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/posts",
		data: formData,
		success: function() {
			// 添加成功,跳转到文章列表页面
			location.href = "/admin/posts.html";
		},
		error: function(response) {
			console.log(response);
		}
	});
	// 阻止默认行为
	return false;
});

// 获取地址栏参数函数封装
function getUrlParams(name) {
	// location.search 获取 ?id=...&age=....
	let paramsArr = location.search.substr(1).split("&"); // ['id=...','age=....']
	// 循环
	for (let i = 0; i < paramsArr.length; i++) {
		var tmp = paramsArr[i].split("="); // ['id','...']
		// 判断
		if (tmp[0] === name) {
			return tmp[1];
		}
	}
	return -1;
}

// 获取地址栏中id,如果有id就是修改文章操作
let id = getUrlParams("id");
if (id != -1) {
	$.ajax({
		type: "get",
		url: `/posts/${id}`,
		success: function(response) {
			$.ajax({
				type: "get",
				url: "/categories",
				success: function(categories) {
					response.categories = categories;
					// console.log(response);
					var html = template("modifyTpl", response);
					// console.log(html);
					$("#parentBox").html(html);
				}
			});
		}
	});
}

// 修改文章功能
$("#parentBox").on("submit", "#modifyForm", function() {
	// 获取需要修改的文章id
	let id = $(this).attr("data-id");
	// 获取表单内容
	let formData = $(this).serialize();
	$.ajax({
		type: "put",
		url: `/posts/${id}`,
		data: formData,
		success: function() {
			// 修改成功,跳转到文章列表页面
			location.href = "/admin/posts.html";
		}
	});
});
