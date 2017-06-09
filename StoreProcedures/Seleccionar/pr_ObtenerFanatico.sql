CREATE PROCEDURE pr_ObtenerFanatico
	@id int

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran obtenerUsuario

    Begin Try	

		--if (rolType = 1) 
			--declare @tmpTable table(id int ,nombre varchar(30) , apellido varchar(30), contraseña varchar(15), nombreUsuario varchar(10), diaInscripcion DATE, activo bit, uniqueID varchar)
			--select UG.nombre, UG.apellido, UG. from USUARIO_GENERAL as UG where nombreUsuario = @nombreUsuario
		
		declare @tmpTable table(id int ,nombre varchar(30) , apellido varchar(30), contrasena varchar(15), nombreUsuario varchar(10), 
			diaInscripcion varchar(10), activo bit, pais varchar(10), ubicacion varchar(100), universidad varchar (30), 
			celular varchar(8), fechaNacimiento varchar(10), descripcion varchar (300), foto varchar(100), email varchar(30), rolID int)
		
		insert into @tmpTable(id, nombre, apellido, contrasena, nombreUsuario, diaInscripcion, activo, pais, ubicacion, universidad, celular, fechaNacimiento, descripcion, foto, email, rolID)
			select UF.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, convert(varchar(10), UG.diaInscripcion), UG.activo, convert(varchar(10),UF.paisID), UF.ubicacion, UF.universidad, UF.celular,convert(varchar(10), UF.fechaNacimiento), UF.descripcion, UF.foto, UF.email, UG.rolID
			from USUARIO_GENERAL as UG inner join FAN_USUARIO as UF on UF.guID = UG.id inner join PAIS as P on UF.paisID = P.id
			where UF.id = @id
			group by UF.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, UG.diaInscripcion, UG.activo, UF.paisID, UF.ubicacion, UF.universidad, UF.celular, UF.fechaNacimiento, UF.descripcion, UF.foto, UF.email, UG.rolID
		
		select * from @tmpTable

        COMMIT TRAN obtenerFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN obtenerFanatico

    End Catch

END