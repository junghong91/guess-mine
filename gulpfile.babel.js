import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer"; // webkit 과 같이 css파일을 모든 브라우저에서 호환 가능하게 바꿔준다.
import minifyCSS from "gulp-csso"; // style.css 파일에 코드를 압축해준다.

sass.compilor = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  }
};

// 파일이 어떤식으로 변경될지 리턴하는 함수
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.watch, styles); // paths.styles.watch 에 해당되는 파일이 있으면 styles 함수를 실행
}

const dev = gulp.series([styles, watchFiles]);

export default dev;
