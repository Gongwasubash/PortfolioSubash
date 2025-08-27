let currentService = '';
let currentPrice = '';
let currentPriceAmount = 0;

function openOrderModal(serviceName, price) {
    currentService = serviceName;
    currentPrice = price;
    currentPriceAmount = parseInt(price.replace(/[^0-9]/g, '')) * 100; // Convert to paisa
    
    document.getElementById('serviceTitle').textContent = serviceName;
    document.getElementById('servicePrice').textContent = price;
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
}

// Khalti Configuration
var config = {
    "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    "productIdentity": "1234567890",
    "productName": currentService,
    "productUrl": "http://gameofthrones.wikia.com/wiki/Dragons",
    "paymentPreference": [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
    ],
    "eventHandler": {
        onSuccess (payload) {
            console.log(payload);
            submitOrderWithPayment(payload.token);
        },
        onError (error) {
            console.log(error);
            alert('Payment failed. Please try again.');
        },
        onClose () {
            console.log('Payment widget closed');
        }
    }
};

var checkout = new KhaltiCheckout(config);

// Payment button click
document.getElementById('payment-button').addEventListener('click', function() {
    if (!validateForm()) return;
    
    config.productName = currentService;
    checkout.show({amount: currentPriceAmount});
});

// Order without payment
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    submitOrder('pending', null);
});

function validateForm() {
    const name = document.getElementById('orderName').value;
    const email = document.getElementById('orderEmail').value;
    const phone = document.getElementById('orderPhone').value;
    const details = document.getElementById('orderDetails').value;
    
    if (!name || !email || !phone || !details) {
        alert('Please fill all fields');
        return false;
    }
    return true;
}

async function submitOrderWithPayment(token) {
    await submitOrder('paid', token);
}

async function submitOrder(paymentStatus, khaltiToken) {
    const formData = {
        service_name: currentService,
        price: currentPrice,
        name: document.getElementById('orderName').value,
        email: document.getElementById('orderEmail').value,
        phone: document.getElementById('orderPhone').value,
        project_details: document.getElementById('orderDetails').value,
        payment_status: paymentStatus,
        khalti_token: khaltiToken
    };
    
    try {
        const response = await fetch('/create-order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            if (paymentStatus === 'paid') {
                alert('Payment successful! Order confirmed. We will contact you soon.');
            } else {
                alert('Order submitted successfully! We will contact you soon.');
            }
            closeOrderModal();
        } else {
            alert('Error submitting order: ' + result.message);
        }
    } catch (error) {
        alert('Error submitting order. Please try again.');
        console.error('Error:', error);
    }
}