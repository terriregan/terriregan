'use strict';

module.exports = function (grunt) {
   
    require('time-grunt')(grunt);
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        // Watch Config
        watch: {
            scripts: {
                files: [
                    'public/scripts/**/*.js',
                    '!public/scripts/modernizr.js',
                    '!public/scripts/vendor/**/*.js'
                ],
                tasks: ['jshint']
            },
            compass: {
                files: ['public/styles/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            express: {
                files: [
                    'app.js',
                    'routes/**/*.js',
                    '!**/node_modules/**',
                    '!Gruntfile.js'
                ],
                tasks:  ['jshint', 'express:dev'],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            }
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            },
            server: ['.tmp']
        },

        trimtrailingspaces: {
            main: {
                src: [
                    'public/scripts/*.js',
                    'public/scripts/modules/*.js',
                    'app.js',
                    'routes/*js'
                ],
                options: {
                    filter: 'isFile',
                    encoding: 'utf8',
                    failIfTrimmed: true
                }
            }
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
               // 'Gruntfile.js',
               // 'app.js',
               // 'routes/**/*.js',
                'public/scripts/**/*.js',
                '!public/scripts/modernizr.js',
                '!public/scripts/vendor/**/*.js'
            ]
        },

        modernizr: {
            dist: {
                'devFile' : 'public/scripts/vendor/modernizr/modernizr.js',
                'outputFile' : 'dist/public/scripts/modernizr.js',
                'extra' : {
                    'shiv' : true,
                    'printshiv' : false,
                    'load' : false,
                    'mq' : false,
                    'cssclasses' : true
                },
                'uglify' : true,
                'tests' : [],
                'parseFiles' : true,
                'matchCommunityTests' : false,
                'customTests' : []
            }
        },

        // RequireJS Config
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'public/scripts/common.js',
                    baseUrl: 'public/scripts',
                    dir: 'dist/public/scripts',
                    removeCombined: true,
                    logLevel: 0,
                    modules: [
                        {
                            name: 'common',
                        },
                        {
                            name: 'gsap',
                            exclude: ['common']
                        },
                        {
                            name: 'hero',
                            exclude: ['gsap']
                        }
                    ],
                    paths: {
                        jquery: 'empty:'
                    }
                }
            }
        },

        // Compass Config
        compass: {
            options: {
                cacheDir: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    sassDir: 'public/styles/sass',
                    cssDir: 'public/styles/css',
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    sassDir: 'public/styles/sass',
                    cssDir: 'public/styles/css',
                    environment: 'production'
                }
            }
        },

        // Express Config
        express: {
            dev: {
                options: {
                    script: 'app.js',
                    port: 5000
                }
            },
            prod: {
                options: {
                    script: 'app.js',
                    node_env: 'production'
                }
            }
        },

        // Open Config
        open: {
            site: {
                path: 'http://localhost:5000',
                app: 'Google Chrome'
            }
        },

        // Imagemin Config
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'dist/public/images'
                }]
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/public/images'
                }]
            }
        },

        // CSSmin config
        cssmin: {
            dist: {
                files: {
                    'dist/public/styles/css/mq-base.css': [ 'public/styles/css/mq-base.css' ],
                    'dist/public/styles/css/no-mq-base.css': [ 'public/styles/css/no-mq-base.css' ]
                }
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'public',
                    dest: 'dist/public',
                    src: [
                        '*.{ico,png,txt}',
                        'images/**/*.{png,jpg,svg}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: 'dist/views',
                    src: '**/*.hbs'
                }]
            }
        }
    });


    // Register Tasks
    // Workon
    grunt.registerTask('workon', 'Start working on this project.', [
       // 'jshint',
        'compass:dev',
        'express:dev',
        'open:site',
        'watch'
    ]);


    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'
    ]);
    

    // Build
    grunt.registerTask('build', 'Build production ready public and views.', [
        'clean:dist',
        'svgmin',
        'imagemin',
        'cssmin:dist',
        'modernizr:dist',
        'requirejs',
        'copy:dist'
    ]);

     // Compile and Deploy
    grunt.registerTask('heroku:production', 'Compile and deploy.', [
        'clean:dist',
        'svgmin',
        'imagemin',
        'cssmin:dist',
        'modernizr:dist',
        'requirejs',
        'copy:dist'
    ]);
};