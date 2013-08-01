/**
 * @name dances.bind_bindBefore_bindAfter
 * @desc 绑定函数 This 指针
 */
// TODO review
// TODO unit-Test
(function(exports){
    var
        bind,
        _before,
        _after,

        revertArr
        ;

    revertArr = function(arr, n){
        n = ("number" === typeof n && n > -1) ? n : 0;
        return Array.prototype.slice.call(arr, n);
    };

    _before = function(scope){
        var boundAgs = revertArr(arguments),
            f
            ;

        if("function" === typeof scope){
            f = boundAgs.shift();
            scope = null;

        }else{
            scope = boundAgs.shift();
            f = boundAgs.shift();
            if("function" !== typeof f){
                throw "bindLeft expect a function as call function";
            }

        }

        return function(){
            return f.apply(scope || this, boundAgs.concat(revertArr(arguments)));
        };
    };

    _after = function(scope){
        var boundAgs = revertArr(arguments),
            f
            ;

        if("function" === typeof scope){
            f = boundAgs.shift();
            scope = null;

        }else{
            scope = boundAgs.shift();
            f = boundAgs.shift();
            if("function" !== typeof f){
                throw "bindRight expect a function as call function";
            }

        }

        return function(){
            return f.apply(scope || this, revertArr(arguments).concat(boundAgs));
        };
    };

    bind = function(scope){
        var boundAgs = revertArr(arguments),
            f
            ;

        if("function" === typeof scope){
            f = boundAgs.shift();
            scope = null;

        }else{
            scope = boundAgs.shift();
            f = boundAgs.shift();
            if("function" !== typeof f){
                throw "bind expect a function as call function"
            }

        }

        return function(){
            var _boundAgs = boundAgs,

                ags = revertArr(arguments),
                num = _boundAgs.length,

                i = 0
                ;

            for(; i < num; i++){
                undefined === _boundAgs[i] && (_boundAgs[i] = ags.shift());
            }

            ags.length > 0 && (_boundAgs = _boundAgs.concat(ags));

            return f.apply(scope || this, _boundAgs);
        };
    };

    exports.bind = bind;
    exports.bindBefore = _before;
    exports.bindAfter = _after;

})(dances);
