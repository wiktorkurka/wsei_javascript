# Operacje asynchroniczne

Załóżmy że wykonanie określonej operacji na dwóch argumentach (np. dodawania liczb całkowitych) zajmuje pewien czas i musi zostać wykonane asynchronicznie.
Funkcja wykonująca zadaną operację zwraca Promise.

Asynchroniczna funkcja dodająca:  
```Javascript
const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}
```

### Zadanie
1. Napisz funkcję która pobiera dowolną ilość argumentów (liczby całkowite) i następnie korzysta z asyncAdd() by je dodać. - <b>Done</b>
1. Napisz funkcję mierzącą czas wykonania kodu. - <b>Done</b>
1. Zmierz działanie funkcji dodającej dla zbiorów danych o wielkości 100 elementów. Wyświetl czas wykonania oraz ilość operacji asynchronicznych. - <b>Done</b>
1. Zoptymalizuj działanie swojej funkcji pod kątem czasu wykonania  - <b>Done</b>

### Przydamisię
Mierzenie czasu wykonywania skryptu: performance.now() lub performance.mark(name) + performance.measure(name, startMark, endMark)