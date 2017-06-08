CREATE PROCEDURE pr_SelecionarBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarBanda

    Begin Try
		
		select * from Banda where Banda.id = @bandaID

        COMMIT TRAN SelecionarBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarBanda

    End Catch

END
GO


