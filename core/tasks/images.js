// Импортирую плагины
import webpImg from 'gulp-webp';
import imagemin from 'gulp-imagemin';

/*
    Есть ещё плагины, для Gif, SVG, Webp, но они работают только если
    откатывать imagemin до 7 версии.
*/
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

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

    // // Предотвращает сборку уже обработанных изображений
    .pipe( app.plugins.newer( app.path.build.images ) )

    // // Сжимаем картинки
    .pipe(
        imagemin( [
            imageminPngquant( { quality: [ 0.6, 0.85 ] } ),
            imageminMozjpeg( { quality: 50 } )
        ], {
            verbose: true
        } )
    )

    // Перемещаем в папку с результатом, но это ещё не всё...
    .pipe( app.gulp.dest( app.path.build.images ) )

    /*
        Получаем путь к svg исходникам
        и копируем в папку с результатом
    */

    .pipe( app.gulp.src( app.path.src.svg ) )
    .pipe( app.gulp.dest( app.path.build.images ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}