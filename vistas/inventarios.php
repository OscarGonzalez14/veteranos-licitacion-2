<?php 
require_once("../config/conexion.php");
if(isset($_SESSION["usuario"])){
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home</title>
<?php require_once("links_plugin.php"); 
 require_once('../modelos/Ordenes.php');
 $ordenes = new Ordenes();
 $suc = $ordenes->get_opticas();
 require_once('../modales/nuevo_aro.php');
 ?>
<style>
  .buttons-excel{
      background-color: green !important;
      margin: 2px;
      max-width: 150px;
  }
</style>
</head>
<body class="hold-transition sidebar-mini layout-fixed" style='font-family: Helvetica, Arial, sans-serif;'>
<div class="wrapper">
<!-- top-bar -->
  <?php require_once('top_menu.php')?>
  <!-- /.top-bar -->

  <!-- Main Sidebar Container -->
  <?php require_once('side_bar.php')?>
  <!--End SideBar Container-->
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="container-fluid">
      <input type="hidden" name="id_usuario" id="id_usuario" value="<?php echo $_SESSION["id_usuario"];?>"/>
      <input type="hidden" name="usuario" id="usuario" value="<?php echo $_SESSION["usuario"];?>"/>
    <div style="border-top: 0px">
    </div>
      <button class="btn btn-outline-primary btn-sm btn-flat" data-toggle="modal" data-target="#nuevo_aro"><i class="fa fa-glasses" style="margin-top: 2px"> Ingresar aro</i></button>
      <div class="card card-dark card-outline" style="margin: 2px;">
       <table width="100%" class="table-hover table-bordered" id="datable_aros_inv"  data-order='[[ 0, "desc" ]]'>        
         <thead class="style_th bg-dark" style="color: white">
           <th>ID</th>
           <th>Modelo</th>
           <th>Marca</th>
           <th>Varillas</th>
           <th>Frente</th>
           <th>Acciones</th>
           <th>Img</th>
         </thead>
         <tbody class="style_th"></tbody>
       </table>
      </div>

      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div> 
</div>
   <!--Modal Imagen Aro-->
   <div class="modal" id="verImg">
    <div class="modal-dialog" style="max-width: 45%">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <div style="  background-size: cover;background-position: center;display:flex;align-items: center;">
            <img src="" alt="" id="imagen_aro_v" style="width: 100%;border-radius: 8px;">
          </div>          
        </div>        
   
      </div>
    </div>
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>2021 Lenti || <b>Version</b> 1.0</strong>
     &nbsp;All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      
    </div>
  </footer>
</div>

<!-- ./wrapper -->
<?php 
require_once("links_js.php");
?>
<script type="text/javascript" src="../js/productos.js"></script>
<script type="text/javascript" src="../js/autocomplete.js"></script>

</body>
</html>
 <?php } else{
echo "Acceso denegado";
  } ?>
