
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        displayProducts(data); 
    });


function displayProducts(products) {
    productContainer.innerHTML = ""; 
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 50)}...</p>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        productContainer.appendChild(card);
    });
}


function setupFilters(products) {
 
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        filteredProducts = applyCategoryFilter(filteredProducts);
        filteredProducts = applyPriceSort(filteredProducts);
        displayProducts(filteredProducts);
    });


    categoryFilter.addEventListener('change', () => {
        let filteredProducts = applyCategoryFilter(products);
        filteredProducts = applyPriceSort(filteredProducts);
        displayProducts(filteredProducts);
    });

    priceSort.addEventListener('change', () => {
        let sortedProducts = applyPriceSort(products);
        sortedProducts = applyCategoryFilter(sortedProducts);
        displayProducts(sortedProducts);
    });
}


function applyCategoryFilter(products) {
    const selectedCategory = categoryFilter.value;
    return products.filter(product => 
        selectedCategory === "" || product.category === selectedCategory
    );
}


function applyPriceSort(products) {
    const selectedSortOrder = priceSort.value;
    if (selectedSortOrder === "asc") {
        return products.sort((a, b) => a.price - b.price); 
    } else if (selectedSortOrder === "desc") {
        return products.sort((a, b) => b.price - a.price); 
    }
    return products; 
}


function addToCart(id, title, price) {
   
    console.log(`Added to cart: ${title}`);
}
