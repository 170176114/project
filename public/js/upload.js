$(document).ready(function(){
    $('input').change(function () {
      $('p').text(this.files.length + " file(s) selected");
    });
  });