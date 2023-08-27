/* Event Routes
    /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

// Obtener eventos y pasar validacion de JWT
router.use(validateJWT);

router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validateFields,
    ],
    crearEvento,
);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Actualizar evento
router.delete('/:id', eliminarEvento);

module.exports = router;