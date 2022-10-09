<?php
 require_once("../config/conexion.php");  

   class Productos extends Conectar{

   	public function valida_existe_aro($modelo,$imagen){
    	$conectar=parent::conexion();
        parent::set_names();

        $sql ="select*from aros where modelo=? or img=?;";
        $sql= $conectar->prepare($sql);
        $sql->bindValue(1, $modelo);
        $sql->bindValue(2, $imagen);
        $sql->execute();
        return $resultado=$sql->fetchAll();
   	}

   	public function crear_aro($marca,$modelo,$varillas,$frente,$horizontal,$vertical,$puente,$imagen){
        $conectar=parent::conexion();
        parent::set_names();

        $sql = "insert into aros values(null,?,?,?,?,?,?,?,?)";
        $sql= $conectar->prepare($sql);
        $sql->bindValue(1, $marca);
        $sql->bindValue(2, $modelo);
        $sql->bindValue(3, $varillas);
        $sql->bindValue(4, $frente);
        $sql->bindValue(5, $horizontal);
        $sql->bindValue(6, $vertical);
        $sql->bindValue(7, $puente);
        $sql->bindValue(8, $imagen);
        $sql->execute();
        return $resultado=$sql->fetchAll();
   	}

   	public function get_aros(){
   		$conectar=parent::conexion();
        parent::set_names();

        $sql="select*from aros;";
        $sql= $conectar->prepare($sql);
        $sql->execute();
        return $resultado=$sql->fetchAll();


   	}

   	public function get_data_aro($id_aro){
   		$conectar=parent::conexion();
        parent::set_names();

        $sql = "select*from aros where id_aro=?;";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $id_aro);
        $sql->execute();
        return $resultado=$sql->fetchAll();

   	}

   	public function eliminar_aro($id_aro){
   		$conectar=parent::conexion();
        parent::set_names();

        $sql ="delete from aros where id_aro=?;";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $id_aro);
        $sql->execute();

   	}

}//Fin de la clase