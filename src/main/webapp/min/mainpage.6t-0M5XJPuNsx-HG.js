"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function () {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}();
! function (e) {
    var t = angular.module("publicModule", []);
    t.service("$util", ["$q", function (t) {
        var r = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            n = function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            },
            i = function (e) {
                if (n(e)) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }
            },
            o = function (t) {
                var r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                    n = e.location.search.substr(1).match(r);
                return null !== n ? unescape(n[2]) : null
            },
            a = function (e, t) {
                if (null !== e && !isNaN(e)) return +parseFloat(e).toFixed(t)
            },
            l = function (e, t) {
                if (null !== e && !isNaN(e)) {
                    switch (t) {
                        case "MB":
                            e = (+e / 1024 / 1024).toFixed(2);
                            break;
                        case "GB":
                            e = (+e / 1024 / 1024 / 1024).toFixed(2);
                            break;
                        case "KB":
                            e = (+e / 1024).toFixed(2);
                            break;
                        default:
                            e = e.toFixed(2)
                    }
                    return +e
                }
            },
            c = function (e) {
                if (null !== e && !isNaN(e)) {
                    var t = void 0;
                    return e >= 0 && e < 1024 ? t = e.toFixed(2) + "MB" : e >= 1024 && (t = (e / 1024).toFixed(2) + "GB"), t
                }
            },
            u = function (e, t) {
                for (var r = void 0, n = new RegExp("{#([a-zA-z0-9]+)}"); null !== (r = n.exec(e));) {
                    var i = 0 === t[r[1]] ? "0" : t[r[1]] || "";
                    e = e.replace(new RegExp(r[0], "g"), i)
                }
                return e
            },
            s = function (e, t) {
                e = new Date(e), e.setDate(e.getDate() + t);
                var r = e.getFullYear(),
                    n = e.getMonth() + 1,
                    i = e.getDate();
                return n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), r + "-" + n + "-" + i
            },
            f = function (e, t, r) {
                var n = {};
                void 0 === t && (t = (new Date).getTime());
                var i = t - e;
                return n.day = Math.floor(i / 864e5), i -= 24 * n.day * 3600 * 1e3, n.hours = Math.floor(i / 36e5), i -= 3600 * n.hours * 1e3, n.mimutes = Math.floor(i / 6e4), r && (i -= 60 * n.mimutes * 1e3, n.seconds = Math.floor(i / 1e3)), n
            };
        return {
            isEmptyObject: i,
            isArray: r,
            isObject: n,
            parseTpl: u,
            toDecimal: a,
            formartBytesData: l,
            formatMBytesData: c,
            getQueryString: o,
            calculateDate: s,
            getPageInterval: function (e, t) {
                var r = "",
                    n = void 0;
                return !e || !t || t - e <= 0 ? r = "0秒" : (n = f(e, t, !0), 0 !== n.day && (r += n.day + "天"), 0 !== n.hours && (r += n.hours + "小时"), 0 !== n.mimutes && (r += n.mimutes + "分钟"), 0 !== n.seconds && (r += n.seconds + "秒"), "" === r && (r = "0秒")), r
            },
            getDateInterval: f,
            getPageDate: function (e, t, r) {
                if (!e && !t || e - t <= 0) return "无";
                var n = f(e, t, r),
                    i = n.day,
                    o = n.hours,
                    a = n.mimutes;
                return i < 0 || o < 0 || a < 0 ? "刚刚" : i > 60 ? "更早" : i > 30 ? "一个月前" : i > 3 ? i + "天前" : 3 == i ? "三天前" : 2 == i ? "两天前" : 1 == i ? "昨天" : o >= 1 ? o + "小时前" : 0 === a ? "刚刚" : a + "分钟前"
            },
            loadJs: function (e) {
                var r = t.defer();
                return $.getScript(e, function () {
                    r.resolve()
                }), r.promise
            },
            Base64: {
                encode: function (e) {
                    return btoa(unescape(encodeURIComponent(e)))
                },
                decode: function (e) {
                    return decodeURIComponent(escape(atob(e)))
                }
            }
        }
    }]).factory("$domeModel", ["$http", function (e) {
        var t = function (e) {
            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
            for (var i = e, o = [].concat(r), a = 0, l = o.length; a < l; a++) i += "/" + o[a];
            return i
        };
        return {
            SelectListModel: function () {
                function e(t) {
                    _classCallCheck(this, e), this.selectListName = t ? t : "selectList", this.isCheckAll = !1, this.selectedCount = 0, this[this.selectListName] = []
                }
                return _createClass(e, [{
                    key: "init",
                    value: function (e, t) {
                        var r = this;
                        this.isCheckAll = !1, this.selectedCount = 0, this[this.selectListName] = function () {
                            if (e && 0 !== e.length) {
                                if ("[object Object]" === Object.prototype.toString.call(e[0])) {
                                    var n = !0,
                                        i = !1,
                                        o = void 0;
                                    try {
                                        for (var a, l = e[Symbol.iterator](); !(n = (a = l.next()).done); n = !0) {
                                            var c = a.value;
                                            c.keyFilter = !0, void 0 !== t && (c.isSelected = t), c.isSelected && r.selectedCount++
                                        }
                                    } catch (e) {
                                        i = !0, o = e
                                    } finally {
                                        try {
                                            !n && l.return && l.return()
                                        } finally {
                                            if (i) throw o
                                        }
                                    }
                                } else
                                    for (var u = 0, s = e.length; u < s; u++) e[u] = {
                                        item: e[u],
                                        keyFilter: !0,
                                        isSelected: t
                                    }, void 0 !== t && (e[u].isSelected = t), e[u].isSelected && r.selectedCount++;
                                return r.selectedCount === e.length && (r.isCheckAll = !0), e
                            }
                            return []
                        }()
                    }
                }, {
                    key: "toggleCheck",
                    value: function (e, t) {
                        var r = !0;
                        if (e.isSelected = t, t) {
                            this.selectedCount++;
                            var n = this[this.selectListName],
                                i = !0,
                                o = !1,
                                a = void 0;
                            try {
                                for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done); i = !0) {
                                    var u = l.value;
                                    if (u.keyFilter && !u.isSelected) {
                                        r = !1;
                                        break
                                    }
                                }
                            } catch (e) {
                                o = !0, a = e
                            } finally {
                                try {
                                    !i && c.return && c.return()
                                } finally {
                                    if (o) throw a
                                }
                            }
                            r && (this.isCheckAll = !0)
                        } else this.selectedCount--, this.isCheckAll = !1
                    }
                }, {
                    key: "checkAllItem",
                    value: function (e) {
                        this.isCheckAll = void 0 === e ? this.isCheckAll : e, this.selectedCount = 0;
                        var t = this[this.selectListName],
                            r = !0,
                            n = !1,
                            i = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(r = (o = a.next()).done); r = !0) {
                                var l = o.value;
                                l.keyFilter && this.isCheckAll ? (l.isSelected = !0, this.selectedCount++) : l.isSelected = !1
                            }
                        } catch (e) {
                            n = !0, i = e
                        } finally {
                            try {
                                !r && a.return && a.return()
                            } finally {
                                if (n) throw i
                            }
                        }
                    }
                }, {
                    key: "filterWithKey",
                    value: function (e, t) {
                        this.isCheckAll = !1, this.selectedCount = 0, void 0 === t && (t = "item");
                        var r = this[this.selectListName];
                        if (void 0 !== r[0][t]) {
                            var n = !0,
                                i = !1,
                                o = void 0;
                            try {
                                for (var a, l = r[Symbol.iterator](); !(n = (a = l.next()).done); n = !0) {
                                    var c = a.value;
                                    c.isSelected = !1, c.keyFilter = c[t].indexOf(e) !== -1
                                }
                            } catch (e) {
                                i = !0, o = e
                            } finally {
                                try {
                                    !n && l.return && l.return()
                                } finally {
                                    if (i) throw o
                                }
                            }
                        }
                    }
                }]), e
            }(),
            ServiceModel: function (r) {
                this.getData = function () {
                    for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    return e.get(t.apply(void 0, [r].concat(i)))
                }, this.setData = function (t, n) {
                    return e.post(r, t, n)
                }, this.updateData = function (t) {
                    return e.put(r, t)
                }, this.deleteData = function () {
                    for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    return e.delete(t.apply(void 0, [r].concat(i)))
                }
            },
            instancesCreator: function (e) {
                return e || (e = {}),
                    function (t) {
                        for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) n[i - 1] = arguments[i];
                        var o = void 0,
                            a = e[t];
                        return "function" == typeof a ? o = new(Function.prototype.bind.apply(a, [null].concat(n))) : (o = {}, console.log("error:there is no " + t)), o
                    }
            }
        }
    }]).provider("$domeData", function () {
        var e = {},
            t = function (t, r) {
                e[t] = r
            },
            r = function (t) {
                return e[t]
            },
            n = function (t) {
                e[t] && (e[t] = null)
            };
        return {
            setData: t,
            $get: function () {
                return {
                    setData: t,
                    getData: r,
                    delData: n
                }
            }
        }
    }), e.publicModule = t
}(window);
"use strict";
! function (e, n, t) {
    n.directive("selectCon", ["$document", function (e) {
        return {
            restrict: "AEC",
            scope: !0,
            transclude: !0,
            replace: !0,
            template: "<div ng-transclude></div>",
            controller: ["$scope", function (e) {
                this.hideSelect = function () {
                    e.hideSelect()
                }
            }],
            link: function (n, t, i) {
                var l = t.find(".select-list"),
                    a = t.find(".ui-btn-select"),
                    o = t.find(".drop"),
                    c = !1;
                if (0 !== a.length) {
                    l.hide(), a.on("blur", d);
                    var r = function (e) {
                            c = void 0 !== e ? e : !c, c === !0 ? (l.show(), o.removeClass("fa-angle-right").addClass("fa-angle-down")) : c === !1 && (l.hide(), o.removeClass("fa-angle-down").addClass("fa-angle-right"))
                        },
                        d = function (e) {
                            return r(!1), e.stopPropagation()
                        };
                    a.on("blur", d);
                    var u = function n(t) {
                        var i = t.target;
                        0 === l.find(i).length && "select-list" != i.className && r(!1), e.off("click", n)
                    };
                    l.on("mouseenter", function () {
                        a.off("blur", d)
                    }).on("mouseleave", function () {
                        a.on("blur", d), "true" == i.multicheckbox && e.on("click", u)
                    }), "INPUT" === a[0].tagName ? a.on("focus", function () {
                        r(!0)
                    }) : a.on("click", function () {
                        r()
                    }), "true" == i.label && (t.on("click", function () {
                        a.focus()
                    }), a.bind("focus", function (e) {
                        a.width(t.width() - 20 - a.position().left), e.stopPropagation()
                    }).bind("blur", function () {
                        a.width(120)
                    })), n.hideSelect = function () {
                        r(!1)
                    }
                }
            }
        }
    }]).directive("selectItem", ["$compile", function (e) {
        return {
            restrict: "AEC",
            require: "^?selectCon",
            link: function (n, t, i, l) {
                n.hideSelect = function () {
                    l.hideSelect()
                };
                var a = angular.element(i.$$element.find(">a")[0]),
                    o = a.attr("ng-click");
                o ? o += ";hideSelect($event.stopPropagation());" : o = "hideSelect($event.stopPropagation())", a.attr("ng-click", o), t.html(e(t.html())(n))
            }
        }
    }]).directive("loading", function () {
        return {
            restrict: "AE",
            template: '<div class="com-loading"><div class="dot1"></div><div class="dot2"></div></div>',
            replace: !0
        }
    }).directive("domeRadio", function () {
        return {
            restrict: "E",
            scope: {
                radioModel: "=dModel",
                label: "@dLabel",
                name: "@dName",
                id: "@dId",
                disabled: "@dDisabled",
                value: "@dValue",
                changeEvent: "&dChange"
            },
            replace: !0,
            template: '<span><input id="{{id}}" type="radio" name="{{name}}" class="ui-radio" ng-value="{{value}}" ng-model="radioModel" ng-change="changeEvent({model:radioModel})" ng-disabled="{{disabled}}"/><label ng-bind="label" for="{{id}}"></label></span>'
        }
    }).directive("domeCheck", function () {
        return {
            restrict: "E",
            scope: {
                checkModel: "=ngModel",
                label: "@dLabel",
                name: "@dName",
                id: "@dId",
                trueValue: "@dTrueValue",
                falseValue: "@dFalseValue",
                changeEvent: "&dChange"
            },
            replace: !0,
            template: '<span><input id="{{id}}" type="checkbox" name="{{name}}" class="ui-check" ng-true-value="{{trueValue||true}}"  ng-false-value="{{falseValue||false}}" ng-model="checkModel" ng-change="changeEvent({model:checkModel})" /><label ng-bind="label" for="{{id}}"></label></span>'
        }
    }).directive("domePrompt", function () {
        return {
            restrict: "AE",
            scope: {
                content: "@"
            },
            replace: !0,
            template: '<p class="txt-prompt"><i class="fa fa-info-circle" style="margin-right: 0.8em;"></i>{{content}}</p>'
        }
    }), n.directive("notEqual", function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                notEqual: "=notEqual"
            },
            link: function (e, n, t, i) {
                i.$parsers.unshift(function (n) {
                    var t = void 0 !== e.notEqual && e.notEqual.toString() === n;
                    return i.$setValidity("notEqual", !t), n
                })
            }
        }
    }).directive("equal", function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                equal: "=equal"
            },
            link: function (e, n, t, i) {
                i.$parsers.unshift(function (n) {
                    var t = void 0 === e.equal || e.equal.toString() === n;
                    return i.$setValidity("equal", t), n
                })
            }
        }
    })
}(window, window.publicModule || {});
"use strict";
! function (o) {
    o.constant("loginUrl", "/login/login.html"), o.constant("logoutUrl", "/api/user/logout"), o.constant("documentUrl", "http://gitbook.domeos.org/")
}(angular.module("constant", []));
"use strict";

function _defineProperty(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
        return t
    }
    return Array.from(e)
}
var _slicedToArray = function () {
        function e(e, n) {
            var t = [],
                r = !0,
                o = !1,
                a = void 0;
            try {
                for (var i, c = e[Symbol.iterator](); !(r = (i = c.next()).done) && (t.push(i.value), !n || t.length !== n); r = !0);
            } catch (e) {
                o = !0, a = e
            } finally {
                try {
                    !r && c.return && c.return()
                } finally {
                    if (o) throw a
                }
            }
            return t
        }
        return function (n, t) {
            if (Array.isArray(n)) return n;
            if (Symbol.iterator in Object(n)) return e(n, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
! function (e) {
    e.factory("api", ["$http", "$timeout", "$filter", "loginUrl", function (e, n, t, r) {
        var o = {},
            a = {};
        o.SimplePromise = function (e) {
            var t = null,
                r = null,
                o = [],
                a = this,
                i = null,
                c = function e(n) {
                    if (n === a) throw "promise should not be resolve by itself";
                    if (("object" === (void 0 === n ? "undefined" : _typeof(n)) || "function" == typeof n) && n && "then" in n && "function" == typeof n.then) {
                        i = !0;
                        try {
                            n.then(e, l)
                        } catch (e) {
                            l(e)
                        }
                    } else t = !0, r = n, setTimeout(u, 0)
                },
                l = function (e) {
                    t = !1, r = e, setTimeout(u, 0)
                };
            try {
                e(function (e) {
                    null === t && null === i && c(e)
                }, function (e) {
                    null === t && null === i && l(e)
                })
            } catch (e) {
                if (null !== t || null !== i) return;
                t = !1, r = e, setTimeout(u, 0)
            }
            e = null;
            var u = function () {
                    if (null !== t)
                        for (; o.length;) ! function () {
                            var e = o.shift(),
                                a = e.onFullfilled,
                                i = e.onRejected,
                                c = e.resolve,
                                l = e.reject,
                                u = t ? a : i;
                            u && "function" == typeof u ? n(function () {
                                try {
                                    c(u(r))
                                } catch (e) {
                                    l(e)
                                }
                            }) : (t ? c : l)(r)
                        }()
                },
                s = function (e, n, t, r) {
                    o.push({
                        onFullfilled: e,
                        onRejected: n,
                        resolve: t,
                        reject: r
                    }), setTimeout(u, 0)
                };
            Object.defineProperty(this, "promise", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: s
            })
        }, o.SimplePromise.prototype.then = function (e, n) {
            var t = this;
            return new o.SimplePromise(function (r, o) {
                t.promise(e, n, r, o)
            })
        }, o.SimplePromise.prototype.catch = function (e) {
            var n = this;
            return new o.SimplePromise(function (t, r) {
                n.promise(void 0, e, t, r)
            })
        }, o.SimplePromise.all = function (e) {
            return new o.SimplePromise(function (n, t) {
                var r = [],
                    o = 0;
                try {
                    [].concat(_toConsumableArray(e)).forEach(function (a, i) {
                        a.then(function (t) {
                            r[i] = t, ++o === e.length && n(r)
                        }).catch(function (e) {
                            t(e)
                        })
                    })
                } catch (e) {
                    t(e)
                }
            })
        }, o.SimplePromise.race = function (e) {
            return new o.SimplePromise(function (n, t) {
                try {
                    [].concat(_toConsumableArray(e)).forEach(function (e) {
                        return e.then(n).catch(t)
                    })
                } catch (e) {
                    t(e)
                }
            })
        }, o.SimplePromise.reject = function (e) {
            return new o.SimplePromise(function (n, t) {
                t(e)
            })
        }, o.SimplePromise.resolve = function (e) {
            return new o.SimplePromise(function (n, t) {
                n(e)
            })
        }, o.loadScript = function () {
            var e = Object.create({}),
                n = function (e, n, t) {
                    return n && n() ? o.SimplePromise.resolve(!0) : new o.SimplePromise(function (r, a) {
                        var i = function () {
                                r(!n || n())
                            },
                            c = document.createElement("script");
                        c.src = e, c.type = "text/javascript", c.addEventListener("load", function () {
                            "function" == typeof t ? o.SimplePromise.resolve(t()).then(i) : i()
                        }), (document.body || document.getElementsByTagName("head")[0]).appendChild(c)
                    })
                };
            return function (t, r, o) {
                return e.hasOwnProperty(t) || (e[t] = n(t, r, o)), e[t]
            }
        }();
        var i = function (n, t, r) {
                return function (i) {
                    for (var c = arguments.length, l = Array(c > 1 ? c - 1 : 0), u = 1; u < c; u++) l[u - 1] = arguments[u];
                    return new o.SimplePromise(function (o, c) {
                        var u, s = (u = angular).merge.apply(u, [{}, {
                            method: n,
                            url: t
                        }, r, {
                            data: i
                        }].concat(l));
                        console.log("[NETWORK][REQUEST] %s %s\n%o", s.method, s.url, s);
                        var p = function (e) {
                            try {
                                var n = e.status >= 200 && e.status < 300,
                                    t = e.data;
                                if (401 === e.status) return void(location.href = "/login/login.html");
                                var r = null,
                                    i = null;
                                if (n && ("string" == typeof t ? r = t : t instanceof ArrayBuffer ? r = t : "object" === (void 0 === t ? "undefined" : _typeof(t)) ? 200 === t.resultCode ? r = t.result : (n = !1, i = t.resultMsg) : n = !1), n) console.log("[NETWORK][RESPONSE] %s %s\n%o", s.method, s.url, r), o(r);
                                else {
                                    var l = i || "请求处理时发生错误";
                                    l in a && (l = a[l]), console.warn("[NETWORK][FAIL] %s %s\n%o", s.method, s.url, l);
                                    var u = new Error(l);
                                    u.response = e, c(u)
                                }
                            } catch (e) {
                                console.warn("[NETWORK][EXCEPTION] %s %s\n%o", s.method, s.url, e), c(new Error(""))
                            }
                        };
                        e(s).then(p, p)
                    })
                }
            },
            c = function (e) {
                return function () {
                    var n = void 0,
                        t = void 0,
                        r = !0;
                    try {
                        n = e.apply(void 0, arguments)
                    } catch (e) {
                        t = e, r = !1
                    }
                    return r ? o.SimplePromise.resolve(angular.copy(n)) : o.SimplePromise.reject(angular.copy(t))
                }
            },
            l = function (e) {
                return function () {
                    return e
                }
            };
        return o.network = function (e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET",
                t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return i(n, e, t)()
        }, o.global = function () {
            var e = {};
            return e.isInMemoryDatabase = function () {
                return i("GET", "/api/global/database")().then(function (e) {
                    return "H2" === e
                })
            }, e
        }(), o.memberCollection = function () {
            var e = {};
            return e.addOne = function (e, n) {
                return i("POST", "/api/collection_members/single")({
                    collectionId: e.id,
                    resourceType: e.type,
                    userId: n.id,
                    role: n.role
                })
            }, e.addMany = function (e, n) {
                return i("POST", "/api/collection_members/multiple")({
                    collectionId: e.id,
                    resourceType: e.type,
                    members: (n || []).map(function (e) {
                        return {
                            userId: e.id,
                            role: e.role
                        }
                    })
                })
            }, e.add = function (e, n) {
                return angular.isArray(n) ? o.memberCollection.addMany(e, n) : o.memberCollection.addOne(e, n)
            }, e.modify = function (e, n) {
                return i("PUT", "/api/collection_members/single")({
                    collectionId: e.id,
                    resourceType: e.type,
                    userId: n.id,
                    role: n.role
                })
            }, e.delete = function (e, n) {
                return i("DELETE", "/api/collection_members/" + e.id + "/" + n.id + "/" + e.type)()
            }, e.get = function (e) {
                return i("GET", "/api/collection_members/" + e.id + "/" + e.type)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.userId,
                            role: e.role,
                            name: e.username
                        }
                    })
                })
            }, e.getTypes = c(l(["PROJECT_COLLECTION", "DEPLOY_COLLECTION", "CLUSTER", "CONFIGURATION_COLLECTION", "LOADBALANCER_COLLECTION"])), e.listByType = function (e) {
                return i("GET", "/api/collections/" + e)().then(function (n) {
                    return (n || []).map(function (n) {
                        return {
                            id: n.id,
                            type: e,
                            name: n.name,
                            description: n.description
                        }
                    })
                })
            }, e.myRole = function (e) {
                return o.user.myRole(e)
            }, e
        }(), o.user = function () {
            var e = {},
                n = function (e) {
                    return {
                        id: e.id,
                        name: e.username,
                        email: e.email,
                        phone: e.phone,
                        loginType: e.loginType,
                        createTime: new Date(1e3 * e.createTime),
                        isAdmin: "adminPrivilege" in e ? !!e.adminPrivilege : null
                    }
                };
            return e.whoami = function (e) {
                return i("GET", "/api/user/get", {
                    cache: !e
                })().then(n)
            }, e.passwd = function (n) {
                var t = n.name,
                    r = n.oldPassword,
                    o = n.newPassword;
                return e.whoami().then(function (e) {
                    return e.isAdmin ? i("POST", "/api/user/adminChangePassword")({
                        username: t,
                        password: o
                    }).catch(function (e) {
                        throw ""
                    }) : i("POST", "/api/user/changePassword")({
                        username: t,
                        oldpassword: r,
                        newpassword: o
                    }).catch(function (e) {
                        if (("" + e).indexOf("password wrong") !== -1) throw "原密码不正确";
                        if (("" + e).indexOf("username wrong") !== -1) throw "用户名不正确";
                        throw ""
                    })
                })
            }, e.modify = function (e) {
                var n = e.id,
                    t = e.name,
                    r = e.email,
                    o = e.phone;
                return i("POST", "/api/user/modify")({
                    id: n,
                    phone: o,
                    email: r,
                    username: t
                })
            }, e.list = function () {
                return i("GET", "/api/user/list")().then(function (e) {
                    return (e || []).map(n)
                })
            }, e.myRole = function (e) {
                return i("GET", "/api/user/resource/" + e.type + "/" + e.id)()
            }, e.logout = function () {
                return i("GET", "/api/user/logout")().catch(function (e) {
                    if (e.response.status !== -1) throw e
                })
            }, e
        }(), o.image = function () {
            var e = {};
            return e.public = function () {
                var e = {};
                return e.list = function () {
                    return i("GET", "/api/image/public/catalog")().then(function (e) {
                        return (e || []).map(function (e) {
                            return {
                                name: e.imageName,
                                tagList: Array(e.size),
                                downloadCount: e.downloadCount,
                                icon: e.iconUrl,
                                updateTime: new Date(e.lastModified)
                            }
                        })
                    })
                }, e.detail = function (e) {
                    return i("GET", "/api/image/public/image?imageName=" + e.name)().then(function (e) {
                        return {
                            name: e.imageName,
                            tagList: (e.tagInfos || []).map(function (e) {
                                return {
                                    image: e.imageName,
                                    name: e.imageTag,
                                    size: e.imageSize,
                                    downloadCount: e.downloadCount,
                                    createTime: new Date(e.createTime),
                                    dockerfileUrl: e.dockerfileUrl,
                                    imageUrl: e.imageUrl
                                }
                            }),
                            downloadCount: e.downloadCount,
                            icon: e.iconUrl,
                            createTime: new Date(e.createTime),
                            updateTime: new Date(e.lastModified),
                            readmeUrl: e.readMeUrl,
                            description: e.description
                        }
                    })
                }, e
            }(), e.privateRegistry = function () {
                var e = {};
                return e.list = function () {
                    return i("GET", "/api/image")().then(function (e) {
                        return (e || []).map(function (e) {
                            return {
                                id: e.projectId,
                                name: e.imageName,
                                registry: e.registry,
                                tag: e.tag,
                                envSettings: e.envSettings,
                                createTime: new Date(e.createTime)
                            }
                        })
                    })
                }, e.listImageTags = function (e, n) {
                    return i("GET", "/api/image/detail?name=" + e + "&registry=" + n)()
                }, e
            }(), e
        }(), o.deployment = function () {
            var e = {};
            return e.collection = function () {
                return i("GET", "/api/deploycollection")().then(function (e) {
                    return e.map(function (e) {
                        return {
                            id: e.id,
                            name: e.name,
                            description: e.description,
                            creator: {
                                id: e.creatorId,
                                name: e.creatorName
                            },
                            createTime: new Date(e.createTime),
                            memberCount: e.memberCount,
                            deployCount: e.deployCount,
                            role: e.role
                        }
                    })
                })
            }, e.listInCollection = function (e) {
                return i("GET", "/api/deploy/list/${collection.id}").then(function (e) {
                    return e.map(function (e) {
                        return {
                            id: e.deployId,
                            name: e.deployName,
                            createTime: new Date(e.createTime),
                            lastUpdateTime: new Date(e.lastUpdateTime),
                            status: e.deploymentStatus,
                            cluster: {
                                name: e.clusterName
                            },
                            namespace: e.namespace,
                            hostEnv: e.hostEnv,
                            replicas: e.replicas,
                            monitor: {
                                cpu: {
                                    total: e.cpuTotal,
                                    using: e.cpuUsed
                                },
                                memory: {
                                    total: e.memoryTotal,
                                    using: e.memoryUsed
                                }
                            },
                            serviceDnsName: e.serviceDnsName,
                            mayDelete: e.deletable
                        }
                    })
                })
            }, e.list = function () {
                return i("GET", "/api/deploy/list")()
            }, e.delete = function (e) {
                return i("DELETE", "/api/deploy/id/" + e)()
            }, e.get = function (e) {
                return i("GET", "/api/deploy/id/" + e)().then(function (e) {
                    return {
                        deployId: e.deployId,
                        deployName: e.deployName,
                        clusterId: e.clusterId,
                        clusterName: e.clusterName,
                        clusterLog: e.clusterLog,
                        lastUpdateTime: e.lastUpdateTime,
                        deploymentStatus: e.deploymentStatus,
                        currentReplicas: e.currentReplicas,
                        defaultReplicas: e.defaultReplicas,
                        namespace: e.namespace,
                        currentVersions: (e.currentVersions || []).map(function (e) {
                            return e.labelSelectors = (e.labelSelectors || []).filter(function (e) {
                                return "USER_LABEL_VALUE" === e.content
                            }), e.containerConsoles = (e.containerConsoles || []).map(function (e) {
                                return {
                                    registry: e.registry,
                                    name: e.image,
                                    tag: e.tag,
                                    cpu: e.cpu,
                                    mem: e.mem,
                                    oldEnv: [],
                                    newEnv: e.envs,
                                    healthChecker: e.healthChecker,
                                    readinessChecker: e.readinessChecker,
                                    logItemDrafts: e.logItemDrafts,
                                    imagePullPolicy: e.imagePullPolicy,
                                    autoDeploy: e.autoDeploy,
                                    volumeMountConsoles: e.volumeMountConsoles.map(function (e) {
                                        return e.readonly = e.readonly.toString(), e
                                    }),
                                    configConsoles: e.configConsoles,
                                    commands: (e.commands || [])[0] || "",
                                    args: e.args || []
                                }
                            }), e
                        }),
                        healthChecker: e.healthChecker,
                        lbForDeploys: e.lbForDeploys,
                        scalable: e.scalable,
                        stateful: e.stateful,
                        serviceDnsName: e.serviceDnsName,
                        accessType: e.accessType,
                        exposePortNum: e.exposePortNum,
                        networkMode: e.networkMode,
                        versionType: e.versionType,
                        deletable: e.deletable,
                        deploymentType: e.deploymentType,
                        deployTypeShow: e.deployTypeShow,
                        description: e.description
                    }
                })
            }, e.create = function (e) {
                return i("POST", "/api/deploy/create")({
                    creatorId: e.creatorId,
                    collectionId: e.collectionId,
                    deployName: e.name,
                    description: e.description,
                    versionType: e.versionType,
                    deploymentType: e.deploymentType,
                    replicas: e.replicas,
                    clusterId: e.cluster.id,
                    namespace: e.namespace.namespace,
                    hostEnv: e.hostEnv,
                    networkMode: e.networkMode,
                    labelSelectors: function () {
                        var n = {
                            TEST: "TESTENV",
                            PROD: "PRODENV"
                        };
                        return (e.labelSelectors || []).filter(function (e) {
                            return "HOSTENVTYPE" !== e.content
                        }).concat({
                            name: n[e.hostEnv],
                            content: "HOSTENVTYPE"
                        })
                    }(),
                    loadBalancerDraft: function () {
                        var n = {};
                        return "internal" === e.visitMode ? (n.sessionAffinity = e.loadBalanceDraft.sessionAffinity, n.type = "INNER_SERVICE", n.loadBalancerPorts = e.loadBalanceDraft.loadBalancerPorts.map(function (e) {
                            return {
                                port: e.targetPort,
                                targetPort: e.targetPort,
                                protocol: "TCP"
                            }
                        })) : n = null, n
                    }(),
                    accessType: function () {
                        return "HOST" === e.networkMode ? "DIY" : "noAccess" === e.visitMode ? "DIY" : (e.visitMode, "K8S_SERVICE")
                    }(),
                    exposePortNum: e.exposePortNum ? e.exposePortNum : 0,
                    podSpecStr: ["YAML", "JSON"].includes(e.versionType) ? e.versionString.podSpecStr || "" : "",
                    containerConsoles: "CUSTOM" === e.versionType ? e.containerConsoles.map(function (e) {
                        return {
                            registry: e.registry,
                            image: e.name,
                            tag: e.tag,
                            cpu: e.cpu,
                            mem: e.mem,
                            envs: (e.oldEnv || []).concat(e.newEnv),
                            healthChecker: e.healthChecker,
                            readinessChecker: e.readinessChecker,
                            logItemDrafts: e.logItemDrafts,
                            imagePullPolicy: e.imagePullPolicy,
                            autoDeploy: e.autoDeploy,
                            volumeMountConsoles: function () {
                                return (e.volumeMountConsoles || []).map(function (e) {
                                    return e
                                })
                            }(),
                            configConsoles: function () {
                                return (e.configConsoles || []).map(function (e) {
                                    return e.name = e.configMap.name, e.volumeConfigMap.configurationId = e.configMap.id, e.volumeConfigMap.name = e.configMap.name, e.volumeConfigMap.iterms = e.configMap.configFileList.reduce(function (e, n) {
                                        return n.path && (e[n.name] = n.path), e
                                    }, {}), e.configMap = void 0, e
                                })
                            }(),
                            commands: [e.commands].filter(function (e) {
                                return e
                            }),
                            args: (e.args || []).filter(function (e) {
                                return e
                            })
                        }
                    }) : []
                }).then(function () {
                    if (e.namespace && e.namespace.namespace && !e.namespace.isExistentNamespace) {
                        var n = [e.namespace.namespace];
                        o.cluster.setNamespace(e.cluster.id, n)
                    }
                })
            }, e.updateDescription = function (e, n) {
                return i("PUT", "/api/deploy/id/" + e + "/description")(n)
            }, e.getDeploymentStr = function (e) {
                return i("POST", "/api/deploy/deploymentstr")({
                    deployName: e.name,
                    collectionId: e.collectionId,
                    replicas: e.replicas,
                    deploymentType: e.deploymentType,
                    versionType: e.versionType,
                    hostEnv: e.hostEnv,
                    clusterId: e.cluster.id,
                    namespace: e.namespace.namespace,
                    labelSelectors: e.labelSelectors,
                    networkMode: e.networkMode
                })
            }, e.getEvents = function (e) {
                return i("GET", "/api/deploy/event/list?deployId=" + e)()
            }, e.getInstances = function (e) {
                return i("GET", "/api/deploy/" + e + "/instance")()
            }, e.getDeployLoadBalance = function (e) {
                return i("GET", "/api/deploy/id/" + e + "/loadbalancer")()
            }, e.updateLoadBalance = function (e, n) {
                return i("PUT", "/api/deploy/id/" + e + "/loadbalancer")({
                    sessionAffinity: n.sessionAffinity,
                    loadBalancerPorts: (n.loadBalancerPorts || []).map(function (e) {
                        return {
                            port: e.targetPort,
                            targetPort: e.targetPort,
                            protocol: "TCP"
                        }
                    })
                })
            }, e.version = function () {
                var e = {};
                return e.listVersion = function (e) {
                    return i("GET", "/api/version/list?deployId=" + e)()
                }, e.getVersionById = function (e, n) {
                    return i("GET", "/api/version/id/" + e + "/" + n)().then(function (e) {
                        return {
                            deployId: e.deployId,
                            id: e.id,
                            description: e.description,
                            labelSelectors: (e.labelSelectors || []).filter(function (e) {
                                return "USER_LABEL_VALUE" === e.content
                            }),
                            hostList: e.hostList,
                            versionType: e.versionType,
                            podSpecStr: e.podSpecStr,
                            version: e.version,
                            createTime: e.createTime,
                            deprecate: e.deprecate,
                            containerConsoles: (e.containerConsoles || []).map(function (e) {
                                return {
                                    registry: e.registry,
                                    name: e.image,
                                    tag: e.tag,
                                    cpu: e.cpu,
                                    mem: e.mem,
                                    oldEnv: [],
                                    newEnv: e.envs,
                                    healthChecker: e.healthChecker,
                                    readinessChecker: e.readinessChecker,
                                    logItemDrafts: e.logItemDrafts,
                                    imagePullPolicy: e.imagePullPolicy,
                                    autoDeploy: e.autoDeploy,
                                    volumeMountConsoles: e.volumeMountConsoles.map(function (e) {
                                        return e.readonly = e.readonly.toString(), e
                                    }),
                                    configConsoles: e.configConsoles,
                                    commands: (e.commands || [])[0] || "",
                                    args: e.args || []
                                }
                            }),
                            clusterName: e.clusterName,
                            hostEnv: e.hostEnv,
                            networkMode: e.networkMode,
                            versionString: e.versionString
                        }
                    })
                }, e.createVersion = function (e, n) {
                    return i("POST", "/api/version/create?deployId=" + e)({
                        deployId: n.deployId,
                        labelSelectors: function () {
                            var e = {
                                TEST: {
                                    name: "TESTENV",
                                    content: "HOSTENVTYPE"
                                },
                                PROD: {
                                    name: "PRODENV",
                                    content: "HOSTENVTYPE"
                                }
                            };
                            return n.labelSelectors = n.labelSelectors.filter(function (e) {
                                return "HOSTENVTYPE" !== e.content
                            }).concat(e[n.hostEnv]), n.labelSelectors
                        }(),
                        hostList: n.hostList,
                        versionType: n.versionType,
                        podSpecStr: ["YAML", "JSON"].includes(n.versionType) ? n.versionString.podSpecStr || "" : "",
                        version: n.version,
                        deprecate: n.deprecate,
                        containerConsoles: "CUSTOM" === n.versionType ? n.containerConsoles.map(function (e) {
                            return {
                                registry: e.registry,
                                image: e.name,
                                tag: e.tag,
                                cpu: e.cpu,
                                mem: e.mem,
                                envs: (e.oldEnv || []).concat(e.newEnv),
                                healthChecker: e.healthChecker,
                                readinessChecker: e.readinessChecker,
                                logItemDrafts: e.logItemDrafts,
                                imagePullPolicy: e.imagePullPolicy,
                                autoDeploy: e.autoDeploy,
                                commands: [e.commands].filter(function (e) {
                                    return e
                                }),
                                args: (e.args || []).filter(function (e) {
                                    return e
                                }),
                                volumeMountConsoles: function () {
                                    return (e.volumeMountConsoles || []).map(function (e) {
                                        return e
                                    })
                                }(),
                                configConsoles: function () {
                                    return (e.configConsoles || []).map(function (e) {
                                        return e.name = e.configMap.name, e.volumeConfigMap.configurationId = e.configMap.id, e.volumeConfigMap.name = e.configMap.name, e.volumeConfigMap.iterms = e.configMap.configFileList.reduce(function (e, n) {
                                            return n.path && (e[n.name] = n.path), e
                                        }, {}), e
                                    })
                                }()
                            }
                        }) : []
                    })
                }, e.deprecateVersion = function (e, n) {
                    return i("DELETE", "/api/version/" + e + "/" + n + "/deprecate")()
                }, e.recoverDeprecateVersion = function (e, n) {
                    return i("PUT", "/api/version/" + e + "/" + n + "/enable")()
                }, e
            }(), e.action = function () {
                var e = {},
                    n = "/api/deploy/action";
                return e.updateDeployment = function (e, t, r) {
                    return i("POST", n + "/update?deployId=" + e + "&version=" + t + "&replicas=" + r)()
                }, e.stop = function (e) {
                    return i("POST", n + "/stop?deployId=" + e.id)()
                }, e.abort = function (e) {
                    return i("POST", n + "/abort?deployId=" + e.id)()
                }, e.rollback = function (e) {
                    return i("POST", "/api/deploy/action/rollback?deployId=" + e.id + "&version=" + e.version + (e.replicas ? "&replicas=" + e.replicas : ""))()
                }, e.update = function (e) {
                    return i("POST", "/api/deploy/action/" + (e.currentVersion > e.version ? "rollback" : "update") + "?deployId=" + e.id + "&version=" + e.version + (e.replicas ? "&replicas=" + e.replicas : ""))().then(function (n) {
                        return {
                            response: n,
                            tip: "已提交，正在" + (e.currentVersion > e.version ? "回滚" : "升级") + "。"
                        }
                    })
                }, e.start = function (e) {
                    return i("POST", "/api/deploy/action/start?deployId=" + e.id + "&version=" + e.version + (e.replicas ? "&replicas=" + e.replicas : ""))()
                }, e.scale = function (e) {
                    return e.labels.length ? i("POST", "/api/deploy/action/daemonset/scales?deployId=" + e.id + "&version=" + e.currentVersion)(e.labels).then(function (e) {
                        return {
                            response: e,
                            tip: "操作成功"
                        }
                    }) : i("POST", "/api/deploy/action/" + (e.replicas > e.currentReplicas ? "scaleup" : "scaledown") + "/?deployId=" + e.id + "&version=" + e.currentVersion + "&replicas=" + e.replicas)().then(function (n) {
                        return {
                            response: n,
                            tip: "已提交，正在" + (e.replicas > e.currentReplicas ? "扩容" : "缩容") + "。"
                        }
                    })
                }, e.restart = function (e) {
                    return i("DELETE", "/api/deploy/" + e.id + "/instance?instanceName=" + e.instanceName)()
                }, e
            }(), e
        }(), o.cluster = function () {
            var e = {},
                n = "/api/cluster";
            return e.getClusterById = function (e) {
                return i("GET", n + "/" + e)().then(function (e) {
                    return {
                        id: e.id,
                        name: e.name,
                        logConfig: e.logConfig,
                        api: e.api,
                        tag: e.tag,
                        ownerName: e.ownerName,
                        role: e.role,
                        domain: e.domain,
                        createTime: e.createTime,
                        clusterMonitor: e.clusterMonitor,
                        nodeNum: e.nodeNum,
                        podNum: e.podNum,
                        buildConfig: e.buildConfig
                    }
                })
            }, e.listCluster = function () {
                return i("GET", n)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.id,
                            name: e.name,
                            logConfig: e.logConfig,
                            api: e.api,
                            tag: e.tag,
                            ownerName: e.ownerName,
                            role: e.role,
                            domain: e.domain,
                            createTime: e.createTime,
                            clusterMonitor: e.clusterMonitor,
                            nodeNum: e.nodeNum,
                            podNum: e.podNum,
                            buildConfig: e.buildConfig
                        }
                    })
                })
            }, e.getNamespace = function (e) {
                return i("GET", n + "/" + e + "/namespace")()
            }, e.setNamespace = function (e, t) {
                return i("POST", n + "/" + e + "/namespace")(t)
            }, e.listNodeList = function (e) {
                return i("GET", n + "/" + e + "/nodelist")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            name: e.name,
                            ip: e.ip,
                            status: e.status,
                            runningPods: e.runningPods,
                            capacity: e.capacity,
                            disk: e.disk,
                            createTime: e.createTime,
                            labels: e.labels,
                            dockerVersion: e.dockerVersion,
                            kubeletVersion: e.kubeletVersion,
                            kernelVersion: e.kernelVersion,
                            osVersion: e.osVersion
                        }
                    })
                })
            }, e.listHostLabel = function (e) {
                return i("GET", n + "/" + e + "/labels")().then(function (e) {
                    return Object.keys(e || {}).map(function (n) {
                        return {
                            name: n,
                            content: e[n]
                        }
                    })
                })
            }, e.listNodeByLabels = function (e, t) {
                var r = (t || []).reduce(function (e, n) {
                        return e[n.name] = n.content, e
                    }, {}),
                    o = encodeURI(JSON.stringify(r));
                return i("GET", n + "/" + e + "/nodelistwithlabels?labels=" + o)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            name: e.name,
                            ip: e.ip,
                            status: e.status,
                            runningPods: e.runningPods,
                            capacity: e.capacity,
                            disk: e.disk,
                            createTime: e.createTime,
                            labels: e.labels,
                            dockerVersion: e.dockerVersion,
                            kubeletVersion: e.kubeletVersion,
                            kernelVersion: e.kernelVersion,
                            osVersion: e.osVersion
                        }
                    })
                })
            }, e.hasNodeByLabels = function (n, t) {
                return e.listNodeByLabels(n, t).then(function (e) {
                    return !!e.length
                })
            }, e.listInstance = function (e) {
                return i("GET", "/api/cluster/" + e + "/instancelist")().then(function (e) {
                    return (e || []).map(function (e) {
                        return e
                    })
                })
            }, e.listInstanceByLabel = function (e, n) {
                var t = Object.assign.apply(Object, [{}].concat(_toConsumableArray((n || []).map(function (e) {
                        return _defineProperty({}, e.name, e.content)
                    })))),
                    r = encodeURI(JSON.stringify(t));
                return i("GET", "/api/cluster/" + e + "/instancelistwithlabels?labels=" + r)().then(function (e) {
                    return (e || []).map(function (e) {
                        return e
                    })
                })
            }, e.addNodeLabels = function (e, n) {
                return i("POST", "/api/cluster/" + e + "/nodelabels/add")((n || []).map(function (e) {
                    return {
                        node: e.nodeName,
                        labels: e.labels
                    }
                }))
            }, e.deleteNodeLabels = function (e, n) {
                return i("POST", "/api/cluster/" + e + "/nodelabels/delete")((n || []).map(function (e) {
                    return {
                        node: e.nodeName,
                        labels: e.labels
                    }
                }))
            }, e
        }(), o.configMap = function () {
            var e = {},
                n = "/api/configurationcollection";
            return e.listConfigMapCollection = function () {
                return i("GET", n)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.id,
                            name: e.name,
                            description: e.description,
                            createTime: e.createTime,
                            role: e.role,
                            configMapCount: e.configurationCount,
                            memberCount: e.memberCount,
                            creatorInfo: e.creatorInfo
                        }
                    })
                })
            }, e.createConfigMapCollection = function (e) {
                return i("POST", n)({
                    name: e.name,
                    description: e.description
                })
            }, e.getConfigMapCollectionById = function (e) {
                return i("GET", n + "/" + e)().then(function (e) {
                    return {
                        id: e.configurationCollection.id,
                        name: e.configurationCollection.name,
                        description: e.configurationCollection.description,
                        createTime: e.configurationCollection.createTime,
                        creatorId: e.creatorInfo.creatorId,
                        creatorName: e.creatorInfo.name
                    }
                })
            }, e.deleteConfigMapCollection = function (e) {
                return i("DELETE", n + "/" + e)()
            }, e.updateConfigMapCollection = function (e) {
                return i("PUT", n)(e)
            }, e.listConfigMap = function (e) {
                return i("GET", n + "/" + e + "/configuration")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.configuration.id,
                            name: e.configuration.name,
                            description: e.configuration.description,
                            clusterId: e.configuration.clusterId,
                            namespace: e.configuration.namespace,
                            labelSelectors: e.configuration.labelSelectors,
                            data: e.configuration.data,
                            configFileList: Object.keys(e.configuration.data || {}).map(function (n) {
                                return {
                                    name: n,
                                    content: e.configuration.data[n]
                                }
                            }),
                            createTime: e.configuration.createTime,
                            creatorInfo: e.creatorInfo,
                            creator: e.creatorInfo.name,
                            clusterName: e.clusterName,
                            collectionId: e.collectionId
                        }
                    })
                })
            }, e.listConfigMapAll = function () {
                return i("GET", n + "/configuration")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.configuration.id,
                            name: e.configuration.name,
                            description: e.configuration.description,
                            clusterId: e.configuration.clusterId,
                            namespace: e.configuration.namespace,
                            labelSelectors: e.configuration.labelSelectors,
                            data: e.configuration.data,
                            configFileList: Object.keys(e.configuration.data || {}).map(function (n) {
                                return {
                                    name: n,
                                    content: e.configuration.data[n]
                                }
                            }),
                            createTime: e.configuration.createTime,
                            creatorInfo: e.creatorInfo,
                            creator: e.creatorInfo.name,
                            clusterName: e.clusterName,
                            collectionId: e.collectionId
                        }
                    })
                })
            }, e.listConfigMapByClusterId = function (e) {
                return i("GET", n + "/cluster/" + e + "/configuration")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.configuration.id,
                            name: e.configuration.name,
                            description: e.configuration.description,
                            clusterId: e.configuration.clusterId,
                            namespace: e.configuration.namespace,
                            labelSelectors: e.configuration.labelSelectors,
                            data: e.configuration.data,
                            configFileList: Object.keys(e.configuration.data || {}).map(function (n) {
                                return {
                                    name: n,
                                    content: e.configuration.data[n]
                                }
                            }),
                            createTime: e.configuration.createTime,
                            creatorInfo: e.creatorInfo,
                            creator: e.creatorInfo.name,
                            clusterName: e.clusterName,
                            collectionId: e.collectionId
                        }
                    })
                })
            }, e.listConfigMapByClusterIdAndNamespace = function (e, t) {
                return i("GET", n + "/cluster/" + e + "/" + t + "/configuration")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            id: e.configuration.id,
                            name: e.configuration.name,
                            description: e.configuration.description,
                            clusterId: e.configuration.clusterId,
                            namespace: e.configuration.namespace,
                            labelSelectors: e.configuration.labelSelectors,
                            data: e.configuration.data,
                            configFileList: Object.keys(e.configuration.data || {}).map(function (n) {
                                return {
                                    name: n,
                                    content: e.configuration.data[n]
                                }
                            }),
                            createTime: e.configuration.createTime,
                            creatorInfo: e.creatorInfo,
                            creator: e.creatorInfo.name,
                            clusterName: e.clusterName,
                            collectionId: e.collectionId
                        }
                    })
                })
            }, e.createConfigMap = function (e, t) {
                return i("POST", n + "/" + e + "/configuration")({
                    name: t.name,
                    description: t.description,
                    clusterId: t.clusterId,
                    namespace: t.namespace,
                    data: t.configFileList.reduce(function (e, n) {
                        return e[n.name] = n.content, e
                    }, {})
                })
            }, e.getConfigMap = function (e) {
                return i("GET", n + "/configuration/" + e)().then(function (e) {
                    return {
                        id: e.configuration.id,
                        name: e.configuration.name,
                        description: e.configuration.description,
                        clusterId: e.configuration.clusterId,
                        namespace: e.configuration.namespace,
                        labelSelectors: e.configuration.labelSelectors,
                        configFileList: Object.keys(e.configuration.data || {}).map(function (n) {
                            return {
                                name: n,
                                content: e.configuration.data[n]
                            }
                        }),
                        data: e.configuration.data,
                        createTime: e.configuration.createTime,
                        creatorInfo: e.creatorInfo,
                        creator: e.creatorInfo.name,
                        clusterName: e.clusterName,
                        collectionId: e.collectionId
                    }
                })
            }, e.deleteConfigMap = function (e) {
                return i("DELETE", n + "/configuration/" + e)()
            }, e.updateConfigMap = function (e, t) {
                return i("PUT", n + "/" + e + "/configuration")({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    clusterId: t.clusterId,
                    namespace: t.namespace,
                    labelSelectors: t.labelSelectors,
                    createTime: t.createTime,
                    data: t.configFileList.reduce(function (e, n) {
                        return e[n.name] = n.content, e
                    }, {})
                })
            }, e.listRelatedDeploy = function (e) {
                return i("GET", n + "/configuration/" + e + "/deployinfo")()
            }, e
        }(), o.overview = function () {
            var e = {};
            e.usage = function () {
                return i("GET", "/api/overview/usage")().then(function (e) {
                    return {
                        project: {
                            collection: e.projectCollection || 0,
                            total: e.project || 0
                        },
                        deploy: {
                            collection: e.deployCollection || 0,
                            total: e.deployment || 0
                        },
                        image: {
                            total: e.image || 0,
                            base: e.imageBase || 0,
                            project: e.imageProject || 0,
                            other: e.imageOther || 0
                        },
                        cluster: {
                            total: e.cluster || 0
                        },
                        storage: {
                            total: e.storage || 0
                        },
                        volume: {
                            total: e.volume || 0,
                            using: e.volumeUsing || 0
                        },
                        config: {
                            collection: e.configurationCollection || 0,
                            total: e.configuration || 0
                        },
                        loadBalance: {
                            total: e.loadBalancerCollection,
                            nginx: e.loadBalancerNginx,
                            kubeProxy: e.loadBalancerProxy
                        }
                    }
                })
            }, e.resource = function () {
                return i("GET", "/api/overview/resource")().then(function (e) {
                    return {
                        memory: {
                            total: e.memoryTotal,
                            using: e.memoryUsed,
                            free: e.memoryTotal - e.memoryUsed
                        },
                        cpu: {
                            total: e.cpu0To25 + e.cpu25To50 + e.cpu50To75 + e.cpu75To100,
                            load_0_25: e.cpu0To25,
                            load_25_50: e.cpu25To50,
                            load_50_75: e.cpu50To75,
                            load_75_100: e.cpu75To100
                        },
                        node: {
                            total: e.node,
                            online: e.nodeOnline,
                            offline: e.nodeOffline
                        }
                    }
                })
            }, e.disk = function () {
                return i("GET", "/api/overview/disk")().then(function (e) {
                    return {
                        disk: {
                            total: e.diskTotal,
                            using: e.diskTotal - e.diskRemain,
                            free: e.diskRemain
                        }
                    }
                })
            };
            var n = function (e, n, t) {
                var r = {
                        PROJECT_COLLECTION: "项目$",
                        PROJECT: "工程$",
                        DEPLOY_COLLECTION: "服务$",
                        DEPLOY: "部署$",
                        STORAGE_CLUSTER: "存储$",
                        CONFIGURATION: "配置$",
                        CONFIGURATION_COLLECTION: "配置集合$",
                        CLUSTER: "集群$",
                        LOADBALANCER: "负载均衡实例$",
                        LOADBALANCER_COLLECTION: "负载均衡$"
                    },
                    o = {
                        SET: "添加$",
                        MODIFY: "修改$",
                        DELETE: "删除$",
                        BUILD: "构建$",
                        SCALEUP: "扩容$",
                        SCALEDOWN: "缩容$",
                        START: "启动$",
                        STOP: "停止$",
                        UPDATE: "升级$",
                        ROLLBACK: "回滚$",
                        ABORT: "中断$",
                        DELETEINSTANCE: "重启$实例"
                    };
                if (r.hasOwnProperty(n) && o.hasOwnProperty(t)) return o[t].replace(/\$/, function () {
                    return r[n].replace(/\$/, function () {
                        return e
                    })
                })
            };
            e.actionList = function () {
                return i("GET", "/api/overview/operation")().then(function (e) {
                    var t = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var i, c = e[Symbol.iterator](); !(r = (i = c.next()).done); r = !0) {
                            var l = i.value,
                                u = n(l.resourceName, l.resourceType, l.operation);
                            u.length && t.push({
                                target: l.resourceName,
                                targetType: l.resourceType,
                                verb: l.operation,
                                user: {
                                    id: l.userId,
                                    name: l.userName
                                },
                                time: new Date(l.operateTime),
                                text: u
                            })
                        }
                    } catch (e) {
                        o = !0, a = e
                    } finally {
                        try {
                            !r && c.return && c.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return {
                        actionList: t
                    }
                })
            };
            var t = function (e, n, t, r) {
                return {
                    cpu_percent: "CPU使用率 <#> <r>%，为 <l>%",
                    memory_percent: "内存使用率 <#> <r>%，为 <l>%",
                    disk_percent: "磁盘使用率 <#> <r>%，为 <l>%",
                    disk_read: "磁盘读取速率 <#> <r>KB/s，为 <l>KB/s",
                    disk_write: "磁盘写入速率 <#> <r>KB/s，为 <l>KB/s",
                    network_in: "网络流入速率 <#> <r>KB/s，为 <l>KB/s",
                    network_out: "网络流出速率 <#> <r>KB/s，为 <l>KB/s",
                    agent_alive: "监控代理未处于活动状态"
                }[e].replace(/<#>/, function () {
                    return {
                        "==": "等于",
                        "!=": "不等于",
                        "<": "小于",
                        "<=": "小于等于",
                        ">": "大于",
                        ">=": "大于等于"
                    }[n]
                }).replace(/<l>/, function () {
                    return (r + "").slice(0, 4).replace(/\.$/, "")
                }).replace(/<r>/, function () {
                    return (t + "").slice(0, 4).replace(/\.$/, "")
                })
            };
            return e.alarmList = function () {
                return i("GET", "/api/alarm/event")().then(function (e) {
                    return {
                        alarmList: e.map(function (e) {
                            return {
                                time: new Date(e.timeStamp),
                                text: t(e.metric, e.operator, e.rightValue, e.leftValue)
                            }
                        })
                    }
                }, function () {
                    return {
                        alarmList: null
                    }
                })
            }, e.project = function () {
                return i("GET", "/api/overview/project")().then(function (e) {
                    return {
                        action: {
                            build: {
                                auto: e.autoBuild,
                                manual: e.manualBuild
                            }
                        }
                    }
                })
            }, e.deployment = function () {
                return i("GET", "/api/overview/deployment")().then(function (e) {
                    return {
                        action: {
                            deploy: {
                                auto: e.autoDeploy,
                                online: e.onlineNumber,
                                online_detail: (e.onlineDetails || []).map(function (e) {
                                    return {
                                        start: e.startNumber,
                                        update: e.updateNumber,
                                        rollback: e.rollbackNumber,
                                        scale_up: e.scaleUpNumber,
                                        scale_down: e.scaleDownNumber
                                    }
                                })
                            }
                        }
                    }
                })
            }, e.id = function () {
                return i("GET", "/api/global/uuid")().then(function (e) {
                    return {
                        id: e
                    }
                })
            }, e.version = function () {
                return i("GET", "/api/global/version")().then(function (e) {
                    return {
                        version: e
                    }
                })
            }, e
        }(), o.globleConfig = function () {
            var e = {};
            return e.hasGitProject = function (e) {
                return i("GET", "/api/global/gitconfig/" + e + "/usage")().then(function (e) {
                    return e && e.length
                })
            }, e
        }(), o.globalSetting = function () {
            var e = {};
            return e.login = function () {
                var e = {};
                return e.getLdapConfig = function () {
                    return i("GET", "/api/global/ldapconfig")().then(function (e) {
                        return {
                            enabled: !0,
                            server: e.server,
                            suffix: e.emailSuffix
                        }
                    }).catch(function (e) {
                        return {
                            enabled: !1
                        }
                    })
                }, e.getSsoConfig = function () {
                    return i("GET", "/api/global/ssoconfig")().then(function (e) {
                        return {
                            enabled: !0,
                            server: e.casServerUrl,
                            login: e.loginUrl,
                            logout: e.logoutUrl
                        }
                    }).catch(function (e) {
                        return {
                            enabled: !1
                        }
                    })
                }, e.getConfig = function () {
                    return o.SimplePromise.all([e.getLdapConfig(), e.getSsoConfig()]).then(function (e) {
                        var n = _slicedToArray(e, 2);
                        return {
                            ldapConfig: n[0],
                            ssoConfig: n[1]
                        }
                    })
                }, e.putLdapConfig = function (e) {
                    return e.enabled ? i("POST", "/api/global/ldapconfig")({
                        server: e.server,
                        emailSuffix: e.suffix
                    }) : i("DELETE", "/api/global/ldapconfig")()
                }, e.putSsoConfig = function (e) {
                    return e.enabled ? i("POST", "/api/global/ssoconfig")({
                        casServerUrl: e.server,
                        loginUrl: e.login,
                        logoutUrl: e.logout
                    }) : i("DELETE", "/api/global/ssoconfig")()
                }, e.putConfig = function (n) {
                    var t = n.ldapConfig,
                        r = n.ssoConfig;
                    return o.SimplePromise.all([e.putLdapConfig(t), e.putSsoConfig(r)])
                }, e
            }(), e
        }(), o.select = function () {
            var e = {},
                n = function (e) {
                    var n = e.text,
                        t = e.remark,
                        r = e.value,
                        o = e.match;
                    return "string" == typeof n && (n = function (e) {
                            return function (n) {
                                return n[e]
                            }
                        }(n)), void 0 === t && (t = function () {
                            return ""
                        }), "string" == typeof t && (t = function (e) {
                            return function (n) {
                                return n[e]
                            }
                        }(t)), void 0 === r && (r = function (e) {
                            return e
                        }), void 0 === o && (o = ["id"]), "string" == typeof o && (o = [o]), Array.isArray(o) && (o = function (e) {
                            return function (n) {
                                return Object.assign.apply(Object, [{}].concat(_toConsumableArray(e.map(function (e) {
                                    return e in n ? _defineProperty({}, e, n[e]) : {}
                                }))))
                            }
                        }(o)),
                        function (e) {
                            return e.map(function (e) {
                                return {
                                    text: n(e),
                                    remark: t(e),
                                    value: r(e),
                                    match: o(e)
                                }
                            })
                        }
                },
                r = function (e, n) {
                    return function (t) {
                        return (t && e(t) ? n : c(l([])))(t)
                    }
                };
            return e.deployCollectionList = function () {
                return i("GET", "/api/deploycollection")().then(function (e) {
                    return e.map(function (e) {
                        return {
                            id: e.id,
                            name: e.name
                        }
                    })
                }).then(n({
                    text: "name"
                }))
            }, e.deployListByCollection = r(function (e) {
                return "id" in e
            }, function (e) {
                return i("GET", "/api/deploy/list/" + e.id)().then(function (n) {
                    return n.filter(function (e) {
                        return "CUSTOM" === e.versionType
                    }).map(function (n) {
                        return {
                            id: n.deployId,
                            name: n.deployName,
                            collection: e
                        }
                    })
                }).then(n({
                    text: "name"
                }))
            }), e.deployVersionList = r(function (e) {
                return "id" in e
            }, function (e) {
                return i("GET", "/api/version/list?deployId=" + e.id)().then(function (n) {
                    return n.map(function (n) {
                        return {
                            id: n.version,
                            deploy: e
                        }
                    })
                }).then(n({
                    text: function (e) {
                        return "version" + e.id
                    }
                }))
            }), e.imageVersionList = r(function (e) {
                return "name" in e && "registry" in e
            }, function (e) {
                return i("GET", "/api/image/detail?name=" + e.name + "&registry=" + e.registry)().then(function (e) {
                    return e.map(function (e) {
                        return {
                            name: e.tag,
                            createTime: e.createTime
                        }
                    })
                }).then(n({
                    text: "name",
                    remark: function (e) {
                        return t("time")(e.createTime)
                    },
                    value: function (e) {
                        return e.name
                    }
                }))
            }), e
        }(), o.loadBalance = function () {
            var e = {};
            return e.collection = function () {
                var e = {};
                return e.list = function () {
                    return i("GET", "/api/loadBalancerCollection/list")().then(function (e) {
                        return (e || []).map(function (e) {
                            return {
                                id: e.id,
                                name: e.name,
                                description: e.description,
                                creatorName: e.creatorName,
                                creatorId: e.creatorId,
                                createTime: e.createTime,
                                type: e.lbcType,
                                loadBalancerCount: e.loadBalancerCount,
                                memberCount: e.memberCount,
                                role: e.role
                            }
                        })
                    })
                }, e.getById = function (e) {
                    return i("GET", "/api/loadBalancerCollection/" + e)().then(function (e) {
                        return {
                            id: e.id,
                            name: e.name,
                            description: e.description,
                            creatorName: e.creatorName,
                            creatorId: e.creatorId,
                            createTime: e.createTime,
                            type: e.lbcType,
                            role: e.role
                        }
                    })
                }, e.create = function (e) {
                    return i("POST", "/api/loadBalancerCollection")({
                        name: e.name,
                        description: e.description,
                        type: e.type
                    })
                }, e.update = function (e) {
                    return i("PUT", "/api/loadBalancerCollection")({
                        id: e.id,
                        name: e.name,
                        description: e.description,
                        type: e.type
                    })
                }, e.delete = function (e) {
                    return i("DELETE", "/api/loadBalancerCollection/" + e)()
                }, e
            }(), e.loadBalance = function () {
                var e = {};
                return e.create = function (e) {
                    return i("POST", "/api/loadBalancer")({
                        lbcId: e.collectionId,
                        name: e.name,
                        description: e.description,
                        type: e.type,
                        clusterId: e.cluster.id,
                        namespace: e.namespace.namespace,
                        externalIPs: "EXTERNAL_SERVICE" === e.type ? e.externalIPs : (e.nginxDraft.nodeDraft || []).map(function (e) {
                            return e.ip
                        }),
                        serviceDraft: function () {
                            var n = {};
                            return "EXTERNAL_SERVICE" === e.type ? (n.lbPorts = e.serviceDraft.lbPorts, n.sessionAffinity = e.serviceDraft.sessionAffinity, n.deployId = e.serviceDraft.deployment.deployId, n.deployName = e.serviceDraft.deployment.deployName, n.deployStatus = e.serviceDraft.deployment.deployStatus) : n = null, n
                        }(),
                        nginxDraft: function () {
                            var n = {};
                            return "NGINX" === e.type ? (n.listenPort = e.nginxDraft.listenPort, n.registry = e.nginxDraft.registry, n.image = e.nginxDraft.image, n.tag = e.nginxDraft.tag, n.lbMethod = e.nginxDraft.lbMethod, n.cpu = e.nginxDraft.cpu, n.mem = e.nginxDraft.mem, n.selectors = "TEST" === e.nginxDraft.hostEnv ? [{
                                name: "TESTENV",
                                content: "HOSTENVTYPE"
                            }] : [{
                                name: "PRODENV",
                                content: "HOSTENVTYPE"
                            }], n.volumeConsole = function () {
                                return "EMPTYDIR" === e.nginxDraft.volumeConsole.volumeType ? null : "HOSTPATH" === e.nginxDraft.volumeConsole.volumeType ? {
                                    readonly: !1,
                                    hostPath: e.nginxDraft.volumeConsole.hostPath,
                                    volumeType: e.nginxDraft.volumeConsole.volumeType
                                } : null
                            }(), n.rules = e.nginxDraft.rules && 0 !== e.nginxDraft.rules.length ? e.nginxDraft.rules.map(function (e) {
                                return {
                                    domain: e.domain,
                                    deployId: e.deployment.deployId,
                                    deployName: e.deployment.deployName,
                                    deployStatus: e.deployment.deployStatus,
                                    serviceName: e.deployment.innerServiceName,
                                    servicePort: e.servicePort
                                }
                            }) : null) : n = null, n
                        }()
                    }).then(function () {
                        if ("NGINX" === e.type && e.namespace && e.namespace.namespace && !e.namespace.isExistentNamespace) {
                            var n = [e.namespace.namespace];
                            o.cluster.setNamespace(e.cluster.id, n)
                        }
                    })
                }, e.listAll = function () {
                    return i("GET", "/api/loadBalancer/list")().then(function (e) {
                        return (e || []).filter(function (e) {
                            return "NGINX" === e.type
                        }).map(function (e) {
                            return {
                                deployId: e.id,
                                deployName: e.name,
                                type: e.type,
                                clusterName: e.clusterName,
                                namespace: e.namespace,
                                lastUpdateTime: e.lastUpdateTime,
                                createTime: e.createTime,
                                dnsName: e.dnsName,
                                state: e.state,
                                deletable: e.deletable,
                                cpuTotal: e.cpuTotal,
                                cpuUsed: e.cpuUsed,
                                memoryTotal: e.memoryTotal,
                                memoryUsed: e.memoryUsed,
                                hostEnv: (e.selectors || []).some(function (e) {
                                    return "PRODENV" === e.name
                                }) ? "PROD" : "TEST"
                            }
                        })
                    })
                }, e.list = function (e) {
                    return i("GET", "/api/loadBalancer/list/" + e)().then(function (e) {
                        return (e || []).map(function (e) {
                            return {
                                id: e.id,
                                name: e.name,
                                type: e.type,
                                clusterName: e.clusterName,
                                namespace: e.namespace,
                                lastUpdateTime: e.lastUpdateTime,
                                createTime: e.createTime,
                                dnsName: e.dnsName,
                                state: e.state,
                                deletable: e.deletable,
                                cpuTotal: e.cpuTotal,
                                cpuUsed: e.cpuUsed,
                                memoryTotal: e.memoryTotal,
                                memoryUsed: e.memoryUsed,
                                resourcePercent: function () {
                                    var n = e.cpuTotal ? Math.max(0, e.cpuUsed / e.cpuTotal) : 0,
                                        t = e.memoryTotal ? Math.max(0, e.memoryUsed / e.memoryTotal) : 0;
                                    return n > t ? {
                                        value: "cpu",
                                        text: "CPU",
                                        cpuTotal: e.cpuTotal,
                                        cpuUsed: e.cpuUsed,
                                        percent: n
                                    } : {
                                        value: "memory",
                                        text: "内存",
                                        memoryTotal: e.memoryTotal,
                                        memoryUsed: e.memoryUsed,
                                        percent: t
                                    }
                                }()
                            }
                        })
                    })
                }, e.listDeployment = function (e, n, t) {
                    return i("GET", "/api/loadBalancer/deploy/list?clusterId=" + e + "&namespace=" + n + "&lbType=" + t)()
                }, e.getById = function (e) {
                    return i("GET", "/api/loadBalancer/id/" + e)().then(function (e) {
                        return e.nginxDraft ? (e.nginxDraft.rules = (e.nginxDraft.rules || []).map(function (e) {
                            return {
                                domain: e.domain,
                                deployId: e.deployId,
                                deployName: e.deployName,
                                deployStatus: e.deployStatus,
                                serviceName: e.serviceName,
                                servicePort: e.servicePort,
                                deployment: {
                                    deployId: e.deployId,
                                    deployName: e.deployName,
                                    deployStatus: e.deployStatus
                                }
                            }
                        }), e.nginxDraft.currentVersions && (e.nginxDraft.currentVersions = e.nginxDraft.currentVersions.map(function (e) {
                            return e.nodeDraft = (e.externalIPs || []).map(function (e) {
                                return {
                                    ip: e
                                }
                            }), e.hostEnv = (e.selectors || []).some(function (e) {
                                return "PRODENV" === e.name
                            }) ? "PROD" : "TEST", e.volumeDraft = e.volumeDraft ? e.volumeDraft : {
                                volumeType: "EMPTYDIR"
                            }, e
                        }))) : e.serviceDraft && (e.serviceDraft.deployment = {
                            deployId: e.serviceDraft.deployId,
                            deployName: e.serviceDraft.deployName,
                            deployStatus: e.serviceDraft.deployStatus
                        }, e.serviceDraft.sessionAffinity = String(e.serviceDraft.sessionAffinity)), e
                    })
                }, e.delete = function (e) {
                    return i("DELETE", "/api/loadBalancer/id/" + e)()
                }, e.update = function (e) {
                    return i("PUT", "/api/loadBalancer")({
                        lbcId: e.lbcId,
                        id: e.id,
                        name: e.name,
                        description: e.description,
                        type: e.type,
                        clusterId: e.clusterId,
                        namespace: e.namespace,
                        externalIPs: e.externalIPs,
                        serviceDraft: function () {
                            var n = {};
                            return "EXTERNAL_SERVICE" === e.type ? (n.lbPorts = e.serviceDraft.lbPorts, n.sessionAffinity = e.serviceDraft.sessionAffinity, n.deployId = e.serviceDraft.deployment.deployId, n.deployName = e.serviceDraft.deployment.deployName, n.deployStatus = e.serviceDraft.deployment.deployStatus) : n = null, n
                        }(),
                        nginxDraft: function () {
                            var n = {};
                            return "NGINX" === e.type ? n.rules = (e.nginxDraft.rules || []).map(function (e) {
                                return {
                                    domain: e.domain,
                                    deployId: e.deployment.deployId,
                                    deployName: e.deployment.deployName,
                                    deployStatus: e.deployment.deployStatus,
                                    serviceName: e.deployment.innerServiceName,
                                    servicePort: e.servicePort
                                }
                            }) : n = null, n
                        }()
                    })
                }, e.listInstance = function (e) {
                    return i("GET", "/api/loadBalancer/instance/list/" + e)()
                }, e.restartInstance = function (e, n) {
                    return i("DELETE", "/api/loadBalancer/instance/" + e + "?instanceName=" + n)()
                }, e.updateDescription = function (e, n) {
                    return i("PUT", "/api/loadBalancer/id/" + e + "/description")(n)
                }, e.listEvent = function (e) {
                    return i("GET", "/api/loadBalancer/event/list/" + e)()
                }, e
            }(), e.version = function () {
                var e = {};
                return e.listVersion = function (e) {
                    return i("GET", "/api/loadBalancer/version/list/" + e)()
                }, e.getVersionById = function (e, n) {
                    return i("GET", "/api/loadBalancer/version/id/" + e + "/" + n)().then(function (e) {
                        return e.nodeDraft = (e.externalIPs || []).map(function (e) {
                            return {
                                ip: e
                            }
                        }), e.hostEnv = (e.selectors || []).some(function (e) {
                            return "PRODENV" === e.name
                        }) ? "PROD" : "TEST", e.volumeDraft = e.volumeDraft ? e.volumeDraft : {
                            volumeType: "EMPTYDIR"
                        }, e
                    })
                }, e.create = function (e, n) {
                    return i("POST", "/api/loadBalancer/version/" + e)({
                        listenPort: n.listenPort,
                        externalIPs: (n.nodeDraft || []).map(function (e) {
                            return e.ip
                        }).filter(function (e) {
                            return null != e
                        }),
                        registry: n.registry,
                        image: n.image,
                        tag: n.tag,
                        lbMethod: n.lbMethod,
                        cpu: n.cpu,
                        mem: n.mem,
                        deployIdForLB: n.deployIdForLB,
                        selectors: "TEST" === n.hostEnv ? [{
                            name: "TESTENV",
                            content: "HOSTENVTYPE"
                        }] : [{
                            name: "PRODENV",
                            content: "HOSTENVTYPE"
                        }],
                        volumeDraft: function () {
                            return "EMPTYDIR" === n.volumeDraft.volumeType ? null : "HOSTPATH" === n.volumeDraft.volumeType ? {
                                readonly: !1,
                                hostPath: n.volumeDraft.hostPath,
                                volumeType: n.volumeDraft.volumeType
                            } : null
                        }()
                    })
                }, e
            }(), e.action = function () {
                var e = {};
                return e.rollback = function (e, n) {
                    return i("POST", "/api/loadBalancer/action/rollback/" + e + "/" + n)()
                }, e.scale = function (e, n, t) {
                    return i("POST", "/api/loadBalancer/action/scales/" + e + "/" + n)(t)
                }, e.start = function (e, n) {
                    return i("POST", "/api/loadBalancer/action/start/" + e + "/" + n)()
                }, e.stop = function (e) {
                    return i("POST", "/api/loadBalancer/action/stop/" + e)()
                }, e.update = function (e, n) {
                    return i("POST", "/api/loadBalancer/action/update/" + e + "/" + n)()
                }, e
            }(), e
        }(), o.listItem = function () {
            var e = {};
            return e.nodeByLabels = function (e) {
                var n = [],
                    t = {
                        TEST: {
                            name: "TESTENV",
                            content: "HOSTENVTYPE"
                        },
                        PROD: {
                            name: "PRODENV",
                            content: "HOSTENVTYPE"
                        }
                    };
                n = n.filter(function (e) {
                    return "HOSTENVTYPE" !== e.content
                }).concat(t[e.hostEnv]);
                var r = (n || []).reduce(function (e, n) {
                        return e[n.name] = n.content, e
                    }, {}),
                    o = encodeURIComponent(JSON.stringify(r));
                return i("GET", "/api/cluster/" + e.clusterId + "/nodelistwithlabels?labels=" + o)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            value: {
                                name: e.name,
                                ip: e.ip,
                                status: e.status,
                                runningPodsCount: e.runningPods,
                                capacity: e.capacity,
                                disk: e.disk,
                                createTime: e.createTime,
                                labels: e.labels
                            },
                            text: e.ip,
                            remark: "名称：" + e.name + " 状态：" + e.status,
                            match: {
                                ip: e.ip
                            }
                        }
                    }).filter(function (e) {
                        return "Ready" === e.value.status
                    })
                })
            }, e.loadBalanceDeployment = function (e) {
                return i("GET", "/api/loadBalancer/deploy/list?clusterId=" + e.clusterId + "&namespace=" + e.namespace + "&lbType=" + e.loadBalanceType)().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            value: e,
                            text: e.deployName,
                            match: {
                                deployName: e.deployName
                            }
                        }
                    })
                })
            }, e.storageByClusterIdAndNamespace = function (e) {
                return i("GET", "/api/storage/cluster/" + e.clusterId + "/" + e.namespace + "/volume")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            value: {
                                id: e.storageVolumeDraft.id,
                                name: e.storageVolumeDraft.name,
                                description: e.storageVolumeDraft.description,
                                clusterId: e.storageVolumeDraft.clusterId,
                                clusterName: e.storageVolumeDraft.clusterName,
                                namespace: e.storageVolumeDraft.namespace,
                                labels: e.storageVolumeDraft.labels,
                                capacity: e.storageVolumeDraft.capacity,
                                accessMode: e.storageVolumeDraft.accessMode,
                                readOnly: e.storageVolumeDraft.readOnly,
                                reclaimPolicy: e.storageVolumeDraft.reclaimPolicy,
                                glusterfsDraft: e.storageVolumeDraft.glusterfsDraft,
                                cephfsDraft: e.storageVolumeDraft.cephfsDraft,
                                rbdDraft: e.storageVolumeDraft.rbdDraft,
                                creatorInfo: e.creatorInfo,
                                status: e.status,
                                storageType: e.storageVolumeDraft.storageType
                            },
                            text: e.storageVolumeDraft.name,
                            remark: "状态：" + e.status + "/类型：" + e.storageVolumeDraft.storageType,
                            match: {
                                name: e.storageVolumeDraft.name
                            }
                        }
                    })
                })
            }, e.foreignServiceIPByClusterId = function (e) {
                return i("GET", "/api/cluster/" + e.clusterId + "/nodelist")().then(function (e) {
                    return (e || []).map(function (e) {
                        return {
                            value: e.ip,
                            text: e.ip,
                            remark: "主机：" + e.name + " 状态：" + e.status,
                            match: e.ip
                        }
                    })
                })
            }, e
        }(), o
    }]), e.factory("userFriendlyMessage", [function () {
        var e = [{
            pattern: /^.*FORBIDDEN.*$/,
            message: "抱歉，您没有权限操作该项目。"
        }];
        return function (n) {
            return e.forEach(function (e) {
                n = n.replace(e.pattern, e.message)
            }), n
        }
    }])
}(angular.module("backendApi", ["constant"]));
"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
    return typeof n
} : function (n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
};
! function (n) {
    n.component("pageTitle", {
        template: "",
        bindings: {
            pageTitle: "@"
        },
        controller: ["$scope", "$rootScope", function (n, t) {
            var e = this;
            n.$watch("$ctrl.pageTitle", function () {
                t.$emit("pageTitle", {
                    title: e.pageTitle
                })
            })
        }]
    }), n.component("pageContainer", {
        template: '\n      <div class="page-container new-layout" ng-transclude></div>\n    ',
        transclude: !0,
        bindings: {},
        controller: [function () {}]
    }), n.component("pageSummaryBox", {
        template: '\n      <div class="page-summary-box">\n        <div class="page-summary-box-content" ng-transclude></div>\n      </div>\n    ',
        transclude: !0,
        bindings: {},
        controller: [function () {}]
    }), n.component("pageSummaryLogo", {
        template: '\n      <div class="page-summary-logo">\n        <div class="page-summary-logo-wrapper">\n          <img ng-src="{{ $ctrl.fallback }}" ng-if="$ctrl.fallback" />\n          <img ng-src="{{ $ctrl.logo }}" onerror="this.style.display = \'none\'" onload="this.style.display = \'block\'" />\n        </div>\n      </div>\n    ',
        bindings: {
            logo: "@",
            fallback: "@?"
        },
        controller: [function () {}]
    }), n.component("pageSummaryItem", {
        template: '\n      <div class="page-summary-item">\n        <div class="page-summary-item-title" ng-bind="$ctrl.text"></div>\n        <div class="page-summary-item-content" ng-transclude></div>\n      </div>\n    ',
        transclude: !0,
        bindings: {
            text: "@"
        },
        controller: [function () {}]
    }), n.component("pageSummaryContent", {
        template: '\n      <div class="page-summary-content-container">\n        <div class="page-summary-content" ng-transclude></div>\n      </div>\n    ',
        transclude: !0,
        bindings: {},
        controller: [function () {}]
    }), n.directive("pageContentBox", ["$parse", function (n) {
        return {
            template: '\n        <div class="page-content-box">\n          <ul class="page-tab-list" ng-if="_$tabs && _$tabs.length">\n            <li class="page-tab-item" ng-repeat="tab in _$tabs" ng-class="{ \'page-tab-item-active\': _$currentPage().page === tab.page }">\n              <a ui-sref="{ page: tab.page }" ng-click="_$gotoPage(tab); $event.stopPropagation()" ng-bind="tab.text"></a>\n            </li>\n          </ul>\n          <div class="page-content-container" ng-if="!_$tabs || !_$tabs.length" ng-transclude></div>\n          <div class="page-content-tab-container"  ng-if="_$tabs && _$tabs.length">\n            <div class="page-content-container" ng-repeat="tab in _$tabs" ng-if="_$loadedPages.indexOf(tab.page) !== -1" ng-show="_$currentPage().page === tab.page" ng-include="tab.html"></div>\n          </div>\n        </div>\n      ',
            scope: !0,
            transclude: !0,
            link: function (t, e, o) {
                var a = function () {
                        (t._$tabs || []).forEach(function (n) {
                            n.lazy === !1 && t._$loadedPages.indexOf(n.page) === -1 && t._$loadedPages.push(n.page)
                        })
                    },
                    i = n(o.tabs);
                t._$tabs = i(), t.$watch(i, function () {
                    t._$tabs = i(), a()
                })
            },
            controller: ["$state", "$scope", function (n, t) {
                t._$loadedPages = [], t._$currentPage = function () {
                    var e = function () {
                        var e = n.params.page,
                            o = (t._$tabs || []).filter(function (n) {
                                return n.page === e
                            });
                        if (o.length) return o[0];
                        var a = (t._$tabs || []).filter(function (n) {
                            return n.default
                        });
                        if (a.length) return a[0];
                        var i = (t._$tabs || []).filter(function (n) {
                            return "" === n.page
                        });
                        return i.length ? i[0] : t._$tabs[0]
                    }();
                    return t._$loadedPages.indexOf(e.page) === -1 && t._$loadedPages.push(e.page), e
                }, t._$gotoPage = function (t) {
                    n.go(n.current.name, {
                        page: t.page
                    }, {
                        notify: !1
                    })
                }
            }]
        }
    }]), n.factory("dialog", ["api", "$compile", "$rootScope", "$controller", "$timeout", "userFriendlyMessage", function (n, t, e, o, a, i) {
        var l = {},
            r = 0;
        l.button = {
            BUTTON_OK: 1,
            BUTTON_YES: 2,
            BUTTON_NO: 4,
            BUTTON_RETRY: 8,
            BUTTON_ABORT: 16,
            BUTTON_IGNORE: 32,
            BUTTON_CANCEL: 128
        }, l.secondaryButtons = [l.button.BUTTON_NO, l.button.BUTTON_ABORT, l.button.BUTTON_IGNORE, l.button.BUTTON_CANCEL], l.buttons = {
            BUTTON_EMPTY: 0,
            BUTTON_OK_ONLY: l.button.BUTTON_OK,
            BUTTON_OK_CANCEL: l.button.BUTTON_OK | l.button.BUTTON_CANCEL,
            BUTTON_YES_NO: l.button.BUTTON_YES | l.button.BUTTON_NO,
            BUTTON_YES_NO_CANCEL: l.button.BUTTON_YES | l.button.BUTTON_NO | l.button.BUTTON_CANCEL,
            BUTTON_RETRY_CANCEL: l.button.BUTTON_RETRY | l.button.BUTTON_CANCEL,
            BUTTON_ABORT_RETRY_IGNORE: l.button.BUTTON_ABORT | l.button.BUTTON_RETRY | l.button.BUTTON_CANCEL
        }, l.common = function (i) {
            var u = i.title,
                s = i.buttons,
                c = i.value,
                g = i.template,
                d = i.templateUrl,
                b = i.controller,
                p = i.size,
                T = i.mayEscape,
                m = void 0 === T || T,
                f = i.autoclose,
                _ = void 0 !== f && f,
                v = i.warning,
                O = void 0 !== v && v,
                N = i.form;
            "number" == typeof s && (s = Object.keys(l.button).sort(function (n, t) {
                return l.button[n] - l.button[t]
            }).filter(function (n) {
                return l.button[n] & s
            }).map(function (n) {
                return {
                    text: {
                        BUTTON_OK: "确定",
                        BUTTON_YES: "是",
                        BUTTON_NO: "否",
                        BUTTON_RETRY: "重试",
                        BUTTON_ABORT: "中止",
                        BUTTON_IGNORE: "忽略",
                        BUTTON_CANCEL: "取消"
                    }[n],
                    value: l.button[n],
                    secondary: l.secondaryButtons.indexOf(l.button[n]) !== -1
                }
            }));
            var y = angular.element('\n        <div class="dialog-container new-layout dialog-hidden" id="{{ id }}">\n          <div class="dialog-cover"></div>\n          <div class="dialog-box" ng-cloak>\n            <div class="dialog-title" ng-bind="title"></div>\n              <div class="dialog-content"></div>\n            <div class="dialog-buttons" ng-if="buttons.length">\n              <form-button-group>\n                <button type="button" ng-repeat="button in buttons"\n                  ng-click="close(button.value)"\n                  ng-bind="button.text"\n                  ng-class="{ \'secondary-button\': button.secondary }"\n                ></button>\n              </form-button-group>\n            </div>\n          </div>\n        </div>\n      ');
            if (N) {
                angular.element(".dialog-box", y).wrap('<form name="' + N + '"></form>')
            }
            var B = angular.element(".dialog-box", y);
            "number" == typeof p ? B.css({
                width: p + "px"
            }) : "string" == typeof p ? B.css({
                width: p
            }) : B.addClass("dialog-box-with-auto"), O && B.addClass("dialog-warning");
            var $ = angular.element(".dialog-content", y);
            g ? $.html(g) : d && $.html(angular.element("<div></div>").attr("ng-include", d));
            var U = null,
                E = e.$new(!0);
            b && (E.$ctrl = b), E.title = u || "", E.buttons = s || [], E.value = c || void 0, E.form = N || void 0, Object.defineProperty(E, "resolve", {
                enumerable: !0,
                configurable: !1,
                writable: !1,
                value: function (t) {
                    n.SimplePromise.resolve(t).then(function (n) {
                        n !== !1 && (h(), U(t))
                    })
                }
            }), Object.defineProperty(E, "close", {
                enumerable: !0,
                configurable: !1,
                writable: !1,
                value: function (n) {
                    var t = !0;
                    N && n === l.button.BUTTON_OK && (E[N].$submitted = !0, !E[N].$valid) || ("function" == typeof E.onbeforeclose && (t = E.onbeforeclose(n)), t !== !1 && E.resolve(n))
                }
            }), E.onbeforeclose = function () {}, E.id = "dialog_" + ++r, y.appendTo(document.body), b && o(b, {
                $scope: E
            }), t(y)(E);
            var C = function () {},
                h = function () {
                    var n = !1;
                    return function () {
                        n || (n = !0, y.addClass("dialog-hidden"), a(function () {
                            y.remove(), E.$destroy(), C()
                        }, 200))
                    }
                }();
            if (m) {
                var R = angular.element(".dialog-cover", y),
                    S = function (n) {
                        27 === n.keyCode && E.close(void 0)
                    },
                    w = function () {
                        E.close(void 0)
                    };
                R.on("click", w), angular.element(document).on("keyup", S), C = function () {
                    R.off("click", w), angular.element(document).off("keyup", S)
                }
            }
            if (_) {
                var x = "number" == typeof _ ? _ : 2e3;
                a(E.close, x + 200)
            }
            return a(function () {
                y.removeClass("dialog-hidden"), a(function () {
                    (y[0].querySelector("input[autofocuse]") || y[0].querySelector("input") || y[0]).focus()
                }, 200)
            }), new n.SimplePromise(function (n, t) {
                U = n
            })
        }, l.msgbox = function (n) {
            var t = n.title,
                e = n.message,
                o = n.buttons,
                a = n.autoclose,
                r = void 0 !== a && a,
                u = n.warning,
                s = void 0 !== u && u;
            return l.common({
                title: t,
                buttons: o,
                autoclose: r,
                warning: s,
                value: i(e),
                template: '<span class="dialog-message" ng-bind-html="value"></span>'
            })
        };
        var u = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                e = t.autoclose,
                o = void 0 !== e && e,
                a = t.warning,
                i = void 0 !== a && a;
            return function (t, e) {
                if ("object" === (void 0 === t ? "undefined" : _typeof(t))) {
                    var a = t;
                    t = a.title, e = a.message
                }
                return l.msgbox({
                    title: t,
                    message: e,
                    buttons: n,
                    autoclose: o,
                    warning: i
                })
            }
        };
        return l.tip = u(l.buttons.BUTTON_EMPTY, {
            autoclose: !0
        }), l.alert = u(l.buttons.BUTTON_OK_ONLY), l.continue = u(l.buttons.BUTTON_OK_CANCEL), l.question = u(l.buttons.BUTTON_YES_NO), l.optquestion = u(l.buttons.BUTTON_YES_NO_CANCEL), l.retry = u(l.buttons.BUTTON_RETRY_CANCEL), l.no_one_need_this = u(l.buttons.BUTTON_ABORT_RETRY_IGNORE), l.error = u(l.buttons.BUTTON_OK_ONLY, {
            warning: !0
        }), l.danger = u(l.buttons.BUTTON_OK_CANCEL, {
            warning: !0
        }), l
    }])
}(angular.module("pageLayout", ["backendApi"]));
"use strict";

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
        return t
    }
    return Array.from(e)
}
var _slicedToArray = function () {
        function e(e, n) {
            var t = [],
                o = !0,
                l = !1,
                r = void 0;
            try {
                for (var i, a = e[Symbol.iterator](); !(o = (i = a.next()).done) && (t.push(i.value), !n || t.length !== n); o = !0);
            } catch (e) {
                l = !0, r = e
            } finally {
                try {
                    !o && a.return && a.return()
                } finally {
                    if (l) throw r
                }
            }
            return t
        }
        return function (n, t) {
            if (Array.isArray(n)) return n;
            if (Symbol.iterator in Object(n)) return e(n, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
! function (e) {
    var n = function () {
            var e = Date.now(),
                n = function () {
                    return Math.random().toString(36)[4] || "0"
                };
            return function () {
                var t = [].concat(_toConsumableArray(Array(8))).map(n).join("").toUpperCase();
                return "AUTO_GENERATED_INDEX_" + ++e + "_" + t
            }
        }(),
        t = function (e, n) {
            var t = [];
            return n.$on("$destory", function () {
                    t.forEach(function (n) {
                        return e.cancel(n)
                    })
                }),
                function (n) {
                    for (var o = arguments.length, l = Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) l[r - 1] = arguments[r];
                    var i = e.call.apply(e, [this, function () {
                            t.splice(a, 1), n.apply(this, arguments)
                        }].concat(l)),
                        a = t.push(i) - 1
                }
        },
        o = function (e, n) {
            return t.apply(this, arguments)
        },
        l = function (e) {
            var n = [];
            return e.$on("$destory", function () {
                    n.forEach(function (e) {
                        return e()
                    })
                }),
                function (e) {
                    n.push()
                }
        };
    e.component("debugger", {
            template: '\n      <div class="debugger-container" ng-if="$ctrl.debuggerEnabled">\n        <span class="debugger-title" style="font-weight: bold" ng-if="$ctrl.text" ng-bind="$ctrl.text"></span>\n        <span class="debugger-content" ng-bind="$ctrl.result"></span>\n      </div>\n    ',
            bindings: {
                text: "@",
                value: "<?"
            },
            controller: ["$scope", function (e) {
                var n = this;
                n.debuggerEnabled = ["localhost", "127.0.0.1"].indexOf(location.hostname) !== -1 || !!localStorage.debuggerEnabled;
                var t = function () {
                    if ("uneval" in window) return window.uneval;
                    var e = function e(n, t) {
                        try {
                            if (void 0 === n) return "(void 0)";
                            if (null === n) return "null";
                            if (null == n) throw "not support undetectable";
                            if (0 === n && 1 / n == -(1 / 0)) return "-0";
                            if ("number" == typeof n) return Number.prototype.toString.call(n);
                            if ("boolean" == typeof n) return Boolean.prototype.toString.call(n);
                            if ("string" == typeof n) return JSON.stringify(n);
                            if ("symbol" === (void 0 === n ? "undefined" : _typeof(n))) throw "symbol not supported";
                            if (!(n instanceof Object)) throw "not supported type";
                            if (n instanceof Number) return "(new Number(" + e(Number.prototype.valueOf.call(n)) + "))";
                            if (n instanceof String) return "(new String(" + e(String.prototype.valueOf.call(n)) + "))";
                            if (n instanceof Boolean) return "(new Boolean(" + e(Boolean.prototype.valueOf.call(n)) + "))";
                            if (n instanceof RegExp) return n.toString();
                            if (n instanceof Date) return "(new Date(" + e(Date.prototype.valueOf(n)) + "))";
                            if (n instanceof Error) return "(new Error(" + e(n.message) + "))";
                            if (n instanceof Symbol) throw "symbol not supported";
                            if (n instanceof Function) {
                                var o = "" + n;
                                return !!o.replace(/\s/g, "").match(/function[^(]*\(\)\{\[nativecode\]\}/) ? '(function () { "native ${obj.name} function" })' : "(" + o + ")"
                            }
                            if (t.indexOf(n) !== -1) return n instanceof Array ? "[]" : "({})";
                            var l = t.concat([n]);
                            if (n instanceof Array) {
                                if (0 === n.length) return "[]";
                                var r = !(n.length - 1 in n);
                                return "[" + n.map(function (n) {
                                    return e(n, l)
                                }).join(", ") + (r ? "," : "") + "]"
                            }
                            if (n instanceof Object) {
                                return "({" + Object.keys(n).filter(function (e) {
                                    return "$" !== e[0]
                                }).map(function (t) {
                                    return JSON.stringify(t) + ": " + e(n[t], l)
                                }).join(", ") + "})"
                            }
                        } catch (e) {
                            return '(void ("uneval not supported: ' + JSON.stringify(e.message).slice(1) + "))"
                        }
                    };
                    return function (n) {
                        return e(n, [])
                    }
                }();
                e.$watch("$ctrl.value", function () {
                    n.result = t(n.value)
                }, !0)
            }]
        }), e.component("icon", {
            template: "\n      <i class=\"\n        icon icon16 icon-{{ $ctrl.name || 'custom' }}\n        fa icon-fa fa-{{ $ctrl.type }}\n        {{ $ctrl.disabled ? 'icon-disabled' : '' }}\n      \" ng-style=\"{\n        color: $ctrl.disabled ? '#cccccc' : ($ctrl.color || '#777')\n      }\"></i>\n    ",
            bindings: {
                name: "@?",
                type: "@",
                color: "@?",
                disabled: "@?"
            },
            controller: [function () {}]
        }), e.component("iconGroup", {
            template: '<div class="icon-group-container" ng-transclude></div>',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }),
        function () {
            var n = {
                    danger: "#f05050",
                    active: "#29b6f6",
                    gitlab: "#ff9800",
                    ok: "#4bd396",
                    cancel: "#f05050",
                    close: "#777",
                    placeholder: "#ddd",
                    text: "#777",
                    info: "#aaa",
                    edit: "#188ae2",
                    button: "#fff"
                },
                t = [{
                    name: "delete",
                    type: "trash-o",
                    color: n.danger
                }, {
                    name: "details",
                    type: "ellipsis-v"
                }, {
                    name: "transfer",
                    type: "external-link",
                    color: n.active
                }, {
                    name: "stop",
                    type: "stop",
                    color: n.danger
                }, {
                    name: "info",
                    type: "info-circle"
                }, {
                    name: "edit",
                    type: "pencil",
                    color: n.edit
                }, {
                    name: "gitlab",
                    type: "gitlab",
                    color: n.gitlab
                }, {
                    name: "save",
                    type: "floppy-o",
                    color: n.ok
                }, {
                    name: "cancel",
                    type: "times",
                    color: n.cancel
                }, {
                    name: "close",
                    type: "times",
                    color: n.close
                }, {
                    name: "search",
                    type: "search",
                    color: n.placeholder
                }, {
                    name: "drop-down",
                    type: "caret-down",
                    color: n.text
                }, {
                    name: "clipboard",
                    type: "clipboard"
                }, {
                    name: "download",
                    type: "download"
                }, {
                    name: "file",
                    type: "file-text-o",
                    color: n.active
                }, {
                    name: "document",
                    type: "file-o"
                }, {
                    name: "user",
                    type: "user-o"
                }, {
                    name: "nav-switch",
                    type: "bars"
                }, {
                    name: "right-arrow",
                    type: "angle-right"
                }, {
                    name: "down-arrow",
                    type: "angle-down"
                }, {
                    name: "list",
                    type: "list-alt",
                    color: n.active
                }, {
                    name: "plus",
                    type: "plus"
                }, {
                    name: "setting",
                    type: "cog"
                }],
                o = {};
            t.forEach(function (n) {
                var t = n.name,
                    l = n.type,
                    r = n.color;
                o[t] = n, void 0 === r && (r = "inherit");
                var i = ("icon-" + t).replace(/./g, function (e) {
                        return e !== e.toLowerCase() ? "-" + e.toLowerCase() : e
                    }).replace(/[-_\s]+(\w)/g, function (e, n) {
                        return n.toUpperCase()
                    }),
                    a = i.replace(/./g, function (e) {
                        return e !== e.toLowerCase() ? "-" + e.toLowerCase() : e
                    });
                e.component(i, {
                    template: '\n          <icon name="' + a + '" type="' + l + '" color="' + r + "\" disabled=\"{{ $ctrl.disabled ? 'disabled' : '' }}\"></icon>\n        ",
                    bindings: {
                        disabled: "@?"
                    },
                    controller: [function () {}]
                })
            }), e.component("iconByName", {
                template: '\n        <icon name="icon-{{ $ctrl.name }}" type="{{ $ctrl.type }}" color="{{ $ctrl.color }}" disabled="{{ $ctrl.disabled ? \'disabled\' : \'\' }}"></icon>\n      ',
                bindings: {
                    disabled: "@?",
                    name: "@"
                },
                controller: ["$scope", function (e) {
                    var n = this;
                    e.$watch("$ctrl.name", function () {
                        if (n.name in o) {
                            var e = o[n.name];
                            n.type = e.type, n.color = e.color
                        }
                    })
                }]
            })
        }(), e.component("titleLine", {
            template: '\n      <div class="title-line">\n        <div class="title-container"><h2 class="content-title" ng-bind="$ctrl.text"></h2></div>\n        <div class="title-line-remaind" ng-transclude></div>\n      </div>\n    ',
            transclude: !0,
            bindings: {
                text: "@",
                param: "=?"
            },
            controller: [function () {}]
        }), e.component("formContainer", {
            template: '\n      <style>\n        #{{ $ctrl.uniqueId }} .form-config-item-title  {\n          width: {{ $ctrl.leftWidth }}px;\n        }\n        #{{ $ctrl.uniqueId }} .form-config-item-wrapper {\n          max-width: {{ 2 * ($ctrl.leftWidth + $ctrl.requireWidth) + $ctrl.inputMaxWidth }}px;\n        }\n        #{{ $ctrl.uniqueId }} .form-config-item-wrapper .form-config-item-wrapper {\n          padding-right: 0;\n        }\n        #{{ $ctrl.uniqueId }} .form-config-item {\n          padding-left: {{ $ctrl.leftWidth + $ctrl.requireWidth }}px;\n          max-width: {{ $ctrl.leftWidth + $ctrl.requireWidth + $ctrl.inputMaxWidth }}px;\n        }\n      </style>\n      <div id="{{ $ctrl.uniqueId }}" class="form-container-inner new-layout" ng-cloak ng-transclude>\n      </div>\n    ',
            bindings: {
                leftColumnWidth: "@"
            },
            transclude: !0,
            controller: ["$scope", function (e) {
                var t = this;
                t.uniqueId = n(), t.defaultLeftWidth = 120, t.inputMaxWidth = 880, t.requireWidth = 28, e.$watch("$ctrl.leftColumnWidth", function () {
                    var e = parseInt(t.leftColumnWidth, 10);
                    t.leftWidth = Number.isFinite(e) && e >= 0 ? e : t.defaultLeftWidth
                })
            }]
        }), e.component("subFormContainer", {
            template: '\n      <form-container left-column-width="{{ $ctrl.leftColumnWidth }}">\n        <div class="sub-form-container" ng-transclude></div>\n      </form-container>\n    ',
            bindings: {
                leftColumnWidth: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formConfigGroup", {
            template: '\n      <div class="form-config-group-inner" ng-transclude>\n      </div>\n    ',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }), e.component("formButtonGroup", {
            template: '\n      <div class="form-config-group-inner form-config-button-group-inner" ng-transclude>\n      </div>\n    ',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }), e.component("formButtonCollection", {
            template: '\n      <div class="form-button-collection-container" ng-transclude>\n      </div>\n    ',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }), e.component("formConfigItem", {
            template: '\n      <div class="form-config-item-wrapper">\n        <div class="form-config-item" ng-class="{\'form-config-item-required\': $ctrl.required}">\n          <div class="form-config-item-title" ng-bind="$ctrl.configTitle"></div>\n          <div class="form-config-item-content" ng-transclude ng-cloak></div>\n        </div>\n      </div>\n    ',
            bindings: {
                required: "@",
                configTitle: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formErrorMessage", {
            template: '\n      <input type="hidden" ng-if="$ctrl.condition !== undefined" required ng-model="$ctrl.valid" />\n      <div class="form-input-error-message" ng-show="\n        $ctrl.form && $ctrl.target && (\n          $ctrl.form.$submitted &&\n          $ctrl.form[$ctrl.target] &&\n          $ctrl.form[$ctrl.target].$invalid &&\n          $ctrl.form[$ctrl.target].$error &&\n          (!$ctrl.type || $ctrl.form[$ctrl.target].$error[$ctrl.type])\n        ) ||\n        $ctrl.condition && $ctrl.form.$submitted\n      " ng-transclude></div>\n    ',
            bindings: {
                form: "<?",
                target: "@?",
                type: "@?",
                condition: "<?"
            },
            transclude: !0,
            controller: ["$scope", function (e) {
                var n = this;
                e.$watch("$ctrl.condition", function () {
                    n.valid = n.condition === !0 ? "" : "valid"
                })
            }]
        }), e.component("formSubmitButton", {
            template: '\n      <button type="submit" ng-transclude  ng-disabled="$ctrl.ngDisabled" ng-click=" $ctrl.validThenTriggerSubmit($event) "></button>\n    ',
            bindings: {
                form: "<",
                onSubmit: "&",
                ngDisabled: "<"
            },
            transclude: !0,
            controller: [function () {
                var e = this;
                e.validThenTriggerSubmit = function (n) {
                    e.form.$setSubmitted(), angular.forEach(e.form, function (n) {
                        n && n.$$parentForm === e.form && n.$setSubmitted && n.$setSubmitted()
                    }), e.form.$invalid || (e.onSubmit(), n.preventDefault(), n.stopPropagation())
                }
            }]
        }), e.component("formHelp", {
            template: '<span class="form-help-text" ng-transclude></span>',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }), e.component("formHelpLine", {
            template: '<div class="form-help-text form-help-text-line" ng-transclude></div>',
            bindings: {},
            transclude: !0,
            controller: [function () {}]
        }), e.component("formInputContainer", {
            template: '\n      <div class="form-input-container">\n        <form-help class="form-input-help-text-top" ng-if="$ctrl.helpText && ($ctrl.helpTextPosition || \'top\') === \'top\'">{{ $ctrl.helpText }}</form-help>\n        <div class="form-input-container-inner" ng-if="!($ctrl.helpText && $ctrl.helpTextPosition === \'right\')" ng-transclude></div>\n        <div class="form-input-container-inner form-multiple-inline-container" ng-if="($ctrl.helpText && $ctrl.helpTextPosition === \'right\')">\n          <div class="form-input-container-inner-options form-multiple-inline-item-replacement" ng-transclude></div>\n          <form-help class="form-input-help-text-right form-multiple-inline-item-replacement" ng-if="$ctrl.helpText && $ctrl.helpTextPosition === \'right\'">{{ $ctrl.helpText }}</form-help>\n        </div>\n        <form-help class="form-input-help-text-bottom" ng-if="$ctrl.helpText && $ctrl.helpTextPosition === \'bottom\'">{{ $ctrl.helpText }}</form-help>\n      </div>\n    ',
            bindings: {
                helpTextPosition: "@",
                helpText: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formLeftRight", {
            template: '\n      <div class="form-left-right-container">\n        <div class="form-left-right-wrapper">\n          <div class="form-left-right-left" ng-style="{ width: $ctrl.leftWidth }" ng-transclude="left"></div>\n          <div class="form-left-right-space"></div>\n          <div class="form-left-right-right" ng-style="{ width: $ctrl.rightWidth }" ng-transclude="right"></div>\n        </div>\n      </div>\n    ',
            bindings: {
                leftWidth: "@",
                rightWidth: "@"
            },
            transclude: {
                left: "left",
                right: "right"
            },
            controller: [function () {}]
        }), e.component("formMultipleInline", {
            template: "\n      <div\n        class=\"form-multiple-inline-container\"\n        ng-class=\"{\n          'form-multiple-inline-align-left': $ctrl.align === 'left',\n          'from-multiple-inline-for-search': $ctrl.contentType === 'search',\n         }\"\n        ng-transclude\n      ></div>\n    ",
            bindings: {
                align: "@",
                contentType: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formMultipleInlineItem", {
            template: '\n      <div class="form-multiple-inline-item-inner"\n        ng-transclude></div>\n    ',
            bindings: {
                width: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formMultipleOneLine", {
            template: '\n      <div class="form-multiple-one-line-container">\n        <div class="form-multiple-one-line-wrapper">\n        </div>\n      </div>\n    ',
            bindings: {
                align: "@"
            },
            transclude: !0,
            controller: [function () {}]
        }), e.component("formWithButton", {
            template: '\n      <div class="form-with-button-container">\n        <form-left-right right-width="{{ $ctrl.width || \'120px\' }}">\n          <left><div class="form-with-button-content" ng-transclude="content"></div></left>\n          <right><div class="form-with-button-button" ng-transclude="button"></div></right>\n        </form-left-right>\n      </div>\n    ',
            bindings: {
                width: "@"
            },
            transclude: {
                content: "contentArea",
                button: "buttonArea"
            },
            controller: [function () {}]
        }), e.component("formInputRadioGroup", {
            template: '\n      <div class="form-input-radio-container" ng-class="{ \'form-input-radio-as-card\': $ctrl.cardTemplate }">\n        <form-multiple-inline align="{{ $ctrl.width ? \'left\' : \'justify\' }}">\n          <form-multiple-inline-item class="form-input-radio-inner" width="{{ $ctrl.width }}" ng-repeat="option in $ctrl.options">\n            <label ng-if="option.value">\n              <span class="form-input-radio-option-container" ng-class="{ \'form-input-radio-option-checked\': $ctrl.value === option.value }">\n                <span class="form-input-radio-wrapper">\n                  <input class="form-input-radio" type="radio" name="{{ $ctrl.name }}" value="{{ option.value }}" ng-model="$ctrl.value" ng-required="!$ctrl.value && $ctrl.required" />\n                  <span class="form-input-radio-icon"></span>\n                </span>\n                <span class="form-input-radio-text" ng-bind="option.text" ng-if="!$ctrl.cardTemplate"></span>\n                <div class="form-input-radio-card" ng-include="$ctrl.cardTemplate" ng-if="$ctrl.cardTemplate" ng-repeat="item in [option]"></div>\n              </span>\n            </label>\n            <label ng-if="!option.value && !$ctrl.cardTemplate">\n              <span class="form-input-radio-option-container" ng-class="{ \'form-input-radio-option-checked\': $ctrl.value === $ctrl.customFakeValue }">\n                <span class="form-input-radio-wrapper">\n                  <input class="form-input-radio" type="radio" name="{{ $ctrl.name }}" value="{{ $ctrl.customFakeValue }}" ng-model="$ctrl.value" ng-required="!$ctrl.value && $ctrl.required" />\n                  <span class="form-input-radio-icon"></span>\n                </span>\n              <input class="form-input-radio-input" type="text" placeholder="{{ option.text }}" ng-model="$ctrl.customValue" ng-change="$ctrl.updateCustom" />\n              </span>\n            </label>\n          </form-multiple-inline-item>\n        </form-multiple-inline>\n      </div>\n    ',
            bindings: {
                name: "@",
                options: "<",
                ngModel: "=",
                onChange: "&",
                required: "@",
                fallbackValue: "<?",
                width: "@",
                cardTemplate: "@"
            },
            controller: ["$scope", "$timeout", function (e, o) {
                var l = this,
                    r = t(o, e);
                l.customValue = "", l.customFakeValue = n(), l.value = "", l.name || (l.name = n());
                var i = function (e) {
                        return angular.isArray(l.options) ? l.options.filter(function (n) {
                            return n.value === e
                        }).length ? "valid" : l.options.some(function (e) {
                            return !e.value
                        }) ? l.customFakeValue === e ? "fake" : "custom" : "" === e ? "empty" : "invalid" : null
                    },
                    a = function () {
                        var e = i(l.ngModel);
                        "invalid" !== e && "empty" !== e || u(), "custom" !== e && "fake" !== e && l.ngModel !== l.customValue || (l.customValue = l.ngModel, l.value = l.customFakeValue), "valid" === e && (l.value = l.ngModel)
                    },
                    c = function () {
                        l.ngModel = l.value = null, l.customValue = "", p()
                    },
                    s = function (e) {
                        if (e === !0 && (e = (l.options[0] || {}).value), e || (e = null), angular.isArray(e)) return e.some(u);
                        var n = null === e ? "null" : i(e);
                        return null !== n ? "invalid" !== n && "fake" !== n && ("custom" === n && (l.ngModel = l.customValue = e, l.value = l.customFakeValue, p()), "valid" === n && (l.ngModel = l.value = e, p()), "null" !== n && "empty" !== n || c(), !0) : void 0
                    },
                    u = function () {
                        s(l.fallbackValue) || c()
                    },
                    d = function () {
                        var e = i(l.value);
                        null !== e && ("invalid" !== e && "custom" !== e && "empty" !== e || u(), "fake" === e && (l.ngModel = l.customValue, p()), "valid" === e && (l.ngModel = l.value, p()))
                    },
                    m = function () {
                        var e = i(l.value);
                        null !== e && ("invalid" === e && u(), "custom" === e && (l.customValue = l.value, l.value = l.customFakeValue), "fake" === e && "valid" === i(l.ngModel) && (l.value = l.ngModel, l.customValue = ""), "empty" === e && u(), d())
                    };
                l.updateCustom = function (e, n) {
                    l.value = l.customFakeValue, d()
                };
                var p = function () {
                    r(function () {
                        return l.onChange()
                    }, 0)
                };
                a(), e.$watch("$ctrl.ngModel", a), e.$watch("$ctrl.value", d), e.$watch("$ctrl.options", m)
            }]
        }), e.component("formInputRadioCardSample", {
            template: '\n      <span class="form-input-radio-card-sample" style="display: block;">\n        <span style="display: block; font-weight: bold;">一些文字</span>\n        <span style="display: block;" ng-bind=" $ctrl.option.text "></span>\n      </span>\n    ',
            bindings: {
                option: "="
            },
            controller: [function () {}]
        }), e.component("formInputCheckbox", {
            template: '\n      <div class="form-input-checkbox-container" ng-class="{\n        \'form-input-checkbox-as-switch-container\': $ctrl.appearance === \'switch\',\n        \'form-input-checkbox-as-button-container\': $ctrl.appearance === \'button\',\n        \'form-input-checkbox-hidden-container\': $ctrl.appearance === \'none\',\n      }">\n        <input\n          name="{{ $ctrl.valid ? $ctrl.randomName : $ctrl.name }}"\n          type="hidden"\n          ng-model="$ctrl.empty"\n          ng-required="!$ctrl.valid"\n          ng-disabled="$ctrl.valid"\n        />\n        <label>\n          <span class="form-input-checkbox-option-container" ng-class="{ \'form-input-checkbox-option-checked\': $ctrl.value }">\n            <span class="form-input-checkbox-wrapper">\n              <input class="form-input-checkbox"\n                name="{{ $ctrl.valid ? $ctrl.name : $ctrl.randomName }}"\n                type="checkbox"\n                ng-model="$ctrl.value"\n              />\n              <span class="form-input-checkbox-icon"></span>\n            </span>\n            <span class="form-input-radio-content">\n              <span class="form-input-radio-text" ng-if="$ctrl.text != null" ng-bind="$ctrl.text"></span>\n              <span class="form-input-radio-complex" ng-if="$ctrl.text == null" ng-transclude></span>\n          </span>\n          </span>\n        </label>\n      </div>\n    ',
            bindings: {
                name: "@",
                valueTrue: "<?value",
                valueFalse: "<?",
                ngModel: "=",
                required: "@",
                requiredFalse: "@",
                onChange: "&",
                text: "@?",
                appearance: "@"
            },
            transclude: !0,
            controller: ["$scope", "$timeout", function (e, o) {
                var l = this,
                    r = t(o, e);
                l.empty = "", l.randomName = n(), l.valid = !1, l.name || (l.name = n()), void 0 === l.valueTrue && (l.valueTrue = "on"), void 0 === l.valueFalse && (l.valueFalse = "");
                var i = function () {
                        l.ngModel === l.valueTrue ? l.value = !0 : l.ngModel === l.valueFalse ? l.value = !1 : l.ngModel = l.value ? l.valueTrue : l.valueFalse
                    },
                    a = function () {
                        "boolean" != typeof l.value && (l.value = 1 == l.value), l.ngModel !== l.valueTrue && l.value && (l.ngModel = l.valueTrue, r(function () {
                            return l.onChange()
                        }, 0)), l.ngModel === l.valueFalse || l.value || (l.ngModel = l.valueFalse, r(function () {
                            return l.onChange()
                        }, 0))
                    },
                    c = function () {
                        l.valid = !(l.value ? l.requiredFalse : l.required)
                    };
                e.$watch("$ctrl.ngModel", i), e.$watch("$ctrl.value", a), e.$watch("$ctrl.valueTrue", a), e.$watch("$ctrl.valueFalse", a), e.$watch("$ctrl.value", c)
            }]
        }), e.component("formSearchBox", {
            template: '\n      <div class="form-search-box-container"><label>\n        <input class="form-search-box-input" type="search" ng-model="$ctrl.ngModel" placeholder="{{ $ctrl.placeholder || \'\' }}" ng-model-option="{ debounce: $ctrl.debounce || 0 }" ng-change="$ctrl.change()" />\n        <icon-search class="form-search-box-icon"></icon-search>\n      </label></div>\n    ',
            bindings: {
                ngModel: "=",
                placeholder: "@",
                debounce: "<?",
                onChange: "&"
            },
            controller: ["$scope", "$timeout", function (e, n) {
                var o = this,
                    l = t(n, e);
                o.change = function () {
                    l(function () {
                        o.onChange()
                    })
                }
            }]
        }), e.component("formSearchBoxWithCount", {
            template: '\n      <form-multiple-inline>\n        <form-multiple-inline-item class="form-search-box-text-wrapper">\n          <span class="form-search-box-text" ng-if="$ctrl.total || $ctrl.total === 0">\n            <span class="form-search-box-text-prefix" ng-bind="$ctrl.textPrefix"></span>\n            <span class="form-search-box-text-match" ng-bind="$ctrl.match" ng-if="$ctrl.ngModel"></span>\n            <span class="form-search-box-text-line" ng-if="$ctrl.ngModel">/</span>\n            <span class="form-search-box-text-total" ng-bind="$ctrl.total"></span>\n            <span class="form-search-box-text-prefix" ng-bind="$ctrl.textSuffix"></span>\n          </span>\n        </form-multiple-inline-item>\n        <form-multiple-inline-item class="form-search-box-wrapper">\n          <form-search-box ng-model="$ctrl.ngModel" placeholder="{{ $ctrl.placeholder }}" debounce="$ctrl.debounce" on-change="$ctrl.change()"></form-search-box>\n        </form-multiple-inline-item>\n      </form-multiple-inline>\n    ',
            bindings: {
                ngModel: "=",
                placeholder: "@",
                debounce: "<?",
                textPrefix: "@",
                textSuffix: "@",
                total: "@",
                match: "@",
                onChange: "&"
            },
            controller: ["$scope", "$timeout", function (e, n) {
                var o = this,
                    l = t(n, e);
                o.change = function () {
                    l(function () {
                        o.onChange()
                    })
                }
            }]
        }), e.component("formArrayContainer", {
            template: '\n      <div class="form-array-container" ng-class="{ \'form-array-container-complex\': $ctrl.type === \'complex\' }">\n        <div class="form-array-item" ng-repeat=\'item in $ctrl.ngModel track by $index\'>\n          <div class="form-array-item-content" ng-if="$ctrl.type === \'simple\'">\n            <div class="form-array-item-wrapper" ng-include="$ctrl.template" ng-if="$ctrl.template"></div>\n          </div>\n          <div class="form-array-item-content" ng-if="$ctrl.type === \'complex\'">\n            <sub-form-container left-column-width="{{ $ctrl.leftColumnWidth }}">\n              <form-config-group>\n                <div class="form-array-item-wrapper" ng-if="$ctrl.template" ng-include="$ctrl.template"></div>\n              </form-config-group>\n            </sub-form-container>\n          </div>\n          <div class="form-array-item-delete" ng-click="$ctrl.deleteItem($index)" ng-if="$ctrl.minLength - 0 === $ctrl.minLength && $ctrl.ngModel.length > $ctrl.minLength">\n            <icon-delete class="form-array-item-delete-icon" ng-if="$ctrl.type === \'simple\'"></icon-delete>\n            <icon-close class="form-array-item-delete-icon" ng-if="$ctrl.type === \'complex\'"></icon-close>\n          </div>\n          <div class="form-array-item-delete form-array-item-delete-disabled" ng-if="!($ctrl.minLength - 0 === $ctrl.minLength && $ctrl.ngModel.length > $ctrl.minLength) && $ctrl.type === \'simple\'">\n            <icon-delete class="form-array-item-delete-icon" ng-if="$ctrl.type === \'simple\'" disabled="disabled"></icon-delete>\n          </div>\n        </div>\n        <div class="form-array-item-add" ng-click="$ctrl.addItem()" ng-if="$ctrl.maxLength - 0 === $ctrl.maxLength && $ctrl.ngModel.length < $ctrl.maxLength"></div>\n      </div>\n    ',
            bindings: {
                ngModel: "=",
                template: "@",
                itemDraft: "<",
                onChange: "&",
                onAdd: "&",
                onDelete: "&",
                maxLength: "<",
                minLength: "<",
                type: "@",
                leftColumnWidth: "@",
                param: "<?"
            },
            transclude: !0,
            controller: ["$scope", function (e) {
                var n = this;
                n.addItem = function () {
                    angular.isArray(n.ngModel) || (n.ngModel = []);
                    var e = angular.copy(n.itemDraft);
                    angular.isFunction(e) && (e = e(n.ngModel));
                    var t = n.ngModel.push(e) - 1;
                    n.onAdd({
                        item: e,
                        index: t
                    })
                }, n.deleteItem = function (e) {
                    var t = n.ngModel.splice(e, 1)[0];
                    n.onDelete({
                        item: t,
                        index: e
                    })
                };
                var t = function () {
                        angular.isArray(n.ngModel) || (n.ngModel = []);
                        var e = n.maxLength,
                            t = n.minLength;
                        if (e = Math.max(e - 0 === e ? e : 1 / 0, 0), t = Math.max(t - 0 === t ? t : 0, 0), !(e < t)) {
                            for (; n.ngModel.length < t;) n.addItem();
                            for (; n.ngModel.length > e;) n.deleteItem(n.ngModel.length - 1)
                        }
                    },
                    o = function () {
                        n.onChange()
                    };
                t(), e.$watch("$ctrl.ngModel", t, !0), e.$watch("$ctrl.ngModel", o, !0), e.$watch("$ctrl.minLength", t), e.$watch("$ctrl.maxLength", t)
            }]
        }), e.component("formSearchDropdown", {
            template: '\n      <input type="hidden" name="{{ $ctrl.name }}" ng-required="$ctrl.required" ng-model="$ctrl.ngModel" />\n      <span class="form-search-dropdown-container" id="{{ $ctrl.id }}">\n        <span class="form-search-input-container form-search-input-show-{{ $ctrl.currentlyShowInput }}" ng-show="$ctrl.currentlyShowInput">\n          <icon-search class="form-search-input-icon"></icon-search>\n          <input class="form-search-input" type="text" ng-model="$ctrl.searchText" placeholder="{{ $ctrl.placeholder }}" form="_noform" />\n        </span>\n        <span class="form-search-options-container form-search-options-show-{{ $ctrl.showOptions }}" ng-show="$ctrl.currentlyShowOptions" tab-index="-1">\n          <span class="form-search-options-wrapper" ng-show="$ctrl.isLoading !== true">\n            <span class="form-search-options-item-container" ng-repeat="option in $ctrl.filteredOptions track by $index" tabindex="-1">\n              <span class="form-search-options-item" ng-class="{ \'form-search-options-item-active\': $index === $ctrl.currentIndex }" ng-if="option.value" ng-click="$ctrl.itemOnClick(option, $index)" ng-mouseenter="$ctrl.itemOnMouseenter(option, $index)">\n                <span class="form-search-options-item-text" ng-bind="option.text"></span>\n                <span class="form-search-options-item-remark" ng-bind="option.remark" ng-if="option.remark"></span>\n              </span>\n            </span>\n          </span>\n          <span class="form-search-options-empty" ng-show="$ctrl.isLoading !== true && $ctrl.filteredOptions.length === 0" ng-bind="$ctrl.emptyText || \'\'"></span>\n          <span class="form-search-options-loading" ng-show="$ctrl.isLoading === true" ng-bind="$ctrl.loadingText || \'\'"></span>\n        </span>\n      </span>\n    ',
            bindings: {
                name: "@",
                ngModel: "=?",
                searchText: "=?",
                options: "<",
                isLoading: "<?",
                emptyText: "@",
                loadingText: "@",
                placeholder: "@",
                showInput: "@",
                showOptions: "@",
                onSearch: "&",
                onSubmit: "&",
                onChange: "&",
                required: "@",
                filteOption: "@",
                submitOnBlur: "<?",
                clearOnSubmit: "<?",
                blurOnSubmit: "<?",
                parentActive: "=?"
            },
            controller: ["$scope", "$document", "$timeout", function (e, o, r) {
                var i = this,
                    a = t(r, e),
                    c = l(e);
                i.searchText = "", i.id = n();
                var s = function (e) {
                        var n = angular.element(e.target),
                            t = angular.element(document.getElementById(i.id));
                        return t && t.find(n).length > 0
                    },
                    u = !1,
                    d = function () {
                        i.currentlyShowInput = {
                            always: !0,
                            never: !1
                        }[i.showInput || "always"], i.currentlyShowOptions = {
                            always: !0,
                            never: !1,
                            active: u || i.parentActive
                        }[i.showOptions || "active"]
                    };
                d(), e.$watch("$ctrl.showInput", d), e.$watch("$ctrl.showOptions", d), i.currentIndex = -1, i.currentOption = null;
                var m = function (e, n) {
                        i.currentOption = e, i.currentIndex = n
                    },
                    p = function (e) {
                        return !!i.currentOption && e === i.currentOption.text
                    },
                    g = function () {
                        i.currentOption = null, i.currentIndex = -1
                    };
                i.chosedOption = null, i.ngModel = null;
                var f = function (e) {
                        if (null === e) return h();
                        i.chosedOption = e;
                        var n = i.ngModel;
                        i.ngModel = e.value, i.searchText = e.text, m(e, -1), a(function () {
                            n !== e && i.onChange({
                                option: e
                            }), i.onSubmit({
                                option: e
                            }), i.clearOnSubmit && h()
                        }, 0)
                    },
                    h = function () {
                        i.chosedOption = null, i.ngModel = null, i.searchText = "", a(function () {
                            return i.onChange({
                                option: null
                            })
                        }, 0), g()
                    },
                    v = function () {
                        u = !0, O(), d()
                    },
                    $ = function () {
                        i.submitOnBlur ? (p(i.searchText) || L(), p(i.searchText) ? f(i.currentOption) : "" === i.searchText ? h() : f(i.chosedOption)) : f(i.chosedOption), u = !1, d()
                    },
                    b = function () {
                        a(function () {
                            document.body.focus(), $()
                        }, 0)
                    },
                    y = function (e) {
                        var n = s(e);
                        n !== u && (n ? v() : $(), a(function () {}))
                    };
                o.on("click focus focusin", y), c(function () {
                    return o.off("click focus focusin", y)
                }), i.itemOnClick = function (e, n) {
                    f(e), i.blurOnSubmit && b()
                }, i.itemOnMouseenter = function (e, n) {
                    m(e, n)
                };
                var x = function (e) {
                        var n = i.filteredOptions;
                        n && n.length && (e >= n.length && (e = 0), e < 0 && (e = n.length - 1), m(n[e], e))
                    },
                    w = function () {
                        x(i.currentIndex + 1)
                    },
                    T = function () {
                        x(i.currentIndex - 1)
                    },
                    M = function () {
                        i.currentOption && f(i.currentOption)
                    },
                    E = function (e) {
                        if (u || i.parentActive) {
                            var n = {
                                40: w,
                                38: T,
                                13: function () {
                                    M(), i.blurOnSubmit && b()
                                },
                                27: b
                            }[e.keyCode];
                            n && (n(), e.preventDefault(), e.stopPropagation(), a(function () {
                                a(k, 0), a(k, 250)
                            }))
                        }
                    };
                o.on("keydown", E), c(function () {
                    return o.on("keydown", E)
                });
                var L = function () {
                        var e = i.filteredOptions || [],
                            n = i.searchText;
                        if (!p(n)) {
                            var t = -1;
                            e.some(function (e, o) {
                                return e.text === n && (t = o, !0)
                            }), t !== -1 ? m(e[t], t) : g()
                        }
                    },
                    C = function () {
                        var e = i.searchText,
                            n = i.searchDelay ? Number(i.searchDelay) : 200;
                        (!n && 0 !== n || n < 0) && (n = 200), null !== e && a(function () {
                            i.searchText === e && i.onSearch({
                                text: i.searchText
                            })
                        }, n)
                    },
                    O = function () {
                        C();
                        var e = i.options || [];
                        if (i.filteOption) {
                            var n = "start" === i.filteOption ? function (e) {
                                return 0 === e
                            } : function (e) {
                                return e !== -1
                            };
                            e = e.filter(function (e) {
                                return n((e.text || "").indexOf(i.searchText))
                            })
                        }
                        angular.equals(e, i.filteredOptions) || (i.filteredOptions = angular.copy(e)), L()
                    };
                e.$watch("$ctrl.searchText", O), e.$watch("$ctrl.options", O);
                var k = function () {
                        var e = angular.element(document.getElementById(i.id)),
                            n = angular.element(".form-search-options-wrapper", e),
                            t = angular.element(".form-search-options-item-active", n).parent();
                        if (t && t[0]) {
                            var o = t[0].offsetTop,
                                l = o + t.height(),
                                r = n.scrollTop(),
                                a = r + n.height(),
                                c = null;
                            o < r ? c = o : l > a && (c = l - n.height()), null !== c && n.stop(!0, !0).animate({
                                scrollTop: c
                            }, 200)
                        } else n.stop(!0, !0).scrollTop(0)
                    },
                    S = function (e, n) {
                        var t = i.options,
                            o = null;
                        null == i.ngModel && (null !== i.ngModel && (i.ngModel = null), i.chosedOption && (i.onChange({
                            option: null
                        }), h())), i.ngModel === i.chosedOption ? o = i.chosedOption : t.some(function (e) {
                            return e.value === i.ngModel && (o = e, !0)
                        }), o ? (i.searchText = o.text, i.onChange({
                            option: o
                        }), i.onSubmit({
                            option: o
                        }), i.clearOnSubmit && h()) : (i.chosedOption ? i.ngModel = i.chosedOption.value : i.ngModel = null, i.onChange({
                            option: i.chosedOption
                        }), i.chosedOption && (i.onSubmit({
                            option: i.chosedOption
                        }), i.clearOnSubmit && h()))
                    };
                e.$watch("$ctrl.ngModel", S)
            }]
        }), e.component("formSelect", {
            template: '\n      <span id="{{ $ctrl.id }}" class="form-select-container">\n        <input type="hidden" name="{{ $ctrl.name }}" ng-required="$ctrl.required" ng-model="$ctrl.ngModel" />\n        <span class="form-select-wrapper">\n          <span class="form-select-fake-input" tabindex="0">\n            <span class="form-select-fake-input-value" ng-show="$ctrl.ngModel" ng-bind="$ctrl.text"></span>\n            <span class="form-select-fake-input-placeholder" ng-show="!$ctrl.ngModel" ng-bind="$ctrl.placeholder"></span>\n            <icon-drop-down class="form-select-down-icon"></icon-drop-down>\n          </span>\n        </span>\n        <form-search-dropdown\n          class="form-select-dropdown"\n          ng-model="$ctrl.value"\n          ng-class="{ \'form-select-dropdown-with-search\': $ctrl.showSearchInput !== \'never\' }"\n          ng-show="$ctrl.active"\n          options="$ctrl.options"\n          on-submit="$ctrl.onValueChange(option)"\n          empty-text="{{ $ctrl.emptyText || \'\' }}"\n          show-input="{{ $ctrl.showSearchInput || \'always\' }}"\n          show-options="always"\n          filte-option="{{ $ctrl.showSearchInput !== \'never\' ? \'filte-option\' : \'\' }}"\n          clear-on-submit="true"\n          input-in-dropdown="input-in-dropdown"\n          parent-active="$ctrl.active"\n          blur-on-submit="true"\n          is-loading="$ctrl.isLoading"\n          loading-text="{{ $ctrl.loadingText || \'\' }}"\n        ></form-search-dropdown>\n      </span>\n    ',
            bindings: {
                name: "@",
                ngModel: "=",
                options: "<",
                placeholder: "@",
                onChange: "&",
                required: "@",
                emptyText: "@",
                showSearchInput: "@",
                isLoading: "<",
                loadingText: "@"
            },
            controller: ["$scope", "$timeout", "$document", function (e, o, r) {
                var i = this,
                    a = t(o, e),
                    c = l(e);
                i.active = !1, i.id = n(), i.ngModel = null, i.value = null;
                var s = function (e) {
                        var n = angular.element(e.target),
                            t = angular.element(document.getElementById(i.id));
                        return t && t.find(n).length > 0
                    },
                    u = function (e) {
                        i.active = s(e), a(function () {})
                    };
                r.on("click focus focusin", u), c(function () {
                    return r.on("click focus focusin", u)
                }), i.onValueChange = function (e) {
                    e && (i.text = e.text, i.ngModel = e.value, a(function () {
                        return i.onChange({
                            option: e
                        })
                    }, 0)), a(function () {
                        return i.active = !1
                    }, 0)
                }, e.$watch("$ctrl.ngModel", function () {
                    i.value = i.ngModel
                })
            }]
        }), e.component("formSelectWithBackend", {
            template: '\n      <form-select\n        ng-model="$ctrl.value"\n        name="{{ $ctrl.name }}"\n        on-change="$ctrl.output()"\n        options="$ctrl.candidateList"\n        show-search-input="{{ $ctrl.showSearchInput || \'always\' }}"\n        placeholder="{{$ctrl.placeholder}}"\n        is-loading="$ctrl.isLoading"\n        loading-text="{{$ctrl.loadingText || \'正在加载…\'}}"\n        empty-text="{{$ctrl.emptyText || \'无匹配选项\'}}"\n        ng-required="$ctrl.required"\n      ></form-select>\n    ',
            bindings: {
                backend: "@",
                param: "<?",
                name: "@",
                ngModel: "=?",
                options: "=?",
                placeholder: "@",
                onChange: "&",
                required: "@",
                emptyText: "@",
                showSearchInput: "@",
                loadingText: "@"
            },
            controller: ["$scope", "api", "$timeout", "$filter", function (e, n, t, o) {
                var l = this;
                l.candidateList = [];
                var r = n.SimplePromise.resolve({}),
                    i = function () {
                        if (l.backend) {
                            l.isLoading = !0;
                            var e = l.param;
                            r = n.select[l.backend](e).then(function (n) {
                                return l.candidateList = n, {
                                    param: e,
                                    result: n
                                }
                            }), r.catch(function (e) {
                                return console.error(e)
                            }).then(function () {
                                l.isLoading = !1, l.input()
                            })
                        }
                    };
                l.input = function () {
                    if (null == l.ngModel) return void(l.value = null);
                    r.then(function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = e.param,
                            t = e.result;
                        if (n && angular.equals(n, l.param) && t === l.candidateList) {
                            var r = null;
                            r = "object" === _typeof(l.ngModel) && l.ngModel ? t.find(function (e) {
                                return o("filter")([l.ngModel], e.match, !0).length
                            }) : t.find(function (e) {
                                return e.value === l.ngModel
                            }), l.value = r ? r.value : null, l.output()
                        }
                    })
                }, l.output = function () {
                    if (!angular.equals(l.ngModel, l.value)) {
                        var e = l.ngModel = l.value;
                        t(function () {
                            l.onChange({
                                option: e
                            })
                        })
                    }
                }, e.$watch("$ctrl.param", i, !0), e.$watch("$ctrl.backend", i), e.$watch("$ctrl.ngModel", l.input)
            }]
        }), e.component("formMultipleSelect", {
            template: '\n      <span id="{{ $ctrl.id }}" class="form-select-container form-multiple-select-container">\n        <input type="hidden" name="{{ $ctrl.name }}" ng-required="$ctrl.required"\n          ng-model="$ctrl.validValue" maxlength="" />\n        <span class="form-select-wrapper">\n          <span class="form-select-fake-input">\n            <ul class="form-select-item-collection">\n              <li class="form-select-chosed-item" ng-repeat="item in $ctrl.chosed" ng-class="{ \'form-select-chosed-about-to-delete\': $index === $ctrl.aboutToDelete }">\n                <span class="form-select-chosed-item-text" ng-bind="item.text"></span>\n                <icon type="close" class="form-select-chosed-item-delete" ng-click="$ctrl.deleteChosedItem(item)">\n              </li>\n              <li class="form-select-input-item">\n                <span class="form-select-input-text" ng-bind="$ctrl.searchText || $ctrl.placeholder" || \'\'></span>\n                <input type="text" class="form-select-input" placeholder="{{ $ctrl.placeholder }}" ng-model="$ctrl.searchText" ng-trim="false" form="_noform" />\n              </li>\n            </ul>\n          </span>\n        </span>\n        <form-search-dropdown\n          class="form-select-dropdown"\n          ng-model="$ctrl.value"\n          ng-show="$ctrl.active"\n          search-text="$ctrl.searchText"\n          options="$ctrl.options"\n          on-submit="$ctrl.onValueChange(option)"\n          empty-text="{{ $ctrl.emptyText || \'\' }}"\n          show-input="never"\n          show-options="always"\n          filte-option="filte-option"\n          clear-on-submit="true"\n          parent-active="$ctrl.active"\n          is-loading="$ctrl.isLoading || false"\n          loading-text="{{ $ctrl.loadingText || \'\' }}"\n        ></form-search-dropdown>\n      </span>\n    ',
            bindings: {
                name: "@",
                ngModel: "=",
                options: "<",
                placeholder: "@",
                onChange: "&",
                emptyText: "@",
                minLength: "@",
                maxLength: "@",
                isLoading: "<?",
                loadingText: "@",
                required: "@"
            },
            controller: ["$scope", "$timeout", "$document", function (e, o, r) {
                var i = this,
                    a = t(o, e),
                    c = l(e);
                i.active = !1, i.id = n(), i.ngModel = null, i.value = null, i.searchText = "", i.chosed = [], i.validValue = null;
                var s = function (e) {
                        var n = angular.element(e.target),
                            t = angular.element(document.getElementById(i.id));
                        return t && t.find(n).length > 0
                    },
                    u = function () {
                        var e = angular.element(document.getElementById(i.id)),
                            n = angular.element(".form-select-input", e)[0];
                        n && n !== document.activeElement && n.focus()
                    },
                    d = function (e) {
                        i.active = s(e), i.active && u(), a(function () {})
                    };
                r.on("click focus focusin", d), c(function () {
                    return r.off("click focus focusin", d)
                }), i.onValueChange = function (e) {
                    angular.isArray(i.chosed) || (i.chosed = []);
                    var n = i.chosed,
                        t = null;
                    n.some(function (n, o) {
                        return !!angular.equals(n, e) && (t = o, !0)
                    }), t !== n.length - 1 && (null !== t && i.chosed.splice(t, 1), i.chosed.push(e)), a(u, 0), x()
                }, i.deleteChosedItem = function (e) {
                    var n = i.chosed.indexOf(e);
                    i.chosed.splice(n, 1), a(u, 0), x()
                }, i.aboutToDelete = null;
                var m = function () {
                        return null !== i.aboutToDelete
                    },
                    p = function () {
                        var e = !0;
                        return i.chosed && i.chosed.length || (e = !1), null === i.aboutToDelete && (e = !1), (i.aboutToDelete < 0 || i.aboutToDelete >= i.chosed.length) && (e = !1), e && i.deleteChosedItem(i.chosed[i.aboutToDelete]), i.aboutToDelete = null, e
                    },
                    g = function () {
                        p() || (i.aboutToDelete = i.chosed.length - 1)
                    },
                    f = function (e) {
                        var n = i.aboutToDelete;
                        null === n && (n = i.chosed.length), n += e, n >= i.chosed.length && (i.aboutToDelete = null), i.aboutToDelete = n
                    },
                    h = function (e) {
                        i.aboutToDelete = null
                    },
                    v = function (e) {
                        if ("keydown" !== e.type) return !1;
                        var n = angular.element(document.getElementById(i.id)),
                            t = angular.element(".form-select-input", n)[0];
                        return e.target === t
                    },
                    $ = function () {
                        var e = angular.element(document.getElementById(i.id)),
                            n = angular.element(".form-select-input", e)[0];
                        if (document.activeElement !== n) return !1;
                        var t = null;
                        if ("selectionStart" in n) t = n.selectionStart;
                        else if (document.selection) {
                            var o = document.selection.createRange(),
                                l = document.selection.createRange().text.length;
                            o.moveStart("character", -n.value.length), t = o.text.length - l
                        }
                        return 0 === t
                    },
                    b = function () {
                        return "" === i.searchText
                    },
                    y = function (e) {
                        var n = !1;
                        if (v(e)) {
                            if (8 === e.keyCode && (m() ? (n = !0, p()) : $() && (n = !0, g())), 37 === e.keyCode || 39 === e.keyCode) {
                                var t = 39 === e.keyCode ? 1 : -1;
                                (b() || m()) && (n = !0, f(t))
                            }
                            46 === e.keyCode && m() && (n = !0, p())
                        }
                        n ? e.preventDefault() : m && (n = !0, h()), n && a(function () {})
                    };
                r.on("click focusin focusout keydown", y), c(function () {
                    r.off("click focusin focusout keydown", y)
                });
                var x = function () {
                        var e = i.chosed.map(function (e) {
                            return e.value
                        });
                        angular.equals(e, i.ngModel) || (i.ngModel = e, a(function () {
                            return i.onChange()
                        }, 0))
                    },
                    w = function () {
                        angular.isArray(i.ngModel) || (i.ngModel = []), angular.isArray(i.options) || (i.options = []), angular.isArray(i.chosed) || (i.chosed = []);
                        var e = i.options.concat(i.chosed);
                        i.chosed = i.ngModel.map(function (n) {
                            return e.filter(function (e) {
                                return e.value === n
                            })[0] || null
                        }).filter(function (e) {
                            return e
                        }), x(), i.validValue = i.ngModel.join("; ")
                    };
                e.$watch("$ctrl.ngModel", w, !0)
            }]
        }), e.component("formTable", {
            template: '\n      <table class="form-table">\n        <colgroup ng-if="$ctrl.columns.length">\n          <col class="form-table-column" ng-repeat="column in $ctrl.columns track by $index" ng-style="{ width: column.width || \'auto\' }"></col>\n        </colgroup>\n        <colgroup ng-if="$ctrl.hasButtons()">\n          <col class="form-table-column form-table-action-column" ng-style="{ width: 20 + 30 * $ctrl.buttonCount() }"></col>\n        </colgroup>\n        <thead>\n          <tr class="form-table-first-row">\n            <th class="form-table-column-title" ng-repeat="column in $ctrl.columns track by $index" ng-bind="column.text""></th>\n            <th class="form-table-column-title form-table-action-column-title" ng-if="$ctrl.hasButtons()">操作</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat="(rowIndex, row) in (($ctrl.ngModel || []) | filter:$ctrl.filterRule()) track by $index" class="form-table-row" ng-class="{ \'form-table-row-edit\': $ctrl.getEditStatus(rowIndex), \'form-table-last-row\': $ctrl.ngModel.length - 1 === rowIndex }">\n            <td ng-repeat="(columnIndex, column) in $ctrl.columns track by $index" class="form-table-ceil">\n              <div ng-repeat="edit in [$ctrl.getEditStatus(rowIndex)] track by $index">\n                <div ng-repeat="value in [row[column.key]] track by $index">\n                  <div ng-repeat="param in [$ctrl.param] track by $index">\n                    <div ng-include="$ctrl.template"></div>\n                  </div>\n                </div>\n              </div>\n            </td>\n            <td ng-if="$ctrl.hasButtons()" class="form-table-ceil form-table-action-ceil">\n              <div ng-if="!$ctrl.getEditStatus(rowIndex)">\n                <icon-group>\n                  <icon-by-name ng-repeat="action in $ctrl.customButtons" name="{{ action.icon }}" ng-click="$ctrl.customButton(action, rowIndex)" tooltip="{{ action.text }}"></icon-by-name>\n                  <icon-edit tooltip="编辑" ng-click="$ctrl.mayEdit(rowIndex) && $ctrl.beforeEdit(rowIndex)" ng-if="$ctrl.hasEdit()" disabled="{{ $ctrl.mayEdit(rowIndex) ? \'\' : \'disabled\' }}"></icon-edit>\n                  <icon-delete tooltip="删除" ng-click="$ctrl.mayDelete(rowIndex) && $ctrl.deleteItem(rowIndex)" ng-if="$ctrl.hasDelete()" disabled="{{ $ctrl.mayDelete(rowIndex) ? \'\' : \'disabled\' }}"></icon-delete>\n                </icon-group>\n              </div>\n              <div ng-if="$ctrl.getEditStatus(rowIndex)">\n                <icon-group>\n                  <icon-save tooltip="保存" ng-click="$ctrl.saveItem(rowIndex)"></icon-save>\n                  <icon-cancel tooltip="取消" ng-click="$ctrl.cancelEdit(rowIndex)"></icon-cancel>\n                </icon-group>\n              </div>\n            </td>\n          </tr>\n          <tr ng-if="$ctrl.emptyText && (($ctrl.ngModel || []) | filter:$ctrl.filterRule()).length === 0" class="form-table-row form-table-row-empty">\n            <td class="form-table-empty-text" colspan="{{ $ctrl.columns.length + $ctrl.hasButtons() }}" ng-bind="$ctrl.emptyText"></td>\n          </tr>\n        </tbody>\n      </table>\n    ',
            bindings: {
                columns: "<",
                onDelete: "&?",
                onSave: "&?",
                onBeforeEdit: "&?",
                onCancelEdit: "&?",
                disabled: "@",
                noDelete: "<?",
                noEdit: "<?",
                template: "@",
                ngModel: "=",
                onCustomButton: "&?",
                customButtons: "<?",
                compareKey: "@",
                emptyText: "@",
                filter: "<?",
                editedData: "=?",
                param: "<?"
            },
            controller: [function () {
                var e = this;
                e.hasEdit = function () {
                    return !!(e.onBeforeEdit || e.onCancelEdit || e.onSave)
                }, e.hasDelete = function () {
                    return !!e.onDelete
                }, e.hasButtons = function () {
                    return !(e.disabled || !(e.hasEdit() || e.hasDelete() || e.onCustomButton || e.customButtons))
                }, e.buttonCount = function () {
                    return e.hasEdit() + e.hasDelete() + (e.customButtons || []).length
                }, e.getEditStatus = function (n) {
                    return !!(e.hasButtons() && !e.ngModel[n].disabled && n in e.editedData)
                };
                var n = function (n, t) {
                    return e.compareKey ? angular.equals(n[e.compareKey], t[e.compareKey]) : angular.equals(n, t)
                };
                e.mayEdit = function (t) {
                    return (e.noEdit || []).every(function (o) {
                        return !n(o, e.ngModel[t])
                    })
                }, e.mayDelete = function (t) {
                    return (e.noDelete || []).every(function (o) {
                        return !n(o, e.ngModel[t])
                    })
                }, e.editedData = {}, e.beforeEdit = function (n) {
                    e.onBeforeEdit && e.onBeforeEdit({
                        data: e.ngModel[n],
                        index: n
                    }), e.editedData[n] = angular.copy(e.ngModel[n])
                }, e.saveItem = function (n) {
                    e.onSave && e.onSave({
                        data: e.ngModel[n],
                        index: n
                    }), delete e.editedData[n]
                }, e.deleteItem = function (n) {
                    e.onDelete && e.onDelete({
                        data: e.ngModel[n],
                        index: n
                    }), e.ngModel.splice(n, 1);
                    for (var t = n; t < e.ngModel.length; t++) t + 1 in e.editedData && (e.editedData[t] = e.editedData[t + 1], delete e.editedData[t + 1])
                }, e.cancelEdit = function (n) {
                    e.onCancelEdit && e.onCancelEdit({
                        data: e.ngModel[n],
                        index: n
                    }), angular.copy(e.editedData[n], e.ngModel[n]), delete e.editedData[n]
                }, e.customButton = function (n, t) {
                    e.onCustomButton && e.onCustomButton({
                        action: n,
                        index: t,
                        data: e.ngModel[t]
                    })
                }, e.filterRule = function () {
                    return e.filter || {}
                }
            }]
        }), e.component("inputWithCopy", {
            template: '\n      <div class="input-with-button" id="{{ $ctrl.id }}">\n        <div class="input-with-button-input">\n          <input ng-if="$ctrl.appearance !== \'textarea\' && $ctrl.appearance !== \'codearea\'" type="text" ng-model="$ctrl.ngModel" ng-readonly="$ctrl.readonly" />\n          <textarea ng-if="$ctrl.appearance === \'textarea\'" ng-model="$ctrl.ngModel" ng-readonly="$ctrl.readonly"></textarea>\n          <codearea ng-if="$ctrl.appearance === \'codearea\'" ng-model="$ctrl.ngModel" readonly="{{ $ctrl.readonly ? \'readonly\' : \'\' }}" language="$ctrl.language"></codearea>\n        </div>\n        <div class="input-with-button-button">\n          <button type="button" class="input-with-button-copy" data-clipboard-target="#{{ $ctrl.id }} input, #{{ $ctrl.id }} textarea"><icon-clipboard></icon-clipboard></button>\n        </div>\n      </div>\n    ',
            bindings: {
                ngModel: "=",
                appearance: "@?",
                language: "@",
                readonly: "@"
            },
            controller: ["api", function (e) {
                var t = this;
                t.id = n(), e.loadScript("/lib/js/clipboard.js/clipboard.min.js", function () {
                    return window.Clipboard
                }).then(function () {
                    var e = "#" + t.id + " button";
                    new Clipboard(e).on("success", function (e) {
                        e.clearSelection()
                    })
                })
            }]
        }), e.component("codearea", {
            template: '\n      <div id="{{ $ctrl.id }}" class="codearea-container">\n        <textarea class="codearea-hidden-textarea" style="display: none;" name="$ctrl.name" ng-model="$ctrl.ngModel" ng-required="$ctrl.required"></textarea>\n        <div id="{{ $ctrl.editorId }}" class="codearea-ace-container"></div>\n      </div>\n    ',
            bindings: {
                language: "@",
                ngModel: "=",
                required: "@",
                name: "@?",
                readonly: "@",
                height: "@",
                onChange: "&"
            },
            controller: ["api", "$scope", "$interval", "$timeout", function (e, t, l, r) {
                var i = this,
                    a = o(l, t),
                    c = o(r, t);
                i.id = n(), i.editorId = n(), i.name || (i.name = n());
                var s = {
                        dockerfile: "dockerfile",
                        json: "json",
                        markdown: "markdown",
                        shell: "sh",
                        xml: "xml",
                        yaml: "yaml"
                    },
                    u = null,
                    d = null,
                    m = 0,
                    p = 0;
                e.loadScript("/lib/js/ace/ace.js", function () {
                    return window.ace
                }).then(function () {
                    u = ace.edit(i.editorId), u.getSession().setMode("ace/mode/" + (s[i.language] || "text")), u.on("input", function () {
                        i.ngModel = d = u.getValue(), c(function () {
                            i.onChange()
                        })
                    }), u.setValue(d || "", 1), u.setOptions({
                        fontSize: "14px"
                    }), u.$blockScrolling = 1 / 0, u.setReadOnly(!!i.readonly), u.setOptions({
                        minLines: m,
                        maxLines: p
                    })
                });
                var g = null;
                a(function () {
                    var e = document.getElementById(i.editorId);
                    e && g !== e.clientHeight && (g = e.clientHeight, u && u.resize())
                }, 100), t.$watch("$ctrl.ngModel", function (e, n) {
                    d !== e && (d = e, u && u.setValue(d, 1))
                }), t.$watch("$ctrl.readonly", function (e, n) {
                    u && u.setReadOnly(!!i.readonly)
                }), t.$watch("$ctrl.language", function (e, n) {
                    u && u.getSession().setMode("ace/mode/" + (s[i.language] || "text"))
                }), t.$watch("$ctrl.height", function (e, n) {
                    var t = ((i.height || "") + "").match(/^(?=(\d+))(?=(?:\d+\s*,\s*)?(\d*)$)(?:\d+(?:\s*,\s*\d*)?)$/);
                    t ? (m = parseInt(t[1], 0) || 0, p = "" === t[2] ? 1 / 0 : parseInt(t[2], 0) || 0) : m = p = 0, u && u.setOptions({
                        minLines: m,
                        maxLines: p
                    })
                })
            }]
        }), e.component("markdown", {
            template: '\n      <div class="markdown-container markdown" ng-bind-html="$ctrl.html"></div>\n    ',
            bindings: {
                source: "@?",
                src: "@?",
                emptyText: "@?"
            },
            controller: ["$scope", "api", function (e, n) {
                var t = this;
                t.html = "";
                var o = 0,
                    l = function () {
                        t.html = "";
                        var e = ++o,
                            l = null;
                        l = t.source ? n.SimplePromise.resolve(t.source) : t.src ? n.network(t.src, "GET", {
                            responseType: "arraybuffer"
                        }).then(function (e) {
                            return decodeURIComponent(escape(String.fromCharCode.apply(String, new Uint8Array(e)))).trim()
                        }) : n.SimplePromise.resolve(""), l = l.catch(function (e) {
                            return ""
                        }).then(function (e) {
                            return e || t.emptyText || ""
                        });
                        var r = n.loadScript("/lib/js/showdown.min.js", function () {
                            return window.showdown
                        }, function () {
                            showdown.setOption("strikethrough", "true"), showdown.setOption("tables", "true"), showdown.setOption("tasklists", "true"), showdown.setOption("simplifiedAutoLink", "true")
                        });
                        n.SimplePromise.all([l, r]).then(function (n) {
                            var l = _slicedToArray(n, 1),
                                r = l[0];
                            if (e === o) {
                                var i = new showdown.Converter,
                                    a = i.makeHtml(r),
                                    c = angular.element("<div></div>").html(a);
                                angular.element("a, area", c).attr("target", "_blank"), t.html = c.html()
                            }
                        })
                    };
                e.$watchGroup(["$ctrl.source", "$ctrl.src"], function () {
                    l()
                })
            }]
        }), e.component("eventList", {
            template: '\n      <div class="event-list-container">\n        <span class="event-list-empty" ng-bind="$ctrl.emptyText" ng-if="!$ctrl.value || !$ctrl.value.length"></span>\n        <ol class="event-list" ng-if="$ctrl.value && $ctrl.value.length">\n          <li class="event-list-item" ng-repeat="row in $ctrl.value">\n            <span class="event-list-content event-list-icon event-list-icon-{{ $ctrl.eventType || ($ctrl.eventTypeAttr ? row[$ctrl.eventTypeAttr] : row.type) || \'info\' }}">\n            </span>\n            <span class="event-list-content" ng-repeat="column in $ctrl.column track by $index">\n              <span ng-repeat="value in [row[column]] track by $index">\n                <span ng-include="$ctrl.template"></span>\n              </span>\n            </span>\n          </li>\n        </ol>\n      </div>\n    ',
            bindings: {
                value: "<",
                column: "<",
                template: "@",
                param: "<?",
                eventType: "@?",
                eventTypeAttr: "@?",
                emptyText: "@"
            },
            controller: [function () {}]
        }), e.component("chartContainer", {
            template: '\n      <div class="chart chart-container" id="$ctrl.id">\n        <div class="chart-title">{{ $ctrl.chartTitle }}</div>\n        <div class="chart-content chart-content-legend-{{ $ctrl.legendPosition }}">\n          <div class="chart-img" ng-style="{ visibility: $ctrl.noData === true ? \'hidden\' : \'visible\' }">\n            <div class="chart-img-wrap" style="padding: 20px 10px {{ $ctrl.chartHeight + 0 === $ctrl.chartHeight * 1 ? ($ctrl.chartHeight + \'px\') : $ctrl.chartHeight }}">\n              <div class="chart-img-container" ng-transclude></div>\n            </div>\n          </div>\n          <div class="chart-legend-container" ng-style="{ visibility: $ctrl.noData === true ? \'hidden\' : \'visible\' }">\n            <ul class="chart-legend">\n              <li class="chart-legend-item" ng-repeat="label in $ctrl.groups"\n                ng-mouseenter="$ctrl.onLegendMouseenter({ legend: label })"\n                ng-mouseleave="$ctrl.onLegendMouseleave({ legend: label })"\n                ng-click="$ctrl.onLegendClick({ legend: label })"\n              >\n                <span class="chart-legend-item-sample" style="background-color: {{ $ctrl.color[$index] }}"></span>\n                <span>{{ label }}</span>\n              </li>\n            </ul>\n          </div>\n          <div class="chart-no-data" ng-bind="$ctrl.emptyText" ng-if="$ctrl.noData"></div>\n        </div>\n      </div>\n    ',
            transclude: !0,
            bindings: {
                chartHeight: "@?",
                chartTitle: "@",
                noData: "<?",
                legendPosition: "@",
                groups: "<",
                color: "<",
                emptyText: "@",
                onLegendMouseenter: "&",
                onLegendMouseleave: "&",
                onLegendClick: "&"
            },
            controller: [function () {
                this.id = n()
            }]
        }), e.component("chart", {
            template: '\n      <chart-container\n        chart-title="{{ $ctrl.chartTitle }}"\n        groups="$ctrl.groups"\n        color="$ctrl.color"\n        legend-position="{{ $ctrl.legendPosition }}"\n        empty-text="{{ $ctrl.emptyText }}"\n        no-data="$ctrl.noData"\n        class="chartjs chart chart-{{ $ctrl.type }}"\n        id="{{ $ctrl.id }}"\n        chart-height="{{ $ctrl.type === \'line\' ? \'50%\' : \'100%\' }}"\n      >\n          <canvas></canvas>\n      </chart-container>\n    ',
            bindings: {
                chartTitle: "@",
                data: "<",
                groups: "<?",
                items: "<?",
                color: "<",
                type: "@",
                legendPosition: "@",
                options: "<?",
                emptyText: "@"
            },
            controller: ["api", "$scope", function (e, t) {
                var o = this;
                o.id = n();
                var l = e.loadScript("/lib/js/Chart.min.js", function () {
                        return window.Chart
                    }),
                    r = null,
                    i = function () {
                        if (r) try {
                            r.clear().destroy()
                        } catch (e) {}
                    };
                t.$on("$destory", i);
                var a = function () {
                    i();
                    var e = angular.element("canvas", document.getElementById(o.id)),
                        n = void 0,
                        t = void 0,
                        a = {};
                    if (o.noData = !1, "pie" === o.type) Array.isArray(o.data) && o.data.indexOf(null) === -1 && 0 !== o.data.reduce(function (e, n) {
                        return e + n
                    }, 0) || (o.noData = !0), n = [{
                        data: o.data,
                        label: o.groups,
                        backgroundColor: o.color,
                        hoverBackgroundColor: o.color,
                        pointBorderColor: o.color,
                        pointHoverBorderColor: o.color,
                        pointBackgroundColor: o.color,
                        pointHoverBackgroundColor: o.color
                    }], t = o.groups, a = {
                        tooltips: {
                            callbacks: {
                                label: function (e, n) {
                                    return n.labels[e.index]
                                }
                            }
                        }
                    };
                    else if ("line" === o.type) {
                        Array.isArray(o.data) && o.data.length || (o.noData = !0), n = (o.data || []).map(function (e, n) {
                            return Array.isArray(e) && o.data.indexOf(null) === -1 || (o.noData = !0), {
                                data: e,
                                label: o.groups[n],
                                borderColor: o.color[n],
                                backgroundColor: o.color[n],
                                hoverBackgroundColor: o.color[n],
                                fill: !1
                            }
                        }), t = o.items;
                        var c = Math.max.apply(Math, o.data.map(function (e) {
                            return Math.max.apply(Math, e)
                        }));
                        a = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        stepSize: Math.max(1, Math.ceil(c / 5)),
                                        beginAtZero: !0
                                    }
                                }]
                            }
                        }
                    }
                    var s = angular.copy({
                        type: o.type,
                        data: {
                            labels: t,
                            datasets: n
                        },
                        options: Object.assign({
                            legend: {
                                display: !1
                            },
                            responsive: !0,
                            layout: {
                                padding: 20
                            }
                        }, a, o.options || {})
                    });
                    l.then(function () {
                        setTimeout(function () {
                            return r = new Chart(e, s)
                        }, 100)
                    })
                };
                t.$watchGroup(["$ctrl.data", "$ctrl.labels", "$ctrl.color", "$ctrl.type"], function () {
                    a()
                })
            }]
        }), e.component("lineChart", {
            template: '\n      <chart-container\n        chart-title="{{ $ctrl.chartTitle }}"\n        groups="$ctrl.groups"\n        color="$ctrl.color"\n        legend-position="{{ $ctrl.legendPosition }}"\n        empty-text="{{ $ctrl.emptyText }}"\n        no-data="!$ctrl.data"\n        on-legend-mouseenter="$ctrl.onLegendMouseenter({ legend: legend })"\n        on-legend-mouseleave="$ctrl.onLegendMouseleave({ legend: legend })"\n        on-legend-click="$ctrl.onLegendClick({ legend: legend })"\n        class="dygraph chart chart-line"\n        id="{{ $ctrl.id }}"\n        chart-height="{{ $ctrl.chartHeight || \'100%\' }}"\n      >\n        <div class="dygraph-chart-container"></div>\n      </chart-container>\n    ',
            bindings: {
                chartTitle: "@",
                groups: "<",
                color: "<",
                emptyText: "@",
                chartHeight: "@",
                legendPosition: "@",
                onLegendMouseenter: "&",
                onLegendMouseleave: "&",
                onLegendClick: "&",
                data: "<?"
            },
            controller: ["$scope", "$timeout", "chartHandler", function (e, t, o) {
                var l = this;
                l.id = n();
                var r = null,
                    i = null;
                t(function () {
                    var n = document.getElementById(l.id),
                        t = n.getElementsByClassName("dygraph-chart-container")[0];
                    r = new Dygraph(t, l.data || [], {
                        labels: ["x"].concat(_toConsumableArray(l.groups)),
                        connectSeparatedPoints: !0,
                        drawPoints: !0,
                        interactionModel: {},
                        colors: l.color,
                        plotter: smoothPlotter
                    }), i || (i = {
                        getDygraph: function () {
                            return r
                        },
                        updateOptions: function () {
                            var e;
                            return (e = r).updateOptions.apply(e, arguments)
                        },
                        updateData: function (e) {
                            l.data = e, r.updateOptions({
                                file: e
                            })
                        }
                    }, o.set(n, i), e.$on("$destory", function () {
                        o.del(n)
                    }))
                })
            }]
        }), e.service("chartHandler", ["$timeout", "api", function (e, n) {
            var t = [],
                o = [],
                l = function (e, n) {
                    return e === n || e.firstElementChild === n
                },
                r = function (e) {
                    o = o.filter(function (e) {
                        var n = e.matcher,
                            o = e.resolve,
                            r = t.filter(function (e) {
                                var t = e.content;
                                return l(n, t)
                            })[0] || {},
                            i = r.chart;
                        return !i || (o(i), !1)
                    })
                };
            this.get = function (t) {
                return new n.SimplePromise(function (n) {
                    "string" == typeof t ? e(function () {
                        t = document.getElementById(t), t && o.push({
                            matcher: t,
                            resolve: n
                        }), r()
                    }) : o.push({
                        matcher: t,
                        resolve: n
                    }), r()
                })
            }, this.set = function (e, n) {
                t.push({
                    content: e,
                    chart: n
                }), r()
            }, this.del = function (e) {
                this.set(e, null), t = t.filter(function (e) {
                    var n = e.c;
                    return c !== n
                })
            }
        }]), e.component("multipleUserSelect", {
            template: '\n      <form-multiple-select\n        options="$ctrl.userListFiltered"\n        ng-model="$ctrl.ngModel"\n        placeholder="{{ $ctrl.placeholder || \'\' }}"\n        is-loading="$ctrl.isLoading"\n        loading-text="正在获取用户列表"\n      ></form-multiple-select>\n    ',
            bindings: {
                notInList: "<?",
                ngModel: "=",
                placeholder: "@"
            },
            controller: ["$scope", "api", function (e, n) {
                var t = this;
                t.allUsers = [], t.userListFiltered = [], t.isLoading = !0;
                var o = function () {
                    t.isLoading || (t.userListFiltered = t.allUsers.filter(function (e) {
                        return (t.notInList || []).indexOf(e.id) === -1
                    }))
                };
                n.user.list().then(function (e) {
                    t.allUsers = e.map(function (e) {
                        return {
                            value: e,
                            text: e.name,
                            id: e.id
                        }
                    }), t.isLoading = !1, o()
                }).catch(function (e) {
                    return angular.noop()
                }), e.$watch("$ctrl.notInList", function () {
                    o()
                }, !0)
            }]
        }), e.component("memberCollectionSelect", {
            template: '\n      <form-select\n        options="$ctrl.options"\n        ng-model="$ctrl.ngModel"\n        placeholder="{{ $ctrl.placeholder || \'\' }}"\n        is-loading="$ctrl.loadingTypes[$ctrl.type] !== false"\n        loading-text="正在加载列表"\n        empty-text="无相关用户组信息"\n      ></form-select>\n    ',
            bindings: {
                type: "@",
                ngModel: "=",
                placeholder: "@",
                notInList: "<?"
            },
            controller: ["$scope", "api", function (e, n) {
                var t = this,
                    o = [],
                    l = {};
                t.loadingTypes = {}, t.options = [];
                var r = function () {
                        l[t.type] && (t.options = l[t.type].map(function (e) {
                            return {
                                value: e,
                                text: e.name
                            }
                        }).filter(function (e) {
                            return (t.notInList || []).every(function (n) {
                                return n.id !== e.value.id || n.type !== e.value.type
                            })
                        }))
                    },
                    i = function () {
                        if (o.indexOf(t.type) !== -1 && !t.loadingTypes[t.type])
                            if (l[t.type]) r();
                            else {
                                var e = t.type;
                                t.loadingTypes[e] = !0, t.options = [], t.ngModel = null, n.memberCollection.listByType(e).then(function (n) {
                                    t.loadingTypes[e] = !1, l[e] = n, r()
                                })
                            }
                    };
                n.memberCollection.getTypes().then(function (e) {
                    o = e, i()
                }), e.$watch("$ctrl.type", i), e.$watch("$ctrl.notInList", i)
            }]
        }), e.component("collectionMemberTable", {
            template: '\n      <div class="collection-member-table-container">\n        <form-multiple-inline content-type="search">\n          <form-multiple-inline-item class="collection-member-edit-button-container">\n            <form-button-collection>\n              <form-input-checkbox value="\'MEMBER\'" value-false="null" ng-model="$ctrl.addingTypeOne" on-change="$ctrl.addingType = $ctrl.addingTypeOne; $ctrl.addingTypeMulti = null; $ctrl.addingShown = true;" ng-init="$ctrl.addingTypeOne = null" appearance="button">逐个添加成员</form-input-checkbox>\n              <form-input-checkbox value="\'GROUP\'" value-false="null" ng-model="$ctrl.addingTypeMulti" on-change="$ctrl.addingType = $ctrl.addingTypeMulti; $ctrl.addingTypeOne = null; $ctrl.addingShown = true;" ng-init="$ctrl.addingTypeMulti = null" appearance="button">批量导入成员</form-input-checkbox>\n            </form-button-collection>\n          </form-multiple-inline-item>\n          <form-multiple-inline-item class="collection-member-count-container">\n            <span>\n              共\n              <span ng-show="$ctrl.searchText">\n                <span class="collection-member-count-filtered" ng-bind="(($ctrl.ngModel.length ? $ctrl.ngModel : []) | filter:{ name: $ctrl.searchText }).length"></span>\n                /\n              </span>\n              <span>\n                <span class="collection-member-count-total" ng-bind="$ctrl.ngModel.length"></span>\n              </span>\n              位成员\n            </span>\n          </form-multiple-inline-item>\n          <form-multiple-inline-item class="collection-member-search-container">\n            <form-search-box ng-init="$ctrl.searchText = \'\'" ng-model="$ctrl.searchText" placeholder="搜索项目成员"></form-search-box>\n          </form-multiple-inline-item>\n        </form-multiple-inline>\n        <form-help-line ng-if="$ctrl.helpText">\n          <icon-info></icon-info> <span ng-bind="$ctrl.helpText"></span>\n        </form-help-line>\n        <div class="collection-member-adding-panel" ng-show="$ctrl.addingType" ng-if="$ctrl.addingShown">\n          <form-multiple-inline algin="left">\n            <form-multiple-inline-item class="collection-member-group-type-selector-container" ng-show="$ctrl.addingType === \'GROUP\'">\n              <script id="collectionMemberTypeTemplate" type="text/ng-template">\n                <span ng-bind="option.text"></span>\n              </script>\n              <form-select\n                class="collection-member-type-radio"\n                options="[\n                  { value: \'PROJECT_COLLECTION\', text: \'导入项目成员\' },\n                  { value: \'DEPLOY_COLLECTION\', text: \'导入服务成员\' },\n                  { value: \'CLUSTER\', text: \'导入集群成员\' },\n                  { value: \'CONFIGURATION_COLLECTION\', text: \'导入配置管理成员\' },\n                  { value: \'LOADBALANCER_COLLECTION\', text: \'导入负载均衡成员\' },\n                ]"\n                ng-model="$ctrl.groupType"\n                ng-init="$ctrl.groupType = \'PROJECT_COLLECTION\'"\n                show-search-input="never"\n                card-template="collectionMemberTypeTemplate"\n              ></form-input-radio-group>\n            </form-multiple-inline-item>\n            <form-multiple-inline-item class="collection-member-users-selector-container">\n              <multiple-user-select\n                ng-show="$ctrl.addingType === \'MEMBER\'"\n                ng-model="$ctrl.chosedMemberList"\n                placeholder="选择用户以添加"\n              ></multiple-user-select>\n              <member-collection-select\n                ng-show="$ctrl.addingType === \'GROUP\'"\n                type="{{ $ctrl.groupType }}"\n                ng-model="$ctrl.chosedGroup"\n                placeholder="选择{{ ({\n                  PROJECT_COLLECTION : \'项目\',\n                  DEPLOY_COLLECTION : \'服务\',\n                  CLUSTER : \'集群\',\n                  STORAGE_CLUSTER : \'存储\',\n                  CONFIGURATION_COLLECTION : \'配置管理\',\n                  LOADBALANCER_COLLECTION : \'负载均衡\'\n                })[$ctrl.groupType] }}以导入"\n                not-in-list="[{ type: $ctrl.collectionType, id: $ctrl.collectionId }]"\n              ></member-collection-select>\n            </form-multiple-inline-item>\n            <form-multiple-inline-item class="collection-member-role-selector-container">\n              <form-select\n                ng-show="$ctrl.addingType === \'MEMBER\'"\n                options="[\n                  { value: \'MASTER\', text: \'MASTER\' },\n                  { value: \'DEVELOPER\', text: \'DEVELOPER\' },\n                  { value: \'REPORTER\', text: \'REPORTER\' },\n                ]"\n                ng-init="$ctrl.addingMemberRole = \'MASTER\'"\n                show-search-input="never"\n                ng-model="$ctrl.addingMemberRole"\n              ></form-select>\n              <form-select\n                ng-show="$ctrl.addingType !== \'MEMBER\'"\n                options="[\n                  { value: \'MASTER\', text: \'MASTER\' },\n                  { value: \'DEVELOPER\', text: \'DEVELOPER\' },\n                  { value: \'REPORTER\', text: \'REPORTER\' },\n                  { value: \'DEFAULT\', text: \'保留组内权限设置\' },\n                ]"\n                ng-init="$ctrl.addingGroupRole = \'DEFAULT\'"\n                show-search-input="never"\n                ng-model="$ctrl.addingGroupRole"\n              ></form-select>\n            </form-multiple-inline-item>\n            <form-multiple-inline-item class="collection-member-add-button-container">\n              <button class="collection-member-new-button" type="button" ng-click="$ctrl.addMember()" ng-bind="$ctrl.addingType === \'MEMBER\' ? \'添加\' : \'导入\'"></button>\n            </form-multiple-inline-item>\n          </form-multiple-inline>\n        </div>\n        <script id="collectionMemberTableTemplate" type="text/ng-template">\n          <div ng-if="edit && column.key === \'role\'">\n            <form-select\n              ng-model="row.role"\n              options="[\n                {value: \'MASTER\', text: \'MASTER\'},\n                {value: \'DEVELOPER\', text: \'DEVELOPER\'},\n                {value: \'REPORTER\', text: \'REPORTER\'}\n              ]"\n              show-search-input="never"\n            ></form-select>\n          </div>\n          <div ng-if="!edit || column.key !== \'role\'">\n            <div ng-bind="value"></div>\n          </div>\n        </script>\n        <form-table\n          class="collection-member-table"\n          ng-model="$ctrl.value"\n          columns="[{text: \'成员\', key: \'name\'}, {text: \'组内角色\', key: \'role\'}]"\n          template="collectionMemberTableTemplate"\n          filter="{ name: $ctrl.searchText }"\n          empty-text="{{ $ctrl.loading ? \'正在获取成员列表，请稍候\' : ($ctrl.searchText ? \'无匹配成员信息\' : \'无成员信息\') }}"\n          edited-data="$ctrl.editedData"\n          on-save="$ctrl.updateUserRole(data)"\n          on-delete="$ctrl.removeUser(data)"\n          no-edit="$ctrl.noEdit"\n          no-delete="$ctrl.noDelete"\n        ></form-table>\n        <div class="collection-member-loading-cover" ng-show="$ctrl.loading">\n        </div>\n      </div>\n    ',
            bindings: {
                ngModel: "=?",
                collectionType: "<?",
                collectionId: "<?",
                onNoPermission: "&?",
                onRoleChange: "&",
                helpText: "@"
            },
            controller: ["$scope", "api", "dialog", function (e, n, t) {
                var o = this;
                o.loading = !1, o.userRole = null;
                var l = function () {
                        return t.continue.apply(t, arguments).then(function (e) {
                            if (e !== t.button.BUTTON_OK) throw ""
                        })
                    },
                    r = ["MASTER", "DEVELOPER", "REPORTER", "GUEST"],
                    i = function (e) {
                        return r.indexOf(e) + 1 || r.length
                    },
                    a = function (e) {
                        var t = null;
                        return t = e ? "您将要把自己的权限降低为" + e + "，修改后您可能无法继续编辑成员信息或执行部分管理操作，确认要继续吗？" : "您将要把自己从成员列表中删除，删除后您将不能继续访问相关资源，确认要继续吗？", n.SimplePromise.resolve(l("您的权限即将发生变化", t))
                    },
                    c = function (e) {
                        return n.SimplePromise.resolve(l("确认删除成员", "您将要把" + e + "从成员列表中删除，确认要继续吗？"))
                    };
                o.addMember = function () {
                    if (o.currentCollection) {
                        var e = void 0;
                        if ("MEMBER" === o.addingType) {
                            if (!o.chosedMemberList || !o.chosedMemberList.length) return;
                            var l = o.chosedMemberList.map(function (e) {
                                return {
                                    id: e.id,
                                    role: o.addingMemberRole
                                }
                            });
                            e = n.SimplePromise.resolve(l)
                        } else {
                            if (!o.chosedGroup) return;
                            e = n.memberCollection.get(o.chosedGroup), "DEFAULT" !== o.addingGroupRole && (e = e.then(function (e) {
                                return e.forEach(function (e) {
                                    e.role = o.addingGroupRole
                                }), e
                            }))
                        }
                        o.loading = !0, e.then(function (e) {
                            return n.memberCollection.add(o.currentCollection, e)
                        }).then(function () {
                            o.chosedMemberList = [], o.chosedGroup = void 0
                        }, function (e) {
                            t.error("操作失败", e.message || "添加用户时发生错误")
                        }).catch(function (e) {
                            t.error("操作失败", e.message || "获取组成员时发生错误")
                        }).then(function () {
                            return u()
                        }).then(function () {
                            o.loading = !1
                        })
                    }
                }, o.updateUserRole = function (e) {
                    o.loading = !0;
                    var l = null;
                    l = e.id === o.myInfo.id && i(e.role) > i(o.userRole) && !o.myInfo.isAdmin ? a(e.role) : n.SimplePromise.resolve(), l.then(function () {
                        return n.memberCollection.modify(o.currentCollection, e)
                    }, function () {}).catch(function (e) {
                        t.error("操作失败", e.message || "修改权限时放生错误")
                    }).then(function () {
                        return u()
                    }).then(function () {
                        o.loading = !1
                    })
                }, o.removeUser = function (e) {
                    o.loading = !0;
                    var l = null;
                    l = e.id !== o.myInfo.id || o.myInfo.isAdmin ? c(e.name) : a(), l.then(function () {
                        return n.memberCollection.delete(o.currentCollection, e)
                    }, function () {}).catch(function (e) {
                        t.error("操作失败", e.message || "删除用户时发生错误")
                    }).then(function () {
                        return u()
                    }).then(function () {
                        o.loading = !1
                    })
                }, o.ngModel = [], o.value = [], o.noEdit = [], o.noDelete = [], o.editedData = {};
                var s = function (e, n, t) {
                    o.ngModel = e, o.noEdit = [], o.noDelete = [], "MASTER" !== t && (o.noEdit = e.slice(0), o.noDelete = e.filter(function (e) {
                        return e.id !== n.id
                    }));
                    var l = e.filter(function (e) {
                        return "MASTER" === e.role
                    });
                    1 === l.length && (o.noEdit.push(l[0]), o.noDelete.push(l[0]));
                    var r = {},
                        i = {},
                        a = angular.copy(e);
                    Object.keys(o.editedData).forEach(function (e) {
                        var n = o.editedData[e];
                        r[n.id] = n, i[n.id] = o.value[e]
                    });
                    var c = {};
                    e.forEach(function (e, n) {
                        r[e.id] && (c[n] = e, a[n] = i[e.id])
                    }), o.value = a, o.editedData = c
                };
                o.currentCollection = null;
                var u = function (e) {
                        null == e && (e = o.currentCollection);
                        var l = n.memberCollection.myRole(e),
                            r = n.user.whoami(),
                            i = n.memberCollection.get(e);
                        return l.then(function (e) {
                            o.userRole = e, o.onRoleChange({
                                role: e
                            })
                        }), r.then(function (e) {
                            o.myInfo = e
                        }), n.SimplePromise.all([i, r, l]).then(function (n) {
                            var t = _slicedToArray(n, 3),
                                l = t[0],
                                r = t[1],
                                i = t[2];
                            e.id === o.collectionId && e.type === o.collectionType && (o.currentCollection = e, s(l, r, i))
                        }).catch(function (e) {
                            return l.then(function (n) {
                                if ("GUEST" !== n || !o.onNoPermission) throw e;
                                o.onNoPermission()
                            }).catch(function (e) {
                                t.error("操作失败", e.message || "获取成员信息时发生错误")
                            })
                        })
                    },
                    d = function (e) {
                        return m(), u(e)
                    },
                    m = function () {
                        return o.ngModel = void 0, o.currentCollection = null, o.role = null, o.editedData = {}, n.SimplePromise.resolve()
                    },
                    p = function () {
                        var e = void 0;
                        o.collectionType && o.collectionId || (e = null), e = {
                            type: o.collectionType,
                            id: o.collectionId
                        };
                        var n = void 0;
                        n = e ? d(e) : m(), o.loading = !0, n.then(function () {
                            return o.loading = !1
                        })
                    };
                e.$watchGroup(["$ctrl.collectionType", "$ctrl.collectionId"], p)
            }]
        }), e.component("formSelectorImage", {
            template: '\n      <div class="com-select-con add-mirror" select-con>\n        <input class="ui-input-white ui-btn-select input-image"\n          placeholder="{{ $ctrl.placeholder }}" ng-model="imageKey" />\n        <ul class="select-list">\n          <li class="select-item" ng-repeat="image in $ctrl.imageList | filter: { \'imageName\': imageKey }">\n            <a ng-click="$ctrl.choseImage(image)"><span ng-bind="image.imageName"></span><span class="txt-prompt pull-right" ng-bind="image.registry"></span></a>\n          </li>\n        </ul>\n      </div>\n    ',
            bindings: {
                onImageSelected: "&",
                imageList: "<",
                placeholder: "<"
            },
            controller: [function () {
                var e = this;
                e.choseImage = function (n) {
                    e.onImageSelected({
                        image: n
                    })
                }
            }]
        }), e.component("formSelectorProjectImage", {
            template: '\n      <form-selector-image\n        on-image-selected="$ctrl.subOnImageSelected(image)"\n        image-list="$ctrl.imageList"\n        placeholder="$ctrl.placeholder"\n      ></form-selector-image>\n    ',
            bindings: {
                onImageSelected: "&"
            },
            controller: ["$http", function (e) {
                var n = this;
                n.placeholder = "选择镜像", n.imageList = [], e.get("/api/image").then(function (e) {
                    var t = e.data.result || [];
                    Array.prototype.push.apply(n.imageList, t)
                }), n.subOnImageSelected = function (e) {
                    n.onImageSelected({
                        image: e
                    })
                }
            }]
        }), e.component("addMultipleMember", {
            template: '\n        <div class="collection-member-adding-panel">\n            <form-multiple-inline algin="left">\n                <form-multiple-inline-item class="collection-member-users-selector-container">\n                    <multiple-user-select ng-model="$ctrl.addingUserList" placeholder="选择成员"></multiple-user-select>\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="collection-member-role-selector-container">\n                    <form-select ng-init="$ctrl.addingUserRole = \'MASTER\'" ng-model="$ctrl.addingUserRole" options="[{ value: \'MASTER\', text: \'MASTER\' }, { value: \'DEVELOPER\', text: \'DEVELOPER\'}, {value: \'REPORTER\', text: \'REPORTER\'}]" show-search-input="never")></form-select>\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="collection-member-add-button-container">\n                    <button class="collection-member-new-button" type="button" ng-click="$ctrl.addUser()">添加</button>\n                </form-multiple-inline-item>\n            </form-multiple-inline>\n        </div>\n        <form-table \n            ng-model="$ctrl.chosenUserList" \n            template="chosenUserTable" \n            columns="[\n                {text: \'成员名称\', key: \'name\', width: \'50%\'},\n                {text: \'角色权限\', key: \'role\', width: \'35%\'}\n            ]"\n            on-delete \n            no-delete="$ctrl.noDelete" \n            compare-key="id"\n            param="{myself: $ctrl.myself}"\n        ></form-table>\n        <script type="text/ng-template" id="chosenUserTable">\n            <div ng-if="column.key === \'name\'" ng-bind="value"></div>\n            <div ng-if="param.myself.id !== row.id && column.key === \'role\'">\n                <form-select\n                    ng-model="row.role"\n                    options="[\n                        {value: \'MASTER\', text: \'MASTER\'},\n                        {value: \'DEVELOPER\', text: \'DEVELOPER\'},\n                        {value: \'REPORTER\', text: \'REPORTER\'}\n                      ]"\n                    show-search-input="never"\n                ></form-select>\n            </div>\n            <div ng-if="param.myself.id == row.id && column.key === \'role\'" ng-bind="value"></div>\n        </script>',
            bindings: {
                chosenUserList: "=?"
            },
            controller: ["api", function (e) {
                var n = this;
                n.chosenUserList = [], n.noDelete = [], e.user.whoami().then(function (e) {
                    var t = e;
                    n.myself = {
                        id: t.id,
                        name: t.name,
                        role: "MASTER"
                    }, n.noDelete.push(n.myself), n.chosenUserList.push({
                        id: t.id,
                        name: t.name,
                        role: "MASTER"
                    })
                }), n.addUser = function () {
                    n.addingUserList.map(function (e) {
                        n.chosenUserList.every(function (n) {
                            return n.id !== e.id
                        }) && n.chosenUserList.push({
                            id: e.id,
                            name: e.name,
                            role: n.addingUserRole
                        })
                    }), n.addingUserList = []
                }
            }]
        }), e.component("clusterSelector", {
            template: '\n      <form-select \n        ng-model="$ctrl.ngModel" \n        name="$ctrl.name" \n        options="$ctrl.clusterSelectorList" \n        placeholder="请选择集群" \n        on-change="$ctrl.toggleCluster()" \n        show-search-input="never" \n        ng-required="$ctrl.required"\n        is-loading="$ctrl.isLoadingCluster" \n        loading-text="正在获取集群" \n        empty-text="无相关集群信息">\n      </form-select>\n      ',
            bindings: {
                name: "@",
                ngModel: "=?",
                onChange: "&",
                required: "@"
            },
            controller: ["$scope", "api", "$timeout", function (e, n, o) {
                var l = this;
                l.isLoadingCluster = !0, n.cluster.listCluster().then(function (e) {
                    var n = e || [];
                    l.clusterSelectorList = n.map(function (e) {
                        return {
                            text: e.name,
                            value: e
                        }
                    }), n.length > 0 && (l.ngModel ? l.ngModel = n.forEach(function (e) {
                        if (e.id === l.ngModel.id) return e
                    }) : l.ngModel = n[0])
                }).catch(function (e) {
                    console.log("clusterSelector list exception: ", e)
                }).then(function () {
                    l.isLoadingCluster = !1
                });
                var r = t(o, e);
                l.toggleCluster = function () {
                    r(function () {
                        l.onChange()
                    })
                }
            }]
        }), e.component("namespaceSelector", {
            template: '\n      <form-with-button width="150px">\n          <content-area>\n            <form-select ng-if="$ctrl.isDisplayExistentNamespace()" ng-model="$ctrl.value.namespace" name="{{ $ctrl.name + \'selector\' }}" on-change="$ctrl.toggleNamespace()" options="$ctrl.namespaceSelectorList" placeholder="请选择namespace" required="true" is-loading="isLoadingNamespace" loading-text="正在获取namespace" empty-text="无相关信息"></form-select>\n            <input ng-if="!$ctrl.isDisplayExistentNamespace()" ng-model="$ctrl.value.namespace" type="text" name="{{ $ctrl.name + \'input\' }}" placeholder="新建namespace" required is-namespace-Unique ng-pattern="/^[a-zA-Z][a-zA-Z0-9_-]*$/" clusterid="{{$ctrl.cluster.id}}" ng-model-options="{updateOn:\'default blur\',debounce:{default:500,blur:0}}" />\n            <form-error-message form="$ctrl.formName" target="{{ $ctrl.name + \'selector\' }}" type="required">namespace不能为空，请新建或者更改集群</form-error-message>\n            <form-error-message form="$ctrl.formName" target="{{ $ctrl.name + \'input\' }}" type="required">namespace不能为空</form-error-message>\n            <form-error-message form="$ctrl.formName" target="{{ $ctrl.name + \'input\' }}" type="isNamespaceUnique"> namespace已存在，请修改后重试！</form-error-message>\n            <form-error-message form="$ctrl.formName" target="{{ $ctrl.name + \'input\' }}" type="pattern"> namespace格式错误，请修改后重试！</form-error-message>\n          </content-area>\n        <button-area>\n            <button type="button" ng-click="$ctrl.toggleNamespaceFillInType()"> {{ $ctrl.namespaceFillInType[$ctrl.value.isExistentNamespace] }} </button>\n        </button-area>\n      </form-with-button>\n      ',
            bindings: {
                name: "@",
                ngModel: "=?",
                onChange: "&",
                cluster: "<?",
                formName: "<?"
            },
            controller: ["$scope", "api", "$timeout", function (e, n, o) {
                var l = this;
                l.value = {
                    isExistentNamespace: !0,
                    namespace: null
                }, l.namespaceFillInType = {
                    true: "新建namespace",
                    false: "选择已有namespace"
                }, l.isLoadingNamespace = !0;
                var r = function () {
                        l.cluster && l.cluster.id && n.cluster.getNamespace(l.cluster.id).then(function (e) {
                            var n = e || [];
                            l.namespaceSelectorList = [], n.forEach(function (e) {
                                "default" === e.name && (l.value.namespace = e.name), l.namespaceSelectorList.push({
                                    text: e.name,
                                    value: e.name
                                })
                            }), n.length > 0 && null == l.value.namespace ? l.value.namespace = n[0].name : 0 === n.length && l.value.isExistentNamespace && (l.value.namespace = null), l.isLoadingNamespace = !1
                        }).catch(function (e) {
                            l.isLoadingNamespace = !1, console.log("exception: ", e)
                        })
                    },
                    i = t(o, e);
                l.toggleNamespace = function () {
                    i(function () {
                        l.onChange()
                    })
                }, l.isDisplayExistentNamespace = function () {
                    return l.value.isExistentNamespace
                };
                var a = "";
                l.toggleNamespaceFillInType = function () {
                    l.value.isExistentNamespace ? (a = l.ngModel.namespace, l.value.namespace = null) : l.value.namespace = a, l.value.isExistentNamespace = !l.value.isExistentNamespace
                }, e.$watch("$ctrl.cluster", r), e.$watch("$ctrl.value", function () {
                    l.ngModel = l.value
                })
            }]
        }), e.component("formMultipleSelectList", {
            template: '\n        <form-multiple-select name="{{ $ctrl.name || \'\'}}" ng-model="$ctrl.value" on-change="$ctrl.output()" \n        options="$ctrl.candidateList" placeholder="{{$ctrl.placeholder || \'\' }}" is-loading="$ctrl.isLoading" loading-text=" {{ $ctrl.loadingText || \'\' }}" empty-text="{{ $ctrl.emptyText || \'\' }}" required="true">\n        </form-multiple-select>\n        <form-error-message form="$ctrl.formName" target="{{ $ctrl.name || \'\'}}" type="required">{{$ctrl.errorMessage || \'\'}}</form-error-message>\n      ',
            bindings: {
                ngModel: "=?",
                parameters: "<?",
                formName: "<?",
                placeholder: "@",
                loadingText: "@",
                emptyText: "@",
                errorMessage: "@",
                name: "@",
                getListFn: "@"
            },
            controller: ["$scope", "api", "$filter", function (e, n, t) {
                var o = this;
                o.candidateList = [];
                var l = n.SimplePromise.resolve({}),
                    r = function () {
                        Object.keys(o.parameters).filter(function (e) {
                            return void 0 === o.parameters[e]
                        }).length || o.getListFn && (o.isLoading = !0, l = n.listItem[o.getListFn](o.parameters).then(function (e) {
                            return o.candidateList = e, {
                                parameters: o.parameters,
                                result: e
                            }
                        }), l.catch(function () {}).then(function () {
                            o.isLoading = !1, o.input()
                        }))
                    };
                o.input = function () {
                    angular.isArray(o.ngModel) && 0 !== (o.ngModel || []).length && l.then(function (e) {
                        if (angular.equals(e.parameters, o.parameters)) {
                            var n = [];
                            o.ngModel.forEach(function (o) {
                                e.result.forEach(function (e) {
                                    angular.isObject(o) ? t("filter")([o], e.match, !0).length && n.push(e.value) : o === e.match && n.push(e.value)
                                })
                            }), o.value = n, o.output()
                        }
                    })
                }, o.output = function () {
                    angular.equals(o.ngModel, o.value) || (o.ngModel = o.value)
                }, e.$watch("$ctrl.parameters", r, !0), e.$watch("$ctrl.getListFn", r), e.$watch("$ctrl.ngModel", o.input)
            }]
        }), e.component("formSelectList", {
            template: '\n      <form-select ng-model="$ctrl.value" name="{{ $ctrl.name }}" on-change="$ctrl.toggle()" options="$ctrl.candidateList" show-search-input="always" placeholder="{{$ctrl.placeholder}}" is-loading="$ctrl.isLoading" loading-text="{{$ctrl.loadingText}}" empty-text="{{$ctrl.emptyText}}" required="true"></form-select>\n      <form-error-message form="$ctrl.formName" target="{{ $ctrl.name }}" type="required">{{$ctrl.errorMessage}}</form-error-message>\n    ',
            bindings: {
                name: "@",
                ngModel: "=?",
                formName: "<?",
                fallbackOptions: "<?",
                parameters: "<?",
                onChange: "&",
                loadingText: "@",
                emptyText: "@",
                placeholder: "@",
                errorMessage: "@",
                getListFn: "@"
            },
            controller: ["$scope", "api", "$timeout", "$filter", function (e, n, t, o) {
                var l = this;
                l.candidateList = [];
                var r = n.SimplePromise.resolve({}),
                    i = function () {
                        Object.keys(l.parameters).filter(function (e) {
                            return void 0 === l.parameters[e]
                        }).length || Object.keys(l.parameters).filter(function (e) {
                            return null === l.parameters[e]
                        }).length || l.getListFn && (l.isLoading = !0, r = n.listItem[l.getListFn](l.parameters).then(function (e) {
                            return l.fallbackOptions && l.fallbackOptions.text && l.fallbackOptions.value && (e.some(function (e) {
                                return e.text === l.fallbackOptions.text
                            }) || e.push(l.fallbackOptions)), l.candidateList = e, {
                                parameters: l.parameters,
                                result: e
                            }
                        }), r.catch(function () {}).then(function () {
                            l.isLoading = !1, l.input()
                        }))
                    };
                l.input = function () {
                    l.ngModel && r.then(function (e) {
                        angular.equals(e.parameters, l.parameters) && (e.result.some(function (e) {
                            return !!o("filter")([l.ngModel], e.match, !0).length && (l.value = e.value, !0)
                        }) || (l.value = null), l.output())
                    })
                }, l.output = function () {
                    angular.equals(l.ngModel, l.value) || (l.ngModel = l.value)
                }, l.toggle = function () {
                    l.output(), t(function () {
                        l.onChange()
                    })
                }, e.$watch("$ctrl.parameters", i, !0), e.$watch("$ctrl.getListFn", i), e.$watch("$ctrl.ngModel", l.input)
            }]
        })
}(window.formInputs = window.formInputs || angular.module("formInputs", ["backendApi", "domeModule", "ngSanitize"]));
"use strict";

function _toConsumableArray(r) {
    if (Array.isArray(r)) {
        for (var t = 0, e = Array(r.length); t < r.length; t++) e[t] = r[t];
        return e
    }
    return Array.from(r)
}! function (r) {
    r.filter("byte", function () {
        return function (r) {
            if ("number" != typeof r || !isFinite(r) || r < 0) return "N/A";
            for (var t = [].concat(_toConsumableArray(" KMGTPEZY")).map(function (r) {
                    return r.trim() + "B"
                }), e = 0, n = r; n > 1e3;) n /= 1024, e++;
            return e >= t.length ? "N/A" : ("" + n).slice(0, 4).replace(/\.$/, "") + t[e]
        }
    }), r.filter("day", ["$filter", function (r) {
        return function (t) {
            return +t ? r("date")(t, "yyyy-MM-dd") : "暂无"
        }
    }]), r.filter("time", ["$filter", function (r) {
        return function (t) {
            return +t ? r("date")(t, "yyyy-MM-dd HH:mm:ss") : "暂无"
        }
    }]), r.filter("reldate", ["$filter", function (r) {
        return function (t, e) {
            var n = new Date;
            return n.setDate(n.getDate() + t), r("date")(n, e || "yyyy-MM-dd")
        }
    }])
}(window.commonFilters = window.commonFilters || angular.module("commonFilters", []));
"use strict";
! function (o) {
    var n = angular.module("domeModule", []);
    n.config(["$httpProvider", function (o) {
        o.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8", o.interceptors.push(["$rootScope", "$q", function (o, n) {
            return {
                responseError: function (o) {
                    o.config.ignore401 || 401 !== o.status || (location.href = "/login/login.html?redirect=" + encodeURIComponent(location.href))
                },
                response: function (o) {
                    return o.config.notIntercept ? o : o.data.resultCode && 200 != o.data.resultCode ? n.reject(o) : o || n.resolve(o)
                }
            }
        }])
    }]), n.factory("$domePublic", ["$modal", function (o) {
        var n = {},
            t = function () {
                this.isLoading = !1, this.loadingItems = {}
            };
        return t.prototype = {
            startLoading: function (o) {
                this.loadingItems[o] = !0, this.isLoading || (this.isLoading = !0)
            },
            finishLoading: function (o) {
                var n = this,
                    t = !1;
                n.loadingItems[o] = !1, angular.forEach(n.loadingItems, function (o) {
                    o && !t && (t = !0)
                }), n.isLoading = t
            }
        }, n.getLoadingInstance = function () {
            return new t
        }, n
    }]), n.factory("$publicApi", ["$http", function (o) {
        var n = {};
        return n.getDomeVersion = function () {
            return o.get("/api/global/version")
        }, n.getDbConfig = function () {
            return o.get("/api/global/database")
        }, n.getCurrentUser = function () {
            return o.get("/api/user/get")
        }, n.modifyUserInfo = function (n) {
            return o.post("/api/user/modify", angular.toJson(n))
        }, n.logout = function () {
            location.href = "/api/user/logout?from=" + encodeURIComponent(location.protocol + "//" + location.host)
        }, n
    }]), o.domeModule = n
}(window);
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
! function (e, t) {
    function n(e, n, i, o, r, a, s, l, c, u, f) {
        var d = n.getInstance("NodeService"),
            h = function () {
                var t = "/api/deploy";
                this.getList = function () {
                    return e.get(t + "/list")
                }, this.getListByCollectionId = function (n) {
                    return e.get(t + "/list/" + n)
                }, this.getSingle = function (n) {
                    return e.get(t + "/id/" + n)
                }, this.modifyDeploy = function (n, i) {
                    return e.put(t + "/id/" + n, angular.toJson(i))
                }, this.getEvents = function (n) {
                    return e.get(t + "/event/list?deployId=" + n)
                }, this.getInstances = function (n) {
                    return e.get(t + "/" + n + "/instance")
                }, this.getVersions = function (t) {
                    return e.get("/api/version/list?deployId=" + t)
                }, this.getSingleVersion = function (t, n) {
                    return e.get("/api/version/id/" + t + "/" + n)
                }, this.createVersion = function (t) {
                    return e.post("/api/version/create?deployId=" + t.deployId, angular.toJson(t))
                }, this.createWatcherVersion = function (t) {
                    return e.post("/api/version/create?deployId=" + t.deployId, angular.toJson(t))
                }, this.rollbackDeploy = function (t, n, i) {
                    return i ? e.post("/api/deploy/action/rollback?deployId=" + t + "&version=" + n + "&replicas=" + i) : e.post("/api/deploy/action/rollback?deployId=" + t + "&version=" + n)
                }, this.updateDeploy = function (t, n, i) {
                    return i ? e.post("/api/deploy/action/update?deployId=" + t + "&version=" + n + "&replicas=" + i) : e.post("/api/deploy/action/update?deployId=" + t + "&version=" + n)
                }, this.startDeploy = function (t, n, i) {
                    return i ? e.post("/api/deploy/action/start?deployId=" + t + "&version=" + n + "&replicas=" + i) : e.post("/api/deploy/action/start?deployId=" + t + "&version=" + n)
                }
            },
            v = new h,
            y = function () {
                function a(e) {
                    _classCallCheck(this, a), this.collectionId = "", this.namespaceList = [], this.isNewNamespace = !1, this.imageList = null, this.envList = [{
                        value: "TEST",
                        text: "测试环境"
                    }, {
                        value: "PROD",
                        text: "生产环境"
                    }], this.valid = {
                        ips: !1
                    }, this.logConfig = null, this.envText = "请选择部署环境", this.versionList = null, this.nodeListIns = n.getInstance("NodeList"), this.nodeListForIps = [], this.clusterListIns = n.getInstance("ClusterList"), this.loadingIns = o.getLoadingInstance(), this.creator = {
                        id: null,
                        name: null,
                        type: null
                    }, this.visitMode = "noAccess", this.hostEnv = "TEST", this.config = {}, this.defaultVersionString = {
                        YAML: 'containers:\n- image: "pub.domeos.org/registry:2.3"\n  name: "test-container"\n  volumeMounts:\n  - mountPath: "/test-hostpath"\n    name: "test-volume"\nvolumes:\n- hostPath:\n    path: "/opt/scs"\n  name: "test-volume"\n',
                        JSON: '{\n  "containers": [{\n    "image": "pub.domeos.org/registry:2.3",\n    "name": "test-container",\n    "volumeMounts": [{\n      "mountPath": "/test-hostpath",\n      "name": "test-volume"\n    }]\n  }],\n  "volumes": [{\n    "hostPath": {\n      "path": "/opt/scs"\n    },\n    "name": "test-volume"\n  }]\n}\n'
                    }, this.mountVolumeType = {
                        HOSTPATH: "主机目录",
                        EMPTYDIR: "实例内目录"
                    }, this.storageVolumeConsole = [], this.init(e)
                }
                return _createClass(a, [{
                    key: "init",
                    value: function (e) {
                        var n = this,
                            i = void 0,
                            o = void 0,
                            r = -1;
                        c.isObject(e) || (e = {}), e.deploymentType || (e.deploymentType = "DEPLOYMENT"), e.volumeDrafts || (e.volumeDrafts = []), e.versionType || (e.versionType = "CUSTOM"), "YAML" !== e.versionType && "JSON" !== e.versionType || (e.versionString = e.versionString || {}, e.versionString.podSpec = e.versionString.padSpec || ""), "number" != typeof e.replicas && (e.replicas = 3), c.isArray(e.loadBalanceDrafts) || (e.loadBalanceDrafts = []), c.isArray(e.innerServiceDrafts) || (e.innerServiceDrafts = []), c.isArray(e.currentVersions) || (e.currentVersions = []);
                        var a = !0,
                            s = !1,
                            l = t;
                        try {
                            for (var u, f = e.loadBalanceDrafts[Symbol.iterator](); !(a = (u = f.next()).done); a = !0) {
                                var d = u.value;
                                d.externalIPs || (d.externalIPs = []);
                                var h = [],
                                    y = !0,
                                    g = !1,
                                    p = t;
                                try {
                                    for (var m, I = d.externalIPs[Symbol.iterator](); !(y = (m = I.next()).done); y = !0) {
                                        var k = m.value;
                                        h.push({
                                            ip: k
                                        })
                                    }
                                } catch (e) {
                                    g = !0, p = e
                                } finally {
                                    try {
                                        !y && I.return && I.return()
                                    } finally {
                                        if (g) throw p
                                    }
                                }
                                h.push({
                                    ip: ""
                                }), d.externalIPs = h
                            }
                        } catch (e) {
                            s = !0, l = e
                        } finally {
                            try {
                                !a && f.return && f.return()
                            } finally {
                                if (s) throw l
                            }
                        }
                        if (this.config = e, this.addLoadBalance(), this.addInnerService(), this.config.networkMode || (this.config.networkMode = "DEFAULT"), this.config.accessType || (this.config.accessType = "K8S_SERVICE"), i = this.config.currentVersions, this.config.deployId) {
                            null === this.versionList && (this.loadingIns.startLoading("versions"), v.getVersions(this.config.deployId).then(function (e) {
                                n.versionList = e.data.result || [], 0 === i.length && c.isObject(n.versionList[0]) && n.toggleVersion(n.versionList[0].version)
                            }).finally(function () {
                                n.loadingIns.finishLoading("versions")
                            }));
                            for (var C = 0, L = i.length; C < L; C++) i[C].createTime > r && (r = i[C].createTime, o = i[C].version);
                            void 0 !== o && this.toggleVersion(o)
                        } else this.initData()
                    }
                }, {
                    key: "initData",
                    value: function () {
                        var e = this;
                        if (c.isArray(this.config.containerConsoles) || (this.config.containerConsoles = []), c.isArray(this.config.labelSelectors) || (this.config.labelSelectors = []), this.initSelectedLabels(), this.config.hostEnv) {
                            var n = !0,
                                o = !1,
                                r = t;
                            try {
                                for (var a, s = this.envList[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                                    var l = a.value;
                                    if (this.config.hostEnv === l.value) {
                                        this.toggleEnv(l);
                                        break
                                    }
                                }
                            } catch (e) {
                                o = !0, r = e
                            } finally {
                                try {
                                    !n && s.return && s.return()
                                } finally {
                                    if (o) throw r
                                }
                            }
                        } else this.toggleEnv(this.envList[0]);
                        this.config.stateful !== !0 && (c.isArray(this.imageList) || "WATCHER" === this.config.versionType ? this.formartcontainerConsoles() : (this.loadingIns.startLoading("dockerImage"), i.imageService.getProjectImages().then(function (n) {
                            var i = n.data.result || [],
                                o = !0,
                                r = !1,
                                a = t;
                            try {
                                for (var s, l = i[Symbol.iterator](); !(o = (s = l.next()).done); o = !0) {
                                    var c = s.value,
                                        u = [];
                                    if (c.envSettings) {
                                        var f = !0,
                                            d = !1,
                                            h = t;
                                        try {
                                            for (var v, y = c.envSettings[Symbol.iterator](); !(f = (v = y.next()).done); f = !0) {
                                                var g = v.value;
                                                u.push({
                                                    key: g.key,
                                                    value: g.value,
                                                    description: g.description
                                                })
                                            }
                                        } catch (e) {
                                            d = !0, h = e
                                        } finally {
                                            try {
                                                !f && y.return && y.return()
                                            } finally {
                                                if (d) throw h
                                            }
                                        }
                                    }
                                    c.envSettings = u
                                }
                            } catch (e) {
                                r = !0, a = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (r) throw a
                                }
                            }
                            e.imageList = i, e.formartcontainerConsoles()
                        }).finally(function () {
                            e.loadingIns.finishLoading("dockerImage")
                        })));
                        var u = !0,
                            f = !1,
                            d = t;
                        try {
                            for (var h, v = this.config.containerConsoles[Symbol.iterator](); !(u = (h = v.next()).done); u = !0) {
                                var y = h.value;
                                this.addLogDraft(y), this.linkVolumeMountToVolume(y, this.config.volumeDrafts)
                            }
                        } catch (e) {
                            f = !0, d = e
                        } finally {
                            try {
                                !u && v.return && v.return()
                            } finally {
                                if (f) throw d
                            }
                        }
                    }
                }, {
                    key: "setCollectionId",
                    value: function (e) {
                        this.collectionId = e
                    }
                }, {
                    key: "initCluster",
                    value: function () {
                        var e = this;
                        return this.loadingIns.startLoading("cluster"), d.getData().then(function (t) {
                            e.clusterListIns.init(t.data.result), e.toggleCluster()
                        }).finally(function () {
                            e.loadingIns.finishLoading("cluster")
                        })
                    }
                }, {
                    key: "freshDeploy",
                    value: function (e) {
                        c.isObject(e) && (this.config.lastUpdateTime = e.lastUpdateTime, this.config.deploymentStatus = e.deploymentStatus, this.config.currentVersions = e.currentVersions, this.config.currentReplicas = e.currentReplicas)
                    }
                }, {
                    key: "freshVersionList",
                    value: function () {
                        var e = this;
                        this.loadingIns.startLoading("versionList"), v.getVersions(this.config.deployId).then(function (t) {
                            e.versionList = t.data.result || []
                        }).finally(function () {
                            e.loadingIns.finishLoading("versionList")
                        })
                    }
                }, {
                    key: "toggleCluster",
                    value: function (e) {
                        var n = this,
                            i = void 0,
                            o = this.clusterListIns.clusterList;
                        if (0 !== o.length) {
                            if (void 0 === e) {
                                for (var r = 0, a = o.length; r < a; r++)
                                    if (o[r].id === this.config.clusterId) {
                                        e = r;
                                        break
                                    }
                                void 0 === e && (e = 0)
                            }
                            this.clusterListIns.toggleCluster(e), this.logConfig = o[e].logConfig, i = this.clusterListIns.cluster.id, this.initStorageVolumeList(i), this.loadingIns.startLoading("nodelist"), d.getNodeList(i).then(function (e) {
                                var i = e.data.result || [];
                                n.nodeListForIps = angular.copy(i);
                                for (var o = 0; o < n.nodeListForIps.length; o++) {
                                    var r = n.nodeListForIps[o];
                                    if ("Ready" == r.status) {
                                        var a = n.config.loadBalanceDrafts[0].externalIPs,
                                            s = !0,
                                            l = !1,
                                            c = t;
                                        try {
                                            for (var u, f = a[Symbol.iterator](); !(s = (u = f.next()).done); s = !0) {
                                                if (u.value === r.ip) {
                                                    r.isSelected = !0;
                                                    break
                                                }
                                            }
                                        } catch (e) {
                                            l = !0, c = e
                                        } finally {
                                            try {
                                                !s && f.return && f.return()
                                            } finally {
                                                if (l) throw c
                                            }
                                        }
                                        void 0 === r.isSelected && (r.isSelected = !1)
                                    } else n.nodeListForIps.splice(o, 1), o--
                                }
                                if (n.nodeListIns.init(i, n.config.stateful), n.initSelectedLabels(), n.nodeListIns.toggleEnv(n.config.hostEnv), n.config.stateful && n.config.replicas && n.nodeListIns.nodeList)
                                    for (var d = 0, h = n.nodeListIns.nodeList.length; d < h && d < n.config.replicas; d++) n.nodeListIns.nodeList[d].isSelected = !0, n.nodeListIns.toggleNodeCheck(n.nodeListIns.nodeList[d])
                            }, function () {
                                n.nodeListIns.init()
                            }).finally(function () {
                                n.loadingIns.finishLoading("nodelist")
                            }), void 0 === this.config.deployId && (this.loadingIns.startLoading("namespace"), d.getNamespace(i).then(function (e) {
                                n.namespaceList = e.data.result || [], n.isNewNamespace = !1, n.config.namespace = n.namespaceList[0].name || null;
                                for (var t = 0, i = n.namespaceList.length; t < i; t++)
                                    if ("default" == n.namespaceList[t].name) {
                                        n.config.namespace = n.namespaceList[t].name;
                                        break
                                    }
                            }, function () {
                                n.isNewNamespace = !1, n.namespaceList = [], n.config.namespace = null
                            }).finally(function () {
                                n.loadingIns.finishLoading("namespace")
                            }))
                        }
                    }
                }, {
                    key: "initSelectedLabels",
                    value: function () {
                        if (this.nodeListIns.initLabelsInfo(), this.config.labelSelectors) {
                            var e = this.config.labelSelectors,
                                n = !0,
                                i = !1,
                                o = t;
                            try {
                                for (var r, a = e[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                    var s = r.value,
                                        l = s.name;
                                    "kubernetes.io/hostname" != l && "TESTENV" != l && "PRODENV" != l && this.nodeListIns.toggleLabel(l, !0)
                                }
                            } catch (e) {
                                i = !0, o = e
                            } finally {
                                try {
                                    !n && a.return && a.return()
                                } finally {
                                    if (i) throw o
                                }
                            }
                        }
                    }
                }, {
                    key: "validIps",
                    value: function () {
                        if ("foreign" === this.visitMode) {
                            var e = !0,
                                n = !1,
                                i = t;
                            try {
                                for (var o, r = this.nodeListForIps[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                                    if (o.value.isSelected) return void(this.valid.ips = !0)
                                }
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !e && r.return && r.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            this.valid.ips = !1
                        } else this.valid.ips = !0
                    }
                }, {
                    key: "toggleVersion",
                    value: function (e) {
                        var t = this;
                        this.loadingIns.startLoading("toggleVersion"), v.getSingleVersion(this.config.deployId, e).then(function (e) {
                            c.isObject(e.data.result) && ($.extend(t.config, e.data.result), t.initData())
                        }).finally(function () {
                            t.loadingIns.finishLoading("toggleVersion")
                        })
                    }
                }, {
                    key: "formartcontainerConsoles",
                    value: function () {
                        for (var e = this, t = this.config.containerConsoles, n = 0, o = t.length; n < o; n++) {
                            t[n].oldEnv = [], t[n].newEnv = [],
                                function (t) {
                                    e.loadingIns.startLoading("tag"), i.imageService.getImageTags(t.image, t.registry).then(function (e) {
                                        t.tagList = e.data.result || []
                                    }).finally(function () {
                                        e.loadingIns.finishLoading("tag")
                                    })
                                }(t[n]);
                            for (var r = [], a = 0, s = this.imageList.length; a < s; a++)
                                if (this.imageList[a].imageName === t[n].image) {
                                    r = this.imageList[a].envSettings;
                                    break
                                }
                            if (t[n].envs)
                                for (var l = 0, c = t[n].envs.length; l < c; l++) {
                                    for (var u = !1, f = 0, d = r.length; f < d; f++)
                                        if (r[f].key === t[n].envs[l].key) {
                                            u = !0;
                                            break
                                        }
                                    u ? t[n].oldEnv.push(t[n].envs[l]) : t[n].newEnv.push(t[n].envs[l])
                                } else t[n].oldEnv = angular.copy(r)
                        }
                    }
                }, {
                    key: "changeVisitModeToValid",
                    value: function () {
                        var e = [];
                        e.push("noAccess"), "HOST" === this.config.networkMode && e.push("access"), "DEFAULT" === this.config.networkMode && e.push("internal", "foreign"), e.indexOf(this.visitMode) === -1 && (this.visitMode = e[0])
                    }
                }, {
                    key: "toggleNamespace",
                    value: function (e) {
                        this.config.namespace = e
                    }
                }, {
                    key: "toggleIsNewNamespace",
                    value: function () {
                        this.isNewNamespace = !this.isNewNamespace, this.config.namespace = null
                    }
                }, {
                    key: "toggleEnv",
                    value: function (e) {
                        this.config.hostEnv = e.value, this.envText = e.text, this.nodeListIns.toggleEnv(e.value)
                    }
                }, {
                    key: "toggleCreator",
                    value: function (e) {
                        this.creator = e
                    }
                }, {
                    key: "toggleVolumeType",
                    value: function (e, t) {
                        e.volumeType = t
                    }
                }, {
                    key: "toggleStorageVolumeReadonly",
                    value: function (e, t) {
                        e.volumePVC.readOnly = t
                    }
                }, {
                    key: "toggleStorageVolumeName",
                    value: function (e, t) {
                        e.volumePVC.volumeId = t.storageVolumeDraft.id, e.volumePVC.volumeName = t.storageVolumeDraft.name, e.volumePVC.claimName = t.storageVolumeDraft.name
                    }
                }, {
                    key: "deleteVolumeDraft",
                    value: function (e, t) {
                        var n = this.config.volumeDrafts,
                            i = n.indexOf(e);
                        n.splice(i, 1), this.deleteVolumeMountDraftByVolume(e, t)
                    }
                }, {
                    key: "addVolumeDraft",
                    value: function () {
                        this.config.volumeDrafts = this.config.volumeDrafts || [], this.config.volumeDrafts.push({
                            name: "",
                            volumeType: "HOSTPATH",
                            hostPath: "",
                            emptyDir: "",
                            volumePVC: {
                                claimName: "",
                                readOnly: !1,
                                volumeId: null,
                                volumeName: null
                            }
                        })
                    }
                }, {
                    key: "toggleImageTag",
                    value: function (e, t) {
                        this.config.containerConsoles[e].tag = t
                    }
                }, {
                    key: "addImage",
                    value: function (e) {
                        var t = this;
                        this.loadingIns.startLoading("addImage"), i.imageService.getImageTags(e.imageName, e.registry).then(function (n) {
                            var i = n.data.result;
                            t.config.containerConsoles.push({
                                image: e.imageName,
                                registry: e.registry,
                                cpu: .5,
                                mem: 1024,
                                tag: i && i[0] ? i[0].tag : void 0,
                                tagList: i || [],
                                oldEnv: e.envSettings || [],
                                newEnv: [],
                                healthChecker: {
                                    type: "NONE"
                                },
                                imagePullPolicy: "Always",
                                autoDeploy: !1,
                                logItemDrafts: [{
                                    logPath: "",
                                    autoCollect: !1,
                                    autoDelete: !1
                                }],
                                volumeMountDrafts: []
                            })
                        }).finally(function () {
                            t.loadingIns.finishLoading("addImage")
                        })
                    }
                }, {
                    key: "addOtherImage",
                    value: function () {
                        var e = this;
                        s.open({
                            animation: !0,
                            templateUrl: "/index/tpl/modal/otherImageModal/otherImageModal.html",
                            controller: "OtherImageModalCtr",
                            size: "md"
                        }).result.then(function (t) {
                            e.config.containerConsoles.push({
                                image: t.name,
                                registry: t.registry,
                                cpu: .5,
                                mem: 1024,
                                tag: t.tag,
                                tagList: [{
                                    tag: t.tag
                                }],
                                oldEnv: [],
                                newEnv: [],
                                healthChecker: {
                                    type: "NONE"
                                },
                                imagePullPolicy: "Always",
                                autoDeploy: !1,
                                logItemDrafts: [{
                                    logPath: "",
                                    autoCollect: !1,
                                    autoDelete: !1
                                }]
                            })
                        })
                    }
                }, {
                    key: "deleteImage",
                    value: function (e) {
                        this.config.containerConsoles.splice(e, 1)
                    }
                }, {
                    key: "addImageEnv",
                    value: function (e) {
                        this.config.containerConsoles[e].newEnv.push({
                            key: "",
                            value: "",
                            description: ""
                        })
                    }
                }, {
                    key: "deleteImageEnv",
                    value: function (e, t) {
                        this.config.containerConsoles[e].newEnv.splice(t, 1)
                    }
                }, {
                    key: "addLoadBalance",
                    value: function () {
                        this.config.loadBalanceDrafts.push({
                            port: "",
                            targetPort: "",
                            externalIPs: [{
                                ip: ""
                            }]
                        })
                    }
                }, {
                    key: "addInnerService",
                    value: function () {
                        this.config.innerServiceDrafts.push({
                            port: "",
                            targetPort: ""
                        })
                    }
                }, {
                    key: "addExternalIPs",
                    value: function (e) {
                        this.config.loadBalanceDrafts[e].externalIPs.push({
                            ip: ""
                        })
                    }
                }, {
                    key: "deleteExternalIPs",
                    value: function (e, t) {
                        this.config.loadBalanceDrafts[e].externalIPs.splice(t, 1)
                    }
                }, {
                    key: "addLogDraft",
                    value: function (e) {
                        e.logItemDrafts = e.logItemDrafts || [], e.logItemDrafts.push({
                            logPath: "",
                            autoCollect: !1,
                            autoDelete: !1
                        })
                    }
                }, {
                    key: "linkVolumeMountToVolume",
                    value: function (e, t) {
                        e.volumeMountDrafts = e.volumeMountDrafts || [], e.volumeMountDrafts = e.volumeMountDrafts.filter(function (e) {
                            var n = t.filter(function (t) {
                                return t.name === e.name
                            })[0];
                            if (n) return e._volume = n, !0
                        })
                    }
                }, {
                    key: "addVolumeMountDraft",
                    value: function (e) {
                        e.volumeMountDrafts = e.volumeMountDrafts || [], e.volumeMountDrafts.push({
                            name: "",
                            readOnly: !1,
                            mountPath: "",
                            subPath: "",
                            _volume: null
                        })
                    }
                }, {
                    key: "deleteVolumeMountDraft",
                    value: function (e, t) {
                        e.volumeMountDrafts = e.volumeMountDrafts || [], e.volumeMountDrafts = e.volumeMountDrafts.filter(function (e) {
                            return e !== t
                        })
                    }
                }, {
                    key: "deleteVolumeMountDraftByVolume",
                    value: function (e, t) {
                        t.forEach(function (t) {
                            t.volumeMountDrafts = t.volumeMountDrafts || [], t.volumeMountDrafts = t.volumeMountDrafts.filter(function (t) {
                                return t._volume !== e
                            })
                        })
                    }
                }, {
                    key: "updateVolumeMountName",
                    value: function (e, t) {
                        t.forEach(function (t) {
                            t.volumeMountDrafts = t.volumeMountDrafts || [], t.volumeMountDrafts.forEach(function (t) {
                                t._volume === e && (t.name = e.name)
                            })
                        })
                    }
                }, {
                    key: "toggleVolumeMountReadonly",
                    value: function (e, t) {
                        e.readOnly = t
                    }
                }, {
                    key: "toggleVolumeMountName",
                    value: function (e, t) {
                        e.name = t.name, e._volume = t
                    }
                }, {
                    key: "deleteLogDraft",
                    value: function (e, t) {
                        e.logItemDrafts.splice(e.logItemDrafts.indexOf(t), 1)
                    }
                }, {
                    key: "deleteArrItem",
                    value: function (e, t) {
                        this.config[e].splice(t, 1)
                    }
                }, {
                    key: "formartHealthChecker",
                    value: function () {
                        if ("HOST" == this.config.networkMode) {
                            var e = !0,
                                n = !1,
                                i = t;
                            try {
                                for (var o, r = this.config.containerConsoles[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                                    o.value.healthChecker = {
                                        type: "NONE"
                                    }
                                }
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !e && r.return && r.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                        }
                    }
                }, {
                    key: "changeNetworkmode",
                    value: function () {
                        if ("HOST" == this.config.networkMode) {
                            var e = !0,
                                n = !1,
                                i = t;
                            try {
                                for (var o, r = this.config.loadBalanceDrafts[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                                    var a = o.value;
                                    a.port = a.targetPort
                                }
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !e && r.return && r.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                        }
                    }
                }, {
                    key: "changeTargetPort",
                    value: function (e) {
                        this.config.loadBalanceDrafts[e].port = this.config.loadBalanceDrafts[e].targetPort
                    }
                }, {
                    key: "_formartDeploy",
                    value: function () {
                        var e = this,
                            n = angular.copy(this.config);
                        return "HOST" == n.networkMode ? (n.loadBalanceDrafts = [], n.accessType = "DIY", n.innerServiceDrafts = [], "noAccess" == this.visitMode && (n.exposePortNum = 0)) : (n.exposePortNum = 0, "noAccess" == this.visitMode ? (n.accessType = "DIY", n.loadBalanceDrafts = [], n.innerServiceDrafts = []) : "internal" == this.visitMode ? (n.accessType = "K8S_SERVICE", n.innerServiceDrafts[0].targetPort = n.innerServiceDrafts[0].port, n.loadBalanceDrafts = []) : (n.accessType = "K8S_SERVICE", n.innerServiceDrafts = [])), n.loadBalanceDrafts = function () {
                            var i = [],
                                o = [],
                                r = !0,
                                a = !1,
                                s = t;
                            try {
                                for (var l, c = e.nodeListForIps[Symbol.iterator](); !(r = (l = c.next()).done); r = !0) {
                                    var u = l.value;
                                    u.isSelected && i.push(u.ip)
                                }
                            } catch (e) {
                                a = !0, s = e
                            } finally {
                                try {
                                    !r && c.return && c.return()
                                } finally {
                                    if (a) throw s
                                }
                            }
                            var f = !0,
                                d = !1,
                                h = t;
                            try {
                                for (var v, y = n.loadBalanceDrafts[Symbol.iterator](); !(f = (v = y.next()).done); f = !0) {
                                    var g = v.value;
                                    g.port && (g.externalIPs = i, o.push(g))
                                }
                            } catch (e) {
                                d = !0, h = e
                            } finally {
                                try {
                                    !f && y.return && y.return()
                                } finally {
                                    if (d) throw h
                                }
                            }
                            return o
                        }(), n.stateful ? n.hostList = this.nodeListIns.getSelectedNodes() : n.labelSelectors = this.nodeListIns.getFormartSelectedLabels(), n.clusterId = this.clusterListIns.cluster.id, n.collectionId = this.collectionId, "CUSTOM" === n.versionType ? n.containerConsoles = function () {
                            if (n.stateful) return n.containerConsoles;
                            if (n.containerConsoles) {
                                var e = void 0,
                                    i = [],
                                    o = void 0,
                                    r = !0,
                                    a = !1,
                                    s = t;
                                try {
                                    for (var l, c = n.containerConsoles[Symbol.iterator](); !(r = (l = c.next()).done); r = !0) {
                                        var u = l.value;
                                        e = u.oldEnv, u.healthChecker || (u.healthChecker = {
                                            type: "NONE"
                                        }), o = {
                                            type: u.healthChecker.type
                                        }, "HOST" != n.networkMode ? ("TCP" != o.type && "HTTP" != o.type || (o.port = u.healthChecker.port, o.timeout = u.healthChecker.timeout, o.delay = u.healthChecker.delay), "HTTP" == o.type && (o.url = u.healthChecker.url)) : o.type = "NONE";
                                        var f = !0,
                                            d = !1,
                                            h = t;
                                        try {
                                            for (var v, y = u.newEnv[Symbol.iterator](); !(f = (v = y.next()).done); f = !0) {
                                                var g = v.value;
                                                "" !== g.key && e.push(g)
                                            }
                                        } catch (e) {
                                            d = !0, h = e
                                        } finally {
                                            try {
                                                !f && y.return && y.return()
                                            } finally {
                                                if (d) throw h
                                            }
                                        }
                                        var p = function (e) {
                                                var n = [],
                                                    i = !0,
                                                    o = !1,
                                                    r = t;
                                                try {
                                                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done); i = !0) {
                                                        var l = a.value;
                                                        if ("" !== l.logPath) {
                                                            var c = {
                                                                logPath: l.logPath,
                                                                autoCollect: l.autoCollect,
                                                                autoDelete: l.autoDelete
                                                            };
                                                            l.autoCollect && (c.logTopic = l.logTopic, c.processCmd = l.processCmd), l.autoDelete && (c.logExpired = l.logExpired), n.push(c)
                                                        }
                                                    }
                                                } catch (e) {
                                                    o = !0, r = e
                                                } finally {
                                                    try {
                                                        !i && s.return && s.return()
                                                    } finally {
                                                        if (o) throw r
                                                    }
                                                }
                                                return 0 === n.length ? null : n
                                            }(u.logItemDrafts),
                                            m = function (e) {
                                                return e.map(function (e) {
                                                    return {
                                                        name: e.name,
                                                        readOnly: e.readOnly,
                                                        mountPath: e.mountPath,
                                                        subPath: e.subPath
                                                    }
                                                }).filter(function (e) {
                                                    return e.name
                                                })
                                            }(u.volumeMountDrafts || []);
                                        i.push({
                                            image: u.image,
                                            registry: u.registry,
                                            tag: u.tag,
                                            cpu: u.cpu,
                                            mem: u.mem,
                                            logItemDrafts: p,
                                            envs: e,
                                            healthChecker: o,
                                            imagePullPolicy: u.imagePullPolicy,
                                            autoDeploy: u.autoDeploy,
                                            volumeMountDrafts: m
                                        })
                                    }
                                } catch (e) {
                                    a = !0, s = e
                                } finally {
                                    try {
                                        !r && c.return && c.return()
                                    } finally {
                                        if (a) throw s
                                    }
                                }
                                return i
                            }
                        }() : "JSON" !== n.versionType && "YAML" !== n.versionType || n.versionString && (n.podSpecStr = n.versionString.podSpecStr, delete n.versionString), n
                    }
                }, {
                    key: "createVersion",
                    value: function (e) {
                        var t = this,
                            n = l.defer(),
                            i = this._formartDeploy(),
                            o = {
                                deployId: i.deployId,
                                containerConsoles: i.containerConsoles,
                                labelSelectors: i.labelSelectors,
                                versionType: i.versionType,
                                podSpecStr: i.podSpecStr,
                                volumeDrafts: i.volumeDrafts
                            };
                        return v.createVersion(o).then(function (e) {
                            if ("RUNNING" != t.config.deploymentStatus) r.alert("新建成功", "新建部署版本成功,当前状态不能升级。"), n.resolve("create");
                            else {
                                s.open({
                                    animation: !0,
                                    templateUrl: "createVersionModal.html",
                                    controller: "createVersionModalCtr",
                                    size: "sm",
                                    resolve: {
                                        replicas: function () {
                                            return t.config.currentReplicas
                                        }
                                    }
                                }).result.then(function (i) {
                                    v.updateDeploy(t.config.deployId, e.data.result, i).then(function () {
                                        r.alert("正在升级", "已提交，正在升级！"), n.resolve("update")
                                    }, function (e) {
                                        1007 === e.data.resultCode ? r.continue("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function (e) {
                                            e === r.buttons.BUTTON_OK_ONLY && ($state.go("clusterDetail.watcher", {
                                                id: $scope.watcherInfo.clusterId
                                            }), hide())
                                        }) : r.error("升级失败！", e.data.resultMsg), n.resolve("updateFailed")
                                    })
                                }, function () {
                                    n.resolve("dismiss")
                                })
                            }
                        }, function (e) {
                            r.error("创建版本失败！", e.data.resultMsg), n.reject("create")
                        }), n.promise
                    }
                }, {
                    key: "createWatcherVersion",
                    value: function (e) {
                        var t = this,
                            n = l.defer();
                        return v.createVersion(e).then(function (e) {
                            if ("RUNNING" != t.config.deploymentStatus) r.alert("新建部署版本成功,当前状态不能升级。"), n.resolve("create");
                            else {
                                s.open({
                                    animation: !0,
                                    templateUrl: "createVersionModal.html",
                                    controller: "createWatcherVersionModalCtr",
                                    size: "sm",
                                    resolve: {
                                        replicas: function () {
                                            return t.config.currentReplicas
                                        }
                                    }
                                }).result.then(function (i) {
                                    v.updateDeploy(t.config.deployId, e.data.result, i).then(function () {
                                        r.alert("已提交，正在升级！"), n.resolve("update")
                                    }, function (e) {
                                        r.error("升级失败", e.data.resultMsg), n.resolve("updateFailed")
                                    })
                                }, function () {
                                    n.resolve("dismiss")
                                })
                            }
                        }, function (e) {
                            r.error("创建版本失败", e.data.resultMsg), n.reject("create")
                        }), n.promise
                    }
                }, {
                    key: "stop",
                    value: function () {
                        return e.post("/api/deploy/action/stop?deployId=" + this.config.deployId)
                    }
                }, {
                    key: "abort",
                    value: function () {
                        return e.post("/api/deploy/action/abort?deployId=" + this.config.deployId)
                    }
                }, {
                    key: "scaleForDaemonSet",
                    value: function (t) {
                        var n = this,
                            i = l.defer();
                        return s.open({
                            animation: !0,
                            templateUrl: "scaleModalForDaemonSet.html",
                            controller: "scaleModalForDaemonSetCtr",
                            size: "md",
                            resolve: {
                                deployIns: function () {
                                    return n
                                }
                            }
                        }).result.then(function (t) {
                            var o = "api/deploy/action/daemonset/scales?deployId=" + n.config.deployId + "&version=" + n.config.currentVersions[0].version;
                            e.post(o, t).then(function (e) {
                                r.alert("提示", "操作成功！"), i.resolve(e.data.result)
                            }, function (e) {
                                1007 === e.data.resultCode ? r.continue("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function (e) {
                                    e === r.buttons.BUTTON_OK_ONLY && ($state.go("clusterDetail.watcher", {
                                        id: $scope.watcherInfo.clusterId
                                    }), hide())
                                }) : r.error("警告", "请求失败！"), i.reject("requestError")
                            })
                        }, function () {
                            i.reject("dismiss")
                        }), i.promise
                    }
                }, {
                    key: "scale",
                    value: function (t) {
                        var n = this,
                            i = l.defer();
                        return s.open({
                            animation: !0,
                            templateUrl: "scaleModal.html",
                            controller: "ScaleModalCtr",
                            size: "md",
                            resolve: {
                                oldReplicas: function () {
                                    return n.config.currentReplicas
                                }
                            }
                        }).result.then(function (t) {
                            if ((t = parseInt(t)) === n.config.currentReplicas) return r.error("警告", "实例个数无变化！"), void i.reject();
                            var o = t > n.config.currentReplicas ? "api/deploy/action/scaleup" : "api/deploy/action/scaledown";
                            e.post(o + "?deployId=" + n.config.deployId + "&replicas=" + t + "&version=" + n.config.currentVersions[0].version).then(function (e) {
                                r.alert("提示", "操作成功！"), i.resolve(e.data.result)
                            }, function (e) {
                                1007 === e.data.resultCode ? r.continue("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function (e) {
                                    e === r.buttons.BUTTON_OK_ONLY && ($state.go("clusterDetail.watcher", {
                                        id: $scope.watcherInfo.clusterId
                                    }), hide())
                                }) : r.error("警告", "请求失败！"), i.reject("requestError")
                            })
                        }, function () {
                            i.reject("dismiss")
                        }), i.promise
                    }
                }, {
                    key: "recoverVersion",
                    value: function () {
                        var e = this,
                            t = l.defer();
                        return s.open({
                            animation: !0,
                            templateUrl: "versionListModal.html",
                            controller: "VersionListModalCtr",
                            size: "md",
                            resolve: {
                                deployInfo: function () {
                                    return e.config
                                }
                            }
                        }).result.then(function (n) {
                            v.rollbackDeploy(e.config.deployId, n.versionId, n.replicas).then(function (e) {
                                t.resolve(e.data.result)
                            }, function () {
                                t.reject()
                            })
                        }, function () {
                            t.reject("dismiss")
                        }), t.promise
                    }
                }, {
                    key: "updateVersion",
                    value: function (e) {
                        var t = this,
                            n = l.defer();
                        return s.open({
                            animation: !0,
                            templateUrl: "versionListModal.html",
                            controller: "VersionListModalCtr",
                            size: "md",
                            resolve: {
                                deployInfo: function () {
                                    return t.config
                                }
                            }
                        }).result.then(function (e) {
                            var i = t.config.currentVersions[0].version;
                            i === e.versionId ? (r.error("警告", "您不能选择当前版本！"), n.reject("dismiss")) : i > e.versionId ? v.rollbackDeploy(t.config.deployId, e.versionId, e.replicas).then(function (e) {
                                r.alert("提示", "已提交，正在回滚！"), n.resolve(e.data.result)
                            }, function (e) {
                                1007 === e.data.resultCode ? r.continue("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function (e) {
                                    e === r.buttons.BUTTON_OK_ONLY && ($state.go("clusterDetail.watcher", {
                                        id: $scope.watcherInfo.clusterId
                                    }), hide())
                                }) : r.error("警告", "回滚失败，请重试！"), n.reject()
                            }) : v.updateDeploy(t.config.deployId, e.versionId, e.replicas).then(function (e) {
                                r.alert("提示", "已提交，正在升级！"), n.resolve(e.data.result)
                            }, function (e) {
                                1007 === e.data.resultCode ? r.continue("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function (e) {
                                    e === r.buttons.BUTTON_OK_ONLY && ($state.go("clusterDetail.watcher", {
                                        id: $scope.watcherInfo.clusterId
                                    }), hide())
                                }) : r.alert("提示", "升级失败，请重试！"), n.reject()
                            })
                        }, function () {
                            n.reject("dismiss")
                        }), n.promise
                    }
                }, {
                    key: "startVersion",
                    value: function () {
                        var e = this,
                            t = l.defer();
                        return s.open({
                            animation: !0,
                            templateUrl: "versionListModal.html",
                            controller: "VersionListModalCtr",
                            size: "md",
                            resolve: {
                                deployInfo: function () {
                                    return e.config
                                }
                            }
                        }).result.then(function (n) {
                            v.startDeploy(e.config.deployId, n.versionId, n.replicas).then(function (e) {
                                t.resolve(e.data.result)
                            }, function () {
                                t.reject()
                            })
                        }, function () {
                            t.reject("dismiss")
                        }), t.promise
                    }
                }, {
                    key: "delete",
                    value: function () {
                        return e.delete("/api/deploy/id/" + this.config.deployId)
                    }
                }, {
                    key: "modifyDeploy",
                    value: function () {
                        var e = this._formartDeploy();
                        return v.modifyDeploy(this.config.deployId, e)
                    }
                }, {
                    key: "create",
                    value: function () {
                        function t() {
                            e.post("api/deploy/create", angular.toJson(o)).then(function () {
                                i.resolve()
                            }, function (e) {
                                i.reject({
                                    type: "create",
                                    msg: e.data.resultMsg
                                })
                            })
                        }
                        var n = this,
                            i = l.defer(),
                            o = this._formartDeploy();
                        if (this.isNewNamespace) {
                            var r = this.config.namespace,
                                a = [r];
                            d.setNamespace(this.clusterListIns.cluster.id, a).then(function () {
                                n.toggleIsNewNamespace(), n.namespaceList.push(r), n.toggleNamespace(r), t()
                            }, function (e) {
                                i.reject({
                                    type: "namespace",
                                    msg: e.data.resultMsg
                                })
                            })
                        } else t();
                        return i.promise
                    }
                }, {
                    key: "getDeployStr",
                    value: function (t) {
                        var n = this._formartDeploy();
                        return n.podSpecStr = "", e.post("api/deploy/deploymentstr", angular.toJson(n))
                    }
                }]), a
            }(),
            g = function () {
                function e(t) {
                    _classCallCheck(this, e), this.isCheckAll = !1, this.isCheckAllContainer = !1, this.instanceList = [], this.containerList = [], this.selectedCount = 0, this.selectedContainerCount = 0, this.init(t)
                }
                return _createClass(e, [{
                    key: "init",
                    value: function (e) {
                        this.isCheckAll = !1, this.isCheckAllContainer = !1, this.instanceList = function () {
                            e = e || [];
                            var n = !0,
                                i = !1,
                                o = t;
                            try {
                                for (var r, a = e[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                    var s = r.value;
                                    if (s.isSelected = !1, s.keyFilter = !0, s.containers) {
                                        var l = !0,
                                            c = !1,
                                            u = t;
                                        try {
                                            for (var f, d = s.containers[Symbol.iterator](); !(l = (f = d.next()).done); l = !0) {
                                                var h = f.value;
                                                h.shortContainerId = h.containerId.substring(0, 12)
                                            }
                                        } catch (e) {
                                            c = !0, u = e
                                        } finally {
                                            try {
                                                !l && d.return && d.return()
                                            } finally {
                                                if (c) throw u
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                i = !0, o = e
                            } finally {
                                try {
                                    !n && a.return && a.return()
                                } finally {
                                    if (i) throw o
                                }
                            }
                            return e
                        }()
                    }
                }, {
                    key: "toggleContainerList",
                    value: function (e) {
                        this.isCheckAllContainer = !1, this.selectedContainerCount = 0, this.containerList = e.containers || [];
                        var n = !0,
                            i = !1,
                            o = t;
                        try {
                            for (var r, a = this.containerList[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                r.value.isSelected = !1
                            }
                        } catch (e) {
                            i = !0, o = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                    }
                }, {
                    key: "filterWithKey",
                    value: function (e) {
                        this.isCheckAll = !1, this.selectedCount = 0;
                        var n = !0,
                            i = !1,
                            o = t;
                        try {
                            for (var r, a = this.instanceList[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                var s = r.value;
                                s.isSelected = !1, s.keyFilter = s.instanceName.indexOf(e) !== -1
                            }
                        } catch (e) {
                            i = !0, o = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                    }
                }, {
                    key: "toggleContainerCheck",
                    value: function (e) {
                        var n = !0;
                        if (e.isSelected) {
                            this.selectedContainerCount++;
                            var i = !0,
                                o = !1,
                                r = t;
                            try {
                                for (var a, s = this.containerList[Symbol.iterator](); !(i = (a = s.next()).done); i = !0) {
                                    if (!a.value.isSelected) {
                                        n = !1;
                                        break
                                    }
                                }
                            } catch (e) {
                                o = !0, r = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (o) throw r
                                }
                            }
                            n && (this.isCheckAllContainer = !0)
                        } else this.selectedContainerCount--, this.isCheckAllContainer = !1
                    }
                }, {
                    key: "checkAllContainer",
                    value: function (e) {
                        this.isCheckAllContainer = void 0 === e ? !this.isCheckAllContainer : e, this.selectedContainerCount = this.isCheckAllContainer ? this.containerList.length : 0;
                        var n = !0,
                            i = !1,
                            o = t;
                        try {
                            for (var r, a = this.containerList[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                r.value.isSelected = this.isCheckAllContainer
                            }
                        } catch (e) {
                            i = !0, o = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                    }
                }, {
                    key: "toggleCheck",
                    value: function (e) {
                        var n = !0;
                        if (e.isSelected) {
                            this.selectedCount++;
                            var i = !0,
                                o = !1,
                                r = t;
                            try {
                                for (var a, s = this.instanceList[Symbol.iterator](); !(i = (a = s.next()).done); i = !0) {
                                    var l = a.value;
                                    if (l.keyFilter && !l.isSelected) {
                                        n = !1;
                                        break
                                    }
                                }
                            } catch (e) {
                                o = !0, r = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (o) throw r
                                }
                            }
                            n && (this.isCheckAll = !0)
                        } else this.selectedCount--, this.isCheckAll = !1
                    }
                }, {
                    key: "checkAllInstance",
                    value: function (e) {
                        this.isCheckAll = void 0 === e ? this.isCheckAll : e, this.selectedCount = 0;
                        var n = !0,
                            i = !1,
                            o = t;
                        try {
                            for (var r, a = this.instanceList[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                var s = r.value;
                                s.keyFilter && this.isCheckAll ? (s.isSelected = !0, this.selectedCount++) : s.isSelected = !1
                            }
                        } catch (e) {
                            i = !0, o = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                    }
                }]), e
            }(),
            p = function () {
                function e(t) {
                    _classCallCheck(this, e), this.deploy = {}, this.isLoading = !1, this.deployList = [], this.deployInstanceListIns = new g, this.init(t)
                }
                return _createClass(e, [{
                    key: "init",
                    value: function (e) {
                        this.deployList = e || []
                    }
                }, {
                    key: "toggleDeploy",
                    value: function (e, t, n, i, o) {
                        var r = this,
                            a = l.defer();
                        return e ? (this.deploy.id = e, this.deploy.name = t, this.deploy.namespace = n, this.isLoading = !0, i || (o && "deploy" !== o ? "loadBalance" === o && f.loadBalance.loadBalance.listInstance(e).then(function (e) {
                            r.deployInstanceListIns.init(e), a.resolve()
                        }).catch(function (e) {}).then(function () {
                            a.reject(), r.isLoading = !1
                        }) : v.getInstances(e).then(function (e) {
                            r.deployInstanceListIns.init(e.data.result), a.resolve()
                        }).finally(function () {
                            a.reject(), this.isLoading = !1
                        }))) : (this.deploy.id = null, this.deploy.name = null, this.deploy.namespace = null, this.deployInstanceListIns.init(), a.reject()), a.promise
                    }
                }, {
                    key: "filterDeploy",
                    value: function (e, n, i) {
                        var o = void 0,
                            r = void 0,
                            a = void 0,
                            s = !0,
                            l = !1,
                            c = t;
                        try {
                            for (var u, f = this.deployList[Symbol.iterator](); !(s = (u = f.next()).done); s = !0) {
                                var d = u.value;
                                d.clusterFilter = !e || d.clusterName === e, d.hostFilter = !n || d.hostEnv === n, void 0 === o && d.clusterFilter && d.hostFilter && (o = d.deployId, r = d.deployName, a = d.namespace)
                            }
                        } catch (e) {
                            l = !0, c = e
                        } finally {
                            try {
                                !s && f.return && f.return()
                            } finally {
                                if (l) throw c
                            }
                        }
                        return void 0 === o ? this.toggleDeploy() : this.toggleDeploy(o, r, a, "", i)
                    }
                }]), e
            }(),
            m = a.instancesCreator({
                DeployList: p,
                Deploy: y
            });
        return {
            deployService: v,
            getInstance: m
        }
    }
    var i = angular.module("deployModule", []);
    n.$inject = ["$http", "$domeCluster", "$domeImage", "$domePublic", "dialog", "$domeModel", "$modal", "$q", "$util", "$sce", "api"], i.factory("$domeDeploy", n), e.deployModule = i
}(window);
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();
! function (e, t) {
    function n(e, t, n) {
        function r() {
            var t = this;
            this._url = "/api/image", this.getBaseImages = function () {
                return e.get(t._url + "/base")
            }, this.getProjectImages = function () {
                return e.get(t._url)
            }, this.getForBuildImages = function () {
                return e.get(t._url + "/forbuild")
            }, this.getAllImages = function () {
                return e.get(t._url + "/all")
            }, this.getImageInfo = function (n) {
                return e.get(t._url + "/all/detail?name=" + n)
            }, this.getImageTags = function (n, r) {
                return e.get(t._url + "/detail?name=" + n + "&registry=" + r)
            }, this.getCustomImages = function () {
                return e.get(t._url + "/custom")
            }, this.getCustomImageInfo = function (n) {
                return e.get(t._url + "/custom/" + n)
            }, this.createCustomImage = function (n) {
                return e.post(t._url + "/custom", angular.toJson(n))
            }, this.buildCustomImage = function (n) {
                return e.post(t._url + "/custom/build/" + n)
            }, this.deleteCustomImage = function (n) {
                return e.delete(t._url + "/custom/" + n)
            }, this.validImageName = function (n, r) {
                return e.post(t._url + "/custom/validate?imageName=" + n + "&imageTag=" + r)
            }, this.createBaseImage = function (n) {
                return e.post(t._url + "/base", angular.toJson(n))
            }, this.deleteBaseImage = function (n) {
                return e.delete(t._url + "/base/" + n)
            }, this.getExclusiveImages = function (n) {
                return e.get(t._url + "/exclusive/" + n)
            }, this.getCollectionImages = function (n) {
                return e.post(t._url + "/all/detail", angular.toJson(n))
            }, this.deletePrivateImage = function (n, r, i) {
                return e.delete(t._url + "/all/detail/tag?name=" + n + "&tag=" + r + "&registry=" + i)
            }, this.getTagDetail = function (n) {
                return e.post(t._url + "/all/detail/tag", angular.toJson(n))
            }
        }
        var i = new r,
            a = function (e) {
                var r = t.defer();
                return n.danger("确认删除", "确认要删除吗？").then(function (e) {
                    if (e !== n.button.BUTTON_OK) throw ""
                }).then(function () {
                    i.deleteBaseImage(e).then(function () {
                        r.resolve()
                    }, function () {
                        r.reject(), n.error("删除失败", res.data.resultMsg)
                    })
                }, function () {
                    r.reject()
                }), r.promise
            },
            u = function (e, r, a) {
                var u = t.defer();
                return n.danger("删除", "该镜像名下，image id相同的所有版本都会被删除，请慎重操作").then(function (e) {
                    if (e !== n.button.BUTTON_OK) throw ""
                }).then(function () {
                    i.deletePrivateImage(e, r, a).then(function () {
                        u.resolve()
                    }, function (e) {
                        u.reject(), n.error("删除失败！", e.data.errors.message + e.data.resultMsg)
                    })
                }, function () {
                    u.reject()
                }), u.promise
            },
            o = function () {
                function e() {
                    _classCallCheck(this, e)
                }
                return _createClass(e, [{
                    key: "init",
                    value: function () {
                        this.config = {
                            autoCustom: 0,
                            imageName: "",
                            imageTag: "",
                            description: "",
                            dockerfileContent: "",
                            files: [{
                                fileName: "",
                                filePath: "",
                                content: ""
                            }],
                            envSettings: [{
                                key: "",
                                value: "",
                                description: ""
                            }],
                            sourceImage: {
                                thirdParty: 0,
                                imageName: "",
                                imageTag: "",
                                registryUrl: ""
                            },
                            publish: 1
                        }
                    }
                }, {
                    key: "addEnvConfDefault",
                    value: function () {
                        this.config.envSettings.push({
                            key: "",
                            value: "",
                            description: ""
                        })
                    }
                }, {
                    key: "deleteArrItem",
                    value: function (e, t) {
                        this.config[e].splice(t, 1)
                    }
                }, {
                    key: "addFileDefault",
                    value: function () {
                        this.config.files.push({
                            fileName: "",
                            filePath: "",
                            content: ""
                        })
                    }
                }, {
                    key: "clearFileWrite",
                    value: function (e) {
                        this.config.files[e].content = ""
                    }
                }]), e
            }();
        return {
            imageService: i,
            Mirror: o,
            deleteBaseImage: a,
            getMirrorInstance: function () {
                var e = new o;
                return e.init(), e
            },
            deletePrivateImage: u
        }
    }
    var r = angular.module("imageModule", []);
    n.$inject = ["$http", "$q", "dialog"], r.factory("$domeImage", n), e.imageModule = r
}(window);
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function () {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function (t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t
    }
}();
! function (e, t) {
    function i(e, i, r, n, a, o, s, l) {
        var u = function () {
                var t = this;
                this.url = "api/project", a.ServiceModel.call(this, this.url), this.getProjectCollectionNameById = function (t) {
                    return e.get("/api/projectcollection/" + t + "/name")
                }, this.getProject = function (t) {
                    return e.get("/api/projectcollection/" + t + "/project")
                }, this.getReadMe = function (i, r) {
                    return e.get(t.url + "/readme/" + i + "/" + r)
                }, this.getBuildList = function (t) {
                    return e.get("/api/ci/build/" + t)
                }, this.getBranches = function (i) {
                    return e.get(t.url + "/branches/" + i)
                }, this.getBranchesWithoutId = function (i, r, n) {
                    return e.get(t.url + "/branches/" + n + "/" + i + "/" + r)
                }, this.getTags = function (i) {
                    return e.get(t.url + "/tags/" + i)
                }, this.getTagsWithoutId = function (i, r, n) {
                    return e.get(t.url + "/tags/" + n + "/" + i + "/" + r)
                }, this.getGitLabInfo = function () {
                    return e.get(t.url + "/git/gitlabinfo")
                }, this.getGitLabInfo = function (i) {
                    return e.get(t.url + "/git/gitlabinfo/" + i)
                }, this.getBuildDockerfile = function (t, i) {
                    return e.get("/api/ci/build/dockerfile/" + t + "/" + i)
                }, this.previewDockerfile = function (t) {
                    return e.post("/api/ci/build/dockerfile", angular.toJson(t), {
                        notIntercept: !0
                    })
                }, this.build = function (t) {
                    return e.post("/api/ci/build/start", angular.toJson(t), {
                        notIntercept: !0
                    })
                }, this.stopBulid = function (t) {
                    return e.get("/api/ci/build/stop/" + t)
                }, this.modifyCreator = function (i, r) {
                    return e.post(t.url + "/creator/" + i, angular.toJson(r))
                }, this.modifyCodeInfo = function (i, r) {
                    return e.put(t.url + "/" + i + "/git/gitlabinfo", angular.toJson(r))
                }, this.buildInfoList = function (t, i, r) {
                    return e.get("/api/ci/buildInfo/" + t + "/page?page=" + i + "&count=" + r)
                }
            },
            c = new u,
            g = function (e, t) {
                return s.open({
                    animation: !0,
                    templateUrl: "/index/tpl/modal/buildModal/buildModal.html",
                    controller: "BuildModalCtr as vm",
                    size: "md",
                    resolve: {
                        projectInfo: {
                            projectId: e,
                            hasCodeInfo: t
                        }
                    }
                }).result
            },
            m = function () {
                function e() {
                    _classCallCheck(this, e), this.imageInfo = {
                        compileIsPublic: 1,
                        runIsPublic: 1
                    }, this.selectedCompileImage = {}, this.selectedRunImage = {}, this.currentCompileList = [], this.privateRegistryImageList = [], this.selectedCompilePrivateImageTag = {}, this.currentCompilePrivateImageTagList = [], this.selectedRunPrivateImageTag = {}, this.currentRunPrivateImageTagList = [], this.currentRunList = [], this.projectImagesInfo = {
                        compilePublicImageList: [],
                        compilePrivateImageList: [],
                        runPublicImageList: [],
                        runPrivateImageList: []
                    }, this.userList = []
                }
                return _createClass(e, [{
                    key: "init",
                    value: function (e) {
                        e || (e = {}), i.isArray(e.compilePublicImageList) || (e.compilePublicImageList = []), i.isArray(e.compilePrivateImageList) ? e.compilePrivateImageList = this.privateRegistryImageList : e.compilePrivateImageList = [], i.isArray(e.runPublicImageList) || (e.runPublicImageList = []), i.isArray(e.runPrivateImageList) ? e.runPrivateImageList = this.privateRegistryImageList : e.runPrivateImageList = [], angular.forEach(e, function (e, r) {
                            var n = !0,
                                a = !1,
                                o = t;
                            try {
                                for (var s, l = e[Symbol.iterator](); !(n = (s = l.next()).done); n = !0) {
                                    var u = s.value;
                                    u.createDate = i.getPageDate(u.createTime), u.imageTxt = u.imageName, u.imageTag && (u.imageTxt += ":" + u.imageTag)
                                }
                            } catch (e) {
                                a = !0, o = e
                            } finally {
                                try {
                                    !n && l.return && l.return()
                                } finally {
                                    if (a) throw o
                                }
                            }
                        }), this.projectImagesInfo = e, 0 === Object.keys(this.selectedCompileImage).length && (this.toggleIsPublicImage("compile"), this.toggleIsPublicImage("run"))
                    }
                }, {
                    key: "getForBuildImageAsPrivateImageList",
                    value: function (e) {
                        var t = this;
                        l.imageService.getForBuildImages().then(function (r) {
                            for (var n = r.data.result || [], a = [], o = 0; o < n.length; o++) {
                                var s = n[o];
                                s.createDate = i.getPageDate(s.createTime), s.imageTxt = s.imageName, s.registryUrl = s.registry, s.registryType = 0, s.imageTag && (s.imageTxt += ":" + s.imageTag), a.push(s)
                            }
                            "compile" === e ? t.projectImagesInfo.compilePrivateImageList = a : "run" === e ? t.projectImagesInfo.runPrivateImageList = a : "all" === e && (t.privateRegistryImageList = a)
                        }).finally(function () {})
                    }
                }, {
                    key: "getPrivateImageTag",
                    value: function (e, t) {
                        var i = this;
                        l.imageService.getImageTags(t.imageName, t.registryUrl).then(function (t) {
                            var r = t.data.result;
                            "compile" === e ? i.currentCompilePrivateImageTagList = r : "run" === e && (i.currentRunPrivateImageTagList = r)
                        }).finally(function () {})
                    }
                }, {
                    key: "toggleIsPublicImage",
                    value: function (e, t) {
                        void 0 === t && (t = "compile" == e ? this.imageInfo.compileIsPublic : this.imageInfo.runIsPublic), "compile" == e ? (this.currentCompileList = 1 === t ? this.projectImagesInfo.compilePublicImageList : this.projectImagesInfo.compilePrivateImageList, this.toggleImage("compile", 0)) : (this.currentRunList = 1 === t ? this.projectImagesInfo.runPublicImageList : this.projectImagesInfo.runPrivateImageList, this.toggleImage("run", 0))
                    }
                }, {
                    key: "togglePrivateImageTag",
                    value: function (e, t, i) {
                        if ("compile" === e) {
                            this.selectedCompilePrivateImageTag = this.currentCompilePrivateImageTagList[t];
                            for (var r = 0; r < this.currentCompileList.length; r++)
                                if (this.currentCompileList[r].imageName === i.imageName) {
                                    this.currentCompileList[r].imageTag = this.selectedCompilePrivateImageTag.tag;
                                    break
                                }
                        } else if ("run" === e) {
                            this.selectedRunPrivateImageTag = this.currentRunPrivateImageTagList[t];
                            for (var n = 0; n < this.currentRunList.length; n++)
                                if (this.currentRunList[n].imageName === i.imageName) {
                                    this.currentRunList[n].imageTag = this.selectedRunPrivateImageTag.tag;
                                    break
                                }
                        }
                    }
                }, {
                    key: "toggleImage",
                    value: function (e, t, i) {
                        if ("compile" === e)
                            if (0 === this.imageInfo.compileIsPublic || void 0 === i) {
                                this.selectedCompilePrivateImageTag = {}, void 0 === i && (i = this.currentCompileList[0]);
                                for (var r = 0; r < this.currentCompileList.length; r++) {
                                    var n = this.currentCompileList[r];
                                    if (n.imageTxt == i.imageTxt) {
                                        this.selectedCompileImage = n;
                                        break
                                    }
                                }
                                this.getPrivateImageTag("compile", i)
                            } else if (void 0 !== i)
                            for (var a = 0; a < this.currentCompileList.length; a++) {
                                var o = this.currentCompileList[a];
                                if (o.imageTxt == i.imageTxt) {
                                    this.selectedCompileImage = o;
                                    break
                                }
                            } else this.selectedCompileImage = this.currentCompileList[t];
                        else if ("run" === e)
                            if (0 === this.imageInfo.runIsPublic || void 0 === i) {
                                this.selectedRunPrivateImageTag = {}, void 0 === i && (i = this.currentRunList[0]);
                                for (var s = 0; s < this.currentRunList.length; s++) {
                                    var l = this.currentRunList[s];
                                    if (l.imageTxt == i.imageTxt) {
                                        this.selectedRunImage = l;
                                        break
                                    }
                                }
                                this.getPrivateImageTag("run", i)
                            } else if (void 0 !== i)
                            for (var u = 0; u < this.currentRunList.length; u++) {
                                var c = this.currentRunList[u];
                                if (c.imageTxt == i.imageTxt) {
                                    this.selectedRunImage = c;
                                    break
                                }
                            } else this.selectedRunImage = angular.copy(this.currentRunList[t])
                    }
                }, {
                    key: "toggleSpecifiedImage",
                    value: function (e, t) {
                        var r = "";
                        i.isObject(t) ? (r = t.imageName, t.imageTag && (r += ":" + t.imageTag)) : t = {}, "compile" == e ? (this.selectedCompileImage = t, this.selectedCompileImage.imageTxt = r, this.selectedCompilePrivateImageTag.tag = t.imageTag, this.imageInfo.compileIsPublic = void 0 !== t.registryType ? t.registryType : 1, this.currentCompileList = 1 === this.imageInfo.compileIsPublic ? this.projectImagesInfo.compilePublicImageList : this.projectImagesInfo.compilePrivateImageList) : (this.selectedRunImage = t, this.selectedRunImage.imageTxt = r, this.selectedRunPrivateImageTag.tag = t.imageTag, this.imageInfo.runIsPublic = void 0 !== t.registryType ? t.registryType : 1, this.currentRunList = 1 === this.imageInfo.compileIsPublic ? this.projectImagesInfo.runPublicImageList : this.projectImagesInfo.runPrivateImageList)
                    }
                }]), e
            }(),
            f = function () {
                function r(e) {
                    _classCallCheck(this, r), this.config = {}, this.customConfig = {}, this.isUseCustom = !1, this.isDefDockerfile = !1, this.projectImagesIns = new m, this.init(e)
                }
                return _createClass(r, [{
                    key: "init",
                    value: function (e) {
                        i.isObject(e) || (e = {}), this.customConfig = {}, i.isObject(e.dockerfileInfo) || (e.dockerfileInfo = {}), i.isObject(e.dockerfileConfig) || (e.dockerfileConfig = {}), e.exclusiveBuild ? (this.customConfig = e.exclusiveBuild, this.isUseCustom = !0, this.isDefDockerfile = !1) : e.userDefineDockerfile ? (this.customConfig = e.dockerfileInfo, this.isUseCustom = !1, this.isDefDockerfile = !1) : e.customDockerfile ? (this.customConfig = e.customDockerfile, this.isUseCustom = !1, this.isDefDockerfile = !0) : (this.customConfig = e.dockerfileConfig, this.isUseCustom = !1, this.isDefDockerfile = !1), this.autoBuildInfo = angular.copy(e.autoBuildInfo), e.autoBuildInfo = function () {
                            var t = e.autoBuildInfo,
                                r = void 0,
                                n = void 0;
                            if (!i.isObject(t)) return {
                                tag: 0,
                                master: !1,
                                other: !1,
                                branches: ""
                            };
                            if (n = e.autoBuildInfo.branches, r = {
                                    tag: t.tag || 0,
                                    master: !1,
                                    other: !1,
                                    branches: ""
                                }, n) {
                                for (var a = 0; a < n.length; a++) "master" == n[a] && (r.master = !0, n.splice(a, 1), a--);
                                0 !== n.length && (r.other = !0, r.branches = n.join(","))
                            }
                            return r
                        }(), e.confFiles = function () {
                            var r = e.confFiles,
                                n = [];
                            if (!i.isObject(r)) return [{
                                tplDir: "",
                                originDir: ""
                            }];
                            var a = !0,
                                o = !1,
                                s = t;
                            try {
                                for (var l, u = Object.keys(r)[Symbol.iterator](); !(a = (l = u.next()).done); a = !0) {
                                    var c = l.value;
                                    n.push({
                                        tplDir: c,
                                        originDir: r[c]
                                    })
                                }
                            } catch (e) {
                                o = !0, s = e
                            } finally {
                                try {
                                    !a && u.return && u.return()
                                } finally {
                                    if (o) throw s
                                }
                            }
                            return n.push({
                                tplDir: "",
                                originDir: ""
                            }), n
                        }(), i.isArray(e.envConfDefault) || (e.envConfDefault = []), e.envConfDefault.push({
                            key: "",
                            value: "",
                            description: ""
                        }), this.customConfig.compileEnv = function () {
                            var e = this.customConfig.compileEnv;
                            if (!e) return [{
                                envName: "",
                                envValue: ""
                            }];
                            if ("string" != typeof e) return angular.copy(e);
                            var t = e.split(","),
                                i = t.map(function (e) {
                                    var t = e.split("=");
                                    return {
                                        envName: t[0],
                                        envValue: t[1]
                                    }
                                });
                            return i.push({
                                envName: "",
                                envValue: ""
                            }), i
                        }.bind(this)(), this.customConfig.uploadFileInfos = function (e) {
                            return e || (e = []), e.length || e.push({
                                filename: "",
                                content: ""
                            }), e
                        }(this.customConfig.uploadFileInfos), this.customConfig.createdFileStoragePath = function () {
                            var e = this.customConfig.createdFileStoragePath;
                            if (!i.isArray(e) || 0 === e.length) return [{
                                name: ""
                            }];
                            var t = e.map(function (e) {
                                return {
                                    name: e
                                }
                            });
                            return t.push({
                                name: ""
                            }), t
                        }.bind(this)(), this.config = e
                    }
                }, {
                    key: "resetConfig",
                    value: function () {
                        this.config.dockerfileConfig = null, this.config.dockerfileInfo = null, this.config.exclusiveBuild = null, this.config.confFiles = null, this.config.envConfDefault = null, this.config.autoBuildInfo = this.autoBuildInfo, this.init(this.config)
                    }
                }, {
                    key: "deleteArrItem",
                    value: function (e, t) {
                        this.config[e].splice(t, 1)
                    }
                }, {
                    key: "deleteCompileEnv",
                    value: function (e) {
                        this.customConfig.compileEnv.splice(e, 1)
                    }
                }, {
                    key: "deleteCreatedFileStoragePath",
                    value: function (e) {
                        this.customConfig.createdFileStoragePath.splice(e, 1)
                    }
                }, {
                    key: "addEnvConfDefault",
                    value: function () {
                        this.config.envConfDefault.push({
                            key: "",
                            value: "",
                            description: ""
                        })
                    }
                }, {
                    key: "addUploadFileInfo",
                    value: function () {
                        this.customConfig.uploadFileInfos.push({
                            filename: "",
                            content: ""
                        })
                    }
                }, {
                    key: "delUploadFileInfo",
                    value: function (e) {
                        this.customConfig.uploadFileInfos.splice(e, 1)
                    }
                }, {
                    key: "toggleBaseImage",
                    value: function (e, t, i) {
                        this.customConfig.baseImageName = e, this.customConfig.baseImageTag = t, this.customConfig.baseImageRegistry = i
                    }
                }, {
                    key: "addCreatedFileStoragePath",
                    value: function () {
                        this.customConfig.createdFileStoragePath.push({
                            name: ""
                        })
                    }
                }, {
                    key: "addCompileEnv",
                    value: function () {
                        this.customConfig.compileEnv.push({
                            envName: "",
                            envValue: ""
                        })
                    }
                }, {
                    key: "addConfFiles",
                    value: function () {
                        this.config.confFiles.push({
                            tplDir: "",
                            originDir: ""
                        })
                    }
                }, {
                    key: "modify",
                    value: function () {
                        return e.put("/api/project", angular.toJson(this._formartProject()))
                    }
                }, {
                    key: "delete",
                    value: function () {
                        var e = this,
                            t = o.defer();
                        return n.danger("确认删除", "确认要删除吗？").then(function (e) {
                            if (e !== n.button.BUTTON_OK) throw ""
                        }).then(function () {
                            c.deleteData(e.config.id).then(function () {
                                n.alert("提示", "删除成功！"), t.resolve()
                            }, function (e) {
                                dalog.error("删除失败！", e.data.resultMsg), t.reject("fail")
                            })
                        }, function () {
                            t.reject("dismiss")
                        }), t.promise
                    }
                }, {
                    key: "getDockerfile",
                    value: function () {
                        var e = this,
                            t = function () {
                                s.open({
                                    animation: !0,
                                    templateUrl: "/index/tpl/modal/dockerfileModal/dockerfileModal.html",
                                    controller: "DockerfileModalCtr as vm",
                                    size: "md",
                                    resolve: {
                                        project: e
                                    }
                                })
                            };
                        if (this.config.userDefineDockerfile) {
                            s.open({
                                templateUrl: "/index/tpl/modal/branchCheckModal/branchCheckModal.html",
                                controller: "BranchCheckModalCtr as vm",
                                size: "md",
                                resolve: {
                                    codeInfo: function () {
                                        return e.config.codeInfo
                                    },
                                    projectId: function () {
                                        return e.config.id
                                    }
                                }
                            }).result.then(function (i) {
                                e.config.dockerfileInfo.branch = e.config.dockerfileInfo.tag = null, e.config.dockerfileInfo[i.type] = i.value, t()
                            })
                        } else t()
                    }
                }, {
                    key: "_formartProject",
                    value: function () {
                        var e = {},
                            i = "",
                            r = [],
                            n = angular.copy(this.config),
                            a = angular.copy(this.customConfig);
                        return n.envConfDefault = function () {
                            var e = [],
                                i = !0,
                                r = !1,
                                a = t;
                            try {
                                for (var o, s = n.envConfDefault[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                                    var l = o.value;
                                    l.key && l.value && e.push({
                                        key: l.key,
                                        value: l.value,
                                        description: l.description
                                    })
                                }
                            } catch (e) {
                                r = !0, a = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw a
                                }
                            }
                            return e
                        }(), n.autoBuildInfo = function () {
                            var e = n.autoBuildInfo,
                                t = void 0;
                            return n.codeInfo && (e.other || e.master || e.tag) ? (t = {
                                tag: e.tag,
                                branches: []
                            }, e.other && (t.branches = e.branches.split(",")), e.master && t.branches.push("master"), t) : null
                        }(), n.userDefineDockerfile ? (e.name = n.name, e.id = n.id, n.codeInfo && (e.codeInfo = n.codeInfo, e.autoBuildInfo = n.autoBuildInfo), e.exclusiveBuild = null, e.userDefineDockerfile = n.userDefineDockerfile, e.dockerfileInfo = n.dockerfileInfo, e.authority = n.authority, e.envConfDefault = n.envConfDefault) : (n.dockerfileInfo && (n.dockerfileInfo = null), n.confFiles = function () {
                            var e = {},
                                i = !0,
                                r = !1,
                                a = t;
                            try {
                                for (var o, s = n.confFiles[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                                    var l = o.value;
                                    l.tplDir && l.originDir && (e[l.tplDir] = l.originDir)
                                }
                            } catch (e) {
                                r = !0, a = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw a
                                }
                            }
                            return e
                        }(), i = function () {
                            var e = [],
                                i = !0,
                                r = !1,
                                n = t;
                            try {
                                for (var o, s = a.compileEnv[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                                    var l = o.value;
                                    l.envName && l.envValue && e.push(l.envName + "=" + l.envValue)
                                }
                            } catch (e) {
                                r = !0, n = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw n
                                }
                            }
                            return e.join(",")
                        }(), r = function () {
                            var e = [],
                                i = !0,
                                r = !1,
                                n = t;
                            try {
                                for (var o, s = a.createdFileStoragePath[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                                    var l = o.value;
                                    l.name && e.push(l.name)
                                }
                            } catch (e) {
                                r = !0, n = e
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw n
                                }
                            }
                            return e
                        }(), this.isUseCustom ? (n.dockerfileConfig = null, n.customDockerfile = null, n.exclusiveBuild = {
                            customType: a.customType,
                            compileImage: this.projectImagesIns.selectedCompileImage,
                            runImage: this.projectImagesIns.selectedRunImage,
                            codeStoragePath: a.codeStoragePath,
                            compileEnv: i,
                            compileCmd: a.compileCmd,
                            createdFileStoragePath: r,
                            workDir: a.workDir,
                            user: a.user,
                            runFileStoragePath: this.projectImagesIns.selectedRunImage.runFileStoragePath,
                            startCmd: this.projectImagesIns.selectedRunImage.startCommand
                        }, this.projectImagesIns.selectedCompileImage.imageName || (n.exclusiveBuild.compileImage = this.customConfig.compileImage, n.exclusiveBuild.runImage = this.customConfig.runImage, n.exclusiveBuild.runFileStoragePath = this.customConfig.runFileStoragePath, n.exclusiveBuild.startCmd = this.customConfig.startCmd)) : this.isDefDockerfile ? (n.exclusiveBuild = null, n.dockerfileConfig = null, n.customDockerfile = {
                            dockerfile: a.dockerfile,
                            uploadFileInfos: a.uploadFileInfos.filter(function (e) {
                                return e.filename || e.content
                            })
                        }) : (n.exclusiveBuild = null, n.customDockerfile = null, n.dockerfileConfig = {
                            baseImageName: a.baseImageName,
                            baseImageTag: a.baseImageTag,
                            baseImageRegistry: a.baseImageRegistry,
                            installCmd: a.installCmd,
                            codeStoragePath: a.codeStoragePath,
                            compileEnv: i,
                            compileCmd: a.compileCmd,
                            workDir: a.workDir,
                            startCmd: a.startCmd,
                            user: a.user
                        }), e = n), e
                    }
                }, {
                    key: "create",
                    value: function (t) {
                        var i = this._formartProject();
                        return e.post("/api/projectcollection/" + t + "/project", angular.toJson(i))
                    }
                }]), r
            }(),
            h = a.instancesCreator({
                Project: f,
                ProjectImages: m
            });
        return {
            projectService: c,
            getInstance: h,
            buildProject: g
        }
    }
    var r = angular.module("projectModule", []);
    i.$inject = ["$http", "$util", "$state", "dialog", "$domeModel", "$q", "$modal", "$domeImage"], r.factory("$domeProject", i), e.projectModule = r
}(window);
"use strict";
! function (e, t) {
    var n = angular.module("userModule", []);
    n.controller("ModifyPwModalCtr", ["$scope", "loginUser", "$modalInstance", "dialog", "$domeUser", function (e, t, n, o, r) {
        e.pwObj = {
            username: t.username,
            oldpassword: "",
            newpassword: ""
        }, e.newPwAgain = "", e.modiftPw = function () {
            r.userService.userModifyPw(e.pwObj).then(function () {
                o.alert("提示", "修改成功，请重新登录！").then(function () {
                    location.href = "/login/login.html?redirect=" + encodeURIComponent(location.href)
                })
            }, function () {
                o.error("警告", "修改失败，请重试！")
            })
        }, e.cancel = function () {
            n.dismiss("cancel")
        }
    }]).controller("ModifyUserInfoCtr", ["$scope", "user", "$publicApi", "$modalInstance", "dialog", function (e, t, n, o, r) {
        e.user = t, e.cancel = function () {
            o.dismiss()
        }, e.submit = function () {
            var e = {
                id: t.id,
                username: t.username,
                email: t.email,
                phone: t.phone
            };
            n.modifyUserInfo(e).then(function () {
                r.alert("提示", "修改成功！"), o.close(e)
            }, function (e) {
                r.error("修改失败", e.data.resultMsg)
            })
        }
    }]), n.factory("$domeUser", ["$http", "$q", "dialog", "$domeGlobal", "$domeModel", function (e, t, n, o, r) {
        var i = {},
            u = function (r) {
                var i = t.defer();
                return o.getGloabalInstance("git").getData().then(function (t) {
                    if (t = t.filter(function (e) {
                            return e.id === r.gitlabId
                        }), t[0] && t[0].url) {
                        var o = t[0].url;
                        e.post(o + "/api/v3/session", angular.toJson(r), {
                            ignore401: !0
                        }).then(function (e) {
                            var t = e.data;
                            return {
                                name: t.username,
                                token: t.private_token,
                                gitlabId: r.gitlabId
                            }
                        }, function () {
                            i.reject()
                        }).then(function (t) {
                            e.post("/api/project/git/gitlabinfo", angular.toJson(t)).then(function (e) {
                                i.resolve(e.data.result)
                            }, function () {
                                i.reject()
                            })
                        }, function () {
                            i.reject()
                        })
                    } else n.error("警告", "未配置代码仓库地址！"), i.reject()
                }, function () {
                    i.reject()
                }), i.promise
            },
            s = {
                getCurrentUser: function () {
                    return e.get("/api/user/get")
                },
                getUserList: function () {
                    return e.get("/api/user/list")
                },
                modifyUserInfo: function (t) {
                    return e.post("/api/user/modify", angular.toJson(t))
                },
                modifyPw: function (t) {
                    return e.post("/api/user/adminChangePassword", angular.toJson(t))
                },
                userModifyPw: function (t) {
                    return e.post("/api/user/changePassword", angular.toJson(t))
                },
                deleteUser: function (t) {
                    return e.delete("/api/user/delete/" + t)
                },
                createUser: function (t) {
                    return e.post("/api/user/create", angular.toJson(t))
                },
                getResourceUserRole: function (t, n) {
                    return e.get("/api/user/resource/" + t + "/" + n)
                },
                getSigResourceUser: function (t, n) {
                    return e.get("/api/resource/" + t + "/" + n)
                },
                getResourceList: function (t) {
                    return e.get("/api/collections/" + t)
                },
                getResourceUser: function (t) {
                    return e.get("/api/resource/" + t + "/useronly")
                },
                modifyResourceUser: function (t) {
                    return e.put("/api/resource", angular.toJson(t))
                },
                deleteResourceUser: function (t, n, o, r) {
                    return e.delete("/api/resource/" + t + "/" + n + "/" + o + "/" + r)
                },
                getGroupList: function () {
                    return e.get(" /api/namespace/list")
                },
                getGroup: function () {
                    return e.get("/api/group/list")
                },
                getGroupInfo: function (t) {
                    return e.get("/api/group/get/" + t)
                },
                deleteGroup: function (t) {
                    return e.delete("/api/group/delete/" + t)
                },
                createGroup: function (t) {
                    return e.post("/api/group/create", angular.toJson(t))
                },
                modifyGroupUsers: function (t, n) {
                    return e.post("/api/group_members/" + t, angular.toJson(n))
                },
                deleteGroupUser: function (t, n) {
                    return e.delete("/api/group_members/" + t + "/" + n)
                },
                getGroupUser: function (t) {
                    return e.get("/api/group_members/" + t)
                },
                logout: function () {
                    location.href = "/api/user/logout?from=" + encodeURIComponent(location.protocol + "//" + location.host)
                },
                deleteCollectionUser: function (t, n, o) {
                    return e.delete("/api/collection_members/" + t + "/" + n + "/" + o)
                },
                modifyUserRole: function (t) {
                    return e.post("/api/collection_members/single", angular.toJson(t))
                },
                addCollectionUsers: function (t) {
                    return e.post("/api/collection_members/multiple", angular.toJson(t))
                },
                addOneCollectionUser: function (t) {
                    return e.post("/api/collection_members/single", angular.toJson(t))
                },
                getCollectionUser: function (t, n) {
                    return e.get("/api/collection_members/" + t + "/" + n)
                },
                createCollectionUser: function (t) {
                    return e.post("/api/collection_members/multiple", angular.toJson(t))
                },
                getCollectionList: function (t) {
                    return e.post("/api/collections/" + resourceType)
                }
            };
        return {
            userService: s,
            relatedGitLab: u,
            getLoginUser: function () {
                var e = t.defer();
                return i.id ? e.resolve(i) : s.getCurrentUser().then(function (t) {
                    i = t.data.result, e.resolve(i)
                }), e.promise
            }
        }
    }]), e.userModule = n
}(window);
"use strict";
! function (e) {
    var a = angular.module("domeApp", ["ui.router", "ncy-angular-breadcrumb", "oc.lazyLoad", "ngAnimate", "pasvaz.bindonce", "ngLocale", "ui.bootstrap", "publicModule", "domeModule", "deployModule", "imageModule", "userModule", "projectModule", "ngclipboard", "ngCookies", "pageLayout", "commonDialogs", "constant", "formInputs", "backendApi", "commonFilters"]);
    a.run(["$rootScope", "$document", function (e, a) {
        e.$on("pageTitle", function (e, a) {
            a.title && "" !== a.title && $("title").html(a.title + " - DOME")
        }), e.$on("$stateChangeStart", function () {
            angular.element(a).scrollTop(0)
        })
    }]), a.config(["$stateProvider", "$urlRouterProvider", function (a, l) {
        l.when("", "/overview");
        var t = function (a) {
                return Array.isArray(a) || (a = [a]), a = a.map(function (a) {
                    var l = document.createElement("a");
                    return l.href = a, l.search = "version=" + e.VERSION_HASH, l.href
                }), {
                    loadFiles: ["$ocLazyLoad", function (e) {
                        return e.load([{
                            files: a
                        }]).then(function (e) {
                            return e
                        })
                    }]
                }
            },
            r = function (e, a) {
                return function (l) {
                    return e + "(" + JSON.stringify(a(l)) + ")"
                }
            };
        a.state("overview", {
            url: "/overview",
            templateUrl: "index/tpl/overview/overview.html",
            controller: "OverviewCtr",
            resolve: t(["index/tpl/overview/overview.css", "index/tpl/overview/overviewCtr.js"]),
            ncyBreadcrumb: {
                label: "总览",
                navItem: null
            }
        }), a.state("projectCollectionManage", {
            url: "/projectCollectionManage",
            templateUrl: "index/tpl/projectCollectionManage/projectCollectionManage.html",
            resolve: t(["index/tpl/projectCollectionManage/projectCollectionManageCtr.js", "index/tpl/projectCollectionManage/projectCollectionManage.css"]),
            controller: "ProjectCollectionManageCtr",
            ncyBreadcrumb: {
                label: "项目管理",
                navItem: "project"
            }
        }), a.state("createProjectCollection", {
            url: "/createProjectCollection",
            templateUrl: "index/tpl/createProjectCollection/createProjectCollection.html",
            resolve: t(["index/tpl/createProjectCollection/createProjectCollectionCtr.js", "index/tpl/createProjectCollection/createProjectCollection.css"]),
            controller: "CreateProjectCollectionCtr",
            ncyBreadcrumb: {
                label: "新建项目",
                parent: "projectCollectionManage"
            }
        }), a.state("projectManage", {
            url: "/projectManage/:id",
            templateUrl: "index/tpl/projectManage/projectManage.html",
            resolve: t(["index/tpl/projectManage/projectManageCtr.js", "index/tpl/projectManage/projectManage.css"]),
            controller: "ProjectManageCtr",
            ncyBreadcrumb: {
                label: "{{projectCollectionName}}",
                parent: "projectCollectionManage"
            }
        }).state("projectManage.project", {
            url: "/project",
            templateUrl: "index/tpl/projectManage/projectManage.html",
            ncyBreadcrumb: {
                parent: "projectManage",
                skip: !0
            }
        }).state("projectManage.user", {
            url: "/user",
            templateUrl: "index/tpl/projectManage/projectManage.html",
            controller: "ProjectManageCtr",
            ncyBreadcrumb: {
                parent: "projectManage",
                skip: !0
            }
        }), a.state("createProject1", {
            url: "/createProject/1/:projectCollectionId",
            templateUrl: "index/tpl/createProject1/createProject1.html",
            resolve: t(["index/tpl/createProject1/createProject1.css", "index/tpl/createProject1/createProjectCtr1.js"]),
            controller: "CreateProjectCtr1",
            ncyBreadcrumb: {
                label: "新建工程",
                parent: r("projectManage", function (e) {
                    return {
                        id: e.projectCollectionId
                    }
                })
            }
        }).state("createProject2", {
            url: "/createProject/2/:projectCollectionId",
            templateUrl: "index/tpl/createProject2/createProject2.html",
            resolve: t(["index/tpl/createProject2/createProject2.css", "index/tpl/createProject2/createProjectCtr2.js", "index/tpl/tplProjectSetting/projectSettingTpl.css", "index/tpl/projectDetail/projectDetail.css", "index/tpl/tplChoseImage/choseImageCtr.js"]),
            controller: "CreateProjectCtr2",
            ncyBreadcrumb: {
                parent: "createProject1",
                skip: !0
            }
        }), a.state("projectDetail", {
            url: "/projectDetail/:projectCollectionId/:project",
            templateUrl: "index/tpl/projectDetail/projectDetail.html",
            resolve: t(["index/tpl/projectDetail/projectDetail.css", "index/tpl/projectDetail/projectDetailCtr.js", "index/tpl/tplProjectSetting/projectSettingTpl.css"]),
            controller: "ProjectDetailCtr",
            ncyBreadcrumb: {
                label: "工程详情",
                parent: r("projectManage", function (e) {
                    return {
                        id: e.projectCollectionId
                    }
                })
            }
        }).state("projectDetail.info", {
            url: "/info",
            ncyBreadcrumb: {
                parent: "projectDetail",
                skip: !0
            }
        }).state("projectDetail.config", {
            url: "/config",
            ncyBreadcrumb: {
                parent: "projectDetail",
                skip: !0
            }
        }).state("projectDetail.autobuild", {
            url: "/autobuild",
            ncyBreadcrumb: {
                parent: "projectDetail",
                skip: !0
            }
        }).state("projectDetail.buildlog", {
            url: "/buildlog",
            ncyBreadcrumb: {
                parent: "projectDetail",
                skip: !0
            }
        }).state("projectDetail.user", {
            url: "/user",
            ncyBreadcrumb: {
                parent: "projectDetail",
                skip: !0
            }
        }), a.state("imageCollectionManage", {
            url: "/imageCollectionManage",
            templateUrl: "index/tpl/imageCollectionManage/imageCollectionManage.html",
            resolve: t(["index/tpl/imageCollectionManage/imageCollectionManage.css", "index/tpl/imageCollectionManage/imageCollectionManageCtr.js"]),
            controller: "ImageCollectionManageCtr",
            ncyBreadcrumb: {
                label: "镜像管理",
                navItem: "image"
            }
        }).state("imageCollectionManage.baseimages", {
            url: "/baseimages",
            templateUrl: "index/tpl/imageCollectionManage/imageCollectionManage.html",
            ncyBreadcrumb: {
                parent: "imageCollectionManage",
                skip: !0
            }
        }).state("imageCollectionManage.proimages", {
            url: "/proimages",
            templateUrl: "index/tpl/imageCollectionManage/imageCollectionManage.html",
            ncyBreadcrumb: {
                parent: "imageCollectionManage",
                skip: !0
            }
        }).state("imageCollectionManage.publicimages", {
            url: "/publicimages",
            templateUrl: "index/tpl/imageCollectionManage/imageCollectionManage.html",
            ncyBreadcrumb: {
                parent: "imageCollectionManage",
                skip: !0
            }
        }),
//        a.state("publicImageDetail", {
//            url: "/publicImageDetail/:name/:page",
//            params: {
//                page: {
//                    value: null,
//                    squash: !0,
//                    dynamic: !0
//                }
//            },
//            resolve: t(["index/tpl/publicImageDetail/publicImageDetail.css", "index/tpl/publicImageDetail/publicImageDetailCtr.js"]),
//            templateUrl: "index/tpl/publicImageDetail/publicImageDetail.html",
//            ncyBreadcrumb: {
//                label: "官方仓库",
//                parent: "imageCollectionManage.publicimages"
//            }
//        }),
        a.state("otherImagesManage", {
            url: "/otherImagesManage",
            templateUrl: "index/tpl/imagesManage/imagesManage.html",
            resolve: t(["index/tpl/imagesManage/imagesManage.css", "index/tpl/imagesManage/imagesManageCtr.js"]),
            controller: "ImagesManageCtr",
            params: {
                args: {}
            },
            ncyBreadcrumb: {
                label: "其他镜像",
                parent: "imageCollectionManage"
            }
        }), a.state("projImagesManage", {
            url: "/projImagesManage",
            templateUrl: "index/tpl/imagesManage/imagesManage.html",
            resolve: t(["index/tpl/imagesManage/imagesManage.css", "index/tpl/imagesManage/imagesManageCtr.js"]),
            controller: "ImagesManageCtr",
            params: {
                args: {}
            },
            ncyBreadcrumb: {
                label: "{{collectionName}}镜像",
                parent: "imageCollectionManage"
            }
        }), a.state("deployCollectionManage", {
            url: "/deployCollectionManage",
            templateUrl: "index/tpl/deployCollectionManage/deployCollectionManage.html",
            resolve: t(["index/tpl/deployCollectionManage/deployCollectionManage.css", "index/tpl/deployCollectionManage/deployCollectionManageCtr.js"]),
            controller: "DeployCollectionManageCtr",
            ncyBreadcrumb: {
                label: "服务",
                navItem: "service"
            }
        }), a.state("createDeployCollection", {
            url: "/createDeployCollection",
            templateUrl: "index/tpl/createDeployCollection/createDeployCollection.html",
            resolve: t(["index/tpl/createDeployCollection/createDeployCollectionCtr.js", "index/tpl/createDeployCollection/createDeployCollection.css"]),
            controller: "CreateDeployCollectionCtr",
            ncyBreadcrumb: {
                label: "新建服务",
                parent: "deployCollectionManage"
            }
        }), a.state("deployAllManage", {
            url: "/deployAllManage/:id/:name",
            templateUrl: "index/tpl/deployManage/deployManageAll.html",
            resolve: t(["index/tpl/deployManage/deployManageCtr.js", "index/tpl/deployManage/deployManage.css"]),
            controller: "DeployManageCtr",
            ncyBreadcrumb: {
                label: "所有部署",
                parent: "deployCollectionManage"
            }
        }), a.state("deployManage", {
            url: "/deployManage/:id/:name",
            templateUrl: "index/tpl/deployManage/deployManage.html",
            resolve: t(["index/tpl/deployManage/deployManageCtr.js", "index/tpl/deployManage/deployManage.css"]),
            controller: "DeployManageCtr",
            ncyBreadcrumb: {
                label: "{{collectionName}}",
                parent: "deployCollectionManage"
            }
        }).state("deployManage.deploy", {
            url: "/deploy",
            templateUrl: "index/tpl/deployManage/deployManage.html",
            ncyBreadcrumb: {
                parent: "deployManage",
                skip: !0
            }
        }).state("deployManage.user", {
            url: "/user",
            templateUrl: "index/tpl/deployManage/deployManage.html",
            controller: "DeployManageCtr",
            ncyBreadcrumb: {
                parent: "deployManage",
                skip: !0
            }
        }), a.state("createDeployCommon", {
            url: "/createDeployCommon/:collectionId/:collectionName",
            templateUrl: "index/tpl/createDeployCommon/createDeployCommon.html",
            resolve: t(["index/tpl/createDeployCommon/createDeployCommon.css", "index/tpl/createDeployCommon/createDeployCommonCtr.js"]),
            controller: "CreateDeployCommonCtr",
            ncyBreadcrumb: {
                label: "新建部署",
                parent: r("deployManage", function (e) {
                    return {
                        id: e.collectionId,
                        name: e.collectionName
                    }
                })
            }
        }), a.state("createDeployRaw", {
            url: "/createDeployRaw/:collectionId/:collectionName",
            templateUrl: "index/tpl/createDeployRaw/createDeployRaw.html",
            resolve: t(["index/tpl/createDeployRaw/createDeployRaw.css", "index/tpl/createDeployRaw/createDeployRawCtr.js"]),
            controller: "CreateDeployRawCtr",
            ncyBreadcrumb: {
                parent: "createDeployCommon",
                skip: !0
            }
        }), a.state("createDeployImage", {
            url: "/createDeployImage/:collectionId/:collectionName",
            templateUrl: "index/tpl/createDeployImage/createDeployImage.html",
            resolve: t(["index/tpl/createDeployImage/createDeployImage.css", "index/tpl/createDeployImage/createDeployImageCtr.js"]),
            controller: "CreateDeployImageCtr",
            ncyBreadcrumb: {
                parent: "createDeployCommon",
                skip: !0
            }
        }), a.state("deployDetail", {
            url: "/deployDetail/:id/:collectionId/:collectionName",
            params: {
                storageId: null
            },
            templateUrl: "index/tpl/deployDetail/deployDetail.html",
            resolve: t(["index/tpl/deployDetail/deployDetail.css", "index/tpl/deployDetail/deployDetailCtr.js"]),
            controller: "DeployDetailCtr",
            ncyBreadcrumb: {
                label: "{{deployName}}",
                parent: function (e) {
                    return +e.collectionId ? r("deployManage", function (e) {
                        return {
                            id: e.collectionId,
                            name: e.collectionName
                        }
                    })(e) : "deployAllManage({ id: 0 })"
                }
            }
        }).state("deployDetail.detail", {
            url: "/detail",
            ncyBreadcrumb: {
                parent: "deployDetail",
                skip: !0
            }
        }).state("deployDetail.update", {
            url: "/update",
            ncyBreadcrumb: {
                parent: "deployDetail",
                skip: !0
            }
        }).state("deployDetail.event", {
            url: "/event",
            ncyBreadcrumb: {
                parent: "deployDetail",
                skip: !0
            }
        }).state("deployDetail.instance", {
            url: "/instance",
            ncyBreadcrumb: {
                parent: "deployDetail",
                skip: !0
            }
        }).state("deployDetail.network", {
            url: "/network",
            ncyBreadcrumb: {
                parent: "deployDetail",
                skip: !0
            }
        }), a.state("clusterManage", {
            url: "/clusterManage",
            templateUrl: "index/tpl/clusterManage/clusterManage.html",
            resolve: t(["index/tpl/clusterManage/clusterManage.css", "index/tpl/clusterManage/clusterManageCtr.js"]),
            controller: "ClusterManageCtr",
            ncyBreadcrumb: {
                label: "集群管理",
                navItem: "cluster"
            }
        }), a.state("createCluster", {
            url: "/createCluster",
            templateUrl: "index/tpl/createCluster/createCluster.html",
            resolve: t(["index/tpl/createCluster/createCluster.css", "index/tpl/createCluster/createClusterCtr.js"]),
            controller: "CreateClusterCtr",
            ncyBreadcrumb: {
                label: "新建集群",
                parent: "clusterManage"
            }
        }), a.state("clusterDetail", {
            url: "/clusterDetail/:id",
            templateUrl: "index/tpl/clusterDetail/clusterDetail.html",
            resolve: t(["index/tpl/clusterDetail/clusterDetail.css", "index/tpl/clusterDetail/clusterDetailCtr.js"]),
            controller: "ClusterDetailCtr",
            ncyBreadcrumb: {
                label: "集群详情",
                parent: "clusterManage"
            }
        }).state("clusterDetail.hostlist", {
            url: "/hostlist",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }).state("clusterDetail.info", {
            url: "/info",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }).state("clusterDetail.namespace", {
            url: "/namespace",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }).state("clusterDetail.instances", {
            url: "/instances",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }).state("clusterDetail.users", {
            url: "/users",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }).state("clusterDetail.watcher", {
            url: "/watcher",
            ncyBreadcrumb: {
                parent: "clusterDetail",
                skip: !0
            }
        }), a.state("createWatcher", {
            url: "/cluster/:id/createWatcher",
            templateUrl: "index/tpl/createWatcher/createWatcher.html",
            controller: "CreateWatcherCtr",
            resolve: t(["index/tpl/createWatcher/createWatcherCtr.js"]),
            ncyBreadcrumb: {
                label: "添加监听器",
                parent: r("clusterDetail", function (e) {
                    return {
                        id: e.clusterId
                    }
                })
            }
        }), a.state("watcherDetail", {
            url: "/cluster/:clusterId/:deployId",
            params: {
                args: {}
            },
            templateUrl: "index/tpl/watcherDetail/watcherDetail.html",
            controller: "WatcherDetailCtr",
            resolve: t(["index/tpl/watcherDetail/watcherDetailCtr.js", "index/tpl/deployDetail/deployDetailCtr.js", "index/tpl/watcherDetail/watcherDetail.css", "index/tpl/deployDetail/deployDetail.css", "index/tpl/deployDetail/deployDetailCtr.js", "index/tpl/createWatcher/createWatcherCtr.js"]),
            ncyBreadcrumb: {
                label: "监听器详情",
                parent: r("clusterDetail", function (e) {
                    return {
                        id: e.clusterId
                    }
                })
            }
        }).state("watcherDetail.detail", {
            url: "/detail",
            ncyBreadcrumb: {
                parent: "watcherDetail",
                skip: !0
            }
        }).state("watcherDetail.update", {
            url: "/update",
            ncyBreadcrumb: {
                parent: "watcherDetail",
                skip: !0
            }
        }).state("watcherDetail.event", {
            url: "/event",
            ncyBreadcrumb: {
                parent: "watcherDetail",
                skip: !0
            }
        }), a.state("addHost", {
            url: "/addHost/:id",
            templateUrl: "index/tpl/addHost/addHost.html",
            controller: "AddHostCtr",
            resolve: t(["index/tpl/addHost/addHost.css", "index/tpl/addHost/addHostCtr.js"]),
            ncyBreadcrumb: {
                label: "添加主机",
                parent: r("clusterDetail", function (e) {
                    return {
                        id: e.id
                    }
                })
            }
        }), a.state("hostDetail", {
            url: "/hostDetail/:clusterId/:name",
            templateUrl: "index/tpl/hostDetail/hostDetail.html",
            resolve: t(["index/tpl/hostDetail/hostDetail.css", "index/tpl/hostDetail/hostDetailCtr.js"]),
            controller: "HostDetailCtr",
            ncyBreadcrumb: {
                label: "主机详情",
                parent: r("clusterDetail", function (e) {
                    return {
                        id: e.clusterId
                    }
                })
            }
        }).state("hostDetail.instancelist", {
            url: "/instancelist",
            ncyBreadcrumb: {
                parent: "hostDetail",
                skip: !0
            }
        }).state("hostDetail.info", {
            url: "/info",
            ncyBreadcrumb: {
                parent: "hostDetail",
                skip: !0
            }
        }), a.state("monitor", {
            url: "/monitor",
            templateUrl: "index/tpl/monitor/monitor.html",
            controller: "MonitorCtr",
            resolve: t(["index/tpl/monitor/monitor.css", "index/tpl/monitor/monitorCtr.js"]),
            ncyBreadcrumb: {
                label: "监控",
                navItem: "monitor"
            }
        }), a.state("appStore", {
            url: "/appStore",
            templateUrl: "index/tpl/appStore/appStore.html",
            controller: "AppStoreCtr",
            resolve: t(["index/tpl/appStore/appStore.css", "index/tpl/appStore/appStoreCtr.js"]),
            ncyBreadcrumb: {
                label: "应用商店",
                navItem: "apps"
            }
        }), a.state("createAppDeploy", {
            url: "/createDeploy/app/:appName",
            templateUrl: "index/tpl/createAppDeploy/createAppDeploy.html",
            controller: "CreateAppDeployCtr",
            resolve: t(["index/tpl/createAppDeploy/createAppDeploy.css", "index/tpl/createAppDeploy/createAppDeployCtr.js"]),
            ncyBreadcrumb: {
                label: "应用部署",
                parent: "appStore"
            }
        }), a.state("alarm", {
            url: "/alarm",
            templateUrl: "index/tpl/alarm/alarm.html",
            controller: "AlarmCtr as vm",
            resolve: t(["index/tpl/alarm/alarm.css", "index/tpl/alarm/alarmCtr.js"]),
            ncyBreadcrumb: {
                label: "报警",
                navItem: "alarm"
            }
        }).state("alarm.templates", {
            url: "/templates",
            templateUrl: "index/tpl/alarm/tabTemplates/tabTemplates.html",
            controller: "TabAlarmTemplatesCtr as vmTemplate",
            ncyBreadcrumb: {
                parent: "alarm",
                skip: !0
            }
        }).state("alarm.nodegroups", {
            url: "/nodegroups",
            templateUrl: "index/tpl/alarm/tabHostGroups/tabHostGroups.html",
            controller: "TabHostGroupsCtr as vmHostGroup",
            ncyBreadcrumb: {
                parent: "alarm",
                skip: !0
            }
        }).state("alarm.currentAlarms", {
            url: "/currentAlarms",
            templateUrl: "index/tpl/alarm/tabCurrentAlarms/tabCurrentAlarms.html",
            controller: "TabAlarmCurrentAlarmsCtr as vmAlarm",
            ncyBreadcrumb: {
                parent: "alarm",
                skip: !0
            }
        }).state("alarm.group", {
            url: "/group",
            templateUrl: "index/tpl/alarm/tabGroup/tabGroup.html",
            controller: "TabGroupCtr as vmGroup",
            ncyBreadcrumb: {
                parent: "alarm",
                skip: !0
            }
        }).state("alarm.usergroup", {
            url: "/usergroup",
            templateUrl: "index/tpl/alarm/tabUserGroup/tabUserGroup.html",
            controller: "TabUserGroupCtr",
            ncyBreadcrumb: {
                parent: "alarm",
                skip: !0
            }
        }), a.state("createAlarmTemplate", {
            url: "/createAlarmTemplate",
            templateUrl: "index/tpl/createAlarmTemplate/createAlarmTemplate.html",
            controller: "CreateAlarmTemplateCtr",
            resolve: t(["index/tpl/createAlarmTemplate/createAlarmTemplateCtr.js", "index/tpl/tplAlarmTemplate/tplAlarmTemplate.css"]),
            ncyBreadcrumb: {
                label: "新建模板",
                parent: "alarm.templates"
            }
        }), a.state("alarmTemplateDetail", {
            url: "/alarmTemplateDetail/:id",
            templateUrl: "index/tpl/alarmTemplateDetail/alarmTemplateDetail.html",
            controller: "AlarmTemplateDetailCtr",
            resolve: t(["index/tpl/alarmTemplateDetail/alarmTemplateDetailCtr.js", "index/tpl/tplAlarmTemplate/tplAlarmTemplate.css"]),
            ncyBreadcrumb: {
                label: "模板详情",
                parent: "alarm.templates"
            }
        }), a.state("alarmAddHosts", {
            url: "/alarmAddHosts/:id/:name",
            templateUrl: "index/tpl/alarmAddHosts/alarmAddHosts.html",
            controller: "AlarmAddHostsCtr as vm",
            resolve: t(["index/tpl/alarmAddHosts/alarmAddHostsCtr.js", "index/tpl/alarmAddHosts/alarmAddHosts.css"]),
            ncyBreadcrumb: {
                label: "添加主机",
                parent: "alarm.nodegroups"
            }
        }), a.state("configMapCollection", {
            url: "/configMapCollection",
            templateUrl: "index/tpl/configMap/configMapCollection/configMapCollection.html",
            controller: "ConfigMapCollectionCtr",
            ncyBreadcrumb: {
                label: "配置集合",
                navItem: "configmap"
            },
            resolve: t(["/index/tpl/configMap/configMapCollection/configMapCollectionCtr.js"])
        }), a.state("createConfigMapCollection", {
            url: "/createConfigMapCollection",
            templateUrl: "index/tpl/configMap/createConfigMapCollection/createConfigMapCollection.html",
            controller: "CreateConfigMapCollectionCtr",
            resolve: t(["/index/tpl/configMap/createConfigMapCollection/createConfigMapCollectionCtr.js"]),
            ncyBreadcrumb: {
                label: "新建配置集合",
                parent: "configMapCollection"
            }
        }), a.state("configMapCollectionDetail", {
            url: "/configMapCollectionDetail/:id/:page",
            params: {
                page: {
                    value: null,
                    squash: !0,
                    dynamic: !0
                }
            },
            templateUrl: "index/tpl/configMap/configMapCollectionDetail/configMapCollectionDetail.html",
            controller: "ConfigMapCollectionDetailCtr",
            resolve: t(["/index/tpl/configMap/configMapCollectionDetail/configMapCollectionDetailCtr.js"]),
            ncyBreadcrumb: {
                label: "集合信息",
                parent: "configMapCollection"
            }
        }), a.state("createConfigMap", {
            url: "/createConfigMap/:id",
            templateUrl: "index/tpl/configMap/createConfigMap/createConfigMap.html",
            controller: "CreateConfigMapCtr",
            resolve: t(["/index/tpl/configMap/createConfigMap/createConfigMapCtr.js"]),
            ncyBreadcrumb: {
                label: "新建配置",
                parent: "configMapCollectionDetail"
            }
        }), a.state("configMapDetail", {
            url: "/configMapDetail/:id/:configMapId/:page",
            params: {
                page: {
                    value: null,
                    squash: !0,
                    dynamic: !0
                }
            },
            templateUrl: "index/tpl/configMap/configMapDetail/configMapDetail.html",
            controller: "ConfigMapDetailCtr",
            resolve: t(["/index/tpl/configMap/configMapDetail/configMapDetailCtr.js"]),
            ncyBreadcrumb: {
                label: "配置详情",
                parent: "configMapCollectionDetail"
            }
        }), a.state("createDeploy", {
            url: "/createDeploy/:collectionId/:collectionName",
            templateUrl: "index/tpl/deployment/createDeployment/createDeployment.html",
            resolve: t(["/index/tpl/deployment/createDeployment/createDeploymentCtr.js"]),
            controller: "CreateDeploymentCtr",
            ncyBreadcrumb: {
                label: "新建部署",
                parent: r("deployManage", function (e) {
                    return {
                        id: e.collectionId,
                        name: e.collectionName
                    }
                })
            }
        }), a.state("alarmUserGroupDetail", {
            url: "/alarmUserGroupDetail/:id",
            templateUrl: "index/tpl/tplAlarmUserGroupDetail/tplAlarmUserGroupDetail.html",
            controller: "TplAlarmUserGroupDetailCtr",
            resolve: t(["index/tpl/tplAlarmUserGroupDetail/tplAlarmUserGroupDetailCtr.js", "index/tpl/tplAlarmUserGroupDetail/tplAlarmUserGroupDetail.css"]),
            ncyBreadcrumb: {
                label: "用户组详情",
                parent: "alarm.usergroup"
            }
        }), a.state("globalSetting", {
            url: "/globalSetting/:page",
            params: {
                page: {
                    value: null,
                    squash: !0,
                    dynamic: !0
                }
            },
            templateUrl: "index/tpl/globalSetting/globalSetting.html",
            controller: "GlobalSettingCtr",
            resolve: t(["index/tpl/globalSetting/globalSetting.css", "index/tpl/globalSetting/globalSettingCtr.js"]),
            ncyBreadcrumb: {
                label: "全局配置",
                navItem: "global"
            }
        }), a.state("loadBalanceCollection", {
            url: "/loadBalanceCollection",
            templateUrl: "index/tpl/loadBalance/loadBalanceCollection/loadBalanceCollection.html",
            controller: "LoadBalanceCollectionCtr",
            resolve: t(["/index/tpl/loadBalance/loadBalanceCollection/loadBalanceCollectionCtr.js"]),
            ncyBreadcrumb: {
                label: "负载均衡"
            }
        }), a.state("createLoadBalanceCollection", {
            url: "/createLoadBalanceCollection",
            templateUrl: "index/tpl/loadBalance/createLoadBalanceCollection/createLoadBalanceCollection.html",
            controller: "CreateLoadBalanceCollectionCtr",
            resolve: t(["/index/tpl/loadBalance/createLoadBalanceCollection/createLoadBalanceCollectionCtr.js"]),
            ncyBreadcrumb: {
                label: "新建负载均衡",
                parent: "loadBalanceCollection"
            }
        }), a.state("loadBalanceInfo", {
            url: "/loadBalanceInfo/:id/:type/:page",
            params: {
                page: {
                    value: null,
                    squash: !0,
                    dynamic: !0
                }
            },
            templateUrl: "index/tpl/loadBalance/loadBalanceInfo/loadBalanceInfo.html",
            controller: "LoadBalanceInfoCtr",
            resolve: t(["/index/tpl/loadBalance/loadBalanceInfo/loadBalanceInfoCtr.js"]),
            ncyBreadcrumb: {
                label: "负载均衡实例",
                parent: "loadBalanceCollection"
            }
        }), a.state("createKubeLoadBalance", {
            url: "/createKubeLoadBalance/:id",
            templateUrl: "index/tpl/loadBalance/createLoadBalance/createKubeLoadBalance.html",
            controller: "CreateKubeLoadBalanceCtr",
            ncyBreadcrumb: {
                label: "添加",
                parent: r("loadBalanceInfo", function (e) {
                    return {
                        id: e.collectionId,
                        type: e.type
                    }
                })
            },
            resolve: t(["/index/tpl/loadBalance/common/loadBalanceComponent.js", "/index/tpl/loadBalance/createLoadBalance/createLoadBalanceCtr.js"])
        }), a.state("createNginxLoadBalance", {
            url: "/createNginxLoadBalance/:id",
            templateUrl: "index/tpl/loadBalance/createLoadBalance/createNginxLoadBalance.html",
            controller: "CreateNginxLoadBalanceCtr",
            ncyBreadcrumb: {
                label: "添加",
                parent: r("loadBalanceInfo", function (e) {
                    return {
                        id: e.collectionId,
                        type: e.type
                    }
                })
            },
            resolve: t(["/index/tpl/loadBalance/common/loadBalanceComponent.js", "/index/tpl/loadBalance/createLoadBalance/createLoadBalanceCtr.js"])
        }), a.state("kubeLoadBalanceDetail", {
            url: "/kubeLoadBalanceDetail/:collectionId/:loadBalanceId",
            templateUrl: "index/tpl/loadBalance/loadBalanceDetail/kubeLoadBalanceDetail.html",
            controller: "KubeLoadBalanceDetailCtr",
            ncyBreadcrumb: {
                label: "{{loadBalanceDraft.name}}",
                parent: r("loadBalanceInfo", function (e) {
                    return {
                        id: e.collectionId,
                        type: e.type
                    }
                })
            },
            resolve: t(["/index/tpl/loadBalance/common/loadBalanceComponent.js", "/index/tpl/loadBalance/loadBalanceDetail/loadBalanceDetailCtr.js"])
        }), a.state("nginxLoadBalanceDetail", {
            url: "/nginxLoadBalanceDetail/:collectionId/:loadBalanceId/:page",
            templateUrl: "index/tpl/loadBalance/loadBalanceDetail/nginxLoadBalanceDetail.html",
            params: {
                page: {
                    value: null,
                    squash: !0,
                    dynamic: !0
                }
            },
            controller: "NginxLoadBalanceDetailCtr",
            ncyBreadcrumb: {
                label: "{{loadBalanceDraft.name}}",
                parent: r("loadBalanceInfo", function (e) {
                    return {
                        id: e.collectionId,
                        type: e.type
                    }
                })
            },
            resolve: t(["index/tpl/deployDetail/deployDetail.css", "/index/tpl/loadBalance/common/loadBalanceComponent.js", "/index/tpl/loadBalance/loadBalanceDetail/loadBalanceDetailCtr.js"])
        })
    }]).config(["$compileProvider", "$qProvider", function (e, a) {
        e.debugInfoEnabled(!1), a.errorOnUnhandledRejections(!1)
    }]).config(["$provide", function (a) {
        function l(e) {
            var a = angular.bind(e, e.fromUrl);
            return e.fromUrl = function (e, l) {
                return null !== e && angular.isDefined(e) && angular.isString(e) && (e += e.indexOf("?") === -1 ? "?" : "&", e += "v=" + t), a(e, l)
            }, e
        }
        var t = e.VERSION_HASH || Date.now().toString();
        a.decorator("$templateFactory", ["$delegate", l])
    }])
}(window);
"use strict";
! function (n) {
    n.controller("MainCtr", ["$scope", "$timeout", function (n, e) {
        n.thinLeftNav = Boolean(Number(localStorage.getItem("thinLeftNav"))), n.switchThinNav = function () {
            n.thinLeftNav = !n.thinLeftNav, localStorage.setItem("thinLeftNav", String(Number(n.thinLeftNav)))
        };
        var t = function () {
            n.lowResolution = document.body.clientWidth < 1135
        };
        t(), window.addEventListener("resize", function () {
            e(t)
        })
    }]), n.component("memoryDatabaseWarning", {
        template: '\n      <div class="page-prompt" ng-if="$ctrl.isInMemoryDatabase && !$ctrl.userHide">\n        <div class="page-prompt-text">为了方便试用DOME，目前正在使用内存数据库。数据库数据会在 DOME 服务器重启时丢失。您可以配置 MySQL 作为持久化数据库。配置 MySQL 数据库的方法详见<a href="{{ $ctrl.documentUrl }}" target="_blank">使用文档</a>。</div>\n        <icon-close class="page-prompt-close" ng-click="$ctrl.hideWarning()"></icon-close>\n      </div>\n    ',
        bindings: {},
        controller: ["api", "dialog", "documentUrl", function (n, e, t) {
            var o = this;
            o.documentUrl = t, o.isInMemoryDatabase = null, o.userHide = !1, n.global.isInMemoryDatabase().then(function (n) {
                o.isInMemoryDatabase = n
            }), o.hideWarning = function () {
                o.userHide = !0
            }
        }]
    }), n.component("headerAction", {
        // Pekkle: remove the link of document from icon-document
        template: '\n      <ul class="header-action-container" ng-show="$ctrl.user.name">\n        <li class="header-action-item header-action-document">\n          <a href="{{ $ctrl.documentUrl }}"></a>\n        </li>\n        <li id="header-action-user" class="header-action-item header-action-user">\n          <a href="javascript:;">\n            <icon-user></icon-user>\n            <span ng-bind="$ctrl.user.name"></span>\n          </a>\n          <ul class="header-action-user-drop-down" ng-show="$ctrl.showUserMenu">\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-click="$ctrl.editMyInfo()">修改资料</a></li>\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-if="$ctrl.mayEditMyPassword" ng-click="$ctrl.editMyPassword()">修改密码</a></li>\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-click="$ctrl.logout()">退出登录</a></li>\n          </ul>\n          <div class="header-action-user-drop-down-triangle" ng-show="$ctrl.showUserMenu"></div>\n        </li>\n      </ul>\n    ',
        bindings: {},
        controller: ["api", "dialog", "userDialog", "documentUrl", "logoutUrl", "$timeout", function (n, e, t, o, a, i) {
            var c = this;
            c.documentUrl = o, c.mayEditMyPassword = !1, n.user.whoami().then(function (n) {
                var e = n.name,
                    t = n.loginType,
                    o = n.isAdmin;
                c.user = {
                    name: e,
                    loginType: t,
                    isAdmin: o
                }, "USER" === t && (c.mayEditMyPassword = !0)
            }), angular.element("#header-action-user").on("focusin", function () {
                c.showUserMenu = !0, i(function () {})
            }), angular.element("#header-action-user").on("focusout", function () {
                c.showUserMenu = !1, i(function () {})
            }), c.editMyInfo = function () {
                n.user.whoami().then(function (e) {
                    t.editInfo(e), n.user.whoami(!0)
                })
            }, c.editMyPassword = function () {
                t.editPassword(c.user.name)
            }, c.logout = function () {
                location.href = a + "?from=" + encodeURIComponent(location.protocol + "//" + location.host)
            }
        }]
    }), n.component("leftNav", {
        template: '\n      <div id="left-nav" class="left-nav-container" role="navigation">\n        <ul class="left-nav-list">\n          <li class="left-nav-item {{ group.classname }}" ng-repeat="group in menu track by $index" ng-class="{ \'left-nav-unfold\': group.unfold, \'left-nav-active\': group.active }">\n            <a class="left-nav-item-link" href="javascript:;" ng-click="click(group)">\n              <span class="left-nav-icon"><nav-icon type="{{ group.icon }}"></nav-icon></span>\n              <span class="left-nav-text" ng-bind="group.text"></span>\n              <span class="left-nav-fold" ng-if="group.children && group.children.length">\n                <icon-right-arrow ng-show="!group.unfold"></icon-right-arrow>\n                <icon-down-arrow ng-show="group.unfold"></icon-down-arrow>\n              </span>\n            </a>\n            <ul class="left-nav-sub-menu" ng-if="group.children && group.children.length" ng-style="{ \'max-height\': group.children.length * 47 - 2 }">\n              <li class="left-nav-item" ng-repeat="item in group.children" ng-class="{ \'left-nav-active-item\': item.active }">\n                <a class="left-nav-item-link" href="javascript:;" ng-click="click(item)">\n                  <span class="left-nav-text" ng-bind="item.text"></span>\n                </a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n    ',
        bindings: {},
        controller: ["$state", "$scope", "$rootScope", "api", function (n, e, t, o) {
            e.menu = [];
            var a = function () {
                    for (var t = [], o = n.current; o;) {
                        t.push(o.name);
                        var a = o.ncyBreadcrumb && o.ncyBreadcrumb.parent;
                        if ("function" == typeof a && (a = a({})), a && (a = a.replace(/\(.*$/g, "")), !a) break;
                        o = n.get(a)
                    }! function n(e) {
                        return e.map(function (e) {
                            return e.active = n(e.children || []) || t.indexOf(e.page) !== -1
                        }).reduce(function (n, e) {
                            return n || e
                        }, !1)
                    }(e.menu), e.menu.forEach(function (n) {
                        n.unfold = n.active
                    })
                },
                i = function (n) {
                    // Pekkle: the initialization of the GUI menu items
                    e.menu = [{
                        classname: "logo-container",
                        icon: "domeos",
                        text: "DOME",
                        page: "overview"
                    }, {
                        icon: "development",
                        text: "开发集成",
                        children: [{
                            text: "项目",
                            page: "projectCollectionManage"
                        }, {
                            text: "镜像",
                            page: "imageCollectionManage"
                        }]
                    }, {
                        icon: "operation",
                        text: "运维管理",
                        children: [{
                            text: "服务",
                            page: "deployCollectionManage"
                        }, {
                            text: "集群",
                            page: "clusterManage"
                        }, {
                            text: "负载均衡",
                            page: "loadBalanceCollection"
                        }, {
                            text: "配置集合",
                            page: "configMapCollection"
                        }
                        // Pekkle: comment out this function
//                        ,
//                        {
//                            text: "应用商店",
//                            page: "appStore"
//                        }
                        ]
                    }, {
                        icon: "monitor",
                        text: "监控报警",
                        children: [{
                            text: "监控",
                            page: "monitor"
                        }, {
                            text: "报警",
                            page: "alarm"
                        }]
                    }].concat(n ? [{
                        icon: "setting",
                        text: "全局设置",
                        page: "globalSetting"
                    }] : []), a()
                };
            o.user.whoami().then(function (n) {
                var e = n.isAdmin;
                i(e)
            }), e.click = function (t) {
                t.page ? n.go(t.page) : (t.unfold = !t.unfold, t.unfold && e.menu.forEach(function (n) {
                    n.unfold = n === t
                }))
            }, t.$on("$stateChangeSuccess", function () {
                a()
            }), setTimeout(function () {
                yaSimpleScrollbar.attach(document.getElementById("left-nav"))
            }, 0)
        }]
    }), n.component("navIcon", {
        template: '\n      <i class="icon icon-nav {{ $ctrl.classname() }}"></i>\n    ',
        bindings: {
            type: "@"
        },
        controller: [function () {
            var n = this;
            n.classname = function () {
                return {
                    domeos: "domeos-logo",
                    development: "fa fa-th-large",
                    operation: "glyphicon glyphicon-stats",
                    monitor: "fa fa-bell-o",
                    setting: "fa fa-cog"
                }[n.type]
            }
        }]
    })
}(angular.module("domeApp"));
"use strict";
! function (o) {
    o.factory("userDialog", ["dialog", "api", function (o, e) {
        var n = {};
        return n.editInfo = function (n) {
            var r = n.name,
                t = n.id,
                i = n.email,
                m = n.phone;
            return o.common({
                title: "修改资料",
                buttons: o.buttons.BUTTON_OK_CANCEL,
                template: '\n          <form name="modifyInfo"><form-container left-column-width="80">\n            <form-config-group ng-show="data.id !== undefined">\n              <form-config-item config-title="用户名">\n                <span ng-bind="data.name"></span>\n              </form-config-item>\n              <form-config-item config-title="邮箱">\n                <input placeholder="请输入邮箱地址" type="email" name="email" required ng-model="data.email" />\n                <form-error-message form="modifyInfo" target="email" type="required">请输入邮箱地址</form-error-message>\n                <form-error-message form="modifyInfo" target="email" type="email">邮箱地址格式不正确</form-error-message>\n              </form-config-item>\n              <form-config-item config-title="电话">\n                <input placeholder="请输入电话号码" type="tel" name="phone" ng-model="data.phone" />\n                <form-error-message form="modifyInfo" target="phone" type="required">请输入电话号码</form-error-message>\n                <form-error-message form="modifyInfo" target="phone" type="pattern">电话号码格式不正确</form-error-message>\n              </form-config-item>\n            </form-config-group>\n            <button ng-show="false"></button>\n          </form-container></form>\n        ',
                size: 600,
                controller: ["$scope", function (n) {
                    n.data = {
                        id: t,
                        name: r,
                        email: i,
                        phone: m
                    }, n.onbeforeclose = function (e) {
                        if (e === o.button.BUTTON_OK) return n.formSubmit(), !1
                    }, n.formSubmit = function () {
                        n.modifyInfo.$setSubmitted(), n.modifyInfo.$invalid || e.user.modify(n.data).then(function () {
                            o.tip("修改资料成功", "修改资料成功。").then(function () {
                                return n.resolve(o.button.BUTTON_OK)
                            })
                        }, function (e) {
                            o.error("修改资料失败", "修改密码失败，请重试。")
                        })
                    }
                }]
            })
        }, n.editPassword = function (n) {
            return o.common({
                title: "修改密码",
                buttons: o.buttons.BUTTON_OK_CANCEL,
                template: '\n          <form name="modifyPassword"><form-container left-column-width="80">\n            <form-config-group>\n              <form-config-item config-title="用户名" ng-if="isAdmin === true">\n                <span ng-bind="username"></span>\n              </form-config-item>\n              <form-config-item config-title="原密码" ng-if="isAdmin === false">\n                <input placeholder="请输入原密码" type="password" name="old" ng-model="data.oldPassword" required />\n                <form-error-message form="modifyPassword" target="old">请输入原密码</form-error-message>\n              </form-config-item>\n              <form-config-item config-title="新密码">\n                <input placeholder="密码长度应为 8 ～ 20 位" type="password" name="password" required pattern="^.{8,20}$" ng-model="data.newPassword" />\n                <form-error-message form="modifyPassword" target="password" type="required">请输入新密码</form-error-message>\n                <form-error-message form="modifyPassword" target="password" type="pattern">密码长度应为 8 ～ 20 位</form-error-message>\n              </form-config-item>\n              <form-config-item config-title="确认密码">\n                <input placeholder="请再次输入新密码" type="password" name="verify" ng-model="data.verifyPassword" />\n                <form-error-message form="modifyPassword" condition="data.newPassword && data.newPassword !== data.verifyPassword">两次输入的密码不一致</form-error-message>\n              </form-config-item>\n            </form-config-group>\n            <button ng-show="false"></button>\n          </form-container></form>\n        ',
                size: 600,
                controller: ["$scope", function (r) {
                    r.username = n, r.isAdmin = null, e.user.whoami().then(function (o) {
                        var e = o.isAdmin,
                            n = o.name;
                        r.isAdmin = e, r.currentUser = n
                    }), r.data = {
                        oldPassword: "",
                        newPassword: "",
                        verifyPassword: ""
                    }, r.onbeforeclose = function (e) {
                        if (e === o.button.BUTTON_OK) return r.modifyPassword.$setSubmitted(), r.modifyPassword.$invalid || r.formSubmit(), !1
                    }, r.formSubmit = function () {
                        e.user.passwd(Object.assign({
                            name: n,
                            newPassword: r.data.newPassword
                        }, r.isAdmin ? {} : {
                            oldPassword: r.data.oldPassword
                        })).then(function () {
                            if (r.isAdmin) {
                                var e = void 0;
                                e = n === r.currentUser ? o.tip("修改密码成功", "您的密码已修改，下次登录时请使用新密码登录。") : o.tip("修改密码成功", "用户 " + n + " 的密码已修改，下次登录时请使用新密码登录。"), e.then(function () {
                                    r.resolve(o.button.BUTTON_OK)
                                })
                            } else o.alert("修改密码成功", "修改密码成功，请重新登录。").then(function () {
                                location.href = "/login/login.html?redirect=" + encodeURIComponent(location.href)
                            })
                        }, function (e) {
                            o.error("修改密码失败", "修改密码失败，" + (e ? e + "，" : "") + "请重试。")
                        })
                    }
                }]
            })
        }, n
    }])
}(angular.module("commonDialogs", ["pageLayout", "backendApi"]));
"use strict";
! function (e, r) {
    void 0 !== e && e.filter("listPage", function () {
        return function (e, r, t) {
            return e ? (t = parseInt(t), e.slice(r * (t - 1), r * t)) : []
        }
    }).filter("deployOptions", function () {
        return function (e, r, t, n, a, i) {
            for (var u = [], c = 0, f = e.length; c < f; c++)(r.ALL || r[e[c].hostEnv]) && (t.ALL || t[e[c].namespace]) && (n.ALL || n[e[c].clusterName]) && (a.ALL || a[e[c].deploymentStatus]) && (i.ALL || i[e[c].deployTypeShow]) && u.push(e[c]);
            return u
        }
    }).filter("search", function () {
        return function (e, r, t) {
            var n = {};
            return angular.forEach(e, function (e, a) {
                e[r].toString().indexOf(t) !== -1 && (n[a] = e)
            }), n
        }
    }).filter("searchKey", function () {
        return function (e, r) {
            var t = {};
            return r ? (angular.forEach(e, function (e, n) {
                n.toString().indexOf(r) !== -1 && (t[n] = e)
            }), t) : e
        }
    }).filter("dynamicKey", function () {
        return function (e, r, t) {
            var n = [];
            if (!t) return e;
            for (var a = 0, i = e.length; a < i; a++) e[a][r].toString().indexOf(t) !== -1 && n.push(e[a]);
            return n
        }
    }).filter("mirrorOptions", function () {
        return function (e, r, t, n, a) {
            for (var i = [], u = 0, c = e.length; u < c; u++) {
                var f = 0 === e[u].autoCustom ? "dockerfile" : "configfile";
                (r.All || r[e[u].state]) && (t.All || t.own && e[u].username == a) && (n.All || n[f]) && i.push(e[u])
            }
            return i
        }
    }).filter("alarmFilter", ["$filter", function (e) {
        return function (r, t) {
            if (r) {
                for (var n, a, i = [], u = 0, c = r.length; u < c; u++) n = r[u], a = e("date")(n.timeStamp, "yyyy-MM-dd HH:mm:ss"), n.alarmObject.indexOf(t) === -1 && n.templateTypeName.indexOf(t) === -1 && n.metricName.indexOf(t) === -1 && n.alarmNum.indexOf(t) === -1 && n.alarmTimes.indexOf(t) === -1 && a.indexOf(t) === -1 || i.push(n);
                return i
            }
        }
    }]).filter("urlProtocolFilter", function () {
        return function (e) {
            return e ? e.indexOf("http://") !== -1 ? e.substring(7) : e.indexOf("https://") !== -1 ? e.substring(8) : "" : ""
        }
    }).filter("eventOperation", function () {
        return function (e) {
            var r = "";
            switch (e) {
                case "UPDATE":
                    r = "升级";
                    break;
                case "ROLLBACK":
                    r = "回滚";
                    break;
                case "SCALE_UP":
                    r = "扩容";
                    break;
                case "SCALE_DOWN":
                    r = "缩容";
                    break;
                case "CREATE":
                    r = "创建";
                    break;
                case "START":
                    r = "启动";
                    break;
                case "STOP":
                    r = "停止";
                    break;
                case "DELETE":
                    r = "删除";
                    break;
                case "ABORT_UPDATE":
                    r = "中断升级";
                    break;
                case "ABORT_ROLLBACK":
                    r = "中断回滚";
                    break;
                case "ABORT_SCALE_UP":
                    r = "中断扩容";
                    break;
                case "ABORT_SCALE_DOWN":
                    r = "中断缩容";
                    break;
                case "ABORT_START":
                    r = "中断启动";
                    break;
                case "KUBERNETES":
                    r = "系统操作";
                    break;
                default:
                    r = "系统操作"
            }
            return r
        }
    }).filter("eventStatus", function () {
        return function (e) {
            var r = "";
            switch (e) {
                case "START":
                    r = "开始";
                    break;
                case "PROCESSING":
                    r = "处理中";
                    break;
                case "SUCCESS":
                    r = "成功";
                    break;
                case "FAILED":
                    r = "失败";
                    break;
                case "ABORTED":
                    r = "已中断";
                    break;
                default:
                    r = ""
            }
            return r
        }
    }).filter("watcherStatusFilter", function () {
        return function (e) {
            var r = "";
            switch (e) {
                case "NOTEXIST":
                    r = "监听器不存在，请进入集群详情页配置";
                    break;
                case "ERROR":
                    r = "监听器运行出错，请进入集群详情页配置";
                    break;
                case "RUNNING":
                    r = "";
                    break;
                default:
                    r = ""
            }
            return r
        }
    }).filter("checkboxListFilter", function () {
        return function (e, r, t) {
            var n = [];
            return t ? (angular.forEach(e, function (e, a) {
                e[r].toString().indexOf(t) !== -1 ? (e.keyFilter = !0, n.push(e)) : (e.isSelected = !1, e.keyFilter = !1)
            }), n) : e.map(function (e) {
                return e.keyFilter = !0, e
            })
        }
    })
}(angular.module("domeApp"));
"use strict";
! function (e, o) {
    void 0 !== e && e.factory("$domeProjectCollection", ["$http", "$q", "dialog", "$domeGlobal", "$domeModel", function (e, o, t, n, c) {
        var r = {
            createProjectCollection: function (o) {
                return e.post("/api/projectcollection", angular.toJson(o))
            },
            getProjectCollection: function () {
                return e.get("/api/projectcollection")
            },
            deleteProjectCollection: function (o) {
                return e.delete("/api/projectcollection/" + o)
            },
            getProjectCollectionProject: function (o) {
                return e.get("/api/projectcollection/" + o + "/project")
            },
            updateProjectCollectionDescription: function (o) {
                return e.put("/api/projectcollection/", angular.toJson(o))
            }
        };
        return {
            projectCollectionService: r,
            deleteProjectCollection: function (e) {
                var n = o.defer();
                return t.danger("确认删除", "确认要删除吗？").then(function (e) {
                    if (e !== t.button.BUTTON_OK) throw ""
                }).then(function () {
                    r.deleteProjectCollection(e).then(function () {
                        n.resolve()
                    }, function () {
                        n.reject(), t.error("警告", "删除失败！")
                    })
                }, function () {
                    n.reject()
                }), n.promise
            }
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (e, o) {
    void 0 !== e && e.factory("$domeDeployCollection", ["$http", "$q", "dialog", "$domeGlobal", "$domeModel", function (e, o, t, n, l) {
        var r = "/api/deploycollection",
            i = {
                createDeployCollection: function (o) {
                    return e.post(r, angular.toJson(o))
                },
                getDeployCollection: function () {
                    return e.get(r)
                },
                deleteDeployCollection: function (o) {
                    return e.delete(r + "/" + o)
                },
                updateDeployCollectionDescription: function (o) {
                    return e.put(r + "/" + o.id, angular.toJson(o))
                },
                migrateDeploy: function (o, t) {
                    return e.get("/api/deploy/migrate/" + o + "/" + t)
                }
            };
        return {
            deployCollectionService: i,
            deleteDeployCollection: function (e) {
                var n = o.defer();
                return t.danger("确认删除", "确认要删除吗？").then(function (e) {
                    if (e !== t.button.BUTTON_OK) throw ""
                }).then(function () {
                    i.deleteDeployCollection(e).then(function () {
                        n.resolve()
                    }, function (e) {
                        n.reject(), t.error("删除失败", e.data.resultMsg)
                    })
                }, function () {
                    n.reject()
                }), n.promise
            }
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (t, e) {
    void 0 !== t && t.factory("$domeAppStore", ["$http", "$domeDeploy", function (t, e) {
        var a = function () {
                return t.get("//app-domeos.bjctc.scs.sohucs.com/apps.json", {
                    notIntercept: !0
                })
            },
            r = function () {};
        return r.prototype = {
            init: function (t) {
                this.config = t, this.formartToDeploy()
            },
            formartToDeploy: function () {
                var t = {};
                t = angular.copy(this.config.deploymentTemplate), t.deployName = this.config.appName + parseInt(1e4 * Math.random()), this.deployIns = e.getInstance("Deploy", t)
            }
        }, {
            getStoreApps: a,
            getInstance: function (t, e) {
                var a;
                switch (t) {
                    case "AppInfo":
                        a = new r;
                        break;
                    default:
                        a = {}, a.init = function () {
                            console.log("error:there is no " + t)
                        }
                }
                return a.init(e), a
            }
        }
    }]).factory("$domeGlobal", ["$http", "dialog", "$q", function (t, e, a) {
        var r = function (r) {
            var n = function () {
                    var t;
                    switch (r) {
                        case "ldap":
                            t = "/api/global/ldapconfig";
                            break;
                        case "server":
                            t = "/api/global/serverconfig";
                            break;
                        case "git":
                            t = "/api/global/gitconfig";
                            break;
                        case "gitUser":
                            t = "/api/global/gitconfig/user";
                            break;
                        case "registry":
                            t = "/api/global/registry/private";
                            break;
                        case "monitor":
                            t = "/api/global/monitor";
                            break;
                        case "ssh":
                            t = "/api/global/webssh";
                            break;
                        case "cluster":
                            t = "/api/global/ci/cluster";
                            break;
                        default:
                            t = ""
                    }
                    return t
                }(),
                o = !0;
            this.getData = function () {
                var e = a.defer();
                return t.get(n).then(function (t) {
                    !t.data.result || "git" == r && 0 === t.data.result.length ? e.reject() : (o = !1, e.resolve(t.data.result))
                }, function (t) {
                    e.reject(t.data.resultMsg)
                }), e.promise
            }, this.modifyData = function (i) {
                var s = a.defer(),
                    c = function (t) {
                        "cluster" !== r && e.alert("提示", t)
                    },
                    l = function (t) {
                        e.error("保存失败！", "Message:" + t)
                    };
                return "git" === r && void 0 !== i.id && (o = !1), o || "registry" === r ? t.post(n, angular.toJson(i)).then(function (t) {
                    o = !1, c("添加成功！"), s.resolve(t.data.result)
                }, function (t) {
                    l(t.data.resultMsg), s.reject()
                }) : t.put(n, angular.toJson(i)).then(function (t) {
                    c("保存成功！"), s.resolve(t.data.result)
                }, function (t) {
                    l(t.data.resultMsg), s.reject()
                }), s.promise
            }, this.deleteData = function (e) {
                return t.delete(n + "/" + e)
            }
        };
        return {
            getGloabalInstance: function (t) {
                return new r(t)
            }
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (t, e) {
    void 0 !== t && t.factory("$domeCluster", ["$http", "$q", "$modal", "dialog", "$domeModel", "$util", function (t, e, i, n, r, o) {
        var s = function () {
                var i = this;
                this.url = "/api/cluster", r.ServiceModel.call(this, this.url);
                var o = this.deleteData;
                this.getNamespace = function (e) {
                    return t.get(i.url + "/" + e + "/namespace")
                }, this.setNamespace = function (e, n) {
                    return t.post(i.url + "/" + e + "/namespace", angular.toJson(n))
                }, this.getLabels = function (e) {
                    return t.get(i.url + "/" + e + "/labels")
                }, this.createWatcher = function (e, n) {
                    return t.post(i.url + "/" + e + "/watcher/create", angular.toJson(n))
                }, this.getWatcher = function (e) {
                    return t.get(i.url + "/" + e + "/watcher/status")
                }, this.getDeployList = function () {
                    return t.get("/api/deploy/list")
                }, this.getInitWatcherVersion = function (e) {
                    return t.get("/api/version/id/" + e + "/1")
                }, this.deleteData = function (t) {
                    var i = e.defer();
                    return n.danger("确认删除", "确认要删除吗？").then(function (t) {
                        if (t !== n.button.BUTTON_OK) throw ""
                    }).then(function () {
                        o(t).then(function () {
                            n.alert("提示", "删除成功！"), i.resolve()
                        }, function (t) {
                            n.error("删除失败", t.data.resultMsg), i.reject()
                        })
                    }, function () {
                        i.reject()
                    }), i.promise
                }, this.getInstancesList = function (e) {
                    return t.get(i.url + "/" + e + "/instancelist")
                }
            },
            l = function () {
                var e = this;
                s.call(this), this.getNodeList = function (i) {
                    return t.get(e.url + "/" + i + "/nodelist")
                }, this.getNodeListWoPods = function (i) {
                    return t.get(e.url + "/" + i + "/nodelistwithoutpods")
                }, this.getNodeInfo = function (i, n) {
                    return t.get(e.url + "/" + i + "/node/" + n)
                }, this.getHostInstances = function (i, n) {
                    return t.get(e.url + "/" + i + "/nodelist/" + n)
                }, this.updateDisk = function (i, n, r) {
                    return t.post(e.url + "/" + i + "/" + n + "/disk?path=" + r)
                }, this.addLabel = function (i, n) {
                    return t.post(e.url + "/" + i + "/nodelabels/add", angular.toJson(n))
                }, this.deleteLabel = function (i, n) {
                    return t.post(e.url + "/" + i + "/nodelabels/delete", angular.toJson(n))
                }, this.modifyNodeDisk = function (i, n, r) {
                    return t.post(e.url + "/" + i + "/" + n + "/disk?path=" + r)
                }, this.getLabels = function (i) {
                    return t.get(e.url + "/" + i + "/labels")
                }
            },
            a = function (t, e) {
                this.isCheckAll = !1, this.nodeList = [], this.selectedCount = 0, this.labelsInfo = {}, this.init(t, e)
            };
        a.prototype = {
            init: function (t, e) {
                var i = this;
                e !== !0 && (e = !1), this.nodeList = function () {
                    t = t ? t : [];
                    for (var i = 0; i < t.length; i++) !e || t[i].diskInfo ? (t[i].keyFilter = !0, t[i].labelFilter = !0, t[i].isSelected = !1) : (t.splice(i, 1), i--);
                    return t
                }(), this.labelsInfo = function () {
                    for (var t = {}, e = i.nodeList, n = 0, r = e.length; n < r; n++)
                        for (var o in e[n].labels)
                            if (e[n].labels.hasOwnProperty(o) && "kubernetes.io/hostname" != o && "hostEnv" != o)
                                if (t[o]) {
                                    for (var s = !1, l = 0, a = t[o].contents.length; l < a; l++)
                                        if (t[o].contents[l] === e[n].labels[o]) {
                                            s = !0;
                                            break
                                        }
                                    s || t[o].contents.push(e[n].labels[o])
                                } else t[o] = {
                                    contents: [e[n].labels[o]],
                                    isSelected: !1,
                                    isShow: !0
                                };
                    return t.PRODENV ? t.PRODENV.isShow = !1 : t.PRODENV = {
                        isShow: !1,
                        contents: [],
                        isSelected: !1
                    }, t.TESTENV ? t.TESTENV.isShow = !1 : t.TESTENV = {
                        isShow: !1,
                        contents: [],
                        isSelected: !1
                    }, t.BUILDENV ? t.BUILDENV.isShow = !1 : t.BUILDENV = {
                        isShow: !1,
                        contents: [],
                        isSelected: !1
                    }, t
                }()
            },
            initLabelsInfo: function () {
                for (var t in this.labelsInfo) this.labelsInfo.hasOwnProperty(t) && this.labelsInfo[t].isSelected && (this.labelsInfo[t].isSelected = !1);
                this.toggleLabelNodes()
            },
            toggleEnv: function (t) {
                "PROD" != t && "TEST" != t || (this.labelsInfo.TESTENV.isSelected = "PROD" != t, this.labelsInfo.PRODENV.isSelected = "PROD" == t), this.toggleLabelNodes()
            },
            toggleNodeCheck: function (t) {
                var e = !0;
                if (t.isSelected) {
                    this.selectedCount++;
                    var i = !0,
                        n = !1,
                        r = void 0;
                    try {
                        for (var o, s = this.nodeList[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                            var l = o.value;
                            if (l.keyFilter && l.labelFilter && !l.isSelected) {
                                e = !1;
                                break
                            }
                        }
                    } catch (t) {
                        n = !0, r = t
                    } finally {
                        try {
                            !i && s.return && s.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    e && (this.isCheckAll = !0)
                } else this.selectedCount--, this.isCheckAll = !1
            },
            filterWithKey: function (t) {
                this.isCheckAll = !1, this.selectedCount = 0;
                var e = !0,
                    i = !1,
                    n = void 0;
                try {
                    for (var r, o = this.nodeList[Symbol.iterator](); !(e = (r = o.next()).done); e = !0) {
                        var s = r.value;
                        s.isSelected = !1, s.keyFilter = s.name.indexOf(t) !== -1
                    }
                } catch (t) {
                    i = !0, n = t
                } finally {
                    try {
                        !e && o.return && o.return()
                    } finally {
                        if (i) throw n
                    }
                }
            },
            checkAllNode: function (t) {
                this.isCheckAll = void 0 === t ? this.isCheckAll : t, this.selectedCount = 0;
                var e = !0,
                    i = !1,
                    n = void 0;
                try {
                    for (var r, o = this.nodeList[Symbol.iterator](); !(e = (r = o.next()).done); e = !0) {
                        var s = r.value;
                        s.keyFilter && s.labelFilter && this.isCheckAll ? (s.isSelected = !0, this.selectedCount++) : s.isSelected = !1
                    }
                } catch (t) {
                    i = !0, n = t
                } finally {
                    try {
                        !e && o.return && o.return()
                    } finally {
                        if (i) throw n
                    }
                }
            },
            toggleLabel: function (t, e) {
                if (this.labelsInfo[t]) {
                    if (void 0 !== e) {
                        if (this.labelsInfo[t].isSelected === e) return;
                        this.labelsInfo[t].isSelected = e
                    } else this.labelsInfo[t].isSelected = !this.labelsInfo[t].isSelected;
                    this.toggleLabelNodes()
                }
            },
            toggleLabelNodes: function () {
                var t = !1;
                if (this.isCheckAll = !1, this.selectedCount = 0, angular.forEach(this.labelsInfo, function (e) {
                        !t && e.isSelected && (t = !0)
                    }), t) {
                    var e = !0,
                        i = !1,
                        n = void 0;
                    try {
                        for (var r, o = this.nodeList[Symbol.iterator](); !(e = (r = o.next()).done); e = !0) {
                            var s = r.value,
                                l = !0;
                            s.isSelected = !1;
                            for (var a in this.labelsInfo)
                                if (this.labelsInfo.hasOwnProperty(a) && this.labelsInfo[a].isSelected && void 0 === s.labels[a]) {
                                    l = !1;
                                    break
                                }
                            s.labelFilter = l
                        }
                    } catch (t) {
                        i = !0, n = t
                    } finally {
                        try {
                            !e && o.return && o.return()
                        } finally {
                            if (i) throw n
                        }
                    }
                } else {
                    var c = !0,
                        u = !1,
                        f = void 0;
                    try {
                        for (var h, d = this.nodeList[Symbol.iterator](); !(c = (h = d.next()).done); c = !0) {
                            var g = h.value;
                            g.isSelected = !1, g.labelFilter = !0
                        }
                    } catch (t) {
                        u = !0, f = t
                    } finally {
                        try {
                            !c && d.return && d.return()
                        } finally {
                            if (u) throw f
                        }
                    }
                }
            },
            showHost: function () {
                var t = this;
                return i.open({
                    animation: !0,
                    templateUrl: "/index/tpl/modal/hostListModal/hostListModal.html",
                    controller: "HostListModalCtr",
                    size: "lg",
                    resolve: {
                        hostList: function () {
                            return t.nodeList
                        }
                    }
                }).result
            },
            getFormartSelectedLabels: function () {
                var t = [];
                return angular.forEach(this.labelsInfo, function (e, i) {
                    if (e.isSelected)
                        for (var n = 0, r = e.contents.length; n < r; n++) t.push({
                            name: i,
                            content: e.contents[n]
                        })
                }), t
            },
            getSelectedNodes: function () {
                var t = [],
                    e = !0,
                    i = !1,
                    n = void 0;
                try {
                    for (var r, o = this.nodeList[Symbol.iterator](); !(e = (r = o.next()).done); e = !0) {
                        var s = r.value;
                        s.isSelected && t.push(s.name)
                    }
                } catch (t) {
                    i = !0, n = t
                } finally {
                    try {
                        !e && o.return && o.return()
                    } finally {
                        if (i) throw n
                    }
                }
                return t
            }
        };
        var c = function (t) {
            this.etcdValid = !0, this.zookeeperValid = !0, this.kafkaValid = !0, this.config = {}, this.init(t)
        };
        c.prototype = {
            constructor: c,
            init: function (t) {
                var e = [],
                    i = void 0,
                    n = [],
                    r = void 0,
                    s = [],
                    l = void 0;
                if (o.isObject(t) || (t = {}), "string" == typeof t.etcd) {
                    i = t.etcd.split(",");
                    for (var a = 0, c = i.length; a < c; a++) "" !== i[a] && e.push({
                        name: i[a]
                    })
                }
                if (e.push({
                        name: ""
                    }), t.etcd = e, o.isObject(t.clusterLog) || (t.clusterLog = {}), "string" == typeof t.clusterLog.zookeeper) {
                    r = t.clusterLog.zookeeper.split(",");
                    for (var u = 0, f = r.length; u < f; u++) "" !== r[u] && n.push({
                        name: r[u]
                    })
                }
                if (n.push({
                        name: ""
                    }), t.clusterLog.zookeeper = n, "string" == typeof t.clusterLog.kafka) {
                    l = t.clusterLog.kafka.split(",");
                    for (var h = 0, d = l.length; h < d; h++) "" !== l[h] && s.push({
                        name: l[h]
                    })
                }
                s.push({
                    name: ""
                }), t.clusterLog.kafka = s, t.isHttps = void 0 !== t.api && 0 === t.api.indexOf("https://"), t.isHttps && (t.api = t.api.substring(8)), t.logConfig || (t.logConfig = 0), this.config = t
            },
            addEtcd: function () {
                this.config.etcd.push({
                    name: ""
                })
            },
            addKafka: function () {
                this.config.clusterLog.kafka.push({
                    name: ""
                })
            },
            addZookeeper: function () {
                this.config.clusterLog.zookeeper.push({
                    name: ""
                })
            },
            deleteArrItem: function (t, e) {
                this.config[t].splice(e, 1)
            },
            deleteLogArrItem: function (t, e) {
                this.config.clusterLog[t].splice(e, 1)
            },
            toggleUser: function (t) {
                "[object Object]" === Object.prototype.toString.call(t) && (this.config.ownerName = t.name)
            },
            toggleLogConfig: function () {
                this.config.logConfig = 1 === this.config.logConfig ? 0 : 1
            },
            validItem: function (t) {
                var e = !1;
                if ("etcd" != t && 0 === this.config.logConfig) e = !0;
                else
                    for (var i = "etcd" == t ? this.config.etcd : this.config.clusterLog[t] || [], n = 0, r = i.length; n < r; n++)
                        if (i[n].name && "" !== i[n].name) {
                            e = !0;
                            break
                        } switch (t) {
                    case "etcd":
                        this.etcdValid = e;
                        break;
                    case "zookeeper":
                        this.zookeeperValid = e;
                        break;
                    case "kafka":
                        this.kafkaValid = e
                }
                return e
            },
            modify: function () {
                return t.put("/api/cluster", angular.toJson(this._formartCluster()))
            },
            _formartCluster: function () {
                var t = angular.copy(this.config),
                    e = "",
                    i = "",
                    n = "",
                    r = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var l, a = t.etcd[Symbol.iterator](); !(r = (l = a.next()).done); r = !0) {
                        var c = l.value;
                        c.name && (e += c.name + ",")
                    }
                } catch (t) {
                    o = !0, s = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (o) throw s
                    }
                }
                if (t.etcd = e, 0 === t.logConfig) t.clusterLog = null;
                else {
                    var u = !0,
                        f = !1,
                        h = void 0;
                    try {
                        for (var d, g = t.clusterLog.zookeeper[Symbol.iterator](); !(u = (d = g.next()).done); u = !0) {
                            var v = d.value;
                            v.name && (i += v.name + ",")
                        }
                    } catch (t) {
                        f = !0, h = t
                    } finally {
                        try {
                            !u && g.return && g.return()
                        } finally {
                            if (f) throw h
                        }
                    }
                    t.clusterLog.zookeeper = i;
                    var p = !0,
                        b = !1,
                        y = void 0;
                    try {
                        for (var m, L = t.clusterLog.kafka[Symbol.iterator](); !(p = (m = L.next()).done); p = !0) {
                            var k = m.value;
                            k.name && (n += k.name + ",")
                        }
                    } catch (t) {
                        b = !0, y = t
                    } finally {
                        try {
                            !p && L.return && L.return()
                        } finally {
                            if (b) throw y
                        }
                    }
                    t.clusterLog.kafka = n
                }
                return t.isHttps ? t.api = "https://" + t.api : t.username = t.password = void 0, t.isHttps = void 0, t
            },
            _formartNewCluster: function (t) {
                var e = {};
                return e.clusterInfo = t, e
            },
            create: function () {
                var e = this._formartCluster(),
                    i = this._formartNewCluster(e);
                return t.post("/api/cluster", angular.toJson(i.clusterInfo))
            }
        };
        var u = function (t) {
            this.cluster = {}, this.clusterList = [], this.init(t)
        };
        return u.prototype = {
            init: function (t) {
                this.clusterList = t || []
            },
            toggleCluster: function (t) {
                this.cluster.id = this.clusterList[t].id, this.cluster.name = this.clusterList[t].name
            }
        }, {
            getInstance: r.instancesCreator({
                ClusterList: u,
                Cluster: c,
                NodeList: a,
                ClusterService: s,
                NodeService: l
            })
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (t, e) {
    void 0 !== t && t.factory("$domeMonitor", ["$http", "$q", "$util", "dialog", function (t, e, n, i) {
        var o = function () {
                return t.get("/api/global/monitor/info")
            },
            r = function (e) {
                return t.post("/api/monitor/target", angular.toJson(e))
            },
            a = function (e) {
                return t.get("/api/monitor/target/" + e)
            },
            u = function (e, n, i, o, r) {
                return t.get("/api/monitor/data/" + e + "?start=" + n + "&end=" + i + "&dataSpec=" + o + "&cid=" + r)
            },
            s = function (t, e, n) {
                var o = window.open("", "_blank"),
                    a = n.targetType;
                r(n).then(function (n) {
                    var r = n.data.result;
                    if (void 0 === r) return void i.error("警告", "请求错误！");
                    setTimeout(function () {
                        o.location = "/monitor/monitor.html?cid=" + t + "&cname=" + e + "&id=" + r + "&type=" + a
                    }, 0)
                })
            };
        return {
            getMonitorInfo: o,
            getMonitorStatistical: function (t, i, o, a) {
                function s(t, e, n) {
                    return "[object Null]" === Object.prototype.toString.call(t) || isNaN(t) ? "——" : (n || (n = ""), t = +t.toFixed(e), n && (t += n), t)
                }

                function c(t, e) {
                    return t = n.formartBytesData(t, e), "[object Null]" === Object.prototype.toString.call(t) || void 0 === t ? "——" : +t.toFixed(2)
                }
                var d = e.defer();
                return r({
                    clusterId: i,
                    targetType: t,
                    targetInfos: o
                }).then(function (t) {
                    return u(t.data.result, (new Date).getTime() - 3e5, (new Date).getTime(), "AVERAGE", i)
                }).then(function (e) {
                    function n(t, e, n, i) {
                        var o = t + "Data",
                            r = t + "Count";
                        angular.forEach(n, function (t, n) {
                            for (var a in t)
                                if (t.hasOwnProperty(a) && "timeStamp" !== a && f[a]) {
                                    var u;
                                    if (void 0 !== i && (u = "%" == i ? s(t[a], 2, i) : c(t[a], i)), f[a][o].push({
                                            item: n,
                                            value: u
                                        }), null === f[a][r] && !t[a]) continue;
                                    "MAX" == e ? t[a] > f[a][r] && (f[a][r] = t[a]) : "SUM" == e && (f[a][r] += t[a])
                                }
                        }), void 0 !== i && angular.forEach(f, function (t) {
                            t[r] = "%" == i ? s(t[r], 2) : c(t[r], i)
                        })
                    }
                    var i, o, r, u, l = e.data.result,
                        f = {},
                        p = {};
                    if ("node" == t) {
                        for (i = l.counterResults["cpu.busy"].slice(-3, -2)[0], o = l.counterResults["mem.memused.percent"].slice(-3, -2)[0], p = {
                                diskUsedMap: {},
                                diskReadMap: {},
                                diskWriteMap: {},
                                netInMap: {},
                                netOutMap: {}
                            }, r = 0, u = a.length; r < u; r++) f[a[r]] = {
                            diskUsedData: [],
                            diskUsedCount: 0,
                            diskReadData: [],
                            diskReadCount: 0,
                            diskWriteData: [],
                            diskWriteCount: 0,
                            netInData: [],
                            netInCount: 0,
                            netOutData: [],
                            netOutCount: 0,
                            cpuBusyCount: s(i[a[r]], 2),
                            memPercentCount: s(o[a[r]], 2)
                        };
                        angular.forEach(l.counterResults, function (t, e) {
                            var n = e.split("=")[1];
                            e.indexOf("df.bytes.used.percent") !== -1 ? p.diskUsedMap[n] = t.slice(-3, -2)[0] : e.indexOf("disk.io.read_bytes") !== -1 ? p.diskReadMap[n] = t.slice(-3, -2)[0] : e.indexOf("disk.io.write_bytes") !== -1 ? p.diskWriteMap[n] = t.slice(-3, -2)[0] : e.indexOf("net.if.in.bytes") !== -1 ? p.netInMap[n] = t.slice(-3, -2)[0] : e.indexOf("net.if.out.bytes") !== -1 && (p.netOutMap[n] = t.slice(-3, -2)[0])
                        }), n("diskUsed", "MAX", p.diskUsedMap, "%"), n("diskRead", "SUM", p.diskReadMap, "KB"), n("diskWrite", "SUM", p.diskWriteMap, "KB"), n("netIn", "SUM", p.netInMap, "KB"), n("netOut", "SUM", p.netOutMap, "KB")
                    } else if ("pod" == t || "container" == t)
                        for (i = l.counterResults["container.cpu.usage.busy"].slice(-3, -2)[0], o = l.counterResults["container.mem.usage.percent"].slice(-3, -2)[0], p = {
                                netIn: l.counterResults["container.net.if.in.bytes"].slice(-3, -2)[0],
                                netOut: l.counterResults["container.net.if.out.bytes"].slice(-3, -2)[0]
                            }, r = 0, u = a.length; r < u; r++) f[a[r]] = {
                            netInCount: c(p.netIn[a[r]], "KB"),
                            netOutCount: c(p.netOut[a[r]], "KB"),
                            cpuBusyCount: s(i[a[r]], 2),
                            memPercentCount: s(o[a[r]], 2)
                        };
                    d.resolve(f)
                }, function () {
                    d.reject()
                }), d.promise
            },
            storeMonitorTarget: r,
            getMonitorTarget: a,
            getMonitorData: u,
            toMonitorPage: s
        }
    }])
}(angular.module("domeApp"));
"use strict";

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var _get = function t(e, i, r) {
        null === e && (e = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(e, i);
        if (void 0 === o) {
            var n = Object.getPrototypeOf(e);
            return null === n ? void 0 : t(n, i, r)
        }
        if ("value" in o) return o.value;
        var s = o.get;
        if (void 0 !== s) return s.call(r)
    },
    _createClass = function () {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }
        return function (e, i, r) {
            return i && t(e.prototype, i), r && t(e, r), e
        }
    }();
! function (t, e) {
    void 0 !== t && t.factory("$domeAlarm", ["$domeModel", "$domeUser", "$domeDeploy", "$domeCluster", "$http", "$domePublic", "dialog", "$q", "$util", function (t, e, i, r, o, n, s, a, l) {
        var u = function () {
                t.ServiceModel.call(this, "/api/alarm/template")
            },
            c = function () {
                t.ServiceModel.call(this, "/api/alarm/hostgroup"), this.addHost = function (t, e) {
                    return o.post("/api/alarm/hostgroup/bind/" + t, angular.toJson(e))
                }, this.deleteHost = function (t, e) {
                    return o.delete("/api/alarm/hostgroup/bind/" + t + "/" + e)
                }
            },
            h = function () {
                t.ServiceModel.call(this, "/api/alarm/usergroup"), this.getUserGroup = function () {
                    return o.get("/api/alarm/usergroup")
                }, this.createUserGroup = function (t) {
                    return o.post("/api/alarm/usergroup", angular.toJson(t))
                }, this.bindUser = function (t, e) {
                    return o.post("/api/alarm/usergroup/bind/" + t, angular.toJson(e))
                }, this.deleteUserGroup = function (t) {
                    return o.delete("/api/alarm/usergroup/" + t)
                }, this.updateUserGroup = function (t) {
                    return o.put("/api/alarm/usergroup", angular.toJson(t))
                }, this.deleteSingleUser = function (t, e) {
                    return o.delete("/api/alarm/usergroup/bind/" + t + "/" + e)
                }
            },
            p = r.getInstance("ClusterService"),
            f = new u,
            g = {
                metric: {
                    cpu_percent: {
                        text: "CPU占用率",
                        unit: "%",
                        belong: "all"
                    },
                    memory_percent: {
                        text: "内存占用率",
                        unit: "%",
                        belong: "all"
                    },
                    disk_percent: {
                        text: "磁盘占用率",
                        tagName: "分区",
                        unit: "%",
                        belong: "host"
                    },
                    disk_read: {
                        text: "磁盘读取",
                        tagName: "设备",
                        unit: "KB/s",
                        belong: "host"
                    },
                    disk_write: {
                        text: "磁盘写入",
                        tagName: "设备",
                        unit: "KB/s",
                        belong: "host"
                    },
                    network_in: {
                        text: "网络流入",
                        tagName: "网卡",
                        unit: "KB/s",
                        belong: "all"
                    },
                    network_out: {
                        text: "网络流出",
                        tagName: "网卡",
                        unit: "KB/s",
                        belong: "all"
                    },
                    agent_alive: {
                        text: "agent存活",
                        belong: "host"
                    }
                },
                aggregateType: {
                    avg: "平均值",
                    max: "最大值",
                    min: "最小值",
                    sum: "和值"
                },
                aggregateTypeAgent: {
                    max: "全部",
                    min: "至少一次"
                }
            },
            d = function () {
                function t(e) {
                    _classCallCheck(this, t), this.config = {}, this.hostGroupList = [], this.keyMaps = g, this.groupList = [], this.deployListIns = i.getInstance("DeployList"), this.loadingIns = n.getLoadingInstance(), this.clusterList = [], this.init(e)
                }
                return _createClass(t, [{
                    key: "init",
                    value: function (t) {
                        l.isObject(t) || (t = {
                            templateType: "host"
                        }), l.isObject(t.deploymentInfo) || (t.deploymentInfo = {}), l.isArray(t.strategyList) || (t.strategyList = []), l.isObject(t.callback) || (t.callback = {}), l.isArray(t.hostGroupList) || (t.hostGroupList = []);
                        var e = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var o, n = t.strategyList[Symbol.iterator](); !(e = (o = n.next()).done); e = !0) {
                                var s = o.value;
                                "disk_percent" == s.metric ? s.tag = s.tag.substring(6) : s.metric.indexOf("disk") !== -1 ? s.tag = s.tag.substring(7) : s.metric.indexOf("network") !== -1 && (s.tag = s.tag.substring(6))
                            }
                        } catch (t) {
                            i = !0, r = t
                        } finally {
                            try {
                                !e && n.return && n.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        this.config = t, void 0 === this.config.id && (this.config.deploymentInfo.hostEnv || (this.config.deploymentInfo.hostEnv = "PROD"), this.addStrategy())
                    }
                }, {
                    key: "initHostGroupList",
                    value: function () {
                        var t = this,
                            e = void 0,
                            i = function () {
                                var e = t.config.hostGroupList,
                                    i = void 0;
                                if (e && 0 === e.length) {
                                    var r = !0,
                                        o = !1,
                                        n = void 0;
                                    try {
                                        for (var s, a = t.hostGroupList[Symbol.iterator](); !(r = (s = a.next()).done); r = !0) {
                                            s.value.isSelected = !1
                                        }
                                    } catch (t) {
                                        o = !0, n = t
                                    } finally {
                                        try {
                                            !r && a.return && a.return()
                                        } finally {
                                            if (o) throw n
                                        }
                                    }
                                } else
                                    for (var l = 0, u = t.hostGroupList.length; l < u; l++) {
                                        i = !1;
                                        for (var c = 0, h = e.length; c < h; c++)
                                            if (e[c].id === t.hostGroupList[l].id) {
                                                i = !0;
                                                break
                                            }
                                        t.hostGroupList[l].isSelected = i
                                    }
                            };
                        0 === this.hostGroupList.length ? (this.loadingIns.startLoading("hostgroup"), e = new c, e.getData().then(function (e) {
                            t.hostGroupList = e.data.result || [], i()
                        }, function () {
                            s.error("警告", "获取主机组信息失败！")
                        }).finally(function () {
                            t.loadingIns.finishLoading("hostgroup")
                        })) : i()
                    }
                }, {
                    key: "initGroupList",
                    value: function () {
                        var t = this,
                            e = this.config.userGroupList,
                            i = function () {
                                var i = void 0;
                                if (e && 0 !== e.length)
                                    for (var r = 0, o = t.groupList.length; r < o; r++) {
                                        i = !1;
                                        for (var n = 0, s = e.length; n < s; n++)
                                            if (t.groupList[r].id === e[n].id) {
                                                i = !0;
                                                break
                                            }
                                        t.groupList[r].isSelected = i
                                    } else
                                        for (var a = 0, l = t.groupList.length; a < l; a++) t.groupList[a].isSelected = !1
                            };
                        0 === this.groupList.length ? (this.loadingIns.startLoading("groupList"), o.get("/api/alarm/usergroup").then(function (e) {
                            t.groupList = e.data.result || [], i()
                        }, function () {
                            s.error("警告", "获取组信息失败！")
                        }).finally(function () {
                            t.loadingIns.finishLoading("groupList")
                        })) : i()
                    }
                }, {
                    key: "initDeployAndClusterList",
                    value: function () {
                        var t = this,
                            e = this.config.deploymentInfo;
                        0 === this.deployListIns.deployList.length ? (this.loadingIns.startLoading("deploy"), a.all([i.deployService.getList(), p.getData()]).then(function (i) {
                            t.deployListIns.init(i[0].data.result), t.clusterList = i[1].data.result || [], e.clusterName ? (t.toggleHostEnv(e.hostEnv), t.deployListIns.deploy.id = e.id, t.deployListIns.deploy.name = e.deploymentName) : (e.clusterName = t.clusterList[0].name, t.toggleCluster(t.clusterList[0].name))
                        }, function () {
                            s.error("警告", "获取信息失败！")
                        }).finally(function () {
                            t.loadingIns.finishLoading("deploy")
                        })) : (this.toggleHostEnv(e.hostEnv), this.deployListIns.deploy.id = e.id, this.deployListIns.deploy.name = e.deploymentName)
                    }
                }, {
                    key: "toggleTemplateType",
                    value: function (t) {
                        t !== this.config.templateType && (this.config.templateType = t, this.config.strategyList = [], this.addStrategy())
                    }
                }, {
                    key: "addStrategy",
                    value: function () {
                        this.config.strategyList.push({
                            metric: "cpu_percent",
                            tag: "",
                            pointNum: 3,
                            aggregateType: "avg",
                            operator: ">=",
                            rightValue: null,
                            note: "",
                            maxStep: 3
                        })
                    }
                }, {
                    key: "deleteStrategy",
                    value: function (t) {
                        this.config.strategyList.splice(t, 1)
                    }
                }, {
                    key: "toggleStrategyMetric",
                    value: function (t, e) {
                        var i = this.config.strategyList[t];
                        i.metric !== e && ("agent_alive" === e && (i.aggregateType = "max"), i.metric = e, i.tag = "")
                    }
                }, {
                    key: "toggleHostEnv",
                    value: function (t) {
                        this.config.deploymentInfo.hostEnv = t, this.deployListIns.filterDeploy(this.config.deploymentInfo.clusterName, t)
                    }
                }, {
                    key: "toggleCluster",
                    value: function (t) {
                        this.config.deploymentInfo.clusterName = t, this.deployListIns.filterDeploy(t, this.config.deploymentInfo.hostEnv)
                    }
                }, {
                    key: "getFormartConfig",
                    value: function () {
                        var t = {};
                        if (t.templateName = this.config.templateName, t.templateType = this.config.templateType, t.id = this.config.id, "host" == t.templateType) {
                            t.templateType = this.config.templateType, t.hostGroupList = [];
                            for (var e = 0, i = this.hostGroupList.length; e < i; e++) this.hostGroupList[e].isSelected && t.hostGroupList.push({
                                id: this.hostGroupList[e].id
                            })
                        } else "deploy" == t.templateType && (t.deploymentInfo = {
                            id: this.deployListIns.deploy.id,
                            clusterName: this.config.deploymentInfo.clusterName,
                            deploymentName: this.deployListIns.deploy.name,
                            hostEnv: this.config.deploymentInfo.hostEnv
                        });
                        t.strategyList = [];
                        var r = !0,
                            o = !1,
                            n = void 0;
                        try {
                            for (var s, a = this.config.strategyList[Symbol.iterator](); !(r = (s = a.next()).done); r = !0) {
                                var l = s.value,
                                    u = angular.copy(l);
                                "agent_alive" == u.metric && (u.rightValue = 1, u.operator = "<"), u.tag && ("disk_percent" == u.metric ? u.tag = "mount=" + u.tag : u.metric.indexOf("disk") !== -1 ? u.tag = "device=" + u.tag : u.metric.indexOf("network") !== -1 && (u.tag = "iface=" + u.tag)), t.strategyList.push(u)
                            }
                        } catch (t) {
                            o = !0, n = t
                        } finally {
                            try {
                                !r && a.return && a.return()
                            } finally {
                                if (o) throw n
                            }
                        }
                        t.userGroupList = [];
                        for (var c = 0, h = this.groupList.length; c < h; c++) this.groupList[c].isSelected && t.userGroupList.push({
                            id: this.groupList[c].id
                        });
                        return t.callback = angular.copy(this.config.callback), console.log(t), t
                    }
                }, {
                    key: "create",
                    value: function () {
                        return f.setData(this.getFormartConfig())
                    }
                }, {
                    key: "modify",
                    value: function () {
                        return f.updateData(this.getFormartConfig())
                    }
                }]), t
            }(),
            y = function (t) {
                function e(t, i) {
                    _classCallCheck(this, e);
                    var r = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, "nodeList"));
                    return r.selectedList = [], r.init(t, i), r
                }
                return _inherits(e, t), _createClass(e, [{
                    key: "init",
                    value: function (t, i) {
                        if (t || (t = this.nodeList), i || (i = this.clusterName), t && i) {
                            this.clusterName = i;
                            var r = !0,
                                o = !1,
                                n = void 0;
                            try {
                                for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done); r = !0) {
                                    var l = s.value,
                                        u = !0,
                                        c = !1,
                                        h = void 0;
                                    try {
                                        for (var p, f = this.selectedList[Symbol.iterator](); !(u = (p = f.next()).done); u = !0) {
                                            var g = p.value;
                                            if (g.cluster === i && g.name === l.name) {
                                                l.isSelected = !0;
                                                break
                                            }
                                        }
                                    } catch (t) {
                                        c = !0, h = t
                                    } finally {
                                        try {
                                            !u && f.return && f.return()
                                        } finally {
                                            if (c) throw h
                                        }
                                    }
                                    l.isSelected || (l.isSelected = !1)
                                }
                            } catch (t) {
                                o = !0, n = t
                            } finally {
                                try {
                                    !r && a.return && a.return()
                                } finally {
                                    if (o) throw n
                                }
                            }
                            _get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "init", this).call(this, t)
                        }
                    }
                }, {
                    key: "initSelectedList",
                    value: function () {
                        this.selectedList = [], this.checkAllItem(!1)
                    }
                }, {
                    key: "checkAllItem",
                    value: function (t) {
                        if (_get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "checkAllItem", this).call(this, t), t) {
                            var i = !0,
                                r = !1,
                                o = void 0;
                            try {
                                for (var n, s = this.nodeList[Symbol.iterator](); !(i = (n = s.next()).done); i = !0) {
                                    var a = n.value;
                                    if (a.isSelected) {
                                        var l = !1,
                                            u = !0,
                                            c = !1,
                                            h = void 0;
                                        try {
                                            for (var p, f = this.selectedList[Symbol.iterator](); !(u = (p = f.next()).done); u = !0) {
                                                var g = p.value;
                                                if (this.clusterName === g.cluster && a.name === g.name) {
                                                    l = !0;
                                                    break
                                                }
                                            }
                                        } catch (t) {
                                            c = !0, h = t
                                        } finally {
                                            try {
                                                !u && f.return && f.return()
                                            } finally {
                                                if (c) throw h
                                            }
                                        }
                                        l || this.selectedList.push({
                                            name: a.name,
                                            ip: a.ip,
                                            cluster: this.clusterName
                                        })
                                    }
                                }
                            } catch (t) {
                                r = !0, o = t
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw o
                                }
                            }
                        } else {
                            var d = !0,
                                y = !1,
                                m = void 0;
                            try {
                                for (var v, L = this.nodeList[Symbol.iterator](); !(d = (v = L.next()).done); d = !0)
                                    for (var b = v.value, k = 0; k < this.selectedList.length; k++) {
                                        var _ = this.selectedList[k];
                                        if (this.clusterName === _.cluster && b.name === _.name) {
                                            this.selectedList.splice(k, 1), k--;
                                            break
                                        }
                                    }
                            } catch (t) {
                                y = !0, m = t
                            } finally {
                                try {
                                    !d && L.return && L.return()
                                } finally {
                                    if (y) throw m
                                }
                            }
                        }
                    }
                }, {
                    key: "toggleCheck",
                    value: function (t, i) {
                        if (_get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "toggleCheck", this).call(this, t, i), i) t.cluster = this.clusterName, this.selectedList.push({
                            name: t.name,
                            ip: t.ip,
                            cluster: t.cluster
                        });
                        else
                            for (var r = 0; r < this.selectedList.length; r++)
                                if (this.selectedList[r].name === t.name && this.selectedList[r].cluster === this.clusterName) {
                                    this.selectedList.splice(r, 1);
                                    break
                                }
                    }
                }, {
                    key: "deleteSelectedNode",
                    value: function (t) {
                        if (t.cluster === this.clusterName) {
                            var i = !0,
                                r = !1,
                                o = void 0;
                            try {
                                for (var n, s = this.nodeList[Symbol.iterator](); !(i = (n = s.next()).done); i = !0) {
                                    var a = n.value;
                                    if (a.name === t.name) {
                                        _get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "toggleCheck", this).call(this, a, !1);
                                        break
                                    }
                                }
                            } catch (t) {
                                r = !0, o = t
                            } finally {
                                try {
                                    !i && s.return && s.return()
                                } finally {
                                    if (r) throw o
                                }
                            }
                        }
                        for (var l = 0; l < this.selectedList.length; l++)
                            if (this.selectedList[l].name === t.name && this.selectedList[l].cluster === t.cluster) {
                                this.selectedList.splice(l, 1);
                                break
                            }
                    }
                }, {
                    key: "filterWithKey",
                    value: function (t) {
                        this.selectedCount = 0, this.isCheckAll = !0;
                        var e = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var o, n = this.nodeList[Symbol.iterator](); !(e = (o = n.next()).done); e = !0) {
                                var s = o.value;
                                if (s.keyFilter = s.name.indexOf(t) !== -1, s.keyFilter) {
                                    var a = !0,
                                        l = !1,
                                        u = void 0;
                                    try {
                                        for (var c, h = this.selectedList[Symbol.iterator](); !(a = (c = h.next()).done); a = !0) {
                                            var p = c.value;
                                            if (p.name === s.name && p.cluster === this.clusterName) {
                                                s.isSelected = !0, this.selectedCount++;
                                                break
                                            }
                                        }
                                    } catch (t) {
                                        l = !0, u = t
                                    } finally {
                                        try {
                                            !a && h.return && h.return()
                                        } finally {
                                            if (l) throw u
                                        }
                                    }
                                    s.isSelected || (s.isSelected = !1, this.isCheckAll && (this.isCheckAll = !1))
                                } else s.isSelected = !1
                            }
                        } catch (t) {
                            i = !0, r = t
                        } finally {
                            try {
                                !e && n.return && n.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        0 === this.selectedCount && (this.isCheckAll = !1)
                    }
                }]), e
            }(t.SelectListModel);
        return {
            getInstance: t.instancesCreator({
                NodeList: y,
                AlarmService: u,
                HostGroupService: c,
                AlarmTemplate: d,
                UserGroupService: h
            }),
            alarmEventService: {
                getData: function () {
                    return o.get("/api/alarm/event")
                },
                ignore: function (t) {
                    return o.post("/api/alarm/event/ignore", t)
                }
            },
            keyMaps: g
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (e, t) {
    void 0 !== e && e.directive("creatorSelection", ["$domeUser", function (e) {
        var t = [];
        return t.push('  <div class="com-creator-selection">'), t.push('       <div select-con="select-con" class="com-select-con role-select">'), t.push("      <button ng-cloak=\"ng-cloak\" class=\"ui-btn ui-btn-white ui-btn-select\">{{userType=='USER'?'个人':'组'}}<i class=\"icon-down\"></i></button>"), t.push('      <ul class="select-list">'), t.push('        <li class="select-item"><a ng-click="toggleUserType(\'USER\')">个人</a></li>'), t.push('        <li class="select-item"><a ng-click="toggleUserType(\'GROUP\')">组</a></li>'), t.push("      </ul>"), t.push("    </div>"), t.push("    <em ng-show=\"userType=='USER'\" ng-bind=\"'当前用户：'+currentUser.name\"></em>"), t.push('    <div select-con="select-con" class="com-select-con group-select" ng-show="userType==\'GROUP\'">'), t.push('      <button class="ui-btn ui-btn-white ui-btn-select" ng-cloak>{{currentGroup.name}}<i class="icon-down"></i></button>'), t.push('      <ul class="select-list">'), t.push('        <li ng-if="roleList.length===0" class="select-item"><a>无组信息</a></li>'), t.push('        <li ng-repeat="group in roleList" class="select-item"><a ng-bind="group.name" ng-click="toggleGroup(group)"></a></li>'), t.push("      </ul>"), t.push("    </div>"), t.push("  </div>"), {
            restrict: "AE",
            template: t.join(""),
            replace: !0,
            scope: {
                defaultUserType: "@",
                defaultUserId: "=",
                changeEvent: "&"
            },
            link: function (t, s, n) {
                t.userType = t.defaultUserType || "USER", t.currentGroup = {}, t.currentUser = {}, t.toggleGroup = function (e) {
                    t.currentGroup = e, t.changeEvent({
                        user: e
                    })
                }, t.toggleUserType = function (e) {
                    t.userType = e, "USER" == e ? t.changeEvent({
                        user: t.currentUser
                    }) : t.changeEvent({
                        user: t.currentGroup
                    })
                }, e.userService.getGroupList().then(function (e) {
                    t.roleList = e.data.result || [];
                    for (var s = 0; s < t.roleList.length; s++) t.defaultUserId && t.defaultUserType && t.defaultUserId === t.roleList[s].id && t.defaultUserType === t.roleList[s].type && "GROUP" == t.defaultUserType && (t.currentGroup = t.roleList[s], t.toggleGroup(t.roleList[s])), "USER" === t.roleList[s].type && (t.currentUser = t.roleList[s], t.roleList.splice(s, 1), s--);
                    t.currentGroup.id || t.toggleGroup(t.roleList[0]), t.toggleUserType(t.userType)
                })
            }
        }
    }]).directive("listScroll", ["$window", "$document", function (e, t) {
        return {
            restrict: "A",
            template: '<div class="com-tabset-scroll"><div class="list-back"><ul class="com-list-tab list-scroll" style="display:inline-block;padding-left:0;" ng-transclude></ul></div></div>',
            replace: !0,
            transclude: !0,
            link: function (s, n, i) {
                var l = angular.element(e),
                    o = angular.element(t),
                    a = n.find("ul"),
                    c = n.find(".nav-option"),
                    u = n.find(".icon-next"),
                    p = n.find(".icon-last"),
                    r = 0,
                    d = 1,
                    h = 0,
                    f = parseInt(i.widthOffset || 0);
                u.bind("click", function () {
                    d <= 1 || r === d - 1 || a.stop().animate({
                        marginLeft: (h - 48) * - ++r
                    }, 600)
                }), p.bind("click", function () {
                    0 !== r && (--r, a.stop().animate({
                        marginLeft: (h - 48) * -r
                    }, 600))
                }), s.safeApply = function (e) {
                    var t = this.$root.$$phase;
                    "$apply" == t || "$digest" == t ? e && "function" == typeof e && e() : this.$apply(e)
                }, s.$on("changeScrollList", function () {
                    s.fresh()
                }), s.fresh = function () {
                    setTimeout(function () {
                        s.safeApply()
                    }, 100)
                }, s.$watch(function () {
                    return {
                        windowWidth: l.width(),
                        listWidth: a.width()
                    }
                }, function (e, t) {
                    1 === n.find("li").length ? n.height(0) : n.height("auto"), h = o.width() - f, d = Math.ceil(e.listWidth / (h - 48)), r + 1 > d && p.trigger("click"), d <= 1 ? c.hide() : c.show(), n.css("max-width", (h > e.listWidth ? e.listWidth + 15 : h) + "px"), t.windowWidth !== e.windowWidth && (r = 0, a.css("margin-left", 0))
                }, !0), l.bind("resize", function () {
                    s.$apply()
                })
            }
        }
    }]).directive("selectInput", function () {
        var e = [];
        return e.push('       <div><div select-con label="true" class="com-select-con">'), e.push('        <ul class="selected-labels">'), e.push('          <li ng-repeat="item in selectedList=(optionList|filter:{isSelected:true})" ng-cloak="ng-cloak" class="select-label"><a ng-click="toggleSelect(item);itemClick()" class="icon-cancel"></a>{{item[showKey]}}</li>'), e.push('          <li class="select-input">'), e.push('            <input placeholder="{{placeholder}}" ng-model="keywords.key" ng-keydown="keyDown($event,selectedList,optionListFiltered[0])" class="ui-btn-select"/>'), e.push("          </li>"), e.push("        </ul>"), e.push('        <ul class="select-list">'), e.push('          <li ng-show="optionListFiltered.length===0" class="select-item"><a>无相关信息</a></li>'), e.push('          <li ng-repeat="item in optionListFiltered=(optionList|dynamicKey:showKey:keywords.key|filter:{isSelected:false})" class="select-item" select-input-item ><a ng-click="toggleSelect(item);itemClick()"></a></li>'), e.push("        </ul>"), e.push("      </div></div>"), {
            restrict: "AE",
            template: e.join(""),
            replace: !0,
            scope: {
                showKey: "@",
                optionList: "=",
                placeholder: "@dPlaceholder",
                itemClick: "&dClick"
            },
            transclude: !0,
            controller: ["$scope", "$transclude", function (e, t) {
                this.renderItem = t
            }],
            link: function (e) {
                e.optionList || (e.optionList = []), e.keywords = {
                    key: ""
                }, e.toggleSelect = function (e) {
                    e.isSelected = !e.isSelected
                }, e.keyDown = function (t, s, n) {
                    !e.keywords.key && 8 == t.keyCode && s.length > 0 ? e.toggleSelect(s[s.length - 1]) : 13 == t.keyCode && n && e.toggleSelect(n)
                }
            }
        }
    }).directive("selectInputItem", function () {
        return {
            require: "^selectInput",
            link: function (e, t, s, n) {
                n.renderItem(e, function (e) {
                    t.find("a").append(e)
                })
            }
        }
    }).directive("domeToggle", function () {
        return {
            restrict: "AE",
            template: '<button class="ui-toggle old-button"></button>',
            replace: !0
        }
    }).directive("loglist", ["$util", "$domeProject", "$filter", function (e, t, s) {
        return {
            restrict: "AE",
            template: "<div ng-transclude></div>",
            transclude: !0,
            link: function (n, i) {
                n.currentIndex = -1;
                var l = function (t) {
                        var i = n.buildList[t],
                            l = [];
                        if (l.push('<tr class="log-detail">'), l.push('   <td colspan="8">'), l.push('       <ul class="detail-list">'), l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">镜像大小</span>'), l.push('               <span class="detail-content">' + i.imageInfo.imageSize + "MB</span>"), l.push("           </li>"), "Success" == i.state && (l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">拉取命令</span>'), l.push('               <span class="detail-content">'), l.push('                   <input id="input' + t + '" class="cmd-txt ui-input-white" readonly="true" value="docker pull ' + i.imageInfo.registry + "/" + i.imageInfo.imageName + ":" + i.imageInfo.imageTag + '"/><a class="link-safe link-copy" id="btn' + t + '" data-clipboard-target="#input' + t + '" data-text="docker pull ' + i.imageInfo.registry + "/" + i.imageInfo.imageName + ":" + i.imageInfo.imageTag + '">复制</a>'), l.push('                   <p class="cmd-prompt"> 拉取镜像前请登录：docker login domeos.io</p>'), l.push("               </span>"), l.push("           </li>")), i.codeInfo && i.commitInfo) {
                            l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">Branch名称</span>'), l.push('               <span class="detail-content">' + i.codeInfo.codeBranch + "</span>"), l.push("           </li>"), l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">author</span>'), l.push('               <span class="detail-content">' + (null != i.commitInfo.authorName ? i.commitInfo.authorName : "无") + "</span>"), l.push("           </li>"), l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">author email</span>'), l.push('               <span class="detail-content">' + (null != i.commitInfo.authorEmail ? i.commitInfo.authorEmail : "无") + "</span>"), l.push("           </li>"), l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">commit time</span>'), l.push('               <span class="detail-content">' + s("day")(i.commitInfo.createdAt) + "</span>"), l.push("           </li>"), l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">commit info</span>'), l.push('               <span class="detail-content">' + i.commitInfo.message + "</span>"), l.push("           </li>")
                        }
                        return l.push('           <li class="detail-row">'), l.push('               <span class="detail-title">Dockerfile</span>'), l.push('               <span id="dockerfile" class="detail-content">加载中……</span>'), l.push("           </li>"), l.push("       </ul>"), l.push("   </td>"), l.push("</tr>"), e.parseTpl(l.join(""), n.buildList[t])
                    },
                    o = null;
                n.showDetail = function (e) {
                    null != o && o.destroy(), o = new Clipboard(".link-copy"), e != n.currentIndex ? (i.find(".log-detail").remove(), i.find("tr:eq(" + e + ")").after(l(e)), o.on("error", function (e) {
                        console.error("Action:", e.action), console.error("Trigger:", e.trigger)
                    }), t.projectService.getBuildDockerfile(n.buildList[e].projectId, n.buildList[e].id).then(function (e) {
                        var t = e.data.result;
                        t ? (t = t.replace(/[\n\r]/g, "<br/>"), i.find("#dockerfile").html(t)) : i.find("#dockerfile").html("无")
                    }), n.currentIndex = e) : (0 !== i.find(".log-detail").length && i.find(".log-detail").remove(), n.currentIndex = -1)
                }, n.isNull = function (e) {
                    var t = e;
                    return e || (t = "无"), t
                }, n.$on("$destroy", function (e) {
                    null != o && o.destroy()
                })
            }
        }
    }]).directive("btnCopy", ["$util", function (e) {
        return {
            restrict: "A",
            scope: {
                btnCopy: "="
            },
            link: function (t, s) {
                e.loadJs("/lib/js/jquery.zclip.js").then(function () {
                    s.zclip({
                        path: "/lib/media/ZeroClipboard.swf",
                        copy: function () {
                            return t.btnCopy
                        }
                    })
                })
            }
        }
    }]).directive("mirrorCollapse", function () {
        return {
            restrict: "A",
            link: function (e) {
                e.isCollapse = !0, e.toggleCollapse = function () {
                    e.isCollapse = !e.isCollapse
                }
            }
        }
    }).directive("listNo", function () {
        return {
            restrict: "AE",
            scope: {
                listLen: "=length",
                pageno: "=",
                size: "@"
            },
            link: function (e, t) {
                var s, n, i;
                e.$watch(function () {
                    return e.listLen
                }, function (l) {
                    if (n = [], l) {
                        for (s = Math.ceil(l / parseInt(e.size)), n.push('<span class="pageno last"><i class="icon-last"></i></span>'), n.push('<span class="pageno turn on">1</span>'), i = 2; i <= s; i++) n.push('<span class="pageno turn">' + i + "</span>");
                        n.push('<span class="pageno next"><i class="icon-next"></i></span>'), t.html(n.join(""))
                    }
                }), t.delegate(".pageno", "click", function () {
                    var t = angular.element(this);
                    t.hasClass("turn") ? (e.pageno = angular.element(this).html(), angular.element(".pageno.on").removeClass("on"), t.addClass("on")) : t.hasClass("last") ? 1 !== e.pageno && "1" !== e.pageno && (e.pageno = parseInt(e.pageno) - 1, angular.element(".pageno.on").removeClass("on").prev(".pageno").addClass("on")) : t.hasClass("next") && e.pageno < s && parseInt(e.pageno) < s && (e.pageno = parseInt(e.pageno) + 1, angular.element(".pageno.on").removeClass("on").next(".pageno").addClass("on")), angular.element(".current-page").html(e.pageno), e.$apply()
                })
            }
        }
    }).directive("fileCollapse", function () {
        return {
            restrict: "A",
            link: function (e) {
                e.showFile = !1, e.showContent = !1, e.toggleFile = function () {
                    e.showFile = !0
                }, e.toggleContent = function () {
                    e.showContent = !e.showContent, e.showFile = !0, e.showContent || "" !== e.fileInfo.fileName || "" !== e.fileInfo.filePath || (e.showFile = !1)
                }
            }
        }
    }).directive("customlist", ["$util", "$domeProject", "$domeImage", function (e, t, s) {
        return {
            restrict: "AE",
            template: "<div ng-transclude></div>",
            transclude: !0,
            link: function (t, n) {
                var i = !1;
                t.currentIndex = -1;
                var l = function () {
                    var s = [],
                        n = 0 === t.customDetailInfo.autoCustom ? "Dockerfile" : "配置文件",
                        i = 0 === t.customDetailInfo.publish ? "否" : "是";
                    if (s.push('<tr class="custom-detail">'), s.push('   <td colspan="9" class="td-detail">'), s.push('       <ul class="com-list-info detail-list">'), s.push("           <li>"), s.push('               <span class="info-name">定制详情</span>'), s.push('               <span class="info-simple">' + n + "</span>"), s.push("           </li>"), "Success" == t.customDetailInfo.state && (s.push("           <li>"), s.push('               <span class="info-name">镜像大小</span>'), s.push('               <span class="info-simple">{#imageSize}MB</span>'), s.push("           </li>"), s.push("           <li>"), s.push('               <span class="info-name">拉取命令</span>'), s.push('               <div class="info-content cmd-wrap">'), s.push('                   <input class="ui-input-fill" disabled="true" value="docker pull {#registry}/{#imageName}:{#imageTag}"/><button class="ui-btn ui-btn-sm ui-btn-active link-copy" data-text="docker pull {#registry}/{#imageName}:{#imageTag}">复制</button>'), s.push('                   <p class="txt-prompt"> 拉取镜像前请登录：docker login domeos.io</p>'), s.push("               </div>"), s.push("           </li>")), 1 === t.customDetailInfo.autoCustom) {
                        s.push("           <li>"), s.push('               <span class="info-name">环境变量</span>');
                        var l = t.customDetailInfo.envSettings,
                            o = l.length;
                        if (0 === o) s.push('               <span class="info-simple">无</span>');
                        else {
                            s.push('               <div class="info-content">'), s.push('                   <table class="ui-table-primary">'), s.push("                       <tr>"), s.push("                           <td>名称</td>"), s.push("                           <td>值</td>"), s.push("                           <td>描述</td>"), s.push("                       </tr>");
                            for (var a = 0; a < o; a++) s.push("                       <tr>"), s.push("                           <td>" + l[a].key + "</td>"), s.push("                           <td>" + l[a].value + "</td>"), s.push("                           <td>" + l[a].description + "</td>"), s.push("                       </tr>");
                            s.push("                   </table>"), s.push("               </div>")
                        }
                        s.push("           </li>")
                    }
                    if (s.push("           <li>"), s.push('               <span class="info-name">定制镜像是否作为基础镜像</span>'), s.push('               <span class="info-simple">' + i + "</span>"), s.push("           </li>"), s.push("           <li>"), s.push('               <span class="info-name">定制镜像描述</span>'), null === t.customDetailInfo.description || "" === t.customDetailInfo.description ? s.push('               <span class="info-simple">无</span>') : s.push('               <span class="info-simple">{#description}</span>'), s.push("           </li>"), s.push("           <li>"), s.push('               <span class="info-name">Dockerfile</span>'), null === t.customDetailInfo.dockerfileContent || "" === t.customDetailInfo.dockerfileContent ? s.push('               <span class="info-simple">无</span>') : (s.push('               <div class="info-content">'), s.push('                   <textarea readonly="true" class="ui-input-fill file-txt">{#dockerfileContent}</textarea>'), s.push("               </div>")), s.push("           </li>"), 1 === t.customDetailInfo.autoCustom && t.customDetailInfo.files) {
                        s.push("           <li>"), s.push('               <span class="info-name">配置文件</span>');
                        var c = t.customDetailInfo.files,
                            u = c.length;
                        if (u && 0 !== u) {
                            s.push('               <div class="info-content">');
                            for (var p = 0; p < u; p++) s.push('                   <div class="line-long">'), s.push('                       <p class="con-num">' + (p + 1) + "</p>"), s.push('                       <span class="config-title">名称:' + c[p].fileName + "</span>"), s.push('                       <span class="config-title">容器内路径:' + c[p].filePath + "</span>"), s.push("                   </div>"), s.push('                   <textarea readonly="true" class="ui-input-fill file-txt">' + c[p].content + "</textarea>");
                            s.push("               </div>")
                        } else s.push('                   <span class="info-simple">无</span>');
                        s.push("           </li>")
                    }
                    return s.push("           <li>"), s.push('               <button class="ui-btn ui-btn-none btn-pack" >收起<i class="icon-down top"></i></button>'), s.push("           </li>"), s.push("       </ul>"), s.push("   </td>"), s.push("</tr>"), e.parseTpl(s.join(""), t.customDetailInfo)
                };
                e.loadJs("/lib/js/jquery.zclip.js").then(function () {
                    i = !0
                });
                var o = function () {
                        n.find(".link-copy").zclip({
                            path: "/lib/media/ZeroClipboard.swf",
                            copy: function () {
                                return angular.element(this).data("text")
                            }
                        })
                    },
                    a = function () {
                        n.find(".btn-pack").click(function () {
                            t.$apply(function () {
                                t.currentIndex = -1, n.find(".custom-detail").remove()
                            })
                        })
                    };
                t.showDetail = function (c, u) {
                    c !== t.currentIndex ? (s.imageService.getCustomImageInfo(u).then(function (s) {
                        t.customDetailInfo = s.data.result || {}, n.find(".custom-detail").remove(), n.find("tr:eq(" + c + ")").after(l()), a(), i ? o() : e.loadJs("/lib/js/jquery.zclip.js").then(function () {
                            i = !0, o()
                        })
                    }), t.currentIndex = c) : (0 !== n.find(".custom-detail").length && n.find(".custom-detail").remove(), t.currentIndex = -1)
                }
            }
        }
    }]).directive("hoverablePopover", ["$rootScope", "$timeout", function (e, t) {
        return {
            restrict: "AE",
            scope: {
                content: "=",
                placeholder: "@"
            },
            link: function (s, n) {
                e.insidePopover = !1, n.popover({
                    content: s.content,
                    placement: s.placeholder || "top",
                    html: !0
                }), n.on("mouseenter", function () {
                    e.insidePopover || n.popover("show")
                }), n.on("mouseleave", function () {
                    null !== n.context.nextElementSibling && t(function () {
                        n.context.nextElementSibling.addEventListener("mouseenter", function () {
                            e.insidePopover = !0
                        }), n.context.nextElementSibling.addEventListener("mouseleave", function () {
                            n.popover("hide"), e.insidePopover = !1
                        }), e.insidePopover || (n.popover("hide"), e.insidePopover = !1)
                    }, 100)
                })
            }
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (e, t) {
    void 0 !== e && e.directive("isOver", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (e, t, i, r) {
                e.$watch(function () {
                    return {
                        max: i.max,
                        min: i.min,
                        model: r.$modelValue
                    }
                }, function (e) {
                    var t = e.max,
                        i = e.min,
                        n = !1,
                        s = !1;
                    (isNaN(t) || !isNaN(t) && parseFloat(e.model) <= parseFloat(t)) && (n = !0), (isNaN(i) || !isNaN(i) && parseFloat(e.model) >= parseFloat(i)) && (s = !0), n && s ? r.$setValidity("isOver", !0) : r.$setValidity("isOver", !1)
                }, !0)
            }
        }
    }).directive("isProjectExist", ["$domeProject", function (e) {
        return {
            require: "ngModel",
            scope: {
                collection: "="
            },
            link: function (t, i, r, n) {
                var s = {};
                e.projectService.getProject(t.collection).then(function (e) {
                    function i(e) {
                        return 1 === s[o + "/" + e] ? n.$setValidity("isProjectExist", !1) : n.$setValidity("isProjectExist", !0), e
                    }
                    for (var a = e.data.result || [], o = r.groupName, u = 0, l = a.length; u < l; u++) s[a[u].name] = 1;
                    t.$watch(function () {
                        return r.groupName
                    }, function (e) {
                        e && (o = e), i(n.$modelValue)
                    }), n.$parsers.unshift(i)
                })
            }
        }
    }]).directive("isUserExist", function () {
        return {
            require: "ngModel",
            scope: {
                userList: "=isUserExist"
            },
            link: function (e, t, i, r) {
                r.$parsers.unshift(function (t) {
                    if (e.userList)
                        for (var i = 0, n = e.userList.length; i < n; i++)
                            if (e.userList[i].username === t) return void r.$setValidity("isUserExist", !1);
                    return r.$setValidity("isUserExist", !0), t
                })
            }
        }
    }).directive("isClusterExist", function () {
        return {
            require: "ngModel",
            scope: {
                clusterList: "="
            },
            link: function (e, t, i, r) {
                r.$parsers.unshift(function (t) {
                    if (e.clusterList)
                        for (var i = 0, n = e.clusterList.length; i < n; i++)
                            if (e.clusterList[i].name === t) return void r.$setValidity("isClusterExist", !1);
                    return r.$setValidity("isClusterExist", !0), t
                })
            }
        }
    }).directive("isApiServerExist", function () {
        return {
            require: "ngModel",
            scope: {
                clusterList: "=",
                currentCluster: "@"
            },
            link: function (e, t, i, r) {
                r.$parsers.unshift(function (t) {
                    if (e.clusterList)
                        for (var i = 0, n = e.clusterList.length; i < n; i++)
                            if (e.currentCluster !== e.clusterList[i].name && e.clusterList[i].api === t) return void r.$setValidity("isApiServerExist", !1);
                    return r.$setValidity("isApiServerExist", !0), t
                })
            }
        }
    }).directive("isDeployExist", ["$domeDeploy", function (e) {
        return {
            require: "ngModel",
            scope: {
                collection: "="
            },
            link: function (t, i, r, n) {
                function s(e) {
                    for (var t = 0, i = a.length; t < i; t++)
                        if (a[t].clusterName === u && a[t].namespace === o && a[t].deployName === e) return n.$setValidity("isDeployExist", !1), e;
                    return n.$setValidity("isDeployExist", !0), e
                }
                var a = [],
                    o = r.namespace,
                    u = r.clustername;
                e.deployService.getListByCollectionId(t.collection).then(function (e) {
                    a = e.data.result || []
                }), t.$watch(function () {
                    return {
                        namespace: r.namespace,
                        clustername: r.clustername
                    }
                }, function (e) {
                    o = e.namespace, u = e.clustername, s(n.$modelValue)
                }, !0), n.$parsers.unshift(s)
            }
        }
    }]).directive("isDeployNameExist", ["$domeCluster", function (e) {
        return {
            require: "ngModel",
            link: function (t, i, r, n) {
                var s = [];
                e.getInstance("ClusterService").getDeployList().then(function (e) {
                    s = e.data.result || []
                }), n.$parsers.unshift(function (e) {
                    for (var t = 0, i = s.length; t < i; t++)
                        if (s[t].deployName === e) return n.$setValidity("isDeployNameExist", !1), e;
                    return n.$setValidity("isDeployNameExist", !0), e
                })
            }
        }
    }]).directive("isNamespaceExist", ["$domeCluster", function (e) {
        return {
            require: "ngModel",
            link: function (t, i, r, n) {
                var s = [],
                    a = e.getInstance("ClusterService").getNamespace;
                t.$watch(function () {
                    return r.clusterid
                }, function (e) {
                    a(e).then(function (e) {
                        s = e.data.result || []
                    })
                }), n.$parsers.unshift(function (e) {
                    for (var t = 0, i = s.length; t < i; t++)
                        if (s[t].name === e) return n.$setValidity("isNamespaceExist", !1), e;
                    return n.$setValidity("isNamespaceExist", !0), e
                })
            }
        }
    }]).directive("isGroupExist", ["$domeUser", function (e) {
        return {
            require: "ngModel",
            link: function (t, i, r, n) {
                var s = {};
                e.userService.getGroup().then(function (e) {
                    for (var t = e.data.result || [], i = 0, r = t.length; i < r; i++) s[t[i].name] = 1
                }), n.$parsers.unshift(function (e) {
                    return s[e] ? n.$setValidity("isGroupExist", !1) : n.$setValidity("isGroupExist", !0), e
                })
            }
        }
    }]).directive("isAlarmTemplateExist", ["$domeAlarm", function (e) {
        return {
            require: "ngModel",
            scope: {
                selfName: "@"
            },
            link: function (t, i, r, n) {
                var s = {};
                e.getInstance("AlarmService").getData().then(function (e) {
                    for (var t = e.data.result || [], i = 0, r = t.length; i < r; i++) s[t[i].templateName] = 1
                }), n.$parsers.unshift(function (e) {
                    return t.selfName && t.selfName === e ? n.$setValidity("isAlarmTemplateExist", !0) : s[e] ? n.$setValidity("isAlarmTemplateExist", !1) : n.$setValidity("isAlarmTemplateExist", !0), e
                })
            }
        }
    }]).directive("isTagExist", function () {
        return {
            require: "ngModel",
            scope: {
                baseImages: "=baseimages",
                imageName: "=imagename"
            },
            link: function (e, t, i, r) {
                function n(t) {
                    var i = !1;
                    if (e.imageName && e.baseImages)
                        for (var n = 0, s = e.baseImages.length; n < s; n++)
                            if (e.baseImages[n].imageName === e.imageName && e.baseImages[n].imageTag === t) {
                                i = !0;
                                break
                            }
                    return r.$setValidity("isTagExist", !i), t
                }
                e.$watch(function () {
                    return e.imageName
                }, function () {
                    n(r.$modelValue)
                }), r.$parsers.unshift(n)
            }
        }
    }).directive("isHostgroupExist", function () {
        return {
            require: "ngModel",
            scope: {
                hostgroupList: "="
            },
            link: function (e, t, i, r) {
                r.$parsers.unshift(function (t) {
                    for (var i = 0, n = e.hostgroupList.length; i < n; i++)
                        if (t === e.hostgroupList[i].hostGroupName) return r.$setValidity("isHostgroupExist", !1), t;
                    return r.$setValidity("isHostgroupExist", !0), t
                })
            }
        }
    }).directive("diyPattern", function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                pattern: "=diyPattern"
            },
            link: function (e, t, i, r) {
                function n(t) {
                    if (t = t || "", e.pattern) {
                        var i = new RegExp(e.pattern);
                        return r.$setValidity("diyPattern", i.test(t)), t
                    }
                    return r.$setValidity("diyPattern", !0), t
                }
                r.$parsers.unshift(n), e.$watch(function () {
                    return e.pattern
                }, function () {
                    n(r.$modelValue)
                })
            }
        }
    }).directive("isRequired", [function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (e, t, i, r) {
                var n = [],
                    s = !1;
                angular.forEach(i, function (e, t) {
                    t.indexOf("param") !== -1 && n.push(t)
                }), e.$watch(function () {
                    for (var e = {}, t = 0, s = n.length; t < s; t++) e[n[t]] = i[n[t]];
                    return {
                        watchParams: e,
                        model: r.$modelValue
                    }
                }, function (e) {
                    s = !1, angular.forEach(e.watchParams, function (e) {
                        e && "false" !== e && (s = !0)
                    }), !s || s && e.model ? r.$setValidity("isRequired", !0) : r.$setValidity("isRequired", !1)
                }, !0)
            }
        }
    }]).directive("isProjectCollectionExist", ["$domeProjectCollection", function (e) {
        return {
            require: "ngModel",
            link: function (t, i, r, n) {
                var s = {};
                e.projectCollectionService.getProjectCollection().then(function (e) {
                    for (var t = e.data.result || [], i = 0, r = t.length; i < r; i++) s[t[i].name] = 1
                }), n.$parsers.unshift(function (e) {
                    return s[e] ? n.$setValidity("isProjectCollectionExist", !1) : n.$setValidity("isProjectCollectionExist", !0), e
                })
            }
        }
    }]).directive("isDeployCollectionExist", ["$domeDeployCollection", function (e) {
        return {
            require: "ngModel",
            link: function (t, i, r, n) {
                var s = {};
                e.deployCollectionService.getDeployCollection().then(function (e) {
                    for (var t = e.data.result || [], i = 0, r = t.length; i < r; i++) s[t[i].name] = 1
                }), n.$parsers.unshift(function (e) {
                    return s[e] ? n.$setValidity("isDeployCollectionExist", !1) : n.$setValidity("isDeployCollectionExist", !0), e
                })
            }
        }
    }])
}(window.domeApp);
"use strict";
! function (n, e) {
    function o(n, e, o, a, t) {
        var c = this;
        c.projectInfo = n, c.loadingIns = o.getLoadingInstance(), c.buildWay = "Branch", c.searchKey = "", c.imageTag = "", c.selectedBranch = "", c.projectInfo.hasCodeInfo && (c.loadingIns.startLoading("branch"), e.projectService.getBranches(c.projectInfo.projectId).then(function (n) {
            c.branches = n.data.result || []
        }).finally(function () {
            c.loadingIns.finishLoading("branch")
        }), c.loadingIns.startLoading("tag"), e.projectService.getTags(c.projectInfo.projectId).then(function (n) {
            c.tags = n.data.result || []
        }).finally(function () {
            c.loadingIns.finishLoading("tag")
        })), c.toggleBuildWay = function (n) {
            c.buildWay = n, c.searchKey = "", c.selectedBranch = ""
        }, c.toggleBranch = function (n) {
            c.selectedBranch = n, c.searchKey = ""
        }, c.close = function () {
            t.dismiss("cancel")
        }, c.toBuild = function () {
            var n = {
                projectId: c.projectInfo.projectId,
                codeInfo: {},
                imageInfo: {}
            };
            c.projectInfo.hasCodeInfo && ("Branch" == c.buildWay ? n.codeInfo.codeBranch = c.selectedBranch : n.codeInfo.codeTag = c.selectedBranch), c.imageTag && (n.imageInfo.imageTag = c.imageTag), c.loadingIns.startLoading("submit"), e.projectService.build(n).then(function (n) {
                200 == n.data.resultCode ? (t.close(), a.alert("提示", "成功，正在构建！")) : (t.close(), a.error("警告", "构建失败！错误信息：" + n.data.resultMsg))
            }, function () {
                a.error("警告", "构建失败，请重试！")
            }).finally(function () {
                c.loadingIns.finishLoading("submit")
            })
        }
    }
    o.$inject = ["projectInfo", "$domeProject", "$domePublic", "dialog", "$modalInstance"], n.controller("BuildModalCtr", o)
}(angular.module("domeApp"));
"use strict";
! function (t, o) {
    void 0 !== t && t.controller("HostListModalCtr", ["$scope", "hostList", "$modalInstance", "filterFilter", function (t, o, i, l) {
        t.hostList = l(o, {
            labelFilter: !0
        }), t.cancel = function () {
            i.dismiss("cancel")
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (n, e) {
    void 0 !== n && n.controller("OtherImageModalCtr", ["$scope", "$modalInstance", function (n, e) {
        n.imageInfo = {
            name: "",
            tag: "",
            registry: ""
        }, n.submitImage = function () {
            e.close(n.imageInfo)
        }, n.cancel = function () {
            e.dismiss("cancel")
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (n, e) {
    void 0 !== n && n.controller("InstanceLogModalCtr", ["$scope", "instanceInfo", "$location", "$modalInstance", function (n, e, o, a) {
        var t = location.protocol.replace("http", "ws") + "//" + o.host();
        o.port() && (t += ":" + o.port()), e.containers || (e.containers = []);
        for (var c = 0, i = e.containers.length; c < i; c++) {
            var r = encodeURIComponent(t + "/api/deploy/instance/log/realtime/websocket?clusterid=" + e.clusterId + "&namespace=" + e.namespace + "&instancename=" + e.instanceName + "&containername=" + e.containers[c].containerName);
            e.containers[c].pageTxt = e.containers[c].containerId.substring(0, 12) + "(" + e.containers[c].imageName + ")", e.containers[c].href = "/log/log.html?url=" + r
        }
        n.instanceInfo = e, n.cancel = function () {
            a.dismiss("cancel")
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (n, t) {
    void 0 !== n && n.controller("SelectContainerModalCtr", ["$scope", "info", "$modalInstance", function (n, t, e) {
        n.containerList = t.containerList || [], n.hostIp = t.hostIp, n.resourceId = t.resourceId, n.type = t.type;
        for (var o = 0, i = n.containerList.length; o < i; o++) n.containerList[o].shortContainerId = n.containerList[o].containerId.substring(0, 12), n.containerList[o].pageContainer = n.containerList[o].shortContainerId + " (" + n.containerList[o].imageName + ")";
        n.toggleCurrentContainer = function (t) {
            n.currentContainer = n.containerList[t]
        }, n.containerList[0] && n.toggleCurrentContainer(0), n.cancel = function () {
            e.dismiss("")
        }
    }])
}(angular.module("domeApp"));
"use strict";
! function (t, e) {
    function r(t, e, r, c) {
        var s = this;
        r.projectService.previewDockerfile(e._formartProject()).then(function (t) {
            200 == t.data.resultCode ? s.dockerfileTxt = t.data.result ? c.trustAsHtml(t.data.result.replace(/[\n\r]/g, "<br/>")) : c.trustAsHtml("无数据！") : s.dockerfileTxt = c.trustAsHtml('<h4 class="txt-error">请求失败！</h4><p class="txt-error">错误信息：' + t.data.resultMsg + "</p>")
        }, function () {
            s.dockerfileTxt = c.trustAsHtml('<p class="txt-error">请求失败！</p>')
        }), s.cancel = function () {
            t.dismiss("cancel")
        }
    }
    t.controller("DockerfileModalCtr", r), r.$inject = ["$modalInstance", "project", "$domeProject", "$sce"]
}(angular.module("domeApp"));
"use strict";
! function (e, c) {
    function t(e, c, t, n) {
        var a = this;
        a.check = "Branch", a.branchKey = "", n ? (c.projectService.getBranches(n).then(function (e) {
            a.branches = e.data.result || []
        }), c.projectService.getTags(n).then(function (e) {
            a.tags = e.data.result || []
        })) : (c.projectService.getBranchesWithoutId(t.codeId, t.codeManagerUserId, t.codeManager).then(function (e) {
            a.branches = e.data.result || []
        }), c.projectService.getTagsWithoutId(t.codeId, t.codeManagerUserId, t.codeManager).then(function (e) {
            a.tags = e.data.result || []
        })), a.toggle = function (e) {
            a.check = e, a.branchKey = "", a.selectedBranch = ""
        }, a.cancel = function () {
            e.dismiss("cancel")
        }, a.submitBranch = function () {
            e.close({
                type: a.check.toLowerCase(),
                value: a.selectedBranch
            })
        }, a.toggleBranch = function (e) {
            a.branchKey = "", a.selectedBranch = e
        }
    }
    void 0 !== e && (e.controller("BranchCheckModalCtr", t), t.$inject = ["$modalInstance", "$domeProject", "codeInfo", "projectId"])
}(angular.module("domeApp"));
"use strict";
! function (o, c) {
    function n(o, c, n, t) {
        var e = this;
        e.showForm = t, e.project = angular.copy(n), o.close = function () {
            c.dismiss("cancel")
        }, o.toModify = function () {
            c.close(e.project)
        }
    }
    void 0 !== o && (o.controller("CodeInfoModalCtr", n), n.$inject = ["$scope", "$modalInstance", "project", "showForm"])
}(angular.module("domeApp"));
"use strict";
! function (n) {
    n.component("hostLabelSelector", {
        template: '\n        <form-with-button width="150px">\n          <content-area>\n            <form-multiple-select ng-model="$ctrl.value" options="$ctrl.labelSelectorsList" on-change="$ctrl.output()" placeholder="请选择主机标签" is-loading="$ctrl.isLoadingLabel" loading-text="正在获取主机标签" empty-text="无相关信息"></form-multiple-select>\n          </content-area>\n          <button-area>\n            <button type="button" ng-click="$ctrl.showHost()" >查看选中主机</button>\n          </button-area>  \n        </form-with-button>\n      ',
        bindings: {
            ngModel: "=?",
            cluster: "<?",
            hostEnv: "<?"
        },
        controller: ["$scope", "api", "dialog", function (n, e, t) {
            var o = this,
                l = !0,
                i = [];
            o.labelSelectorsList = [];
            var a = e.SimplePromise.resolve([]),
                r = function () {
                    l || (o.ngModel = null, o.value = null), o.isLoadingLabel = !0, o.cluster && o.cluster.id && (a = e.cluster.listHostLabel(o.cluster.id).then(function (n) {
                        var e = n || [];
                        return o.labelSelectorsList = e.filter(function (n) {
                            return "USER_LABEL_VALUE" === n.content
                        }).map(function (n) {
                            return {
                                text: n.name,
                                value: n
                            }
                        }), o.labelSelectorsList
                    }), a.catch(function () {}).then(function () {
                        o.isLoadingLabel = !1, l = !1
                    }))
                };
            o.showHost = function () {
                c();
                var n = [],
                    l = {
                        loading: !0
                    };
                e.cluster.listNodeByLabels(o.cluster.id, i).then(function (e) {
                    Array.prototype.push.apply(n, e)
                }).catch(function () {}).then(function () {
                    l.loading = !1
                }), t.common({
                    title: "主机列表",
                    buttons: t.buttons.BUTTON_OK_ONLY,
                    value: {
                        nodeList: n,
                        isLoadingNode: l
                    },
                    template: "\n                    <form-container>\n                    <form-table\n                        ng-model=\"value.nodeList\"\n                        template=\"nodeListByLabelsTable\"\n                        columns=\"[\n                            { text: '主机名', key: 'name', width: '30%' },\n                            { text: 'IP地址', key: 'ip', width: '30%' },\n                            { text: '实例个数', key: 'runningPods', width: '20%' },\n                            { text: '状态', key: 'status', width: '20%' },\n                        ]\"\n                        empty-text=\"{{ value.isLoadingNode.loading ? '加载中...' : '无主机信息' }}\"\n                    ></form-table>\n                    </form-container>\n                    <script type=\"text/ng-template\" id=\"nodeListByLabelsTable\">\n                        <div ng-if=\"column.key === 'name'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'ip'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'runningPods'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'status'\" ng-bind=\"value\"></div>\n                    </script>\n                    ",
                    size: 600
                })
            };
            var m = function () {
                angular.isArray(o.ngModel) && (angular.equals(o.ngModel, o.value) || o.ngModel.length > 0 && a.then(function (n) {
                    (o.ngModel || []).forEach(function (e) {
                        o.value = o.value.concat(n.filter(function (n) {
                            return e.name === n.text
                        }))
                    }), o.value = (o.value || []).map(function (n) {
                        return n.value
                    })
                }))
            };
            o.output = function () {
                angular.equals(o.ngModel, o.value) || (o.ngModel = o.value)
            };
            var c = function () {
                if (o.hostEnv) {
                    var n = {
                        TEST: {
                            name: "TESTENV",
                            content: "HOSTENVTYPE"
                        },
                        PROD: {
                            name: "PRODENV",
                            content: "HOSTENVTYPE"
                        }
                    };
                    i = angular.copy(o.ngModel || []), i = i.filter(function (n) {
                        return "HOSTENVTYPE" !== n.content
                    }).concat(n[o.hostEnv])
                }
            };
            n.$watch("$ctrl.cluster", r), n.$watch("$ctrl.ngModel", m)
        }]
    }), n.component("imageTagSelector", {
        template: '\n            <form-select \n                ng-model="$ctrl.value" \n                name="$ctrl.name" \n                options="$ctrl.imageTagSelectorList" \n                on-change="$ctrl.output()"\n                placeholder="请选择版本" \n                is-loading="$ctrl.isLoadingImageTag" \n                loading-text="正在获取镜像版本" \n                required="$ctrl.required" \n                empty-text="无相关信息" \n            ></form-select>\n            <form-error-message form="$ctrl.form" target="{{ $ctrl.name }}">镜像版本不能为空！</form-error-message>\n            ',
        bindings: {
            name: "@",
            ngModel: "=?",
            image: "<?",
            required: "@",
            form: "<?"
        },
        controller: ["$scope", "api", "$filter", function (n, e, t) {
            var o = this,
                l = e.SimplePromise.resolve([]),
                i = function () {
                    o.isLoadingImageTag = !0, o.image && o.image.name && o.image.registry && (l = e.image.privateRegistry.listImageTags(o.image.name, o.image.registry).then(function (n) {
                        return o.imageTagSelectorList = (n || []).map(function (n) {
                            return {
                                value: n.tag,
                                text: n.tag,
                                remark: t("date")(n.createTime, "yyyy-MM-dd HH:mm:ss")
                            }
                        }, []), o.imageTagSelectorList
                    }), l.then(function () {
                        o.image.tag ? 0 === o.imageTagSelectorList.length && (o.imageTagSelectorList = [{
                            value: o.image.tag,
                            text: o.image.tag
                        }], o.value = o.image.tag) : o.value = o.imageTagSelectorList && o.imageTagSelectorList[0] ? o.imageTagSelectorList[0].value : void 0
                    }).catch(function () {}).then(function () {
                        o.isLoadingImageTag = !1
                    }))
                },
                a = function () {
                    angular.equals(o.ngModel, o.value) || o.ngModel && l.then(function () {
                        (o.imageTagSelectorList || []).forEach(function (n) {
                            n.value === o.image.tag && (o.value = n.value)
                        })
                    })
                };
            o.output = function () {
                angular.equals(o.ngModel, o.value) || (o.ngModel = o.value)
            }, n.$watch("$ctrl.image", i), n.$watch("$ctrl.ngModel", a)
        }]
    }), n.component("volumeMountStorage", {
        template: '\n        <style>\n        .volume-mount-container-next { margin-right: 5px; }\n        .volume-mount-container-name{ flex-grow: 0; flex-basis: 20%; }\n        .volume-mount-container-type{ flex-grow: 0;flex-basis: 14%; }\n        .volume-mount-container-readonly{ flex-grow: 0;flex-basis: 9%; }\n        .volume-mount-container-content{ flex-grow: 2; }\n        .volume-mount-container-path-only{}\n        .volume-mount-container-path{ flex-grow: 0; flex-basis: 25%; margin-right: 5px;}\n        </style>\n        <form-array-container ng-model="$ctrl.ngModel" name="$ctrl.name" on-add="$ctrl.addVolumeMountItem()" template="$_volumeMountStorageItem" max-length="100" min-length="0" type="simple" param="$ctrl.param"></form-array-container>\n        <button ng-if="$ctrl.isDisplayCopyVolume()" type="button" ng-click="$ctrl.showVolumeMountTable()">复制已有存储</button>\n        <script type="text/ng-template" id="$_volumeMountStorageItem" >\n            <form-multiple-inline>\n                <form-multiple-inline-item class="volume-mount-container-type volume-mount-container-next">\n                    <form-select ng-model="$ctrl.ngModel[$index].volumeType" options="[{value: \'HOSTPATH\', text: \'主机目录\'},{value: \'EMPTYDIR\', text: \'实例内目录\'}]" placeholder="请选择存储类型" required show-search-input="never" empty-text="无相关信息"></form-select>\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="volume-mount-container-readonly volume-mount-container-next">\n                    <form-select ng-model="$ctrl.ngModel[$index].readonly" options="[{value: \'false\', text: \'读写\'}, {value: \'true\', text: \'只读\'}]" placeholder="请选择读写类型" required show-search-input="never"></form-select>\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="volume-mount-container-name volume-mount-container-next">\n                    <!--<div ng-bind="$ctrl.ngModel[$index].name"></div>-->\n                    <input type="text" ng-model="$ctrl.ngModel[$index].name" name="{{ $ctrl.param.name + \'name\' }}" placeholder="输入名称，不可重复" required pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$">\n                </form-multiple-inline-item>\n                \n                <form-multiple-inline-item ng-class="{true: \'volume-mount-container-path-only\',false: \'volume-mount-container-path\'}[$ctrl.ngModel[$index].volumeType === \'EMPTYDIR\']">\n                    <input type="text" ng-model="$ctrl.ngModel[$index].containerPath" name="{{ $ctrl.param.name + \'containerPath\' }}" placeholder="容器内挂载路径，以/开头" required pattern="^/.*"/>\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="volume-mount-container-content" ng-if="$ctrl.ngModel[$index].volumeType === \'HOSTPATH\'">\n                    <input type="text" ng-model="$ctrl.ngModel[$index].hostPath" name="{{ $ctrl.param.name + \'hostPath\' }}" placeholder="主机内目录，以‘/’开头" required pattern="^/.*"/>\n                </form-multiple-inline-item>\n            </form-multiple-inline>\n        </script>\n        ',
        bindings: {
            name: "@",
            ngModel: "=?",
            cluster: "<?",
            namespace: "<?",
            containerConsoles: "<?",
            containerIndex: "@",
            imageName: "@"
        },
        controller: ["$scope", "api", "dialog", function (n, e, t) {
            var o = this;
            o.param = {
                storageVolumeSelectorList: [],
                formName: o.formName,
                name: o.name
            };
            e.SimplePromise.resolve([]);
            o.addVolumeMountItem = function () {
                o.ngModel.push({
                    copied: !1,
                    name: "",
                    volumeType: "HOSTPATH",
                    readonly: "false",
                    containerPath: "",
                    hostPath: "",
                    emptyDir: "",
                    volumePVC: {
                        claimName: "",
                        readOnly: !1,
                        volumeId: null,
                        volumeName: null
                    },
                    volumeConfigMap: {}
                }), o.ngModel = o.ngModel.filter(function (n) {
                    return void 0 != n
                })
            }, o.isDisplayCopyVolume = function () {
                return o.existentVolumeMountList && o.existentVolumeMountList.length > 0 && o.containerConsoles.length > 1
            }, o.showVolumeMountTable = function () {
                l(), t.common({
                    title: "复制已有存储",
                    buttons: t.buttons.BUTTON_OK_CANCEL,
                    value: {
                        existentVolumeMountList: o.existentVolumeMountList
                    },
                    template: "\n                    <form-container>\n                    <form-table\n                        ng-model=\"value.existentVolumeMountList\" \n                        template=\"existentVolumeMountTable\" \n                        columns=\"[\n                            { text: '类型', key: 'volumeType', width: '15%' },\n                            { text: '权限', key: 'readonly', width: '10%' },\n                            { text: '名称', key: 'name' },\n                            { text: '容器内路径', key: 'containerPath', width: '15%' },\n                            { text: '主机内目录', key: 'hostPath', width: '15%' },\n                            { text: '选择', key: 'option', width: '10%' },\n                        ]\" \n                        empty-text=\"无存储信息\" \n                    ></form-table>\n                    <script type=\"text/ng-template\" id=\"existentVolumeMountTable\">\n                        <div ng-if=\"column.key === 'name'\" ng-bind=\"value || '无'\"></div>\n                        <div ng-if=\"column.key === 'readonly'\" ng-bind=\"value === 'true' ? '只读': '读写'\"></div>\n                        <div ng-if=\"column.key === 'volumeType'\" ng-bind=\"value === 'HOSTPATH'? '主机目录': value === 'EMPTYDIR' ? '实例内目录': ''\"></div>\n                        <div ng-if=\"column.key === 'hostPath'\" ng-bind=\"value || '-'\"></div>\n                        <div ng-if=\"column.key === 'containerPath'\" ng-bind=\"value || '-'\"></div>\n                        <div ng-if=\"column.key === 'option'\">\n                            <div ng-show=\"row.name\">\n                            <form-input-checkbox ng-model=\"row.copied\" text=\"\" value=\"true\" value-false=\"false\" ></form-input-checkbox>\n                            </div>\n                            <div ng-show=\"!row.name\">无名称</div>\n                        </div>\n                    </script>\n                    </form-container>\n                    "
                }).then(function (n) {
                    n === t.button.BUTTON_OK ? o.existentVolumeMountList.map(function (n) {
                        return n.copied === !0 && o.ngModel.every(function (e) {
                            return e.name !== n.name
                        }) && (n.copied = !1, o.ngModel.push(angular.copy(n)), i()), n.copied = !1, n
                    }) : o.existentVolumeMountList.map(function (n) {
                        return n.copied = !1
                    })
                }).catch(function () {
                    o.existentVolumeMountList.map(function (n) {
                        return n.copied = !1
                    })
                })
            };
            var l = function () {
                    o.existentVolumeMountList = [], (o.containerConsoles || []).forEach(function (n) {
                        (n.volumeMountConsoles || []).forEach(function (n) {
                            o.existentVolumeMountList.every(function (e) {
                                return e.name !== n.name
                            }) && o.existentVolumeMountList.push(n)
                        })
                    })
                },
                i = function () {
                    angular.isArray(o.ngModel) && o.ngModel.length
                };
            n.$watch("$ctrl.ngModel", l, !0), n.$watch("$ctrl.ngModel", i), n.$watch("$ctrl.containerConsoles.volumeMountConsoles", l, !0), n.$watch("$ctrl.name", function () {
                o.param.name = o.name
            })
        }]
    }), n.component("volumeMountConfigmap", {
        template: '\n        <style>\n        .config-map-name{ flex-grow: 0; flex-basis: 44%; margin-right: 6px;}\n        .config-map-path{ }\n        .config-map-error::before {\n            content: "";\n            position: absolute;\n            left: 10px;;\n            top: 20px;\n            width: 0;\n            height: 0;\n            border-top: 5px solid #f5707a;\n            border-right: 5px solid transparent;\n            border-left: 5px solid transparent;\n        }\n        .config-map-error{\n            position: absolute;\n            top: -20px;\n            padding: 0 10px;\n            width: 150px;\n            color: #fff;\n            background-color: #f5707a;\n            border-radius: 3px;\n            line-height: 20px;\n        }\n        </style>\n        <form-array-container ng-model="$ctrl.ngModel" name="$ctrl.name" on-add="$ctrl.addVolumeMountConfigMapItem()" template="$_volumeMountConfigMapItem" max-length="100" min-length="0" type="simple" param="$ctrl.param"></form-array-container>\n        <script type="text/ng-template" id="$_volumeMountConfigMapItem" >\n            <form-multiple-inline>\n                <form-multiple-inline-item class="config-map-name">\n                    <form-select ng-model="$ctrl.ngModel[$index].configMap" name="{{ $ctrl.param.name + \'configMapIns\' }}" options="$ctrl.ngModel[$index].configMapVolumeSelectorList" placeholder="请选择配置，不能为空且多个配置不能相同" required="true" show-search-input="always" empty-text="无相关信息"></form-select>\n                    <!--<div class="config-map-error" ng-show="$ctrl.ngModel[$index].configMap === undefined">配置不能为空</div>-->\n                </form-multiple-inline-item>\n                <form-multiple-inline-item class="config-map-path">\n                    <form-with-button width="90px">\n                        <content-area>\n                            <input type="text" ng-model="$ctrl.ngModel[$index].containerPath" name="{{ $ctrl.param.name + \'configMapPath\' }}" placeholder="容器内挂载路径，以‘/’开头" required pattern="^/.*"/>\n                        </content-area>\n                        <button-area>\n                            <button type="button" ng-click="$ctrl.param.setConfigFile($ctrl.ngModel[$index])">配置文件</button>\n                        </button-area>\n                    </form-with-button>\n                </form-multiple-inline-item>\n            </form-multiple-inline>\n        </script>\n    ',
        bindings: {
            name: "@",
            ngModel: "=?",
            cluster: "<?",
            namespace: "<?"
        },
        controller: ["$scope", "api", "dialog", function (n, e, t) {
            var o = this;
            o.param = {
                name: "",
                setConfigFile: null
            }, o.param.setConfigFile = function (n) {
                n.configMap && t.common({
                    title: "配置文件",
                    buttons: t.buttons.BUTTON_OK_CANCEL,
                    value: {
                        configMapVolume: n
                    },
                    template: '\n                    <form>\n                    <form-container>\n                    <form-table\n                        ng-model="value.configMapVolume.configMap.configFileList"\n                        template="configMapFilesTable"\n                        columns="[\n                            { text: \'配置文件\', key: \'name\', width: \'35%\' },\n                            { text: \'文件名(可以为空)\', key: \'path\', width: \'65%\' },\n                        ]"\n                        empty-text="无配置文件"\n                        param="{configMapVolume: value.configMapVolume}"\n                    ></form-table>\n                    </form-container>\n                    </form>\n                    <script type="text/ng-template" id="configMapFilesTable">\n                        <div ng-if="column.key === \'name\'" ng-bind="value" popover="{{row.content}}" popover-trigger="click" popover-placement="left" style="cursor: pointer;"></div>\n                        <div ng-if="column.key === \'path\'">\n                           <input type="text" ng-model="row.path" placeholder="{{ row.name }}"></td>\n                        </div>\n                    </script>\n                    ',
                    size: 600
                })
            };
            var l = e.SimplePromise.resolve([]),
                i = function () {
                    o.cluster && o.cluster.id && o.namespace && (l = e.configMap.listConfigMapByClusterIdAndNamespace(o.cluster.id, o.namespace).then(function (n) {
                        return o.configMapSelectorList = (n || []).map(function (n) {
                            return {
                                value: n,
                                text: n.name
                            }
                        }), o.configMapSelectorList
                    }))
                };
            i();
            var a = function () {
                angular.isArray(o.ngModel) && 0 !== o.ngModel.length && l.then(function () {
                    o.ngModel.map(function (n) {
                        n.configMapVolumeSelectorList = angular.copy(o.configMapSelectorList), n.configMapVolumeSelectorList.forEach(function (e) {
                            if (n.name === e.text) return n.configMap = e.value, n.configMap.configFileList = n.volumeConfigMap.iterms ? Object.keys(n.volumeConfigMap.iterms).map(function (t) {
                                return {
                                    name: t,
                                    content: e.value.data[t],
                                    path: n.volumeConfigMap.iterms ? n.volumeConfigMap.iterms[t] : null
                                }
                            }) : e.value.configFileList, n
                        })
                    })
                })
            };
            o.addVolumeMountConfigMapItem = function () {
                o.ngModel.push({
                    name: "",
                    volumeType: "CONFIGMAP",
                    readonly: "false",
                    containerPath: "",
                    hostPath: "",
                    emptyDir: "",
                    volumePVC: {},
                    volumeConfigMap: {
                        configurationId: null,
                        name: "",
                        iterms: null
                    }
                }), o.ngModel = o.ngModel.filter(function (n) {
                    return void 0 != n
                })
            }, n.$watch("$ctrl.cluster", i), n.$watch("$ctrl.namespace", i), n.$watch("$ctrl.ngModel", a), n.$watch("$ctrl.name", function () {
                o.param.name = o.name
            })
        }]
    }), n.component("containerLog", {
        template: '\n        <div ng-if="!$ctrl.hasClusterLogConfig()"> 所选集群没有开启日志自动收集。不能进行日志相关配置。 </div>\n        <form-array-container ng-if="$ctrl.hasClusterLogConfig()" ng-model="$ctrl.ngModel" name="$ctrl.name" template="$_logItemContainer" max-length="100" min-length="0" type="complex" param="$ctrl.param"></form-array-container>                            \n        <script type="text/ng-template" id="$_logItemContainer" >\n            <div class="form-array-container-item" style="padding:10px;">\n                <input ng-model="$ctrl.ngModel[$index].logPath" type="text" name="{{ $ctrl.param.name + \'logPath\' }}" placeholder="请输入日志路径，不能放在根目录下" required ng-pattern="/^/.*[^/]$/" />\n                <form-input-checkbox ng-model="$ctrl.ngModel[$index].autoCollect" text="自动收集日志"  value="true" value-false="false" ></form-input-checkbox>\n                <div ng-if="$ctrl.ngModel[$index].autoCollect" >\n                    <div>\n                        <span>日志topic</span>\n                        <input ng-model="$ctrl.ngModel[$index].logTopic" type="text" name="{{ $ctrl.param.name + \'logTopic\' }}"  placeholder="请输入日志topic" required />\n                    </div>\n                    <div>\n                        <span>预处理命令</span>\n                        <a class="help-tip" popover="对收集到的日志做进一步处理，比如筛选或增减字段等，可以用grep和awk命令完成，命令以管道形式执行，因此必须以“|”开始，比如一个典型的处理命令为：   | grep &quot;ERROR\\|WARN\\| EXCEPTION\\| statistic&quot; | awk -vnhost=&quot;$HOSTNAME&quot; \'{print &quot;[&quot;nhost&quot;]--&quot;$0}\'，该命令将只筛选包含四个对应关键字的行，并且会在行首添加&quot;[hostname]--&quot;的字符串，参照可完成其他复杂的处理方式"></a>\n                        <input ng-model="$ctrl.ngModel[$index].processCmd" type="text" name="{{ $ctrl.param.name + \'processCmd\' }}" placeholder="请输入预处理命令" />\n                    </div>\n                </div>\n                <form-input-checkbox ng-model="$ctrl.ngModel[$index].autoDelete" text="自动删除日志" value="true" value-false="false"></form-input-checkbox>\n                <div ng-if="$ctrl.ngModel[$index].autoDelete">\n                    <span> 过期时间</span>\n                    <input ng-model="$ctrl.ngModel[$index].logExpired" type="number" min="1" name="{{ $ctrl.param.name + \'logExpired\' }}" placeholder="过期则自动删除" required ng-pattern="/^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/" />\n                    <span> 小时</span>\n                </div>\n            </div>\n        </script>\n        ',
        bindings: {
            name: "@",
            ngModel: "=",
            cluster: "<?"
        },
        controller: ["$scope", function (n) {
            var e = this;
            e.param = {
                name: e.name
            }, e.hasClusterLogConfig = function () {
                return e.cluster && (1 === e.cluster.logConfig || e.cluster.clusterLog)
            }, n.$watch("$ctrl.name", function () {
                e.param.name = e.name
            })
        }]
    }), n.component("formMultipleItemScroll", {
        template: '\n        <style>\n        .form-multiple-item-scroll{\n            border-bottom: 1px solid #f9f9f9;\n        }\n        .form-multiple-item-scroll .com-tabset-scroll {\n            margin-left: 110px;\n        }\n        .form-multiple-item-scroll ul.com-list-tab{\n            padding: 0; border-bottom: none;\n        }\n        .form-multiple-itme-scroll ul.com-list-tab li a.link-list {\n            padding-bottom: 10px;\n        }\n        .form-multiple-item-scroll ul.com-list-tab li.nav-option {\n            width: 63px;\n            height: 52px;\n            padding: 0 0 0 20px;\n        }\n        .form-multiple-item-scroll ul.com-list-tab li:hover {\n            border-bottom: 2px solid #cbe6ff;\n        }\n        .form-multiple-item-scroll ul.com-list-tab li.active {\n            border-bottom: 2px solid #5dabf3;\n        }\n        .form-multiple-item-scroll ul.com-list-tab li.error-message a, .form-multiple-item-scroll .error-message{\n            color: #f5707a;\n        }\n        </style>\n        <div class="form-multiple-item-scroll">\n            <input type="hidden" name="$ctrl.name" ng-model="$ctrl.value" ng-required="$ctrl.required">\n            <ul list-scroll="list-scroll" width-offset="400">\n                <li class="nav-option" disabled="true">\n                    <span>\n                        <a class="icon-last to-last"></a>\n                        <a class="icon-next to-next"></a>\n                    </span>\n                </li>\n                <li style="pointer-events: none;">\n                    <div style="margin-left: 40px;" ng-if="!$ctrl.options || $ctrl.options.length === 0">\n                        <span>您尚未选择任何镜像。</span>\n                        <span ng-if="$ctrl.formObject.$submitted" class="error-message">请选择镜像</span>\n                    </div>\n                </li>\n                <li ng-repeat="option in $ctrl.options track by $index" ng-class="{ \'active\':$ctrl.ngModel===$index,\'error-message\':$ctrl.formObject[\'form\'+$index].$invalid && $ctrl.formObject[\'form\'+$index].$submitted}">\n                    <div class="container-wrap">\n                        <a ng-click="$ctrl.deleteOption($index);fresh()"><i class="fa fa-times"></i></a>\n                        <a class="link-list" ng-click="$ctrl.ngModel = $index;" ng-bind="option.name"></a>\n                    </div>\n                </li>\n            </ul>\n        </div>\n        ',
        bindings: {
            ngModel: "=",
            options: "=",
            formObject: "<",
            required: "<"
        },
        controller: ["$scope", function (n) {
            var e = this;
            e.ngModel = 0, e.value = null, e.deleteOption = function (n) {
                e.options.splice(n, 1), n === e.ngModel || 0 === e.ngModel ? e.ngModel = 0 : e.ngModel = e.ngModel - 1
            };
            var t = function (n, t) {
                    e.ngModel = Math.max(Math.min(e.ngModel, e.options.length - 1), 0)
                },
                o = function () {
                    0 === e.options.length ? e.value = null : e.options.forEach(function (n) {
                        e.value = n.name
                    })
                };
            n.$watch("$ctrl.options.length", t, !0), n.$watch("$ctrl.options.length", o, !0)
        }]
    })
}(angular.module("formInputs"));