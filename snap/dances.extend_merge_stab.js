// TODO review
(function(exports){

    var
        fEat,
        fEatBridge,

        fMerge,
        fStab,
        fExtend,

        slice = uc(Array.prototype.slice),

        toString = uc(Object.prototype.toString)
        ;

    fEat = function(oTarget, oOrigin, bDeep, bProto, bProtect){
        var
            prop,
            sType,
            item
            ;

        for(prop in oOrigin){
            if(oOrigin.hasOwnProperty(prop) || bProto){
                if(bProtect && oTarget.hasOwnProperty(prop)){
                    continue;
                }

                item = oOrigin[prop];

                sType = typeof item;

                if(bDeep &&
                   item &&
                   ("object" === sType || "function" === sType)

                    ){

                    sType = typeof oTarget[prop];
                    if(!oTarget[prop] || ("object" !== sType && "function" !== sType)){
                        oTarget[prop] = {};
                    }

                    fEat(oTarget[prop], item, bDeep, bProto, bProtect);

                    continue;
                }

                undefined !== item && (oTarget[prop] = item);
            }
        }

        oTarget = oOrigin = null;

        return oTarget;
    };

    fEatBridge = function(){
        var
            args = Array.prototype.slice.call(arguments, 0),
            command = args.pop(),

            bDeep = "boolean" === typeof args[0] ? args.shift() : false,
            bProto = "boolean" === typeof args[0] ? args.shift() : false,
            bProtect = "boolean" === typeof args[0] ? args.shift() : false
            ;

        if(!args.length){
            return {};
        }

        return command(bDeep, bProto, bProtect, args);

    };

    fMerge = function(bDeep, bProto, bProtect, data){

        var
            oMerge,
            i,
            len,
            item,
            sType
            ;

        for(i = 0, len = data.length; i < len; i++){
            item = data[i];
            sType = typeof item;

            if(item && ("object" === sType || "function" === sType)){

                oMerge || (oMerge = "[object Array]" === toString(item) ? [] : {});

                fEat(oMerge, item, bDeep, bProto, bProtect);
            }
        }

        return oMerge || {};

    };

    fStab = function(bDeep, bProto, bProtect, data){

        var
            oMan,
            i,
            len,
            item,
            type
            ;

        for(i = 0, len = data.length; i < len; i++){
            item = data[i];
            type = typeof item;

            if(item && ("object" === type || "function" === type)){
                if(oMan){
                    fEat(item, oMan, bDeep, bProto, bProtect);
                    oMan = item;

                }else{

                    if(i === len - 1){
                        oMan = item;
                        break;
                    }

                    oMan = {};
                    i--;
                }
            }
        }

        return oMan || {};
    };

    fExtend = function(bDeep, bProto, bProtect, data){
        var
            oExtend,
            i,
            len,
            item,
            type
            ;

        // dances.extend
        if("string" === typeof data[0] && "function" === typeof data[1]){
            exports[arguments[0]] = arguments[1];
            return exports;
        }

        for(i = 0, len = data.length; i < len; i++){
            item = data[i];
            type = typeof item;

            if(item && ("object" === type || "function" === type)){

                if(oExtend){
                    fEat(oExtend, item, bDeep, bProto, bProtect);

                }else{

                    if(i === len - 1){
                        oExtend = item;
                        break;
                    }

                    oExtend = item;
                }
            }

        }

        return oExtend || {};
    };

    exports.merge = function(){
        var
            args = slice(arguments, 0)
            ;

        args.push(fMerge);
        return fEatBridge.apply(exports, args);
    };

    exports.stab = function(){
        var
            args = slice(arguments, 0)
            ;

        args.push(fStab);
        return fEatBridge.apply(exports, args);
    };

    exports.extend = function(){
        var
            args
            ;

        if("string" === typeof arguments[0] && "function" === typeof arguments[1]){
            exports[arguments[0]] = arguments[1];

        }else{
            args = slice(arguments, 0);
            args.push(fExtend);
        }

        return args ? fEatBridge.apply(exports, args) : exports;
    };

})(dances);
