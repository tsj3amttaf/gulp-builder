// Очищаем папку "dist" перед новой сборкой
import { deleteAsync } from 'del';

export const reset = () => {
	return deleteAsync( app.path.clean );
};