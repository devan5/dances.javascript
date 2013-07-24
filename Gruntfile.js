module.exports = function(grunt){
	var
		oPath,

		projectName
	;

	oPath = {
		srcBase: "snap/",
		destBase: "dist/"
	};

	projectName = "dances.javascript";

	grunt.initConfig({
		buildData: grunt.file.readJSON("build.json"),
		concat   : {
			generic: {
				expand: true,
				cwd   : oPath.srcBase,
				src   : "<%= buildData.default %>",
				rename: function(){
					return oPath.destBase + projectName + ".js";
				}
			}
		},
		uglify   : {
			generic: {
				expand : true,
				options: {
					report   : "gzip",
					sourceMap: oPath.destBase + projectName + "-map.js"
				},
				src    : oPath.destBase + projectName + ".js",
				ext    : ".javascript.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", []);
	grunt.registerTask("build", ["concat:generic","uglify:generic"]);
};