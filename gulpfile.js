const gulp								= require('gulp')
		, mustache						= require('gulp-mustache')
		, sass								= require('gulp-sass')
		, csso								= require('gulp-csso')
		, cssbeautify					= require('gulp-cssbeautify')
		, autoprefixer 				= require('gulp-autoprefixer')
		, spritesmith					= require('gulp.spritesmith')
		, svgSprite						= require('gulp-svg-sprite')
		, svgmin							= require('gulp-svgmin')
		, rename							= require('gulp-rename')
		, fontgen							= require('gulp-fontgen')
		// , jshint							= require('jshint')
		, concat 							= require('gulp-concat')
		, uglify 							= require('gulp-uglify')
		, imagemin						= require('gulp-imagemin')
		, imageminJpegRecomp 	= require('imagemin-jpeg-recompress')
		, imageminPngquant 		= require('imagemin-pngquant')
		, browserSync					= require('browser-sync').create()
		// , ftp								= require('vinyl-ftp')
		, zip									= require('gulp-zip')
		, del									= require('del')
		;


// server + watching
gulp.task('server', function() {

  browserSync.init({
    server: "./",
		ui: false,
		notify: false,
		logLevel: 'debug',
		// reloadOnRestart: false,
		open: false
  });

});


// Templates
gulp.task('templates', () => {
	gulp.src("./templates/*.mustache")
		.pipe(mustache({
			
		},{ 
			extension: '.html' 
		}))
		.pipe(gulp.dest("./html"));
});


// Styles
gulp.task('styles', () => {
	gulp.src('./styles/main.scss')
		.pipe(sass({
			outputStyle: 'compressed'
			// use: rupture()
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		// .pipe(cssbeautify())
		.pipe(csso())
		.pipe(gulp.dest('./styles/'))
		// .pipe(browserSync.stream())
		// .pipe(rename('style.css'))
		// .pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
});


// Images sprite
gulp.task('sprite', () => {
	var spriteData = gulp.src('./images/icons/*.png').pipe(spritesmith({
		imgName: 'icons-sprite.png',
		imgPath: '../images/icons-sprite.png',
		padding: 4,
		cssName: '_icons-sprite.scss',
		cssFormat: 'css',
		algorithm: 'binary-tree'

// https://github.com/twolfson/gulp.spritesmith#padding
// {{#sprites}}
// .icon-{{name}}:before {
// 	display: block;
// 	background-image: url({{{escaped_image}}});
// 	background-position: {{px.offset_x}} {{px.offset_y}};
// 	width: {{px.width}};
// 	height: {{px.height}};
// }
// {{/sprites}}

	}));

	spriteData.img.pipe(gulp.dest('./images/'));

	return spriteData.css
		.pipe(gulp.dest('./styles/components/'))
		.pipe(browserSync.stream());
});


let DOMParser = require('xmldom').DOMParser;
let defs = new DOMParser().parseFromString('<defs></defs>');
let count = 0;

// Vector icons sprite
gulp.task('icons-vector', () => {
	return gulp.src('./images/icons-vector/*.svg')
		
		// minify svg
		.pipe(svgmin({ js2svg: { pretty: true } }))

		// replace spaces with hyphens, get rid of the "-icon" postfix
		.pipe(rename(function (path) {
				path.basename = path.basename
					.replace(/\s/g, '-')
					.replace(/-icon/, '');
			}))
		
		.pipe(svgSprite({
			mode: {
				symbol: {
					dest: '',
					example: true,
					sprite: 'icons-vector.svg'
				},
				inline: false
			},
		}))
		
		.pipe(gulp.dest('./images/'));
});


// Scripts
gulp.task('scripts', function() {
	var js = gulp.src([
			'./lib/jquery/dist/jquery.min.js',
			'./lib/swiper/dist/js/swiper.jquery.min.js',
			'./lib/magnific-popup/dist/jquery.magnific-popup.min.js',
			'./lib/EasyAutocomplete/dist/jquery.easy-autocomplete.min.js',
			'./scripts/main.js'
		])
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./scripts/'))
		.pipe(browserSync.stream());
});


// Font generator
gulp.task('fonts', () => {
	return gulp.src("./fonts/src/*.{ttf,otf}")
		.pipe(fontgen({
			dest: "./fonts/"
		}));
});


// Images optimization
gulp.task('optimize:images', () => {

	// content images
	gulp.src('./html/media-src/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imageminJpegRecomp({
				progressive: true,
				max: 80,
				min: 70
			}),
			imageminPngquant({ quality: '80' }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		], { verbose: true }))
		.pipe(gulp.dest('./html/media/'));

	// design images
	gulp.src('./images-src/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imageminJpegRecomp({
				progressive: true,
				max: 80,
				min: 70
			}),
			imageminPngquant({ quality: '80' }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		], { verbose: true }))
		.pipe(gulp.dest('./images/'));
});


// Pagespeed
// ...


// Clean
gulp.task('clean', () =>
	del([
		'./**/README.md',
		'!./node_modules/**'
	])
	.then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	})
);


// Make an archive
gulp.task('zip', () =>
	gulp.src([
			'**/*',
			'.bowerrc',
			'!./node_modules/**', 
			'!./node_modules',
			'!./screens/**', 
			'!./screens',
			'!./sftp-config.json',
			'!./package-lock.json',
			'!*/.DS_Store',
			'!__MACOSX/*'
		])
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('./'))
);


// Watch
gulp.task('watch', function(){

	// templates
	gulp.watch(
		'templates/**/*.mustache', {cwd: './'}, ['templates']
	);

	// styles
	gulp.watch(
		'styles/**/*.scss', {cwd: './'}, ['styles']
	);

	// scripts
	// gulp.watch(
	// 	['./scripts/*.js', '!./scripts/all.min.js'], ['scripts']
	// );
	gulp.watch(
		'./scripts/*.js').on('change', browserSync.reload
	);

	// html
	gulp.watch(
		['*.html', 'html/*.html'], {cwd: './'}).on('change', browserSync.reload
	);

	// php
	gulp.watch(
		'./**/*.php').on('change', browserSync.reload
	);

	// raster sprite
	gulp.watch(
		['images/icons/*.png'], {cwd: './'}, ['sprite']
	);

	// vector sprite
	gulp.watch(
		['images/icons-vector/*.svg'], {cwd: './'}, ['icons-vector']
	);

	// images
	gulp.watch(
		'./images/**/*').on('change', browserSync.reload
	);

	// media
	gulp.watch(
		'./media/**/*').on('change', browserSync.reload
	);

});


// Default
gulp.task('default', ['server', 'watch', 'templates', 'styles', 'sprite', 'icons-vector']);
