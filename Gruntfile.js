module.exports = function(grunt){
	var
        oModule,
		distpaths = [],

		fs = require( "fs" )
	;

    oModule = {
	    name : "dances.javascript",
	    srcBase: "snap/",
		destBase: "dist/"
    };

	distpaths.push(
		oModule.destBase + oModule.name + "-map.js",
		oModule.destBase + oModule.name + ".min.js"
	);

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
					report          : "gzip",
					sourceMap       : oModule.destBase + oModule.name + "-map.js",
					sourceMappingURL: oModule.name + "-map.js"
				},

				src: oModule.destBase + oModule.name + ".js",
				ext: oModule.name.slice(oModule.name.lastIndexOf(".")) + ".min.js"
			}
		},
		clean: {
			generic: {
				src: oModule.destBase + oModule.name + "*.js"
			}
		}
	});

	grunt.registerTask( "dist", function() {
		// TODO 读取目录下的文件, 获取真实文件数量
		distpaths.forEach(function( filename ) {
			var
				text = fs.readFileSync(filename, "utf8")
			;

			// Modify map/min so that it points to files in the same folder;
			// see https://github.com/mishoo/UglifyJS2/issues/47
			if(/-map\.js$/.test(filename)){
				text = text.replace(/"dist\//g, "\"");
				fs.writeFileSync(filename, text, "utf-8");

			} else if ( /\.min\.js$/.test( filename ) ) {
				text += "\n" + "// Build @devan5 at " + grunt.template.today("yyyy-mm-dd, h:MM:ss TT");
				fs.writeFileSync(filename, text, "utf-8");
			}

		});

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", []);
	grunt.registerTask("build", [
		"clean:generic",
		"concat:generic",
		"uglify:generic",
		"dist"
	]);
};