/**
 * @author devan5
 * @overview
 */

(function(exports){
    var loop ;

	exports || (exports = (function(){
		function Foo(){ }
		Foo.prototype.root = "dances.loop";
		window.dances = new Foo();
		return window.dances;
	})());

    /**
     * @param fn {Function} 密集型的方法
     * @param delay {Number} 时间闸(毫秒数)
     * @param bind {*..} 绑定参数
     */
    loop = function loop(fn, delay, bind){
        var args = Array.prototype.slice.call(arguments, 0)
        ;

        delay = "number" === typeof delay && delay === delay ? delay : 0;

        if(false !== fn.apply(null, args.slice(2))){
            if(delay > -1){
                setTimeout(function(){
                    loop.apply(null, args);
                }, delay);
            }else{
                loop.apply(null, args);
            }
        }
    };

    exports.loop = loop;

})(window.dances);