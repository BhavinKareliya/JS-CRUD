// On pageload event
<<<<<<< HEAD
debugger;
=======
>>>>>>> main
const loadData = (data = [], loadFromStore = false) => {
    const productListEle = document.getElementById('product-list');

    //if search not found
    if (data.length == 0 && !loadFromStore) {
        productListEle.innerHTML = "<h4 class='text-danger text-center'>No Data Found</h4>";
        return;
    }

    __productData__ = (data.length == 0) ? JSON.parse(localStorage.getItem("products")) : data;

    let content = '';
    __productData__ != null && __productData__.forEach(e => {
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

let __productData__ = JSON.parse(localStorage.getItem("products"));

if (__productData__ == null) {
    fetch('../../data.json')
        .then((response) => response.json())
        .then((json) => {
            __productData__ = JSON.stringify(json);
            localStorage.setItem("products", __productData__)
<<<<<<< HEAD
            debugger
=======
>>>>>>> main
            loadData(__productData__);
        });
} else {
    loadData([], true);
}

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
const modalImage = document.querySelector("#productFormModal .product-image");
const modalPrevImage = document.querySelector("#productFormModal #img-preview img");

//Inputs Error
const imgError = document.getElementById('invalid-image-error');

// Forms
const productForm = document.querySelector("#product-form");

// Boolean
let isValid = false, isEditMode = false;

//Modal form submit event
submitProductBtn.addEventListener('click', (e) => {
    if (!productForm.checkValidity() || !isValid) {
        e.preventDefault()
        productForm.classList.add("was-validated");
        return
    }

    var modalType = document.querySelector('#productFormModal input.modal-type').value;
    var name = document.querySelector('#productFormModal input.product-name').value;
    var price = parseFloat(document.querySelector('#productFormModal input.product-price').value).toFixed(2);
    var company = document.querySelector('#productFormModal input.product-company').value;
    var image = modalPrevImage.src;
    var description = document.querySelector('#productFormModal .product-descr').value;
    var obj = { name, description, company, price, imgUrl: image };

    if (modalType == 'Create') obj.id = Math.round((Math.random() * 10000));

    if (modalType == 'Edit') {
        var currId = parseInt(document.querySelector('#productFormModal input.product-id').value);
        obj.id = currId;
        __productData__ = __productData__.filter(e => e.id != obj.id);
    }
    document.querySelector("#productFormModal .btn-close").click();
    productForm.reset();
    pushData(obj)
})

//Sort Product
sortProductBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        var data = JSON.parse(localStorage.getItem("products"))
        if (e.target.textContent == 'Sort by name')
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        else
            data.sort((a, b) => (parseFloat(a.price) < parseFloat(b.price)) ? 1 : -1);

        loadData(data);
        localStorage.setItem("products", JSON.stringify(data));
    })
});

//Create product button
addProductBtn.addEventListener('click', e => {
    isEditMode = false;
    productForm.classList.remove("was-validated");
    productForm.reset();
    modalPrevImage.src = "";
    imgError.classList.add('d-none');
    modalImage.classList.remove('invalid');
    document.querySelector('#productFormModal .modal-title').textContent = "Add New Product";
    document.querySelector('#productFormModal .modal-type').value = "Create";
    submitProductBtn.textContent = "Add Product";
})

//Product array data pusher
const pushData = (data) => {
    productForm.reset();
    imgError.classList.add('d-none');
    __productData__.push(data);
    localStorage.setItem("products", JSON.stringify(__productData__));
    loadData(__productData__);
}

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
    productForm.reset();
    imgError.classList.add('d-none');
    isValid = true;
    isEditMode = true;

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
    console.log();
    modalPrevImage.src = product.imgUrl;
    submitProductBtn.textContent = "Save changes";
};

//Product modal delete button
deleteProductBtn.addEventListener('click', e => {
    const productId = parseInt(e.target.value);
    var data = JSON.parse(localStorage.getItem("products")).filter(e => parseInt(e.id) !== productId);
    localStorage.setItem("products", JSON.stringify(data));
    loadData(data);
})

//Search user inputs in products
searchInput.addEventListener('input', e => {
    let val = e.target.value;
    callDebounce(val);
})

//Product delete button
const deleteBtnHandler = (e) => {
    let productId = e.value;
    document.querySelector("#modal-delete-btn").value = productId;
}

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

modalImage.addEventListener('change', (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    var modalType = document.querySelector('#productFormModal input.modal-type').value;
    var image = document.querySelector('#productFormModal input.product-image');
    var obj = {};

    let reader = new FileReader();
    //on load event on file input
    reader.onload = function (e) {
        const dataURL = e.target.result;
        obj.imgUrl = dataURL;

        //Set ObjectId
        if (modalType == 'Create') obj.id = Math.round((Math.random() * 10000));
        else obj.id = document.querySelector('#productFormModal input.product-id').value;

        __productData__ = __productData__.filter(e => e.id != obj.id);
        modalPrevImage.src = obj.imgUrl;
    }

    //validate file type and size
    if (file != undefined) {
        var extension = file.name.split('.').pop()
        var size = file.size;

        if (extension != 'png' || size > 2097152) {
            imgError.classList.remove('d-none');
            image.classList.add('invalid');
            isValid = false;
            return;
        }
        else {
            imgError.classList.add('d-none');
            image.classList.remove('invalid');
            isValid = true;
        }
        reader.readAsDataURL(file);
    }

})