# To-Do Sovellus

React Native ja Expo Go -sovellus tehtävien hallintaan.

## Ominaisuudet

- ✅ Lisää uusia tehtäviä
- ✅ Merkitse tehtävät tehdyiksi
- ✅ Poista tehtäviä
- ✅ Paikallinen tallennus AsyncStoragessa
- ✅ Moderni ja käyttäjäystävällinen käyttöliittymä

## Asennus

1. Asenna riippuvuudet:
```bash
npm install
```

## Käyttö

1. Käynnistä Expo-kehityspalvelin:
```bash
npm start
```

**Tunnel-tila** (jos puhelin ja tietokone ovat eri verkossa):
```bash
npm run start:tunnel
```

2. Asenna Expo Go -sovellus puhelimeesi:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

3. Skannaa QR-koodi Expo Go -sovelluksella tai avaa projekti Expo Go -sovelluksessa.

## Teknologiat

- React Native
- Expo Go
- AsyncStorage (paikallinen tallennus)

## Kehitys

Sovellus tallentaa kaikki tehtävät paikallisesti AsyncStorage-muistiin. Tehtävät säilyvät, vaikka sovellus suljettaisiin ja avattaisiin uudelleen.

