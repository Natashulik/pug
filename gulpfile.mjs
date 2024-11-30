import gulp from "gulp";
import sass from "gulp-sass";
import dartSass from "sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";
import clean from "gulp-clean";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import imagemin from "gulp-imagemin";

const { src, dest, watch, series, parallel } = gulp;
const bs = browserSync.create();
const compileSass = sass(dartSass);

const paths = {
  pug: "./src/pug/*.pug",
  scss: "./src/scss/**/*.scss",
  js: "./src/js/**/*.js",
  images: "./src/assets/images/**/*",
  icons: "./src/assets/icons/**/*",
  fonts: "./src/assets/fonts/**/*",
  dist: "./dist",
};

export const cleanDist = () =>
  src(paths.dist, { read: false, allowEmpty: true }).pipe(clean());

export const html = () =>
  src(paths.pug)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.dist))
    .on("end", () => console.log("HTML task completed"));

export const styles = () =>
  src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(compileSass().on("error", compileSass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${paths.dist}/css`));

export const scripts = () =>
  src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${paths.dist}/js`));

export const images = () =>
  src(paths.images)
    .pipe(imagemin())
    .pipe(dest(`${paths.dist}/assets/images`));

export const icons = () =>
  src(paths.icons)
    .pipe(imagemin())
    .pipe(dest(`${paths.dist}/assets/icons`));

export const fonts = () =>
  src(paths.fonts).pipe(dest(`${paths.dist}/assets/fonts`));

export const serve = () => {
  bs.init({
    server: {
      baseDir: paths.dist,
    },
  });
  watch("./src/pug/**/*.pug", html).on("change", bs.reload);
  watch("./src/**/*.scss", styles).on("change", bs.reload);
  watch(paths.js, scripts).on("change", bs.reload);
};

export const build = series(
  cleanDist,
  parallel(html, styles, scripts, images, icons, fonts)
);

export default series(build, serve);
