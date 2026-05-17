# 0001: Single-image → voxel pipeline

Datum: 2026-05-17
Stav: navržené rozhodnutí (prototyp)

Problém
--------
Potřebujeme spolehlivou a re-producibilní pipeline, která z jediné 2D fotografie vygeneruje objemovou reprezentaci vhodnou pro zobrazovací hardware (voxelový/vrstevnatý displej) a pro interaktivní procházení.

Rozhodnutí
----------
Použít hybridní softwarovou pipeline:

1. Depth estimation: použít state-of-the-art single-image depth model (např. MiDaS nebo ekvivalent), abychom získali per-pixel depth mapu.
2. Semantic segmentation: detekce hlavních objektů (osoba, stromy, budovy), aby bylo možné zachovat ostré hrany při vrstvení.
3. Layering & inpainting: rozdělíme scénu do N vrstev podle depth mapy + semantických hranic. Pro každou vrstvu provedeme inpainting/extrapolaci na místech, kde bude odhalen nový obsah během pohybu kamery (diffusion-based inpainting, případně finetuneované modely).
4. Volumetric reconstruction: z vrstev vygenerujeme hustý nebo sparse voxel grid. Pro realistické osvětlení a pohledové změny použijeme NeRF nebo gaussian splatting pro úseky, kde jsou k dispozici více-záběrová data; pro single-view bude výstup approximovaný voxel grid.
5. Export & rendering mapování: připravíme exportní formát (např. compressed sparse voxel octree nebo 3D texture set) kompatibilní s cílovým zobrazovacím subsystémem.

Důsledky
--------
- Pipeline je robustní pro single-image vstup, ale bude trpět nejistotou v přetváření skrytých ploch. To vyžaduje agresivní inpainting a případně uživatelské nástroje pro manuální opravy.
- Výkon: NeRF a gaussian splatting jsou výpočetně náročné — pro real-time je potřeba konverze do render-friendly voxel/textures.

Alternativy, které jsme zvážili
--------------------------------
- Přímo trénovaný single-view NeRF: vysoce kvalitní výsledky, ale typicky vyžaduje více záběrů a trénink.
- Kompletní reliance na diffusion-only generaci scény: může vést k nekonzistentním geometriím.

Závěr
-----
Pro první fázi prototypu použijeme kombinaci MiDaS → layerovat → diffusion-inpaint → voxelize. V pozdějších fázích doplníme NeRF/gaussian splatting a optimalizace pro reálný hardware.
