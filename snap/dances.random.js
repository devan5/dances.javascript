/**
 * @name dances.random
 * @feature 返回指定范围内的随机整数
 *
 * @example
 * dances.random(0, 1);
 */

(function(exports){
	var random;

	random = function random(lt, gt){
		var tem;

		// 空 重载, 直接返回 Math.random
		if(!lt && !gt){
			return Math.random();
		}

		if("number" !== typeof lt){
			lt = parseInt(lt);
			if(isNaN(lt)){
				lt = Number.MIN_VALUE;
			}
		}

		if("number" !== typeof gt){
			gt = parseInt(gt);
			if(isNaN(gt)){
				gt = Number.MAX_VALUE;
			}
		}

		if(lt > gt){
			tem = gt;
			gt = lt;
			lt = tem;
		}

		return Math.floor(Math.random() * (gt - lt + 1) + lt);

	};

	exports.random = random;

})(dances);