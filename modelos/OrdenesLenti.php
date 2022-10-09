<?php

require_once("../config/conexion.php");  

  class ordenesLenti extends conexionLenti{

      //////////////////  GET CODIGO DE ORDEN ////////////////////////
      public function get_correlativo_orden($fecha){
      $conectar= parent::conexion_lenti();
        $fecha_act = "%".$fecha.'%';         
        $sql= "select codigo from orden where fecha_creacion like ? order by id_orden DESC limit 1;";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1,$fecha_act);
        $sql->execute();
      return $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  
  /////////////////  COMPROBAR SI EXISTE CORRELATIVO ///////////////
    public function comprobar_existe_correlativo($codigo){
        $conectar = parent::conexion_lenti();
        $sql="select id_orden from orden where codigo=?;";
        $sql= $conectar->prepare($sql);
        $sql->bindValue(1, $codigo);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

    public function trasladoOrdenesLenti($codigo,$paciente,$usuario,$tipo_lente,$od_esferas,$od_cilindros,$od_eje,$od_adicion,$oi_esferas,$oi_cilindros,$oi_eje,$oi_adicion,$marca_aro,$modelo_aro,$horizontal_aro,$vertical_aro,$puente,$pupilar_od,$pupilar_oi,$lente_od,$lente_oi,$categoria_lente){    
    $conectar=parent::conexion_lenti();
    parent::set_names();
        if($tipo_lente=="Visión Sencilla" and $categoria_lente=="Proceso"){
            $marca = "VS AURORA";
            $precio = "12.50";
        }elseif($tipo_lente=="Visión Sencilla" and $categoria_lente=="Terminado"){
            $marca = "VS Terminado";
            $precio = "12.50";
        }elseif($tipo_lente=="Progresive"){
            $marca = "GEMINI";
            $precio = "16.25";
        }elseif($tipo_lente=="Flaptop"){
            $marca = "BIFOCAL 1.56";
            $precio = "9";
        }
        
        date_default_timezone_set('America/El_Salvador'); $hoy = date("d-m-Y H:i:s");

        $fecha = date('m-Y');
        $date_validate = date("d-m-Y");
        $mes = date('m');
        $year = date('Y');
        $anio = substr($year, 2,5);
        $datos = $this->get_correlativo_orden($fecha);
       

        if(is_array($datos)==true and count($datos)>0){
            foreach($datos as $row){
              $numero_orden = substr($row["codigo"],4,15)+1;
              $codigo = $mes.$anio.$numero_orden;
            }
        }else{
              $codigo = $mes.$anio.'1';
        }
        $codigoExiste= $this->comprobar_existe_correlativo($codigo);
        if(is_array($codigoExiste) && count($codigoExiste)==0){
            $sql2 = "insert into orden value(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
            $sql2 = $conectar->prepare($sql2);
            $sql2->bindValue(1, $codigo);
            $sql2->bindValue(2, $paciente);
            $sql2->bindValue(3, "Sin Observaciones");
            $sql2->bindValue(4, $usuario);
            $sql2->bindValue(5, $hoy);
            $sql2->bindValue(6, "01");
            $sql2->bindValue(7, 1);
            $sql2->bindValue(8, $tipo_lente);
            $sql2->bindValue(9, 1);
            $sql2->bindValue(10, "Veteranos");
            $sql2->bindValue(11, "Blanco");
            $sql2->bindValue(12, "01");
            $sql2->bindValue(13, $marca);
            $sql2->bindValue(14, "Blanco");
            $sql2->bindValue(15, "NO");
            $sql2->bindValue(16, $precio);
            $sql2->execute();

            $sql ="insert into rx_orden values(?,?,?,?,?,?,?,?,?,?,?,?);";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $codigo);
            $sql->bindValue(2, $paciente);
            $sql->bindValue(3, $od_esferas);
            $sql->bindValue(4, $od_cilindros);
            $sql->bindValue(5, $od_eje);
            $sql->bindValue(6, $od_adicion);
            $sql->bindValue(7, "*");
            $sql->bindValue(8, $oi_esferas);
            $sql->bindValue(9, $oi_cilindros);
            $sql->bindValue(10, $oi_eje);
            $sql->bindValue(11, $oi_adicion);
            $sql->bindValue(12, "*");
            $sql->execute();

            // **INSERT INTO ARO ORDEN** //

    $sql3 = "insert into aro_orden values(?,?,?,?,?,?,?,?,?);";
    $sql3 = $conectar->prepare($sql3);
    $sql3->bindValue(1, $codigo);
    $sql3->bindValue(2, $modelo_aro);
    $sql3->bindValue(3, $marca_aro);
    $sql3->bindValue(4, "-");
    $sql3->bindValue(5, "-");
    $sql3->bindValue(6, $horizontal_aro);
    $sql3->bindValue(7, "-");
    $sql3->bindValue(8, $vertical_aro);
    $sql3->bindValue(9, $puente);
    $sql3->execute();

//***INSERT INTO ALTURAS ORDEN ///

if($tipo_lente=="Visión Sencilla" or $tipo_lente=="Progresive"){
    $sql4 = "insert into alturas_orden values(?,?,?,?,?,?,?,?);";
    $sql4 = $conectar->prepare($sql4);
    $sql4->bindValue(1, $codigo);
    $sql4->bindValue(2, $paciente);
    $sql4->bindValue(3, $pupilar_od);
    $sql4->bindValue(4, $lente_od);
    $sql4->bindValue(5, "-");
    $sql4->bindValue(6, $pupilar_oi);
    $sql4->bindValue(7, $lente_oi);
    $sql4->bindValue(8, "-");
    $sql4->execute();
}elseif($tipo_lente=="Flaptop"){
    $sql4 = "insert into alturas_orden values(?,?,?,?,?,?,?,?);";
    $sql4 = $conectar->prepare($sql4);
    $sql4->bindValue(1, $codigo);
    $sql4->bindValue(2, $paciente);
    $sql4->bindValue(3, $pupilar_od);
    $sql4->bindValue(4, "-");
    $sql4->bindValue(5, $lente_od);
    $sql4->bindValue(6, $pupilar_oi);
    $sql4->bindValue(7, "-");
    $sql4->bindValue(8, $lente_oi);
    $sql4->execute();
}
   return $codigo;
}        

    }


  }