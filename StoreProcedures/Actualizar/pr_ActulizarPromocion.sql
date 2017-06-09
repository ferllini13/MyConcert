CREATE PROCEDURE pr_ActulizarPromocion
	@id int ,
	@nombre varchar(30), 
	@apellido varchar(30), 
	@contrasena varchar(15),
	@nombreUsuario varchar(10), 
	@diaInscripcion varchar(10), 
	@activo bit, 
	@uniqueID varchar(10), 
	@rolID int

AS
BEGIN

	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran actulizarPromocion
	
	Begin Try

		declare @guID int
		set @guID = (select guID from USUARIO_PROMOCION where id = @id)
		
		update USUARIO_GENERAL
		set nombre = @nombre
		where id = @guID

		update USUARIO_GENERAL
		set contraseña = @contrasena
		where id = @guID

		update USUARIO_GENERAL
		set nombreUsuario = @nombreUsuario
		where id = @guID

		update USUARIO_GENERAL
		set diaInscripcion = @diaInscripcion
		where id = @guID

		update USUARIO_GENERAL
		set activo = @activo
		where id = @guID
		
		COMMIT TRAN actulizarPromocion
		
	End Try
	Begin Catch
		Rollback TRAN actulizarPromocion
	End Catch
END