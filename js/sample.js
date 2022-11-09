

function e(data) {
    console.log("項目一覧");
    console.log(data.colum.IC);
    let table = $("table")[0];
    let colums = table.insertRow();
    data.parts.forEach(element => {
        let col = document.createElement('th');
        col.id = element;
        col.append(element);
        colums.append(col);

    });
    colums = table.insertRow();
    data.parts.forEach(element => {
        let col = colums.insertCell();
        col.id = element;
        col.append(element);
    });
}

function fadeout() {
    let table = $("table")[0];
    table.fadeout;
}


jQuery(function () {
    // チェックボックスの表示切替ボタンのクリックイベントを検知
    jQuery('.checkbox-toggle').on('click', function () {
        // チェックボックスの表示をslideToggleで切り替える
        jQuery('.checkboxes').slideToggle();
    });
});

$(function () {
    $(".btn").on('click', function () {
        $('.box').animate({ width: "toggle" }, 100);
    });
});

$('#bt').click(function () {
    $('#bt').slideToggle();
});