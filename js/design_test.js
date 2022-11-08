src = "https://code.jquery.com/jquery-3.6.0.min.js"
integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin = "anonymous"



$(function () {
  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('#bt').click(function () {
    //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerの横幅を開いたり閉じたりする。
    $('.inner_IC').animate({ "width": 'toggle',fontSize: 'toggle'},250);
    $('.inner_IC').toggleClass("open");
  });
});

let table;
let colums;

function getData(){
fetch("../sample_json/sample_result.json") // jsonファイルの場所
  .then((response) => {
    return response.json();
  })
  .then((members) => {
    console.log(members);
    table = $('table')[0];
    colums = table.insertRow();
    members.parts.forEach(element => {
      th = document.createElement('th');
      th.append(element);
      colums.append(th);
    }); //foreach
    
    let cols = 
    [members.colum.IC.have_1,members.colum.IC.have_2,members.colum.IC.dir_1,members.colum.IC.dir_2];
    addDetail(cols,"IC");

    cols = 
    [members.colum.WORK.have_work,members.colum.WORK.dir_work];
    addDetail(cols,"WORK");

  })
}


/**
 * あれするやつ
 * @param {配列} members 
 * @param {*} name 
 */
function addDetail(members,name){
  let index = 0;
  for(index = 0;index < colums.children.length;index++){
    if(colums.children[index].textContent === name)
      break;
  }

  members.forEach(element => {
    let th = colums.insertCell(++index);
    th.append(element);
    th.classList.add("inner_" + name);
    th.outerHTML = th.outerHTML.replace('<td','<th');
  });
}