/**
 * Created by pcao on 6/17/2015.
 */
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

        it('throws validation error when name is empty');

        it('throws validation error when name longer than 15 chars');

        it('throws validation error for duplicate category name');
    });
})
