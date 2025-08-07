export const copy = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.files )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.files ) )
}