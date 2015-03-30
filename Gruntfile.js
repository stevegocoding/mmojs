module.exports = function(grunt) {
 
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          name: 'home',
          findNestedDependencies: true,
          baseUrl: 'js',
          mainConfigFile: 'js/home.js',
          include: 'require.js',
          optimize: 'none',
          out: "build/home.js"
        }
      }
    }
  });

  grunt.registerTask('default', ['requirejs']);
};
