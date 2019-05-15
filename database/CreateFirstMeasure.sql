INSERT INTO solarcharger.measure(MeasureId, MeasureDate) VALUES(0, now());
INSERT INTO solarcharger.chargerdata(IdMeasure, UBat, TBat, `TExt`, ICharge, IDischarge, IConsum, PSignal) VALUES(0,RAND() * (12.6-9+1) + 9, RAND() * (45+10+1) - 10, RAND() * (40+10+1) - 10, RAND() * (5-0+1) + 0, RAND() * (5-0+1) + 0, RAND() * (5-0+1) + 0, RAND() * (15-0+1) + 0)
