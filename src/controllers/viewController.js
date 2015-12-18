var express = require('express');

var initMethods = function(app, rootDirName) {
    var router = express.Router();
    var path = rootDirName + "/src/view/";
    router.use(function(req, res, next) {
        console.log("/" + req.method);
        next();
    });

    router.get("/access", function(req, res) {
        res.sendFile(path + "index.html");
    });

    router.get("/", function(req, res){
        res.sendFile(path + "conver.html");
    });

    app.use("/view", router);

};

module.exports = {
    initMethods
};