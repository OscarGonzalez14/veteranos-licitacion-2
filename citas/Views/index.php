<!DOCTYPE html>
<html lang="en">
<?php
require_once("../config/conexion.php");
if(isset($_SESSION["usuario"])){
require_once("../vistas/links_plugin.php"); 

?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Eventos</title>
    
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/main.min.css">
</head>

<body>

<div class="wrapper">
<!-- top-bar -->
  <?php require_once('../vistas/top_menu.php')?>
  <!-- Main Sidebar Container -->
  <?php require_once('side_bar.php')?>
    <div class="container">
        <div id="calendar"></div>
    </div>

 
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="Label" aria-hidden="true">
        <div class="modal-dialog" style="max-width:80%">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h5 class="modal-title" id="titulo" style="color: white">Registro citas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="formulario" autocomplete="off">
                    <div class="modal-body">
                        <input type="hidden" id="id" name="id">
                        <div class="row">

                        <div class="col-md-6">
                            <label for="title">Paciente</label>
                            <input id="paciente-vet" type="text" class="form-control" name="paciente-vet">
                        </div>

                        <div class="col-md-3">
                            <label for="dui">DUI</label>
                            <input id="dui-vet" type="text" class="form-control" name="dui-vet">
                        </div>

                        <div class="col-md-3">
                            <label for="dui">Telefono</label>
                            <input id="telefono-pac" type="text" class="form-control" name="telefono-pac">
                        </div>

                        <div class="col-md-2">
                            <label for="dui">Edad</label>
                            <input id="edad-pac" type="text" class="form-control" name="edad-pac">
                        </div>


                        <div class="col-md-4">
                            <label for="ocupacion-pac">Ocupación</label>
                            <input id="ocupacion-pac" type="text" class="form-control" name="ocupacion-pac">
                        </div>

                        <div class="col-md-3">
                        <label for="usuario-lente">Genero</label>
                        <select class="form-control" id="genero-pac" name="genero-pac">
                            <option>Seleccionar...</option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </select>
                        </div>

                        <div class="col-md-3">
                        <label for="usuario-lente">Usuario Lente</label>
                        <select class="form-control" id="usuario-lente" name="usuario-lente">
                            <option>Seleccionar...</option>
                            <option>Si</option>
                            <option>No</option>
                        </select>
                        </div>

                        <div class="col-md-2">
                            <label for="dui">Sector</label>
                            <select class="form-control" id="sector-pac" name="sector-pac">
                            <option>Seleccionar...</option>
                            <option>FAES</option>
                            <option>FMLN</option>
                            <option>BENEFICIARIO</option>
                        </select>
                        </div>
                        
                        <div class=" form-group col-sm-4 select2-purple">
                        <label for="" class="etiqueta">Departamento </label> <span id="departamento_pac_data" style="color: red"></span>
                        <select class="select2 form-control clear_input" id="departamento_pac" name="departamento_pac" multiple="multiple" data-placeholder="Seleccionar Departamento" data-dropdown-css-class="select2-purple" style="width: 100%;height: ">              
                            <option value="0">Seleccione Depto.</option>
                            <option value="San Salvador">San Salvador</option>
                            <option value="La Libertad">La Libertad</option>
                            <option value="Santa Ana">Santa Ana</option>
                            <option value="San Miguel">San Miguel</option>
                            <option value="Sonsonate">Sonsonate</option>
                            <option value="Usulutan">Usulután</option>
                            <option value="Ahuachapan">Ahuachapán</option>
                            <option value="La Union">La Unión</option>
                            <option value="La Paz">La Paz</option>
                            <option value="Chalatenango">Chalatenango</option>
                            <option value="Morazan">Morazán</option>
                            <option value="Cuscatlan">Cuscatlán</option>
                            <option value="San Vicente">San Vicente</option>
                            <option value="Cabanas">Cabañas</option>
                        </select>               
                        </div>

                        <div class=" form-group col-sm-6 select2-purple">
                            <label for="" class="etiqueta">Municipio </label> <span id="munic_pac_data" style="color: red"></span>
                            <select class="select2 form-control clear_input" id="munic_pac" name="munic_pac" multiple="multiple" data-placeholder="Seleccionar Municipio" data-dropdown-css-class="select2-purple" style="width: 100%;height: ">
                                <option value="0">Seleccione Municipio.</option>
                            </select>               
                       </div>

                        <div class="col-md-4">
                            <label for="start">Fecha</label>
                            <input class="form-control" id="fecha-cita" type="date" name="fecha-cita" readonly>
                        </div>

                        <div class="col-md-4">
                            <label for="hora" >Hora</label>
                            <input class="form-control" id="hora" type="text" name="hora">
                        </div>

                        <div class="col-md-4">
                            <label for="start">Sucursal</label>
                            <select class="form-control" id="sucursal-cita" name="sucursal-cita">
                                <option value="Metrocentro">Metrocentro</option>
                                <option value="Cascadas">Cascadas</option>
                                <option value="Santa Ana">Santa Ana</option>
                                <option value="Chalatenango">Chalatenango</option>
                            </select>
                        </div>
                        <input type="hidden" id="start">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                        <button type="submit" class="btn btn-primary" id="btnAccion">Guardar</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>
<?php 
require_once("../vistas/links_js.php");
?>
  
    <script src="<?php echo base_url; ?>Assets/js/main.min.js"></script>
    <script src="<?php echo base_url; ?>Assets/js/es.js"></script>
    <script>
        const base_url = '<?php echo base_url; ?>';
    </script>
   
    <script src="<?php echo base_url; ?>Assets/js/app.js"></script>
</body>

</html>

<?php } else{
echo "Acceso denegado";
  } ?>