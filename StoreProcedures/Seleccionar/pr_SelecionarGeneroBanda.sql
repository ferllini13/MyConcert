CREATE PROCEDURE pr_SelecionarGeneroBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarGeneroBanda

    Begin Try
		
		select G.nombre
		from banda as B 
			inner join banda_generoas BG on BG.bandaID = B.id
			inner join genero as G on G.id = BG.generoID
		where B.id = @bandaID

        COMMIT TRAN SelecionarGeneroBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN pr_SelecionarGeneroBanda

    End Catch

END
GO
