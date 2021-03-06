// var empty_table = (function(){ $("#table_body").empty(); });
//
// var set_table = (function(innerHtml){
//   $("#table_body").append(innerHtml);
//   $('#res_table_bla').tablesort();
//   $('#res_table_bla thead th.number').data('sortBy', function(th, td, sorter) {
// 			return parseInt(td.text(), 10);
// 		});
//
// });
//
// var clusterData = (function(data_res,status){
//   var data = $.parseJSON(data_res).res;
//
// });
//
// var parseTableRes = (function(data_res,status){
//     var data = $.parseJSON(data_res).res;
//     var innerHtml ='';
//     var rowVal;
//     empty_table();
//     $.each(data, function(i,item){
//       rowVal = '<tr>'+
//                   '<td>' + item.muni + '</td>' +
//                   '<td>' + item.year + '</td>' +
//                   '<td>' + item.code + '</td>' +
//                   '<td>' + item.name + '</td>' +
//                   '<td>' + item.amount + '</td>' +
//                 '</tr>';
//       innerHtml += rowVal;
//     });
//     set_table(innerHtml);
// });

var set_autocomplete = (function (is_disabled){
  $("#search_input").autocomplete({
    disabled : is_disabled,
    search: function(event, ui) {
        $('#auto_data').empty();
    },
    source : "/api/v1/get_autocomplete",

  }).data('ui-autocomplete')._renderMenu = (function(ul,items){

    $.each(items, function(index, item){
      var res_data = $.parseJSON(item.value);
      var item_wrapped = $('<li/>')
       .attr("title", res_data.muni)
       .append(
              $("<span/>").addClass("bar").attr("data-number", res_data.amount)
              .add(
                  $("<span/>").text(res_data.amount).addClass("number")
                )
              );
      $('#auto_data').append(item_wrapped);
    });
    $('.chart').horizBarChart();
  });
  //
  // $("#search_input").data('ui-autocomplete')._renderItem = (function(ul, item) {
  //
  //
  //
  //   return
  //  });
  //
  // .data('ui-autocomplete')._renderItem = function(ul, item) {
  //
  //   var res_data = $.parseJSON(item.value);
  //
  //   return $('<li/>')
  //    .data('item.autocomplete', item)
  //    .append(
  //           $("<span/>").addClass("bar").attr("data-number",res_data.amount)
  //           .add(
  //               $("<span/>").text(res_data.amount).addClass("number")
  //
  //             )
  //           )
  //    .appendTo($('#auto_data'));
  //  };

});

var set_basic_search = (function(){
  // $("#search_btn").click(function(){
  //
  //   var search_term = $("#search_general").val();
  //   if(search_term.trim() == ""){
  //     // empty_table();
  //     return;
  //   }
  //   $.get('/api/v1/get_query_result',
  //         {
  //           advanced : false,
  //           term: search_term
  //         }
  //   );
  // });



});

//
// var set_advanced_search = (function(){
//   $("#advanced_search_btn").click(function(){
//     var formValues = $('#advanced_form').form('get values');
//     var year = formValues.year;
//     var city = formValues.city;
//     var query = formValues.query;
//
//     if(year=='' && city=='' && query==''){
//       $("#form_warning").removeClass('hidden').addClass('visible');
//       return;
//     } else{
//       $("#form_warning").removeClass('visible').addClass('hidden');
//       $.get('/api/v1/lines',
//               {
//               city: city,
//               year: year,
//               query: query,
//               advanced : true
//               },
//               parseTableRes,
//               'json'
//         );
//     }
//   });
// });



$(document).ready(function() {
  set_autocomplete(true);

  $('#search_type.btn-group').click(function(){

     var search = $('#search_type .btn-group .active').attr("id");

     if(search === "static_search"){
       set_autocomplete(true);
       $('#auto_data').empty();
     } else{
       set_autocomplete(false);
     }
  })
  //
  // $("#advanced_search").click(function(){
  //   $("#advanced_search_form").attr('class', 'visible');
  //   $("#pie_chart").attr('class', 'hidden');
  //   $('.left.sidebar')
  //       .sidebar('toggle');
  // });

  // set_basic_search();
  //set_advanced_search();
});
