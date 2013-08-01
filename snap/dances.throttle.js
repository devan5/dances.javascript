/**
 * @name dances.throttle
 * @author devan5
 * @desc 密集型调用, 防止 UI 锁死. 并提供可配置时间闸, 调用元方法.
 *
 */

(function(exports){

    var throttle;

    throttle = function(fn, nDelay){
        var
            promise,
            time
        ;

        nDelay = "number" === typeof nDelay && nDelay === nDelay ? nDelay : 40;

        return function(){
            clearTimeout(promise);

            if(new Date - time > nDelay){
                fn();
                time = new Date;
            }else{
                promise = setTimeout(function(){
                    fn();
                    time = new Date;
                }, nDelay);
            }

        }
    };

    exports["throttle"] = throttle;

})(window.dances);
