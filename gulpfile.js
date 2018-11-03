const gulp       =require("gulp");
const concat     =require("gulp-concat");
const uglify     =require("gulp-uglify");
const watch      =require("gulp-watch");
const cleanCSS      =require("gulp-clean-css");
const sass     =require("gulp-sass");
const htmlreplace     =require("gulp-html-replace");




/*flytta jpg filer*/ 
gulp.task("sendjpg", function(){
    return gulp.src("src/img/*.JPG")
     .pipe(gulp.dest("pub/img"))
 });

/*flytta png filer*/ 
gulp.task("sendpng", function(){
    return gulp.src("src/img/*.png")
     .pipe(gulp.dest("pub/img"))

 });

/*join and minimize js*/

gulp.task("joinminjs", function(){

    return gulp.src("src/js/*.js")
    .pipe(concat("main.min.js"))
   // .pipe(uglify())
    .pipe(gulp.dest("pub/js"));
});


/*join and minimize css*/

gulp.task("joinmincss", function(){

    return gulp.src("src/css/*.css")
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("pub/css"));
});


//change sass to css
gulp.task('changesass', function () {
    return gulp.src('src/css/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('src/css'));
  });


/*change link name */

gulp.task('changecssname', function() {
    gulp.src('src/*.htm')
      .pipe(htmlreplace({
          'css': 'css/style.min.css',
          'js': 'js/main.min.js'
      }))
      .pipe(gulp.dest('pub'));
  });



/*contoll changes */

gulp.task("watcher",function(){
    watch("src/js/*.js",function(){

        gulp.start("joinminjs");
    });
    

    watch("src/*.php",function(){

        gulp.start("changecssname");
    });
    watch("src/*.htm",function(){

        gulp.start("changecssname");
    });
    watch("src/css/*.scss",function(){

        gulp.start("changesass");
    });


 
    watch("src/css/*.css",function(){

        gulp.start("joinmincss");
    });

    
    watch("src/img/*.JPG",function(){

        gulp.start("sendjpg");
    });

    
    watch("src/img/*.png",function(){

        gulp.start("sendpng");
    });
});


gulp.task("default",["joinminjs","joinmincss", "sendjpg", "sendpng",  "changecssname","changesass",  "watcher"], function(){});