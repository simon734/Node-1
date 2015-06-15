'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category');

/**
 * Unit tests
 */
describe('Category Model', function () {

    describe('Saving', function () {
        it('saves new record', function (done) {
            var category = new Category({
                name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            category.save(function (err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function (done) {
            var category = new Category({
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            category.save(function(err, save) {
                should.exist(err);
                err.errors.name.message.should.equal('name can not be blank');
                done();
            });
        });

        it('throws validation error when name longer than 15 chars', function(done) {
            var category = new Category({
                name: 'Soft drinks, coffees, teas, beers, and ales'
            });

            category.save(function(err, save) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 15 chars in length or less');
                done();
            });
        });

    });

});