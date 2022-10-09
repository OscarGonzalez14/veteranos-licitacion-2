<?php

require_once("config/conexion.php");

class Login extends Conectar{
  
public function login_users(){
  $conectar=parent::conexion();
  parent::set_names();
  if(isset($_POST["enviar"])){
//********VALIDACIONES  DE ACCESO*****************
  $password = $_POST["pass"];
  $usuario = $_POST["usuario"];

  if(empty($usuario) or empty($password)){
      header("Location:index.php?m=2");
      exit();
    }else { 
      
    $sql= "select * from usuarios where usuario=? and pass=?";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1, $usuario);
        $sql->bindValue(2, $password);
        $sql->execute();
        $resultado = $sql->fetch();

    if(is_array($resultado) and count($resultado)>0){
        $_SESSION["id_usuario"] = $resultado["id_usuario"];           
        $_SESSION["usuario"] = $resultado["usuario"];
        $_SESSION["categoria"] = $resultado["categoria"];
       
      header("Location:vistas/home.php");
      exit();
    } else {                         
    //si no existe el registro entonces le aparece un mensaje
    header("Location:index.php?m=1");
    exit();
    } 
  }//cierre del else
  }//condicion enviar
}///FIN FUNCION LOGIN

}