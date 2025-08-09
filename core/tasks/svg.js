
/*
    Очень много разных настроек, ознакомиться можно здесь:
    https://github.com/svg-sprite/gulp-svg-sprite
*/

import svgSprite from 'gulp-svg-sprite';

export const svg = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.svg )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SVG',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Объединяем svg изображения в один файл
    .pipe(
        svgSprite( { mode: { stack: {
            sprite: `../svg/icons.svg`,

            /*
                Формируется html файл в папке img/svg/stack для предпросмотра svg
                изображений. Так же указывается условие выполнения этой задачи:
                если сборка для разработки (terminal: gulp), то этот файл
                формируется, если нет, то формируется лишь svg файл.
            */

            example: app.ifDev // gulp: true, gulp --prod: false
        } } } )
    )

    // Собираем в папку dist/img/svg
    .pipe( app.gulp.dest( app.path.build.images ) )
}