// generated on 2017-02-04 using generator-webapp 2.4.0

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const path = require('path');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const pug = require('gulp-pug');
const mozjpeg = require('imagemin-mozjpeg');
const changed = require('gulp-changed');

var dev = false;

const svgSymbols = require('gulp-svg-symbols');

// Png Sprites
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

// postCss
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer');

// gulp-notify
const notify = require("gulp-notify");

// gulp-html-prettify
const prettify = require("gulp-html-prettify");

// Postcss plugins
const plugins = [
  // mqpacker({
  //   sort: function (a, b) {
  //     return b - a;
  //   }
  // }),
  autoprefixer({
    browsers: ['> 5%', 'last 2 versions', 'Firefox ESR']
  })
];

function errorHandler() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({title: 'Compile Error', message: '<%= error.message %>'}).apply(this, args);
  this.emit('end');
}

function renderHtml(onlyChanged) {
  return gulp.src(['app/templates/[^_]*.pug']).pipe($.plumber({errorHandler: errorHandler})).pipe($.if (onlyChanged, changed('app/', {extension: '.html'})) ).pipe(pug()).pipe(prettify()).pipe(gulp.dest('app/')).pipe(reload({stream: true}));
  }

  gulp.task('pug', function() {
    return renderHtml();
  });

  gulp.task('pug:changed', function() {
    return renderHtml(true);
  });

  gulp.task('templates', () => {
    return gulp.src('app/templates/*./ug').pipe($.plumber()).pipe(pug()).pipe(prettify()).pipe(gulp.dest('app')).pipe(reload({stream: true})).on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}));
  });

  gulp.task('css', () => {
    return gulp.src('app/sass/*.sass').pipe($.plumber()).pipe($.if (dev, $.sourcemaps.init()) ).pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: [path.join(__dirname, 'node_modules')]
      })).on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"})).pipe(postcss(plugins)).pipe($.if (dev, $.sourcemaps.write()) ).pipe(gulp.dest('app/css/')).pipe(reload({stream: true}))
      });

      gulp.task('css-dist', () => {
        return gulp.src('app/css/*.css').pipe(gulp.dest('dist/css/'));
      });

      gulp.task('js-copy', () => {
        return gulp.src('app/js/*.js')
          .pipe(gulp.dest('dist/js/'));
      });

      // TODO: fix issue when all files change on reload
      gulp.task('js', () => {
        return gulp.src('app/js/*.js')
        .pipe($.plumber())
        .pipe($.if (dev, $.sourcemaps.init()) )
        .pipe($.if (dev, $.sourcemaps.write('.')) )
        .pipe(gulp.dest('app/js/'))
        .pipe(reload({stream: true}))
        .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}));
          });

          function lint(files) {
            return gulp.src(files).pipe($.eslint({fix: true})).pipe(reload({stream: true, once: true})).pipe($.eslint.format()).pipe($.if (!browserSync.active, $.eslint.failAfterError()) );
            }

            gulp.task('svg-sprite', () => {
              return gulp.src('app/img/svg/*.svg').pipe(svgSymbols({
                templates: [
                  ['default-svg']
                ]
              })).pipe(gulp.dest('app/'));
            });

            gulp.task('lint', () => {
              return lint('app/js/*.js').pipe(gulp.dest('app/js'));
            });

            gulp.task('lint:test', () => {
              return lint('test/spec/**/*.js').pipe(gulp.dest('test/spec'));
            });

            gulp.task('html', [
              'css', 'js'
            ], () => {
              return gulp.src('app/*.html').pipe($.useref({
                searchPath: ['app', '.']
              })).pipe(gulp.dest('dist'));
            });

            gulp.task('img', () => {
              return gulp.src('app/img/**/*')
                // .pipe($.imagemin([
                //   $.imagemin.gifsicle(),
                //   mozjpeg({quality: 100}),
                //   $.imagemin.optipng(),
                //   $.imagemin.svgo()
                // ], {verbose: true}))
                .pipe(gulp.dest('dist/img'));
            });

            gulp.task('fonts', () => {
              return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {}).concat('app/fonts/**/*')).pipe($.if (dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')) );
              });

              gulp.task('sprites', () => {
                var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({imgName: 'sprites.png', cssName: 'sprites.sass', imgPath: '../img/sprite/sprites.png', padding: 5}));
                var imgStream = spriteData.img.pipe(gulp.dest('app/img/sprite/'));
                var cssStream = spriteData.css.pipe(gulp.dest('app/sass/helpers/'));
                return merge(imgStream, cssStream);
              });
              gulp.task('extras', () => {
                return gulp.src([
                  'app/*', '!app/*.html', '!app/sass/', '!app/templates/'
                ], {dot: true}).pipe(gulp.dest('dist'));
              });

              gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

              gulp.task('serve', () => {
                runSequence([
                  'clean', 'wiredep'
                ], [
                  'pug', 'pug:changed', 'css', 'js', 'fonts'
                ], () => {
                  browserSync.init({
                    notify: false,
                    port: 9000,
                    server: {
                      baseDir: [
                        '.tmp', 'app'
                      ],
                      routes: {
                        '/bower_components': 'bower_components'
                      }
                    }
                  });

                  gulp.watch(['app/*.html', 'app/img/**/*', '.tmp/fonts/**/*']).on('change', reload);

                  gulp.watch('app/templates/**/_*.pug', ['pug']);
                  gulp.watch('app/templates/**/[^_]*.pug', ['pug:changed']);
                  gulp.watch('app/sass/**/*.sass', ['css']);
                  gulp.watch('app/sass/**/*.scss', ['css']);
                  gulp.watch('app/js/**/*.js', ['js']);
                  gulp.watch('app/fonts/**/*', ['fonts']);
                  gulp.watch('bower.json', ['wiredep', 'fonts']);
                });
              });

              gulp.task('serve:dist', ['default'], () => {
                browserSync.init({
                  notify: false,
                  port: 9000,
                  server: {
                    baseDir: ['dist']
                  }
                });
              });

              gulp.task('serve:test', ['js'], () => {
                browserSync.init({
                  notify: false,
                  port: 9000,
                  ui: false,
                  server: {
                    baseDir: 'test',
                    routes: {
                      '/js': '.tmp/js',
                      '/bower_components': 'bower_components'
                    }
                  }
                });

                gulp.watch('app/js/**/*.js', ['js']);
                gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
                gulp.watch('test/spec/**/*.js', ['lint:test']);
              });

              // inject bower components
              gulp.task('wiredep', () => {
                gulp.src('app/*.html').pipe(gulp.dest('app'));
              });

              gulp.task('build', [
                'pug',
                'pug:changed',
                'html',
                'svg-sprite',
                'img',
                // 'sprites',
                'js-copy',
                'css-dist',
                'fonts',
                'extras'
              ], () => {
                return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
              });

              gulp.task('default', () => {
                return new Promise(resolve => {
                  dev = false;
                  runSequence([
                    'clean', 'wiredep'
                  ], 'build', resolve);
                });
              });
