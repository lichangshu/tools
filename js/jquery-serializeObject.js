/*
* 使用 jquery 的 serializeArray 转换form 为json, 重复的 name 会转换为数组
*/
(function ($) {
	var setOrPush = function (obj, str, val) {
		if (!obj.hasOwnProperty(str)) {
			obj[str] = val;
		} else if (obj[str].push) {
			obj = obj[str];
			obj.push(val);
		} else {
			obj = obj[str] = [obj[str]];
			obj.push(val);
		}
		return obj;
	};
	$.prototype.serializeObject = function () {
		var array = this.serializeArray(), o = {};
		for (var i = 0; i < array.length; i++) {
			var e = array[i], tg = o;
			for (var from = e.name.indexOf("."); from >= 0; from = e.name.indexOf(".", from)) {
				var key = e.name.substring(0, from);
				if (tg.hasOwnProperty(key)) {
					tg = tg[key];
				} else {
					tg = tg[key] = {};
				}
				e.name = e.name.substring(from + 1);
			}
			var ntg = setOrPush(tg, e.name, e.value);
			if (!ntg) {
				tg[e.name] = e.value;
			}
		}
		return o;
	};
})(jQuery);
