const { Router } = require('express'); // Declarar funciones
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router(); // Función, no una clase

// CONTROLADORES
// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], crearUsuario);
// nombre.not().isEmpty() -> funcion propia de express validator; aseguramos que no venga vacio

// Login de Usuario
// Primero es el path, Middlewares en segundo argumento, en tercero controlador de la ruta
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

// Validar y Revalidar Token
router.get('/renew', validarJWT, revalidarToken);

// Para exportar
module.exports = router;