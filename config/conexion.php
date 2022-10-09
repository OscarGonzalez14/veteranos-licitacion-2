<?php
session_start([
    'cookie_lifetime' => 86400,
    'gc_maxlifetime' => 86400,
]);
class Conectar {

 	protected $dbh;
 	protected function conexion(){
 	try {
	    $conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=veteranos","root","");
		return $conectar;
    }catch (Exception $e) {
 			print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
 	}
	} //cierre de llave de la function conexion()


    public function set_names(){
		return $this->dbh->query("SET NAMES 'utf8'");
    }
	public function ruta(){
		return "localhost/veteranos/";
	}

    //Función para convertir fecha del mes de numero al nombre, ejemplo de 01 a enero
	public static function convertir($string){
	    $string = str_replace(
	    array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
	    array('ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', ' DICIEMBRE'),$string);
	    return $string;
	}

}//cierre de llave conectar


class conexionLenti{
	protected $dbh;
 	protected function conexion_lenti(){
 	try {
	    $conectarLenti = $this->dbh = new PDO("mysql:local=localhost;dbname=lenti","root","");
		//$conectarLenti = $this->dbh = new PDO("mysql:local=localhost;dbname=u579024306_lenti","u579024306_rlenti","And20vas08");
		return $conectarLenti;
    }catch (Exception $e) {
 			print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
 	}
	} //cierre de llave de la function conexion()

	public function set_names(){
		return $this->dbh->query("SET NAMES 'utf8'");
    }
    	public function ruta(){
		return "localhost/veteranos/";
	}
}

?>