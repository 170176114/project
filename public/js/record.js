$.ajax({
    url: "http://localhost:3000/records",
    dataType: 'json',
    type: 'get',
    cache:false,
    success: function(data){
        
        for (i = 0; i<data.length; i++){
            console.log(data[i]._id.name);
            $(".thumbnails").append(
                
                '<div class="box">' + 
                '<img src="../static/image/' + data[i]._id.name + '" width="300" height="220"> ' + 
                '<div class="inner">' +
                '<h3>' +
                data[i]._id.DateAndTime + '<br>' +
                'time of minutes: ' + data[i].count +
                '</h3>' + 
                '</div>' +
                '</div>'
            );
        }

    }
})
