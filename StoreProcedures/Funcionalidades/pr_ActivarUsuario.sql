CREATE PROCEDURE pr_ActivarUsuario
	@usuarioID int

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran ActivarUsuario

    Begin Try
		
		declare @guID int;

		set @guID = (select FAN_USUARIO.guID from FAN_USUARIO where FAN_USUARIO.id = @usuarioID)

		update USUARIO_GENERAL
		set activo = 1
		where USUARIO_GENERAL.id = @guID
        
        COMMIT TRAN ActivarUsuario

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN ActivarUsuario

    End Catch

END