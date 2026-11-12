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
                    <img src=http://localhost:3000${item.image} alt=image of product  >
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

    //     filtrerCategorie()
    //     function filtrerCategorie() {
    //         let productsFiltred;

    //         const selectInput = document.getElementById('select-input');
    //         let selecteInputValue = selectInput.value;

    //         selectInput.addEventListener('change', () => {

    //             if (selecteInputValue == "All" || selecteInputValue == "") {
    //                 AfficherProducts(products)
    //             }

    //             productsFiltred = products.filter((product) => product.categoryName == selectInput.value)
    //             AfficherProducts(productsFiltred)
    //         })


    //     }


    //     function searchProduct() {
    //         const message = document.getElementById('message_empty_search')
    //         message.style.display = 'none'
    //         const searchInput = document.getElementById('search-input')
    //         searchInput.addEventListener('input', () => {

    //             let searchValue = searchInput.value.toLowerCase();
    //             let productSearch = products.filter((index) => index.name.toLowerCase().includes(searchValue))
    //             if (productSearch.length == 0) {
    //                 message.style.display = 'block'
    //             }
    //             else
    //                 message.style.display = 'none'
    //             AfficherProducts(productSearch)

    //         })

    //     }
    //     searchProduct()

    //     function filtrerPrice(){
    // const selectPrice=document.getElementById('select-price');
    // let tabPrice=[...products];
    // selectPrice.addEventListener('change',()=>{

    // if(selectPrice.value=="default"){
    // AfficherProducts(products);

    // }
    //  if(selectPrice.value=="high to low"){
    //     tabPrice.sort((a,b)=>{
    //         return b.price-a.price
    //     })
    //     AfficherProducts(tabPrice);
    // }
    // if(selectPrice.value=="low to high"){ 
    //     tabPrice.sort((a,b)=>{
    //         return -b.price-a.price
    //     })
    //     AfficherProducts(tabPrice);
    // }




    // })

    // }
    // filtrerPrice()


    filtrerCategorie()
    async function filtrerCategorie() {


        const selectInput = document.getElementById('select-input');
        selectInput.addEventListener('change', async () => {

            let selecteInputValue = selectInput.value;
            if (selecteInputValue == "All" || selecteInputValue == "") {
                let productsApi = await fetch("http://localhost:3000/api/products");
                let productsApI = await productsApi.json()

                AfficherProducts(productsApI)

            }

            if (selecteInputValue == "Electronics") {
                let productsApi = await fetch("http://localhost:3000/api/products?categoryId=2");
                let productsApI = await productsApi.json()

                AfficherProducts(productsApI)
            }

            if (selecteInputValue == "Books") {
                let productsApi = await fetch("http://localhost:3000/api/products?categoryId=1");
                let productsApI = await productsApi.json()

                AfficherProducts(productsApI)
            }

            if (selecteInputValue == "Kitchen") {
                let productsApi = await fetch("http://localhost:3000/api/products?categoryId=3");
                let productsApI = await productsApi.json()

                AfficherProducts(productsApI)
            }

            if (selecteInputValue == "Outdoor") {
                let productsApi = await fetch("http://localhost:3000/api/products?categoryId=4");
                let productsApI = await productsApi.json()

                AfficherProducts(productsApI)
            }

        })
    }


    async function searchProduct() {
        const message = document.getElementById('message_empty_search')
        message.style.display = 'none'
        const searchInput = document.getElementById('search-input')
        searchInput.addEventListener('input', async () => {

            let searchValue = searchInput.value.toLowerCase();
            let productSearch1 = await fetch(`http://localhost:3000/api/products?search=${searchValue}`)
            let productSearch = await productSearch1.json();
            if (productSearch.length == 0) {
                message.style.display = 'block'
            }
            else
                message.style.display = 'none'
            AfficherProducts(productSearch)

        })

    }
    searchProduct()

async function MaxPrice() {
   
  const priceInpt = document.getElementById('price-inptu');
    priceInpt.addEventListener('input', async() => {
      
    let priceInptValue = +priceInpt.value;
       
        let priceApi = await fetch(`http://localhost:3000/api/products?maxPrice=${priceInptValue}`)
        let Maxprice = await priceApi.json();
        AfficherProducts(Maxprice);
    })
   

}
 MaxPrice()
}


testApi()
