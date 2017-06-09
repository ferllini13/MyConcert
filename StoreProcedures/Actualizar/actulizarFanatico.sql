CREATE PROCEDURE pr_ActulizarFanatico
	@id int ,
	@nombre varchar(30), 
	@apellido varchar(30), 
	@contrasena varchar(15), 
	@nombreUsuario varchar(10), 
	@diaInscripcion varchar(10), 
	@activo bit, 
	@pais varchar(10), 
	@ubicacion varchar(100), 
	@universidad varchar (30), 
	@celular varchar(8), 
	@fechaNacimiento varchar(10), 
	@descripcion varchar(300), 
	@foto varchar(100), 
	@email varchar(30), 
	@rolID int

AS
BEGIN

	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran actualizarFanatico
	
	Begin Try

		declare @guID int
		set @guID = (select guID from FAN_USUARIO where id = @id)
		
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

		update FAN_USUARIO
		set paisID = convert(int, @pais)
		where id = @id

		update FAN_USUARIO
		set ubicacion = @ubicacion
		where id = @id

		update FAN_USUARIO
		set universidad = @universidad
		where id = @id

		update FAN_USUARIO
		set celular = @celular
		where id = @id

		update FAN_USUARIO
		set fechaNacimiento = convert(date, @fechaNacimiento)
		where id = @id

		update FAN_USUARIO
		set descripcion = @descripcion
		where id = @id

		update FAN_USUARIO
		set foto = @foto
		where id = @id

		update FAN_USUARIO
		set email = @email
		where id = @id

		COMMIT TRAN actualizarFanatico
		
	End Try
	Begin Catch
		Rollback TRAN actualizarFanatico
	End Catch
END