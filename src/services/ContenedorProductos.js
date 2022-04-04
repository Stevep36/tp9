export default class ContenedorProductos{
    
    constructor(){
        this.productos = [];
    }
    
    getAllProducts = () => {
        return this.productos
    }

    getProducto = (id) => {
        return this.productos [id];
    }

    saveProduct = (product) => {
        this.productos.push(product);
    }

    getLength = () => {
        return this.productos.length;
    }
}