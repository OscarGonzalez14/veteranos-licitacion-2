<?php

require_once("../config/conexion.php");
//require_once('../vistas/side_bar.php');
class Pruebas extends Conectar{

	public function getdatVeteranos(){
	  $conectar = parent::conexion();
      parent::set_names();
            
      $sql = "SELECT o.`categoria`,o.tipo_lente,r.od_esferas,r.od_cilindros,r.od_eje,r.od_adicion,r.oi_esferas,r.oi_cilindros,r.oi_eje,r.oi_adicion from orden_lab as o INNER join rx_orden_lab as r on r.codigo=o.codigo WHERE fecha like '%2021-11%' and o.categoria='Terminado';";
      $sql=$conectar->prepare($sql);
      $sql->execute();
      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    

      return $resultado;
}


}

$prueba = new Pruebas();

$data = $prueba->getdatVeteranos();

?>




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <table class="default">

  <table>

  <thead>
    <tr>
      <th>categoria</th>
      <th>tipo_lente</th>
      <th>od_esferas</th>
      <th>od_cilindros</th>
      <th>od_eje</th>
      <th>od_adicion</th>
      <th>oi_esferas</th>
      <th>oi_cilindros</th>
      <th>oi_eje</th>
      <th>oi_adicion</th>
    </tr>
  </thead>
  <?php foreach($data as $row){ ?>
  <tr>
    <td><?php echo $row["categoria"]?></td>
    <td><?php echo $row["tipo_lente"]?></td>
    <td><?php echo $row["od_esferas"]?></td>
    <td><?php echo $row["od_cilindros"]?></td>
    <td><?php echo $row["od_eje"]?></td>
    <td><?php echo $row["od_adicion"]?></td>
    <td><?php echo $row["oi_esferas"]?></td>
    <td><?php echo $row["oi_cilindros"]?></td>
    <td><?php echo $row["oi_eje"]?></td>
    <td><?php echo $row["oi_adicion"]?></td>
  </tr>
  <?php } ?>
  </table>


</body>
</html>

<?php

    header('Content-Type: text/csv'); 
    header('Content-Disposition: attachment; filename="dataveteranos";'); 



 
 