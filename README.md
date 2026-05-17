VÝHRADNÁ PRÁVA / Proprietární oznámení

COPYRIGHT (c) 2026 Alan Lukačovič — Palanisko11@gmail.com
Všechna práva vyhrazena.

Poznámka: Tento repozitář byl dříve částečně publikován pod otevřenou licencí (MIT) v historii commitů. Smazáním nebo úpravou souboru LICENSE v aktuální větvi se existující historie nezmění; pokud chcete kompletně odstranit staré licence z historie, je nutné provést přepis historie (git filter-repo / BFG) s force‑push — k tomu potřebuji vaše explicitní potvrzení.

---

# DepthPortal — Průhledný 3D monitor s nekonečnou hloubkou

Projekt DepthPortal je koncept a výzkumný záměr vytvořit „průhledný monitor“ s výraznou fyzickou hloubkou, do kterého lze vstoupit — obraz z jedné 2D fotografie se extrapoluje do plně prožitkového 3D prostoru.

## Stručný přehled

- Cíl: Přeměnit 2D snímky na průchozí 3D světy uložené ve vrstveném/voxelovém displeji o „hloubce 1000 pixelů".
- Hlavní přínos: monitor přestává být pouze oknem na obsah — stává se portálem, do kterého lze vstoupit.

## Klíčové komponenty

1) Hardware — "Průhledný monitor s hloubkou"
- Voxelový volumetrický displej implementovaný jedním z přístupů:
  - holografické body v médiu (lasery / plasmy),
  - stovky tenkých průhledných OLED/MicroLED vrstev,
  - nebo „smart fog" (roj mikronových světelných agentů).
- Hlavní výzvy: rozlišení, bezpečnost, schopnost „průchodu" pro uživatele.

2) Rozhraní pro „průchod"
- Dočasné praktické řešení: CAVE/XR pohlcení — když uživatel „vstoupí", okolní prostor se přepne a vytvoří iluzi průchodu.
- Dlouhodobé fantasie: taktilní pole, nanobotová mlha nebo jiné mechanické/energetické řešení, které umožní fyzický průchod.

3) Software — z 2D na 3D (navrstvení)
- Odhad hloubky: modely typu MiDaS pro depth mapy z jediné fotky.
- Segmentace a vrstvení: rozdělení do plošných vrstev podle hloubky a semanticity.
- Extrapolace/inpainting: generativní modely (SD, inpainting, DALL·E) pro „dopsání" chybějících zadních ploch.
- 3D rekonstrukce: NeRF/gaussian splatting pro tvorbu volumetrických reprezentací; následná rasterizace nebo konverze do voxelů.

## Fáze uživatelského zážitku

1. Vstup (Input): Uživatelská 2D fotografie.
2. Zpracování (Processing): Analytická hloubková a semantická segmentace.
3. Hluboké mapování (Deep Mapping): Generování interní 3D reprezentace (voxel grid / NeRF).
4. Zrození světa (World Generation): Doplnění zvuků, pohybů, dynamických efektů.
5. Průchod (The Crossing): Plynulý přechod mezi pozorováním a vstupem do scény (XR / CAVE / smart fog).

## Roadmapa (návrh)

Krátkodobě (0–12 měsíců)
- Prototyp softwarové pipeline: z 1 fotky → depth map → vrstvy → základní voxelový export.
- Ukázka v prohlížeči / WebGL (interaktivní prohlížení několika vrstev).
- Dataset a benchmark: testovací sady fotografií a metriky kvality extrapolace.

Střednědobě (1–3 roky)
- Integrace NeRF/gaussian splatting pro realistické objemové scény.
- Přidání inpaintingu založeného na diffusion modelech pro konzistenci textur.
- Prototyp s vícevrstvým průhledným panelem (laboratorní setup) nebo CAVE-emulace.

Dlouhodobě (3+ roky)
- Průzkum hardwarových řešení (microLED stack, bezpečné vzdušné projekce, smart-fog).
- Vývoj rozhraní pro bezpečný „průchod" a multisenzorickou synchronizaci (audio, haptika).

## Rizika a omezení
- Hardware: realistické, bezpečné a škálovatelné řešení pro voxelový displej je hlavní překážkou.
- Data: z jedné fotky chybí informace o skrytých plochách; výsledky budou záviset na schopnosti AI plně extrapolovat konzistentně.
- UX/bezpečnost: simulace průchodu do skutečného prostoru má rizika (kolize, dezorientace).

## Jak přispět
- Otevřete issue s konkrétním návrhem (např. "pipeline: single-image -> depth -> voxel export").
- Navrhněte dataset a metriky kvality (PSNR pro depth, LPIPS pro textury, uživatelské hodnocení projevu realismu).
- Přidejte demo HTML/JS na vizualizaci vrstvení obrazu ve WebGL.

Navržené počáteční issue šablony:
- "feature: implement depth estimation (MiDaS) and test on dataset X"
- "research: NeRF vs gaussian splatting benchmarks for single-view reproduction"
- "doc: add contribution guide and coding standards"

## Licencování
Tento repozitář a jeho budoucí změny jsou odkomentovány jako proprietární — kontakt pro komerční licence: Palanisko11@gmail.com

## Poznámky
Tento README shrnuje koncept a navrhovanou pracovní cestu. Pokud chcete, mohu rovnou:
- vytvořit sadu issues a milestone pro první 3–6 měsíců práce,
- přidat jednoduché WebGL demo do adresáře `web/` nebo `demo/`,
- nebo napsat technický návrh (ADR) pro softwarovou pipeline.

---

Autor deklarován: Alan Lukačovič — Palanisko11@gmail.com
