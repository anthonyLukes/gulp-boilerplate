require('script!jquery/dist/jquery.js');
var myModule = require('./MyModule.js');

var charlie = new myModule({name: 'Charles'});
charlie.logOptions();