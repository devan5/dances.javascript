describe("dances.loop", function(){
    it("basic(异步)", function(){
        var n = 5,
            m = 0,
            r
        ;

        runs(function(){
            dances.loop(function(){
                m++;
                r = m;
                return m !== n;
            });
        });

        waitsFor(function(){
            return r === m;
        }, 500, "basic");

        runs(function(){
            expect(m < 5).toEqual(true);
        });


    });

    it("同步", function(){
        var n = 5,
            m = 0
        ;

        dances.loop(function(){
            m++;
            return m !== n;
        }, -1);

        expect(m).toEqual(5);

    });

    it("传参", function(){
        var param;
        runs(function(){
            dances.loop(function(a){
                param = a;
                return false;
            }, 250, {count: 5});
        });

        waitsFor(function(){
            return param;
        }, 500, "传参..");

        runs(function(){
            expect(param.count).toEqual(5);
        });


    });

});