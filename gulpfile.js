
// Подключаю основной модуль
import gulp from 'gulp';

// Подключаю пути (непутю)
import { path } from './core/config/path.js';

// Импорт плагинов
import { plugins } from './core/config/plugins.js';

/*
    Передаём значения в глобальную переменную, чтобы использовать их в
    любых документах нашей сборки.
*/

global.app = {

    // terminal: gulp prod (сборка под продакшн)
    ifProd: process.argv.includes( 'p' ),

    // terminal: gulp
    ifDev: !process.argv.includes( 'p' ),

    // Упаковываем в ZIP
    ifZip: process.argv[3] == '--zip',

    // Запускаем browser-sync
    ifServer: process.argv[3] == '--server',

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
import { zip }      from './core/tasks/zip.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch( path.watch.files,  copy );
    gulp.watch( path.watch.html,   html );
    gulp.watch( path.watch.scss,   scss );
    gulp.watch( path.watch.js,     js );
    gulp.watch( path.watch.images, images );
    gulp.watch( path.watch.svg,    svg );
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

/*
    Выполнение сценариев
*/

// Выполнение сценария по умолчанию (в терминале: gulp)
gulp.task(

    'default',

    gulp.series(

        reset,
        mainTasks,
        gulp.parallel(
            
            watcher,
            server
        )
    )
);

/*
    Небольшой костыль, чтобы сократить количество кода.
    if внутри task отказывается работать, даже с помощью плагина gulp-if
*/

function ifCond(cb) {

    if( app.ifZip ) {

        zip()

    } else if( app.ifServer ) {

        watcher(),
        server()

    }

    cb();
}

/*
    Выполнение сценария для продакшена (в терминале: gulp p)
    Упаковка в zip архив для продакшена (в терминале: gulp p --zip)
    Запуск сервера со сборкой для продакшена (в терминале: gulp p --server)
*/

gulp.task(

    'p', 

    gulp.series(

        reset,
        mainTasks,
        ifCond
    )
);