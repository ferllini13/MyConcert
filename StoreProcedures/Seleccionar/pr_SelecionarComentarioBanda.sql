CREATE PROCEDURE pr_SelecionarComentarioBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarComentarioBanda

    Begin Try
		
		select C.descripcion, C.calificacion
		from banda as B 
			inner join banda_comentario as BC on BC.bandaID = B.id
			inner join comentario as C on C.id = BC.comentarioID
		where B.id = @bandaID

        COMMIT TRAN SelecionarComentarioBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarComentarioBanda

    End Catch

END
GO
