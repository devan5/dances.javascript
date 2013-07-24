describe("dances.merge_stab_extend", function(){
    describe("general", function(){
        var bike1,
            bike2,
            result
            ;

        beforeEach(function(){
            bike1 = {
                bike1    : "bike1",
                type     : "bike1",
                nightRide: true
            };
            bike2 = {
                bike2  : "bike2",
                type   : "bike2",
                dayRide: true
            };
        });

        it("merge", function(){
            result = dances.merge(bike1, bike2);

            expect(result).toEqual({
                bike1    : "bike1",
                bike2    : "bike2",
                type     : "bike2",
                dayRide  : true,
                nightRide: true
            });
            expect(bike1).toEqual({
                bike1    : "bike1",
                type     : "bike1",
                nightRide: true
            });
            expect(bike2).toEqual({
                bike2  : "bike2",
                type   : "bike2",
                dayRide: true
            });
            expect(result !== bike2).toEqual(true);
            expect(result !== bike1).toEqual(true);
        });

        it("stab", function(){
            result = dances.stab(bike1, bike2);

            expect(result).toEqual({
                bike1    : "bike1",
                bike2    : "bike2",
                type     : "bike1",
                dayRide  : true,
                nightRide: true
            });
            expect(bike1).toEqual({
                bike1    : "bike1",
                type     : "bike1",
                nightRide: true
            });
            expect(bike2).toEqual({
                bike1    : "bike1",
                bike2    : "bike2",
                type     : "bike1",
                dayRide  : true,
                nightRide: true
            });
            expect(result === bike2).toEqual(true);
            expect(result !== bike1).toEqual(true);
        });

        it("extend", function(){
            result = dances.extend(bike1, bike2);

            expect(result).toEqual({
                bike1    : "bike1",
                bike2    : "bike2",
                type     : "bike2",
                dayRide  : true,
                nightRide: true
            });
            expect(bike1).toEqual({
                bike1    : "bike1",
                bike2    : "bike2",
                type     : "bike2",
                dayRide  : true,
                nightRide: true
            });
            expect(bike2).toEqual({
                bike2  : "bike2",
                type   : "bike2",
                dayRide: true
            });
            expect(result !== bike2).toEqual(true);
            expect(result === bike1).toEqual(true);
        });
    });

    describe("测试 无主参数", function(){
        it("merge", function(){
            expect(dances.merge()).toEqual({});
            expect(dances.merge(1, 1)).toEqual({});
            expect(dances.merge(1, 0)).toEqual({});
            expect(dances.merge({a: "a"})).toEqual({a: "a"});
            expect(dances.merge(1, {a: "a"})).toEqual({a: "a"});
        });

        it("stab", function(){
            expect(dances.stab()).toEqual({});
            expect(dances.stab(1, 1)).toEqual({});
            expect(dances.stab(1, 0)).toEqual({});
            expect(dances.stab({a: "a"})).toEqual({a: "a"});
            expect(dances.stab(1, {a: "a"})).toEqual({a: "a"});
        });

        it("extend", function(){
            expect(dances.extend()).toEqual({});
            expect(dances.extend(1, 1)).toEqual({});
            expect(dances.extend(1, 0)).toEqual({});
            expect(dances.extend({a: "a"})).toEqual({a: "a"});
            expect(dances.extend(1, {a: "a"})).toEqual({a: "a"});
        });
    });

    describe("一个主参数", function(){
        var t;
        beforeEach(function(){
            t = {}
        });

        it("merge", function(){
            var result = dances.merge(t);
            expect(t !== result).toEqual(true);
        });
        it("stab", function(){
            var result = dances.stab(t);
            expect(t === result).toEqual(true);
        });
        it("extend", function(){
            var result = dances.extend(t);
            expect(t === result).toEqual(true);
        });
    });

    describe("测试 拷贝原型", function(){
        function MotherShip(){
            this.bitrthDate = new Date().getTime();
        }

        MotherShip.prototype.ship = "google";
        var phone = new MotherShip();

        it("merge", function(){
            expect(dances.merge(phone).ship).toEqual(undefined);
            expect(dances.merge(false, true, phone).ship).toEqual("google");
        });

        it("stab", function(){
            expect(dances.stab(phone, {}).ship).toEqual(undefined);
            expect(dances.stab(false, true, phone, {}).ship).toEqual("google");
        });

        it("extend", function(){
            expect(dances.extend({}, phone).ship).toEqual(undefined);
            expect(dances.extend(false, true, {}, phone, {}).ship).toEqual("google");
        });
    });

    describe("测试 强壮", function(){
        var bike1,
            bike2,
            result
            ;

        beforeEach(function(){
            bike1 = {
                bike1    : "bike1",
                type     : "bike1",
                nightRide: true
            };
            bike2 = {
                bike2  : "bike2",
                type   : "bike2",
                dayRide: true
            };
        });

        it("merge", function(){
            expect(dances.merge(bike1, bike2).type).toEqual("bike2");
            expect(dances.merge(false, false, true, bike1, bike2).type).toEqual("bike1");
        });

        describe("stab", function(){
            beforeEach(function(){
                bike1 = {
                    bike1    : "bike1",
                    type     : "bike1",
                    nightRide: true
                };
                bike2 = {
                    bike2  : "bike2",
                    type   : "bike2",
                    dayRide: true
                };
            });
            it("general", function(){
                expect(dances.stab(bike1, bike2).type).toEqual("bike1");
            });
            it("specify", function(){
                expect(dances.stab(false, false, true, bike1, bike2).type).toEqual("bike2");
            });
        });

        describe("extend", function(){
            beforeEach(function(){
                bike1 = {
                    bike1    : "bike1",
                    type     : "bike1",
                    nightRide: true
                };
                bike2 = {
                    bike2  : "bike2",
                    type   : "bike2",
                    dayRide: true
                };
            });
            it("", function(){
                expect(dances.extend(bike1, bike2).type).toEqual("bike2");
            });
            it("", function(){
                expect(dances.extend(false, false, true, bike1, bike2).type).toEqual("bike1");
            });
        });
    });

    describe("测试 多主参数", function(){
        var a1,
            a2,
            a3,
            a4,
            a5
            ;
        beforeEach(function(){
            a1 = {
                a1  : "a1",
                type: "a1"
            };
            a2 = {
                a2  : "a2",
                type: "a2"
            };
            a3 = {
                a3  : "a3",
                type: "a3"
            };
            a4 = {
                a4  : "a4",
                type: "a4"
            };
            a5 = {
                a5  : "a5",
                type: "a5"
            };
        });

        it("merge", function(){
            var r1 = dances.merge(a1, a2, a3, a4, a5);
            expect(r1).toEqual({
                a1  : "a1",
                a2  : "a2",
                a3  : "a3",
                a4  : "a4",
                a5  : "a5",
                type: "a5"
            });
            expect(r1 !== a5).toEqual(true);
            expect(r1 !== a1).toEqual(true);
        });
        it("stab", function(){
            var r1 = dances.stab(a1, a2, a3, a4, a5);
            expect(r1).toEqual({
                a1  : "a1",
                a2  : "a2",
                a3  : "a3",
                a4  : "a4",
                a5  : "a5",
                type: "a1"
            });
            expect(a1).toEqual({
                a1  : "a1",
                type: "a1"
            });
            expect(a2).toEqual({
                a1  : "a1",
                a2  : "a2",
                type: "a1"
            });
            expect(a3).toEqual({
                a1  : "a1",
                a2  : "a2",
                a3  : "a3",
                type: "a1"
            });
            expect(a4).toEqual({
                a1  : "a1",
                a2  : "a2",
                a3  : "a3",
                a4  : "a4",
                type: "a1"
            });
            expect(r1 === a5).toEqual(true);
        });
        it("extend", function(){
            var r1 = dances.extend(a1, a2, a3, a4, a5);
            expect(r1).toEqual({
                a1  : "a1",
                a2  : "a2",
                a3  : "a3",
                a4  : "a4",
                a5  : "a5",
                type: "a5"
            });
            expect(a2).toEqual({
                a2  : "a2",
                type: "a2"
            });
            expect(a3).toEqual({
                a3  : "a3",
                type: "a3"
            });
            expect(r1 === a1).toEqual(true);
        });

    });

    describe("deep mode", function(){
        var obj1,
            obj2,

            obj1JSON,
            obj2JSON

            ;

        beforeEach(function(){
            obj1 = {
                deep1_prop1: {
                    deep2_prop1: "a2",
                    deep2_prop2: "a2",
                    deep2_prop3: "a2",
                    deep2_prop4: "a2",

                    deep2_prop5: {
                        deep3_prop1: {
                            deep4_prop1: {
                                deep4_prop1: "a4",
                                deep4_prop2: "a4"
                            }
                        }
                    }

                },

                deep1_prop2: "a1",
                deep1_prop3: "a1"
            };

            obj2 = {
                deep1_prop1: {
                    deep2_prop4: "b2",

                    deep2_prop5: {
                        deep3_prop1: {
                            deep4_prop1: {
                                deep4_prop2: "b4"
                            }
                        }
                    },
                    deep2_prop6: "b2",
                    deep2_prop7: "b2"

                },

                deep1_prop3: "b1",
                deep1_prop4: "b1"
            };

            if(!obj1JSON){
                obj1JSON = dances.json(obj1);
                obj2JSON = dances.json(obj2);
            }
        });

        it("merge", function(){
            var r
                ;
            r = dances.merge(true, obj1, obj2);
            expect(r).toEqual({
                deep1_prop1: {
                    deep2_prop1: "a2",
                    deep2_prop2: "a2",
                    deep2_prop3: "a2",
                    deep2_prop4: "b2",

                    deep2_prop5: {
                        deep3_prop1: {
                            deep4_prop1: {
                                deep4_prop1: "a4",
                                deep4_prop2: "b4"
                            }
                        }
                    },
                    deep2_prop6: "b2",
                    deep2_prop7: "b2"

                },

                deep1_prop2: "a1",
                deep1_prop3: "b1",
                deep1_prop4: "b1"
            });

            expect(r !== obj1).toEqual(true);
            expect(r !== obj2).toEqual(true);
            expect(dances.json(obj1)).toEqual(obj1JSON);
            expect(dances.json(obj2)).toEqual(obj2JSON);
        });

        it("extend", function(){
            var r;
            r = dances.extend(true, obj1, obj2);
            expect(r).toEqual({
                deep1_prop1: {
                    deep2_prop1: "a2",
                    deep2_prop2: "a2",
                    deep2_prop3: "a2",
                    deep2_prop4: "b2",

                    deep2_prop5: {
                        deep3_prop1: {
                            deep4_prop1: {
                                deep4_prop1: "a4",
                                deep4_prop2: "b4"
                            }
                        }
                    },
                    deep2_prop6: "b2",
                    deep2_prop7: "b2"

                },

                deep1_prop2: "a1",
                deep1_prop3: "b1",
                deep1_prop4: "b1"
            });

            expect(r === obj1).toEqual(true);
            expect(dances.json(obj1) !== obj1JSON).toEqual(true);
            expect(dances.json(obj2)).toEqual(obj2JSON);
        });

        it("stab", function(){
            var r,
                _obj2
                ;
            r = dances.stab(true, {xx: "xx"}, obj2, obj1);
            expect(r).toEqual({
                xx         : "xx",
                deep1_prop1: {
                    deep2_prop1: "a2",
                    deep2_prop2: "a2",
                    deep2_prop3: "a2",
                    deep2_prop4: "b2",

                    deep2_prop5: {
                        deep3_prop1: {
                            deep4_prop1: {
                                deep4_prop1: "a4",
                                deep4_prop2: "b4"
                            }
                        }
                    },
                    deep2_prop6: "b2",
                    deep2_prop7: "b2"

                },

                deep1_prop2: "a1",
                deep1_prop3: "b1",
                deep1_prop4: "b1"
            });

            _obj2 = dances.json(obj2JSON);
            _obj2.xx = "xx";
            expect(obj2).toEqual(_obj2);

            expect(r === obj1).toEqual(true);
            expect(dances.json(obj1) !== obj1JSON).toEqual(true);
        });

    });

    describe("实践", function(){
        describe("stab", function(){
            it("demo1", function(){
                var opts;
                opts = 1;
                opts = dances.stab(opts, {
                    sClass : "active",
                    sClass2: "",

                    nTimeOn  : 100,
                    nTimeOff : 100,
                    bClearOn : true, // 鼠标移进再移出 并且 开始状态没有被激活时,清除"开始定时器"函数
                    bClearOff: true, // 鼠标移出,后100+毫秒,再移进 并且 激活状态没有消失时,清除"恢复定时器"函数
                    sEvtOn   : "",
                    sEvtOff  : "",
                    sEvtNS   : "eToggle",

                    bOneOf: false        // 唯一同名

                    // ltIE:9,
                    // fnInCallback:,
                    // fnResumeCallback:
                });
                $log(opts);
            });
        });
    });

    describe("混乱传参", function(){
        describe("字符串参数", function(){
            it("merge", function(){

            });

            it("stab", function(){
                $log(
                    dances.stab(1)
                )
            });

            it("extend", function(){
            });
        });

    });

});
