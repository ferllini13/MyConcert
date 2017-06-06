CREATE PROCEDURE pr_InsertarHorarioCartelera2
	@horarios horarios readonly,
	@carteleraID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarHorario2

    Begin Try
		
		insert into horario(dia, horaInicio, horaFinal, carteleraID)
		select h.dia, h.horaInicio, h.horaFinal, @carteleraID
		from @horarios as h
		group by h.dia, h.horaInicio, h.horaFinal 
		


        COMMIT TRAN insertarHorario2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarHorario2

    End Catch

END
GO
