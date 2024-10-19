const products = [
    {
        id: 1,
        name: "Printed Shirt",
        originalPrice: 2099,
        discountedPrice: 1399,
        description: "New arrived printed shirt with Cuban color and wonderful material.",
        mainImage: "pro1.jpg.jpg",
        subImages: ["pro1sub2.jpg", "pro1sub.jpg", "pro1sub3.jpg"]
    },
    {
        id: 2,
        name: "Flower Printed Shirt",
        originalPrice: 2599,
        discountedPrice: 1299,
        description: "Stylish flower printed shirt perfect for casual wear.",
        mainImage: "pro2.jpg.jpg",
        subImages: ["sub21.jpg", "sub22.jpg", "sub23.jpg"]
    },


    {
        id: 3,
        name: "Flower Printed Shirt",
        originalPrice: 2199,
        discountedPrice: 1649,
        description: "Stylish flower printed shirt perfect for casual wear.",
        mainImage: "pro3.jpg.jpg",
        subImages: ["sub41.jpg", "sub42.jpg", "sub43.jpg"]
    },


    {
        id: 4,
        name: "Tshirt",
        originalPrice: 1299,
        discountedPrice: 1039,
        description: "Stylish tshirt perfect for casual wear.",
        mainImage: "pro4.jpg",
        subImages: ["sub31.jpg", "sub32.jpg", "sub34.jpg"]
    },

    {
        id: 5,
        name: "Trouser",
        originalPrice: 2899,
        discountedPrice: 1885,
        description: "comfortable trouser for use",
        mainImage: "pro5.jpg",
        subImages: ["pro2sub1.jpg", "pro2sub2.jpg", "pro2sub3.jpg"]
    },

    {
        id: 6,
        name: "Full sleeve blazer",
        originalPrice: 5999,
        discountedPrice: 2999,
        description: "in formal you look amazing",
        mainImage: "pro6.jpg",
        subImages: ["sub61.jpg", "sub62.jpg", "sub63.jpg", "sub64.jpg"]
    },

    {
    id: 7,
    name: "shorts",
    originalPrice: 1899,
    discountedPrice: 1519,
    description: "comfortable shorts",
    mainImage: "pro7.jpg",
    subImages: ["sub81.jpg", "sub82.jpg","sub83.jpg"]
},

{
    id: 8,
    name: "short sleeve blazer",
    originalPrice: 4999,
    discountedPrice: 3499,
    description: "formal give you confidence",
    mainImage: "pro8.jpg",
    subImages: ["sub71.jpg", "sub72.jpg","sub73.jpg"]
},

];
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');

}

function loadProductDetails() {
    const productId = parseInt(getProductId());
    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.product-name').textContent = product.name;
        document.querySelector('.product-price-original-price').textContent = product.originalPrice;
        document.querySelector('.product-price-discounted-price').textContent = product.discountedPrice;
        document.querySelector('.product-description').textContent = product.description;
        document.getElementById('main-image').src = product.mainImage;

        const hoverContainer = document.querySelector('.hover-container');
        hoverContainer.innerHTML = '';
        product.subImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `${product.name} View`;
            imgElement.onclick = () => changeImage(image);
            hoverContainer.appendChild(imgElement);
        });

        document.getElementById('addToCartBtn').onclick = () => addToCart(product.name, product.discountedPrice, product.mainImage);
    }
}

function changeImage(imageSrc) {
    document.getElementById('main-image').src = imageSrc;
}

function addToCart(productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} added to cart!`);
}
window.onload = loadProductDetails;