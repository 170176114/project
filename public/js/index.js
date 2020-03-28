$.ajax({
    url: 'http://127.0.0.1:4000/camera',
    type: "get",
    dataType: "json",
   
    success: function(data) {
        drawTable(data);
        
    }
});

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    console.log(rowData)
    var row = $("<tr />")
    $("#personDataTable").append(row); 
    row.append($("<td>" + rowData._id.name + "</td>"));
    row.append($("<td>" + rowData._id.DateAndTime + "</td>"));
    row.append($("<td>" + rowData.count + "</td>"));
}