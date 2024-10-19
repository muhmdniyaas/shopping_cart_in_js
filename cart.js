document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    let subtotal = 0;

    cart.forEach((item, index) => {
        const row = cartTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        const itemSubtotal = item.price * item.quantity;
        cell1.innerHTML = `
            <div class="cart-info">
                <img src="${item.image}" width="100" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <small>Price: ₹${item.price}</small>
                </div>
            </div>`;

        cell2.innerHTML = `
            <input type="number" value="${item.quantity}" min="1" onchange="updateSubtotal(${index}, this.value)">
        `;
        cell3.innerHTML = `<span>₹${itemSubtotal}</span>`;

        cell4.innerHTML = `<a href="#" onclick="removeItem(${index})">Remove</a>`;

        subtotal += itemSubtotal;
    });

    const tax = Math.round(subtotal * 0.15);
    const total = subtotal + tax;
    document.getElementById('subtotal').innerText = `₹${subtotal}`;
    document.getElementById('tax').innerText = `₹${tax}`;
    document.getElementById('total').innerText = `₹${total}`;

    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    };

    window.updateSubtotal = function(index, quantity) {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); 
    };
});