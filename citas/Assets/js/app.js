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
  
    var ahuachapan=["Ahuachap??n","Apaneca","Atiquizaya","Concepci??n de Ataco","El Refugio","Guaymango","Jujutla","San Francisco Men??ndez","San Lorenzo","San Pedro Puxtla","Tacuba","Tur??n"];
    var cabanas=["Cinquera","Dolores (Villa Doleres)","Guacotecti","Ilobasco","Jutiapa","San Isidro","Sensuntepeque","Tejutepeque","Victoria"];
    var chalatenango=["Agua Caliente","Arcatao","Azacualpa","Chalatenango","Cital??","Comalapa","Concepci??n Quezaltepeque","Dulce Nombre de Mar??a","El Carrizal","El Para??so","La Laguna","La Palma","La Reina","Las Vueltas","Nombre de Jes??s","Nueva Concepci??n","Nueva Trinidad","Ojos de Agua","Potonico","San Antonio de la Cruz","San Antonio Los Ranchos","San Fernando","San Francisco Lempa","San Francisco Moraz??n","San Ignacio","San Isidro Labrador","San Jos?? Cancasque (Cancasque)","San Jos?? Las Flores","San Luis del Carmen","San Miguel de Mercedes","San Rafael","Santa Rita","Tejutla"];
    var cuscatlan=["Candelaria","Cojutepeque","El Carmen","El Rosario","Monte San Juan","Oratorio de Concepci??n","San Bartolom?? Perulap??a","San Crist??bal","San Jos?? Guayabal","San Pedro Perulap??n","San Rafael Cedros","San Ram??n","Santa Cruz Analquito","Santa Cruz Michapa","Suchitoto","Tenancingo"];
    var morazan=["Arambala","Cacaopera","Chilanga","Corinto","Delicias de Concepci??n","El Divisadero","El Rosario","Gualococti","Guatajiagua","Joateca","Jocoaitique","Jocoro","Lolotiquillo","Meanguera","Osicala","Perqu??n","San Carlos","San Fernando","San Francisco Gotera","San Isidro","San Sim??n","Sensembra","Sociedad","Torola","Yamabal","Yoloaiqu??n"];
    var lalibertad=["Antiguo Cuscatl??n","Chiltiup??n","Ciudad Arce","Col??n","Comasagua","Huiz??car","Jayaque","Jicalapa","La Libertad","Santa Tecla (Nueva San Salvador)","Nuevo Cuscatl??n","San Juan Opico","Quezaltepeque","Sacacoyo","San Jos?? Villanueva","San Mat??as","San Pablo Tacachico","Talnique","Tamanique","Teotepeque","Tepecoyo","Zaragoza"];
    var lapaz=["Cuyultit??n","El Rosario (Rosario de La Paz)","Jerusal??n","Mercedes La Ceiba","Olocuilta","Para??so de Osorio","San Antonio Masahuat","San Emigdio","San Francisco Chinameca","San Juan Nonualco","San Juan Talpa","San Juan Tepezontes","San Luis La Herradura","San Luis Talpa","San Miguel Tepezontes","San Pedro Masahuat","San Pedro Nonualco","San Rafael Obrajuelo","Santa Mar??a Ostuma","Santiago Nonualco","Tapalhuaca","Zacatecoluca"];
    var launion=["Anamor??s","Bol??var","Concepci??n de Oriente","Conchagua","El Carmen","El Sauce","Intipuc??","La Uni??n","Lilisque","Meanguera del Golfo","Nueva Esparta","Pasaquina","Polor??s","San Alejo","San Jos??","Santa Rosa de Lima","Yayantique","Yucuaiqu??n"];
    var sanmiguel=["Carolina","Chapeltique","Chinameca","Chirilagua","Ciudad Barrios","Comacar??n","El Tr??nsito","Lolotique","Moncagua","Nueva Guadalupe","Nuevo Ed??n de San Juan","Quelepa","San Antonio del Mosco","San Gerardo","San Jorge","San Luis de la Reina","San Miguel","San Rafael Oriente","Sesori","Uluazapa"];
    var sansalvador=["Aguilares","Apopa","Ayutuxtepeque","Ciuddad Delgado","Cuscatancingo","El Paisnal","Guazapa","Ilopango","Mejicanos","Nejapa","Panchimalco","Rosario de Mora","San Marcos","San Mart??n","San Salvador","Santiago Texacuangos","Santo Tom??s","Soyapango","Tonacatepeque"];
    var sanvicente=["Apastepeque","Guadalupe","San Cayetano Istepeque","San Esteban Catarina","San Ildefonso","San Lorenzo","San Sebasti??n","San Vicente","Santa Clara","Santo Domingo","Tecoluca","Tepetit??n","Verapaz"];
    var santaana=["Candelaria de la Frontera","Chalchuapa","Coatepeque","El Congo","El Porvenir","Masahuat","Metap??n","San Antonio Pajonal","San Sebasti??n Salitrillo","Santa Ana","Santa Rosa Guachipil??n","Santiago de la Frontera","Texistepeque"];
    var sonsonate=["Acajutla","Armenia","Caluco","Cuisnahuat","Izalco","Juay??a","Nahuizalco","Nahulingo","Salcoatit??n","San Antonio del Monte","San Juli??n","Santa Catarina Masahuat","Santa Isabel Ishuat??n","Santo Domingo de Guzm??n","Sonsonate","Sonzacate"];
    var usulutan=["Alegr??a","Berl??n","California","Concepci??n Batres","El Triunfo","Ereguayqu??n","Estanzuelas","Jiquilisco","Jucuapa","Jucuar??n","Mercedes Uma??a","Nueva Granada","Ozatl??n","Puerto El Triunfo","San Agust??n","San Buenaventura","San Dionisio","San Francisco Javier","Santa Elena","Santa Mar??a","Santiago de Mar??a","Tecap??n","Usulut??n"];
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