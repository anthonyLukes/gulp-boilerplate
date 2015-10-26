(function () {
   'use strict';
   require('script!jquery/dist/jquery.js');
   var MyModule = require('./MyModule.js');

   var charlie = new MyModule({name: 'Charles'});
   charlie.logOptions();
}());

