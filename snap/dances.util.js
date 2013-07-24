
var
    uc = function(fn){
        return function(){
            return Function.prototype.call.apply(fn, arguments);
        }
    },

    toString = uc(Object.prototype.toString)
;
