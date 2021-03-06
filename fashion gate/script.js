let hamburger = document.getElementById('hamburger');
let menu = document.getElementById('mb');
const navToggle = document.querySelector('.nav_toggle');


function slide(){
    hamburger.addEventListener('click',function(){
        menu.classList.toggle('active')
    })
}

slide()


var i = 0;
var images = [];
var time = 3000;




// image list

images[0] = 'pics/front.png';
images[1] = 'pics/reddress.png';
images[2] = 'pics/highfashion.png';

// change image


function changeImg(){
    document.slide.src = images[i];

    if(i < images.length - 1){
        i++;
    
    } else {
        i = 0;
    
        
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;
