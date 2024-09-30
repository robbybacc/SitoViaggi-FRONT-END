let links = document.querySelectorAll('.nav-link');
let navbar = document.querySelector('.navbar');
let containerNav = document.querySelector('#containerNav');
let logo = document.querySelector('.logo')
let firstnumber = document.querySelector('#firstnumber');
let secondnumber = document.querySelector('#secondnumber');
let thirdnumber = document.querySelector('#thirdnumber');
let cardWrapper = document.querySelector('#cardWrapper');
let swiperwrapper = document.querySelector('.swiper-wrapper');
let radioWrapper = document.querySelector('#radioWrapper');
 


// nav//
window.addEventListener('scroll', ()=>{
    if (window.scrollY>0){
        navbar.style.height = '160px';
        // navbar.classList.remove('navbar');
        navbar.classList.add('radial-gradient');
        navbar.classList.add('opacityCustom');
        navbar.classList.remove('border-nav-l');
        navbar.classList.add('border-nav-c');
        
        //cambio colore link//
        links.forEach((el)=>{
            
            el.addEventListener('mouseover', ()=>{
                el.classList.remove('text-w')
                el.classList.add('text-v')
            })
            el.addEventListener('mouseleave', ()=>{
                el.classList.remove('text-v')
                el.classList.add('text-w')
            })
        })
        
        containerNav.classList.remove('navbar')
        containerNav.classList.add('radial-gradient')
        
        
        
        
        
    }else{
        navbar.style.height = '80px';
        navbar.classList.remove('radial-gradient');
        navbar.classList.add('navbar');
        navbar.classList.remove('opacityCustom')
        navbar.classList.remove('borderNav-c')
        navbar.classList.add('borderNav-l')
        
        //cambio colore link//
        links.forEach((el)=>{
            el.addEventListener('mouseover', ()=> {
                el.classList.remove
                ('text-w')
                el.classList.add
                ('text-v')
            })
            
            el.addEventListener
            ('mouseleave', ()=> {
                el.classList.remove
                ('text-v')
                el.classList.add
                ('text-w')
            })
            
        })
        containerNav.classList.remove('radial-gradient')
        containerNav.classList.add('navbar')
        
    }
}) 






// logo//
window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    logo.style.transform = "rotate("+ window.scrollY / 12 + "deg)"
}


//numeri incrementali//
function createInterval(total, finalNumber, time) {
    let counter = 0;
    
    let interval = setInterval(() => {
        
        if (counter < total) {
            counter++;
            finalNumber.innerHTML = counter;
            
        } else {
            clearInterval(interval) //ferma counter
        }
        
        
    }, time);
}


let check = true;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((el) => {
        if (el.isIntersecting && check == true) {
            createInterval(500, firstnumber, 10);
            createInterval(300, secondnumber, 20);
            createInterval(90, thirdnumber, 70);
            check = false;
            setTimeout( ()=>{
                check=true;
            }, 3000)
        }
    })
})

observer.observe(thirdnumber);



let announcements = [
    { name: 'Malaga', category: 'viaggio', price: '1550' },
    { name: 'Los Angeles', category: 'viaggio+alloggio', price: '3550' },
    { name: 'Roma', category: 'Viaggio', price: '100' },
    { name: 'Parigi', category: 'Viaggio+alloggio', price: '2000' },
    { name: 'Grecia', category: 'Volontariato+Alloggio', price: '1500' },
    { name: 'Sud-America', category: 'Tour', price: '2000' },
    { name: 'Dubai', category: 'Viaggio', price: '4500' },
    
    
]

announcements.forEach((annuncio, i) => {
    if (i >= announcements.length-3 ) {
        let div = document.createElement('div');
        div.classList.add('col-12', 'col-md-3', 'm-md-3');
        div.innerHTML = `
        <div class="card">
        <img src="https://picsum.photos/${500+i}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${annuncio.name}</h5>
        <p class="card-text">${annuncio.category}</p>
        <p class="card-text">${annuncio.price}</p>
        </div>
        </div>
        `;
        cardWrapper.appendChild(div)
    }
})



// oggetto per creare recensioni dinamiche

let reviews = [
    { name: 'Gabriele' , description: 'ottimo', voto:5},
    { name: 'Domenico' , description: 'amazing', voto:4},
    { name: 'Rosanna' , description: 'carino ma si poteva organizzare meglio', voto:3},
    { name: 'Giulio' , description: 'Pessimo', voto:1},
]

reviews.forEach((review)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="review-card">
    <p>${review.name}</p>
    <p>${review.description}</p>
    <div id='starWrapper' class= 'd-flex'> 
    ${createStar(review.voto)}

    </div>
    </div>
    `
    swiperwrapper.appendChild(div);
})

function createStar(stars) {
    let finalstars = '';

    for (let i = 1; i <= stars; i++) {
        finalstars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`
    }

    for (let i = 0; i < 5-stars; i++) {
        finalstars += `<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`
        
    }

    return finalstars;
}







//swiper (ultimo)
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});


