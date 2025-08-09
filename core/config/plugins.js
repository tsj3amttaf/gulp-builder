
/*
    Плагины вынесены в отдельный документ, чтобы использовать их
    в разных задачах с использованием минимум кода, так проще.
    
    Например не придётся каждый раз в разных задачах (html.js и images.js)
    писать импорт этих плагинов. Я просто все эти плагины импортирую здесь
    и объявлю константу, чтобы вызывать их в любом месте задач одной
    строчкой кода.
*/

// Обработка ошибок
import plumber from 'gulp-plumber';

// Сообщения об ошибках (уведомления)
import notify from 'gulp-notify';

// Авотобновление в браузере при изменении в файлах в папке src
import browsersync from 'browser-sync';

// Обрабатываем только те файлы, которых нет в папке dist
import newer from 'gulp-newer';

// Добавляет логику/условия для выполнения задач (например dev или production)
import ifPlugin from 'gulp-if';

// Экспортируем плагины
export const plugins = {

    plumber:     plumber,
    notify:      notify,
    browsersync: browsersync,
    newer:       newer,
    if:          ifPlugin
}