/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
angular.module('users').factory('Authentication', function() {
    this.user = window.user;

    return {
        user: this.user
    }
})
