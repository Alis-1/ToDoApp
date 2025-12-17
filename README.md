# To-Do Sovellus

React Native ja Expo Go -sovellus tehtävien hallintaan. Toteutettu Advanced Application Development -kurssin ryhmätyönä.

## Ominaisuudet

Sovelluksessa on seuraavat toiminnot:
- Autentikointi ja käyttäjähallinta
- Tehtävien lisääminen, muokkaaminen ja poistaminen
- Tehtävien merkitseminen tehdyiksi
- HTTP-pohjainen tietojen synkronointi (GET, POST, PUT, DELETE)
- Kameran käyttö tehtävien kuville
- Responsiivinen käyttöliittymä joka toimii puhelimella ja tabletilla
- Expo Router -navigaatio viidellä näytöllä
- React Context app-wide state-hallintaan
- Teema-pohjaiset tyylit
- Platform-erot iOS/Android välillä käsitelty

## Asennus

Ensin pitää asentaa riippuvuudet:
```bash
npm install
```

## Käyttö

### 1. Käynnistä mock-palvelin

Avaa erillinen terminaali ja käynnistä mock-palvelin:
```bash
npm run mock-server
```

Mock-palvelin käynnistyy osoitteeseen http://localhost:3000

### 2. Käynnistä sovellus

**Web-versio (selaimessa):**
```bash
npm run web
```
Sovellus avautuu automaattisesti selaimessa osoitteessa http://localhost:8081

**Puhelinversio:**
```bash
npm start
```

Jos puhelin ja tietokone ovat eri verkossa, käytä tunnel-tilaa:
```bash
npm run start:tunnel
```

### 3. Avaa sovellus puhelimella (vain puhelinversio)

Asenna Expo Go -sovellus puhelimeesi jos et ole vielä asentanut:
- iOS: App Storesta
- Android: Google Playsta

Avaa Expo Go ja skannaa QR-koodi joka näkyy terminaalissa.

### 4. Kirjaudu sisään

Käytä testikäyttäjää:
- Käyttäjänimi: testuser
- Salasana: test123

**Huom:** Web-versiossa kameran käyttö ei toimi, mutta voit valita kuvia tiedostosta.

## Projektirakenne

Projektin rakenne on seuraava:
- app/ - Expo Router näytöt (login, home, add, profile, detail)
- components/ - Custom-komponentit
- context/ - React Contextit (AuthContext, TodoContext)
- services/ - API-palvelut ja storage
- styles/ - Tyylit ja teemat
- utils/ - Apufunktiot
- mock-server/ - JSON Server mock-palvelin

## Teknologiat

Käytimme seuraavia teknologioita:
- React Native versio 0.81.5
- Expo SDK 54
- Expo Router navigaatiossa
- React Context state-hallintaan
- Axios HTTP-pyyntöihin
- JSON Server mock-palvelimena
- AsyncStorage paikalliseen tallennukseen
- Expo Image Picker kameran käyttöön

## Dokumentaatio

Lisätietoja löytyy seuraavista tiedostoista:
- REQUIREMENTS.md - Vaatimusdokumentti

## Huomioita

Sovellus käyttää HTTP-palvelinta tehtävien synkronointiin. Mock-palvelin (JSON Server) täytyy olla käynnissä koko ajan kun käytät sovellusta. Autentikointi-tiedot tallennetaan AsyncStorageen joten ne säilyvät sovelluksen sulkemisen jälkeen.

