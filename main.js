let navList = document.querySelector(".menu");
let header = document.querySelector(".header");
let cartItem = document.querySelector(".cart-item-container");
let searchBar = document.querySelector(".search-form");
document.querySelector("#menu-btn").onclick = () => {
    navList.classList.toggle("active");
    searchBar.classList.remove("open");
    cartItem.classList.remove("active");
}
window.onload = () => {
    navList.classList.remove("active");
    searchBar.classList.remove("open");
    cartItem.classList.remove("active");
}
window.onscroll = () => {
    navList.classList.remove("active");
    searchBar.classList.remove("open");
    header.classList.toggle('shadow', window.scrollY > 0);


}

const scrollElements = document.querySelectorAll(".js-scroll");
const throttleCount = document.getElementById('throttle-count');
const scrollCount = document.getElementById('scroll-count');

var throttleTimer;

const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
}

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el)
        }
    })
}
var timer = 0;
var count = 0;
var scroll = 0;

window.addEventListener("scroll", () => {
    scrollCount.innerHTML = scroll++;
    throttle(() => {
        handleScrollAnimation();
        throttleCount.innerHTML = count++;
    }, 250);
});
document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle("active");
    navList.classList.remove("active");
    searchBar.classList.remove("open");
}
document.querySelector("#search-btn").onclick = () => {
        searchBar.classList.toggle("open");
        navList.classList.remove("active");
        cartItem.classList.remove("active");
        document.querySelector("#lab").onclick = () => {
            searchBar.classList.toggle("open");
            navList.classList.remove("active");
            cartItem.classList.remove("active");


        }

    }
    //product info
let addBtn = document.querySelectorAll(".add");
let products = [{
        name: "sofa",
        img: "/images/sofa3.png",
        price: 110.99,
        inCart: 0

    },
    {
        name: "chair",
        img: "/images/chaise1.jpg",
        price: 80.99,
        inCart: 0

    },
    {
        name: "bed",
        img: "/images/bed2.jpg",
        price: 150.99,
        inCart: 0

    },
    {
        name: "decoration",
        img: "/images/decor1.jpg",
        price: 90.99,
        inCart: 0
    }

]
for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", function() {

        cartNumbers(products[i]);
        displayCart();
    })
}

function onloadCartNumbers() {
    let productNumber = sessionStorage.getItem("cartNumber");
    if (productNumber) {
        document.querySelector("#count").textContent = productNumber;
    }
}

function cartNumbers(product) {
    let productNumbers = sessionStorage.getItem("cartNumber");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        sessionStorage.setItem("cartNumber", productNumbers + 1);
        document.querySelector("#count").textContent = productNumbers + 1;

    } else {
        sessionStorage.setItem("cartNumber", 1);
        document.querySelector("#count").textContent = 1;
    }
    setItems(product);


}



function setItems(product) {
    let CartIms = sessionStorage.getItem("productsInCart");
    console.log(CartIms);
    CartIms = JSON.parse(CartIms);
    if (CartIms != null) {
        if (CartIms[product.name] == undefined) {
            CartIms = {
                ...CartIms,
                [product.name]: product
            }
        }
        CartIms[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        CartIms = {
            [product.name]: product
        }
    }


    // let cartitem = {
    //     [product.name]: product
    // }
    // product.inCart = 1;
    sessionStorage.setItem("productsInCart", JSON.stringify(CartIms))

}

// function total(product) {
//     let cartcost = sessionStorage.getItem('total');
//     if (cartcost != null) {
//         cartcost = parseInt(cartcost);

//         sessionStorage.setItem("total", 10 + cartcost)
//     }
//     sessionStorage.setItem("total", 10);
//     console.log(cartcostS)

// }
function emptyCart() {
    if (sessionStorage.getItem('productsInCart')) {
        // Clear JavaScript sessionStorage by index

        sessionStorage.removeItem('productsInCart');
        let productNumbers = sessionStorage.getItem("cartNumber");

        sessionStorage.setItem("cartNumber", 0);
        displayCart();

    }

}

function displayCart() {
    let cartitems = sessionStorage.getItem("productsInCart");
    cartitems = JSON.parse(cartitems);
    let productcontainer = document.querySelector("#cartitem")
        // let cartcost = sessionStorage.getItem('total');

    if (cartitems && productcontainer) {
        productcontainer.innerHTML = '';
        Object.values(cartitems).map(item => {
            productcontainer.innerHTML += `<div class="cart-item">
 <span class="fas fa-times" ></span>
 <img src="${item.img}" alt="">
 <div class="content">
    <h3 style="display:flex;">${item.name}    
    </h3>

    <div class="price">${item.price + "$"}</div>
    <span class="count">Quantity:${item.inCart}</span>
</div>

`;
            // document.querySelector("#total").innerHTML = cartcost;

        })
    }
}


onloadCartNumbers();
displayCart();
//CREATE POPP WIDTH IMG
let ourgallery = document.querySelectorAll(".gallery .box .image");
let imgs = document.querySelectorAll(".image img")
console.log(ourgallery[0].src);
for (let k = 0; k < ourgallery.length; k++) {
    ourgallery[k].style.cursor = "pointer";
    ourgallery[k].addEventListener('click', (e) => {
        console.log(1);
        //create overlay element
        let overlay = document.createElement("div");
        //add class
        overlay.className = "popup-overlay";
        //append overlay to the body
        document.body.appendChild(overlay);
        //create popup
        let popupbox = document.createElement("div");
        //add class to the popup
        popupbox.className = "popup-box";
        //create the close span
        let closebtn = document.createElement("span");
        //create the close button text
        let closebtntext = document.createTextNode("X");
        //APPEND THE TEXTCLOSE TO BTNCLOSE
        closebtn.appendChild(closebtntext);
        //add class to closebtn
        closebtn.className = "close-btn";
        //add closebtn to the popup box
        popupbox.appendChild(closebtn);
        if (imgs[k].alt !== null) {
            //create heading
            let imghead = document.createElement("h3");
            //create text for heading
            let imgtext = document.createTextNode(imgs[k].alt);
            //append the text to the heading
            imghead.appendChild(imgtext);
            //append the heading to the popupbox
            popupbox.appendChild(imghead);

        }
        //create the img
        let popuimg = document.createElement("img");
        //set img source
        popuimg.src = imgs[k].src;
        //add img to popupbpx
        popupbox.appendChild(popuimg);
        //append the popubbox to body
        document.body.appendChild(popupbox);

    });
};
//close popup
document.addEventListener("click", function(e) {
    if (e.target.className == 'close-btn') {
        //remove the current popup
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});