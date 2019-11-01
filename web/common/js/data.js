$(function() {
	var getDate = new Date();
	var nowDate = new Date();
	var today = nowDate.getDate();
	var getYear1 = nowDate.getFullYear();
	var getMonth1 = nowDate.getMonth() + 1;
	var getDay1 = new Date(getYear1 + "/" + getMonth1 + "/1").getDay();
	var getDaysOfMonth1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][getMonth1 - 1];
	if(getMonth1 == 2) {
		getDaysOfMonth1 = getDaysOfFeb(getYear1);
	};
	for(var j = 0; j < 37; j++) {
		$(".days:eq(0) .data_item").eq(j).text(" ");
		$(".days:eq(0) .data_item").eq(j).addClass("ash");
		$(".days:eq(0) .data_item").eq(j).removeClass("chenBJ");
		$(".days:eq(1) .data_item").eq(j).text(" ");
		$(".days:eq(1) .data_item").eq(j).addClass("ash");
		$(".days:eq(1) .data_item").eq(j).removeClass("chenBJ");
	};
	$(".month").eq(0).text(getYear1 + "年" + getMonth1 + "月");
	for(var i = getDay1; i < getDay1 + getDaysOfMonth1; i++) {
		$(".days:eq(0) .data_item").eq(i).text("" + (i - getDay1 + 1) + "");
		if((i - getDay1 - today) >= -1 && (i - getDay1 - today) <= 9) {
			$(".days:eq(0) .data_item").eq(i).removeClass("ash");
			$(".days:eq(0) .data_item").eq(i).on("click", function() {
				$(".data_item").removeClass("data_active");
				var day = parseInt(this.innerText);
				$(this).addClass("data_active");
				if(!day) {
					day = parseInt($(this).attr("day"));
				};
				var selectDate = getYear1 + (getMonth1 > 9 ? "-" : "-0") + getMonth1 + (day > 9 ? "-" : "-0") + day;
				$(".timetxt").text(selectDate);
				dbgoback();

			});
		};
		if((i - getDay1 + 1) == today) {
			$(".days:eq(0) .data_item").eq(i).text("今天");
			$(".days:eq(0) .data_item").eq(i).attr("day", "" + (i - getDay1 + 1) + "");
		};
		if(((i - getDay1 + 1) == getDate.getDate()) && (getMonth1 == getDate.getMonth() + 1)) {
			$(".days:eq(0) .data_item").eq(i).addClass("chenBJ");
		};
	};
	var dis = getDaysOfMonth1 - today;
	if(dis < 10) {
		var getYear2 = getYear1;
		var getMonth2 = getMonth1 + 1;
		if(getMonth2 > 12) {
			getMonth2 = 1;
			getYear2++;
		};

		var getDay2 = new Date(getYear2 + "/" + getMonth2 + "/1").getDay();
		var getDaysOfMonth2 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][getMonth2 - 1];
		if(getMonth2 == 2) {
			getDaysOfMonth2 = getDaysOfFeb(getYear2);
		};
		$(".month").eq(1).text(getYear2 + "年" + getMonth2 + "月");
		for(var k = getDay2; k < getDay2 + getDaysOfMonth2; k++) {
			$(".days:eq(1) .data_item").eq(k).text("" + (k - getDay2 + 1) + "");
			if((k - getDay2 + dis) < 15) {
				$(".days:eq(1) span").eq(k).removeClass("ash");
				$(".days:eq(1) .data_item").eq(k).on("click", function() {
					$(".data_item").removeClass("data_active");
					var selectDate = getYear2 + (getMonth2 > 9 ? "-" : "-0") + getMonth2 + (parseInt(this.innerText) > 9 ? "-" : "-0") + parseInt(this.innerText);
					$(this).addClass("data_active");
					$(".timetxt").text(selectDate);
					dbgoback();
				});
			};
			if(((k - getDay2 + 1) == getDate.getDate()) && (getMonth2 == getDate.getMonth() + 1)) {
				$(".days:eq(1) .data_item").eq(k).addClass("chenBJ");
			};
		};
		$(".month").eq(1).removeClass("dhide");
		$(".days").eq(1).removeClass("dhide");
	} else {
		$(".month").eq(1).addClass("dhide");
		$(".days").eq(1).addClass("dhide");
	};

	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};

	function getDaysOfFeb(year) {
		if((year % 400 == 0) || ((year % 100 != 0) && (year % 4 == 0))) {
			return 29;
		} else {
			return 28;
		};
	};
});