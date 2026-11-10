async function testApi() {
    const productse = await fetch("http://localhost:3000/api/products");
    console.log(productse.status);

    if (!productse.ok) {
        const problem = await productse.json();
        console.log(problem.message);
    }

    const products = await productse.json();
    console.log(products)
    AfficherProducts(products)

    function AfficherProducts(itemsToDisplay) {

        const productSection = document.getElementById('product')
        productSection.innerHTML = ""
        itemsToDisplay.forEach((item) => {

            productSection.innerHTML += `<div id=${item.id} class="  border-4 border-be-8 border-gray-300 rounded-xl  px-5 py-2 bg-white  ">
                <div id="product_src" class="w-40 h-40">
                    <img src=http://localhost:3000${item.image} alt=" ">
                </div>
                <div id= ${item.categoryId}>
                    <p class="border  rounded-xl w-20 bg-blue-400 text-center">  ${item.categoryName}   </p>
                </div>
                <div id="product_name" class=" ">
                    <p class=" "> ${item.name} </p>
                </div>
                <div id="description_product" class="">
                    <p class=""> ${item.description} </p>
                </div>
                <div id="prix" class=" ">
                    <p class=""> ${item.price} DH</p>
                </div>
            </div>`
        })

    }

    filtrerCategorie()
    function filtrerCategorie() {
        let productsFiltred;
       
        const selectInput = document.getElementById('select-input');
 let selecteInputValue=selectInput.value;

        selectInput.addEventListener('change', () => {

            if (  selecteInputValue== "All" ||  selecteInputValue == "" ) {
                AfficherProducts(products)
            }
            
            productsFiltred = products.filter((product) => product.categoryName == selectInput.value)
            AfficherProducts(productsFiltred)
        })


    }




}
testApi()
