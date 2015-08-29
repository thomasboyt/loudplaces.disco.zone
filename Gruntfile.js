module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    secret: grunt.file.readYAML('_private.yml'),

    clean: ['_site/'],

    rsync: {
      options: {
        host: '<%= secret.rsync_host %>',
        args: ['--verbose', '--compress'],
        recursive: true
      },

      site: {
        options: {
          src: '_site/',
          dest: '<%= secret.rsync_dest %>',
        }
      },

      public: {
        options: {
          src: 'public/',
          dest: '<%= secret.rsync_dest %>',
        }
      }
    },

    exec: {
      build: 'nite-flights build --optimize'
    }

  });

  grunt.registerTask('deploy', ['clean', 'exec:build', 'rsync']);
};
