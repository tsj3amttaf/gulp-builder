
// Импортируем модуль чтобы получить имя папки проекта
//import * as nodePath from 'path';

// Получаем название папки в которой находится этот проект (builder)
// const rootFolder = nodePath.basename( nodePath.resolve() );

// Получаем имя папки "dist" с результатом сборки
const buildFolder = './dist';

// Получаем имя папки с исходными файлами для сборки
const srcFolder   = './src';

// Объявление путей (тут главное кавычки правильные поставить, чтобы маски заработали ``)
export const path = {

    // Собрать в папке "dist"
    build: {
        html:       `${buildFolder}/`,
        files:      `${buildFolder}/files/`,
        css:        `${buildFolder}/css/`,
        js:         `${buildFolder}/js/`,
        images:     `${buildFolder}/img/`,
        fonts:      `${buildFolder}/fonts/`,
    },

    // Исходники из папки "src"
    src: {
        html:   `${srcFolder}/*.html`,
        files:  `${srcFolder}/files/**/*.*`,
        scss:   `${srcFolder}/scss/style.scss`,
        js:     `${srcFolder}/js/scripts.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        //svg:    `${srcFolder}/img/**/*.svg`,
        fonts:  `${srcFolder}/fonts/*.{ttf,otf}`,
        // svgIco: `${srcFolder}/icons/*.svg`,
    },

    /*
        Обновлять в браузере на лету.

        Нужно запомнить на будущее и не тратить 2 часа в пустую пытаясь настроить
        плагины сжатия... {jpg,jpeg,png,gif,webp} вот тут не должно быть пробелов
        между расширениями... блинб
    */

    watch: {
        html:   `${srcFolder}/**/*.html`,
        files:  `${srcFolder}/files/**/*.*`,
        scss:   `${srcFolder}/scss/**/*.scss`,
        js:     `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        // svgIco: `${srcFolder}/icons/**/*.svg`
    },

    clean:       buildFolder,
    buildFolder: buildFolder,
    srcFolder:   srcFolder,
    // rootFolder:  rootFolder,
}