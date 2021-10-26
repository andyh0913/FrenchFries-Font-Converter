const char2image = {    "!": "images/!.png", 
                        "#": "images/#.png", 
                        "$": "images/$.png", 
                        "%": "images/%.png", 
                        "&": "images/&.png", 
                        "(": "images/(.png",
                        ")": "images/).png",
                        ",": "images/,.png",
                        ".": "images/_.png",
                        "'": "images/'.png",
                        "?": "images/-.png",
                        ";": "images/;.png",
                        "@": "images/@.png",
                        "^": "images/^.png",
                        "_": "images/__.png",
                        "`": "images/`.png",
                        "~": "images/~.png",
                        "´": "images/´.png",
                        "’": "images/'.png",
                        "+": "images/+.png",
                        "=": "images/=.png",
                        "×": "images/×.png",
                        "0": "images/0.png",
                        "1": "images/1.png",
                        "2": "images/2.png",
                        "3": "images/3.png",
                        "4": "images/4.png",
                        "5": "images/5.png",
                        "6": "images/6.png",
                        "7": "images/7.png",
                        "8": "images/8.png",
                        "9": "images/9.png",
                        "“": "images/--46.png",
                        "”": "images/--59.png",
                        '"': "images/--60.png",
                        "A": "images/A.png",
                        "B": "images/B.png",
                        "C": "images/C.png",
                        "D": "images/D.png",
                        "E": "images/E.png",
                        "F": "images/F.png",
                        "G": "images/G.png",
                        "H": "images/H.png",
                        "I": "images/I.png",
                        "J": "images/J.png",
                        "K": "images/K.png",
                        "L": "images/L.png",
                        "M": "images/M.png",
                        "N": "images/N.png",
                        "O": "images/O.png",
                        "P": "images/P.png",
                        "Q": "images/Q.png",
                        "R": "images/R.png",
                        "S": "images/S.png",
                        "T": "images/T.png",
                        "U": "images/U.png",
                        "V": "images/V.png",
                        "W": "images/W.png",
                        "X": "images/X.png",
                        "Y": "images/Y.png",
                        "Z": "images/Z.png",
                        " ": "images/space.png"
                    }

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
    // textImage = TextImage();
    form = document.querySelector('form');
    textarea = form.querySelector('textarea[name="image-text"]');
    imageDisplay = form.querySelector('.image-display');
    imageDownload = form.querySelector('.image-download');
    form.addEventListener('change', updateImage, false);
    textarea.addEventListener('keyup', updateImage, false);
    updateImage();
}

function updateImage() {
    var message = textarea.value;
    var scale = parseInt(form.querySelector('select[name="font-size"]').value)
    message = message.toUpperCase()
    const map = Array.prototype.map
    imageArray = map.call(message, x => char2image[x]?char2image[x]:char2image["?"])
    var parent = document.createElement('div')
    parent.style = 'padding: 0; display: block; position: fixed; top: 30%; overflow: hidden;'
    // imageDisplay.innerHTML = ''
    const fontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));
    // console.log(fontSize)
    document.body.appendChild(parent)
    imageArray.forEach((url, i )=> {
        var newImg = document.createElement("img")
        newImg.src = url;
        newImg.height = scale * fontSize;
        newImg.crossOrigin = 'anonymous';
        if (i !== 0) newImg.style.marginLeft = (-0.25 * scale * fontSize).toString() + 'px';
        parent.appendChild(newImg);
    });
    
    html2canvas(parent, {allowTaint: true, useCORS: true, backgroundColor: "rgba(0,0,0,0)"}).then(function(canvas) {
        // console.log(imageDisplay)
        if (canvas.toDataURL() === "data:,") {
            imageDisplay.src = ""
            imageDownload.href = ""
        }
        else {
            imageDisplay.src = canvas.toDataURL()
            imageDownload.href = canvas.toDataURL()
        }
        
    })
    document.body.removeChild(parent);

    // var style = {
    //         font: 'FrenchFries',
    //         size: parseInt(form.querySelector('select[name="font-size"]').value),
    //         lineHeight: "1.5em"
    //     },
    //     message = textarea.value;
    // textImage.setStyle(style);
    // imageDisplay.src = textImage.toDataURL(message);
    // imageDownload.href = imageDisplay.src;
    // textImage.toImage(message, function () {
    //     imageDisplay.innerHTML = this.outerHTML;
    //     imageDownload.href = this.src;
    //     // imageDisplay.appendChild(imageDownload);
    // });
}

window.addEventListener('load', init, false);
