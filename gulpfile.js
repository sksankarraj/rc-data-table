const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js');
const webpackExampleConfig = require('./webpack.example.config.js');
const sass = require('gulp-sass');


// Build the main library
gulp.task('build', function () {
	console.log("Building!");

	webpack(webpackConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// output options
		}));
		console.log("Build complete.");
	});
	return gulp.src('./src/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
});

// Build the example
gulp.task('example', function (done) {
	console.log("Building examples!");

	webpack(webpackExampleConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// output options
		}));
		gulp.src('./dist/example.js')
			.pipe(gulp.dest('./example/js/dist'));
		gulp.src('./dist/example-alt.js')
			.pipe(gulp.dest('./example-alt/js/dist'));
		console.log("Build complete.");
	});
	done();
});

gulp.task('watch', gulp.series('build', function () {
	gulp.watch('**/*.js*', ['build']);
}));
