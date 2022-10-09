<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/dropzone.css">
<div class="modal" id="nuevo_aro">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-12">
          <div class="eight">
            <h1>ARO</h1>
              <div class="form-row align-items-center row" style="margin: 4px">

              <div class="form-group col-sm-3">
                <label for="">Modelo</label>
                <input type="text" class="form-control clear_orden_i" id="modelo_aro_orden_inv">
              </div>

              <div class="form-group col-sm-3">
                <label for="">Marca</label>
                <input type="text" class="form-control clear_orden_i" id="marca_aro_orden_inv" autocomplete="on">
              </div>

              <div class="form-group col-sm-3">
                <label for="">Varillas</label>
                <input type="text" class="form-control clear_orden_i" id="color_varilla_inv" placeholder="color varillas">
              </div>

              <div class="form-group col-sm-3">
                <label for="">Frente</label>
                <input type="text" class="form-control clear_orden_i" id="color_frente_inv" placeholder="color frente">
              </div>          

             </div>   
            </div>
            </div>
          </div>

          <div class="row" style="margin: 4px">

              <div class="form-group col-sm-4">
                <label for="">Horizontal</label>
                <input type="text" class="form-control clear_orden_i" id="horizontal_aro_orden_inv">
              </div>

              <div class="form-group col-sm-4">
                <label for="">Vertical</label>
                <input type="text" class="form-control clear_orden_i" id="vertical_aro_orden_inv">
              </div>       

              <div class="form-group col-sm-4">
                <label for="">Puente</label>
                <input type="text" class="form-control clear_orden_i" id="puente_aro_orden_inv">
              </div>

          </div>

      <div class="row" style="margin: 20px">
        <div id="content" class="col-lg-12">
      <form action="index.php" method="post" enctype="multipart/form-data">
        <div class="fallback">
          <input name="file" type="file" multiple />
        </div>
      <div id="actions" class="row">
        <div class="col-lg-7">
            <!-- The fileinput-button span is used to style the file input field as button -->
            <span class="btn btn-success fileinput-button">
                <i class="glyphicon glyphicon-plus"></i>
                <span>Añadir imágenes...</span>
            </span>
            <button type="submit" class="btn btn-primary start" style="display: none;">
                <i class="glyphicon glyphicon-upload"></i>
                <span>Start upload</span>
            </button>
            <button type="reset" class="btn btn-warning cancel" style="display: none;">
                <i class="glyphicon glyphicon-ban-circle"></i>
                <span>Cancel upload</span>
            </button>
        </div>

    </div>

    <div class="table table-striped files" id="previews">
        <div id="template" class="file-row row">
            <!-- This is used as the file preview template -->
            <div class="col-xs-12 col-lg-12">
                <span class="preview" style="width:160px;height:160px;">
                    <img data-dz-thumbnail/>
                </span>
              <br/>

              <button class="btn btn-primary start" style="display:none;">
                <i class="glyphicon glyphicon-upload"></i>
                <span>Empezar</span>
              </button>

              <button data-dz-remove class="btn btn-warning cancel">
                <i class="icon-ban-circle fa fa-ban-circle"></i> 
                <span>Cancelar</span>
              </button>

              <button data-dz-remove class="btn btn-danger delete">
                <i class="icon-trash fa fa-trash"></i> 
                <span>Eliminar</span>
              </button>
            </div>

            <div class="col-xs-12 col-lg-9">
            <p class="name" data-dz-name id="nombre_img"></p>
              
            <div>
              <strong class="error text-danger" data-dz-errormessage></strong>
            </div>
          </div>
        </div>
    </div>
   
</form>  
        </div>
    </div>
      </div><!--Fin modal body-->
       
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-dark btn-block" onClick="registrarAro();">Guardar</button>
      </div>

    </div>
  </div>
</div>
<script src="../js/dropzone.js"></script>
<script>

var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var myDropzone = new Dropzone(document.body, {
    url: "upload.php",
    paramName: "file",
    acceptedFiles: 'image/*',
    maxFilesize: 5,
    maxFiles: 1,
    thumbnailWidth: 160,
    thumbnailHeight: 160,
    thumbnailMethod: 'contain',
    previewTemplate: previewTemplate,
    autoQueue: true,
    previewsContainer: "#previews",
    clickable: ".fileinput-button"
});

myDropzone.on("addedfile", function(file) {
    $('.dropzone-here').hide();
    file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
});

// Update the total progress bar
/*myDropzone.on("totaluploadprogress", function(progress) {
    document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
});

myDropzone.on("sending", function(file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1";
    // And disable the start button
    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
});

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function(progress) {
    //document.querySelector("#total-progress").style.opacity = "0";
});*/

document.querySelector("#actions .start").onclick = function() {
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
};

$('#previews').sortable({
    items:'.file-row',
    cursor: 'move',
    opacity: 0.5,
    containment: "parent",
    distance: 20,
    tolerance: 'pointer',
    update: function(e, ui){
    }
});
</script>