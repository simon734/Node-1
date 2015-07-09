/**
 * Created by Cao Hong Phuoc on 7/9/2015.
 */
'use strict';
 
 
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.119/gear');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        default: 'New Post'
    },
    text: String,
    published: {
        type: Boolean,
        default: false
    }
})
mongoose.model('Article', articleSchema);

console.log(mongoose.model('Asdsrticle'))