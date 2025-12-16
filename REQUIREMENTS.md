
## Yleiskuvaus

React Native ja Expo Go -pohjainen mobiilisovellus tehtävien hallintaan. Sovelluksessa on kirjautuminen, HTTP-palvelin integraatio, kameran käyttö ja responsiivinen käyttöliittymä.

## Vaatimukset

### 1. Autentikointi ja käyttäjähallinta
- REQ-1: Kirjautuminen käyttäjänimellä ja salasanalla
- REQ-2: Autentikointi-tiedot AsyncStorageen
- REQ-3: Uloskirjautuminen
- REQ-4: Automaattinen uudelleenkirjautuminen

### 2. Tehtävien hallinta
- REQ-5: Tehtävien lisääminen (nimi, kuvaus, kuva)
- REQ-6: Tehtävien merkitseminen tehdyksi/tekemättömäksi
- REQ-7: Tehtävien poistaminen
- REQ-8: Yksittäisen tehtävän tarkastelu detail-näytössä
- REQ-9: HTTP-palvelin integraatio (GET, POST, PUT, DELETE)

### 3. Kameran käyttö
- REQ-10: Kuvan ottaminen kameralla
- REQ-11: Kuvan valinta galleriasta
- REQ-12: Kuvien näyttäminen listassa ja detail-näytössä

### 4. Navigaatio
- REQ-13: Expo Router -navigaatio
- REQ-14: Vähintään 3 näyttöä (Login, Home, Add, Profile, Detail)
- REQ-15: Tab-navigaatio
- REQ-16: Route-parametrit detail-näytössä

### 5. Käyttöliittymä
- REQ-17: Responsiivinen UI (puhelin/tabletti)
- REQ-18: Teema-pohjaiset tyylit
- REQ-19: Keskitetyt tyylit (globalStyles)
- REQ-20: Platform-erot iOS/Android
- REQ-21: FlatList listaukseen

### 6. Tietojen synkronointi
- REQ-22: HTTP GET -pyyntö
- REQ-23: HTTP POST -pyyntö
- REQ-24: HTTP PUT -pyyntö
- REQ-25: HTTP DELETE -pyyntö
- REQ-26: React Context state-hallintaan

### 7. Komponentit ja rakenne
- REQ-27: Yli 2 custom-komponenttia (TodoItem, TodoCard, CustomButton, CustomInput, ImagePicker, LoadingSpinner)
- REQ-28: Hyvä koodirakenne (komponentit/services/context/styles)
- REQ-29: Image-komponentit käytössä

### 8. Julkaiseminen
- REQ-30: Julkaisemiseen valmisteltu (app.json)
- REQ-31: Ikonit ja splash screen konfiguroitu

## Tekniset vaatimukset

- React Native 0.81.5
- Expo SDK 54
- Expo Router, AsyncStorage, JSON Server, Expo Image Picker

