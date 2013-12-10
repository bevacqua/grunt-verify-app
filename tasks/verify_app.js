/*
 * grunt-verify-app
 * https://github.com/bevacqua/grunt-verify-app
 *
 * Copyright (c) 2013 Nicolas Bevacqua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('verify_app', 'Verifies an application eventually listens on a given port', function () {
        var options = this.options({
            port: 3000,
            timeout: 10000,
            frequency: 1000,
            script: 'app'
        });

        var _ = require('lodash');
        var finder = require('process-finder');
        var spawn = require('child_process').spawn;
        var watcher = finder.watch({
            port: options.port,
            frequency: options.frequency
        });
        var done = this.async();

        console.log('[verify_app] Spawning node process to listen on port %s...', options.port);

        var env = _.clone(process.env);
        env.port = options.port;

        var app = spawn('node', [options.script], { stdio: 'inherit', env: env });

        watcher.on('listen', function (pid) {
            console.log('[verify_app] Detected process %s listening on port %s.', pid, options.port);
            console.log('[verify_app] Killing process...');
            app.kill('SIGHUP');
            done();
        });
    });

};
