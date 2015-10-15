function MyModule(options) {
    this.options = options;
}

var proto = MyModule.prototype;
proto.logOptions = function() {
    console.log(this.options);
};

module.exports = MyModule;