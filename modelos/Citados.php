<?php

require_once("../config/conexion.php");

class Citados extends Conectar{

    public function listar_pacientes_citados(){
	    $conectar=parent::conexion();
        parent::set_names();

        $sql = "select * from citas;";
        $sql = $conectar->prepare($sql);
        $sql->execute();
        return $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);        
    }
}////Fin de la clase