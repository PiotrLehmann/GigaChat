# Laboratorium - React Native
    Mateusz Warzecha, Piotr Lehmann, Bartłomiej Czech

# Zadanie 1
## Interfejs graficzny

### 1. Otwórz w przeglądarce wybrany emulator, aby móc swobodnie i bez pobierania dodatkowych plików wykonać zadanie

- **zalecany**      ***https://snack.expo.dev/@native-base/nativebase-playground?platform=web***
- **opcjonalny**    ***https://codesandbox.io/s/nativebase-fld24?file=/src/App.tsx&resolutionWidth=320&resolutionHeight=675***

### 2. Przygotowanie środowiska
- Skopiuj kod z pliku [_template.js_](https://github.com/BartCzech/GIGACHAT/blob/Mati/tasks/template.js) i wklej go do pliku _App.js_ / _App.tsx_ na stronie.
- zwróć uwagę w oknie z prawej strony gdzie znajduje się podgląd na żywo, czy wszystko działa poprawnie,
  zgodnie ze wzorem na zdjęciu [*task_1_template.jpg*](https://github.com/BartCzech/GIGACHAT/blob/Mati/tasks/task_1_template.jpg) .
- aby wyświetlić konsolę przydatną do debugowania na dolnym pasku narzędzi wybierz:
  *Editor -> Panel [toggle ON]*

### 3. Tworzenie panelu rejestracji
- Na podstawie pliku [_exampleUI.jpg_](https://github.com/BartCzech/GIGACHAT/blob/Mati/tasks/exampleUI.jpg) stwórz w **React Native** panel do rejestracji użytkownika.
- skorzystaj z biblioteki Native Base. Importy potrzebnych komponentów już są w kodzie.
- wykorzystaj podane hooki aby zaapisywać wartości w konkretnych polach (przyda się do *Zadania 2* ).
- pomocna może okazać się dokumentacja *Native Base*: **https://docs.nativebase.io**


# Zadanie 2
## Funkcjonalność

### 1. Dodaj opcję przełączania widoku hasła.
- użyj przygotowanego do tego hooka
- ponownie bardzo przydatna może okazać się dokumentacja *Native Base*

### 2. Zweryfikuj czy dane zostały wprowadzone.

- upewnij się, że po kliknięciu guzika zanim formularz zostanie wysłany wszystkie pola zostały wypełnione.
- sprawdź, czy hasła wprowadzone w obu polach są identyczne.
- zweryfikuj czy adres email został poprawnie wprowadzony używając np. Reg Exp

### 3. Wyślij dane do bazy.

- teraz, kiedy wiemy, że formularz został poprawnie utworzony, wyślij go do bazy danych.
- możesz użyć wbudowanej funkcji *fetch()*
- metodą **POST** zarejestruj się do bazy na endpoincie: ***https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user*** .
- pamiętaj, że dane wysyłane są w postaci *JSONa*
- w związku z tym zadbaj o nagłówek oraz ciało, i jego strukturę. *UWAGA* prześlij dane w kolejności: **name, email, password**
- pamiętaj, że możesz sprawdzić czy wysłałeś poprawnie dane funkcją **then()**
- całą komunikację z bazą umieść w bloku try-catch w celu złapania błędów w razie niepowodzenia.
- przydatny link pokazujący użycie *fetch()* : ***https://reactnative.dev/docs/network?language=typescript***
- po wysłaniu swoich danych zgłoś się, abyśmy mogli to zweryfikować.

### Pamiętaj, że w razie problemów cały czas możesz spytać o pomoc!

# Zadanie 3
## Logowanie

### 1. Utwórz w nowym pliku/oknie panel logowania
- panel powinien zawierać dwa inputy: na email, oraz hasło
- ponownie zanim formularz zostanie wysłany zweryfikuj czy jego zawartość jest sensowna: czy email ma odpowiednią formę oraz, czy oba pola są wypełnione.

### 2. Zaloguj się
- zaloguj się na utworzone wcześniej konto.
- użyj metody **POST** na endpoincie: ***https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user/login***.
- potwierdź zalogowanie odpowiednim logiem korzystając z funkcji **then()**

# Dziękujemy za udział w demonstracji.

