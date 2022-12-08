let table;

const titles = [
    "検査日付",
    "検査数",
    "合格数",
    "平均気温",
    "平均湿度",
    "平均照度",
    "平均サイクルタイム",
    "最小サイクルタイム",
    "最大サイクルタイム"
];



function setTitle() {
    titleRow = table.insertRow();
    titles.forEach(element => {
        th = document.createElement('th');
        th.
        th.append(element);
        th.addEventListener('click', (j) => {
            console.log(j);
        });
        titleRow.append(th);
    })
}

