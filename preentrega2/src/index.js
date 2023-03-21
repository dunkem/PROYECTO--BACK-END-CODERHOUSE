import fs from 'fs';


const successfully = 'has been successfully';
const errorNotFound = 'Not Found';

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async readingJSON(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async fileSaving(item){
        try {
            const dataJSON = JSON.stringify(item);
            await fs.promises.writeFile(this.path, dataJSON);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async addProducts(item){
        try {
            const products = await this.readingJSON();
            if(products.length){
                if(products.find( element => element.code === item.code )){
                    return console.log('This products has already been added!!')
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.fileSaving(products);
                    console.log('Product add',successfully)
                    return id;
                }
            } else {
                item.id = 1;
                products.push(item);
                this.fileSaving(products);
                console.log('Product add',successfully)
            }
    
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await this.readingJSON();
            return console.log(product);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id){
        try {
            const product = await this.readingJSON();
            let productById;
            product.map(item => {
                item.id === id && (productById = item);
            });
            return productById ? console.log(productById) : console.log(errorNotFound);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(item){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(product => product.id === item.id)
            if(productId >= 0){
                product[productId] = item
                await this.fileSaving(product);
                console.log('Update', successfully);
            } else {
                console.log(errorNotFound);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(item => item.id === id);
            if(productId >= 0) {
                product.splice(productId, 1);
                await this.fileSaving(product);
                console.log('Product delete', successfully);
            } else {
                console.log(errorNotFound);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
}

const products = new ProductManager('./data/products.json');

// await products.getProducts();

// await products.addProducts({
//     title:'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc123',
//     stock:25
// });
// await products.getProducts();

// await products.addProducts({
//     title:'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc1234',
//     stock:25
// });

// await products.addProducts({
//     title:'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc12asdasdasd',
//     stock:25
// });

// await products.addProducts({
//     title:'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc12asdadASD34',
//     stock:25
// });
// await products.getProductsById(2);

// await products.updateProduct({
//     title:'producto prueba con update',
//     description:'Este es un producto prueba con update',
//     price:15000,
//     thumbnail:'Sin imagen con update',
//     code:'hola123',
//     stock:100,
//     id: 2
// });

// await products.getProducts();

await products.deleteProduct(3);

await products.getProducts();