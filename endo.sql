-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Mar 2021, 19:17
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `endo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `aktywnosc`
--

CREATE TABLE `aktywnosc` (
  `ID` int(11) NOT NULL,
  `uczen_ID` int(11) DEFAULT NULL,
  `data_wprowadzenia` datetime NOT NULL DEFAULT current_timestamp(),
  `typ_ID` int(11) DEFAULT NULL,
  `wynik` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `aktywnosc`
--

INSERT INTO `aktywnosc` (`ID`, `uczen_ID`, `data_wprowadzenia`, `typ_ID`, `wynik`) VALUES
(67, 29, '2021-02-26 18:05:56', 4, 25),
(73, 1, '2021-02-26 18:37:04', 2, 45),
(76, 1, '2021-02-26 18:38:30', 2, 12),
(127, 29, '2021-02-27 23:04:29', 2, 15),
(128, 29, '2021-02-27 23:05:01', 4, 15),
(150, 1, '2021-02-28 15:09:47', 6, 70),
(153, 29, '2021-03-04 08:29:10', 4, 10),
(155, 29, '2021-03-11 18:08:47', 2, 12),
(161, 29, '2021-03-11 18:08:54', 1, 26);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `aktywnosc_typ`
--

CREATE TABLE `aktywnosc_typ` (
  `ID` int(11) NOT NULL,
  `nazwa` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `aktywnosc_typ`
--

INSERT INTO `aktywnosc_typ` (`ID`, `nazwa`) VALUES
(1, 'Bieganie'),
(2, 'Jazda na rowerze'),
(3, 'Spacer'),
(4, 'Przysiady'),
(5, 'Pompki'),
(6, 'Orbitrek'),
(7, 'Pływanie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `klasy`
--

CREATE TABLE `klasy` (
  `ID` int(11) NOT NULL,
  `nazwa` varchar(64) DEFAULT NULL,
  `nauczyciel_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `klasy`
--

INSERT INTO `klasy` (`ID`, `nazwa`, `nauczyciel_ID`) VALUES
(1, '4tc', 1),
(2, '4ta', 1),
(3, '4tb', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `nauczyciele`
--

CREATE TABLE `nauczyciele` (
  `ID` int(11) NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `imie` varchar(64) DEFAULT NULL,
  `nazwisko` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `nauczyciele`
--

INSERT INTO `nauczyciele` (`ID`, `user_ID`, `imie`, `nazwisko`) VALUES
(1, 1, 'Daniel', 'D');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `userName` varchar(32) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL,
  `imie` varchar(32) DEFAULT NULL,
  `nazwisko` varchar(32) DEFAULT NULL,
  `klasa_id` int(11) DEFAULT NULL,
  `teacher` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`ID`, `userName`, `passwd`, `imie`, `nazwisko`, `klasa_id`, `teacher`) VALUES
(1, 'admin', 'qazwsx', 'Piotr', 'K', 1, 1),
(2, 'grzes', 'qazwsx', 'Grzegorz', 'Brzecz', 2, 0),
(4, 'bartek', 'qazwsx', 'Bartosz', 'Wiacek', 3, 0),
(29, 'kamil', 'qazwsx', 'Kamil', 'Kowalski', 1, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `aktywnosc`
--
ALTER TABLE `aktywnosc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `uczen_ID` (`uczen_ID`),
  ADD KEY `typ_ID` (`typ_ID`);

--
-- Indeksy dla tabeli `aktywnosc_typ`
--
ALTER TABLE `aktywnosc_typ`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- Indeksy dla tabeli `klasy`
--
ALTER TABLE `klasy`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- Indeksy dla tabeli `nauczyciele`
--
ALTER TABLE `nauczyciele`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `aktywnosc`
--
ALTER TABLE `aktywnosc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT dla tabeli `nauczyciele`
--
ALTER TABLE `nauczyciele`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `aktywnosc`
--
ALTER TABLE `aktywnosc`
  ADD CONSTRAINT `aktywnosc_ibfk_1` FOREIGN KEY (`uczen_ID`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `aktywnosc_ibfk_2` FOREIGN KEY (`typ_ID`) REFERENCES `aktywnosc_typ` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
