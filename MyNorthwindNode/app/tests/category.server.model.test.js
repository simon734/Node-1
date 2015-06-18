/**
 * Created by pcao on 6/17/2015.
 */

process.env.NODE_ENV = 'test';
console.log(process.env.NODE_ENV);

require('../../config/mongoose')();

var should = require('should'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category');

describe('Category model', function() {
    describe('Saving', function() {
        it('saves new record', function(done) {
            var newCategory = new Category({
                name: 'tets'
            });
            newCategory.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function() {
            var newCategory = new Category({
                name: ''
            });
            newCategory.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('Name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 15 chars', function() {
            var newCategory = new Category({
                name: 'tets12345656565656565656565656'
            });
            newCategory.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('Name must be 15 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate category name', function() {
            var newCategory = new Category({
                name: 'test'
            });
            newCategory.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    after(function(done) {
        console.log('remove Category');
        Category.remove().exec();
        done();
    })
})
