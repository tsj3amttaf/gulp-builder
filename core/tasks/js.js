import webpack from 'webpack-stream';

export const js = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.js, {

        // Если нет флага --prod для gulp, то включим карту
        sourcemap: app.ifDev
    } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'JavaScript',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    .pipe(
        webpack( {

            // Добавляем условия для разработки
            mode: app.ifProd ? 'production' : 'development',

            // Меняем название scripts.js на scripts.min.js
            output: {
                filename: 'scripts.min.js'
            }
        } )
    )

    // Собираем в src/js
    .pipe( app.gulp.dest( app.path.build.js ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}