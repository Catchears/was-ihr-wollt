---
title: Vorspielszene
alias: Vorspielszene
description: Finde eine Szene, in der bestimmte Figuren spielen.
---
Wähle bis zu drei Figuren, die in einer Szene vorkommen sollten:

<select name="Figur 1" class="custom-select" id="char-select-1">
    <option disabled selected value=0>Figur 1</option>
    <option value=2>1. Gerichtsdiener</option>
    <option value=3>2. Gerichtsdiener</option>
    <option value=4>Antonio</option>
    <option value=5>Bedienter</option>
    <option value=6>Curio</option>
    <option value=7>Fabio</option>
    <option value=8>Junker Christoph</option>
    <option value=9>Junker Tobias</option>
    <option value=10>Malvolio</option>
    <option value=11>Maria</option>
    <option value=12>Narr</option>
    <option value=13>Olivia</option>
    <option value=14>Orsino</option>
    <option value=15>Priester</option>
    <option value=16>Schiffshauptmann</option>
    <option value=17>Sebastian</option>
    <option value=18>Valentin</option>
    <option value=19>Viola</option>
</select>

<select name="Figur 2" class="custom-select" id="char-select-2">
    <option selected value=0>-</option>
    <option value=2>1. Gerichtsdiener</option>
    <option value=3>2. Gerichtsdiener</option>
    <option value=4>Antonio</option>
    <option value=5>Bedienter</option>
    <option value=6>Curio</option>
    <option value=7>Fabio</option>
    <option value=8>Junker Christoph</option>
    <option value=9>Junker Tobias</option>
    <option value=10>Malvolio</option>
    <option value=11>Maria</option>
    <option value=12>Narr</option>
    <option value=13>Olivia</option>
    <option value=14>Orsino</option>
    <option value=15>Priester</option>
    <option value=16>Schiffshauptmann</option>
    <option value=17>Sebastian</option>
    <option value=18>Valentin</option>
    <option value=19>Viola</option>
</select>

<select name="Figur 3" class="custom-select" id="char-select-3">
    <option selected value=0>-</option>
    <option value=2>1. Gerichtsdiener</option>
    <option value=3>2. Gerichtsdiener</option>
    <option value=4>Antonio</option>
    <option value=5>Bedienter</option>
    <option value=6>Curio</option>
    <option value=7>Fabio</option>
    <option value=8>Junker Christoph</option>
    <option value=9>Junker Tobias</option>
    <option value=10>Malvolio</option>
    <option value=11>Maria</option>
    <option value=12>Narr</option>
    <option value=13>Olivia</option>
    <option value=14>Orsino</option>
    <option value=15>Priester</option>
    <option value=16>Schiffshauptmann</option>
    <option value=17>Sebastian</option>
    <option value=18>Valentin</option>
    <option value=19>Viola</option>
</select><button type="submit" class="custom-button" id="character-search-button" onclick="buttonPressedCallback();">Suchen</button>

Jedes mal, wo eine Figur die Bühne betritt oder verlässt beginnt ein neuer Eintrag.

<div class="scrollable-element-list hidden" id="character-search-results"></div>

<p id="reload-warning">
Wenn der Knopf nicht funktioniert, lade bitte die Seite neu: <button class="custom-button" onClick="window.location.href=window.location.href">Neuladen</button>
</p>