const {promises: fs} = require('fs');


// si la url contiene un id busco el producto y lo muestro, si no es asi muestro todos los productos
const getProductos = async (req,res)=>{
    try{
        const {id} = req.params
        const prod = await fs.readFile('./data/productos.txt','UTF-8') 
        const prodJson = JSON.parse(prod) 
        if(id){
          const prodSelect=prodJson.find((producto)=>producto.id==parseInt(id))
          if(!prodSelect){
            res.send("No se encuentra el producto")
                
            }else{
                res.json(prodSelect)
            }
          
        }else{
            res.json(prodJson) 
        }
    }catch(err){
        console.log("error",err)
    }
}
//Basandome en el ID mayor quue tengo posteo un nuevo producto con ese id+1
const postProductos = async (req,res)=>{
    // controlo que esten todos los datos y luego prosigo
    if(req.body.Code != undefined && req.body.Name != undefined && req.body.Stock != undefined &&  req.body.Description != undefined && req.body.Price != undefined && req.body.thumbnail != undefined ){        
        
        let nProd = req.body

        try{
            const product = await fs.readFile('./data/productos.txt','UTF-8') 
            const prodJson = JSON.parse(product) 
            const idMayor  = Math.max(...prodJson.map(producto => producto?.id))
            nProd ={...nProd, id: idMayor +1, Date: new Date().toString()}
            prodJson.push(nProd)
            fs.writeFile('./data/productos.txt',JSON.stringify(prodJson,null,2))
            .then(()=> res.json(nProd) )
        }
        catch(err){
            console.log("error",err)
        }
    }else(
        res.send("Debe completar todos los campos del producto")
    )
}

//Actualizo producto usando el id de la url y los datos del body
const putProductos = async (req,res)=>{
    if(req.body.Code != undefined && req.body.Name != undefined && req.body.Stock != undefined &&  req.body.Description != undefined && req.body.Price != undefined && req.body.thumbnail != undefined ){
        const {id} = req.params //guardo el id del producto a buscar
        let actProd = {...req.body , id,Date: new Date().toString()} //guardo y uno los datos del producto , el id y la fecha
        try{//busco el producto si no existe aviso, si exite creo un nuevo  array y reescribo el txt
        
            const prod = await fs.readFile('./data/productos.txt','UTF-8') 
            const prodJson = JSON.parse(prod) 
            const prodSelect=prodJson.find((producto)=>producto.id==parseInt(id))
            if(!prodSelect){
                res.send("No se encuentra el producto")
                
                }else{
                    const nArray = prodJson.filter((producto)=>producto.id!=parseInt(id))
                    nArray.push(actProd)
                    fs.writeFile('./data/productos.txt',JSON.stringify(nArray,null,2))
                        .then(()=> res.json(nArray) )
                }   
            
        }
        catch(err){
            console.log("error",err)
        }
    }else(
        res.send("Debe completar todos los campos del producto")
    )
}
    

// partiendo del id guardado de la url busco el producto si esxiste con un 
//filter creo un nuevo array sin el y actaulizo el txt
const deletProductos = async (req,res)=>{
    try{
        const {id} = req.params
        const prod = await fs.readFile('./data/productos.txt','UTF-8') 
        const prodJson = JSON.parse(prod) 
        if(id){
          const prodSelect=prodJson.find((producto)=>producto.id==parseInt(id))
          if(!prodSelect){
            res.send("No se encuentra el producto")
                
            }else{
                const nArray = prodJson.filter((producto)=>producto.id!=parseInt(id))
                fs.writeFile('./data/productos.txt',JSON.stringify(nArray,null,2))
                    .then(()=> res.json(nArray) )
            }
          
        
        }
    }catch(err){
        console.log("error",err)
    }
}


module.exports = {getProductos,postProductos,deletProductos,putProductos}

