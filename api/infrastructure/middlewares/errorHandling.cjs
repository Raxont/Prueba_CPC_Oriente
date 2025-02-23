/**
 * Middleware para manejar errores de formato JSON en las solicitudes.
 * 
 * Si se detecta un error de sintaxis en el cuerpo de la solicitud (por ejemplo, JSON mal formado),
 * se envía una respuesta con un código de estado 400 y un mensaje de error descriptivo.
 * 
 * @param {Object} err - Objeto de error generado por Express.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.jsonParseErrorHandler = (err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		// Registra el error en la consola para depuración.
		console.error('Error de sintaxis JSON:', err.message);
		
		// Retorna una respuesta HTTP con estado 400 y mensaje de error.
		return res.status(400).json({
			message: 'Formato JSON no válido. Compruebe los datos e inténtelo de nuevo.',
		});
	}
	
	// Si no es un error de JSON, pasa al siguiente middleware.
	next();
};
