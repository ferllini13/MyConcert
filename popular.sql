insert into ROL(descripcion)
values('Fanatico')
insert into ROL(descripcion)
values('Promocion')

insert into PAIS(nombre)
values('Costa Rica')
insert into PAIS(nombre)
values('Argentina')
insert into PAIS(nombre)
values('Chile')
insert into PAIS(nombre)
values('Colombia')
insert into PAIS(nombre)
values('Brasil')
insert into PAIS(nombre)
values('Mexico')
insert into PAIS(nombre)
values('Panama')
insert into PAIS(nombre)
values('Canada')

insert into GENERO(nombre)
values('Reggae')
insert into GENERO(nombre)
values('Swin')
insert into GENERO(nombre)
values('Dancehall')
insert into GENERO(nombre)
values('Salsa')
insert into GENERO(nombre)
values('Merengue')
insert into GENERO(nombre)
values('Cumbia')
insert into GENERO(nombre)
values('Rock')
insert into GENERO(nombre)
values('Alternativo')
insert into GENERO(nombre)
values('Metal')
insert into GENERO(nombre)
values('Heavy Metal')
insert into GENERO(nombre)
values('Psicodelico')
insert into GENERO(nombre)
values('Funk')
insert into GENERO(nombre)
values('Pop')
insert into GENERO(nombre)
values('Pop punk')
insert into GENERO(nombre)
values('Hip-hop')
insert into GENERO(nombre)
values('Jazz')
insert into GENERO(nombre)
values('Blues')
insert into GENERO(nombre)
values('K-Pop')
insert into GENERO(nombre)
values('Calipso')
insert into GENERO(nombre)
values('Rumba')
insert into GENERO(nombre)
values('Indie')
insert into GENERO(nombre)
values('Hard Rock')
insert into GENERO(nombre)
values('Progresivo')
insert into GENERO(nombre)
values('Grunge')

select * from ROL
select * from PAIS

exec dbo.pr_InsertarUsuarioFanatico
	@nombre = 'Jairo',
	@apellido = 'Mendez',
	@contraseña = 'jairo26',
	@nombreUsuario = 'jmm26',
	@diaInscripcion = '06-June-017',
	@pais = 1,
	@ubicacion = 'Turrialba, Cartago',
	@universidad = 'ITCR',
	@celular = '85193885',
	@fechaNacimiento = '26-September-1996',
	@descripcion = 'estudiante aburrido',
	@foto = '',
	@email = 'jairom@gmail.com',
	@rolID = 1

exec dbo.pr_InsertarUsuarioPromocion
	@nombre = 'Jason',
	@apellido = 'Leiton',
	@contraseña = 'leitoncito',
	@nombreUsuario = 'leiton',
	@diaInscripcion = '06-June-2017',
	@uniqueID = '1234567',
	@rolID = 2
	
declare @artistas1 as StringList
declare @canciones1 as StringList

insert @artistas1 values ('Roger Waters'),('David Gilmour'),('Nick Manson'),('Richard Wright')
insert @canciones1 values ('The Wall'),('Shine on you Crazy Diamond'),('Wish you were here'),('Dogs'),('Echoes')

exec dbo.pr_InsertarBanda2
	@bandaNombre = 'Pink Floyd',
	@artistas  = @artistas1,
	@canciones = @canciones1
	
declare @artistas2 as StringList
declare @canciones2 as StringList

insert @artistas2 values ('John Deacon'),('Brian May'),('Freddie Mercury')
insert @canciones2 values ('We are the Champions'),('Bohemian Raphsody'),('Stone Cold'),('I want to break free')

exec dbo.pr_InsertarBanda2
	@bandaNombre = 'Queen',
	@artistas  = @artistas2,
	@canciones = @canciones2