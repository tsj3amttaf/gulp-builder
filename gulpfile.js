/*
    Долги:
        1. SVG картинки, копируются ли вместе с папкой Icons
        2. Sass и @import

    В Gulp 5 не работают плагины:
        1. gulp-fonter-2
        2. gulp-fontfacegen-mod
        3. imagemin-webp (как и на 4 версии, дело скорее всего в другом)
        4. 

    Запуск сборки для разработки, командой в терминале: gulp.
    (
        HTML
            1. Сборка в один файл из сегментов
               Документация: https://github.com/haoxins/gulp-file-include
            2. Обертка <picture> для <img>, оригинальный формат и webp
            3. Указывает версию для CSS и JS файлов, тем самым
               предотвращая кэширование на стороне клиента.
               Теперь не придётся просить чистить кэш у заказчика.
               Документация: https://www.npmjs.com/package/gulp-version-number
        
        CSS
            1. Препроцессор SASS
                1.1. Sourcemap
                1.2. Сжатие
            2. @support в CSS файл для webp изображений в CSS
            3. Группировка @media в итоговом CSS файле
            4. Префиксы для работы в старых браузерах.
               Документация: https://github.com/postcss/autoprefixer#options
            5. Смена имени style.css на style.min.css

        Images
            1. Конвертация в Webp
            2. Сжатие Png, Gif, Jpg и Jpeg
            3. Перемещение в папку dist:
                - jpg, jpeg, png, gif, webp, svg

        Fonts
            1. Конвертация из otf в ttf
            2. Конвертация из ttf в woff и woff2
            3. Запись шрифтов в файл src/scss/fonts.scss
                - удаляя fonts.scss, плагин начнет формировать список шрифтов
                  заного, в остальных случаях, запись в файл приостанавливается,
                  чтобы можно было спокойно редактировать fonts.scss без изменений
                  во время работы gulp

        Files
            Перемещение любых файлов в папке Files в готовую сборку

        Watcher
            Наблюдение за изменениями в файлах:
             - HTML
             - SCSS / CSS
             - JS
             - Images
             - Files

        Browser-sync
            Запуск сервера для просмотра изменений в файлах с помощью
            watcher в браузере:
             - HTML   (core/tasks/html.js)
             - CSS    (core/tasks/scss.js)
             - JS     (core/tasks/js.js)
             - Images (core/tasks/images.js)

        Оповещение об ошибках в коде:
             - HTML   (core/tasks/html.js)
             - CSS    (core/tasks/scss.js)
             - JS     (core/tasks/js.js)
             - Images (core/tasks/images.js)
             - Fonts  (core/tasks/fonts.js)

        
    )
*/

// Подключаю основной модуль
import gulp from 'gulp';

// Подключаю пути (непутю)
import { path } from './core/config/path.js';

// Импорт плагинов
import { plugins } from './core/config/plugins.js';

// Передаём значения в глобальную переменную, чтобы использовать её в любых документах нашей сборки
global.app = {

    /*
        Добавляет флаг к команде `gulp` в терминале, для сборки под продакшн.

        .. Добаляет в сборку webp (html, css, images), сжатие изображений,
        .. группировка @media в css, префиксы для браузеров в css, 
    */

    //isProd:  process.argv.includes( 'prod' ),

    // Можно в функциях использовать !isProd, но так проще читать код
    //isDev:   !process.argv.includes( 'prod' ),

    // Если нужно посмотреть на готовый результ под продакш с помощью сервера
    //watch:   process.argv[3] == '--server',

    // Упаковываем в ZIP
    //zip:     process.argv[3] == '--zip',

    path:    path,
    gulp:    gulp,
    plugins: plugins,
}

// Импорт задач
import { reset }    from './core/tasks/reset.js';
import { copy }     from './core/tasks/copy.js';
import { html }     from './core/tasks/html.js';
import { server }   from './core/tasks/server.js';
import { scss }     from './core/tasks/scss.js';
import { js }       from './core/tasks/js.js';
import { images }   from './core/tasks/images.js';
import { otfToTtf, ttfToWoffAndAll, fontStyle } from './core/tasks/fonts.js';
import { svg }      from './core/tasks/svg.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch( path.watch.files, copy );
    gulp.watch( path.watch.html, html );
    gulp.watch( path.watch.scss, scss );
    gulp.watch( path.watch.js, js );
    gulp.watch( path.watch.images, images );
    gulp.watch( path.watch.svg, svg );
}

/*
    Построение сценариев выполнения задач
*/

// Основные задачи
const mainTasks = gulp.series(

    otfToTtf,
    ttfToWoffAndAll,
    fontStyle,

    gulp.parallel(

        copy,
        html,
        scss,
        js,
        images
    ),

    svg
);

// Константа для выполнения сценария по умолчанию (gulp - в терминале)
const dev = gulp.series( reset, mainTasks, gulp.parallel( watcher, server ) );

/*
    Выполнение сценариев
*/

// Выполнение сценария по умолчанию (gulp - в терминале)
gulp.task( 'default', dev );