function init(){
  document.getElementById("enviar_a").style.display = "none";
  listar_ordenes_digitadas('0');
  listar_ordenes_enviar();
  get_numero_orden();
  get_ordenes_env('0');
  get_ordenes_env_lab('0');
  get_ordenes_procesando();
  get_ordenes_por_enviar();
  listar_rectificaciones();
  document.getElementById("btn-print-bc").style.display = "none";
  
 }
 
 function ocultar_btn_print_rec_ini(){
   document.getElementById("btn_print_recibos").style.display = "none";
 }
 
 /////////////// SELECCIONAR SUCURSAL //////////
 $(document).ready(function(){
   $("#optica_orden").change(function () {         
     $("#optica_orden option:selected").each(function () {
      let optica = $(this).val();
         $.post('../ajax/ordenes.php?op=sucursales_optica',{optica:optica}, function(data){
         $("#optica_sucursal").html(data);
       });            
     });
   })
 });
 
 /////////validar ingreso de adicion////////////
 function valida_adicion(){
   let vs_check = $("#lentevs").is(":checked");
   if(vs_check == true){
     document.getElementById('oddicionf_orden').readOnly = true;
     document.getElementById('oiadicionf_orden').readOnly = true;
     document.getElementById('oddicionf_orden').value = "";
     document.getElementById('oiadicionf_orden').value = "";
   }else{
     document.getElementById('oddicionf_orden').readOnly = false;
     document.getElementById('oiadicionf_orden').readOnly = false;
   }
 
   let lentebf_chk = $("#lentebf").is(":checked");
 
   if (lentebf_chk==true) {
     document.getElementById('ap_od').readOnly = true;
     document.getElementById('ap_oi').readOnly = true;
   }else{
     document.getElementById('ap_od').readOnly = false;
     document.getElementById('ap_oi').readOnly = false;
   }
 
   let lentemulti_chk = $("#lentemulti").is(":checked");
 
   if (lentemulti_chk==true) {
     document.getElementById('ao_od').readOnly = true;
     document.getElementById('ao_oi').readOnly = true;
   }else{
     document.getElementById('ao_od').readOnly = false;
     document.getElementById('ao_oi').readOnly = false;
   }
 }
 
 function status_checks_tratamientos(){
 
   let photocrom_check = $('#photocromphoto').is(":checked");
 
   if (photocrom_check) {
 
     $("#transitionphoto").attr("disabled", true);
     
     $('#lbl_arsh').css('color', 'green');
 
     $("#arbluecap").attr("disabled", true);
     $('#arbluecap').prop('checked', false)
     $('#lbl_arbluecap').css('color', '#989898');
 
     $("#arnouv").attr("disabled", true);
     $('#arnouv').prop('checked', false)
     $('#lbl_arnouv').css('color', '#989898');
 
     $("#blanco").attr("disabled", true);
     $('#blanco').prop('checked', false)
     $('#lbl_blanco').css('color', '#989898');
 
     $("#transitionphoto").attr("disabled", true);
     $('#transitionphoto').prop('checked', false)
     $('#lbl_transitionphoto').css('color', '#989898');
     
   }else{    
     $("#transitionphoto").removeAttr("disabled");
   }
 
 }
 
 function create_barcode(){ 
 
   let codigo = $('#codigoOrden').val();
 
   $.ajax({
     url:"../ajax/ordenes.php?op=crear_barcode",
     method:"POST",
     data:{codigo:codigo},
     cache: false,
     dataType:"json",
     error:function(data){
       setTimeout("guardar_orden();",1500);  
     },
     success:function(data){
       console.log(data)
     }
   });///fin ajax
 }
 
 //window.onkeydown= space_guardar_orden;
 
 function guardar_orden(parametro='saveEdit'){ 
   
   let categoria_lente = "";
   //let categoria_lente = $("#categoria_lente").val();
   let validate = $("#validate").val();
   if (validate=="1") {
     categoria_lente = $("#categoria_lente").val();
   }else{
     categoria_lente = "*";
   }
 
   let genero = $("#genero_pac").val();
   let correlativo_op = $("#correlativo_op").html();
   let paciente = $("#paciente").val();  
   let fecha_creacion = $("#fecha_creacion").val();
   let od_pupilar = $("#od_pupilar").val();
   let oipupilar = $("#oipupilar").val();
   let odlente = $("#odlente").val();
   let oilente = $("#oilente").val();
   let marca_aro_orden = $("#marca_aro_orden").val();
   let modelo_aro_orden = $("#modelo_aro_orden").val();
   let horizontal_aro_orden = $("#horizontal_aro_orden").val();
   let vertical_aro_orden = $("#vertical_aro_orden").val();
   let puente_aro_orden = $("#puente_aro_orden").val();
   let id_usuario = $("#id_usuario").val();
   let observaciones_orden = $("#observaciones_orden").val();
   let dui = $("#dui_pac").val();
   let color_varilla = $("#color_varilla").val();
   let color_frente = $("#color_frente").val();
   let tipo_lente = $("input[type='radio'][name='tipo_lente']:checked").val();
 
   if (tipo_lente===undefined) {
         Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Debe especificar el tipo de lente',
         showConfirmButton: true,
         timer: 9500
       });
     return false;
   }
 
   let od_esferas = $("#odesferasf").val();
   let od_cilindros = $("#odcilindrosf").val();
   let od_eje = $("#odejesf").val();
   let od_adicion = $("#oddicionf").val();
   let oi_esferas = $("#oiesferasf").val();
   let oi_cilindros = $("#oicilindrosf").val();
   let oi_eje = $("#oiejesf").val();
   let oi_adicion = $("#oiadicionf").val();
   let imagen = $("#img_ord").val();
   let edad = $("#edad_pac").val();
   let usuario = $("#usuario_pac").val();
 
   let ocupacion = $("#ocupacion_pac").val();
   let avsc = $("#avsc").val();
   let avfinal = $("#avfinal").val();
   let avsc_oi = $("#avsc_oi").val();
   let avfinal_oi= $("#avfinal_oi").val();
   let telefono = $("#telef_pac").val();
   let user = $("#user_act").val();
   let depto_pac = $("#departamento_pac").val();
   let municipio_pac = $("#munic_pac").val();
   let depto = depto_pac.toString();
   let municipio = municipio_pac.toString();
   let instit = $("#instit").val();
   let campos_orden = document.getElementsByClassName('oblig');
   if (modelo_aro_orden == "") {
      Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Debe especificar el modelo de aro',
         showConfirmButton: true,
         timer: 9500
       });
     return false;
   }
   if(id_usuario != 1 && parametro != 'Rectificacion'){
   for (let i = 0; i<campos_orden.length; i++) {
    if(campos_orden[i].value=="") {
     let id = campos_orden[i].id;
     console.log(id);
     $('#'+id).addClass(' is-invalid');
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Existen campos obligatorios vacios',
         showConfirmButton: true,
         timer: 2500
       });
     return false;
    }
   }
 }
   
   if (correlativo_op !="") {
     $("#nueva_orden_lab").modal('hide');
   }
 
   $("#nueva_orden_lab").modal('hide');
   $.ajax({
     url:"../ajax/ordenes.php?op=registrar_orden",
     method:"POST",
     data:{correlativo_op:correlativo_op,paciente:paciente,fecha_creacion:fecha_creacion,od_pupilar:od_pupilar,
     oipupilar:oipupilar,odlente:odlente,oilente:oilente,marca_aro_orden:marca_aro_orden,modelo_aro_orden:modelo_aro_orden,
     horizontal_aro_orden:horizontal_aro_orden,vertical_aro_orden:vertical_aro_orden,puente_aro_orden:puente_aro_orden,
     id_usuario:id_usuario,observaciones_orden:observaciones_orden,dui:dui,od_esferas:od_esferas,od_cilindros:od_cilindros,
     od_eje:od_eje,od_adicion:od_adicion,oi_esferas:oi_esferas,oi_cilindros:oi_cilindros,oi_eje:oi_eje,oi_adicion:oi_adicion,
     tipo_lente:tipo_lente,color_varilla:color_varilla,color_frente:color_frente,imagen:imagen,validate:validate,categoria_lente:categoria_lente,
     edad:edad,usuario:usuario,ocupacion:ocupacion,avsc:avsc,avfinal:avfinal,avsc_oi:avsc_oi,avfinal_oi:avfinal_oi,telefono:telefono,genero:genero,user:user,depto:depto,municipio:municipio,instit:instit},
     cache: false,
     dataType:"json",
    
     success:function(data){
     console.log(data)
      if (data=='exito') {
       Swal.fire({
         position: 'top-center',
         icon: 'success',
         title: 'Orden Registrada',
         showConfirmButton: true,
         timer: 2500
       });
       $("#datatable_ordenes").DataTable().ajax.reload();
       //explode();
      }else if(data=='existe'){
       Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Beneficiario ya existe en la base de datos',
         showConfirmButton: true,
         timer: 2500
       });
       explode();
      }else{
       Swal.fire({
         position: 'top-center',
         icon: 'info',
         title: 'Orden editada exitosamente',
         showConfirmButton: true,
         timer: 2500
       });
       $("#nueva_orden_lab").modal('hide');
       $("#data_ordenes_sin_procesar").DataTable().ajax.reload(null, false);
       $("#data_ordenes_env").DataTable().ajax.reload();
       $("#datatable_ordenes").DataTable().ajax.reload();
       //explode();
      }
     
      
     }
   });//////FIN AJAX
 
 }
 
 //////////ELIMINAR CLASE IS INVALID
 $(document).on('keyup', '.is-invalid', function(){
   let id  = $(this).attr("id");
   document.getElementById(id).classList.remove('is-invalid');
   document.getElementById(id).classList.add('is-valid');
 
 });
 
 function alerts(alert){
   Swal.fire({
       position: 'top-center',
       icon: alert,
       title: 'Existen campos obligatorios vacios',
       showConfirmButton: true,
       timer: 3500
     });
 }
 
 function verEditar(codigo,paciente){
   $("#validate").val("1");
 
   let categoria = $("#get_categoria").val();
   document.getElementById("hist_orden").style.display = "block";
   if (categoria=='a') {
    let disable_inputs = document.getElementsByClassName('rx_f');
     for(i=0;i<disable_inputs.length;i++){
       let id_element = disable_inputs[i].id;
       document.getElementById(id_element).readOnly = true;
    }
   }
 
   $("#nueva_orden_lab").modal('show');
     $('#munic_pac').val('1'); // Select the option with a value of '1'
     $('#munic_pac').trigger('change');
     $('#departamento_pac').val('1'); // Select the option with a value of '1'
     $('#departamento_pac').trigger('change');
       clear_attr();
       $.ajax({
         url:"../ajax/ordenes.php?op=get_data_orden",
         method:"POST",
         cache:false,
         data:{codigo:codigo,paciente:paciente},
         dataType:"json",
         success:function(data){
   
        $("#correlativo_op").html(data.codigo);
        $("#paciente").val(data.paciente);
        $("#dui_pac").val(data.dui);
        $("#fecha_creacion").val(data.fecha);
        $("#odesferasf").val(data.od_esferas);
        $("#odcilindrosf").val(data.od_cilindros);
        $("#odejesf").val(data.od_eje);
        $("#oddicionf").val(data.od_adicion);
        $("#oiesferasf").val(data.oi_esferas);
        $("#oicilindrosf").val(data.oi_cilindros);
        $("#oiejesf").val(data.oi_eje);
        $("#oiadicionf").val(data.oi_adicion);      
        $("#od_pupilar").val(data.pupilar_od);
        $("#oipupilar").val(data.pupilar_oi);
        $("#odlente").val(data.lente_od);
        $("#oilente").val(data.lente_oi);
        $("#marca_aro_orden").val(data.marca_aro);
        $("#modelo_aro_orden").val(data.modelo_aro)
        $("#horizontal_aro_orden").val(data.horizontal_aro);
        $("#vertical_aro_orden").val(data.vertical_aro);
        $("#puente_aro_orden").val(data.puente_aro);
        $("#observaciones_orden").val(data.observaciones);
        $("#color_varilla").val(data.color_varilla);
        $("#color_frente").val(data.color_frente);
        $("#categoria_lente").val(data.categoria);
        $("#destino_orden_lente").val(data.laboratorio);
        $("#edad_pac").val(data.edad);
        $("#usuario_pac").val(data.usuario_lente);
        $("#ocupacion_pac").val(data.ocupacion);
        $("#avsc").val(data.avsc);
        $("#avfinal").val(data.avfinal);
        $("#avsc_oi").val(data.avsc_oi);
        $("#avfinal_oi").val(data.avfinal_oi);
        $("#telef_pac").val(data.telefono);
        $("#genero_pac").val(data.genero);
        $("#departamento_pac_data").html(data.depto);
        $("#munic_pac_data").html(data.municipio);
        $("#instit").val(data.institucion);
        let tipo_lente = data.tipo_lente;
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        let lente = tipo_lente.split('').map( letra => acentos[letra] || letra).join('').toString();
        let cadena = lente.replace(/ /g, "");
 
        document.getElementById(cadena).checked = true;
 
        let imagen = data.img;
        console.log(imagen);
        document.getElementById("imagen_aro").src="images/"+imagen;
 
 
 
       }
     });
   show_create_order(codigo);
     var ob = document.getElementById("order_create_edit");
     ob.classList.remove("btn-block");
     document.getElementById("btn_rectificar").style.display = "flex";
     historialOrden(codigo);
   }
 
   function historialOrden(codigo){
       let categoriaUser = $("#categoria-usuer-hist").val();
       console.log(categoriaUser)
       $.ajax({
         url:"../ajax/ordenes.php?op=ver_historial_orden",
         method:"POST",
         cache:false,
         data: {codigo:codigo,categoriaUser:categoriaUser},
         dataType:"json",
         success:function(data){
           $("#hist_orden_detalles").html("");
           let filas = '';
           for(var i=0; i<data.length; i++){
             filas = filas + "<tr id='fila"+i+"'>"+
             "<td colspan='15' style='width:15%''>"+data[i].fecha_hora+"</td>"+
             "<td colspan='25' style='width:25%''>"+data[i].usuario+"</td>"+
             "<td colspan='25' style='width:25%''>"+data[i].accion+"</td>"+
             "<td colspan='35' style='width:35%''>"+data[i].observaciones+"</td>"+
             "</tr>";
           }
           $("#hist_orden_detalles").html(filas);  
         }//Fin success
       });//Fin ajax
   }
 
 ////////////////OCULTAR ICONOS //////////
 $(document).on('click', '#order_new', function(){
   $("#validate").val("save");
   $('#munic_pac').val('1'); // Select the option with a value of '1'
   $('#munic_pac').trigger('change');
   $('#departamento_pac').val('1'); // Select the option with a value of '1'
   $('#departamento_pac').trigger('change');
   document.getElementById("instit").selectedIndex = "0";
 
   document.getElementById("buscar_aro").style.display = "flex";
   document.getElementById("mostrar_imagen").style.display = "none";
   document.getElementById("hist_orden").style.display = "none";
   let elements = document.getElementsByClassName("clear_orden_i");
 
     for(i=0;i<elements.length;i++){
       let id_element = elements[i].id;
       document.getElementById(id_element).value="";
     }
 
     document.getElementById("departamento_pac_data").innerHTML="";
     document.getElementById("munic_pac_data").innerHTML="";
 
    let checkboxs = document.getElementsByClassName("chk_element");
        for(j=0;j<checkboxs.length;j++){
       let id_chk = checkboxs[j].id;
       document.getElementById(id_chk).checked = false;
     }
   document.getElementById("btn_rectificar").style.display = "none";
 
   document.getElementById("order_create_edit").style.display = "block";
   var ob = document.getElementById("order_create_edit");
   ob.classList.add("btn-block");
 
 });
 
 function show_create_order(codigo){
   console.log('hh')
   let cat_user = $("#cat_users").val();
  
   if (cat_user==3 || cat_user==1){
      $.ajax({
       url:"../ajax/ordenes.php?op=show_create_order",
       method:"POST",
       cache:false,
       data:{codigo:codigo},
       dataType:"json",
       success:function(data){
        
        $("#created").html(data.info_orden)
       }
     });
    }else{
      console.log('00')
    }
 }
 
 function clear_form_orden(){
   
   let fields = document.getElementsByClassName("clear_orden_i");
 
     for(i=0;i<fields.length;i++){
       let val_element = fields[i].value;
       let id_element = fields[i].id;
       document.getElementById(id_element).value="";
     }
 
   document.getElementById('color_frente').classList.remove('is-invalid');
   
   $("#observaciones_orden").val("");
   document.getElementById('observaciones_orden').classList.remove('is-invalid');
   document.getElementById("VisionSencilla").checked = false;
   document.getElementById("Flaptop").checked = false;
   document.getElementById("Progresive").checked = false; 
 }
 
 function clear_attr(){
 document.getElementById('paciente').classList.remove('is-invalid','is-valid');
 document.getElementById('dui_pac').classList.remove('is-invalid','is-valid');
 document.getElementById('fecha_creacion').classList.remove('is-invalid','is-valid');
 document.getElementById('odesferasf').classList.remove('is-invalid','is-valid');
 document.getElementById('odcilindrosf').classList.remove('is-invalid','is-valid');
 document.getElementById('odejesf').classList.remove('is-invalid','is-valid');
 document.getElementById('oddicionf').classList.remove('is-invalid','is-valid');
 document.getElementById('oiesferasf').classList.remove('is-invalid','is-valid');
 document.getElementById('oicilindrosf').classList.remove('is-invalid','is-valid');
 document.getElementById('oiejesf').classList.remove('is-invalid','is-valid');
 document.getElementById('oiadicionf').classList.remove('is-invalid','is-valid');
 document.getElementById('od_pupilar').classList.remove('is-invalid','is-valid');
 document.getElementById('oipupilar').classList.remove('is-invalid','is-valid');
 document.getElementById('odlente').classList.remove('is-invalid','is-valid');
 document.getElementById('oilente').classList.remove('is-invalid','is-valid');
 document.getElementById('marca_aro_orden').classList.remove('is-invalid','is-valid');
 document.getElementById('modelo_aro_orden').classList.remove('is-invalid','is-valid');
 document.getElementById('horizontal_aro_orden').classList.remove('is-invalid','is-valid');
 document.getElementById('vertical_aro_orden').classList.remove('is-invalid','is-valid');
 document.getElementById('puente_aro_orden').classList.remove('is-invalid','is-valid');
 document.getElementById('observaciones_orden').classList.remove('is-invalid','is-valid');
 }
 
  function get_numero_orden(){
   clear_form_orden();
  }
 
  function update_numero_orden(){
   $.ajax({
       url:"../ajax/ordenes.php?op=get_correlativo_orden",
       method:"POST",
       cache:false,
       dataType:"json",
       success:function(data){
         let correlativo_op = data.codigo_orden;  
         guardar_orden(correlativo_op);    
       }
     });
  }
 
 function listar_ordenes_digitadas(filter){
 
   let inicio = $("#desde_orders").val();
   let hasta = $("#hasta_orders").val();
 
   tabla_ordenes= $('#datatable_ordenes').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'Bfrtip',//Definimos los elementos del control de tabla
     buttons: [     
       'excelHtml5',
     ],
 
     "ajax":{
       url:"../ajax/ordenes.php?op=get_ordenes_dig",
       type : "POST",
       //dataType : "json",
       data:{inicio:inicio,hasta:hasta,filter:filter},           
       error: function(e){
       console.log(e.responseText);
     },           
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
 
  function eliminarBeneficiario(codigo){
 
   let cat_user = $("#cat_users").val();
  
   if (cat_user==3){
       $.ajax({
       url:"../ajax/ordenes.php?op=eliminar_orden",
       method:"POST",
       cache:false,
       data :{codigo:codigo},
       dataType:"json",
       success:function(data){
         $("#datatable_ordenes").DataTable().ajax.reload();
         Swal.fire({
         position: 'top-center',
         icon: 'success',
         title: 'La orden ha sido eliminada',
         showConfirmButton: true,
         timer: 9500
       });      
       }
     });
 
   }else{
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'No posee permisos para eliminar',
         showConfirmButton: true,
         timer: 9500
       });
   }
  }
 
 ///////////////////////////////////////GESTION ORDENES ANDRES //////////////
 function listar_ordenes_enviar(){
 
   $("#data_ordenes").DataTable({
       "responsive": true, "lengthChange": false, "autoWidth": false,
       //dom: 'Bfrti',
       //"buttons": [ "excel"],
       "searching": true,
       "ajax":
         {
           url: '../ajax/ordenes.php?op=listar_ordenes_enviar',
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
 
 $(document).on("click",".actions_orders", function(){
   console.log("Okok")
   document.getElementById("order_create_edit").style.display = "none";
   //document.getElementById("sendto").style.display = "flex";
 });
 
 function enviarOrden(){
   let numero_orden = $("#correlativo_op").html();
     $.ajax({
       url:"../ajax/ordenes.php?op=enviar_orden",
       method:"POST",
       cache:false,
       data :{numero_orden:numero_orden},
       dataType:"json",
       success:function(data){
         $("#nueva_orden_lab").modal('hide');
         $("#data_ordenes").DataTable().ajax.reload(); 
         Swal.fire({
         position: 'top-center',
         icon: 'success',
         title: 'Orden enviada exitosamente',
         showConfirmButton: true,
         timer: 9500
       });
       }
     });
 }
 
 function listar_ordenes_enviadas(){
     enviados = $('#data_ordenes').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'Bfrtip',//Definimos los elementos del control de tabla
     buttons: ['excelHtml5'],
     "ajax":{
       url:"../ajax/ordenes.php?op=listar_ordenes_enviadas",
       type : "POST",
       dataType : "json",
       //data:{sucursal:sucursal,sucursal_usuario:sucursal_usuario},           
       error: function(e){
       console.log(e.responseText);
     },           
     },
         "bDestroy": true,
         "responsive": true,
         "bInfo":true,
         "iDisplayLength": 10,//Por cada 10 registros hace una paginación
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
 
 function get_ordenes_por_enviar(){
   let inicio = $("#desde_clasif").val();
   let hasta = $("#hasta_clasif").val();
   if ((inicio==undefined || inicio==null || inicio=="") && (hasta==undefined || hasta==null || hasta=="")) {
     inicio = '0';
     hasta = '0';
   }
 
   let lente = $("#tipo_lente_pendiente").val();
   let instit = $("#inst-env").val();
 
   //console.log(`inicio ${inicio} hasta ${hasta} lente ${lente}`);return false;
   table_enviados = $('#data_ordenes_sin_procesar').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'frtip',//Definimos los elementos del control de tabla
     //buttons: ['excelHtml5'],
     "ajax":{
       url:"../ajax/ordenes.php?op=get_ordenes_por_enviar",
       type : "POST",
       data :{inicio:inicio,hasta:hasta,lente:lente,instit:instit},
       dataType : "json",
       error: function(e){
       console.log(e.responseText);
     },},
     "bDestroy": true,
     "responsive": true,
     "bInfo":true,
     "iDisplayLength":50,//Por cada 10 registros hace una paginación
     "order": [[ 0, "desc" ]],//Ordenar (columna,orden
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
 
 //////////////////////////  ORDENES ENVIADAS LENTES ////////
 function get_ordenes_env(laboratorio){
 
   $("#lab_act").html(laboratorio);
   let inicio = $("#desde_table").val();
   let hasta =$("#hasta_table").val();
   let cat_lente =$("#cat_lente").val();
   let tipo_lente = $("#tipo_lente_report").val();
 
   if ((inicio==undefined || inicio==null || inicio=="") && (hasta==undefined || hasta==null || hasta=="")) {
     inicio = '0';
     hasta = '0';
   }
   let instit = $("#inst-proc").val();
 
   table_env = $('#data_ordenes_env').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'Bfrtip',//Definimos los elementos del control de tabla
     buttons: ['excel'],
     "ajax":{
       url:"../ajax/ordenes.php?op=get_ordenes_env",
       type : "POST",
       //dataType : "json",
       data : {laboratorio:laboratorio,cat_lente:cat_lente,inicio:inicio,hasta:hasta,tipo_lente:tipo_lente,instit:instit},
       error: function(e){
       console.log(e.responseText);
     },},
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
       "sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious": "Anterior"       
       },      
       "oAria": {       
         "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",       
         "sSortDescending": ": Activar para ordenar la columna de manera descendente"       
       }
     }, //cerrando language
   });
 }
 //////////////////////////ORDENES ENVIADAS A LABORATORIO
 function get_ordenes_env_lab(laboratorio){
   $("#lab_actual_send").html(laboratorio);
 
   let inicio = $("#desde_table_send").val();
   let hasta =$("#hasta_table_send").val();
   let cat_lente =$("#cat_lente_send").val();
   let tipo_lente = $("#tipo_lente_env").val();
 
   table_env = $('#data_ordenes_env_laboratorio').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'Bfrtip',//Definimos los elementos del control de tabla
     buttons: ['excel'],
     "ajax":{
       url:"../ajax/ordenes.php?op=get_ordenes_enviadas_lab",
       type : "POST",
       //dataType : "json",
       data : {laboratorio:laboratorio,cat_lente:cat_lente,inicio:inicio,hasta:hasta,tipo_lente:tipo_lente},
       error: function(e){
       console.log(e.responseText);
     },},
     "bDestroy": true,
     "responsive": true,
     "bInfo":true,
     "iDisplayLength": 24,//Por cada 10 registros hace una paginación
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
 //////////////// OEDENES PROCESANDO 
 //////////////////////////ORDENES ENVIADAS LENTES
 function get_ordenes_procesando(){
   table_proces = $('#data_ordenes_procesando').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'frtip',//Definimos los elementos del control de tabla
     //buttons: ['excelHtml5'],
     "ajax":{
       url:"../ajax/ordenes.php?op=get_ordenes_procesando",
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
 
 /*********************
 ARREGLO ORDENES ENVIAR
 ***************************/
 var ordenes_enviar = [];
 $(document).on('click', '.ordenes_enviar', function(){
   let id_orden = $(this).attr("value");
   let paciente = $(this).attr("name");
   let id_item = $(this).attr("id");
   let checkbox = document.getElementById(id_item);
   let check_state = checkbox.checked;
 
   if (check_state) {
     let obj = {
       id_orden : id_orden,
       paciente : paciente,
       id_item  : id_item
     }
     ordenes_enviar.push(obj);
   }else{
     let indice = ordenes_enviar.findIndex((objeto, indice, ordenes_enviar) =>{
       return objeto.id_orden == id_orden
     });
     ordenes_enviar.splice(indice,1)
   }
   console.log(ordenes_enviar);
   let count = ordenes_enviar.length;
   $("#count_select").html(count);
 });
 
 /************ confirmar orden envio  ************/
 function enviar_confirm_v(){
   let n_ord_enviar = ordenes_enviar.length;
   if (n_ord_enviar !=0) {
     $("#confirmar_envio_ord").modal('show');
     $("#n_trabajos_env").html(n_ord_enviar);
   }else{
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Debe agregar items de envio',
         showConfirmButton: true,
         timer: 2500
       });
     return false;
   }
 }
 
 
 function registrarEnvioVet(){
   let dest = $("#destino_envio").val();
   let user = $("#user_act").val();
   let cat = $("#cat_envio").val();
   let categoria_len = cat.toString();
   let destino = dest.toString();
   $('#confirmar_envio_ord').modal('hide');
 
   $.ajax({
     url:"../ajax/ordenes.php?op=enviar_ordenes",
     method:"POST",
     data:{'arrayEnvio':JSON.stringify(ordenes_enviar),'destino':destino,'user':user,'categoria_len':categoria_len},
     cache: false,
     dataType:"json", 
 
     success:function(data){
         console.log(data)
       Swal.fire({
         position: 'top-center',
         icon: 'success',
         title: 'Envio realizado exitosamente',
         showConfirmButton: true,
         timer: 2500
       });
       ordenes_enviar = [];
      $("#data_ordenes_sin_procesar").DataTable().ajax.reload(null,false);    
     }
   });//fin ajax
 }
 
 ////LENTES/////************
 
 function listar_ordenes_enviar(){
   $("#datatable_ordenes_enviar").DataTable({
       "responsive": true, "lengthChange": false, "autoWidth": false,
       //dom: 'Bfrti',
       //"buttons": [ "excel"],
       "searching": true,
       "ajax":
         {
           url: '../ajax/ordenes.php?op=get_ordenes_enviar',
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
 
 function verImagen(img){
   $('#imagen_aro_order').modal('show');
 
   document.getElementById("imagen_aro_ord").src="images/"+img;
  
 }
 /////////////////panel damin show //////////
 $(document).on('click', '.show_panel_admin', function(){
   document.getElementById("order_create_edit").style.display = "flex";
   document.getElementById("created").style.display = "none";
   document.getElementById("enviar_a").style.display = "none";
   $("#validate").val("1");
 });
 
 function sendEdit(){
   let codigo = $("#correlativo_op").html();
   let destino = $("#destino_orden_lente").val();
   let usuario = $("#user_act").val();
 
   if (destino == "0" || usuario =="0") {
     Swal.fire({
       position: 'top-center',
       icon: 'error',
       title: 'Campos obligatorio vacios',
       showConfirmButton: true,
       timer: 9500
     });
     return false;
   }else{
     $("#nueva_orden_lab").modal('hide');
     $("#data_ordenes").DataTable().ajax.reload();
   }
 
   let paciente = $("#paciente").val();  
   $.ajax({
   url:"../ajax/ordenes.php?op=enviar_lente",
   method:"POST",
   data:{codigo:codigo,destino:destino,usuario:usuario},
   dataType:"json",
   success:function(data){      
   console.log(data);  
     Swal.fire({
       position: 'top-center',
       icon: 'success',
       title: 'Enviado a '+destino,
       showConfirmButton: true,
       timer: 2500
     });
     guardar_orden();
   }
 });//Fin Ajax
   
 }
 
 $(document).on('click', '#labs_envio', function(){
   let laboratorio = $(this).attr("value");
   console.log(laboratorio);
 });
 
 function editaLaboratorio(paciente,categoria,laboratorio,codigo){
 
   $("#cambiaLabModal").modal('show');
   $("#pac_edit_lab").html(paciente);
   $("#categoria_lente_edit").val(categoria);
   $("#destino_orden_lente_edit").val(laboratorio);
   $("#codigoEd").val(codigo);
 }
 
 function CambiarLab(){
 
   let cat = $("#categoria_lente_edit").val();
   let dest = $("#destino_orden_lente_edit").val();
   let codigo = $("#codigoEd").val();
   let paciente = $("#pac_edit_lab").html();
   
   $.ajax({
   url:"../ajax/ordenes.php?op=editar_envio",
   method:"POST",
   data:{codigo:codigo,dest:dest,cat:cat,paciente:paciente},
   dataType:"json",
   success:function(data){      
   console.log(data);  
     Swal.fire({
       position: 'top-center',
       icon: 'success',
       title: 'Orden exitosamente',
       showConfirmButton: true,
       timer: 2000
     });
    $("#cambiaLabModal").modal('hide');
    $("#data_ordenes").DataTable().ajax.reload();
   }
 });//Fin Ajax
 }
 
 //function reportDownload(){
 // let 
 //}
 
 
 function showTablas(){
   let laboratorio = $("#lab_act").html();
   let tipo_lente = $("#tipo_lente_report").val();
   let base = $("#cat_lente").val();
   let inicio = $("#desde_table").val();
   let fin = $("#hasta_table").val();
 
   if (laboratorio =='0') {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Seleccione el laboratorio',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
   if ((inicio==undefined || inicio==null || inicio=="") || (fin==undefined || fin==null || fin=="")) {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Seleccione rango de fecha',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
 
   if (tipo_lente =='0' || base=='0') {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Base y/o lente deben ser seleccionados',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
 
   var form = document.createElement("form");
       form.target = "print_popup";
       form.method = "POST";
       form.action = "tabla_resumen.php";
       var input = document.createElement("input");
         input.type = "hidden";
         input.name = "laboratorio";
         input.value = laboratorio;
         form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "tipo_lente";
       input.value = tipo_lente;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "base";
       input.value = base;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "inicio";
       input.value = inicio;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "fin";
       input.value = fin;
       form.appendChild(input);
 
       let alto = (parseInt(window.innerHeight) / 2);
       let ancho = (parseInt(window.innerWidth) / 2);
       let x = parseInt((screen.width - ancho));
       let y = parseInt((screen.height - alto));
 
     document.body.appendChild(form);//"width=600,height=500"
     window.open("about:blank","print_popup",`
             width=${ancho}
             height=${alto}
             top=${y}
             left=${x}`);
     form.submit();
     document.body.removeChild(form);
 
 
 
 }
 var orders = []
 function print_orden_alert(){  
   orders = []; 
   for(var i=0;i<ordenes_enviar.length;i++){
     orders.push(ordenes_enviar[i].id_item);
   }
 
   let items = orders.length;
   if (items==0) {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Orden de impresion vacia',
         showConfirmButton: true,
         timer: 2500
     });
     return false;
   }
   $("#n_items_print").html(items);
   $("#print_order").modal('show');
 }
 
 function imprimir_ordenes(){
   ordenes_enviar = [];
   $("#count_select").html("0");
   $("#data_ordenes_env_laboratorio").DataTable().ajax.reload();
   $("#print_order").modal('hide');
     $.ajax({
     url:"../ajax/ordenes.php?op=reset_tables_print",
     method:"POST",
     data:{'array_restart_print':JSON.stringify(orders)},
     cache: false,
     dataType:"json",
     success:function(data){
       Swal.fire({
         position: 'top-center',
         icon: 'success',
         title: 'Envío Realizado',
         showConfirmButton: true,
         timer: 2500
       });
 
       $("#data_ordenes_env").DataTable().ajax.reload();
       window.open('imp_orden.php?orders='+orders, '_blank');  
       document.getElementById("select-all-env").checked = false;
       orders = []; 
       
     }
   });//fin ajax
     
 
 }
 
 function clear_input_date(){
   document.getElementById("desde_table").value = null;
   document.getElementById("hasta_table").value = null;
 }
 function clear_input_date_clas(){
   document.getElementById("desde_clasif").value = null;
   document.getElementById("hasta_clasif").value = null;
 }
 
 
 ///////////////////// TABLE ORDENES ENVIADAS /////////
 function showTablasEnviadas(){
   let laboratorio = $("#lab_actual_send").html();
   let tipo_lente = $("#tipo_lente_env").val();
   let base = $("#cat_lente_send").val();
   let inicio = $("#desde_table_send").val();
   let fin = $("#hasta_table_send").val();
   //console.log(laboratorio); return false;
   if (laboratorio =='0') {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Seleccione el laboratorio',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
   if ((inicio==undefined || inicio==null || inicio=="") || (fin==undefined || fin==null || fin=="")) {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Seleccione rango de fecha',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
 
   if (tipo_lente =='0' || base=='0') {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Base y/o lente deben ser seleccionados',
         showConfirmButton: true,
         timer: 3500
       });
     return false;
   }
 
   var form = document.createElement("form");
       form.target = "print_popup";
       form.method = "POST";
       form.action = "tabla_resumen_enviadas.php";
       var input = document.createElement("input");
         input.type = "hidden";
         input.name = "laboratorio";
         input.value = laboratorio;
         form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "tipo_lente";
       input.value = tipo_lente;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "base";
       input.value = base;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "inicio";
       input.value = inicio;
       form.appendChild(input);
 
       var input = document.createElement("input");
       input.type = "hidden";
       input.name = "fin";
       input.value = fin;
       form.appendChild(input);
 
       let alto = (parseInt(window.innerHeight) / 2);
       let ancho = (parseInt(window.innerWidth) / 2);
       let x = parseInt((screen.width - ancho));
       let y = parseInt((screen.height - alto));
 
     document.body.appendChild(form);//"width=600,height=500"
     window.open("about:blank","print_popup",`
             width=${ancho}
             height=${alto}
             top=${y}
             left=${x}`);
     form.submit();
     document.body.removeChild(form);
 }
 
 function selectOrdenesImprimir(){
 
   let checkbox = document.getElementById('select-all-env');
   let check_state = checkbox.checked;
   let ordenes_imprimir = document.getElementsByClassName('ordenes_enviar');
   if (check_state) {      
     for(let i=0; i<=ordenes_imprimir.length-1; i++){
       let id_item = ordenes_imprimir[i].id;
       document.getElementById(id_item).checked = true;
       orders.push(id_item);
     }
   }else if(check_state==false){
       for(let i=0; i<=ordenes_imprimir.length-1; i++){
        let id_item = ordenes_imprimir[i].id;
       document.getElementById(id_item).checked = false;
     }
     orders = [];
   }
 }
 
 function print_orden_alert_multiple(){  
   
   let items = orders.length;
   if (items==0) {
     Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Orden de impresion vacia',
         showConfirmButton: true,
         timer: 2500
     });
     return false;
   }
   $("#n_items_print").html(items);
   $("#print_order").modal('show');
 }
 
 function registrarRectificacion(){
   let campos_orden = document.getElementsByClassName('oblig');
   
   let motivo = $('#motivo-rct').val();
   let estado_aro = $('#est-aro-rct').val();
   let usuario = $("#usuario").val();
   let codigo =  $("#correlativo_op").html();
   let correlativo = $("#correlativo_rectificacion").html();
   
   if (motivo=='') {
       Swal.fire({position: 'top-center',icon: 'error',
         title: 'Debe especificar rl motivo de la rectificacion',showConfirmButton: true,timer: 2500
       }); return false;
   }
 
   $.ajax({
     url:"../ajax/ordenes.php?op=registrar_rectificacion",
     method:"POST",
     data : {motivo:motivo,estado_aro:estado_aro,usuario:usuario,codigo:codigo,correlativo:correlativo},
     cache:false,
     success:function(data){   
      if (data=='Insert!') {
         $("#rectificacionesModal").modal('hide');
         guardar_orden('Rectificacion')
      }else{
       Swal.fire({
         position: 'top-center',
         icon: 'error',
         title: 'Ha ocurrido un error',
         showConfirmButton: true,
         timer: 2500
       });
      }
     }
   });
 }
 
 const btn_recti = document.getElementById('btn_rectificar');
 
 btn_recti.addEventListener("click", () => {
   getCorrelativoRectificacion(); 
   document.getElementById("motivo-rct").value="";
   document.getElementById("est-aro-rct").value="";
   $('#rectificacionesModal').on('shown.bs.modal', function() {
   $('#motivo-rct').focus();
   });
 
 });
 
 
 function getCorrelativoRectificacion(){
   $.ajax({
   url:"../ajax/ordenes.php?op=correlativo_rectificacion",
   method:"POST",
   cache:false,
   dataType:"json",
   success:function(data){         
     $("#correlativo_rectificacion").html(data.correlativo);
   }
   });
 }
 
 function detRecti(codigoOrden){
 
  $('#modal_detalle_recti').modal();
  listar_orden_orig_mods(codigoOrden);
  }
 
 function listar_orden_orig_mods(codigoOrden){
   $.ajax({
   url:"../ajax/ordenes.php?op=listar_ordenes_rect",
   method:"POST",
   data:{codigoOrden:codigoOrden}, 
   cache:false,
   success:function(data){         
     $("#listar_ordenes_rectif").html(data);
   }
   });
 
   listar_orden_act(codigoOrden)
 }
 
 function listar_orden_act(codigoOrden){
   $.ajax({
   url:"../ajax/ordenes.php?op=listar_det_orden_act",
   method:"POST",
   data:{codigoOrden:codigoOrden}, 
   cache:false,
   success:function(data){         
     $("#orden_inicial").html(data);
   }
   });
 }
 
 function listar_rectificaciones(){
   table_enviados = $('#data_rectificaciones').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'frtip',//Definimos los elementos del control de tabla
     //buttons: ['excelHtml5'],
     "ajax":{
       url:"../ajax/ordenes.php?op=listar_rectificaciones",
       type : "POST",
       dataType : "json",
       error: function(e){
       console.log(e.responseText);
     },},
     "bDestroy": true,
     "responsive": true,
     "bInfo":true,
     "iDisplayLength":50,//Por cada 10 registros hace una paginación
     "order": [[ 0, "desc" ]],//Ordenar (columna,orden
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
 
 
 function listar_estadisticas(){
 
   let inicio = $("#desde_estadistica").val();
   let hasta = $("#hasta_estadistica").val();
 
   tabla_ordenes= $('#datatable_estadisticas').DataTable({      
     "aProcessing": true,//Activamos el procesamiento del datatables
     "aServerSide": true,//Paginación y filtrado realizados por el servidor
     dom: 'Bfrtip',//Definimos los elementos del control de tabla
     buttons: [     
       'excelHtml5',
     ],
 
     "ajax":{
       url:"../ajax/ordenes.php?op=get_estadisticas",
       type : "POST",
       data:{inicio:inicio,hasta:hasta},           
       error: function(e){
       console.log(e.responseText);
     },           
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
     });
 }
 
 ////////////////get cambio departamento ///////////////
 
 $(document).ready(function(){
   $("#departamento_pac").change(function () {         
     $("#departamento_pac option:selected").each(function () {
      let depto = $(this).val();
        
        get_municipios(depto);       
                  
     });
   })
 });
 
 /***************MUNICIPIOS ***************/
 
   var ahuachapan=["Ahuachapán","Apaneca","Atiquizaya","Concepción de Ataco","El Refugio","Guaymango","Jujutla","San Francisco Menéndez","San Lorenzo","San Pedro Puxtla","Tacuba","Turín"];
   var cabanas=["Cinquera","Dolores (Villa Doleres)","Guacotecti","Ilobasco","Jutiapa","San Isidro","Sensuntepeque","Tejutepeque","Victoria"];
   var chalatenango=["Agua Caliente","Arcatao","Azacualpa","Chalatenango","Citalá","Comalapa","Concepción Quezaltepeque","Dulce Nombre de María","El Carrizal","El Paraíso","La Laguna","La Palma","La Reina","Las Vueltas","Nombre de Jesús","Nueva Concepción","Nueva Trinidad","Ojos de Agua","Potonico","San Antonio de la Cruz","San Antonio Los Ranchos","San Fernando","San Francisco Lempa","San Francisco Morazán","San Ignacio","San Isidro Labrador","San José Cancasque (Cancasque)","San José Las Flores","San Luis del Carmen","San Miguel de Mercedes","San Rafael","Santa Rita","Tejutla"];
   var cuscatlan=["Candelaria","Cojutepeque","El Carmen","El Rosario","Monte San Juan","Oratorio de Concepción","San Bartolomé Perulapía","San Cristóbal","San José Guayabal","San Pedro Perulapán","San Rafael Cedros","San Ramón","Santa Cruz Analquito","Santa Cruz Michapa","Suchitoto","Tenancingo"];
   var morazan=["Arambala","Cacaopera","Chilanga","Corinto","Delicias de Concepción","El Divisadero","El Rosario","Gualococti","Guatajiagua","Joateca","Jocoaitique","Jocoro","Lolotiquillo","Meanguera","Osicala","Perquín","San Carlos","San Fernando","San Francisco Gotera","San Isidro","San Simón","Sensembra","Sociedad","Torola","Yamabal","Yoloaiquín"];
   var lalibertad=["Antiguo Cuscatlán","Chiltiupán","Ciudad Arce","Colón","Comasagua","Huizúcar","Jayaque","Jicalapa","La Libertad","Santa Tecla (Nueva San Salvador)","Nuevo Cuscatlán","San Juan Opico","Quezaltepeque","Sacacoyo","San José Villanueva","San Matías","San Pablo Tacachico","Talnique","Tamanique","Teotepeque","Tepecoyo","Zaragoza"];
   var lapaz=["Cuyultitán","El Rosario (Rosario de La Paz)","Jerusalén","Mercedes La Ceiba","Olocuilta","Paraíso de Osorio","San Antonio Masahuat","San Emigdio","San Francisco Chinameca","San Juan Nonualco","San Juan Talpa","San Juan Tepezontes","San Luis La Herradura","San Luis Talpa","San Miguel Tepezontes","San Pedro Masahuat","San Pedro Nonualco","San Rafael Obrajuelo","Santa María Ostuma","Santiago Nonualco","Tapalhuaca","Zacatecoluca"];
   var launion=["Anamorós","Bolívar","Concepción de Oriente","Conchagua","El Carmen","El Sauce","Intipucá","La Unión","Lilisque","Meanguera del Golfo","Nueva Esparta","Pasaquina","Polorós","San Alejo","San José","Santa Rosa de Lima","Yayantique","Yucuaiquín"];
   var sanmiguel=["Carolina","Chapeltique","Chinameca","Chirilagua","Ciudad Barrios","Comacarán","El Tránsito","Lolotique","Moncagua","Nueva Guadalupe","Nuevo Edén de San Juan","Quelepa","San Antonio del Mosco","San Gerardo","San Jorge","San Luis de la Reina","San Miguel","San Rafael Oriente","Sesori","Uluazapa"];
   var sansalvador=["Aguilares","Apopa","Ayutuxtepeque","Ciuddad Delgado","Cuscatancingo","El Paisnal","Guazapa","Ilopango","Mejicanos","Nejapa","Panchimalco","Rosario de Mora","San Marcos","San Martín","San Salvador","Santiago Texacuangos","Santo Tomás","Soyapango","Tonacatepeque"];
   var sanvicente=["Apastepeque","Guadalupe","San Cayetano Istepeque","San Esteban Catarina","San Ildefonso","San Lorenzo","San Sebastián","San Vicente","Santa Clara","Santo Domingo","Tecoluca","Tepetitán","Verapaz"];
   var santaana=["Candelaria de la Frontera","Chalchuapa","Coatepeque","El Congo","El Porvenir","Masahuat","Metapán","San Antonio Pajonal","San Sebastián Salitrillo","Santa Ana","Santa Rosa Guachipilín","Santiago de la Frontera","Texistepeque"];
   var sonsonate=["Acajutla","Armenia","Caluco","Cuisnahuat","Izalco","Juayúa","Nahuizalco","Nahulingo","Salcoatitán","San Antonio del Monte","San Julián","Santa Catarina Masahuat","Santa Isabel Ishuatán","Santo Domingo de Guzmán","Sonsonate","Sonzacate"];
   var usulutan=["Alegría","Berlín","California","Concepción Batres","El Triunfo","Ereguayquín","Estanzuelas","Jiquilisco","Jucuapa","Jucuarán","Mercedes Umaña","Nueva Granada","Ozatlán","Puerto El Triunfo","San Agustín","San Buenaventura","San Dionisio","San Francisco Javier","Santa Elena","Santa María","Santiago de María","Tecapán","Usulután"];
 function get_municipios(depto){
  $("#munic_pac").empty();
  if (depto=="San Salvador") {
   $("#munic_pac").select2({ data: sansalvador})
  }else if (depto=="La Libertad") {
   $("#munic_pac").select2({ data: lalibertad})
  }else if (depto=="Santa Ana") {
    $("#munic_pac").select2({ data: santaana})
  }else if (depto=="San Miguel") {
     $("#munic_pac").select2({ data: sanmiguel})
  }else if (depto=="Sonsonate") {
     $("#munic_pac").select2({ data: sonsonate})
  }else if (depto=="Usulutan") {
     $("#munic_pac").select2({ data: usulutan})
  }else if (depto=="Ahuachapan") {
     $("#munic_pac").select2({ data: ahuachapan})
  }else if (depto=="La Union") {
     $("#munic_pac").select2({ data: launion})
  }else if (depto=="La Paz") {
     $("#munic_pac").select2({ data: lapaz})
  }else if (depto=="Chalatenango") {
     $("#munic_pac").select2({ data: chalatenango})
  }else if (depto=="Cuscatlan") {
     $("#munic_pac").select2({ data: cuscatlan})
  }else if (depto=="Morazan") {
     $("#munic_pac").select2({ data: morazan})
  }else if (depto=="San Vicente") {
     $("#munic_pac").select2({ data: sanvicente})
  }else if (depto=="Cabanas") {
    $("#munic_pac").select2({ data: cabanas})
  }
 
 }
 
 
 init();
 
 