$( function() {
  $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd', changeYear:true, constrainInput: false, gotoCurrent: false, yearRange: "1900:2200"});
  $( "#format" ).on( "change", function() {
    $( "#datepicker" ).datepicker( "option", "dateFormat", $( this ).val() );
  });
} );

// $( ".selector" ).datepicker({
//   gotoCurrent: true
// });
