app.factory('Minions', function($q) {

    function isUndefined(obj) {
        return typeof obj === "undefined";
    }

    function isDefined(obj) {
        return typeof obj !== "undefined";
    }

    function deepmerge(target, src) {
        var array = Array.isArray(src);
        var dst = array && [] || {};

        if (array) {
            target = target || [];
            dst = dst.concat(target);
            src.forEach(function(e, i) {
                if (typeof dst[i] === 'undefined') {
                    dst[i] = e;
                } else if (typeof e === 'object') {
                    dst[i] = deepmerge(target[i], e);
                } else {
                    if (target.indexOf(e) === -1) {
                        dst.push(e);
                    }
                }
            });
        } else {
            if (target && typeof target === 'object') {
                Object.keys(target).forEach(function (key) {
                    dst[key] = target[key];
                })
            }
            Object.keys(src).forEach(function (key) {
                if (typeof src[key] !== 'object' || !src[key]) {
                    dst[key] = src[key];
                }
                else {
                    if (!target[key]) {
                        dst[key] = src[key];
                    } else {
                        dst[key] = deepmerge(target[key], src[key]);
                    }
                }
            });
        }

        return dst;
    }

    var Minions = {};

    Minions.getQueryParam = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    Minions.merge = function (target, src) {
        var copy = angular.copy(src);
        return deepmerge(target, copy);
    };

    return Minions;
});