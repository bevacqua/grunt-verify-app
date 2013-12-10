/*
 * grunt-verify-app
 * https://github.com/bevacqua/grunt-verify-app
 *
 * Copyright (c) 2013 Nicolas Bevacqua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    registerMultiTask('verify', 'Verifies an application eventually listens on a given port', function () {
        var options = this.options({
            port: 3000,
            timeout: 10000,
            frequency: 1000
        });

        var _ = require('lodash');
        var finder = require('process-finder');
        var spawn = require('child_process').spawn;
        var done = this.async();
        var port = Number(input);
        var watcher = finder.watch(port);

        console.log('Spawning node process to listen on port %s...', port);

        var env = _.clone(process.env);
        env.port = port;

        var app = spawn('node', ['app'], { stdio: 'inherit', env: env });

        watcher.on('listen', function(pid){
            console.log('Detected process %s listening on port %s.', pid, port);
            console.log('Killing process...');
            app.kill('SIGHUP');
            done();
        });
    });

};
