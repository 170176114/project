$.ajax({
    url: "http://localhost:3000/all_item",
    dataType: 'json',
    type: 'get',
    cache:false,
    success: function(data){
        console.log(data);
        for (i = 0; i<data.length; i++){
            
            $(".flex-container").append(
                
                '<li class="flex-item">' + 
                data[i].name + '<br>' + '<br>' +
                '<img src="../static/image/' + data[i].image + '" width="300" height="220" ' + '<br>' +
                '<form action="/one_item" method="POST"> ' +
                '<input type="hidden" value="' + data[i]._id + '"' + ' name = "product_id" >' + 
                '<input type="hidden" value="' + data[i].username + '"' + ' name = "created_by" >' + 
                '<input type="hidden" value="' + data[i].image + '"' + ' name = "product_image" >' + 
                '<input type="hidden" value="' + data[i].name + '"' + ' name = "product_name" >' + 
                '<input type="hidden" value="' + data[i].description + '"' + ' name = "description" >' + 
                '<input type="hidden" value="' + data[i].price + '"' + ' name = "price" >' + 
                '<input type="hidden" value="' + data[i].location + '"' + ' name = "location" >' + 
                '<input type="hidden" value="' + data[i].phone + '"' + ' name = "phone" >' + 

                '<button type="submit" class="btn btn-primary">Detail</button>' + '<br>' + 
                '</form>' +
                '</li>'
            );
        }

    }
})

$(function(){

    $('input[type="text"]').keyup(function(){

        var search = $(this).val();

        $("li").each(function(){

            var Thetext = $(this).text(),
                show = Thetext.indexOf(search) !== -1;

            $(this).toggle(show);

        });     
    });

});
