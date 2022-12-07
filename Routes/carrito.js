const {Router} = require('express')
const {postCarrito,deleteCarrito, postProdCarrito,getCarrito,deleteProdCarrito} = require('../Controllers/carrito')


const router = Router()


router.post('/',postCarrito)
router.delete('/:id?',deleteCarrito)
router.post('/:id?/productos',postProdCarrito)
router.get('/:id?/productos',getCarrito)
router.delete('/:id?/productos/:id_prod',deleteProdCarrito)
module.exports = router