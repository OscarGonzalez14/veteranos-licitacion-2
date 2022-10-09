function buscarCitado(){
    $("#modal_citados").modal();
    dtTemplateCitas("datatable_citados","listar_pacientes_citados","")
}

function dtTemplateCitas(table,route,...Args){
    
    tabla = $('#'+table).DataTable({      
      "aProcessing": true,//Activamos el procesamiento del datatables
      "aServerSide": true,//Paginación y filtrado realizados por el servidor
      dom: 'Bfrtip',//Definimos los elementos del control de tabla
      buttons: [     
        'excelHtml5',
      ],
  
      "ajax":{
        url:"../ajax/citados.php?op="+ route,
        type : "POST",
        data: {Args:Args},
        dataType : "json",
         
        error: function(e){
        console.log(e.responseText);
      },      
    },
  
      "bDestroy": true,
      "responsive": true,
      "bInfo":true,
      "iDisplayLength": 2000,//Por cada 10 registros hace una paginación
        "order": [[ 0, "asc" ]],//Ordenar (columna,orden)
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
        }}, //cerrando language
    });

     
}

function getCitados(id_cita){

    $.ajax({
        url:"../ajax/citados.php?op=get_data_cita",
        method:"POST",
        cache:false,
        data :{id_cita:id_cita},
        dataType:"json",
        success:function(data){
            document.getElementById("paciente").value=data.paciente;
            document.getElementById("dui_pac").value=data.dui;
            document.getElementById("edad_pac").value=data.edad;
            document.getElementById("telef_pac").value=data.telefono;
            document.getElementById("usuario_pac").value=data.usuario_lente;
            document.getElementById("ocupacion_pac").value=data.ocupacion;
            document.getElementById("instit").value=data.sector;
            document.getElementById("genero_pac").value=data.genero;
            document.getElementById("departamento_pac").value=data.depto;
            document.getElementById("munic_pac_data").value=data.municipio;
            $("#modal_citados").modal('hide');
        }
        });      
}