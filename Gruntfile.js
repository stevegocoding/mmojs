module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ["path/to/dir/one", "path/to/dir/two"],
            release: ["path/to/another/dir/one", "path/to/another/dir/two"]
        },
        nodeunit: {
            all: ['test/**/*_test.js']
        },

        uglify: {
            options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' },
            build: { src: }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit'); 

    grunt.registerTask('test', ['clean', 'nodeunit']);

}