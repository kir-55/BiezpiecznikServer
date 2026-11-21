# SignalPanel

Szablon `signal`: zwrócić uwagę ratowników, gdy nie da się zadzwonić. Każdy tryb osobnym `Switch` (dźwięk, latarka SOS `··· ––– ···`, stroboskop ekranu), przerwa jako `Segmented` (0 / 10 s / 30 s / 60 s), licznik czasu i spadku baterii.

Stroboskop: przed pierwszym włączeniem `Dialog` z ostrzeżeniem; najwyżej 3 błyski na sekundę; warstwa pod SOS. Latarka niedostępna → przełącznik nieaktywny z opisem. `bare` — bez karty (wewnątrz Panelu 2).
