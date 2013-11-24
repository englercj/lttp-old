module.exports = function(grunt) {
    var glob = require('glob'),
        source = glob.sync('js/**/*.js').filter(function(v) { return v.indexOf('vendor') === -1; }),
        testPort = grunt.option('port-test') || 9002,
        banner = [
            '/**',
            ' * @license',
            ' * <%= pkg.longName %> - v<%= pkg.version %>',
            ' * Copyright (c) 2012, Chad Engler',
            ' * <%= pkg.homepage %>',
            ' *',
            ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
            ' *',
            ' * <%= pkg.longName %> is licensed under the <%= pkg.license %> License.',
            ' * <%= pkg.licenseUrl %>',
            ' */',
            ''
        ].join('\n');

    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            dist: 'build',
            docs: 'docs',
            src: 'js',
            test: 'test',
            less: 'less'
        },
        files: {
            mainJs: 'main',
            mainLess: '<%= dirs.less %>/main.less',
            devJs: '<%= dirs.dist %>/js/<%= pkg.name %>.js',
            distJs: '<%= dirs.dist %>/js/<%= pkg.name %>.min.js',
            devCss: '<%= dirs.dist %>/css/<%= pkg.name %>.js',
            distCss: '<%= dirs.dist %>/css/<%= pkg.name %>.min.js'
        },
        jshint: {
            src: source.concat('Gruntfile.js'),
            options: {
                jshintrc: '.jshintrc'
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dev: {
                src: ['<%= files.devJs %>'],
                dest: '<%= files.devJs %>'
            },
            dist: {
                src: ['<%= files.distJs %>'],
                dest: '<%= files.distJs %>'
            }
        },
        connect: {
            dev: {
                options: {
                    port: testPort,
                    base: './',
                    keepalive: true
                }
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.longName %>',
                description: '<%= pkg.description %>',
                version: 'v<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                logo: 'http://www.gravatar.com/avatar/e60ee7bcb380d1ab175251890046b3d8.png',
                options: {
                    paths: '<%= dirs.src %>',
                    exclude: 'vendor',
                    outdir: '<%= dirs.docs %>'
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: '<%= dirs.src %>',
                    name: '<%= files.mainJs %>',
                    out: '<%= files.devJs %>',
                    wrap: true
                }
            }
        },
        less: {
            options: {
                paths: ['<%= dirs.less %>']
            },
            dev: {
                files: {
                    '<%= files.devCss %>': '<%= files.mainLess %>'
                }
            },
            dist: {
                options: {
                    yuicompress: true
                },
                files: {
                    '<%= files.distCss %>': '<%= files.mainLess %>'
                }
            }
        },
        watch: {
            options: {
                interrupt: true,
                spawn: false
            },
            src: {
                files: ['<%= dirs.src %>/**/*.js'],
                tasks: ['build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //setup shortcut tasks
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['requirejs:dist']);
    grunt.registerTask('docs', ['yuidoc:compile']);
    grunt.registerTask('dev', ['build', 'watch:src']);
};