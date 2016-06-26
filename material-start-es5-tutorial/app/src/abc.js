/* 
* @Author: Cao Hong Phuoc
* @Date:   2015-08-27 08:34:55
* @Last Modified by:   Cao Hong Phuoc
* @Last Modified time: 2015-08-27 08:34:59
*/

(function () {
  'use strict';
  angular
      .module('MyApp')
      .controller('AppCtrl', function() {
        this.userState = '';
        this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });
      });
})();
