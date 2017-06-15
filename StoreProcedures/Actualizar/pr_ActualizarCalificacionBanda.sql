CREATE PROCEDURE pr_ActualizarCalificacionBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran ActualizarCalificacionBanda

    Begin Try
		
		declare @calificacionTotal as  float
		declare @cantidadTotal  as float

		set @cantidadTotal  = (select count(distinct(BC.comentarioID)) from comentario as C inner join banda_comentario as BC on C.id = BC.comentarioID where BC.bandaID = @bandaID)		

		set @calificacionTotal = (SELECT sum(C.calificacion) from comentario as C inner join banda_comentario as BC on C.id = BC.comentarioID where BC.bandaID = @bandaID)

		update banda
		set calificacion = convert(float, (@calificacionTotal/@cantidadTotal))
		where id = @bandaID

        COMMIT TRAN ActualizarCalificacionBanda

    End try
    Begin Catch
        SET @msg = 'Error deleting user: ' + ERROR_MESSAGE() + ' on line ' + CONVERT(NVARCHAR(255), ERROR_LINE() ) + '.'
		print @msg
        Rollback TRAN ActualizarCalificacionBanda

    End Catch

END
GO