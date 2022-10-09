function init(){
 listar_aros();
 document.getElementById("terminado_section").style.display = "none";
 document.getElementById("base_section").style.display = "none";
 document.getElementById("semiterminado_section").style.display = "none";
}

  function explode(){
    location.reload();
  }
function alerts_productos(icono, titulo){
  Swal.fire({
        position: 'top-center',
        icon: icono,
        title: titulo,
        showConfirmButton: true,
        timer: 5000
      });
}

function valida_base_term(){
	let vs_term_check = $("#vs_term").is(":checked");
	let vs_semi_term_chk = $("#vs_semi_term").is(":checked");
	let bifo_flap_chk = $("#bifo_flap").is(":checked");

    
    if (vs_term_check) {
    	document.getElementById("terminado_section").style.display = "block";
    	document.getElementById("base_section").style.display = "none";
      document.getElementById("semiterminado_section").style.display = "none";
    }else if(bifo_flap_chk ){
    	document.getElementById("base_section").style.display = "block";
    	document.getElementById("terminado_section").style.display = "none";
      document.getElementById("semiterminado_section").style.display = "none";

    }else if(vs_semi_term_chk){
      document.getElementById("semiterminado_section").style.display = "block";
      document.getElementById("terminado_section").style.display = "none";
      document.getElementById("base_section").style.display = "none";
    }
}

function focus_input(){
	$('input[name=codigob_lente]').focus();
}

$(document).on('shown.bs.modal', function (e) {
    $('[autofocus]', e.target).focus();
});


 function create_barcode_interno(){ 
  Swal.fire({
  title: 'Código interno?',
  text: "Desea generar un codigo Interno",
  icon: 'warning',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'No',
  confirmButtonText: 'Si!'
}).then((result) => {
  if (result.isConfirmed) {
   $("#codigob_lente").val('12785')
  }
})
 
}

//////////////////////////AUTOCOMPLETADO DE CAMPOS ////////////////

//////////////// AUTOCOMPLETADO CAMPOS NUEVO LENTE //////////////////
 function valida_diseno(){
  var marcas_l = document.getElementById("marca_lente").value;
  if(marcas_l==""){
    $("#dis_lente").val("");
  }
 }

function read_barcode(){
  let codigo = $("#codigob_lente").val();
  if (codigo=='041820069754') {
    $("#marca_lente").val('Cremora');

  }
}

function proof(){
  let codigo = $("#base_flap").val();
  if (codigo=='088169004688') {
    $("#add_flap").val('Es cafe musun');

  }else{
    $("#add_flap").val('Producto No identificado');
  }
}


function registrarAro(){
  
  let marca = $("#marca_aro_orden_inv").val();
  let modelo = $("#modelo_aro_orden_inv").val();
  let varillas = $("#color_varilla_inv").val();
  let frente = $("#color_frente_inv").val();
  let horizontal = $("#horizontal_aro_orden_inv").val();
  let vertical = $("#vertical_aro_orden_inv").val();
  let puente = $("#puente_aro_orden_inv").val();
  let imagen = $("#nombre_img").html();

  if (imagen==""){
    Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Debe agregar una imagen',
        showConfirmButton: true,
        timer: 2500
      });
      return false;   
  }
  
  $.ajax({
    url:"../ajax/productos.php?op=crear_aro",
    method:"POST",
    data:{marca:marca,modelo:modelo,varillas:varillas,frente:frente,horizontal:horizontal,vertical:vertical,puente:puente,imagen:imagen},
    cache: false,
    dataType:"json",
    success:function(data){
      if (data=='ok'){
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se ha creado un nuevo aro',
        showConfirmButton: true,
        timer: 2500
      });
      explode();
      //$("#nuevo_aro").modal('hide');
      //$("#datable_aros_inv").DataTable().ajax.reload();
      }else{
       Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'El modelo o la imagen ya existe en la base de Datos',
        showConfirmButton: true,
        timer: 2500
      }); 
      }
    }
  });///fin ajax

}

function listar_ordenes(){
  $("#datatable_ordenes").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      //dom: 'Bfrti',
      //"buttons": [ "excel"],
      "searching": false,
      "ajax":
        {
          url: '../ajax/ordenes.php?op=get_ordenes',
          type : "post",
          dataType : "json",        
          error: function(e){
            console.log(e.responseText);  
          }
        },
    "language": {
      "sSearch": "Buscar:"
    }
    }).buttons().container().appendTo('#datatable_ordenes_wrapper .col-md-6:eq(0)');

 }

 function buscarAro(){
  $("#aros_orden").modal("show");

  tabla_aros=$('#datatable_aros_ordenes').dataTable(
  {
    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
            buttons: [
                'excelHtml5'
            ],
    "ajax":
        {
          url: '../ajax/productos.php?op=get_aros_orden',
          type : "post",
          dataType : "json",
          //data:{estado:estado},
          error: function(e){
            console.log(e.responseText);
          }
        },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 25,//Por cada 10 registros hace una paginación
      "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

      "language": {

          "sProcessing":     "Procesando...",

          "sLengthMenu":     "Mostrar _MENU_ registros",

          "sZeroRecords":    "No se encontraron resultados",

          "sEmptyTable":     "Ningún dato disponible en esta tabla",

          "sInfo":           "Mostrando un total de _TOTAL_ registros",

          "sInfoEmpty":      "Mostrando un total de 0 registros",

          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",

          "sInfoPostFix":    "",

          "sSearch":         "Buscar:",

          "sUrl":            "",

          "sInfoThousands":  ",",

          "sLoadingRecords": "Cargando...",

          "oPaginate": {

              "sFirst":    "Primero",

              "sLast":     "Último",

              "sNext":     "Siguiente",

              "sPrevious": "Anterior"

          },

          "oAria": {

              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",

              "sSortDescending": ": Activar para ordenar la columna de manera descendente"

          }

         }//cerrando language

  }).DataTable();
  //get_numero_orden();
}

function selectAro(id_aro){

    $("#aros_orden").modal("hide");
    $.ajax({
      url:"../ajax/productos.php?op=buscar_data_aro",
      method:"POST",
      data:{id_aro:id_aro},
      dataType:"json",
      success:function(data){      
        $("#modelo_aro_orden").val(data.modelo);       
        $("#marca_aro_orden").val(data.marca);
        $("#horizontal_aro_orden").val(data.horizontal);
        $("#vertical_aro_orden").val(data.vertical);
        $("#puente_aro_orden").val(data.puente);
        $("#color_varilla").val(data.color_varillas);
        $("#color_frente").val(data.color_frente);
        $("#img_ord").val(data.img);
      }
    });//Fin Ajax
}

function listar_aros(){
  tabla_aros = $('#datable_aros_inv').dataTable({
    "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
            buttons: [
              'excelHtml5'
            ],
    "ajax":
        {
          url: '../ajax/productos.php?op=listar_aros',
          type : "post",
          dataType : "json",
          //data:{estado:estado},
          error: function(e){
            console.log(e.responseText);
          }
        },
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 25,//Por cada 10 registros hace una paginación
      "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

      "language": {

          "sProcessing":     "Procesando...",

          "sLengthMenu":     "Mostrar _MENU_ registros",

          "sZeroRecords":    "No se encontraron resultados",

          "sEmptyTable":     "Ningún dato disponible en esta tabla",

          "sInfo":           "Mostrando un total de _TOTAL_ registros",

          "sInfoEmpty":      "Mostrando un total de 0 registros",

          "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",

          "sInfoPostFix":    "",

          "sSearch":         "Buscar:",

          "sUrl":            "",

          "sInfoThousands":  ",",

          "sLoadingRecords": "Cargando...",

          "oPaginate": {

              "sFirst":    "Primero",

              "sLast":     "Último",

              "sNext":     "Siguiente",

              "sPrevious": "Anterior"

          },

          "oAria": {

              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",

              "sSortDescending": ": Activar para ordenar la columna de manera descendente"

          }

         }//cerrando language

  }).DataTable();
}

////////////////////ELIMINAR ARO /////////////
 function confirmar_eliminar_aro(modelo,marca,id_aro){ 
  Swal.fire({
  title: 'ELIMINAR ARO',
  text: "Desea eliminar este aro: Marca: "+marca+", Modelo:"+modelo,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'No',
  confirmButtonText: 'Si!'
}).then((result) => {
  if (result.isConfirmed) {
   eleminar_aro(id_aro);
  }
}) 
}

function eleminar_aro(id_aro){

    $.ajax({
      url:"../ajax/productos.php?op=eliminar_aro",
      method:"POST",
      data:{id_aro:id_aro},
      cache:false,
      dataType:"json",
      success:function(data){
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Aro eliminado exitosamente',
        showConfirmButton: true,
        timer: 2500
      });   
      $("#datable_aros_inv").DataTable().ajax.reload();
      }
    });  

}

 var marcas_lente = ["And Vas","Ray-Ban"];
 autocomplete(document.getElementById("marca_aro_orden_inv"), marcas_lente); 

 function verImg(img){
  document.getElementById("imagen_aro_v").src="";
  $("#verImg").modal("show");
  document.getElementById("imagen_aro_v").src="images/"+img;
 }

function set_code_bar(){
  let new_code = $("#codebar_lente").val();
  $.ajax({
    url:"../ajax/productos.php?op=verificar_existe_codigo",
    method:"POST",
    data:{new_code:new_code},
    cache: false,
    dataType:"json",
      success:function(data){
      console.log(data);
      if (data == 'Okcode') {
        let new_code = $("#codebar_lente").val();
        $("#categoria_codigo").val('Fabricante');
        $(".codigoBarras").val(new_code);
        $("#new_barcode_lens").modal('hide');
        $('#cant_ingreso').focus();
        $('#cant_ingreso').select();
      }else{
        Swal.fire({
        title: 'Error codigo!!',
        text: data,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NO',
        confirmButtonText: 'Ok'
        }).then((result) => {
        if (result.isConfirmed){
          $('#codigo_lente_term').val('');
          $('#codebar_lente').val('');
          $('#codebar_lente').focus();
        }
      });     
    }
    }      
  });
}

init();