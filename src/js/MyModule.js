var $ = require('jquery');

function MyModule(options) {
    this.options = options;
}

var proto = MyModule.prototype;

proto.logOptions = function() {
    console.log(this.options);
    var $body = $('body');
    console.log('$body', $body);
};

module.exports = MyModule;