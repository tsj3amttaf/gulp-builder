// Конвертация в webp
import webpImg from 'gulp-webp';

// Сжатие изображений
import imagemin from 'gulp-imagemin';

/*
    Есть ещё плагины для SVG и Webp, но они не работают.
    Я откатил imagemin с 9 версии до 8, и заработал плагин imagemin-gifsicle.
    При этом я так же перешел с gulp 5 на 4 версию, так что не понятно,
    что от чего зависит.
*/
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGifsicle from 'imagemin-gifsicle';

/*
    Выполз нюанс.
    Не стоит называть файлы своим расширением, например: jpg.jpg
    Всё ломается
*/

export const images = () => {

    /*
        Получаем путь до исходников
        {encoding: false} - предотвращает поломку изображений.
        Ресурс: https://stackoverflow.com/questions/78391263/copying-images-with-gulp-are-corrupted-damaged
    */
    return app.gulp.src( app.path.src.images, { encoding: false } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Images',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Обрабатываем только те изображения, которых нет в папке dist
    .pipe( app.plugins.newer( app.path.build.images ) )

    // Конвертируем png, jpeg, jpg и tiff в webp
    .pipe( webpImg() )

    // Переносим конвертированые webp в dist
    .pipe( app.gulp.dest( app.path.build.images ) )

    // // Определяем путь для исходных изображений
    .pipe( app.gulp.src( app.path.src.images, { encoding: false } ) )

    // // Предотвращает обработку уже обработанных изображений
    .pipe( app.plugins.newer( app.path.build.images ) )

    // // Сжимаем картинки
    .pipe(
        imagemin( [
            imageminPngquant( { quality: [ 0.6, 0.85 ] } ),
            imageminMozjpeg( { quality: 50 } ),
            imageminGifsicle( { optimizationLevel: 3 } ),
        ], {

            // Показывать прогресс сжатия каждого изображения
            verbose: true
        } )
    )

    // Перемещаем в папку с результатом, но это ещё не всё...
    .pipe( app.gulp.dest( app.path.build.images ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}