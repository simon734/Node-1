/**
 * Created by Cao Hong Phuoc on 6/18/2015.
 */
'use strict';

angular.module('categories').run(['Menus', function(Menus) {
    Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
    Menus.addSubMenuItem('topbar', 'categories', 'List Categories', 'categories');
    Menus.addSubMenuItem('topbar', 'categories', 'New Category', 'categories/create');
}])
