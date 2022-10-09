
<?php ob_start();
use Dompdf\Dompdf;
use Dompdf\Options;

require_once '../dompdf/autoload.inc.php';
require_once ('../config/conexion.php');
require_once ('../modelos/Reporteria.php');
date_default_timezone_set('America/El_Salvador'); 
//$hoy = date("d-m-Y");
//$dateTime= date("d-m-Y H:i:s");

$citas = new Reporteria();
$fecha=$_POST["fecha-cita"];
$fecha_cita = date("d-m-Y", strtotime($fecha));
$data = $citas->get_pacientes_citados($_POST["fecha-cita"]);
$sucursal = "Metrocentro";
//var_dump($data);
?>

<!DOCTYPE html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=, initial-scale=1.0">
  <title>.::Detalle despacho::.</title>
   <link rel="stylesheet" href="../estilos/styles.css">
  <style>

  body{
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
  }

  html{
    margin-top: 5px;
    margin-left: 10px;
    margin-right:10px; 
    margin-bottom: 0px;
  }
 
.input-report{
    font-family: Helvetica, Arial, sans-serif;
    border: none;
    border-bottom: 2.2px dotted #C8C8C8;
    text-align: left;
    background-color: transparent;
    font-size: 13px;
    width: 100%;
    padding: 10px
  } 
  </style>

</head>

<body>

<html>

<table style="width: 100%;margin-top:2px" width="100%">
<td width="25%" style="width:10%;margin:0px">
  <img src='../dist/img/inabve.jpg' width="90" height="70"/>
</td>
  
<td width="60%" style="width:75%;margin:0px">
<table style="width:100%">
  <br>
  <tr>
    <td  style="text-align: center;margin-top: 0px;font-size:15px;font-family: Helvetica, Arial, sans-serif;"><b>CITAS DE PACIENTES - INAVBE</b></td>
  </tr>
  <tr>
    <td  style="text-align:center;margin-top:0px;font-size:15px;font-family: Helvetica, Arial, sans-serif;"><b>FECHA: <?php echo $fecha_cita; ?></b></td>
  </tr>
  <tr>
    <td  style="text-align:center;margin-top:0px;font-size:15px;font-family: Helvetica, Arial, sans-serif;"><b>SUCURSAL: Metrocentro </b></td>
  </tr>
</table>
</td>

<td width="25%" style="width:15%;margin:0px">
  <img src='../dist/img/logo_avplus.jpg' width="60" height="35" style="margin-top:25px;"></td>
</table><!--fin tabla-->

<table width="100%" id="tabla_reporte_citas" data-order='[[ 0, "desc" ]]' style="margin: 3px">        
 <tr>
   <th>#</th>
   <th>Nombre</th>
   <th>DUI</th>
   <th>Teléfono</th>
   <th>Fecha</th>
   <th>Firma</th>
   <th>Observaciones</th>
 </tr>
 <tbody class="style_th">
 <?php
  $i=1;
  foreach ($data as $value) { ?>
    <tr> 
     <td><?php echo $i;?></td>
     <td><?php echo $value["paciente"]; ?></td>
     <td><?php echo $value["dui"]; ?></td>
     <td><?php echo $value["telefono"]; ?></td>
     <td><?php echo $value["fecha"]; ?></td>
     <td></td>
     <td></td>
    </tr> 

  <?php $i++; } ?>  
 </tbody>
</table>
</body>
</html>

<?php
$salida_html = ob_get_contents();
ob_end_clean();
$dompdf = new Dompdf();
$dompdf->loadHtml($salida_html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('letter', 'portrait');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream('document', array('Attachment'=>'0'));
?>