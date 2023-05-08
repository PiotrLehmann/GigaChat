# Laboratorium - React Native

## Zadanie 1

## Interfejs graficzny

### 1. Otwórz w przeglądarce wybrany emulator, aby móc swobodnie i bez pobierania dodatkowych plików wykonać zadanie

- **zalecany** *** https://snack.expo.dev/@native-base/nativebase-playground?platform=web ***
- **opcjonalny** *** https://codesandbox.io/s/nativebase-fld24?file=/src/App.tsx&resolutionWidth=320&resolutionHeight=675 ***

### 2. Skopiuj kod z pliku _template.js_ i wklej go do pliku _App.js_ / _App.tsx_ .

- zwróć uwagę w oknie z prawej striny gdzie znajduję się podgląd na żywo, czy wszytsko działa poprawnie
  zgodnie ze wzorem na zdjęciu *task_1_template.jpg* .

### 3. Na podstawie pliku _exampleUI.jpg_ stwórz w **React Native** panel do rejestracji użytkownika.

- skorzystaj z biblioteki Native Base. Importy potrzebnych komponentów już są w kodzie.
- wykorzystaj podane hook'i aby zaapisywać wartości w konkretntch polach (przyda się do *Zadania 2* ).
- pomocna może okazać się dokumentacja *Native Base* **https://docs.nativebase.io**
- aby wyświetlić konsolę przydatną do debugowania na dolnym pasku narzędi:
  *Editor -> Panel [toggle ON]*

## Zadanie 2

## Funkcjonalność

### 1. Dodaj opcję przełączania widoku hasła.

- ponownie bardzo przydatna może okazać się dokumentacja *Native Base*

### 2. Zweryfikuj czy dane zostały wprowadzone.

- upewnij się, że po kliknięciu guzika zanim formularz zostanie wysłany wszystkie pola zostały wypełnione.
- sprawdź czy hasła wprowadzone w obu polach są identyczne.
- *dla chętnych* zweryfikuj czy adres email został poprawnie wprowaszony używając np. Reg Exp

### 3. Wyślij dane do bazy.

- teraz kiedy wiemy, że formularz został poprawnie utworzony wyślij go do bazy danych.
- możesz użyć wbudowanej funkcji *fetch()*
- metodą POST zarejestruj się do bazy na endpoincie: ***https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user*** .
- pamiętaj, że dane wysyłane są w postaci *JSONa*
- w związku z tym zadbaj o nagłówek oraz ciało, i jego strukturę. *UWAGA* prześlij dane w kolejności: **name, email, password, pic**
  zauważ, że **pic** nigdzie nie jest używane, dodaj je na końcu i nie zwracaj uwagi. To jeszcze niedokończona funkcjonalność...
- pamiętaj, że możesz sprawdzić czy wysłałeś poprawnie dane funkcją **then()**
- całą komunikację z bazą umieść w bloku try-catch w celu złapania błędów w razie niepowodzenia.
- przydatny link pokazujący użycie *fetch()* : ***https://reactnative.dev/docs/network?language=typescript***
- po wysłaniu swoich danych zgłoś się abyśmy mogli to zweryfikować

### Pamiętaj, że w razie porblemów cały czas możesz spytać o pomoc!

# Dziękujemy za udział w demonstancji.
    Mateusz Warzecha, Piotr Lehmann, Bartłomiej Czech
