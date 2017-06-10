-- =============================================
-- Author:		Jairo
-- Create date: 30-05-2017
-- Description: Procedimiento almacenado que selecciona una fila de la tabla USUARIO
-- Recibe: 
	--@nombre nombre del usuario
	--@apellido apellido del usuario
	--@contraseña contraseña del usuario
	--@nombreUsuario nombre de usuario con el cual ingresara 
	--@diaInscripcion dia en el cual ingreso a la aplicacion
	--@pais pais de l usuario
	--@ubicacion lugar de habitacion del usuario
	--@universidad universidad si asiste a alguna
	--@celular celular del usuario
	--@fechaNacimiento 
	--@descripcion descripcion personal
	--@foto direccion donde se almacena la foto
	--@email email del usuairo
	--@rolID tipo del usuario
-- Retorna: Si fue o no insertado el usuario

-- =============================================
CREATE PROCEDURE pr_InsertarUsuarioFanatico
	@nombre varchar(30),
	@apellido varchar(30),
	@contraseña varchar(50),
	@nombreUsuario varchar(10),
	@diaInscripcion varchar(10),
	@pais int,
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
    Begin Tran insertarFanatico

    Begin Try
		
		declare @guID int;

		insert into USUARIO_GENERAL(nombre, apellido, contraseña, nombreUsuario,diaInscripcion, rolID)
		values(@nombre, @apellido, @contraseña, @nombreUsuario,  @diaInscripcion, @rolID);

		set @guID = (select id from USUARIO_GENERAL where nombreUsuario = @nombreUsuario)
		
        if (@ubicacion = '' and @universidad = '') 
			insert into FAN_USUARIO(paisID, celular, fechaNacimiento, descripcion, email, guID)
			values(@pais, @celular, @fechaNacimiento, @descripcion, @email, @guID)
			
		else if (@ubicacion = '' and @universidad != '') 
			insert into FAN_USUARIO(paisID, celular, fechaNacimiento, descripcion, email, universidad, guID)
			values(@pais, @celular, @fechaNacimiento, @descripcion, @email, @universidad, @guID)
			
		else 
			insert into FAN_USUARIO(paisID, celular, fechaNacimiento, descripcion, email, universidad, ubicacion, guID)
			values(@pais, @celular, @fechaNacimiento, @descripcion, @email, @universidad, @ubicacion, @guID)
			
		PRINT @guID

			
		SET @msg = ''
		print @msg
        COMMIT TRAN insertarFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN insertarFanatico

    End Catch

END