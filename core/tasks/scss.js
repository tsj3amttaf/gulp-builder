
// SASS
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );

// Группируем @media
import groupCssMediaQueries from 'gulp-group-css-media-queries';

/*
    Добавляет префиксы для работы в старых браузерах.
    Настройки: https://github.com/postcss/autoprefixer#options
*/
import autoprefixer from 'gulp-autoprefixer';

// Добавляет @support для webp изображений в CSS
import webpCss from 'gulp-webp-css-fixed';

// Плагин для смены имени файла
import rename from 'gulp-rename';

export const scss = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.scss, {
        
        // sourcemap: app.isDev
        sourcemap: true
    } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Добавляет @support для webp изображений в CSS
    .pipe( webpCss() )

    // Группируем @media в итоговом CSS файле
    .pipe( groupCssMediaQueries() )

    // Добавляет префиксы для работы в старых браузерах
    .pipe(
        autoprefixer( {
            grid: true,
            overrideBrowserslist: [ 'last 3 version' ],
            cascade: true
        } )
    )

    // Osas
    .pipe(
        sass( {
            //style: 'compressed'
        } )
    )

    // Меняем название style.css на style.min.css
    .pipe( rename( { extname: '.min.css' } ) )

    // Собираем в CSS
    .pipe( app.gulp.dest( app.path.build.css ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}