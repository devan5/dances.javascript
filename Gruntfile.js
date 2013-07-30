module.exports = function(grunt){
	var
        oModule
	;

    oModule = {
	    name : "dances.javascript",
	    srcBase: "snap/",
		destBase: "dist/"
    };

	grunt.initConfig({
		pkg      : grunt.file.readJSON("package.json"),
		buildData: grunt.file.readJSON("build.json"),
		concat   : {
			generic: {
				options: {
					banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
					        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
							'\n'
				},
				expand : true,
				cwd    : oModule.srcBase,
				src    : "<%= buildData.default %>",
				rename : function(){
					return oModule.destBase + oModule.name + ".js";
				}
			}
		},
		uglify   : {
			generic: {
				expand : true,
				options: {
					banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
					        '<%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */' +
					        '\n',
					report   : "gzip",
					sourceMap: oModule.destBase + oModule.name + "-map.js"
				},
				src    : oModule.destBase + oModule.name + ".js",
//				ext    : ".javascript.min.js"
				ext    : (oModule.name.slice(oModule.name.lastIndexOf(".") + 1) + ".min.js")
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", []);
	grunt.registerTask("build", ["concat:generic","uglify:generic"]);
};