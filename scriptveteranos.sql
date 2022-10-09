

create database IF NOT EXIST ordenes_laboratorios;

use ordenes_laboratorios;

CREATE TABLE `orden_lab` (
  `id_orden` int(11) NOT NULL,
  `codigo` varchar(25) DEFAULT NULL,
  `paciente` varchar(150) DEFAULT NULL,
  `fecha` varchar(25) DEFAULT NULL,
  `pupilar_od` varchar(10) DEFAULT NULL,
  `pupilar_oi` varchar(10) DEFAULT NULL,
  `lente_od` varchar(10) DEFAULT NULL,
  `lente_oi` varchar(10) DEFAULT NULL,
  `marca_aro` varchar(10) DEFAULT NULL,
  `modelo_aro` varchar(10) DEFAULT NULL,
  `horizontal_aro` varchar(10) DEFAULT NULL,
  `vertical_aro` varchar(10) DEFAULT NULL,
  `puente_aro` varchar(10) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `dui` varchar(12) NOT NULL,
  `estado` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- Indices de la tabla `orden_lab`
--
ALTER TABLE `orden_lab`
  ADD PRIMARY KEY (`id_orden`);
ALTER TABLE `orden_lab`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
alter table orden_lab add column fecha_correlativo varchar(25);

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(250) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `correo` varchar(250) DEFAULT NULL,
  `dui` varchar(50) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `categoria` varchar(1) DEFAULT NULL,
  `estado` varchar(1) DEFAULT NULL,
  `codigo_emp` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `usuarios`
ADD PRIMARY KEY (`id_usuario`);

ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `telefono`, `correo`, `dui`, `direccion`, `usuario`, `pass`, `categoria`, `estado`, `codigo_emp`) VALUES

(1, 'Oscar Antonio Gonzalez', '0000000', '----', '-------', 'ss', 'oscar', 'oscar1411', '1', '1', 'LT-12021');



CREATE TABLE rx_orden_lab(
 id_rx int not null auto_increment primary key,
 codigo varchar(25) not null unique,
 od_esferas varchar(8),
 od_cilindros varchar(8),
 od_eje varchar(8) ,
 od_adicion varchar(8),
 oi_esferas varchar(8),
 oi_cilindros varchar(8),
 oi_eje varchar(8) ,
 oi_adicion varchar(8)
 
)