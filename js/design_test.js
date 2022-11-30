src = "https://code.jquery.com/jquery-3.6.0.min.js"
integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin = "anonymous"


/**
 *  id=bt のボタンが押されたときの
 */
$(function () {
  $('#bt').click(function () {
    //$('.inner_IC').animate({ "width": 'toggle', fontSize: 'toggle' }, 250);
    $('.inner_IC').animate({ "width": 'toggle' }, 250);
  });
});

/**
 * 大分類をクリックしたときの処理。
 * 詳細項目がアニメーションで出てくる
 * @param {string} name 大分類となる部品の名前
 */
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
      table = $('table')[0];
      setTitle();
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
 *  APIを叩いてデータを貰って表示
 * @param {*} params 
 */
function getDataWithAPI(params) {
  fetch("https://rbpc04:7015/api/result") // jsonファイルの場所
    .then((response) => {
      console.log("hello");
      return response.text();
    })
    .then((members) => {
      let json = JSON.parse(members);
      setResultWithAPI(json);

    })
}

/**
 * JSONファイルを読み取って、検査項目をテーブルのth
 * に設定する。JSONは二次元配列
 */
function setTitle() {
  titleRow = table.insertRow();
  fetch("../sample_json/result_Titles.json")
    .then((response) => {
      return response.json();
    })
    .then((members) => {
      colums = table.insertRow();
      members.forEach(element => {
        th = document.createElement('th');
        th.append(element[1]);        //1項目目はテーブルに表示される番号
        th.classList.add(element[0]); //0項目目は検査パーツを表すID文字列
        colums.append(th);
        addDetail(element.slice(2), element[0]); //2項目目以降は詳細項目
      })
    })
}

/**
 * APIから取得したデータをテーブルの検査結果に入れる
 * @param {json} members 
 */
function setResultWithAPI(members) {
  members.forEach(element => {
    row = table.insertRow();

    /* 検査情報の追加 */
    createChild(row, element.workID, null, false);
    createChild(row, element.startTime, "ID", false);
    createChild(row, element.allResult, "ID", false);
    createChild(row, element.brightness, "ID", false);
    createChild(row, element.humidity, "ID", false);
    createChild(row, element.temprature, "ID", false);

    /* ICの結果の代入 */
    {
      const ic = element.result.ic;
      createChild(row, ic.allResult, null);
      createChild(row, ic.iC1_have, "IC");
      createChild(row, ic.iC2_have, "IC");
      createChild(row, ic.iC1_dir, "IC");
      createChild(row, ic.iC2_dir, "IC");
    }
    /* WORKの結果代入 */
    {
      const work = element.result.work;
      createChild(row, work.allResult, null);
      createChild(row, work.is_OK, "WORK");
      createChild(row, work.dir, "WORK");
    }
    /* 抵抗の結果代入 */
    {
      //TODO 合格、不合格かなどを見て表示を見やすくする
      const resigter = element.result.r;
      createChild(row, resigter.allResult, null);
      for (let i = 0; i < 15; i++) {
        createChild(row, resigter.results[i], "R");
      }
    }
    /* ダイオードの結果代入 */
    {
      const diode = element.result.diode;
      createChild(row, diode.allResult, null);
      createChild(row, diode.dir, "DIODE");
      createChild(row, diode.have, "DIODE");
    }
    /* LEDの結果代入 */
    {
      const LED = element.result.led;
      createChild(row, LED.allResult, null);
      createChild(row, LED.redDir, "LED");
      createChild(row, LED.greenDir, "LED");
      createChild(row, LED.whiteDir, "LED");
      createChild(row, LED.redHave, "LED");
      createChild(row, LED.greenHave, "LED");
      createChild(row, LED.whiteHave, "LED");
    }
    /* トランジスタの結果代入 */
    {
      const transistor = element.result.tr;
      createChild(row, transistor.allResult, null);
      createChild(row, transistor.dir, "TR");
      createChild(row, transistor.is_OK, "TR");
    }
    /* DIPスイッチの結果代入 */
    {
      if (element.result.dipSw.allResult === "〇")
        createChild(row, element.result.dipSw.allResult, null);
      else
        createChild(row, element.result.dipSw.pattern, null);
    }
  })
}


/**
 * 結果を表に入れていく。
 * テストのデータが入ったJSONから取ってくる
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
      //TODO 合格、不合格かなどを見て表示を見やすくする
      const resigter = element.R;
      createChild(row, resigter.result, null);
      for (let i = 1; i <= 15; i++) {
        createChild(row, resigter[i], "R");
      }
    }

    {
      createChild(row, element.DIPSW, null);
    }
  });
}


/**
 * 
 * @param {tr要素} row  要素を追加する行、CreateRowで作成されたtrタグの要素
 * @param {td要素の文字列} result 追加する文字列。セルが作成されてこの文字列が入る
 * @param {親になる大要素} partsName 親になる(そこから開閉する)大分類の要素。
 * @param {boolean} isBool 結果が合否で表される者でない場合にfalseを入れる
 */
function createChild(row, result, partsName, isBool) {
  let span = document.createElement("span");
  cell = row.insertCell();
  if (partsName != null)
    cell.classList.add("inner_" + partsName);


  if (isBool != false) {
    //OKかNGかでクラス分け
    if (result === "〇")
      span.classList.add("OK");
    else
      span.classList.add("NG");
  }
  span.append(result);
  cell.append(span);
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

    // nameの要素が見つかったら、場所を保存して、ポインタに設定
    if (target.classList.contains(name)) {
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