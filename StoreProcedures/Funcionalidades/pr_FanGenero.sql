CREATE PROCEDURE pr_FanGenero
	@userID int,
	@generoID int
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran FanGenero

    Begin Try
		
		insert into FAN_GENERO(fanID, generoID)
		values(@userID, @generoID)

        COMMIT TRAN FanGenero

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN FanGenero

    End Catch

END
GO
