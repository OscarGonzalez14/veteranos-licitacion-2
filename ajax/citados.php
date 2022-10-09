<?php

require_once("../config/conexion.php");
//llamada al modelo categoria
require_once("../modelos/Citados.php");

$citas = new Citados();

switch ($_GET["op"]){

    case 'listar_pacientes_citados':

        $citados = $citas->listar_pacientes_citados();
        $data = Array();
        foreach($citados as $c){
            $sub_array = array();
            $sub_array[] = $c["dui"]; 
            $sub_array[] = $c["paciente"]; 
            $sub_array[] = $c["sector"];
            $sub_array[] = "<i class='fas fa-plus-circle fa-2x' onClick='getCitados(".$c["id_cita"].")'></i>"; 
            $data[] = $sub_array;
        }

        $results = array(
            "sEcho"=>1, //Información para el datatables
            "iTotalRecords"=>count($data), //enviamos el total registros al datatable
            "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
            "aaData"=>$data);
          echo json_encode($results);

        break;
    
    case 'get_data_cita':

        $data = $citas->getDataCitaId($_POST["id_cita"]);
        foreach ($data as $row) {
            $output["paciente"] = $row["paciente"];
            $output["dui"] = $row["dui"];
            $output["edad"] = $row["edad"]; 
            $output["telefono"] = $row["telefono"];
            $output["usuario_lente"] = $row["usuario_lente"];
            $output["ocupacion"] = $row["ocupacion"];
            $output["sector"] = $row["sector"];
            $output["genero"] = $row["genero"];
            $output["depto"] = $row["depto"];
            $output["municipio"] = $row["municipio"];  
        }
        echo json_encode($output);

        break;

}
