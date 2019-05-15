CREATE EVENT `FillMeasure`
		ON SCHEDULE EVERY 10 MINUTE
        DO
        INSERT INTO solarcharger.measure(MeasureDate) VALUES(now());