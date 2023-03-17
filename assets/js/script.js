var data = [
    {
        id: 1,
        name: 'TITAN TALKS',
        description: 'Titan Talk S AMOLED Display Digital Touch Screen Stress Monitor Premium Smart Watch with Blue coloured Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90165AP03_1.jpg?impolicy=pqmed&imwidth=640',
        price: 12995
    },
    {
        id: 2,
        name: 'Titan Smart 2',
        description: 'Touch Screen with Black Strap, Amoled Display, SpO2 and Always on Display',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90137AP01_1.jpg?impolicy=pqmed&imwidth=640',
        price: '5995'
    },
    {
        id: 3,
        name: 'Titan Smart Pro',
        description: 'Smart Watch with Blue Strap, Body Temperature Monitor, Amoled Display and Built-In GPS',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90149AP03_1.jpg?impolicy=pqmed&imwidth=640',
        price: '5995'
    },
    {
        id: 4,
        name: 'Connected Plus',
        description: 'Hybrid Smart Analog Watch with Blue Dial & Brown Leather Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90120QL01_1.jpg?impolicy=pqmed&imwidth=640',
        price: '6995'
    },
    {
        id: 5,
        name: 'Octane Black Dial',
        description: 'Silver Metal Strap Watch',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/1702KM02_1.jpg?impolicy=pqmed&imwidth=640',
        price: '6995'
    }
]

let content = '';
[...data, ...data, ...data].forEach(e => {
    content += `<div class="col-md-6 col-lg-4 col-xl-3 col-sm-12 d-flex justify-content-center">
    <div class="card product">
        <div class="card-img-top product-img">
            <img src="${e.imgUrl}" alt="Please Reload ... ">
        </div>
        <div class="card-body">
            <h5 class="card-title product-name">${e.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted product-price">₹${e.price} (Flat 30% off)</h6>
            <p class="card-text product-descr">${e.description}</p>
            <div class="product-actions">
                <button class="card-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="bi bi-eye"></i></button>
                <button class="card-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="bi bi-pencil-square"></i></button>
                <button class="card-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
    </div>`;
})

let productListEle = document.getElementById('product-list');

productListEle.innerHTML = content;