src="https://code.jquery.com/jquery-3.6.0.min.js"
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin="anonymous"

function bababon(){
    document.getElementById("gyou");
}

$(function(){
    //.accordion_oneの中の.accordion_headerがクリックされたら
    $('#bt').click(function(){
      //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerの横幅を開いたり閉じたりする。
      $('.id').animate({width:'toggle'});
      $('.id').toggleClass("open");
    });
});