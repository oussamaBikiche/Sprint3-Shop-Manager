

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
async function fetchProducts() {
    const productse = await fetch("http://localhost:3000/api/products");
    console.log(productse.status);

    if (!productse.ok) {
        const problem = await productse.json();
        console.log(problem.message);
    }

    products = await productse.json();
    AfficherProducts(products);

    localStorage.setItem("products", JSON.stringify(products));
}
fetchProducts()


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
                <div id="stock" class="flex flex row  gap-12 ">
              <div class="flex flex row gap-5">
                <p id=" " >Stock:</p>
                <p id="product-stock" class=" ">  ${item.stock} </p>
                </div>
                <button id="acheter-button" data-id=${item.id} > Ajouter</button>
                </div>
                
            </div>`
    })

}
AfficherProducts(products)

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


async function filtrerCategorie() {


    const selectInput = document.getElementById('select-input');
    selectInput.addEventListener('change', async () => {

        let selecteInputValue = selectInput.value;
        Master()
    })
}

filtrerCategorie()



async function searchProduct() {
    const message = document.getElementById('message_empty_search')
    message.style.display = 'none'
    const searchInput = document.getElementById('search-input')
    searchInput.addEventListener('input', async () => {
        Master()

    })

}
searchProduct()




async function MaxPrice() {

    const priceInpt = document.getElementById('price-inptu');
    priceInpt.addEventListener('input', async () => {

        Master()

    })


}
MaxPrice()



const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', async () => {

    reset()

    async function reset() {

        const message = document.getElementById('message_empty_search')
        message.style.display = 'none'

        const response = await fetch("http://localhost:3000/api/reset", {
            method: "POST"
        });
        console.log(response.status)

        if (!response.ok) {
            const problem = await response.json();
            console.log("problem is : " + problem.message)
        }
        else {
            const reset = await response.json();

            const productse = await fetch("http://localhost:3000/api/products");
            products = await productse.json();



            const priceInpt = document.getElementById('price-inptu');
            const selectInput = document.getElementById('select-input');
            const searchInput = document.getElementById('search-input')

            selectInput.value = "";
            priceInpt.value = "";
            searchInput.value = "";

            AfficherProducts(products);
        }
    }
})



async function Master() {
    const params = new URLSearchParams()

    const priceInpt = document.getElementById('price-inptu');
    const selectInput = document.getElementById('select-input');
    const searchInput = document.getElementById('search-input');

    if (priceInpt.value != "") {
        params.append('maxPrice', +priceInpt.value);

    }
    if (selectInput.value != "") {
        params.append('categoryId', +selectInput.value);
    }

    if (searchInput.value != "") {
        params.append('search', searchInput.value)
    }

    const master1 = await fetch(`http://localhost:3000/api/products?${params.toString()}`)
    const master = await master1.json();

    AfficherProducts(master)
}
const productStock = document.getElementById("product-stock")
let Quantity = 0;
const carteBtn = document.getElementById('carte-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.getElementById('closebtn');

const product = document.getElementById('product');
const acheterButton = document.getElementById('acheter-button')
const productAjouter = document.getElementById('product_ajouter');
product.addEventListener('click', (e) => {
    if (e.target.id == 'acheter-button') {
        let butnId = e.target.dataset.id;

        let cartSelected = document.getElementById(butnId);
        let divStock = cartSelected.querySelector('#product-stock');
        //change valeur stock .. string ==> Number
        divStock.textContent = +divStock.textContent;
        if (divStock.textContent > 0) {
            divStock.textContent = +divStock.textContent - 1;
        }
        else
            return
        function AjouterProducts() {

            let product = products.find((element) => element.id == butnId)
console.log(product)



            let recherchePoduct = cart.find((element) => element.id === product.id);
            if (!recherchePoduct) {
                //add Quantity to product first of push him to cart and affiche in Panier   
                product.Quantity = 1;
                cart.push(product);

                localStorage.setItem("cart", JSON.stringify(cart))

                AfficherProductsInPanier()

            }
            else
                product.Quantity++




            localStorage.setItem("cart", JSON.stringify(cart))
            AfficherProductsInPanier()

        } AjouterProducts()
    }


})


const totalPanier = document.getElementById('total-panier');
function AfficherProductsInPanier() {

    //Afficher total Panier..
    totalPanier.textContent = "Total : " + cart.length;

    //l'affichage de empty message
    const emptyPanier = document.querySelector('#empty-panier');
    if (cart.length > 0) {
        emptyPanier.style.display = 'none';

    }
    else
        emptyPanier.style.display = 'block';

    productAjouter.innerHTML = "";
    cart.forEach((p) => {

        productAjouter.innerHTML += `<div id=${p.id} class="  border-4 border-be-8 border-gray-300 rounded-xl  px-5 py-2 bg-white  ">
                <div id="product_src" class="w-40 h-40">
                    <img src=http://localhost:3000${p.image} alt=" ">
                </div>

                <div id="product_name" class=" ">
                    <p class=" ">${p.name} </p>
                </div>

                <div id="prix" class=" ">
                    <p class=""> ${p.price}</p>
                </div>
                <div id="Quantity" class=" ">
                    <p class=""> Quantity : ${p.Quantity}</p>
                </div>
 
            </div>
            `

    })
}
AfficherProductsInPanier()


//function pour vider le panier
const viderPanier = document.getElementById('vider-panier')

viderPanier.addEventListener('click', () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = [];
    cart = localStorage.setItem("cart", JSON.stringify(cart));
})
//Afficher button vider ou non 
if(cart.length>0){
viderPanier.style.display='block';
}
else
    viderPanier.style.display='none';



carteBtn.addEventListener('click', async () => {

    cartModal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
})


//Afficher button confirmation ou non 
const confirmer=document.getElementById('confirmer');
if(cart.length>0){
    confirmer.style.display='block';
}
else{
     confirmer.style.display='none';
}
   

confirmer.addEventListener('click',()=>{
const formulair=document.getElementById('formulair');
formulair.style.display='block';
})

//Envoyer une requête POST /api/reservations par ligne du panier
const sendRequeteApi=document.getElementById('send-requete-api');
sendRequeteApi.addEventListener('click',()=>{

async function requete(){
cart.forEach(async (item)=>{

     const response=await fetch("http://localhost:3000/api/reservations",{
    method:"POST",
    headers:{"Content-type" : "Application/json"},
    body: JSON.stringify({
   productId: item.id,
    quantity: item.Quantity,
    customer: {
      name: document.getElementById('nom-input').value,
      email:document.getElementById('email-input').value,
      phone: document.getElementById("number-input").value,
      address:document.getElementById("address-input").value,
      city: document.getElementById("ville-input").value,
      postalCode: document.getElementById("postal-input").value 
    }
    })
})
console.log(response.status);
document.getElementById('nom-input').value="";
document.getElementById('email-input').value="";
document.getElementById("number-input").value="";
document.getElementById("address-input").value="";
document.getElementById("ville-input").value="";
 document.getElementById("postal-input").value="";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = [];
    cart = localStorage.setItem("cart", JSON.stringify(cart));
});
   


}
requete()

})
