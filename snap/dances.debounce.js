/**
 * @name dances.debounce
 * @author devan5
 * @overview 密集型调用. 可配置拖延时间,拖延至最后一次调用.
 *
 */

(function(exports){
    var debounce;

    debounce = function(fn, nDelay, bImmediate){
        var
            promise,
            enableInvoke = true
        ;

        nDelay = "number" === typeof nDelay ? nDelay : 25;

        return function(){
            clearTimeout(promise);
            if(bImmediate){
                if(enableInvoke){
                    fn();
                    enableInvoke = false;
                }
            }else{
                promise = setTimeout(function(){
                    fn();
                    enableInvoke = true;
                }, nDelay);
            }
        }

    };

    exports["debounce"] = debounce;

})(dances);
