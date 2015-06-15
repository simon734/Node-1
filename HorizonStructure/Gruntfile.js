module.exports = function(grunt) {
	grunt.initConfig({
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			test: {
				NODE_ENV: 'development'
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
				}
			},
			debug: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
				} 
			}
		},
		mochaTest: {
			src: 'app/tests/**/*.js',
			options: {
				reporter: 'spec',
				timeout: 15000
			}
		},
		jshint: {
			all: {
				src: ['server.js', 'config/**/*.js', 'app/**/*.js', 
				'public/js/*.js', 'public/modules/**/*.js']
			} 
		},
		'node-inspector': {
			debug: {}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon'],
				options: {
					logConcurrentOutput: true
				}
			},
			debug: { 
				tasks: ['nodemon:debug', 'node-inspector'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['env:dev', 'concurrent:dev']);
	grunt.registerTask('debug', ['env:dev', 'concurrent:debug']);
	grunt.registerTask('test', ['env:test', 'mochaTest']);
	grunt.registerTask('lint', ['jshint']);

};