/*
    Запуск сборки для разработки, командой в терминале: gulp.
    (HTML, CSS, Images, Files, Watcher, Browser-sync, Fonts, )
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
import { reset }  from './core/tasks/reset.js';
import { copy }   from './core/tasks/copy.js';
import { html }   from './core/tasks/html.js';
import { server } from './core/tasks/server.js';
import { scss }   from './core/tasks/scss.js';
import { js }     from './core/tasks/js.js';
import { images } from './core/tasks/images.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch( path.watch.files, copy );
    gulp.watch( path.watch.html, html );
    gulp.watch( path.watch.scss, scss );
    gulp.watch( path.watch.js, js );
    gulp.watch( path.watch.images, images );
    // gulp.watch( path.watch.svgIco, svg );
}

/*
    Построение сценариев выполнения задач
*/

// Основные задачи
const mainTasks = gulp.series( /*fonts,*/ gulp.parallel( copy, html, scss, js, images ), /*svg*/ );

// Запуск сервера и наблюдателя
const serverWatcher = gulp.parallel( watcher, server );

// Константа для выполнения сценария по умолчанию (gulp - в терминале)
const dev = gulp.series( reset, mainTasks, serverWatcher );

/*
    Выполнение сценариев
*/

// Выполнение сценария по умолчанию (gulp - в терминале)
gulp.task( 'default', dev );