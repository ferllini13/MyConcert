CREATE PROCEDURE pr_ObtenerPromotor
	@id int

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran obtenerPromotor

    Begin Try	

		declare @tmpTable table(id int ,nombre varchar(30) , apellido varchar(30), contrasena varchar(15), nombreUsuario varchar(10), 
								diaInscripcion DATE, activo bit, uniqueID varchar(10), rolID int)
		
		insert into @tmpTable(id, nombre, apellido, contrasena, nombreUsuario, diaInscripcion, activo,uniqueID, rolID)
			select UP.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, UG.diaInscripcion, UG.activo, UP.uniqueID, UG.rolID
			from USUARIO_GENERAL as UG inner join USUARIO_PROMOCION as UP on UP.guID = UG.id
			where UP.id = @id
			group by UP.id, UG.nombre, UG.apellido, UG.contraseña, UG.nombreUsuario, UG.diaInscripcion, UG.activo, UP.uniqueID, UG.rolID
		
		select * from @tmpTable

        COMMIT TRAN obtenerPromotor

    End try
    Begin Catch

        SET @msg = 'Error deleting product: ' + ERROR_MESSAGE() + ' on line ' + CONVERT(NVARCHAR(255), ERROR_LINE() ) + '.'
		print @msg
        Rollback TRAN obtenerPromotor

    End Catch

END