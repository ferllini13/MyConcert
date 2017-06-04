CREATE PROCEDURE pr_InsertarComentario
	@fanID int,
	@bandaID int,
	@descripcion varchar(300),
	@calificacion INT

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarComentario

    Begin Try
		
		insert into comentario(descripcion, calificacion, fanID)
		values(@descripcion, @calificacion, @fanID)

		insert into BANDA_COMENTARIO(bandaID, comentarioID)
		values(@bandaID, (select id from comentario where comentario.fanID = @fanID and comentario.descripcion = @descripcion))

        COMMIT TRAN insertarComentario

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarComentario

    End Catch

END
GO