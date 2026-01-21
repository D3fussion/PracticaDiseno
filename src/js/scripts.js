document.addEventListener("DOMContentLoaded", function () {

    const productos = [
        {
            id: 0,
            name: "Taladro",
            description: "Descripción del taladro",
            price: 10.00,
            image: "https://m.media-amazon.com/images/I/61fsIsm5p2L._AC_UF894,1000_QL80_.jpg"
        },
        {
            id: 1,
            name: "Martillo",
            description: "El martillo es una herramienta que se utiliza para golpear y martillar objetos.",
            price: 20.00,
            image: "https://m.media-amazon.com/images/I/61CTt-OrpzL.jpg"
        },
        {
            id: 2,
            name: "Destornillador",
            description: "El destornillador es una herramienta que se utiliza para quitar tornillos.",
            price: 30.00,
            image: "https://m.media-amazon.com/images/I/41E7wzz3OTL.jpg"
        },
        {
            id: 3,
            name: "Tijeras",
            description: "Las tijeras son herramientas que se utilizan para cortar materiales como papel, cartulina, metal, etc.",
            price: 10.00,
            image: "https://m.media-amazon.com/images/I/61CpYEsXf6L._AC_UF894,1000_QL80_.jpg"
        },
        {
            id: 4,
            name: "Cinta para medir",
            description: "La cinta para medir es una herramienta que se utiliza para medir distancias.",
            price: 20.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJv-qivEn7kiY9iK_A9EJZl3lO2NlsFvwOpA&s"
        },
        {
            id: 5,
            name: "Llave inglesa",
            description: "La llave inglesa se utiliza para ajustar tipos de tornillos.",
            price: 30.00,
            image: "https://m.media-amazon.com/images/I/31jN+uHB3EL.jpg"
        },
        {
            id: 6,
            name: "Llave Allen",
            description: "La llave allen se utiliza para ajustar tipos de tornillos especiales para la llave Allen.",
            price: 10.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoCTkgAKRtlwDZppwVla-fAGBOIWNwc-eHgA&s"
        },
        {
            id: 7,
            name: "Tornillos Variados",
            description: "Los tornillos se utilizan para reforzar estructuradas que necesitan tornillos",
            price: 20.00,
            image: "https://images.prismic.io/wovar-rb2-dev/e2e35f7b-92d8-4ae0-85f4-a3758635f2bc_verschillende-soorten-schroeven.png?auto=compress,format"
        },
        {
            id: 8,
            name: "Pinzas de Presión",
            description: "Las pinzas de presión se utilizan para sujetar objetos.",
            price: 30.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbyqENaNyml4X9tgLwc_vh5Q7YrW3gjwmQuA&s"
        }
    ];

    function addProducts() {
        const products = document.querySelector(".products");
        productos.forEach((producto) => {
            const product = document.createElement("article");
            product.classList.add("product");
            product.setAttribute("value", producto.id);
            product.setAttribute("itemscope", "");
            product.setAttribute("itemtype", "http://schema.org/Product");
            product.innerHTML = `
                <div class="product-img">
                    <img src="${producto.image}" alt="${producto.name}" loading="lazy">
                </div>
                <div class="product-text">
                    <h3 itemprop="name">${producto.name}</h3>
                    <p itemprop="description">${producto.description}</p>
                    <span itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                        <meta itemprop="priceCurrency" content="MXN">
                        <span itemprop="price" content="${producto.price}">$${producto.price}</span>
                    </span>
                </div>
            `;
            products.appendChild(product);
        });
    }

    addProducts();

    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
        product.addEventListener("click", () => {
            showProductModal(product.getAttribute("value"));
        });
    });

    let currentProductId = null;

    function showProductModal(id) {
        currentProductId = id;
        const modal = document.getElementById("productModal");
        const product = productos.find((producto) => producto.id == id);
        modal.querySelector("img").src = product.image;
        modal.querySelector("h3").textContent = product.name;
        modal.querySelector("p").textContent = product.description;
        modal.querySelector("span").textContent = "$" + product.price + ".00";
        modal.showModal();
    }

    function closeProductModal() {
        const modal = document.getElementById("productModal");
        modal.close();
    }

    const addToCartBtn = document.querySelector("#productModal .add-cart");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            if (currentProductId !== null) {
                addToCart(currentProductId);
                closeProductModal();
                alert("Producto agregado al carrito");
            }
        });
    }

    function addToCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = productos.find((p) => p.id == id);

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function openCart() {
        const modal = document.getElementById("cartModal");
        const cartItemsContainer = document.getElementById("cartItems");
        const cartTotalElement = document.getElementById("cartTotal");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";

        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                total += parseFloat(item.price);
                const li = document.createElement("li");
                li.classList.add("cart-item");
                li.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                        <div>
                            <h4>${item.name}</h4>
                            <span>$${item.price}.00</span>
                        </div>
                    </div>
                    <button class="remove-btn" data-index="${index}" style="background: red; color: white; border: none; padding: 5px; cursor: pointer;">X</button>
                `;
                cartItemsContainer.appendChild(li);
            });
        }

        cartTotalElement.textContent = "$" + total.toFixed(2);

        // Add event listeners for remove buttons
        const removeButtons = cartItemsContainer.querySelectorAll(".remove-btn");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeFromCart(index);
            });
        });

        modal.showModal();
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        openCart();
    }

    function closeCartModal() {
        const modal = document.getElementById("cartModal");
        modal.close();
    }

    window.closeProductModal = closeProductModal;
    window.openCart = openCart;
    window.closeCartModal = closeCartModal;

});