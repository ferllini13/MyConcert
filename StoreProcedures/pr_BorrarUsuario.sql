CREATE PROCEDURE pr_BorrarUsuario
	@userID int,
	@rolID int
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran deleteUser

    Begin Try
		
		declare @rolType int
		declare @guID int

		set @rolType = (select descripcion from rol where rol.id = @rolID)		

		if(@rolType = 1) begin
			set @guID = (select FAN_USUARIO.guID from FAN_USUARIO where FAN_USUARIO.id = @userID)

			delete from FAN_USUARIO
			where FAN_USUARIO.id = @userID

			delete from USUARIO_GENERAL
			where @guID = USUARIO_GENERAL.id
		end 
		else begin
			set @guID = (select USUARIO_PROMOCION.guID from USUARIO_PROMOCION where USUARIO_PROMOCION.id = @userID)

			delete from USUARIO_PROMOCION
			where USUARIO_PROMOCION.id = @userID
			delete from USUARIO_GENERAL
			where @guID = USUARIO_GENERAL.id
		end

        COMMIT TRAN deleteUser

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN deleteUser

    End Catch

END
GO
