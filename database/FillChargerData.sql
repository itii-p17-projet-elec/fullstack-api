CREATE EVENT `FillChargerData`
		ON SCHEDULE EVERY 10 MINUTE
        DO
        CALL solarcharger.AddFakeData()