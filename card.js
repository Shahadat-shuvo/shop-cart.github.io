
//PRODUCT LIST

let products = [
    {
        name: 'Jujutsu Kaisen',
        tag: 'GOJO1',
        price: 10,
        incart: 0
    },
    {
        name: 'Death Note',
        tag: 'Kira',
        price: 20,
        incart: 0
    },
    {
        name: 'Attack On Titan',
        tag: 'Levi',
        price: 30,
        incart: 0
    },
    {
        name: 'Black Clover',
        tag: 'Yami',
        price: 40,
        incart: 0
    }
];

//ACCESS

let card = document.querySelector(".card");
let taskList = document.querySelector('#cart-list');
let carts = document.querySelectorAll(".btn");

//Event Listener 

for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', (e) =>{
        setItems(products[i]);
        
        e.preventDefault();
    })
}

//Set Item

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    } else {
        products.incart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    showAlert("Added Successfully!","success");
   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//Show Alert

function showAlert(message, className) {
    clearAlert();
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    console.log(message);
    let container = document.querySelector('.container');
    let form = document.querySelector("#item1");
    container.insertBefore(div, form);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

function clearAlert(){
    let currentAlert = document.querySelector(".alert");
    if(currentAlert) {
      currentAlert.remove();
    }
  }

// Show Cart Items

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector("#cart-container");
    
    if(cartItems && productContainer) {
        let list = document.querySelector("#cart-list");
        list.innerHTML = '';
        Object.values(cartItems).map(item => {
            let row = document.createElement('tr');
            
            row.innerHTML = `
                <td> <img  style="width: 3.5rem; height: 2.2rem" src="img/${item.tag}.jpg"> </td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td> <a href="#" class="delete">X</a></td>

            `;
            list.appendChild(row);
            taskList.addEventListener('click', removeTask);
        })
    }


}

//Remove Items

function removeTask(products){
    if(products.target.hasAttribute("href")){
        if (confirm("Are you Sure?")){
            let ele = products.target.parentNode.parentElement;
            ele.remove();
            removeFromLs(ele);
            products.preventDefault();
        }
    }
}

function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('productsIncart') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('productsInCart'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('productsInCart', JSON.stringify(tasks));
}





displayCart();