CREATE PROCEDURE pr_ObtenerFanatico
	@nombreUsuario varchar(10)

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran obtenerUsuario

    Begin Try	

		--if (rolType = 1) 
			--declare @tmpTable table(id int ,nombre varchar(30) , apellido varchar(30), contraseña varchar(15), nombreUsuario varchar(10), diaInscripcion DATE, activo bit, uniqueID varchar)
			--select UG.nombre, UG.apellido, UG. from USUARIO_GENERAL as UG where nombreUsuario = @nombreUsuario
		
		declare @tmpTable table(id int ,nombre varchar(30) , apellido varchar(30), contraseña varchar(15), nombreUsuario varchar(10), 
			diaInscripcion DATE, activo bit, pais varchar(30), ubicacion varchar(100), universidad varchar (30), 
			celular varchar(8), fechaNacimiento DATE, descripcion varchar (300), foto varchar(100), email varchar(30), rolID int)
		
		insert into @tmpTable(id, nombre, apellido, contraseña, nombreUsuario, diaInscripcion, activo, pais, ubicacion, universidad, celular, fechaNacimiento, descripcion, foto, email, rolID)
			select UF.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, UG.diaInscripcion, UG.activo, UF.pais, UF.ubicacion, UF.universidad, UF.celular, UF.fechaNacimiento, UF.descripcion, UF.foto, UF.email, UF.rolID
			from USUARIO_GENERAL as UG inner join FAN_USUARIO as UF on UF.guID = UG.id
			where UG.nombreUsuario = @nombreUsuario
			group by UF.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, UG.diaInscripcion, UG.activo, UF.pais, UF.ubicacion, UF.universidad, UF.celular, UF.fechaNacimiento, UF.descripcion, UF.foto, UF.email, UF.rolID
		
		select * from @tmpTable

        COMMIT TRAN obtenerFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN obtenerFanatico

    End Catch

END