DELETE FROM solarcharger.measure WHERE MeasureId > 0;
DELETE FROM solarcharger.chargerdata WHERE IdMeasure > 0;
SELECT * FROM solarcharger.measure;