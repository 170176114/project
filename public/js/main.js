$.ajax({
    url: "http://localhost:3000/video",
    dataType: 'json',
    type: 'get',
    cache:false,
    success: function(data){
        console.log(data);
        for (i = 0; i<data.length; i++){
            
            $(".flex-container").append(
                
                '<li class="flex-item">' + 
                '<video width="320" height="240" controls>' +
                '<source src="/static/video/' + data[i].name + '.mp4" type="video/mp4">' +
                '</video>' + '<br>' +
                'File name: ' + data[i].name +
                '</li>'
            );
        }

    }
})
