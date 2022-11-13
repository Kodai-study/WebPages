src = "https://code.jquery.com/jquery-3.6.0.min.js"
integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin = "anonymous"



$(function () {
  $('#bt').click(function () {
    //$('.inner_IC').animate({ "width": 'toggle', fontSize: 'toggle' }, 250);
    $('.inner_IC').animate({ "width": 'toggle'}, 250);
  });
});

function toggleDetails(name) {
  $('.inner_' + name).animate({ "width": 'toggle', fontSize: 'toggle' }, 250);
}


let table;
let colums;


/**
 * jsonからデータを取得して、項目を設定する
 */
function getData() {
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
        [members.colum.IC.have_1, members.colum.IC.have_2, members.colum.IC.dir_1, members.colum.IC.dir_2];
      addDetail(cols, "IC");

      cols =
        [members.colum.WORK.have_work, members.colum.WORK.dir_work];
      addDetail(cols, "WORK");
      addDetail(members.colum.R, "R");

      setResult(members.result);

    })
}


/**
 * 結果を表に入れていく。詳細項目は、親項目をクリックしたときに出てくるように設定する
 * @param {結果のJSON} member 
 */
function setResult(member) {
  member.forEach(element => {
    row = table.insertRow();
    row.insertCell().append(element.id);
    {
      const ic = element.IC;
      createChild(row, ic.result, null);
      createChild(row, ic.have_1, "IC");
      createChild(row, ic.have_2, "IC");
      createChild(row, ic.dir_1, "IC");
      createChild(row, ic.dir_2, "IC");
    }
    /* WORKの結果代入 */
    {
      const work = element.WORK;
      createChild(row, work.result, null);
      createChild(row, work.have_work, "WORK");
      createChild(row, work.dir_work, "WORK");
    }

    {
      createChild(row, element.DIPSW, null);
    }

    {
      //TODO 合格、不合格かなどを見て表示を見やすくする
      const resigter = element.R;
      createChild(row, resigter.result, null);
      for (let i = 1; i <= 15; i++) {
        createChild(row, resigter[i], "R");
      }
    }
  });

}


function createChild(row, result, partsName) {
  cell = row.insertCell();
  cell.append(result);
  if (partsName != null)
    cell.classList.add("inner_" + partsName);
}


//TODO 写真を表の上側に表示するようにする
let img = document.createElement('img');
img.src = "../img/IC.png";
img.height = '50';
img.width = 50;

let i = document.createElement('center');
i.append(img);

/**
 * 大分類(IC,TRなど)の下に詳細な項目を追加し、クリックで出てくるようにする
 * @param {string[]} members 下にぶら下がる項目
 * @param {String} name  大分類の名前
 */
function addDetail(members, name) {
  let index = 0;
  for (index = 0; index < colums.children.length; index++) {
    let target = colums.children[index];
    if (target.textContent === name) {
      target.onclick = () => { toggleDetails(name) };
      target.style.cursor = "pointer";
      target.append(i);
      break;
    }
  }

  members.forEach(element => {
    let th = colums.insertCell(++index);
    let span = document.createElement('span');
    span.classList.add("inner");
    span.append(element);
    th.append(span);
    th.classList.add("inner_" + name);
    //th.style.display = 'none';
    th.outerHTML = th.outerHTML.replace('<td', '<th');
  });
}