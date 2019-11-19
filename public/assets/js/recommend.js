// 获取热门推荐
$.ajax({
	type: "get",
	url: "/posts/recommend",
	success: function(response) {
		// console.log(response);
		let recommendTpl = `
        {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
                </a>
            </li>
        {{/each}}
        `;
		let html = template.render(recommendTpl, { data: response });
		$("#recommendBox").html(html);
	}
});
