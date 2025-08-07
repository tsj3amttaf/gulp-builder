import webpack from 'webpack-stream';

export const js = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.js, {

        // Если нет флага --prod для gulp, от включим карту
        //sourcemap: app.isDev
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

            // Добавляем условия для флага --prod
            //mode: app.isProd ? 'production' : 'development',
            mode: 'development',

            // Меняем название scripts.js на scripts.min.js
            output: {
                filename: 'scripts.min.js'
            }
        } )
    )

    // Собираем в JS
    .pipe( app.gulp.dest( app.path.build.js ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}