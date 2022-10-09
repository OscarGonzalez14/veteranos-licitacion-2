<?php

require_once("../config/conexion.php");
//llamada al modelo categoria
require_once("../modelos/Productos.php");

$productos = new Productos();

switch ($_GET["op"]){
   case 'listar_aros':

    $data= Array();
    $datos = $productos->get_aros();
    foreach($datos as $row){
        $sub_array = array();

        $sub_array[] = $row["id_aro"];
        $sub_array[] = $row["modelo"];
        $sub_array[] = $row["marca"];
        $sub_array[] = $row["color_varillas"];
        $sub_array[] = $row["color_frente"];
        $sub_array[] = '<i class="fas fa-trash" aria-hidden="true" style="color:red" onClick="confirmar_eliminar_aro(\''.$row["modelo"].'\',\''.$row["marca"].'\','.$row["id_aro"].')"></i>&nbsp;<i class="fas fa-edit" aria-hidden="true" style="color:green"></i>';
        $sub_array[] = '<i class="fas fa-image fa-2x" aria-hidden="true" style="color:blue" onClick="verImg(\''.$row["img"].'\')">';

        $data[] = $sub_array;
      }

      $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
      echo json_encode($results); 
	break;

	case 'crear_aro':
    $validate = $productos->valida_existe_aro($_POST["modelo"],$_POST["imagen"]);

    if(is_array($validate)==true and count($validate)==0){
	$productos->crear_aro($_POST["marca"],$_POST["modelo"],$_POST["varillas"],$_POST["frente"],$_POST["horizontal"],$_POST["vertical"],$_POST["puente"],$_POST["imagen"]);
    $messages[]='ok';
    }else{
    	$errors[]='error';
    }
    	if (isset($messages)){
     ?>
       <?php
         foreach ($messages as $message) {
             echo json_encode($message);
           }
         ?>
   <?php
 }
    //mensaje error
      if (isset($errors)){

   ?>

         <?php
           foreach ($errors as $error) {
               echo json_encode($error);
             }
           ?>
   <?php
   }
   ///fin mensaje error
	break;

	//////////////REPORTE INGRESOS BODEGA
    case "get_aros_orden":
        $datos=$productos->get_aros();
        //Vamos a declarar un array
        $data= Array();
        foreach($datos as $row){
        $sub_array = array(); 
        $sub_array[] = $row["modelo"];
        $sub_array[] = $row["marca"];
        $sub_array[] = $row["color_varillas"];
        $sub_array[] = $row["color_frente"];
        $sub_array[] = "<i class='fas fa-plus-circle fa-2x' onClick='selectAro(".$row["id_aro"].")'></i>";
        $data[] = $sub_array;
    }

 // print_r($_POST);

    $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);

break;

case 'buscar_data_aro':
   
    $data = $productos->get_data_aro($_POST["id_aro"]);
	foreach ($data as $row) {
		$output["modelo"] = $row["modelo"];
        $output["marca"] = $row["marca"];
        $output["color_varillas"] = $row["color_varillas"]; 
        $output["color_frente"] = $row["color_frente"]; 
        $output["horizontal"] = $row["horizontal"]; 
        $output["vertical"] = $row["vertical"]; 
        $output["puente"] = $row["puente"];
        $output["img"] = $row["img"];   
	}
	echo json_encode($output);
	break;

case 'eliminar_aro':

	$productos->eliminar_aro($_POST["id_aro"]);
    $messages[]='ok';
	if (isset($messages)){
     ?>
       <?php
         foreach ($messages as $message) {
             echo json_encode($message);
           }
         ?>
   <?php
 }
    //mensaje error
      if (isset($errors)){

   ?>

         <?php
           foreach ($errors as $error) {
               echo json_encode($error);
             }
           ?>
   <?php
   }
   ///fin mensaje error
break;



}


