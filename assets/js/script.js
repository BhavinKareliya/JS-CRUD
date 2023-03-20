const loadData = (data = [], loadFromStore = false) => {
    const productListEle = document.getElementById('product-list');

    if (data.length == 0 && !loadFromStore) {
        productListEle.innerHTML = "<h4 class='text-danger text-center'>No Data Found</h4>";
        return;
    }
    var productData = (data.length == 0) ? JSON.parse(localStorage.getItem("products")) : data;

    let content = '';
    productData.forEach(e => {
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
                                    <button class="card-link view-link z-3" value="${e.id}" data-bs-toggle="modal" data-bs-target="#viewProductModal" onclick="viewBtnHandler(this)"><i class="bi bi-eye text-success"></i></button>
                                    <button class="card-link edit-link" value="${e.id}" data-bs-toggle="modal" data-bs-target="#productFormModal" onclick="editBtnHandler(this)"><i class="bi bi-pencil-square text-info"></i></button>
                                    <button class="card-link delete-link " value="${e.id}" data-bs-toggle="modal" data-bs-target="#deleteProductModal" onclick="deleteBtnHandler(this)"><i class="bi bi-trash text-danger"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    })
    productListEle.innerHTML = content;
}
loadData([], true)

// Modals
const productFormModal = document.getElementById("productFormModal");
const viewProductModal = document.getElementById("viewProductModal");
const deleteProductModal = document.getElementById("deleteProductModal");

//Buttons
const addProductBtn = document.querySelector("#add-product-btn");
const deleteProductBtn = document.querySelector("#modal-delete-btn");
const submitProductBtn = document.querySelector("#submit-product");
const sortProductBtn = document.querySelectorAll(".dropdown-menu a");

// Inputs
const searchInput = document.getElementById("search-input");

// Forms
const productForm = document.querySelector("#product-form");

//Product view button
const viewBtnHandler = (e) => {
    let data = JSON.parse(localStorage.getItem("products"));
    let productId = e.value;
    let product = data.find(x => x.id == productId);

    document.querySelector('#viewProductModal .product-company').textContent = product.company;
    document.querySelector('#viewProductModal .product-name').textContent = product.name;
    document.querySelector('#viewProductModal .product-descr').textContent = product.description;
    document.querySelector('#viewProductModal .product-image').src = product.imgUrl;
    document.querySelector('#viewProductModal .product-price').textContent = product.price;
};

//Product edit button
const editBtnHandler = (e) => {
    let data = JSON.parse(localStorage.getItem("products"));
    let productId = e.value;
    let product = data.find(x => x.id == productId);

    document.querySelector('#productFormModal .modal-type').value = "Edit";
    document.querySelector('#productFormModal .product-id').value = productId;
    document.querySelector('#productFormModal .modal-title').textContent = "Edit Product";
    document.querySelector('#productFormModal .product-name').value = product.name;
    document.querySelector('#productFormModal .product-descr').value = product.description;
    document.querySelector('#productFormModal .product-company').value = product.company;
    document.querySelector('#productFormModal .product-price').value = product.price;
};

//Product delete button
const deleteBtnHandler = (e) => {
    let productId = e.value;
    document.querySelector("#modal-delete-btn").value = productId;
}

//Product modal delete button
deleteProductBtn.addEventListener('click', e => {
    const productId = parseInt(e.target.value);
    var data = JSON.parse(localStorage.getItem("products")).filter(e => parseInt(e.id) !== productId);
    localStorage.setItem("products", JSON.stringify(data));
    loadData(data);
})

addProductBtn.addEventListener('click', e => {
    productForm.reset();
    document.querySelector('#productFormModal .modal-title').textContent = "Add New Product";
    document.querySelector('#productFormModal .modal-type').value = "Create";
})

submitProductBtn.addEventListener('click', (e) => {
    e.preventDefault();

    var modalType = document.querySelector('#productFormModal input.modal-type').value;
    var name = document.querySelector('#productFormModal input.product-name').value;
    var price = parseFloat(document.querySelector('#productFormModal input.product-price').value).toFixed(2);
    var company = document.querySelector('#productFormModal input.product-company').value;
    var image = document.querySelector('#productFormModal input.product-image');
    var description = document.querySelector('#productFormModal .product-descr').value;

    let file = image.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        const dataURL = e.target.result;
        var data = JSON.parse(localStorage.getItem("products"));
        var obj = {
            name,
            description,
            imgUrl: dataURL,
            company,
            price
        }
        if (modalType == 'Create') {
            obj.id = Math.round((Math.random() * 10000));
        } else {
            obj.id = document.querySelector('#productFormModal input.product-id').value;
            var data = data.filter(e => e.id !== parseInt(obj.id));
        }
        data.push(obj);
        localStorage.setItem("products", JSON.stringify(data));
        document.querySelector("#productFormModal .btn-close").click();
        loadData(data);
    }
    productForm.classList.add("was-validated");
    if (file) reader.readAsDataURL(file);
})

sortProductBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        var data = JSON.parse(localStorage.getItem("products"))
        console.log(data);
        if (e.target.textContent == 'Sort by name')
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        else
            data.sort((a, b) => (a.price < b.price) ? 1 : -1);

        loadData(data);
        localStorage.setItem("products", JSON.stringify(data));
    })
});

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
    var data = JSON.parse(localStorage.getItem("products"));
    let filteredData = data.filter(e => e.id == val || e.name.toLowerCase().includes(val.toLowerCase()));
    loadData(filteredData)
}
