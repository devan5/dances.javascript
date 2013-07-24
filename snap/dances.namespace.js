(function(exports){
    var ns;

    ns = function(sChain, root, win){
        var i,
            len,
            item,
            itemV
        ;

        if(!sChain || "string" !== typeof sChain){
            return {};
        }

        sChain = sChain.split(".");
        len = sChain.length;
        root = root || window;
        win = win && win.top === top ? win : window;

        for(i = 0; i < len; i++){
            item = sChain[i];
            itemV = root[item];

            /*
             if(!itemV || ("object" !== typeof itemV && "function" !== typeof itemV)){
             如果是某些内置 Date Regexp Match 会导致失去关联
             */
            if("[object Object]" !== toString(itemV) && "function" !== typeof itemV){
                root[item] = win.Object();
            }

            // 转变指针
            root = root[item];
        }

        //gc
        win = null;

        return root;

    };

    exports.namespace = ns;

})(dances);
