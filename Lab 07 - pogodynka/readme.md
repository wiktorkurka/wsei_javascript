## Pogodynka

### Wersja Śledzik: 
1. Aplikacja prezentuje pogodę z różnych miejsc na świecie (temp, wilgotność, odpowiednia grafika względem pogody  np. chmurka, słoneczko, deszcz, śnieg etc). 
1. Wskazane przez użytkownika miejsca (nazwy miejscowości) powinny byc zapamiętane (localStorage), pogoda pobierana na nowo przy każdym wejściu do aplikacji.
1. Można dodawać/usuwać do dziesięciu miejsc.

### Wersja Karpik:
1. Automatyczna aktualizacja pogody co 5min. 
1. Wyniki zapisywane w cache (localStorage). 
1. Przy odświeżeniu strony wyniki wczytywane z cache, następnie aktualizowane z api.


### Wersja "Last christmas I gave you...": 
1. Wykres pogody godzinowej (np. najblizsze 12 godzin) dla wybranej przez użytkownika lokalizacji.
1. Podawanie miast z autouzupełnianiem z api.


### Przydamisie:
Komunikacja z zewnętrznymi api: fetch api, promises   
Do pobrania danych pogodowych mozesz wykorzystac serwis openweathermap  
ikony:  [openweathermap](https://openweathermap.org/weather-conditions)
Przykładowe Api miast: [geodb-cities-api.wirefreethought.com](http://geodb-cities-api.wirefreethought.com/demo), [openweathermap.org](https://openweathermap.org/)   
Wykresy: [Chart.js](https://www.chartjs.org/), [D3.js](https://d3js.org/)