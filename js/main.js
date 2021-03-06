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

const tokenAmountInput = document.getElementById('tokenAmount');

const tokenContactInput = document.getElementById('tokenContact');

const releaseButton = document.getElementById('releaseButton');

const requiredFields = document.querySelectorAll('.formRequired');



tokenNameInput.addEventListener('input', function() {
    tokenName.innerText = tokenNameInput.value;
    releaseButton.dataset.tokenName = tokenNameInput.value;
    if(tokenNameInput.value.length > 16) {
        tokenNameInput.value = tokenNameInput.value.slice(0, 15);
    }
    tokenNameInput.value.length > 10 ? tokenName.classList.add('_big') : tokenName.classList.remove('_big');

});

tokenAmountInput.addEventListener('input', function() {
    releaseButton.dataset.tokenAmount = tokenAmountInput.value;
});

tokenCostInput.addEventListener('input', function() {
    tokenCost.innerText = tokenCostInput.value + ' $';
    releaseButton.dataset.tokenPrice = tokenCostInput.value + ' $';
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
            releaseButton.classList.remove('main__button--disabled');
        }
        else {
            releaseButton.classList.add('main__button--disabled');
        }
    })
}

const customImage = document.getElementById('customImage');
const closeCustomImage = document.getElementById('closeImagePopup');
const resultImg = document.querySelector(".main__create-image");

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


for(radio of radioInput) {
    radio.addEventListener('click', function() {
        const resultImage = document.querySelector('.main__create-image');
        let imageSrc = this.getAttribute('src');
        resultImage.style.backgroundImage = `url(${imageSrc})`;
    })
}

function handlerForm(popupLink) {
    let tokenName = document.querySelector('input[name="token-name"]');
    let tokenAmount = document.querySelector('input[name="token-amount"]');
    let tokenPrice = document.querySelector('input[name="token-price"]');
    tokenName.value = popupLink.dataset.tokenName;
    tokenAmount.value = popupLink.dataset.tokenAmount;
    tokenPrice.value = popupLink.dataset.tokenPrice;
}

//slider old


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

// Slider

$(document).ready(function(){
    let mainSliderNname = document.querySelector('.main__slider-name');

    $('.main__slider-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,  
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
            mainSliderImage.scrollLeft = 1000;
        })    
    
})

// modals

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
let yaId = 'token_eng';

const timeout = 800;

for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', function(e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        let titleModal = popupLink.dataset.theme;
        yaId = popupLink.dataset.yaid;

        popupOpen(currentPopup, titleModal, yaId);
        e.preventDefault();

        if (popupLink.classList.contains('main__button--popup')) {
            handlerForm(popupLink);
        }
    })
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            e.preventDefault();
            popupClose(el.closest('.popup-pixel'));
        })
    }
}

function popupOpen(currentPopup, title) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup-pixel.open');
        const popupTheme = document.querySelector('.popup-pixel__theme');
        const popupTitle = document.querySelector('.popup-pixel__title');
        const userName = document.querySelector('#user-name');
        let popupTitleTheme = '';
        let popupTitleText =  [];

        setTimeout(function () {
            userName.focus();
        }, timeout);

        if (document.documentElement.lang == "en-US") {
            popupTitleTheme = "Theme: ";
            popupTitleText[0] = "Free consultation";
            popupTitleText[1] = "There's only one step left...";
        } else if (document.documentElement.lang == "ru" || "ru-RU") {
            popupTitleTheme = "Тема: "
            popupTitleText[0] = "Бесплатная консультация";
            popupTitleText[1] = "Остался всего один шаг...";
        } else {
            console.log("document.documentElement.lang: Error")
        }

        if (title !== undefined) {
            popupTheme.innerHTML = `<span class="accent-text">${popupTitleTheme}</span>${title}</div>`;
            popupTitle.textContent = popupTitleText[0];
        } else {
            popupTitle.textContent = popupTitleText[1];
            popupTheme.innerHTML = ``;
        }
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock();
        }

        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup-pixel__content')) {
                popupClose(e.target.closest('.popup-pixel'));
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding > 0) {
        for (let index = 0; index < lockPadding.length; i++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px'
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}

document.addEventListener('keydown', function(e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup-pixel');
        if (popupActive.classList.contains('open')) {
            popupClose(popupActive);
        }
    }
})

// add file image

const inputImageBtn = document.querySelector('#imageSelect');
const resultImageWrap = document.querySelector('.main__create-image-wrap');
const customImagePopup = document.getElementById('customImagePopup');
const fileFieldHidden = document.querySelector('.file-field-hidden');
const fileFieldVisible = document.querySelector('.file-field-visible');
const dropZoneElement = document.querySelector('.popup__image-content');
const dropZoneBorder = document.querySelector('.popup__image-border');

const changeHandler = event => {
    if (!event.target.files.length) {
        return
    } 
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (!file.type.match('image')) {
            return
        }
        const reader = new FileReader();
        
        reader.onload = ev => {
            const resultImage = document.querySelector('.main__create-image');
            resultImage.remove();
            const srcImage = ev.target.result;
            
            resultImageWrap.insertAdjacentHTML('afterbegin', `<div class="main__create-image" data-href="#customImagePopup" style="background-image: url(${srcImage});">
                                                                <img src="https://dbx.so/wp-content/themes/dibix/assets/create-token/img/border-cicle.png" alt="">
                                                                </div>`);
            customImagePopup.classList.remove('_active');
            body.classList.remove('_lock');
        }
        reader.readAsDataURL(file);
    })
}


const triggerInput = () => fileFieldHidden.click();

fileFieldVisible.addEventListener('click', triggerInput);

//drag-and-drop

dropZoneElement.addEventListener('dragover', e => {
    e.preventDefault();
    dropZoneBorder.classList.add('popup__image-border--active');
})
dropZoneElement.addEventListener('dragleave', e => {
    e.preventDefault();
    dropZoneBorder.classList.remove('popup__image-border--active');
})
dropZoneElement.addEventListener('dragend', e => {
    e.preventDefault();
    dropZoneBorder.classList.remove('popup__image-border--active');
})

dropZoneElement.addEventListener('drop', e => {
    e.preventDefault();
    inputImageBtn.files = e.dataTransfer.files;
    
    const files = Array.from(inputImageBtn.files)
    
    files.forEach(file => {
        if (!file.type.match('image')) {
            return
        }
        const reader = new FileReader();
        
        reader.onload = ev => {
            const srcImage = ev.target.result;
            const resultImage = document.querySelector('.main__create-image');
            resultImage.remove();
            resultImageWrap.insertAdjacentHTML('afterbegin', `<div class="main__create-image" data-href="#customImagePopup" style="background-image: url(${srcImage});">
                                                                <img src="https://dbx.so/wp-content/themes/dibix/assets/create-token/img/border-cicle.png" alt="">
                                                                </div>`);
            customImagePopup.classList.remove('_active');
            body.classList.remove('_lock');
        }
        reader.readAsDataURL(file);
    })
})

inputImageBtn.addEventListener('change', changeHandler);


window.addEventListener('paste', e => {
    e.preventDefault();

    if (customImagePopup.classList.contains('_active')) {
        inputImageBtn.files = e.clipboardData.files;
        const files = Array.from(inputImageBtn.files)
    
        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }
            const reader = new FileReader();
    
            reader.onload = ev => {
                const resultImage = document.querySelector('.main__create-image');
                resultImage.remove();
                const srcImage = ev.target.result;                
                resultImageWrap.insertAdjacentHTML('afterbegin', `<div class="main__create-image" data-href="#customImagePopup" style="background-image: url(${srcImage});">
                                                                <img src="https://dbx.so/wp-content/themes/dibix/assets/create-token/img/border-cicle.png" alt="">
                                                                </div>`);
                customImagePopup.classList.remove('_active');
                body.classList.remove('_lock');
            }
            reader.readAsDataURL(file);
        })        
    }
  });
  
function handlerYaId(ID) {
    ym(73948678,'reachGoal',ID);
}

const popupFormSubmit = document.getElementById('popupFormSubmit');
const popupPixelSuccess = document.getElementById('popup-pixel-success');
let popupCounter = document.querySelector('.popup-success__timer-counter');
const cf7Submit = document.querySelector('.main__form .wpcf7-submit');
const mainForm = document.querySelector('#mainForm');

cf7Submit.addEventListener('click', () => {
    yaId = mainForm.dataset.yaid;
})

document.addEventListener( 'wpcf7mailsent', function() {
    popupOpen(popupPixelSuccess);
    console.log(yaId);
    handlerYaId(yaId);
    
    let count = 5;
    const successTimer = setInterval(() => {
        popupCounter.textContent = count;
        count--;
        if (count === 0) {
            clearInterval(successTimer);
            const userLang = document.documentElement.lang
            console.log(userLang);
                if (document.documentElement.lang == "en-US") {
                    window.location.replace("https://dbx.so/tokenization/create-token/");
                } else if (document.documentElement.lang == "ru" || "ru-RU") {
                    window.location.replace("https://dbx.so/ru/create-token/");
                } else {
                    console.log("document.documentElement.lang: Error")
                }
            }
        }, 1000);
}, false );