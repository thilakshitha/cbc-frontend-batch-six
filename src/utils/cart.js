// [
//     {
//         productId : "12345",
//         quantity : 2,
//         price : 29.99,
//         name : "sample product",
//         altNames : ['sample Item','Example Product'],
//         image : 'https://example.com/sample_product.jpg'

//     }
// ]

export function getCart(){
    let cartString = localStorage.getItem("cart")

    if(cartString == null){
        cartString="[]"
        localStorage.setItem("cart",cartString)
    }

    const cart = JSON.parse(cartString);
    return cart;
}

export function addToCart(product,qty){
    const cart = getCart()

    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId == product.productId;
    })

    if(existingProductIndex == -1){
        cart.push({
            productId: product.productId,
            quantity: qty,
            price: product.price,
            name:product.name,
            altNames:product.altNames,
            image:product.images[0]
        })
        localStorage.setItem("cart",JSON.stringify(cart));
    }else{
        const newQty = cart[existingProductIndex].quantity + qty;
        if(newQty<=0){
            const newCart = cart.filter((item,index)=>{
                return index !== existingProductIndex;
            })
            localStorage.setItem("cart",JSON.stringify(newCart));
        }else{
            cart[existingProductIndex].quantity = newQty;
            localStorage.setItem("cart",JSON.stringify(cart));
        }
    }
}

export function getTotal(){
    const cart = getCart()
    let total = 0;
    cart.forEach((item=>{
        total+= item.quantity*item.price
    }))
    return total;
}