'use strict';

var router = {
    routes: [],

    extendApp: function (app) {
        app.api = function (route, name, httpMethods) {
            router.routes[name] = route;

            if (cbs.get) app.get(route, httpMethods.get);
            if (cbs.post) app.post(route, httpMethods.post);
            if (cbs.put) app.put(route, httpMethods.put);
            if (cbs.delete) app.delete(route, httpMethods.delete);
        };

        app.locals.url = router.urlGenerator;
        app.use(router.setCurrentRoute);
    },

    setCurrentRoute: function (req, res, next) {
        res.locals.route = req.params.route;
    },

    urlGenerator: function (name, opts) {
        var _ = require('underscore');
        var route = router.routes[name];

        if (!opts) return route;
        var url = route.split('/');
        url = _.map(url, function (elem) {
            if (elem[0] == ':') return opts.substr(1);
        });

        return url.join('/');
    }
};

module.exports = router;