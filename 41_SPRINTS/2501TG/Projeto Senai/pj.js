
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function clearCart() {
    cart = []; 
    saveCart(); 
    updateCart(); 
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    if (cartItems && totalPrice) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${item.name}</strong></span> - 
                <span>R$ ${item.price.toFixed(2)}</span>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = total.toFixed(2);
    }


    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    cart.push({ name, price });
    saveCart();
    updateCart();
}


document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    updateCart();
});

if (window.location.pathname.includes('produtos.html')) {
    document.querySelector('.C-icon').style.display = 'flex';
    document.querySelector('.C-icon a').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = './carrinho.html';
    });
} else {
    document.querySelector('.C-icon').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('typing-title');
    const textElement = document.getElementById('typing-text');

    const rawTypingContent = `&lt;h1&gt;Códigos, Café e Criatividade&lt;/h1&gt;\n&lt;p&gt;Na nossa cafeteria, cada xícara de café inspira inovação, e cada linha de código transforma ideias em soluções.&lt;/p&gt;`;
    const finalTitle = "<h1 class='final-title'>Códigos, Café e Criatividade</h1>";
    const finalText = "<p class='final-text'>Na nossa cafeteria, cada xícara de café inspira inovação, e cada linha de código transforma ideias em soluções.</p>";
    let charIndex = 0;

    function typeText(element, text, speed, callback) {
        if (charIndex < text.length) {
            element.innerHTML = text.substring(0, charIndex + 1) + "<span class='cursor'></span>";
            charIndex++;
            setTimeout(() => typeText(element, text, speed, callback), speed);
        } else {
            element.innerHTML = text;
            if (callback) callback();
        }
    }

    function simulateEnterAnimation(callback) {
        const enterElement = document.createElement('span');
        enterElement.className = 'enter-text';
        enterElement.textContent = "[Enter]";
        textElement.appendChild(enterElement);

       
        setTimeout(() => {
            enterElement.remove();
            callback();
        }, 2000);
    }

    function finalizeText() {
        const finalTitleElement = document.createElement('h1');
        finalTitleElement.className = 'final-title';
        finalTitleElement.textContent = 'Códigos, Café e Criatividade';

        const finalTextElement = document.createElement('p');
        finalTextElement.className = 'final-text';
        finalTextElement.textContent = 'Na nossa cafeteria, cada xícara de café inspira inovação, e cada linha de código transforma ideias em soluções.';

        textElement.innerHTML = '';
        textElement.appendChild(finalTitleElement);
        textElement.appendChild(finalTextElement);
    }

    typeText(textElement, rawTypingContent, 50, () => {
        simulateEnterAnimation(() => {
            finalizeText();
        });
    });
});