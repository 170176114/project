$.ajax({
    url: "http://localhost:3000/video",
    dataType: 'json',
    type: 'get',
    cache:false,
    success: function(data){
        console.log(data);
        for (i = 0; i<data.length; i++){
            
            $(".thumbnails").append(
                '<div class="box">' +
                // '<a href="https://youtu.be/s6zR2T9vn2c" class="image fit"><img src="images/pic01.jpg" alt="" /></a>' +
                '<video width="320" height="240" controls>' +
                '<source src="/static/video/' + data[i].name + '.mp4" type="video/mp4">' +
                '</video>' +
                '<div class="inner">' +
                '<h3>File name: ' + data[i].name +
                '</h3>'+
                '</div>' +
                '</div>'
                
                // '<li class="flex-item">' + 
                // '<video width="320" height="240" controls>' +
                // '<source src="/static/video/' + data[i].name + '.mp4" type="video/mp4">' +
                // '</video>' + '<br>' +
                // 'File name: ' + data[i].name +
                // '</li>'
            );
        }

    }
})
