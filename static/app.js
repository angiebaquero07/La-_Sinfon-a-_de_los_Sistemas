const API_BASE = "/api/v1";

// Estado Global de la Aplicación
let currentUser = null;
let cart = []; // Array que almacena los objetos del carrito
let globalCartId = Math.floor(Math.random() * 1000); // Para simular un ID de orden único

const dummyProducts = [
    { name: "Nike Pegasus Cloud", category: "Deportivos", size: 39, price: 350000, brand: "Nike", color: "Neón", stock: 10, img: "img/deportivo.png" },
    { name: "Oxford Elegance VIP", category: "Formales", size: 41, price: 420000, brand: "Zara", color: "Negro Charol", stock: 5, img: "img/formal.png" },
    { name: "Urban Step Casuals", category: "Casuales", size: 40, price: 210000, brand: "Vans", color: "Gris", stock: 15, img: "img/casual.png" },
    { name: "Gold Edition Run", category: "Deportivos", size: 38, price: 500000, brand: "Adidas", color: "Dorado", stock: 3, img: "img/deportivo.png" },
    { name: "Classic Mocasín", category: "Formales", size: 42, price: 380000, brand: "Bosy", color: "Café", stock: 20, img: "img/formal.png" }
];

// 1. GESTIÓN DE AUTENTICACIÓN
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // Simulamos un inicio de sesión exitoso al dar click validando que no esté vacío
    if (email.includes('@')) {
        currentUser = { email: email, name: email.split('@')[0].toUpperCase() };

        // Animación de entrada
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        document.getElementById('user-display').innerText = `👤 ${currentUser.name}`;

        Swal.fire({
            toast: true, position: 'top-end', icon: 'success', title: `Bienvenido a ZapatoFlex, ${currentUser.name}`,
            showConfirmButton: false, timer: 3000, background: '#141923', color: '#fff'
        });

        initStore(); // Carga la base de datos tras el login
    }
});

// 2. SISTEMA DE CATÁLOGO Y BASE DE DATOS
async function initStore() {
    try {
        let products = await (await fetch(`${API_BASE}/productos/`)).json();
        const hasPremium = products.some(p => p.category === "Deportivos" || p.category === "Formales");

        if (!hasPremium) {
            console.log("DB sin catálogo premium. Registrando calzado VIP inicial...");
            for (const p of dummyProducts) {
                const tempImg = p.img;
                delete p.img;
                await fetch(`${API_BASE}/productos/`, {
                    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p)
                });
            }
            products = await (await fetch(`${API_BASE}/productos/`)).json();
        }
        renderCatalog(products);
    } catch (e) {
        console.error("Error conectando a FastAPI:", e);
        Swal.fire({ icon: 'error', title: 'Fallo de Servidor', text: 'Corre el Backend en Python para cargar la tienda.' });
    }
}

function getProductImage(category) {
    if (category === "Deportivos") return "img/deportivo.png";
    if (category === "Formales") return "img/formal.png";
    return "img/casual.png";
}

async function fetchCatalog(categoryFilter = null) {
    let url = `${API_BASE}/productos/`;
    if (categoryFilter) url += `?categoria=${categoryFilter}`;

    const res = await fetch(url);
    const products = await res.json();
    renderCatalog(products);
}

function renderCatalog(products) {
    const grid = document.getElementById("catalog-grid");
    grid.innerHTML = "";

    // Ignorar los registros de prueba viejos
    const validProducts = products.filter(p => !['STRING', 'NIÑAS'].includes(p.category.toUpperCase()));

    validProducts.forEach(p => {
        const imageSrc = getProductImage(p.category);
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <span class="category-badge" style="position: absolute; top: 1rem; right: 1rem;">${p.category}</span>
            <img src="${imageSrc}" alt="${p.name}" class="product-img">
            <h3 class="product-title">${p.name}</h3>
            <div class="product-price">$${p.price.toLocaleString('es-CO')}</div>
            <button class="cyber-btn-add" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Añadir al Carrito +</button>
        `;
        grid.appendChild(card);
    });
}

// 3. LÓGICA DEL CARRITO DE COMPRAS
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('hidden');
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    updateCartUI();

    Swal.fire({
        toast: true, position: 'bottom-end', icon: 'success', title: `Agregado: ${name}`,
        showConfirmButton: false, timer: 2000, background: '#141923', color: '#fff'
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString('es-CO')}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
            </div>
        `;
    });

    document.getElementById('cart-total').innerText = `$${total.toLocaleString('es-CO')}`;

    // Deshabilitar botón de pago si el carrito está vacío
    document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// 4. CHECKOUT FINAL Y PATRÓN STRATEGY
async function processCheckout() {
    if (cart.length === 0) return;

    const method = document.getElementById("payment-method").value;
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    Swal.fire({ title: 'Procesando tu pedido...', text: 'Conectando con Backend de ZapatoFlex (FastAPI)', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });

    const bodyData = { cart_id: globalCartId++, payment_method: method, amount: totalAmount };

    try {
        const res = await fetch(`${API_BASE}/checkout/`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        });
        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Orden Confirmada!',
                html: `<p style="color:#aaa;">Usuario: ${currentUser.email}</p><p class="neon-text" style="font-size:1.2rem; margin:1rem 0;">${data.message}</p>`,
                background: '#141923', color: '#fff', confirmButtonColor: '#00ccff'
            });
            // Vaciar carrito
            cart = [];
            updateCartUI();
            toggleCart(); // Cerrar sidebar
        } else {
            Swal.fire({ icon: 'error', title: 'Error en Pasarela', text: data.detail });
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error de Red', text: 'El servidor de Python está apagado.' });
    }
}
