<?php
class HomeModel extends Query{
    public function __construct()
    {
        parent::__construct();
    }
    public function registrar($paciente, $dui, $fecha,$sucursal,$edad,$telefono,$ocupacion,$genero,$usuario_lente,$sector,$depto,$municipio,$hora){
        $color="#750000";
        $estado="0";
        $sql = "INSERT INTO citas (paciente,dui,fecha,sucursal,color,estado,telefono,edad,ocupacion,genero,usuario_lente,sector,depto,municipio,hora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $array = array($paciente, $dui, $fecha,$sucursal,$color,$estado,$telefono,$edad,$ocupacion,$genero,$usuario_lente,$sector,$depto,$municipio,$hora);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        }else{
            $res = 'error';
        }
        return $res;
    }
    public function getEventos(){
        $sql = "SELECT id_cita as id,concat(count(paciente),'-', sucursal) as title,fecha as start, color FROM citas where estado='0' group by fecha,sucursal;";
        return $this->selectAll($sql);
    }
    public function modificar($title, $inicio, $color, $id)
    {
        $sql = "UPDATE evento SET title=?, start=?, color=? WHERE id=?";
        $array = array($title, $inicio, $color, $id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
    public function eliminar($id)
    {
        $sql = "DELETE FROM evento WHERE id=?";
        $array = array($id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
    public function dragOver($start, $id)
    {
        $sql = "UPDATE evento SET start=? WHERE id=?";
        $array = array($start, $id);
        $data = $this->save($sql, $array);
        if ($data == 1) {
            $res = 'ok';
        } else {
            $res = 'error';
        }
        return $res;
    }
}

?>