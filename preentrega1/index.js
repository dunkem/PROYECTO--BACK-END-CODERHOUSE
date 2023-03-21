class ProductManager {
    constructor (){
        this.products = [];
    }
    addProduct(item) {
        const products = this.getProducts();
        const addSuccessfully = 'Product has been add successfully'
        if(products.length){
            if(products.find( element => element.code === item.code )){
                return console.log('This products has already been added!!')
            } else {
                let lastIndex = products.length - 1;
                let lastId = products[lastIndex].id;
                item.id = lastId + 1;
                let id = item.id;
                this.products.push(item);
                console.log(addSuccessfully)
                return id;
            }

        } else {
            item.id = 1;
            this.products.push(item);
            console.log(addSuccessfully)
        }
        }
    getProducts() {
        const products = this.products;
        return products;
        
    }
    getProductById(id){
        const products = this.getProducts();
        let productsById;
        const notFound = 'Not Found'
        products.map(el => {
            el.id === id && (productsById = el);
        });
        return productsById ? console.log(productsById) : console.log(notFound);
    }
}

const productsManager = new ProductManager();

console.log(productsManager.getProducts())

productsManager.addProduct({
    title:'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

console.log(productsManager.getProducts());

productsManager.addProduct({
    title:'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});


productsManager.getProductById(2);

