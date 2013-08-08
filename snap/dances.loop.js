/**
 * @name dances.loop
 * @author devan5
 *
 * @feature 多次多用返回的高阶函数, 逻辑判断是否执行
 *
 * @firstDate 2013.07.19
 * @lastDate 2013.08.08
 *
 * @example
 * var loop = dances.loop(function(x){
 *     x[0]--;
 *     console.log(x[0]);
 *     return 0 !== x[0]
 * }, 50, [5]);
 */

(function(exports){
    var loop ;

    /**
     * @param fn {Function} 密集型的方法
     * @param delay {Number} 时间闸(毫秒数)
     * @param bindArgs {*..} 绑定参数
     */
    loop = function(fn, delay, bindArgs){
	    var args = slice(arguments);

	    bindArgs = args.slice(2);

	    return function loop(){
		    var args = slice(arguments);

		    if(loop._bExcuted){
			    return;
		    }

		    if(false !== fn.apply(args[0], bindArgs.concat(args.slice(1)))){
			    loop._bExcuted = true;
			    setTimeout(function(){
				    loop._bExcuted = false;
				    loop.apply(null, args);
				    args = null;
			    }, delay);

		    }else{
			    loop._bExcuted = false;
		    }

	    };
    };

    exports.loop = loop;

})(window.dances);
