// 获取轮播图数据
$.ajax({
	type: "get",
	url: "/slides",
	success: function(response) {
		// console.log(response);
		let html = template("slideTpl", {
			data: response
		});
		$("#slidesBox").html(html);

		//
		var swiper = Swipe(document.querySelector(".swipe"), {
			auto: 3000,
			transitionEnd: function(index) {
				// index++;

				$(".cursor span")
					.eq(index)
					.addClass("active")
					.siblings(".active")
					.removeClass("active");
			}
		});

		// 上/下一张
		$(".swipe .arrow").on("click", function() {
			var _this = $(this);

			if (_this.is(".prev")) {
				swiper.prev();
			} else if (_this.is(".next")) {
				swiper.next();
			}
		});
	}
});

// 获取最新文章
$.ajax({
	type: "get",
	url: "/posts/lasted",
	success: function(response) {
		// console.log(response);
		let html = template("lastedTpl", { data: response });
		$("#lastedBox").html(html);
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
