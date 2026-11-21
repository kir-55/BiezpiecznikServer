> **Zastąpiony przez `CallPanel`** — specyfikacja ma jeden komponent wezwania pomocy (`EmergencyContactPanel`), używany i w czacie (szablon `call`), i w Panelu 2. Zasada progu zostaje: tylko zagrożenie życia.

# Fallback112

Karta „Zadzwoń teraz pod 112” — **tylko przy zagrożeniu życia lub zdrowia**: brak oddechu, utrata przytomności, silne krwawienie, pożar, zatrucie, poważny uraz. Brak odpowiedzi w źródłach to nie powód do 112 — wtedy `NoSource`.

- Zawsze z sugestią w `hint`: co robić do przyjazdu pomocy (jedno zdanie, ze źródła).
- Tło `sos-tint`, ramka `sos`, nagłówek `sos-text`, przycisk `sos` `lg` na całą szerokość, `tel:112`.
- `role="alert"` — czytnik ekranu ogłasza kartę od razu.
- Jedyne miejsce w aplikacji z kolorem `sos`. Jeśli pojawia się często, przestaje działać — dlatego próg jest wysoki.
