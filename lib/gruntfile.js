module.exports = function foo(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      watch: {
        scripts: {
          files: ["**/scripts/**/*.js", "!node_modules/**/*.js"],
          tasks: ["eslint"],
          options: {
            spawn: false,
          },
        },
      },
      eslint: {
        src: [
          "**/app/**/*.js",
          "!node_modules/**/*.js",
        ],
      },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("gruntify-eslint");

    // Default task(s).
    grunt.registerTask("default", ["eslint","watch"]);
  };
