$.ajax({
    url: "http://localhost:3000/records",
    dataType: 'json',
    type: 'get',
    cache:false,
    success: function(data){
        
        for (i = 0; i<data.length; i++){
            console.log(data[i]._id.name);
            $(".flex-container").append(
                
                '<li class="flex-item">' + 
                '<img src="../static/image/' + data[i]._id.name + 'width="300" height="220">'+
                '</li>'
            );
        }

    }
})
