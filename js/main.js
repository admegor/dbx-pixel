const radioInput = document.querySelectorAll('.radioInput');

document.addEventListener('DOMContentLoaded', function() {
    const titleSecond = document.querySelectorAll('.title-second');
    for(title of titleSecond) 
    {
        const titleText = title.innerText.split(' ');
        if (titleText.length > 1) {
            title.innerHTML = `${titleText[0]} <span class="purple">${titleText[1]}</span> ${title.innerText.slice(Number(titleText[0].length) + Number(titleText[1].length + 2))}`
        }

    }
    function disableSelection(element) {
        if(typeof element.onselectstart != 'undefined') {
            element.onselectstart = function() {
                return false;
            }
        }
        else if (typeof element.style.MozUserSelect != 'undefined') {
            element.style.MozUserSelect = 'none';
        }
        else {
            element.onmousedown = function() {
                return false;
            }
        }
    }
    radioInput.forEach(el => disableSelection(el))
})

const tokenNameInput = document.getElementById('tokenName');
const tokenName = document.querySelector('.main__create-name');

const tokenCostInput = document.getElementById('tokenCost');
const tokenCost = document.querySelector('.main__create-cost');

const tokenContactInput = document.getElementById('tokenContact');

const releaseButton = document.getElementById('releaseButton');

const requiredFields = document.querySelectorAll('.formRequired');



tokenNameInput.addEventListener('input', function() {
    tokenName.innerText = tokenNameInput.value;
    if(tokenNameInput.value.length > 16) {
        tokenNameInput.value = tokenNameInput.value.slice(0, 15);
    }
    tokenNameInput.value.length > 10 ? tokenName.classList.add('_big') : tokenName.classList.remove('_big');

});

tokenCostInput.addEventListener('input', function() {
    tokenCost.innerText = tokenCostInput.value + ' $';
    if (tokenCostInput.value > 1000000) {
        tokenCostInput.value = 1000000;
    }


});

for(reqField of requiredFields) {
    reqField.addEventListener('input', function() {
        let i = 0;
        requiredFields.forEach(el => {
            if(el.value != '') {
                i++;
            }
        })
        if(i == requiredFields.length) {
            releaseButton.disabled = false;
        }
        else {
            releaseButton.disabled = true;
        }
    })
}

const customImage = document.getElementById('customImage');
const closeCustomImage = document.getElementById('closeImagePopup');
const resultImg = document.querySelector(".main__create-img");

resultImg.addEventListener('click', function(e) {
    document.querySelector(this.getAttribute('data-href')).classList.add('_active');
    document.querySelector('body').classList.add('_lock');
})


customImage.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).classList.add('_active');
    document.querySelector('body').classList.add('_lock');
})

closeCustomImage.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).classList.remove('_active');
    document.querySelector('body').classList.remove('_lock');
})



const resultImage = document.getElementById('resultImage');

for(radio of radioInput) {
    radio.addEventListener('click', function() {
        resultImage.setAttribute('src', this.getAttribute('src'));
    })
}


const sliderImages = document.querySelectorAll('.main__slider-item');
const sliderLine = document.querySelector('.main__slider-line');

const sliderNext = document.querySelector('.main__slider-next');
const sliderPrev = document.querySelector('.main__slider-prev');
const sliderName = document.querySelector('.main__slider-name');

let sliderCount = 0;
let sliderWidth;

const rocketItem = document.querySelector('.main__business-bg');
window.addEventListener('scroll', animOnScroll);
function animOnScroll() {
    const rocketItemHeight = rocketItem.offsetHeight;
    const rocketItemOffset = offset(rocketItem).top;
    const animStart = 1;

    let animItemPoint = window.innerHeight = rocketItemHeight / animStart;
    if(rocketItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if((pageYOffset > rocketItemOffset - animItemPoint) && pageYOffset < (rocketItemOffset + rocketItemHeight)) {
        rocketItem.classList.add('_active');
    }
    else {
        rocketItem.classList.remove('_active');
    }
}
function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

function promoHeight() {
    let headerHight = document.getElementById('header').offsetHeight;
    const mainSection = document.querySelector('.main__section');
    const heightWindow = document.documentElement.clientHeight;

    let mainSectionHeight = heightWindow - headerHight;

    if( window.innerWidth >= 1024 ){
        mainSection.style.height = mainSectionHeight + "px";
    } else {
        mainSection.style.height = 'initial';
    }
}

if( window.innerWidth >= 1024 ){
    promoHeight();
} 

window.addEventListener('resize', () => {
    promoHeight();
});

$(document).ready(function(){
    let mainSliderNname = document.querySelector('.main__slider-name');

    $('.main__slider-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 768,
                settings: {
                    swipe: false,
                }
            }
          ]    
    });
    
    $('.main__slider-slider').on("afterChange", function(event, slick, currentSlide, nextSlide) {
        if (currentSlide === 0) {
            mainSliderNname.textContent = "Dogelon Mars";
        } else if (currentSlide === 1) {
            mainSliderNname.textContent = "Shiba token";
        } else if (currentSlide === 2) {
            mainSliderNname.textContent = "Dogecoin";
        }
    });
    
    const mainSliderImages = document.querySelectorAll('.main__slider-image-wrap');    
     
        mainSliderImages.forEach( mainSliderImage => {
            console.log(mainSliderImage);
            mainSliderImage.scrollLeft = 1000;
        })    
    
})

