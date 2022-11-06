$(document).ready(function(){

    $('form').on('submit', function(){
       console.log('submit-values')
        
        var item = $('form input');
        var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
      // $('li').css('background','darkblue')
       console.log('clicked')

        var item = $(this).text().trim().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
            console.log('deleted succesfully')
          }
        });
    });
  
  });