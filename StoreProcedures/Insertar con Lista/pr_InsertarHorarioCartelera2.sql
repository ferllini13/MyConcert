CREATE PROCEDURE pr_InsertarHorarioCartelera2
	@horarios horarios readonly,
	@carteleraID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarHorario2

    Begin Try
		
		insert into horario(dia, horaInicio, horaFinal)
		select h.dia, h.horaInicio, h.horaFinal
		from @horarios as h
		group by h.dia, h.horaInicio, h.horaFinal
		
		insert into horario_cartelera(horarioID, carteleraID) 
			select H.id, @carteleraID
			from Horario as H, @horarios as h2
			where H.dia = h2.dia and H.horaInicio = h2.horaInicio and H.horaFinal = h2.horaFinal
			group by H.id
		


        COMMIT TRAN insertarHorario2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarHorario2

    End Catch

END
GO
