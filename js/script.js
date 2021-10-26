document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
         document.getElementById('contents').style.visibility="hidden";
    }
    else if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('load').style.display="none";
           document.getElementById('contents').style.visibility="visible";
        },1000);
    }
  }

function init() {
    textImage = TextImage();
    form = document.querySelector('form');
    textarea = form.querySelector('textarea[name="image-text"]');
    imageDisplay = form.querySelector('.image-display');
    imageDownload = form.querySelector('.image-download');
    form.addEventListener('change', updateImage, false);
    textarea.addEventListener('keyup', updateImage, false);
    updateImage();
}

function updateImage() {
    var style = {
            font: 'FrenchFries',
            size: parseInt(form.querySelector('select[name="font-size"]').value),
            lineHeight: "1.5em"
        },
        message = textarea.value;
    textImage.setStyle(style);
    textImage.toImage(message, function () {
        imageDisplay.innerHTML = this.outerHTML;
        imageDownload.href = this.src;
        // imageDisplay.appendChild(imageDownload);
    });
}

window.addEventListener('load', init, false);
