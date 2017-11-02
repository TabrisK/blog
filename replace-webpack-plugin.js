/**
 * Created by zhangjiawei on 2017/8/8.
 */

let md5 = require("md5");
let fs = require("fs");

function compareModules(a, b) {
    if (a.resource < b.resource) {
        return -1;
    }
    if (a.resource > b.resource) {
        return 1;
    }
    return 0;
}

function getModuleSource(module) {
    var _source = module._source || {};
    return _source._value || "";
}

function concatenateSource(result, module_source) {
    return result + module_source;
}

var opts = {};

function replaceWebpackPlugin(options) {
    opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
}

replaceWebpackPlugin.prototype.apply = function (compiler) {

    //Setup callback for accessing a compilation
    //为得到compilation设置回调函数

    /*console.log(compiler.options.context);
     console.log(compiler.options.output);*/

    compiler.plugin("emit", function (compilation, cb) {
        let allHash = "";
        compilation.chunks.forEach(chunk => {
            allHash += chunk.hash;
        });

        allHash = md5(allHash);

        let template = fs.readFileSync(opts.template, {
            encoding: "utf8"
        });
        template = template.replace("___fv___", allHash);
        compilation.assets['index.html'] = {
            source: function() {
                return template;
            },
            size: function() {
                return template.length;
            }
        };
        cb();


    });

    compiler.plugin("after-emit", function (compilation, cb) {
        cb();

    });

    compiler.plugin("done", stats=>{
        console.log(stats);
    });


};

module.exports = replaceWebpackPlugin;