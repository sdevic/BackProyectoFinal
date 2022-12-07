const {promises: fs} = require('fs');
const { send } = require('process');


const getCarrito = async (req,res)=>{
    try{
        
        const {id} = req.params
        const cart = await fs.readFile('./data/carritos.txt','UTF-8') 
        const cartJson = JSON.parse(cart) 
        if(id){
            const cartSelect=cartJson.find((carrito)=>carrito.id==parseInt(id))
            if(!cartSelect){
              res.send("No se encuentra el carrito")
            }else{
              
                res.json(cartSelect.Productos)    
                
            } 
        }     
    }
    catch(err){
        console.log("error",err)
    }     
}
//Simplemente me fijo si el txt esta vacio, si es asi le asigno id uno le genero el date y creo un objeto vacio
//sino busco el ultimo id, le sumo uno y le genero el dato , luego reescribo el txt
const postCarrito = async (req,res)=>{
    try{
        const cart = await fs.readFile('./data/carritos.txt','UTF-8') 
        const cartJson = JSON.parse(cart) 
        let idMayor= 0
        if(cartJson.length > 0){
            idMayor  = Math.max(...cartJson.map(carrito => carrito?.id))
        }
       
            const nCart = {id: idMayor+1 ,Date: new Date().toString()}
            cartJson.push(nCart)
            fs.writeFile('./data/carritos.txt',JSON.stringify(cartJson,null,2))
            res.json(idMayor+1)
        
    }
    catch(err){
        console.log("error",err)
    }     
}
//Busco el carrito por el id, si existe, le hago un filter seleccionando todos los que tengan 
//id diferente y reescribo el txt
const deleteCarrito = async (req,res)=>{
    try{
        const {id} = req.params
        const cart = await fs.readFile('./data/carritos.txt','UTF-8') 
        const cartJson = JSON.parse(cart) 
        if(id){
            const cartSelect=cartJson.find((carrito)=>carrito.id==parseInt(id))
            if(!cartSelect){
              res.send("No se encuentra el carrito")
                  
              }else{
                  const nArray = cartJson.filter((carrito)=>carrito.id!=parseInt(id))
                  fs.writeFile('./data/carritos.txt',JSON.stringify(nArray,null,2))
                      .then(()=> res.json(nArray) )
              }
            
          
          }
    }
    catch(err){
        console.log("error",err)
    }     
}   

// Recibo todos los parametros traigo los carritos y los productos los encuentro con un find 
//los uno en una nueva variable, filtro la base de los carritos sin el carrito seleccionado 
//y luego pusheo en nuevo carrito
//controle que este bien puesto el id y que exista tanto el carrito como el producto
// para esta instancia no pidieron un contador de productos, asi que si el producto ya existe se va a agregar de todas maneras
const postProdCarrito = async (req,res)=>{
    try{
        const {id} = req.params
        const idProd = req.body    
        const cart = await fs.readFile('./data/carritos.txt','UTF-8') 
        const cartJson = JSON.parse(cart) 
        const cartSelect=cartJson.find((carrito)=>carrito.id==parseInt(id))
        const prod = await fs.readFile('./data/productos.txt','UTF-8') 
        const prodJson = JSON.parse(prod) 
        let prodSelect=prodJson.find((producto)=>producto.id==parseInt(idProd.id))
        
        if(cartSelect.Productos == undefined){
            cartSelect.Productos =[]
        }
        if(req.body.id != undefined && cartSelect !=undefined && prodSelect != null) {
            
           
           
            
                cartSelect.Productos.push(prodSelect) 
                const nArray = cartJson.filter((carrito)=>carrito.id!=parseInt(id))
                nArray.push(cartSelect)
                fs.writeFile('./data/carritos.txt',JSON.stringify(nArray,null,2))
                res.send("Se agrego el producto solicitado")
            

            }else if(req.body.id != undefined && cartSelect ==undefined) {
                res.send("El Carrito indicado no existe")
            }else {
                res.send("El Producto indicado no existe")
            }
        
       
    
    }catch(err){
        console.log("error",err)
    }     
} 
//Considerando que no se pidio acumulador para sumar cada producto
// en este caso, si solicita el borrado del producto se borrara cada vez que este el producto repetido
const deleteProdCarrito = async (req,res)=>{
    try{
        const id =parseInt(req.params.id)
        const idProd =parseInt(req.params.id_prod)
        const cart = await fs.readFile('./data/carritos.txt','UTF-8') 
        const cartJson = JSON.parse(cart) 
        const cartSelect=cartJson.find((carrito)=>carrito.id==id)
        let nArrayCarritos=cartJson.filter((carrito)=>carrito.id!=id)
        console.log(id)
       
      
       
        if(cartSelect == undefined){
            res.send("el carrito no existe")
        }else{
            const productSelect=cartSelect.Productos.find((producto)=>producto.id==idProd)
            if(productSelect == undefined){
            res.send("el producto no existe")
            }else{
                
                const nProd= cartSelect.Productos.filter((producto)=>producto.id!=idProd)
                let nCart = {id: id ,Date: new Date().toString()}
                nCart.Productos = []
                nCart.Productos.push(nProd)
                nArrayCarritos.push(nCart)
               
                fs.writeFile('./data/carritos.txt',JSON.stringify(nArrayCarritos,null,2))
                res.send(`se elimino el producto ${productSelect.Name}`)
            }
        }
        
    }catch(err){
        console.log("error",err)
    }     
} 
//Exporto las funciones
module.exports = {postCarrito,deleteCarrito,postProdCarrito,getCarrito,deleteProdCarrito}