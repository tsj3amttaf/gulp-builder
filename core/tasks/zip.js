
import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {

    //  Удаляем архив с тем же названием, если есть
    deleteAsync( `./${app.path.rootFolder}.zip` );

    // Получаем путь до всех исходников
    return app.gulp.src( `./${app.path.buildFolder}/**/*.*` )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Zip',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Упаковываем в архив с названием папки проекта
    .pipe( zipPlugin( `${app.path.rootFolder}.zip` ) )

    // Переносим в корень проекта
    .pipe( app.gulp.dest( './' ) )
}