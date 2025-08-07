
/*
    Плагин для склейки html документа в один файл
    Документация и ссылка на ресурс https://github.com/haoxins/gulp-file-include
*/
import fileInclude from 'gulp-file-include';

/*
    Обертка <picture> для webp и оригинального формата

    <picture>
        <source srcset="img/1.webp" type="image/webp">
        <img src="img/1.png" alt="Test">
    </picture>
*/
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

/*
    Указывает версию для CSS и JS файлов, тем самым предотвращая кэширование
    на стороне клиента. Теперь не придётся просить чистить кэш у заказчика

    Полная документация на сайте:
    https://www.npmjs.com/package/gulp-version-number
*/
import versionNumber from 'gulp-version-number';

export const html = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.html )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Собираю html в один файл из сегментов
    .pipe( fileInclude() )

    // Обертка <picture> для webp и оригинального формата
    .pipe( webpHtmlNosvg() )

    // Добавляет версию css и js для заказчика
    .pipe(
        versionNumber( {
            'value': '%DT%', // Дата и время
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js'
                ]
            },

            'output': {
                'file': 'core/version.json'
            }
        } )
    )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.html ) )

    // Следим за изменениями в файлах и показываем их на лету
    .pipe( app.plugins.browsersync.stream() )
}