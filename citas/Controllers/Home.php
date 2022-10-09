<?php
class Home extends Controller
{
    public function __construct() {
        parent::__construct();
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }
    public function registrar()
    {
        if (isset($_POST)) {
            if (empty($_POST['paciente-vet']) || empty($_POST['dui-vet'])) {
            }else{
                $paciente = $_POST['paciente-vet'];
                $dui = $_POST['dui-vet'];
                $fecha = $_POST['fecha-cita'];
                $id = $_POST['id'];
                $edad = $_POST["edad-pac"];
                $telefono = $_POST["telefono-pac"];
                $ocupacion = $_POST["ocupacion-pac"];
                $genero = $_POST["genero-pac"];
                $usuario_lente = $_POST["usuario-lente"];
                $sector = $_POST["sector-pac"];
                $depto = $_POST["departamento_pac"];
                $municipio = $_POST["munic_pac"];
                $hora = $_POST["hora"];
                $sucursal = $_POST["sucursal-cita"];
                if ($id == '') {
                    $data = $this->model->registrar($paciente, $dui, $fecha,$sucursal,$edad,$telefono,$ocupacion,$genero,$usuario_lente,$sector,$depto,$municipio,$hora,$sucursal);
                    if ($data == 'ok') {
                        $msg = array('msg' => 'Cita registrada', 'estado' => true, 'tipo' => 'success');
                    }else{
                        $msg = array('msg' => 'Error al Registrar', 'estado' => false, 'tipo' => 'danger');
                    }
                } else {
                    $data = $this->model->modificar($paciente, $dui, $fecha, $id);
                    if ($data == 'ok') {
                        $msg = array('msg' => 'Evento Modificado', 'estado' => true, 'tipo' => 'success');
                    } else {
                        $msg = array('msg' => 'Error al Modificar', 'estado' => false, 'tipo' => 'danger');
                    }
                }
                
            }
            echo json_encode($msg);
        }
        die();
    }
    public function listar()
    {
        $data = $this->model->getEventos();
        echo json_encode($data);
        die();
    }

    public function eliminar($id)
    {
        $data = $this->model->eliminar($id);
        if ($data == 'ok') {
            $msg = array('msg' => 'Evento Eliminado', 'estado' => true, 'tipo' => 'success');
        } else {
            $msg = array('msg' => 'Error al Eliminar', 'estado' => false, 'tipo' => 'danger');
        }
        echo json_encode($msg);
        die();
    }
    public function drag()
    {
        if (isset($_POST)) {
            if (empty($_POST['id']) || empty($_POST['start'])) {
                $msg = array('msg' => 'Todo los campos son requeridos', 'estado' => false, 'tipo' => 'danger');
            } else {
                $start = $_POST['start'];
                $id = $_POST['id'];
                $data = $this->model->dragOver($start, $id);
                if ($data == 'ok') {
                    $msg = array('msg' => 'Evento Modificado', 'estado' => true, 'tipo' => 'success');
                } else {
                    $msg = array('msg' => 'Error al Modificar', 'estado' => false, 'tipo' => 'danger');
                }
            }
            echo json_encode($msg);
        }
        die();
    }
}
