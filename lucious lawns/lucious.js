let hamburger = document.getElementById('hamburger');
let menu = document.getElementById('mobile_ul');

function change(){
    hamburger.addEventListener('click',function(){
    menu.classList.toggle('active');
    })
}

change();

