CREATE PROCEDURE pr_SelecionarCancionBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarCancionBanda

    Begin Try
		
		select C.nombre from cancion as C where C.bandaID = @bandaID

        COMMIT TRAN SelecionarCancionBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarCancionBanda

    End Catch

END
GO


