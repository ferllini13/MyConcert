-- =============================================
-- Author:		Jairo
-- Create date: 30-05-2017
-- Description: Procedimiento almacenado que selecciona una fila de la tabla USUARIO
-- Recibe: 
	--
-- Retorna: Si fue o no insertado el usuario

-- =============================================
CREATE PROCEDURE pr_InsertarUsuarioPromocion
	@nombre varchar(30),
	@apellido varchar(30),
	@contraseña varchar(50),
	@nombreUsuario varchar(10),
	@diaInscripcion date,
	@uniqueID varchar(10),
	@rolID varchar(30)

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarPromotor

    Begin Try
		
		declare @guID int;

		insert into USUARIO_GENERAL(nombre, apellido, contraseña, nombreUsuario,diaInscripcion, rolID)
		values(@nombre, @apellido, @contraseña, @nombreUsuario, @diaInscripcion, @rolID);

		set @guID = (select id from USUARIO_GENERAL where nombreUsuario = @nombreUsuario)
		insert into USUARIO_PROMOCION(uniqueID, guID)
		values(@uniqueID, @guID)
		

		SET @msg = ''
		print @msg
        COMMIT TRAN insertarPromotor

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN insertarPromotor

    End Catch

END