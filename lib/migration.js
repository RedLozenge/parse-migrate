/* global exports,require,__dirname */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');
var path = require('path');
var Parse = require('parse').Parse;

var MigrationDir = '';

function makePath(dir, name) {
    return process.cwd() + path.sep + path.join(dir, name + '.js');
}

function migrationTemplate(name) {
    var template = fs.readFileSync(__dirname + '/migrationtemplate.js.ejs',
                                  { encoding: 'utf8' });
    return _.template(template, {
        name: name
    });
}

var Migration = Parse.Object.extend('Migration', {
    getName: function() {
        return this.get('name');
    },
    setName: function(name) {
        return this.set('name', name);
    },
    getPath: function() {
        return makePath(MigrationDir, this.getName());
    },
    write: function() {
        fs.writeFileSync(this.getPath(), migrationTemplate(this.getName()));
    },
    up: function() {
        return require(this.getPath()).up.apply(this, arguments);
    }
}, {
    setMigrationDir: function(dir) {
        MigrationDir = dir;
    },
    withNameAndDate: function(name, date) {
        var dateString = moment(date).format('YYYYMMDDhhmmss');
        return Migration.withName(dateString + '-' + name);
    },
    withName: function(name) {
        var m = new Migration();
        m.setName(name);
        return m;
    }
});

exports.Migration = Migration;
