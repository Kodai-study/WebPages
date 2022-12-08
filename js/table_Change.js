src = "https://code.jquery.com/jquery-3.6.0.min.js"
integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin = "anonymous"

let viewColums = document.getElementsByName("check");
viewColums.forEach(element => {
    element.onchange = function(){
        console.log(element.value);
        $(".IC").css("display","none");
    }
})
