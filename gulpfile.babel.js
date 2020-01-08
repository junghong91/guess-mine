import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer"; // webkit 과 같이 css파일을 모든 브라우저에서 호환 가능하게 바꿔준다.
import minifyCSS from "gulp-csso"; // style.css 파일에 코드를 압축해준다.
import del from "del";
import bro from "gulp-browserify";
import babel from "babelify";

sass.compilor = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js"
  }
};

const clean = () => del(["src/static"]);

// 파일이 어떤식으로 변경될지 리턴하는 함수
const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      bro({
        transform: [
          babel.configure({
            presets: ["@babel/preset-env"]
          })
        ]
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles); // paths.styles.watch 에 해당되는 파일이 있으면 styles 함수를 실행
  gulp.watch(paths.js.watch, js); // paths.js.watch 에 해당되는 파일이 있으면 js 함수를 실행
};

const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

export default dev;
