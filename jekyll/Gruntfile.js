'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*', './package.json').forEach(grunt.loadNpmTasks);

    //config
    var Config = {
        app : './',
        banner : '/* Production Build, Alfred Kam , Copyright 2014 */'
    };

    grunt.initConfig({
        config : Config,
        bower : {
            install : {}
        },
        watch : {
            sass : {
                files : [
                    '<%= config.app %>/assets/css/**/*.sass'
                ],
                tasks : ['sass:dev'],
                options : {
                    nospawn : true,
                    interrupt : false,
                    debounceDelay : 250,
                    event : ['all']
                }
            }
        },
        sass: {
            dev : {
                files: [{
                    expand : true,
                    src : ['<%= config.app %>/assets/css/**/*.sass'],
                    dest : '.',
                    ext : '.css'
                }]
            }
        },
        jekyll: {
            dev: {
                options: {
                    config: '_config.yml',
                },
                serve : true,
                drafts : true
            }
        }
    });

    grunt.registerTask('dev', [
        'sass:dev',
        // 'jekyll:dev',
        'watch:sass'
    ]);
};
