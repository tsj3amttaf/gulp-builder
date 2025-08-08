
// Конвертация в Ttf и Woff
import fonter from 'gulp-fonter-2';

// Конвертация в Woff2
import ttf2woff2 from 'gulp-ttf2woff2';

// Создание fonts.scss с записями шрифтов
import fontface from 'gulp-fontfacegen-mod';

/*
    Конвертирует otf в ttf и оставляет конвертированный ttf в src папке.
    Переносит в dist не требующие конвертации woff и woff2
*/

export const otfToTtfAndAll = () => {

    // Получаем путь до исходников в папке src/fonts
    return app.gulp.src( app.path.src.fonts )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Fonts',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Конвертируем в из otf в ttf
    .pipe( fonter( { formats: [ 'ttf' ] } ) )

    /*
        Кладём в туже папку где и брали (src/fonts) для дальнейшей конвнертации
        в woff и woff2
    */
    .pipe( app.gulp.dest( `${app.path.srcFolder}/fonts/` ) )

    // Ищем шрифты, которые не нужно конвертировать
    .pipe( app.gulp.src( `${app.path.srcFolder}/fonts/*.{woff,woff2}`, {} ) )

    // Переносим шрифты которые не нужно конвертировать
    .pipe( app.gulp.dest( app.path.build.fonts ) )
}

/*
    Задача вынесена отдельно, так как важно сохранить порядок выполнения.
    Предыдущая задача конвертирует otf в ttf и помещает в ту же папку src/fonts,
    а эта задача берет этот конвертированный ttf и превращает его в woff и в woff2.
*/
export const ttfToWoff = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.fonts )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Fonts',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Конвертируем в woff
    .pipe( fonter( { formats: ['woff'] } ) )

    // Выгружаем в папку с результатом
    .pipe( app.gulp.dest( app.path.build.fonts ) )

    // Ищем файлы для следующей конвертации из ttf в woff2
    .pipe( app.gulp.src( app.path.src.fonts ) )

    // Конвертируем в woff2
    .pipe( ttf2woff2() )

    // Выгружаем в папку с результатом dist/fonts
    .pipe( app.gulp.dest( app.path.build.fonts ) )
}

/*
    Создаём файл fonts.scss для подлючения его в основной файл style.scss.
    Плагин записывает найденные шрифты в папке dist/fonts в файл fonts.scss
*/
export const fontStyle = () => {

    // dist/fonts
    return app.gulp.src( `${app.path.buildFolder}/fonts/*.{woff,woff2}`, {} )

    .pipe(
        fontface( {
            // src/scss
            filepath: `${app.path.srcFolder}/scss`,
            filename: 'fonts.scss',

            // dist/fonts
            destpath: `${app.path.buildFolder}/fonts`,
            rewrite: 'skip'
        } )
    )
}