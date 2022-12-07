const {Router} = require('express')
const productos = require('./productos')
const carrito = require('./carrito')
const router = Router()

router.use('/api/productos',productos )
router.use('/api/carrito',carrito )

module.exports = router