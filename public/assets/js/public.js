// 修改时间格式
function dateFormate(date) {
	// 把date字符串格式转换成日期对象
	date = new Date(date);
	// 拼接字符串
	return (
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
	);
}

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

// 获取随机推荐信息
$.ajax({
	type: "get",
	url: "/posts/random",
	success: function(response) {
		// console.log(response);
		let randomTpl = `
        {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
        {{/each}}
        `;
		let html = template.render(randomTpl, { data: response });
		$("#randomBox").html(html);
	}
});

// 获取评论信息
$.ajax({
	type: "get",
	url: "/comments/lasted",
	success: function(response) {
		// console.log(response);
		let commentTpl = `
        {{each data}}
            <li>
                <a href="javascript:;">
                <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.dateFormate($value.createAt)}} 说:
                    </p>
                <p>{{$value.content}}</p>
                </div>
            </a>
            </li>
        {{/each}}
        `;
		let html = template.render(commentTpl, { data: response });
		$("#commentBox").html(html);
	}
});

// 获取文章分类
$.ajax({
	type: "get",
	url: "/categories",
	success: function(response) {
		// console.log(response);
		let navTpl = `
        {{each data}}
            <li>
                <a href="list.html?categoryId={{$value._id}}">
                    <i class="fa {{$value.className}}"></i>{{$value.title}}
                </a>
            </li>
        {{/each}}
        `;
		let html = template.render(navTpl, { data: response });
		$("#navBox").html(html);
		$("#topNavBox").html(html);
	}
});

// 点击搜索按钮
$(".search form").on("submit", function() {
	// 获取用户输入内容
	let keys = $(this)
		.find(".keys")
		.val();
	// 跳转到搜索页面
	location.href = `/search.html?key=${keys}`;
	// 阻止默认行为
	return false;
});
