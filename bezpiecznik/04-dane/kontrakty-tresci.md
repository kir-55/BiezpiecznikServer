# Kontrakty treści

Formaty plików i baz, na których spotykają się ścieżki MVP ([zakres MVP](../07-hackathon/zakres-mvp.md)). Przykłady służą też jako dane testowe (fixtures). **Treści medycznych w przykładach nie ma:** w miejscu tekstu stoi `<…>`, a wartości wpisuje człowiek z wytycznych.

| Kontrakt | Plik | Etap | Treść przygotowuje | Kod |
|---|---|---|---|---|
| [Karta ratunkowa](#karta-ratunkowa) | `assets/cards/{card_id}.json` | MVP: `rko`, `choking`, `bleeding`. Po MVP: `burn`, `unconscious`, `shock` | Człowiek, tor H w h0–2 (teksty dosłownie z wytycznych PRC/ERC 2025, słowa wariantów, frazy) | Ścieżka D: wczytanie, wykrywanie fraz i wariantu |
| [Frazy ryzyka](#frazy-ryzyka) | `assets/phrases/risk.json` | MVP | Człowiek, tor H w h0–2 | Ścieżka D (reguła `call`) |
| [Intencje](#intencje) | `assets/intents.json` | MVP | Człowiek, tor H w h0–2 | Ścieżka B (`map`) i C (przepływ czatu) |
| [Reguły planu 72 h](#reguły-planu-72-h) | `assets/plan_rules.json` | Po MVP | Człowiek | Router planu (po MVP) |
| [Baza wiedzy](#baza-wiedzy) | `kb.sqlite` | MVP; kolumna `rects` po MVP | PDF-y: człowiek, h0. Kontrola fragmentów i synonimy: człowiek, h1–2 | Ścieżka A: skrypt PDF → SQLite |
| [Baza punktów](#baza-punktów) | `points.sqlite` | MVP: `shelter`, `hiding_place`, `emergency_shelter`. Po MVP: pozostałe rodzaje | 3 potwierdzone schrony w Szczecinie: człowiek, h0–2 | Ścieżka B: skrypt OSM → SQLite |

Wspólne zasady:

- Pliki JSON w UTF-8, klucze po angielsku w `snake_case`, teksty dla użytkownika po polsku.
- **Normalizacja fraz** (karty, ryzyko, intencje, synonimy): małe litery, bez polskich znaków (także `ł → l`), zwinięte spacje. Frazy w plikach zapisujemy już znormalizowane. Ta sama funkcja przy budowie i w aplikacji.
- **Dopasowanie przybliżone** toleruje literówki w słowie („nie oddyhca”), ale nigdy nie dodaje ani nie usuwa „nie”: „oddycha” nie pasuje do frazy „nie oddycha”.
- Każdy plik ma pole `version` (liczba całkowita), a testy przy budowie sprawdzają schemat i istnienie każdego `source_id` w bazie wiedzy.

## Karta ratunkowa

`assets/cards/{card_id}.json`. Zachowanie: [karty ratunkowe](../02-funkcje/02-pierwsza-pomoc/karty-ratunkowe.md). Szablony w `panels[]`: [szablony czatu](../03-ekrany/szablony-czatu.md).

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["version", "id", "name", "priority", "phrases", "panels", "source_ids"],
  "properties": {
    "version": { "type": "integer" },
    "id": { "type": "string", "pattern": "^[a-z_]+$" },
    "name": { "type": "string", "maxLength": 30 },
    "priority": { "type": "integer", "minimum": 1, "description": "1 = najwyższy. Kolejność tabeli w karty-ratunkowe.md" },
    "phrases": { "type": "array", "minItems": 1, "items": { "type": "string" } },
    "variant_words": {
      "type": "object",
      "description": "id wariantu → słowa w wiadomości, które go ustawiają",
      "additionalProperties": { "type": "array", "items": { "type": "string" } }
    },
    "panels": {
      "type": "array",
      "description": "Bez `call`: dodaje go aplikacja na początku wiadomości",
      "items": {
        "type": "object",
        "required": ["type"],
        "properties": { "type": { "enum": ["steps", "bullets", "animation", "cpr", "map", "signal", "quote"] } }
      }
    },
    "source_ids": { "type": "array", "minItems": 1, "items": { "type": "string" } }
  }
}
```

- **`priority`:** kilka trafionych kart → karta o najniższej liczbie, pod nią przyciski „Też: {name}”. `rko` ma `1`, `unconscious` niższy priorytet niż `rko`, więc „nieprzytomny i nie oddycha” otwiera RKO.
- **`variant_words`:** tylko karty z wariantami wiekowymi. Bez trafienia → pierwszy wariant. Oba warianty trafione → `infant`. Reguła: [warianty](../03-ekrany/szablony-czatu.md#warianty).
- **`cpr`:** wartości `rate_bpm`, `rescuer_change_s` i proporcje w `variants[]` są **z wytycznych, wypełnia człowiek**. Builder zostawia `null`; karta z `null` w `cpr` nie przechodzi testu przy budowie.
- **Przejście do innej karty:** element `steps` może mieć `card_link { label, card_id }`. Renderer rysuje pod krokiem przycisk, który wstawia tę kartę jako nową wiadomość z tym samym `selected_variant` (np. „Nie oddycha → RKO” w `unconscious`).
- **Źródła:** `source_ids` = wszystkie `source_id` użyte w `panels`. W MVP rekordy źródeł bierze aplikacja z bazy wiedzy (też w APK). Po MVP, gdy baza jest pobieraną paczką, kopia rekordów (bez PDF i `rects`) leży w `assets/cards/sources.json`.

Przykład (`rko.json`, skrócony):

```json
{
  "version": 1,
  "id": "rko",
  "name": "RKO",
  "priority": 1,
  "phrases": ["nie oddycha", "nieprzytomny i nie oddycha", "ktos nie oddycha", "brak oddechu"],
  "variant_words": {
    "child": ["dziecko", "dziecka", "syn", "corka"],
    "infant": ["niemowle", "niemowlak", "bobas", "noworodek"]
  },
  "panels": [
    {
      "type": "steps", "title": "RKO", "read_aloud": true,
      "variants": [
        { "id": "adult", "label": "Dorosły", "items": [ { "text": "<tekst z wytycznych PRC/ERC 2025, s. X>", "source_id": "prc-2025-sX-f1" } ] },
        { "id": "child", "label": "Dziecko", "items": [ { "text": "<tekst z wytycznych PRC/ERC 2025, s. X>", "source_id": "prc-2025-sX-f2" } ] },
        { "id": "infant", "label": "Niemowlę", "items": [ { "text": "<tekst z wytycznych PRC/ERC 2025, s. X>", "source_id": "prc-2025-sX-f3" } ] }
      ]
    },
    {
      "type": "cpr", "source_id": "prc-2025-sX-f4",
      "rate_bpm": null, "rescuer_change_s": null,
      "variants": [
        { "id": "adult", "label": "Dorosły", "compressions": null, "breaths": null, "initial_breaths": null, "breath_phase_s": null },
        { "id": "child", "label": "Dziecko", "compressions": null, "breaths": null, "initial_breaths": null, "breath_phase_s": null },
        { "id": "infant", "label": "Niemowlę", "compressions": null, "breaths": null, "initial_breaths": null, "breath_phase_s": null }
      ],
      "voice": { "compress": "<komenda>", "breaths": "<komenda>", "aed": "<komenda>", "change": "<komenda>" },
      "aed_card_id": "aed"
    }
  ],
  "source_ids": ["prc-2025-sX-f1", "prc-2025-sX-f2", "prc-2025-sX-f3", "prc-2025-sX-f4"]
}
```

Fragment `unconscious.json` (po MVP) z przejściem do RKO:

```json
{ "type": "steps", "title": "Utrata przytomności", "read_aloud": true,
  "items": [
    { "text": "Sprawdź oddech: patrz, słuchaj, czuj do 10 s", "source_id": "prc-2025-sX-f5",
      "card_link": { "label": "Nie oddycha → RKO", "card_id": "rko" } },
    { "text": "<tekst z wytycznych PRC/ERC 2025, s. X>", "source_id": "prc-2025-sX-f6" }
  ] }
```

## Frazy ryzyka

`assets/phrases/risk.json`. Trafienie → aplikacja dodaje `call` na początku odpowiedzi ([reguła 2](../03-ekrany/szablony-czatu.md#reguły)). Dopasowanie **tylko do wiadomości użytkownika**, nigdy do znalezionych fragmentów ani do odpowiedzi modelu. Frazy kart ratunkowych nie muszą się tu powtarzać (karta i tak ma `call`).

```json
{
  "type": "object",
  "required": ["version", "phrases"],
  "properties": {
    "version": { "type": "integer" },
    "phrases": { "type": "array", "minItems": 1, "items": { "type": "string" } }
  }
}
```

```json
{ "version": 1, "phrases": ["pozar", "gaz", "wypadek", "powodz", "krwawi", "nieprzytomny"] }
```

## Intencje

`assets/intents.json`. Pytania, na które odpowiedź jest szablonem narzędzia, a nie treścią źródła. Krok przepływu po kartach ratunkowych, przed wyszukiwaniem ([przepływ czatu](../03-ekrany/ekran-1-czat.md#przepływ-po-wysłaniu-wiadomości)). Trafienie → wiadomość `origin: rules` z polem `intent` i szablonami z pliku, **bez modelu i bez progu wyszukiwania**. Gdy najbliższy punkt jest niepotwierdzony, `map` pokazuje też najbliższy potwierdzony.

```json
{
  "type": "object",
  "required": ["version", "intents"],
  "properties": {
    "version": { "type": "integer" },
    "intents": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "phrases", "panels"],
        "properties": {
          "id": { "type": "string" },
          "phrases": { "type": "array", "minItems": 1, "items": { "type": "string" } },
          "panels": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["type"],
              "properties": {
                "type": { "enum": ["map", "call", "signal"] },
                "target": { "enum": ["nearest_shelter", "nearest_hospital", "nearest_fire_station", "nearest_water", "nearest_pharmacy"] }
              }
            }
          }
        }
      }
    }
  }
}
```

```json
{
  "version": 1,
  "intents": [
    { "id": "shelter", "phrases": ["schron", "gdzie isc", "gdzie sie ukryc", "ukrycie"], "panels": [ { "type": "map", "target": "nearest_shelter" } ] },
    { "id": "hospital", "phrases": ["szpital", "sor", "izba przyjec"], "panels": [ { "type": "map", "target": "nearest_hospital" } ] },
    { "id": "water", "phrases": ["woda pitna", "gdzie woda", "studnia"], "panels": [ { "type": "map", "target": "nearest_water" } ] }
  ]
}
```

W MVP baza punktów ma tylko schrony, więc `hospital` i `water` pokazują stan „Brak takich punktów w pobranych danych mapy.” do czasu kolejnych warstw.

## Reguły planu 72 h

`assets/plan_rules.json`. **Po MVP** (w MVP pytania o plan idą zwykłą ścieżką AI ze źródeł). Zachowanie: [plan 72 h](../02-funkcje/04-profil-i-plan/plan-72h.md). Reguła łączy scenariusz i warunek na polach [profilu](../03-ekrany/ekran-4-profil.md) z fragmentem źródła. Tekst punktu jest dosłownym wyciągiem; uzasadnienie (`because`) dokleja aplikacja, więc walidator go nie sprawdza.

```json
{
  "type": "object",
  "required": ["version", "scenarios", "rules"],
  "properties": {
    "version": { "type": "integer" },
    "scenarios": {
      "type": "object",
      "description": "scenariusz → frazy w wiadomości, które go wybierają",
      "propertyNames": { "enum": ["blackout", "alarm", "ewakuacja", "powodz"] },
      "additionalProperties": { "type": "array", "items": { "type": "string" } }
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "scenarios", "section", "text", "source_id"],
        "properties": {
          "id": { "type": "string" },
          "scenarios": { "type": "array", "items": { "enum": ["blackout", "alarm", "ewakuacja", "powodz"] } },
          "when": {
            "type": "array",
            "description": "Wszystkie warunki muszą być spełnione (AND). Brak = zawsze",
            "items": {
              "type": "object",
              "required": ["field", "op"],
              "properties": {
                "field": { "type": "string", "description": "Ścieżka pola profilu, [] = którykolwiek element, np. medications[].needsFridge" },
                "op": { "enum": ["eq", "gte", "lte", "in", "exists"] },
                "value": {}
              }
            }
          },
          "section": { "enum": ["first_hour", "first_day", "days_2_3", "shortages"] },
          "text": { "type": "string" },
          "source_id": { "type": "string" },
          "because": { "type": "string", "description": "Np. „bo: lek w lodówce”" }
        }
      }
    }
  }
}
```

Warunek na polu z brakiem danych (`null`, sekcja `skipped`) jest niespełniony.

```json
{
  "version": 1,
  "scenarios": { "blackout": ["blackout", "brak pradu", "nie ma pradu"], "alarm": ["alarm", "syrena"], "ewakuacja": ["ewakuacja"], "powodz": ["powodz", "zalewa"] },
  "rules": [
    { "id": "blackout-fridge-med", "scenarios": ["blackout"],
      "when": [ { "field": "medications[].needsFridge", "op": "eq", "value": true } ],
      "section": "first_hour", "text": "<tekst z Poradnika bezpieczeństwa, s. X>", "source_id": "poradnik-2025-sX-f1",
      "because": "bo: lek w lodówce" }
  ]
}
```

## Baza wiedzy

`kb.sqlite`, budowana na komputerze jedną komendą ([przygotowanie bazy](zrodla-wiedzy.md#przygotowanie-bazy)). **MVP**, kolumna `rects` po MVP (wypełniana razem z oknem PDF). `chunks.id` to `source_id` w formacie `{dokument}-{rok}-s{strona}-f{nr}` ([rekord źródła](../03-ekrany/szablony-czatu.md#rekord-źródła)).

```sql
CREATE TABLE documents (
  doc_id     TEXT PRIMARY KEY,
  title      TEXT NOT NULL,          -- doc_title
  short      TEXT NOT NULL,          -- doc_short, do chipu
  publisher  TEXT NOT NULL,
  issued     TEXT NOT NULL,          -- '2025' albo '2025-03'
  pdf_file   TEXT NOT NULL,          -- ścieżka w paczce bazy
  pdf_sha256 TEXT NOT NULL
);

CREATE TABLE chunks (
  id         TEXT PRIMARY KEY,       -- source_id
  doc_id     TEXT NOT NULL REFERENCES documents(doc_id),
  page_label TEXT NOT NULL,          -- numer strony w druku
  pdf_page   INTEGER NOT NULL,       -- strona w pliku, od 1
  chapter    TEXT,
  text       TEXT NOT NULL,
  text_norm  TEXT NOT NULL,          -- normalize(chapter + ' ' + text), patrz niżej
  rects      TEXT                    -- po MVP: JSON [[x,y,w,h],...], ułamki 0–1
);

CREATE VIRTUAL TABLE chunks_fts USING fts5(
  text_norm,
  content = 'chunks', content_rowid = 'rowid',
  tokenize = 'unicode61 remove_diacritics 2'
);

CREATE TABLE synonyms (
  term    TEXT NOT NULL,             -- znormalizowane
  synonym TEXT NOT NULL,             -- znormalizowane
  PRIMARY KEY (term, synonym)
);

CREATE TABLE meta (
  key   TEXT PRIMARY KEY,            -- 'version', 'issued', 'test_result'
  value TEXT NOT NULL                -- np. '3', '2026-11-21', '15/15 odmów, 47/50 cytatów'
);
```

- **`ł` trzeba zamienić samemu:** `remove_diacritics 2` nie zamienia `ł` na `l` (sprawdzone na SQLite 3.46: „łódź” nie pasuje do `lodz`). Dlatego indeksujemy `text_norm` z tej samej funkcji normalizacji co frazy (małe litery, `ł → l`, bez polskich znaków), a zapytanie przechodzi przez nią przed FTS.
- Zapytanie: słowa pytania po normalizacji, rozszerzone o `synonyms`, obcięte do rdzenia z `*` (prefiks), ranking `bm25(chunks_fts)`. Próg: [lokalne AI](../05-technologia/lokalne-ai.md#wyszukiwanie).
- `meta.test_result` wpisuje skrypt zestawu testowego; pokazuje go „O aplikacji”.
- Słowa z dziedziny do wyboru odmowy ([odmowa](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md#odmowa)): `synonyms.term`, `synonyms.synonym` i frazy z plików wyżej.

Przykład wiersza `chunks`:

```json
{ "id": "poradnik-2025-s14-f3", "doc_id": "poradnik-2025", "page_label": "14", "pdf_page": 16, "chapter": "<rozdział>", "text": "<tekst fragmentu z PDF>", "rects": null }
```

## Baza punktów

`points.sqlite`, budowana skryptem z OSM i danych instytucji ([dane mapy](dane-mapy.md)). **MVP** dla rodzajów schronienia; pozostałe rodzaje po MVP w tym samym schemacie. Jedyny schemat punktu w specyfikacji: pola `point` w `map` i na Mapie mają te same nazwy.

```sql
CREATE TABLE points (
  id           INTEGER PRIMARY KEY,
  kind         TEXT NOT NULL CHECK (kind IN (
                 'shelter', 'hiding_place', 'emergency_shelter', 'hospital',
                 'fire_station', 'water', 'pharmacy', 'aed')),
  name         TEXT,
  address      TEXT,
  lat          REAL NOT NULL,
  lon          REAL NOT NULL,
  availability TEXT,                 -- tekst ze źródła; NULL = „Dostępność: brak danych”
  open_24h     INTEGER CHECK (open_24h IN (0, 1)),   -- NULL = brak danych
  source       TEXT NOT NULL,        -- np. 'KG PSP', 'OpenStreetMap'
  verified_at  TEXT NOT NULL,        -- data ISO 8601; dla OSM data wyciągu
  confirmed    INTEGER NOT NULL CHECK (confirmed IN (0, 1))  -- 1 tylko dane instytucji publicznych
);

CREATE VIRTUAL TABLE points_rtree USING rtree(id, min_lat, max_lat, min_lon, max_lon);
-- punkt: min = max; id = points.id
```

- Najbliższe: prostokąt wokół pozycji z `points_rtree`, potem odległość po wielkim okręgu w Dart, sortowanie, rozszerzenie prostokąta, gdy wyników za mało.
- `map.target` → `kind`: `nearest_shelter` → `shelter`, `hiding_place`, `emergency_shelter`; `nearest_hospital` → `hospital`; `nearest_fire_station` → `fire_station`; `nearest_water` → `water`; `nearest_pharmacy` → `pharmacy`. `aed` po MVP, bez celu `map`.
- Obiekt OSM `building=bunker` ma `kind = 'shelter'`, `confirmed = 0` (symbol „s?”, [Ekran 2](../03-ekrany/ekran-2-mapa.md)).

Przykład wiersza:

```json
{ "id": 1, "kind": "shelter", "name": "<nazwa ze źródła>", "address": "<adres>", "lat": 53.43, "lon": 14.55, "availability": null, "open_24h": null, "source": "KG PSP", "verified_at": "2026-03-01", "confirmed": 1 }
```
