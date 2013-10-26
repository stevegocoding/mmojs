module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            production: {
                options: {
                    name: 'home',
                    findNestedDependencies: true,
                    baseUrl: 'js',
                    mainConfigFile: 'js/home.js',
                    out: "build/home.js"
                }
            }
        },
        uglify: {
            options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' }
            // build: { src: }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['requirejs']);

};