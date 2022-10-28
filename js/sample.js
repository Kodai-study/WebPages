function e(data){
    console.log("項目一覧");
    console.log(data.colum.IC);
    let table = $("table")[0];
    let colums = table.insertRow();
    data.parts.forEach(element => {
        let col = document.createElement('th');
        col.append(element);
        colums.append(col);
    });
    colums = table.insertRow();
    data.parts.forEach(element => {
        let col = colums.insertCell();
        col.append(element);
    });
}