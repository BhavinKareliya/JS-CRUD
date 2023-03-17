var data = [
    {
        id: 1,
        name: 'TITAN TALKS',
        description: 'Titan Talk S AMOLED Display Digital Touch Screen Stress Monitor Premium Smart Watch with Blue coloured Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90165AP03_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',

        price: 12995
    },
    {
        id: 2,
        name: 'Titan Smart 2',
        description: 'Touch Screen with Black Strap, Amoled Display, SpO2 and Always on Display',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90137AP01_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '5995'
    },
    {
        id: 3,
        name: 'Titan Smart Pro',
        description: 'Smart Watch with Blue Strap, Body Temperature Monitor, Amoled Display and Built-In GPS',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90149AP03_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '5995'
    },
    {
        id: 4,
        name: 'Connected Plus',
        description: 'Hybrid Smart Analog Watch with Blue Dial & Brown Leather Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90120QL01_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '6995'
    },
    {
        id: 5,
        name: 'Octane Black Dial',
        description: 'Silver Metal Strap Watch',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/1702KM02_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Octane',
        price: '6995'
    }
]

var copyData = [
    {
        id: 1,
        name: 'TITAN TALKS',
        description: 'Titan Talk S AMOLED Display Digital Touch Screen Stress Monitor Premium Smart Watch with Blue coloured Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90165AP03_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',

        price: 12995
    },
    {
        id: 2,
        name: 'Titan Smart 2',
        description: 'Touch Screen with Black Strap, Amoled Display, SpO2 and Always on Display',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90137AP01_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '5995'
    },
    {
        id: 3,
        name: 'Titan Smart Pro',
        description: 'Smart Watch with Blue Strap, Body Temperature Monitor, Amoled Display and Built-In GPS',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90149AP03_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '5995'
    },
    {
        id: 4,
        name: 'Connected Plus',
        description: 'Hybrid Smart Analog Watch with Blue Dial & Brown Leather Strap',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/90120QL01_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Titan',
        price: '6995'
    },
    {
        id: 5,
        name: 'Octane Black Dial',
        description: 'Silver Metal Strap Watch',
        imgUrl: 'https://staticimg.titan.co.in/Titan/Catalog/1702KM02_1.jpg?impolicy=pqmed&imwidth=640',
        company: 'Octane',
        price: '6995'
    }
]

const productFormModal = document.getElementById("productFormModal");
const viewProductModal = document.getElementById("viewProductModal");
const deleteProductModal = document.getElementById("deleteProductModal");
const deleteProductBtn = document.querySelector("#deleteProductModal .delete-button");
const searchInput = document.getElementById("search-input");
const productListEle = document.getElementById('product-list')
const viewBtns = document.querySelectorAll(".view-link");
const editBtns = document.querySelectorAll(".edit-link");
const deleteBtns = document.querySelectorAll(".delete-link");
let content = '';

// Load products 
[...data, ...copyData].forEach(e => {
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
                <button class="card-link view-link z-3" value="${e.id}" data-bs-toggle="modal" data-bs-target="#viewProductModal"><i class="bi bi-eye"></i></button>
                <button class="card-link edit-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="bi bi-pencil-square"></i></button>
                <button class="card-link delete-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#deleteProductModal"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
    </div>`;
})
productListEle.innerHTML = content;

//Product edit button event listener
editBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let productId = e.target.value;
        let product = data.find(x => x.id == productId);

        document.querySelector('#productFormModal .modal-title').textContent = "Edit Product";
        document.querySelector('#productFormModal .product-name').value = product.name;
        document.querySelector('#productFormModal .product-id').dataset.id = product.id;
        document.querySelector('#productFormModal .product-descr').value = product.description;
        // document.querySelector('#productFormModal .product-image').value = product.name;
        document.querySelector('#productFormModal .product-price').value = product.price;
    })
})

//Product view button event listener
viewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let productId = e.target.value;
        let product = data.find(x => x.id == productId);

        document.querySelector('#viewProductModal .product-company').textContent = product.company;
        document.querySelector('#viewProductModal .product-name').textContent = product.name;
        document.querySelector('#viewProductModal .product-descr').textContent = product.description;
        document.querySelector('#viewProductModal .product-image').src = product.imgUrl;
        document.querySelector('#viewProductModal .product-price').textContent = product.price;
    })
})

//Product delete button event listener
deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let productId = e.target.value;
        document.querySelector("#deleteProductModal .delete-button").value = productId;
    })
})

//Delete product event from modal
deleteProductBtn.addEventListener('click', e => {
    const productId = e.target.value;
    copyData = copyData.filter(data => data.id != productId);
    console.log(document.getElementById("viewProductModal"));
    document.getElementById("viewProductModal").style.display = 'none';
})

//Search user inputs in products
searchInput.addEventListener('input', e => {
    let val = e.target.value;
    callDebounce(val);
})


const callDebounce = debounce((val) => searchFilter(val));

function debounce(cb, delay = 1000) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb.apply(this, args);
        }, delay);
    }
}

function searchFilter(val) {
    filteredData = data.filter(e => e.id == val || e.name.toLowerCase().includes(val.toLowerCase()));

    let content = '';
    if (filteredData.length == 0) {
        productListEle.innerHTML = "<h4 class='text-danger text-center'>No Data Found</h4>";
        return;
    }

    filteredData.forEach(e => {
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
                                    <button class="card-link view-link z-3" value="${e.id}" data-bs-toggle="modal" data-bs-target="#viewProductModal"><i class="bi bi-eye"></i></button>
                                    <button class="card-link edit-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="bi bi-pencil-square"></i></button>
                                    <button class="card-link delete-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#deleteProductModal"><i class="bi bi-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    })
    productListEle.innerHTML = content;
}