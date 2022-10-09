<?php

require_once("../config/conexion.php");
//llamada al modelo categoria
require_once("../modelos/Ordenes.php");
require_once("../modelos/OrdenesLenti.php");
$ordenes = new Ordenes();
$lentiOrdenes = new ordenesLenti();

switch ($_GET["op"]){

case 'crear_barcode':
  $datos = $ordenes->comprobar_existe_correlativo($_POST["codigo"]);
    if(is_array($datos) == true and count($datos)==0){
      $ordenes->crea_barcode($_POST["codigo"]);
      $variable = 'Exito';
      echo json_encode(array("bla"=>$variable));

    }
break;

case 'sucursales_optica':
  $sucursales = $ordenes->get_sucursales_optica($_POST["optica"]);
  $options = "<option value='0'>Seleccionar sucursal...</option>";

  for($i=0; $i < sizeof($sucursales); $i++){
    $options.="<option value='".$sucursales[$i]["id_sucursal"]."'>".$sucursales[$i]["direccion"]."</option>";
  }

  echo $options;

  break;

case 'registrar_orden':
  
  $token_validate = $ordenes ->validar_existe_correlativo($_POST["dui"]);
    date_default_timezone_set('America/El_Salvador'); $now = date("dmY");
    $validate = $_POST["validate"];
    $fecha = date('d-m-Y');
    if ($validate !=1) {
    $correlativos = $ordenes->get_correlativo_orden($fecha);
    if(is_array($correlativos) == true and count($correlativos)>0){ 
      foreach($correlativos as $row){
      $numero_orden = substr($row["codigo"],8,15)+1;
      $nuevo_correlativo = $now.$numero_orden;
    }
    }else{
      $nuevo_correlativo = $now."1";
    }
      
    $datos = $ordenes->validar_correlativo_orden($nuevo_correlativo);
    if(is_array($token_validate) == true and count($token_validate)==0 and is_array($datos) and count($datos)==0){ 
        for ($x = 0; $x < 1; $x++) {      
    $ordenes->registrar_orden($nuevo_correlativo,$_POST['paciente'],$_POST['fecha_creacion'],$_POST['od_pupilar'],$_POST['oipupilar'],$_POST["odlente"],$_POST["oilente"],$_POST['marca_aro_orden'],$_POST['modelo_aro_orden'],$_POST['horizontal_aro_orden'],$_POST['vertical_aro_orden'],$_POST['puente_aro_orden'],$_POST["id_usuario"],$_POST["observaciones_orden"],$_POST["dui"],$_POST["od_esferas"],$_POST["od_cilindros"],$_POST["od_eje"],$_POST["od_adicion"],$_POST["oi_esferas"],$_POST["oi_cilindros"],$_POST["oi_eje"],$_POST["oi_adicion"],$_POST["tipo_lente"],$_POST["color_varilla"],$_POST["color_frente"],$_POST["imagen"],$_POST["edad"],$_POST["usuario"],$_POST["ocupacion"],$_POST["avsc"],$_POST["avfinal"],$_POST["avsc_oi"],$_POST["avfinal_oi"],$_POST["telefono"],$_POST["genero"],$_POST["user"],$_POST["depto"],$_POST["municipio"],$_POST["instit"]);
    $mensaje='exito'; 
  }}else{
    $mensaje ="existe";
  }

    }else{
    $ordenes->editar_orden($_POST["correlativo_op"],$_POST["paciente"],$_POST["fecha_creacion"],$_POST["od_pupilar"],$_POST["oipupilar"],$_POST["odlente"],$_POST["oilente"],$_POST["marca_aro_orden"],$_POST["modelo_aro_orden"],$_POST["horizontal_aro_orden"],$_POST['vertical_aro_orden'],$_POST['puente_aro_orden'],$_POST["id_usuario"],$_POST["observaciones_orden"],$_POST["dui"],$_POST["od_esferas"],$_POST["od_cilindros"],$_POST["od_eje"],$_POST["od_adicion"],$_POST["oi_esferas"],$_POST["oi_cilindros"],$_POST["oi_eje"],$_POST["oi_adicion"],$_POST["tipo_lente"],$_POST["color_varilla"],$_POST["color_frente"],$_POST["categoria_lente"],$_POST["imagen"],$_POST["edad"],$_POST["usuario"],$_POST["ocupacion"],$_POST["avsc"],$_POST["avfinal"],$_POST["avsc_oi"],$_POST["avfinal_oi"],$_POST["telefono"],$_POST["genero"],$_POST["depto"],$_POST["municipio"],$_POST["instit"]);
    $mensaje="error";
  }
    echo json_encode($mensaje);
  break;

case "get_correlativo_orden":
    date_default_timezone_set('America/El_Salvador'); $now = date("dmY");
    $fecha = date('d-m-Y');
    $datos= $ordenes->get_correlativo_orden($fecha);

  if(is_array($datos)==true and count($datos)>0){
    foreach($datos as $row){
      $numero_orden = substr($row["codigo"],8,15)+1;
      $output["codigo_orden"] = $now.$numero_orden;
    }  

  }else{
        $output["codigo_orden"] = $now.'1';
  }
  echo json_encode($output);

    break;

case 'get_ordenes':
  $datos = $ordenes->get_ordenes();
  $data = Array();
    $about = "about:blank";
    $print = "print_popup";
    $ancho = "width=600,height=500";
  foreach ($datos as $row) { 
  $sub_array = array();

  $sub_array[] = $row["id_orden"];
  $sub_array[] = $row["codigo"];
  $sub_array[] = strtoupper($row["paciente"]);
  $sub_array[] = $row["dui"];
  $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));
  $sub_array[] = '<button type="button"  class="btn btn-sm bg-light" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button>';  
  $sub_array[] = '<button type="button"  class="btn btn-xs bg-light" onClick="eliminarBeneficiario(\''.$row["codigo"].'\')"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></button>';               
                                                
    $data[] = $sub_array;
  }
  
  $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);
  break;

case 'get_ordenes_dig':
  
  $data = Array();
  if ($_POST["filter"] == 1) {
    $datos = $ordenes->get_ordenes_filter_date($_POST["inicio"],$_POST["hasta"]);
  }elseif($_POST["filter"]==0){
    $datos = $ordenes->get_ordenes();
  }

  foreach ($datos as $row) { 
  $sub_array = array();

  $sub_array[] = $row["id_orden"];  
  $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));
  $sub_array[] = strtoupper($row["paciente"]);
  $sub_array[] = $row["dui"];
  $sub_array[] = $row["telefono"];
  $sub_array[] = $row["tipo_lente"];
  $sub_array[] = '<button type="button"  class="btn btn-sm bg-light" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button>';  
  $sub_array[] = '<button type="button"  class="btn btn-xs bg-light" onClick="eliminarBeneficiario(\''.$row["codigo"].'\')"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></button>';               
                                                
    $data[] = $sub_array;
  }
  
  $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);
  break;

  case 'get_data_orden':

    $datos=$ordenes->get_data_orden($_POST["codigo"],$_POST["paciente"]);
      foreach($datos as $row){
        
      $output["codigo"] = $row["codigo"];
      $output["paciente"] = $row["paciente"];
      $output["fecha"] = $row["fecha"];
      $output["pupilar_od"] = $row["pupilar_od"];
      $output["pupilar_oi"] = $row["pupilar_oi"];
      $output["lente_od"] = $row["lente_od"];
      $output["lente_oi"] = $row["lente_oi"];
      $output["marca_aro"] = $row["marca_aro"];
      $output["modelo_aro"] = $row["modelo_aro"];
      $output["horizontal_aro"] = $row["horizontal_aro"];
      $output["vertical_aro"] = $row["vertical_aro"];
      $output["puente_aro"] = $row["puente_aro"];
      $output["id_usuario"] = $row["id_usuario"];
      $output["observaciones"] = $row["observaciones"];
      $output["dui"] = $row["dui"];
      $output["estado"] = $row["estado"];        
      $output["od_esferas"] = $row["od_esferas"];
      $output["od_cilindros"] = $row["od_cilindros"];
      $output["od_eje"] = $row["od_eje"];
      $output["od_adicion"] = $row["od_adicion"];
      $output["oi_esferas"] = $row["oi_esferas"];
      $output["oi_cilindros"] = $row["oi_cilindros"];
      $output["oi_eje"] = $row["oi_eje"];
      $output["oi_adicion"] = $row["oi_adicion"];
      $output["tipo_lente"] = $row["tipo_lente"];
      $output["color_varilla"] = $row["color_varilla"];
      $output["color_frente"] = $row["color_frente"];
      $output["img"] = $row["img"];
      $output['categoria'] = $row['categoria'];
      $output['laboratorio'] = $row['laboratorio'];
      $output['edad'] = $row['edad'];
      $output['usuario_lente'] = $row['usuario_lente'];
      $output['ocupacion'] = $row['ocupacion'];
      $output['avsc'] = $row['avsc'];
      $output['avfinal'] = $row['avfinal'];
      $output['avsc_oi'] = $row['avsc_oi'];
      $output['avfinal_oi'] = $row['avfinal_oi'];
      $output['telefono'] = $row['telefono'];
      $output['genero'] = $row['genero'];
      $output['depto'] = $row['depto'];
      $output['municipio'] = $row['municipio'];   
      $output['institucion'] = $row['institucion'];     
    
      }
      
      echo json_encode($output);

    break;


  case 'eliminar_orden':
    $ordenes->eliminar_orden($_POST["codigo"]);
    $mensaje = "Ok";
    echo json_encode($mensaje);
    break;
    
  case 'show_create_order':
    $datos=$ordenes->show_create_order($_POST["codigo"]);
    foreach($datos as $row){
      $output["info_orden"] = "Creado por: ".$row["nombres"]." * ".$row["fecha_correlativo"];
    }
    echo json_encode($output);
    break;


case 'listar_ordenes_enviar':
  $datos = $ordenes->get_ordenes();
  $data = Array();
  $i=0;

  foreach ($datos as $row) { 
  $sub_array = array();
  if ($row["estado"]==0){
    $est = "Digitado";
    $titulo = "Enviar";
  }

  $sub_array[] = $row["id_orden"];
  $sub_array[] = '<input type="checkbox"class="form-check-input envio_order" value="'.$row["codigo"].'" name="'.$row["paciente"].'" id="orden_env'.$i.'">'.$titulo.'';
  $sub_array[] = strtoupper($row["paciente"]);
  $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));    
  $sub_array[] = '<button type="button"  class="btn btn-xs bg-light" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button>';
  $sub_array[] = $est;              
    $i++;                                           
    $data[] = $sub_array;
  }
  
  $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
  echo json_encode($results);
  break;

  case 'enviar_orden':
    $ordenes->enviar_orden($_POST["numero_orden"]);
    echo json_encode("OK!");
    break;

  case 'listar_ordenes_enviadas':
  $datos = $ordenes->get_ordenes_enviadas();
  $data = Array();
  $i=0;

  foreach ($datos as $row) { 
  $sub_array = array();
  $est = "Enviado";
  $titulo = "Recibir";

  $sub_array[] = $row["id_orden"];
 // $sub_array[] = $row["fecha"];
  $sub_array[] = '<input type="checkbox"class="form-check-input envio_order" value="'.$row["codigo"].'" name="'.$row["paciente"].'" id="orden_env'.$i.'">'.$titulo.'';
  $sub_array[] = strtoupper($row["paciente"]);
  $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));    
  $sub_array[] = '<button type="button"  class="btn btn-xs bg-light actions_orders" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button>';
  $sub_array[] = $est;              
    $i++;                                           
    $data[] = $sub_array;
  }
  
  $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);
  break;

    /////////////////////////////////////ORDENES PENDIENTES LENTES //////////////
  case 'get_ordenes_por_enviar':

  if($_POST["inicio"] == "0" and $_POST["hasta"] =="0" and $_POST["lente"]=="0"){
    $datos = $ordenes->get_ordenes_enviar_general($_POST["instit"]);
  }elseif($_POST["inicio"] != "0" and $_POST["hasta"] !="0" and $_POST["lente"]=="0"){
    $datos = $ordenes->get_ordenes_por_enviar($_POST["inicio"],$_POST["hasta"]);
  }elseif($_POST["inicio"] != "0" and $_POST["hasta"] !="0" and $_POST["lente"] !="0"){
    $datos = $ordenes->ordenEnviarFechaLente($_POST["inicio"],$_POST["hasta"],$_POST["lente"]);
  }elseif($_POST["inicio"] == "0" and $_POST["hasta"] =="0" and $_POST["lente"] !="0"){
    $datos = $ordenes->ordenEnviarLente($_POST["lente"]);
  }
  $data = Array();
  $tit = "Enviar";

    foreach ($datos as $row) {

        $od_esferas = ($row["od_esferas"]=="-" or $row["od_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["od_esferas"];
        $od_cilindro = ($row["od_cilindros"]=="-" or $row["od_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["od_cilindros"];
        $od_eje = ($row["od_eje"]=="-" or $row["od_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["od_eje"];
        $od_add = ($row["od_adicion"]=="-" or $row["od_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["od_adicion"];
        //////////////////////////////////////////////////;//////////////////////////////////////////////////////////////////////
        $oi_esferas = ($row["oi_esferas"]=="-" or $row["oi_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["oi_esferas"];
        $oi_cilindro = ($row["oi_cilindros"]=="-" or $row["oi_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["oi_cilindros"];
        $oi_eje = ($row["oi_eje"]=="-" or $row["oi_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["oi_eje"];
        $oi_add = ($row["oi_adicion"]=="-" or $row["oi_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["oi_adicion"];
        ///////////////////////////   
        $sub_array = array();
        $sub_array[] = $row["id_orden"]; 
        $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));       
        $sub_array[] = '<div style="text-align:center"><input type="checkbox" class="form-check-input ordenes_enviar" value="'.$row["id_orden"].'" name="'.$row["paciente"].'" id="'.$row["codigo"].'" style="text-align: center"><span style="color:white">.</span></div>';
        $sub_array[] = $row["institucion"];
        $sub_array[] = "<span style='font-size:11px'>".strtoupper($row["paciente"])."</span>";
        $sub_array[] = $od_esferas." ".$od_cilindro." ".$od_eje." ".$od_add;
        $sub_array[] = $oi_esferas." ".$oi_cilindro." ".$oi_eje." ".$oi_add;
        $sub_array[] = $row["tipo_lente"];
        $sub_array[] = '<div style="text-align:center"><button type="button"  class="btn btn-sm bg-light show_panel_admin" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button></div>';

        $data[] = $sub_array;
  }
  
  $results = array(
    "sEcho"=>1, //Información para el datatables
    "iTotalRecords"=>count($data), //enviamos el total registros al datatable
    "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
    "aaData"=>$data);
  echo json_encode($results);
  break;
    ///////////////////////////////LISTAR ORDENES ENVIADAS LENTES///////////////
  case 'get_ordenes_env':

  if($_POST["cat_lente"] !="0" and $_POST["inicio"]=="0" and $_POST["hasta"]=="0" and $_POST["tipo_lente"]=="0"){
    $datos = $ordenes->getOrdenesEnvBase($_POST['laboratorio'],$_POST["cat_lente"],$_POST["instit"]);
  }
  elseif($_POST["tipo_lente"] !="0" and $_POST["cat_lente"]=="0" and $_POST["hasta"]=="0" and $_POST["hasta"]=="0"){
    $datos = $ordenes->getOrdenesEnvLente($_POST['laboratorio'],$_POST["tipo_lente"],$_POST["instit"]);
  }
  elseif($_POST["inicio"] != "0" and $_POST["hasta"] != "0" and $_POST["cat_lente"]=="0" and $_POST["tipo_lente"]=="0"){
    $datos = $ordenes->getOrdenesEnvFechas($_POST['laboratorio'],$_POST["inicio"],$_POST["hasta"]);
  }
  elseif($_POST["inicio"] == "0" and $_POST["hasta"] == "0" and $_POST["cat_lente"] !="0" and $_POST["tipo_lente"] !="0"){
    $datos = $ordenes->getOrdenesBaseLente($_POST['laboratorio'],$_POST["cat_lente"],$_POST["tipo_lente"],$_POST["instit"]);
  }
  elseif($_POST["inicio"] != "0" and $_POST["hasta"] != "0" and $_POST["cat_lente"] !="0" and $_POST["tipo_lente"] !="0"){
    $datos = $ordenes->get_ordenes_env($_POST["laboratorio"],$_POST["cat_lente"],$_POST["inicio"],$_POST["hasta"],$_POST["tipo_lente"]);
  }elseif($_POST["laboratorio"]=="0"){
    $datos = $ordenes->get_ordenes_env_general();
  }elseif($_POST["cat_lente"] =="0" and $_POST["inicio"]=="0" and $_POST["hasta"]=="0" and $_POST["tipo_lente"]=="0" and $_POST["instit"]=='0'){
    $datos = $ordenes->get_ordenes_por_lab($_POST["laboratorio"]);
  }
  $data = Array();
  $tit = "Recibir";

  foreach ($datos as $row) {

        $od_esferas = ($row["od_esferas"]=="-" or $row["od_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["od_esferas"];
        $od_cilindro = ($row["od_cilindros"]=="-" or $row["od_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["od_cilindros"];
        $od_eje = ($row["od_eje"]=="-" or $row["od_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["od_eje"];
        $od_add = ($row["od_adicion"]=="-" or $row["od_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["od_adicion"];
        //////////////////////////////////////////////////;//////////////////////////////////////////////////////////////////////
        $oi_esferas = ($row["oi_esferas"]=="-" or $row["oi_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["oi_esferas"];
        $oi_cilindro = ($row["oi_cilindros"]=="-" or $row["oi_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["oi_cilindros"];
        $oi_eje = ($row["oi_eje"]=="-" or $row["oi_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["oi_eje"];
        $oi_add = ($row["oi_adicion"]=="-" or $row["oi_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["oi_adicion"];
        ///////////////////////////   
        $sub_array = array();
        $sub_array[] = $row["id_orden"];
        $sub_array[] = date("d-m-Y",strtotime($row["fecha"])); 
        $sub_array[] = $row["institucion"];  
        $sub_array[] = '<div data-toggle="tooltip" title="Fecha envío: '.$row["fecha"].'" style="text-align:center"><input type="checkbox" class="form-check-input ordenes_enviar" value="'.$row["id_orden"].'" name="'.$row["paciente"].'" id="'.$row["codigo"].'" style="text-align: center"><span style="color:white">.</span></div>';
        $sub_array[] = "<span style='font-size:11px' data-toggle='tooltip' title='Fecha envío: ".$row["fecha"]."'>".strtoupper($row["paciente"])."</span>";
        $sub_array[] = $od_esferas." ".$od_cilindro." ".$od_eje." ".$od_add;
        $sub_array[] = $oi_esferas." ".$oi_cilindro." ".$oi_eje." ".$oi_add;
        $sub_array[] = $row["tipo_lente"];
        $sub_array[] = $row["categoria"];
        $sub_array[] = $row["laboratorio"];
        $sub_array[] = $row["modelo_aro"];
        $sub_array[] = '<div style="text-align:center"><button type="button"  class="btn btn-sm bg-light show_panel_admin" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button></div>';
        $sub_array[] = '<i class="fas fa-edit" aria-hidden="true" style="color:green" onClick="editaLaboratorio(\''.$row["paciente"].'\',\''.$row["categoria"].'\',\''.$row["laboratorio"].'\',\''.$row["codigo"].'\')"></i></button>';     
       $data[] = $sub_array;
  }
  
  $results = array(
    "sEcho"=>1, //Información para el datatables
    "iTotalRecords"=>count($data), //enviamos el total registros al datatable
    "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
    "aaData"=>$data);
    echo json_encode($results);
   // echo json_encode($stmt);
  break;
  ////////////////////////LISTAR ORDENES ENVIADAS A LABORATORIO
  case 'get_ordenes_enviadas_lab':
  if($_POST["laboratorio"] !='0'){
   $datos = $ordenes->getOrdenesEnviadasLab($_POST["laboratorio"],$_POST["cat_lente"],$_POST["inicio"],$_POST["hasta"],$_POST["tipo_lente"]);
    }else{
     $datos = $ordenes->getEnviosGeneral();
    }
  $data = Array();
  $tit = "Recibir";

  foreach ($datos as $row) {
        $clase="";
        $od_esferas = ($row["od_esferas"]=="-" or $row["od_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["od_esferas"];
        $od_cilindro = ($row["od_cilindros"]=="-" or $row["od_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["od_cilindros"];
        $od_eje = ($row["od_eje"]=="-" or $row["od_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["od_eje"];
        $od_add = ($row["od_adicion"]=="-" or $row["od_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["od_adicion"];
        //////////////////////////////////////////////////;//////////////////////////////////////////////////////////////////////
        $oi_esferas = ($row["oi_esferas"]=="-" or $row["oi_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["oi_esferas"];
        $oi_cilindro = ($row["oi_cilindros"]=="-" or $row["oi_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["oi_cilindros"];
        $oi_eje = ($row["oi_eje"]=="-" or $row["oi_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["oi_eje"];
        $oi_add = ($row["oi_adicion"]=="-" or $row["oi_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["oi_adicion"];
        ///////////////////////////
        if($row['estado']==3){
          $clase = "fas fa-print";
        }   
        $sub_array = array();
        $sub_array[] = $row["id_orden"];
        $sub_array[] = date("d-m-Y",strtotime($row["fecha"]));   
        $sub_array[] = '<div data-toggle="tooltip" title="Fecha envío: '.$row["fecha"].'" style="text-align:center"><input type="checkbox" class="form-check-input ordenes_enviar" value="'.$row["id_orden"].'" name="'.$row["paciente"].'" id="'.$row["codigo"].'" style="text-align: center"><span style="color:white">.</span></div>';
        $sub_array[] = "<span style='font-size:11px' data-toggle='tooltip' title='Fecha envío: ".$row["fecha"]."'>".strtoupper($row["paciente"])."</span><i class='".$clase."'' style='color:blue;font-size;8px'></i>";
        $sub_array[] = $od_esferas." ".$od_cilindro." ".$od_eje." ".$od_add;
        $sub_array[] = $oi_esferas." ".$oi_cilindro." ".$oi_eje." ".$oi_add;
        $sub_array[] = $row["tipo_lente"];
        $sub_array[] = $row["categoria"];
        $sub_array[] = $row["laboratorio"];
        $sub_array[] = '<div style="text-align:center"><button type="button"  class="btn btn-sm bg-light show_panel_admin" onClick="verEditar(\''.$row["codigo"].'\',\''.$row["paciente"].'\')"><i class="fa fa-eye" aria-hidden="true" style="color:blue"></i></button></div>';
        $sub_array[] = '<i class="fas fa-edit" aria-hidden="true" style="color:green" onClick="editaLaboratorio(\''.$row["paciente"].'\',\''.$row["categoria"].'\',\''.$row["laboratorio"].'\',\''.$row["codigo"].'\')"></i></button>';     
       $data[] = $sub_array;
  }
  
  $results = array(
    "sEcho"=>1, //Información para el datatables
    "iTotalRecords"=>count($data), //enviamos el total registros al datatable
    "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
    "aaData"=>$data);
    echo json_encode($results);
  break;


/*******TRASLADO DE DATA A VETERANOS ******* */
  case 'enviar_ordenes':

    if($_POST["destino"] != "Lenti"){
      $ordenes->enviarOrdenes();
      $mensaje = "Ok";
      echo json_encode($mensaje); 

    }elseif($_POST["destino"] == "Lenti"){
     $arrayOrdenes = array();
      $arrayOrdenes = json_decode($_POST["arrayEnvio"]);
      foreach ($arrayOrdenes as $k => $v) {
        //$lentiOrdenes->trasladoOrdenesLenti($v->id_item);
        $orden = $ordenes->get_data_orden($v->id_item,$v->paciente);
        foreach($orden as $row){
          $response = $lentiOrdenes->trasladoOrdenesLenti($row["codigo"],$row["paciente"],$_POST["user"],$row["tipo_lente"],$row["od_esferas"],$row["od_cilindros"],$row["od_eje"],$row["od_adicion"],$row["oi_esferas"],$row["oi_cilindros"],$row["oi_eje"],$row["oi_adicion"],$row["marca_aro"],$row["modelo_aro"],$row["horizontal_aro"],$row["vertical_aro"],$row["puente_aro"],$row["pupilar_od"],$row["pupilar_oi"],$row["lente_od"],$row["lente_oi"],$_POST["categoria_len"]);
          echo $response."<br>";
          echo $v->id_item."<br>";
          $ordenes->updateOrdenAct($response,$v->id_item,$_POST["categoria_len"]);
          $ordenes->agregarHistorial($v->id_item,$_POST["user"]);
        }
      }
      $mensaje = "Ok";
      echo json_encode($mensaje);

    }
    break;

     case 'reset_tables':
    $ordenes->resetTables();
    $mensaje = "Ok";
    echo json_encode($mensaje);    
    break;

    case 'reset_tables_print':
    $ordenes->resetTablesPrint();
    $mensaje = "Ok";
    echo json_encode($mensaje);    
    break;


    case 'get_ordenes_enviar':
    $datos = $ordenes->get_ordenes_enviar();
    $data = Array();
    $about = "about:blank";
    $print = "print_popup";
    $ancho = "width=600,height=500";
    foreach ($datos as $row) { 
    $sub_array = array();

    $sub_array[] = $row["id_orden"];
    $sub_array[] = '<div style="margin-bottom:3px"><input type="checkbox"class="form-check-input envio_order" value="'.$row["codigo"].'" name="'.$row["paciente"].'" id="orden_env'.$i.'"><span style="color:white">.</span>';
    $sub_array[] = $row["paciente"];
    $sub_array[] = $row["marca_aro"];
    $sub_array[] = $row["modelo_aro"];
    $sub_array[] = $row["horizontal_aro"];
    $sub_array[] = $row["vertical_aro"];
    $sub_array[] = $row["puente_aro"];
    $sub_array[] = $row["color_varilla"];
    $sub_array[] = $row["color_frente"];
    $sub_array[] = '<i class="fa fa-image" aria-hidden="true" style="color:blue" onClick="verImagen(\''.$row["img"].'\')"></i></button>';  
    $data[] = $sub_array;
  }
  
  $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);
    
  break;

  ////////////////////////ORDENES PROCESANDO /////////////////
  case 'get_ordenes_procesando':
  $datos = $ordenes->get_ordenes_procesando();
  $data = Array();
  $tit = "Recibir";

    foreach ($datos as $row) {

        $od_esferas = ($row["od_esferas"]=="-" or $row["od_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["od_esferas"];
        $od_cilindro = ($row["od_cilindros"]=="-" or $row["od_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["od_cilindros"];
        $od_eje = ($row["od_eje"]=="-" or $row["od_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["od_eje"];
        $od_add = ($row["od_adicion"]=="-" or $row["od_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["od_adicion"];
        //////////////////////////////////////////////////;//////////////////////////////////////////////////////////////////////
        $oi_esferas = ($row["oi_esferas"]=="-" or $row["oi_esferas"]=="")? '': "<span style='color:black'><b>Esf.</b> </span>".$row["oi_esferas"];
        $oi_cilindro = ($row["oi_cilindros"]=="-" or $row["oi_cilindros"]=="")? '': "<span style='color:black'><b>Cil.</b> </span>".$row["oi_cilindros"];
        $oi_eje = ($row["oi_eje"]=="-" or $row["oi_eje"]=="")? '': "<span style='color:black'><b>Eje.</b> </span>".$row["oi_eje"];
        $oi_add = ($row["oi_adicion"]=="-" or $row["oi_adicion"]=="")? '': "<span style='color:blue'>Add. </span>".$row["oi_adicion"];
        ///////////////////////////   
        $sub_array = array();
        $sub_array[] = $row["id_orden"];  
        $sub_array[] = $row["fecha"];
        $sub_array[] = "<span style='font-size:11px' data-toggle='tooltip' title='Fecha recibido: ".$row["fecha"]."'>".strtoupper($row["paciente"])."</span>";
        $sub_array[] = $od_esferas." ".$od_cilindro." ".$od_eje." ".$od_add;
        $sub_array[] = $oi_esferas." ".$oi_cilindro." ".$oi_eje." ".$oi_add;
        $sub_array[] = $row["tipo_lente"];
        $sub_array[] = $row["laboratorio"];   
        $data[] = $sub_array;
  }
  
  $results = array(
    "sEcho"=>1, //Información para el datatables
    "iTotalRecords"=>count($data), //enviamos el total registros al datatable
    "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
    "aaData"=>$data);
  echo json_encode($results);
  break;

  case 'enviar_lente':
    $ordenes->enviarLente($_POST["codigo"],$_POST["destino"],$_POST["usuario"]);
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
       if (isset($errors)){?>
        <?php
           foreach ($errors as $error) {
               echo json_encode($error);
             }
           ?>
        <?php }
    
    break;

    case 'editar_envio':
    $ordenes->editarEnvio($_POST["codigo"],$_POST["dest"],$_POST["cat"],$_POST["paciente"]);
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
       if (isset($errors)){?>
        <?php
           foreach ($errors as $error) {
               echo json_encode($error);
             }
           ?>
        <?php }
    
    break;

    case 'registrar_rectificacion':      
      $ordenes->registrarRectificacion($_POST['motivo'],$_POST['estado_aro'],$_POST['usuario'],$_POST["codigo"],$_POST["correlativo"]);
      break;

    case 'correlativo_rectificacion':
      $correlativo = $ordenes->getCorrelativoRectificacion();
      if (is_array($correlativo)==true and count($correlativo)>0) {
      foreach($correlativo as $row){                  
        $codigo = $row["codigo_rectifi"];
        $cod = (substr($codigo,2,11))+1;
        $output["correlativo"] = "R-".$cod;
      }

    }else{
      $output["correlativo"] = "R-1";
    }
    echo json_encode($output);
    
    break;
  
  //******************* GET HISTORIAL DE ORDEN ******************//
  case 'ver_historial_orden':

  
  if ($_POST["categoriaUser"]=='1') {
    $historial = $ordenes->getAccionesOrden($_POST["codigo"]);
  }elseif ($_POST["categoriaUser"]=='a' or $_POST["categoriaUser"]=='3') {
    $historial = $ordenes->getAccionesOrdenVet($_POST["codigo"]);
  }
  $data = Array();
  foreach ($historial as $k) {
    $sub_array["fecha_hora"] =  date("d-m-Y H:i:s", strtotime($k["fecha"]));
    $sub_array["usuario"] = $k["nombres"];
    $sub_array["accion"] = $k["tipo_accion"];
    $sub_array["observaciones"] = $k["observaciones"];
    $data[] = $sub_array;
  }
  echo json_encode($data);
  break;
  

  case 'listar_ordenes_rect':
    $ordenes->getTablasRectificaciones($_POST["codigoOrden"]); 
  break;

  case 'listar_det_orden_act':
    $ordenes->getDetOrdenActRec($_POST["codigoOrden"]); 
  break;

  case 'listar_rectificaciones':

    $data= Array();
    $datos = $ordenes->listar_rectificaciones();
    foreach($datos as $row){
      $sub_array = array();
      $sub_array[] = $row["id_rectifi"];
      $sub_array[] = $row["codigo_rectifi"];
      $sub_array[] = $row["fecha"]." ".$row["hora"];
      $sub_array[] = $row["usuario"];
      $sub_array[] = $row["paciente"];
      $sub_array[] = '<i class="fas fa-eye" aria-hidden="true" style="color:blue" onClick="detRecti(\''.$row["codigo_orden"].'\')"></i>';

      $data[] = $sub_array;
      }

      $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
      echo json_encode($results); 
  break;


case 'get_estadisticas':
  
  $data = Array();
    $datos = $ordenes->get_estadisticas_orden($_POST["inicio"],$_POST["hasta"]);
    foreach ($datos as $row) { 
      $sub_array = array();
      $sub_array[] = $row["nombres"];
      $sub_array[] = $row["cantidad"];
      $data[] = $sub_array;
    }
  
    $results = array(
      "sEcho"=>1, //Información para el datatables
      "iTotalRecords"=>count($data), //enviamos el total registros al datatable
      "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
      "aaData"=>$data);
    echo json_encode($results);
    break;

}









