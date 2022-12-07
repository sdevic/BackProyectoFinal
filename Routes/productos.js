const {Router} = require('express')
const {getProductos,postProductos, deletProductos,putProductos} = require('../Controllers/productos')
const verifyAdmin = require('../middleware/index')
const router = Router()

router.get('/:id?',getProductos)
router.post('/',verifyAdmin, postProductos)
router.delete('/:id?',verifyAdmin, deletProductos)
router.put('/:id?',verifyAdmin, putProductos)
module.exports = router