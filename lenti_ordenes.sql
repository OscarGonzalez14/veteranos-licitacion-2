use lenti;
SELECT * FROM orden;
describe orden;

show tables;
drop table orden;

create table orden(
codigo varchar(45) UNIQUE NOT NULL,
optica varchar(250),
sucursal varchar(200),
paciente varchar(250),
observaciones varchar(250),
usuario varchar(250),
fecha_creacion varchar(25),
estado varchar(3)
);

create table rx_orden(
codigo varchar(45),
paciente varchar(250),
odesferas varchar(10),
odcindros varchar(10),
odeje varchar(10),
odadicion varchar(10),
odprisma varchar(10),
oiesferas varchar(10),
oicindros varchar(10),
oieje varchar(10),
oiadicion varchar(10),
oiprisma varchar(10)        
);

alter table rx_orden add foreign key (codigo) references orden(codigo);
alter table rx_orden add foreign key(paciente) references orden(paciente);

set FOREIGN_KEY_CHECKS=0;
alter table rx_orden drop ibfk_2;
SELECT*FROM optica;
SELECT direccion from sucursal_optica where id_optica=1;
select nombre from optica;
select id_optica,nombre from optica;
select direccion from sucursal_optica where id_optica=1;
select id_sucursal,direccion from sucursal_optica where id_optica=1;

DESCRIBE orden;
alter table orden add column id_optica INT;
ALTER TABLE orden add foreign key(id_optica) references optica(id_optica);
select*from orden;
select o.nombre,s.nombre from optica as o join sucursal_optica as s where o.id_optica=2 and s.id_sucursal=5;
select*from optica;
select*from sucursal_optica;
select o.nombre,s.nombre from optica as o join sucursal_optica as s where o.id_optica=2 and s.id_sucursal=2;
select o.nombre,o.id_optica,s.id_sucursal,s.nombre from optica as o inner join sucursal_optica as s on  o.id_optica = s.id_optica;
select o.nombre,o.id_optica,s.id_sucursal,s.nombre,s.direccion from optica as o inner join sucursal_optica as s on  o.id_optica = s.id_optica
where o.id_optica=2 and s.id_sucursal=5 limit 1;
SELECT*FROM sucursal_optica;
DESCRIBE orden;

alter table rx_orden drop foreign key rx_orden_ibfk_4;
alter table rx_orden add column paciente varchar(250) after  codigo;
describe rx_orden;

alter table rx_orden add foreign key (paciente) references orden(paciente) on update cascade;












