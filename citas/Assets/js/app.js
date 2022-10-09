let calendarEl = document.getElementById('calendar');
let frm = document.getElementById('formulario');
let eliminar = document.getElementById('btnEliminar');
let myModal = new bootstrap.Modal(document.getElementById('myModal'));
document.addEventListener('DOMContentLoaded', function () {
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'local',
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev next today',
            center: 'title',
            right: 'dayGridMonth timeGridWeek listWeek'
        },
        events: base_url + 'Home/listar',
        editable: true,
        dateClick: function (info) {
            frm.reset();
                console.log(info.date)
                let hoy = new Date();
                hoy.setHours(0,0,0,0);;
                console.log(hoy);
               
                if (info.date >= hoy) {
                    eliminar.classList.add('d-none');
                    document.getElementById('start').value = info.dateStr;
                    document.getElementById('id').value = '';
                    document.getElementById('btnAccion').textContent = 'Registrar';
                    myModal.show();
                    document.getElementById("fecha-cita").value=info.dateStr;
                    document.getElementById('titulo').textContent = 'Registrar Cita - '+info.dateStr;
                } else {
                    Swal.fire(
                        'Fecha invalida!!',
                        'Fecha menor que hoy',
                        'warning'
                    )
                }               
                      
        },

        eventClick: function (info) {
            console.log(info)
            document.getElementById('id').value = info.event.id;
            document.getElementById('title').value = info.event.title;
            document.getElementById('start').value = info.event.startStr;
            document.getElementById('btnAccion').textContent = 'Modificar';
            document.getElementById('titulo').textContent = 'Actualizar Evento';
            eliminar.classList.remove('d-none');

        },
        eventDrop: function (info) {
            const start = info.event.startStr;
            const id = info.event.id;
            const url = base_url + 'Home/drag';
            const http = new XMLHttpRequest();
            const formDta = new FormData();
            formDta.append('start', start);
            formDta.append('id', id);
            http.open("POST", url, true);
            http.send(formDta);
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    const res = JSON.parse(this.responseText);
                     Swal.fire(
                         'Avisos?',
                         res.msg,
                         res.tipo
                     )
                    if (res.estado) {
                        myModal.hide();
                        calendar.refetchEvents();
                    }
                }
            }
        }

    });
    calendar.render();
    frm.addEventListener('submit', function (e) {
        e.preventDefault();
        let paciente = document.getElementById('paciente-vet').value;
        let dui = document.getElementById('dui-vet').value;
        let fecha = document.getElementById('fecha-cita').value;
        let sucursal = document.getElementById('sucursal-cita').value;
        if (paciente == '' || dui == '' || fecha == '' || sucursal=="") {
             Swal.fire(
                 'Notificaciones!!',
                 'Existen campos obligatorios vacios',
                 'warning'
             )
        } else {
            const url = base_url + 'Home/registrar';
            const http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.send(new FormData(frm));
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    const res = JSON.parse(this.responseText);
                     Swal.fire(
                         'Notificacion',
                         res.msg,
                         res.tipo
                     )
                    if (res.estado) {
                        myModal.hide();
                        calendar.refetchEvents();
                    }
                }
            }
        }
    });
    eliminar.addEventListener('click', function () {
        myModal.hide();
        Swal.fire({
            title: 'Advertencia?',
            text: "Esta seguro de eliminar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = base_url + 'Home/eliminar/' + document.getElementById('id').value;
                const http = new XMLHttpRequest();
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                        const res = JSON.parse(this.responseText);
                        Swal.fire(
                            'Avisos?',
                            res.msg,
                            res.tipo
                        )
                        if (res.estado) {
                            calendar.refetchEvents();
                        }
                    }
                }
            }
        })
    });
});


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

$(function () {
    //Initialize Select2 Elements
    $('#departamento_pac').select2()
    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })

    $("#departamento_pac").select2({
    maximumSelectionLength: 1
    });
    
    $('#munic_pac').select2()
    $("#munic_pac").select2({
    maximumSelectionLength: 1
    });
  })