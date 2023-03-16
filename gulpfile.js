const babelify = require("babelify");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const fs = require("fs");
const gulp = require("gulp");
const rename = require("gulp-rename");
const source = require("vinyl-source-stream");
const ts = require("gulp-typescript");
const tsify = require("tsify");
const uglify = require("gulp-uglify");

const distPath = "dist";

gulp.task("clean", (cb) => {
  console.log("Cleaning...");
  fs.rm(distPath, { recursive: true, force: true }, cb);
});

gulp.task("bundle", () => {
  console.log("Bundle files...");
  return browserify({ standalone: "AsyncReplace" })
    .add("src/index.ts")
    .plugin(tsify)
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      global: true,
    })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest(distPath))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest(distPath));
});

gulp.task("d.ts", () => {
  console.log("Declaration files...");
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        emitDeclarationOnly: true,
        declaration: true,
      })
    )
    .pipe(gulp.dest(distPath));
});

gulp.task("default", gulp.series("clean", "bundle", "d.ts"));

gulp.task("watch", () => gulp.watch("src/**/*.ts", gulp.task("default")));
