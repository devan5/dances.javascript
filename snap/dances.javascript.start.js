(function(dances, undefined){
"use strict";

dances || (dances = (function(){
    function Foo(){ }

    Foo.prototype.root = "dances.javascript";
    window.dances = new Foo();
    return window.dances;
})());
