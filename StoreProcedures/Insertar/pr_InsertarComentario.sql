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

		declare @calificacionTotal as  float
		declare @cantidadTotal  as float

		set @cantidadTotal  = (select count(distinct(BC.comentarioID)) from comentario as C inner join banda_comentario as BC on C.id = BC.comentarioID where BC.bandaID = @bandaID)		

		set @calificacionTotal = (SELECT sum(C.calificacion) from comentario as C inner join banda_comentario as BC on C.id = BC.comentarioID where BC.bandaID = @bandaID)

		update banda
		set calificacion = convert(float, (@calificacionTotal/@cantidadTotal))
		where id = @bandaID

        COMMIT TRAN insertarComentario

    End try
    Begin Catch
        SET @msg = 'Error deleting user: ' + ERROR_MESSAGE() + ' on line ' + CONVERT(NVARCHAR(255), ERROR_LINE() ) + '.'
		print @msg
        Rollback TRAN insertarComentario

    End Catch

END
GO