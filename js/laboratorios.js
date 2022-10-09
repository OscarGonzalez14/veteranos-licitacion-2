function init(){
    listar_ordenes_procesando_lab();
    get_ordenes_procesando();
    ///get_ordenes_recibidas_lab();
    listar_ordenes_rec_vet();
    listar_ordenes_entregas_vet()
    get_ordenes_procesando_envios();
    listar_ordenes_de_envio();

}

/*========RECIBIR E IMPRIMIR=======*/



$(".modal-header").on("mousedown", function(mousedownEvt) {
    let $draggable = $(this);
    let x = mousedownEvt.pageX - $draggable.offset().left,
        y = mousedownEvt.pageY - $draggable.offset().top;
    $("body").on("mousemove.draggable", function(mousemoveEvt) {
    $draggable.closest(".modal-dialog").offset({
    "left": mousemoveEvt.pageX - x,
      "top": mousemoveEvt.pageY - y
    });
    });
    $("body").one("mouseup", function() {
      $("body").off("mousemove.draggable");
    });
    $draggable.closest(".modal").one("bs.modal.hide", function() {
        $("body").off("mousemove.draggable");
    });
  
});
/////////////////detectar clic en acciones labs
document.querySelectorAll(".barcode_actions").forEach(i => i.addEventListener("click", e => {
    items_barcode = [];
    getCorrelativoAccionVet();
    document.getElementById('reportes_vets').style.display = 'none';
    document.getElementById('items-ordenes-barcode').innerHTML='';
    input_focus_clearb();
}));

/******************/
document.querySelectorAll(".barcode_actions_chk").forEach(i => i.addEventListener("click", e => {
  getCorrelativoAccionVet();
}));


///////////////// detectar clic en acciones veteranos
document.querySelectorAll(".barcode_actions_vets").forEach(i => i.addEventListener("click", e => {
    items_barcode = [];    
    input_focus_clearb();
    getCorrelativoAccionVet();
    show_items_barcode_lab();  
    
}));

function listar_ordenes_pend_lab(){

  let inicio = $("#desde_orders_lab_pend").val();
  let hasta = $("#hasta_orders_lab_pend").val();
  let tipo_lente = $("#tipo_lente_ing").val();
  let categoria_lente = $("#categoria_lente_ing").val();
  let estado_proceso = $("#estado_proceso").val();

  document.getElementById("select-all-env").checked = false;

  if ((inicio==undefined || inicio==null || inicio=="") || (hasta==undefined || hasta==null || hasta=="")) {
    
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Especificar todos los filtros',
      showConfirmButton: true,
      timer: 2500
    });
    return false;
  }

  tabla_ordenes= $('#ordenes_pendientes_lab').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'Bfrtip',//Definimos los elementos del control de tabla
    buttons: [     
      'excelHtml5',
    ],

    "ajax":{
      url:"../ajax/laboratorios.php?op=get_ordenes_pendientes_lab",
      type : "POST",
      dataType : "json",
      data:{inicio:inicio,hasta:hasta,tipo_lente:tipo_lente,categoria_lente:categoria_lente,estado_proceso:estado_proceso},           
      error: function(e){
      console.log(e.responseText);
    },           
    },

        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 48,//Por cada 10 registros hace una paginación
          "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

          "language": {
 
          "sProcessing":     "Procesando...",
       
          "sLengthMenu":     "Mostrar _MENU_ registros",
       
          "sZeroRecords":    "No se encontraron resultados",
       
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
       
          "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
       
          "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
       
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

         }, //cerrando language

          //"scrollX": true

        });
}

 function verImg(img,codigo,paciente){
  document.getElementById("imagen_aro_v").src="";
  $("#imagen_aro_orden").modal("show");
  document.getElementById("imagen_aro_v").src="images/"+img;
  $("#cod_orden_lab").html(codigo);
  $("#paciente_ord_lab").html(paciente);
 }


/**************************
  ARREGLO ORDENES RECIBIR
***************************/
var ordenes_recibir = [];
$(document).on('click', '.ordenes_recibir_lab', function(){
let id_orden = $(this).attr("value");
let id_item = $(this).attr("id");
let codigo = $(this).attr("name");

let checkbox = document.getElementById(id_item);
let check_state = checkbox.checked;

  if (check_state) {
    let obj = {
      id_orden : id_orden,
      codigo : codigo
    }
    ordenes_recibir.push(obj);
    $( "input[aria-controls='ordenes_pendientes_lab']").val('');
    let inputs = document.getElementsByClassName('form-control-sm');
    for(let i = 0;i<inputs.length;i++){inputs[i].id="input_enviar"}
    document.getElementById('input_enviar').autofocus = true; 

  }else{
    let indice = ordenes_recibir.findIndex((objeto, indice, ordenes_recibir) =>{
      return objeto.id_orden == id_orden
    });
    ordenes_recibir.splice(indice,1);
    $( "input[aria-controls='ordenes_pendientes_lab']").val('');
  }
  orders = []; 
  for(var i=0;i<ordenes_recibir.length;i++){
    orders.push(ordenes_recibir[i].id_orden);
  }
  let codes = orders.reverse();
  let rec = codes.toString();
  let fecha_ini = $('#desde_orders_lab_pend').val();
  let fecha_fin = $('#hasta_orders_lab_pend').val();
  $('#inicio_rec').val(fecha_ini);
  $('#fin_rec').val(fecha_fin);
  document.getElementById("ordenes_imp").value = rec;
});


function recibirOrdenesLab(){

  let count = ordenes_recibir.length;
  if (count==0) {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Orden de recibidos vacio',
      showConfirmButton: true,
      timer: 2500
    });
  return false
  }

 $("#count_select").html(count);
 $("#modal_ingreso_lab").modal('show');
  console.log(ordenes_recibir);
  orders = []; 
  for(var i=0;i<ordenes_recibir.length;i++){
    orders.push(ordenes_recibir[i].id_orden);
  }
}

function confirmarIngresoLab(){
  let usuario = $("#usuario").val();
  let n_ordenes = ordenes_recibir.length;
  $.ajax({
      url:"../ajax/laboratorios.php?op=recibir_ordenes_laboratorio",
      method:"POST",
      data : {'arrayRecibidos':JSON.stringify(ordenes_recibir),'usuario':usuario},
      cache:false,
      dataType:"json",
      success:function(data){   
        $("#ordenes_pendientes_lab").DataTable().ajax.reload();
        ordenes_recibir = [];
        $("#modal_ingreso_lab").modal("hide");
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se han recibido '+n_ordenes+' ordenes',
        showConfirmButton: true,
        timer: 50500
      });

      }
    });
}

function listar_ordenes_procesando_lab(){


  tabla_ordenes = $('#ordenes_procesando_lab').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'Bfrtip',//Definimos los elementos del control de tabla
    buttons: [     
      'excelHtml5',
    ],

    "ajax":{
      url:"../ajax/laboratorios.php?op=get_ordenes_procesando_lab",
      type : "POST",
      dataType : "json",
      //data:{inicio:inicio,hasta:hasta},           
      error: function(e){
      console.log(e.responseText);
    },           
    },

        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 30,//Por cada 10 registros hace una paginación
          "order": [[ 0, "desc" ]],//Ordenar (columna,orden)

          "language": {
 
          "sProcessing":     "Procesando...",
       
          "sLengthMenu":     "Mostrar _MENU_ registros",
       
          "sZeroRecords":    "No se encontraron resultados",
       
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
       
          "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
       
          "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
       
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

         }, //cerrando language

          //"scrollX": true

        });
}

/*******************************
  ARREGLO ORDENES PROCESANDO
********************************/
var ordenes_procesando = [];
$(document).on('click', '.ordenes_procesando_lab', function(){
  let id_orden = $(this).attr("value");
  let id_item = $(this).attr("id");
  let codigo = $(this).attr("name");

  let checkbox = document.getElementById(id_item);
  let check_state = checkbox.checked;

  if (check_state) {
    let obj = {
      id_orden : id_orden,
      codigo : codigo
    }
    ordenes_procesando.push(obj);
    $( "input[aria-controls='ordenes_pendientes_lab']").val('');
    let inputs = document.getElementsByClassName('form-control-sm');
    for(let i = 0;i<inputs.length;i++){inputs[i].id="input_enviar"}
    document.getElementById('input_enviar').autofocus = true; 
  }else{
    let indice = ordenes_procesando.findIndex((objeto, indice, ordenes_procesando) =>{
      return objeto.id_orden == id_orden;
      $( "input[aria-controls='ordenes_pendientes_lab']").val('');
    let inputs = document.getElementsByClassName('form-control-sm');
    for(let i = 0;i<inputs.length;i++){inputs[i].id="input_enviar"}
    document.getElementById('input_enviar').autofocus = true; 
    });
    ordenes_procesando.splice(indice,1)
  }

  orders_entregas = []; 
  for(var i=0;i<ordenes_procesando.length;i++){
    orders_entregas.push(ordenes_procesando[i].id_orden);
  }

  let rec = orders_entregas.toString();
  document.getElementById("ordenes_imp_finish").value = rec;
  
});

////////ENVIAR ORDENES LAB /////////
function finalizarOrdenesLab(){

  let count = ordenes_procesando.length;
  if (count==0) {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Orden de finalizados vacio',
      showConfirmButton: true,
      timer: 2500
    });
  return false
  }

 $("#count_select").html(count);
 $("#modal_procesando_lab").modal('show');
 
}

function confirmarSalidaLab(){
  let usuario = $("#usuario").val();
  let n_ordenes = ordenes_procesando.length;
  $.ajax({
      url:"../ajax/laboratorios.php?op=finalizar_ordenes_laboratorio",
      method:"POST",
      data : {'arrayFinalizadasLab':JSON.stringify(ordenes_procesando),'usuario':usuario},
      cache:false,
      dataType:"json",
      success:function(data){   
        $("#ordenes_procesando_lab").DataTable().ajax.reload();
        ordenes_procesando = [];
        $("#modal_procesando_lab").modal("hide");
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se han finalizados '+n_ordenes+' ordenes',
        showConfirmButton: true,
        timer: 50500
      });

      }
    });
}

/////////////// GET ORDNES FINALIZADAS   //////////////////////
function get_ordenes_procesando(){
  table_proces = $('#ordenes_finalizadas_lab').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'frtip',//Definimos los elementos del control de tabla
    //buttons: ['excelHtml5'],
    "ajax":{
      url:"../ajax/laboratorios.php?op=get_ordenes_finalizadas_lab",
      type : "POST",
      dataType : "json",
      error: function(e){
      console.log(e.responseText);
    },},
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 600,//Por cada 600 registros hace una paginación
    "order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      "language": { 
      "sProcessing":     "Procesando...",       
      "sLengthMenu":     "Mostrar _MENU_ registros",       
      "sZeroRecords":    "No se encontraron resultados",       
      "sEmptyTable":     "Ningún dato disponible en esta tabla",       
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",       
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",       
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",       
      "sInfoPostFix":    "",       
      "sSearch":         "Buscar:",       
      "sUrl":            "",       
      "sInfoThousands":  ",",       
      "sLoadingRecords": "Cargando...",       
      "oPaginate": {       
      "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
      },      
      "oAria": {       
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
      }
    }, //cerrando language
  });
}

/////////////////////////ORDENES ENVIADAS PARA VETERANOS /////////
function get_ordenes_procesando_envios(){
  table_proces = $('#ordenes_finalizadas_lab_envs').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'frtip',//Definimos los elementos del control de tabla
    //buttons: ['excelHtml5'],
    "ajax":{
      url:"../ajax/laboratorios.php?op=get_ordenes_procesando_lab_envios",
      type : "POST",
      dataType : "json",
      error: function(e){
      console.log(e.responseText);
    },},
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 20,//Por cada 10 registros hace una paginación
    "order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      "language": { 
      "sProcessing":     "Procesando...",       
      "sLengthMenu":     "Mostrar _MENU_ registros",       
      "sZeroRecords":    "No se encontraron resultados",       
      "sEmptyTable":     "Ningún dato disponible en esta tabla",       
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",       
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",       
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",       
      "sInfoPostFix":    "",       
      "sSearch":         "Buscar:",       
      "sUrl":            "",       
      "sInfoThousands":  ",",       
      "sLoadingRecords": "Cargando...",       
      "oPaginate": {       
      "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
      },      
      "oAria": {       
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
      }
    }, //cerrando language
  });
}

//////////////////////CONTROL DE INGRESOS LAB Y VETERANOS UES ///////////
var items_barcode = [];

function getCorrelativoAccionVet(){
    $.ajax({
    url:"../ajax/laboratorios.php?op=get_correlativo_accion_vet",
    method:"POST",
    cache:false,
    dataType:"json",
      success:function(data){
        console.log(data)    
        $("#correlativo_acc_vet").val(data.correlativo);
        $("#c_accion").html('OP '+data.correlativo);
      }
    })
}

function getOrdenBarcode(){

  let cod_orden_act = $("#reg_ingresos_barcode").val();
  let tipo_accion = $("#cat_data_barcode").val();

  $.ajax({
    url:"../ajax/laboratorios.php?op=get_data_orden_barcode",
    method: "POST",
    data: {cod_orden_act:cod_orden_act,tipo_accion:tipo_accion},
    cache:  false,
    dataType: "json",
    success:function(data){
      let resultados = typeof data;            
      if (resultados==='string' && tipo_accion=='ing_lab') {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Orden ya ha sido ingresada anteriormente',
          showConfirmButton: true,
          timer: 6000
        });
      }else if(resultados=='object'){
        getDataOrdenes(resultados,data);
      }
    
    }//Fin success
  });//Fin Ajax 
 
}


function getDataOrdenes(resultados,data){

      let longitudObject = data.length;
    
      if(resultados !="string" && longitudObject != 0){
        let codigo = data.codigo; 
        let indice = items_barcode.findIndex((objeto, indice, items_tallado) =>{
        return objeto.n_orden == codigo;
        });

        if(indice>=0){
            var y = document.getElementById("error_sound"); 
            y.play();
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'Orden ya existe en la lista',
              showConfirmButton: true,
              timer: 1000
            });
            input_focus_clearb();
          }else{
            var x = document.getElementById("success_sound"); 
            x.play();
            let items_ingresos = {
            n_orden : data.codigo,
            paciente: data.paciente,
            fecha : data.fecha,
            id_orden : data.id_orden
            }
            items_barcode.push(items_ingresos);
            orders.push(data.codigo);
            show_items_barcode_lab();       
            input_focus_clearb();  
          }          
        }else{
            var z = document.getElementById("error_sound"); 
            z.play();
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'Código no valido',
              showConfirmButton: true,
              timer: 1000
            });
            input_focus_clearb();
        }
}

function input_focus_clearb(){
  $("#reg_ingresos_barcode").val("");
  
  $('#reg_ingresos_barcode').focus();

}

function show_items_barcode_lab(){

$("#items-ordenes-barcode").html('');

  let filas = "";
  let length_array = parseInt(items_barcode.length)-1;
  for(let i=length_array;i>=0;i--){

    filas = filas +    
    "<tr style='text-align:center' id='item_t"+i+"'>"+
    "<td>"+items_barcode[i].id_orden+"</td>"+
    "<td>"+items_barcode[i].n_orden+"</td>"+
    "<td>"+items_barcode[i].fecha+"</td>"+
    "<td>"+items_barcode[i].paciente+"</td>"+    
    "<td>"+"<button type='button'  class='btn btn-sm bg-light' onClick='eliminarItemBarcodeLab("+i+")'><i class='fa fa-times-circle' aria-hidden='true' style='color:red'></i></button>"+"</td>"+
    "</tr>";
    
  }

  $("#items-ordenes-barcode").html(filas);

}

function eliminarItemBarcodeLab(index) {
  $("#item_t" + index).remove();
  drop_index(index);
}

function drop_index(position_element){
  items_barcode.splice(position_element, 1);
  $('#reg_ingresos_barcode').focus();
  show_items_barcode_lab()
}

function registrarBarcodeOrdenes(){

  let tipo_accion = $("#cat_data_barcode").val();

  var datatables = '';
  var mjs ='';
  var fecha_orden = '';
  var ubicacion_orden = ''

  if(tipo_accion=='recibir_veteranos'){
    //fecha_orden = $("#fecha_accion_vet").val();
    ubicacion_orden = $("#ubicacion_veteranos").val();
    
    if (ubicacion_orden=='') {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'El campo ubicacion es obligatorio',
        showConfirmButton: true,
        timer: 1500
      });
      return false;
    }
  }
 
  let usuario = $("#usuario").val();
  let correlativo_accion = $("#correlativo_acc_vet").val();
  let n_ordenes = items_barcode.length;
  console.log(correlativo_accion); 
  if (n_ordenes==0) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Lista vacia',
        showConfirmButton: true,
        timer: 1500
      });
      return false;
  }
  
  $.ajax({
      url:"../ajax/laboratorios.php?op=procesar_ordenes_barcode",
      method:"POST",
      data : {'arrayOrdenesBarcode':JSON.stringify(items_barcode),'usuario':usuario,'tipo_accion':tipo_accion,'ubicacion_orden':ubicacion_orden,'correlativo_accion':correlativo_accion},
      cache:false,
      dataType:"json",
      success:function(data){
      console.log(data);
      if (tipo_accion=='ing_lab') {
        msj =' ordenes recibidas exitosamente';
        imprimir_ordenes();
      }else if(tipo_accion=='finalizar_lab'){
        $("#ordenes_procesando_lab").DataTable().ajax.reload();
        msj = ' ordenes finalizadas exitosamente';
      }else if(tipo_accion=='recibir_veteranos'){
        msj = ' ordenes recibidas exitosamente';
        $('#modal_acciones_veteranos').modal('hide');
        $("#ordenes_recibidas_veteranos_data").DataTable().ajax.reload();
      }else if (tipo_accion=='entregar_veteranos') {
        msj = ' ordenes entregadas exitosamente';
        $('#barcode_ingresos_lab').modal('hide');
        $("#ordenes_entregados_veteranos_data").DataTable().ajax.reload();
      }else if (tipo_accion=='finalizar_orden_lab_completo') {
        msj = ' ordenes enviadas';
        document.getElementById('reportes_vets').style.display = 'block';
        $("#ordenes_finalizadas_lab").DataTable().ajax.reload();

       }
        
      items_barcode = [];
      //$("#barcode_ingresos_lab").modal("hide");
      Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: n_ordenes+msj,
      showConfirmButton: true,
      timer: 1500
    });

    }//Fin success
    });
}

function listar_ordenes_rec_vet(){
  table_proces = $('#ordenes_recibidas_veteranos_data').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'frtip',//Definimos los elementos del control de tabla
    //buttons: ['excelHtml5'],
    "ajax":{
      url:"../ajax/laboratorios.php?op=listar_ordenes_recibidas_veteranos",
      type : "POST",
      dataType : "json",
      error: function(e){
      console.log(e.responseText);
    },},
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 20,//Por cada 10 registros hace una paginación
    "order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      "language": { 
      "sProcessing":     "Procesando...",       
      "sLengthMenu":     "Mostrar _MENU_ registros",       
      "sZeroRecords":    "No se encontraron resultados",       
      "sEmptyTable":     "Ningún dato disponible en esta tabla",       
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",       
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",       
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",       
      "sInfoPostFix":    "",       
      "sSearch":         "Buscar:",       
      "sUrl":            "",       
      "sInfoThousands":  ",",       
      "sLoadingRecords": "Cargando...",       
      "oPaginate": {       
      "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
      },      
      "oAria": {       
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
      }
    }, //cerrando language
  });
}

function listar_ordenes_entregas_vet(){
  table_proces = $('#ordenes_entregados_veteranos_data').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'frtip',//Definimos los elementos del control de tabla
    //buttons: ['excelHtml5'],
    "ajax":{
      url:"../ajax/laboratorios.php?op=listar_ordenes_entregadas_veteranos",
      type : "POST",
      dataType : "json",
      error: function(e){
      console.log(e.responseText);
    },},
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 20,//Por cada 10 registros hace una paginación
    "order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      "language": { 
      "sProcessing":     "Procesando...",       
      "sLengthMenu":     "Mostrar _MENU_ registros",       
      "sZeroRecords":    "No se encontraron resultados",       
      "sEmptyTable":     "Ningún dato disponible en esta tabla",       
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",       
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",       
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",       
      "sInfoPostFix":    "",       
      "sSearch":         "Buscar:",       
      "sUrl":            "",       
      "sInfoThousands":  ",",       
      "sLoadingRecords": "Cargando...",       
      "oPaginate": {       
      "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
      },      
      "oAria": {       
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
      }
    }, //cerrando language
  });
}

function input_focus_clearb(){
  $("#reg_ingresos_barcode").val("");
  $('#modal_acciones_veteranos').on('shown.bs.modal', function() {
  $('#reg_ingresos_barcode').focus();
  });
}

function downloadExcelEntregas(title,fecha){
  let titulo = fecha+"_"+title;
  let tablaExport = document.getElementById("tabla_acciones_veterans");

  if(tablaExport == null || tablaExport == undefined ){
    alerts_productos("warning", "Debe desplegar la tabla para poder ser descargada");
    return false;
  }

  let table2excel = new Table2Excel();
  table2excel.export(document.getElementById('tabla_acciones_veterans'),titulo);
}


function downloadExcelRecibidosVet(title,fecha){
  let titulo = fecha+"_"+title;
  let tablaExport = document.getElementById("recibidas_ordenes_lab");
  //console.log(tablaExport);
  if(tablaExport == null || tablaExport == undefined ){
    alerts_productos("warning", "Debe desplegar la tabla para poder ser descargada");
    return false;
  }
  let table2excel = new Table2Excel();
  table2excel.export(document.getElementById('recibidas_ordenes_lab'),titulo);
}

function imprimirEnviosLabPDF(){

  let correlativo = $("#correlativo_acc_vet").val();

  var form = document.createElement("form");
  form.target = "blank";
  form.method = "POST";
  form.action = "imprimirDespachoLabPdf.php";
  
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = "correlativos_acc";
  input.value = correlativo;
  form.appendChild(input);
  document.body.appendChild(form);//"width=600,height=500"

  form.submit();
  document.body.removeChild(form);
 
}

function listar_ordenes_de_envio(){
  table_proces = $('#ordenes-de-envio').DataTable({      
    "aProcessing": true,//Activamos el procesamiento del datatables
    "aServerSide": true,//Paginación y filtrado realizados por el servidor
    dom: 'frtip',//Definimos los elementos del control de tabla
    //buttons: ['excelHtml5'],
    "ajax":{
      url:"../ajax/laboratorios.php?op=listar_ordenes_de_envio",
      type : "POST",
      dataType : "json",
      error: function(e){
      console.log(e.responseText);
    },},
    "bDestroy": true,
    "responsive": true,
    "bInfo":true,
    "iDisplayLength": 20,//Por cada 10 registros hace una paginación
    "order": [[ 0, "desc" ]],//Ordenar (columna,orden)
      "language": { 
      "sProcessing":     "Procesando...",       
      "sLengthMenu":     "Mostrar _MENU_ registros",       
      "sZeroRecords":    "No se encontraron resultados",       
      "sEmptyTable":     "Ningún dato disponible en esta tabla",       
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",       
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",       
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",       
      "sInfoPostFix":    "",       
      "sSearch":         "Buscar:",       
      "sUrl":            "",       
      "sInfoThousands":  ",",       
      "sLoadingRecords": "Cargando...",       
      "oPaginate": {       
      "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
      },      
      "oAria": {       
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
      }
    }, //cerrando language
  });
}

function selectOrdenesEnviar(){
  let items_barcode_selected = document.getElementsByClassName('ordenes_enviar_inabve');
  let checkbox = document.getElementById("select-all-env-chk");
  let check_state = checkbox.checked;
  if(check_state){

    for (var i = 0; i < items_barcode_selected.length; i++) {
    let data = items_barcode_selected[i].value;
    let items = data.split(',');

    let items_ingresos = {
      n_orden : items[1],
      paciente: items[2],
      fecha : items[0]
    }
    items_barcode.push(items_ingresos);
    document.getElementById(items_barcode_selected[i].id).checked = true;

  }

  }else{
    items_barcode = [];
    for (var i = 0; i < items_barcode_selected.length; i++) {
      document.getElementById(items_barcode_selected[i].id).checked = false;
    }
  }


  
}

function envioOrrdenesCheck(){
  $("#envios_chk").modal();
  $("#items-ordenes-barcode-chk").html('');

  let filas = "";
  let length_array = parseInt(items_barcode.length)-1;
  for(let i=length_array;i>=0;i--){

    filas = filas +    
    "<tr style='text-align:center' id='item_t"+i+"'>"+
    "<td>"+(i+1)+"</td>"+
    "<td>"+items_barcode[i].n_orden+"</td>"+
    "<td>"+items_barcode[i].fecha+"</td>"+
    "<td>"+items_barcode[i].paciente+"</td>"+    
    "<td>"+"<button type='button'  class='btn btn-sm bg-light' onClick='eliminarItemBarcodeLab("+i+")'><i class='fa fa-times-circle' aria-hidden='true' style='color:red'></i></button>"+"</td>"+
    "</tr>";
    
  }

  $("#items-ordenes-barcode-chk").html(filas);

}

document.querySelectorAll(".ingresa_ordenes_id").forEach(i => i.addEventListener("click", e => {
  orders = [];
}));


function buscarGraduacion(){
let od_esfera = $("#odesferas_search").val();
let od_cilindro = $("#odcilindros_search").val();
let od_eje = $("#odejes_search").val();
let od_adi = $("#oddicion_search").val();

let oi_esfera = $("#oiesferas_search").val();
let oi_cilindro =$("#oicilindros_search").val();
let oi_eje = $("#oiejes_search").val();
let oi_adi = $("#oiadicion_search").val();

 $.ajax({
  url:"../ajax/laboratorios.php?op=buscar_orden_graduacion",
  method:"POST",
  data:{od_esfera:od_esfera,od_cilindro:od_cilindro,od_eje:od_eje,od_adi:od_adi,oi_esfera:oi_esfera,oi_cilindro:oi_cilindro,oi_eje:oi_eje,oi_adi:oi_adi}, 
  cache:false,
  dataType: "json",
  success:function(data){ 
    console.log(data)  

  
    if (data == "Vacio") {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'No existen coincidencias',
        showConfirmButton: true,
        timer: 2500
      });
    }else{

      $("#resultados_grads").html("");
          let filas = '';
          for(var i=0; i<data.length; i++){
            filas = filas + "<tr id='fila"+i+"'>"+
            "<td colspan='15' style='width:15%'>"+data[i].id_orden+"</td>"+
            "<td colspan='15' style='width:15%'>"+data[i].codigo+"</td>"+
            "<td colspan='15' style='width:15%'>"+data[i].fecha+"</td>"+
            "<td colspan='40' style='width:40%'>"+data[i].paciente+"</td>"+
            "<td colspan='15' style='width:15%'>"+data[i].estado_aro+"</td>"+
            "</tr>";
          }
        $("#resultados_grads").html(filas);  
    }
  }
  });

}


$(document).on('click', '#busquedas_graduaciones', function(){

   let elements = document.getElementsByClassName("clear_orden_i");

    for(i=0;i<elements.length;i++){
      let id_element = elements[i].id;
      document.getElementById(id_element).value="";
    }

});


init();