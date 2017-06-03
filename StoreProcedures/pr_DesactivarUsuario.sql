CREATE PROCEDURE pr_DesactivarUsuario
	@usuarioID int

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran DesactivarUsuario

    Begin Try
		
		declare @guID int;

		set @guID = (select FAN_USUARIO.guID from FAN_USUARIO where FAN_USUARIO.id = @usuarioID)

		update USUARIO_GENERAL
		set activo = 0
		where USUARIO_GENERAL.id = @guID
        
        COMMIT TRAN DesactivarUsuario

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN DesactivarUsuario

    End Catch

END