async function testApi() {
    const productse = await fetch("http://localhost:3000/api/products");
    console.log(productse.status);

    if (!productse.ok) {
        const problem = await productse.json();
        console.log(problem.message);
    }

    const products = await productse.json();
    console.log(products)
   AfficherProducts()
   
    function AfficherProducts() {
        const productSection = document.getElementById('product')
        products.forEach((product) => {

            productSection.innerHTML += `<div id=${product.id} class="  border-4 border-be-8 border-gray-300 rounded-xl  px-5 py-2 bg-white  ">
                <div id="product_src" class="w-40 h-40">
                    <img src=http://localhost:3000${product.image} alt=" ">
                </div>
                <div id= ${product.categoryId}>
                    <p class="border  rounded-xl w-20 bg-blue-400 text-center">  ${product.categoryName}   </p>
                </div>
                <div id="product_name" class=" ">
                    <p class=" "> ${product.name} </p>
                </div>
                <div id="description_product" class="">
                    <p class=""> ${product.description} </p>
                </div>
                <div id="prix" class=" ">
                    <p class=""> ${product.price} DH</p>
                </div>
            </div>`
        })

 }





}
testApi()
