let links = document.querySelectorAll('.nav-link');
let navbar = document.querySelector('.navbar');
let containerNav = document.querySelector('#containerNav');
let logo = document.querySelector('.logo')
let firstnumber = document.querySelector('#firstnumber');
let secondnumber = document.querySelector('#secondnumber');
let thirdnumber = document.querySelector('#thirdnumber');
let cardWrapper = document.querySelector('#cardWrapper');
let swiperwrapper = document.querySelector('.swiper-wrapper');



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
        // 
        // containerNav.classList.remove('navbar')
        // containerNav.classList.add('radial-gradient')
        // 
        
        
        
        
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
        // containerNav.classList.remove('radial-gradient')
        // containerNav.classList.add('navbar')
        
    }
}) 


// logo//
window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    logo.style.transform = "rotate("+ window.scrollY / 12 + "deg)"
}





//1
fetch('./annunci.json')
//2
.then((response)=> response.json())
//3
.then((data)=>{
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');
    // let radios = document.querySelector('.form-check-input');
    // 
    let numberPrice = document.querySelector('#numberPrice');
    let wordInput = document.querySelector('#wordInput');

    
    
    function setRadios() {
        let categories = data.map((annuncio)=> annuncio.category)
        
        // let uniqueCategories = [];
        
        // categories.forEach((category)=>{
        // if (!uniqueCategories.includes(category)) {
        // uniqueCategories.push(category)
        // }
        // })
        
        let uniqueCategories = Array.from(new Set(categories))
        // console.log(uniqueCategories);
        // 
        uniqueCategories.forEach((el)=>{
            let div= document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML=`
            <input class="form-check-input" 
            type="radio" 
            name="categories" 
            id="${el}">
            <label 
            class="form-check-label" 
            for="${el}">
            ${el}
            </label>
            `
            
            radioWrapper.appendChild(div)
        })
    }
    
    setRadios()
    
    let radios = document.querySelectorAll('.form-check-input');
    console.log(Array.from(radios));
    
    
    //card dinamiche
    function showCards(array) {
        cardsWrapper.innerHTML= '';
        array.forEach((annuncio)=> {
            let div= document.createElement('div');
            div.classList.add('ann-card');
            div.innerHTML= `
            <h3>${annuncio.name}</h3>
            <p>${annuncio.category}</p>
            <p>${annuncio.price} €</p>
            `
            cardsWrapper.appendChild(div)
        });
    }
    
    showCards(data)



    
    //funzione filtraggio per categoria
    function filterByCategory(array) {
        let checked = Array.from(radios).find((button)=> button.checked)
        let categoria = checked.id
        
        if (categoria == 'All') {
           return array
        } else {
            let filtered = array.filter((annuncio)=> annuncio.category == categoria)
            return filtered
        }
        
    }
    
    radios.forEach((button)=>{
        button.addEventListener('click', ()=>{
            globalFilter()
        })
    })




    //funzione settaggio prezzo

    function setInputPrice() {
        let prices = data.map((annuncio)=> Number(annuncio.price))
        let maxPrice = Math.ceil(Math.max(...prices));
        customRange.max = maxPrice;
        customRange.value = maxPrice;
        numberPrice.innerHTML = `${maxPrice} €`
         
    }


    function filterByPrice(array) {
        let filteredPrice = array.filter((annuncio)=> Number(annuncio.price) <= Number(customRange.value))
       return filteredPrice;

    }
    
    setInputPrice()
    // console.log(data);
    
    customRange.addEventListener('input', ()=>{
        globalFilter();
        numberPrice.innerHTML = customRange.value;

    })


    
    //funzione filtro per parola 
    function filterByWord(array) {
        let filteredWord = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())) 
        return filteredWord;
    }



    //evento che all'input inserisce valore
    wordInput.addEventListener('input', ()=>{
        globalFilter(wordInput.value)
    })


    //filtro globale
    function globalFilter() {
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);

        showCards(filteredByWord)
    }
    
    globalFilter()
    
    
    
    
    
    
    
    
    
    
})
