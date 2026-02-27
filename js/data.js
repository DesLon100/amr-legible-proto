
(() => {
  const els = {
    btnLoad: document.getElementById("amr-load-csv"),
    inputCsv: document.getElementById("amr-csv-input"),
    status: document.getElementById("amr-dev-status"),

    artist: document.getElementById("amr-artist"),
    price: document.getElementById("amr-price"),
    list: document.getElementById("amr-artist-list"),
    form: document.getElementById("amr-form"),

    results: document.getElementById("amr-results"),
    outArtist: document.getElementById("amr-out-artist"),
    outPrice: document.getElementById("amr-out-price"),
    outRows: document.getElementById("amr-out-rows"),
  };

  let DATA_ROWS = [];

  // CSV parser (handles quoted commas)
  function parseCSV(text) {
    const rows = [];
    let i = 0, field = "", row = [], inQuotes = false;

    function pushField() { row.push(field); field = ""; }
    function pushRow() { rows.push(row); row = []; }

    while (i < text.length) {
      const ch = text[i];

      if (inQuotes) {
        if (ch === '"') {
          const next = text[i + 1];
          if (next === '"') { field += '"'; i += 2; continue; }
          inQuotes = false; i++; continue;
        }
        field += ch; i++; continue;
      }

      if (ch === '"') { inQuotes = true; i++; continue; }
      if (ch === ",") { pushField(); i++; continue; }
      if (ch === "\r") { i++; continue; }
      if (ch === "\n") { pushField(); pushRow(); i++; continue; }

      field += ch; i++;
    }

    if (field.length || row.length) { pushField(); pushRow(); }

    // Trim empty trailing lines
    while (rows.length && rows[rows.length - 1].every(v => String(v || "").trim() === "")) rows.pop();
    if (!rows.length) return [];

    const header = rows[0].map(h => String(h || "").trim());
    const data = rows.slice(1);

    const out = [];
    for (const r of data) {
      const obj = {};
      for (let c = 0; c < header.length; c++) obj[header[c]] = (r[c] ?? "").toString().trim();

      // Your expected columns
      const ArtistID = Number(obj.ArtistID);
      const ArtistName = obj.ArtistName || "";
      const MonthYYY = Number(obj.MonthYYY);
      const ValueGBP = Number(obj.ValueGBP);
      const LocationID = Number(obj.LocationID);
      const LocationCode = obj.LocationCode || "";
      const AuctionID = Number(obj.AuctionID);
      const LotNo = obj.LotNo || "";
      const SaleURL = obj.SaleURL || "";

      // Minimal validity gating
      if (!ArtistName) continue;
      if (!Number.isFinite(ValueGBP) || ValueGBP <= 0) continue;

      out.push({ ArtistID, ArtistName, MonthYYY, ValueGBP, LocationID, LocationCode, AuctionID, LotNo, SaleURL });
    }
    return out;
  }

  function uniqArtists(rows) {
    const set = new Set();
    for (const r of rows) set.add(r.ArtistName);
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  }

  function buildArtistDatalist(names) {
    els.list.innerHTML = "";
    // Keep it reasonable: datalist with 20k options can get sluggish.
    // For big sets, we’ll switch to a proper typeahead later.
    const MAX = 5000;
    const slice = names.slice(0, MAX);

    const frag = document.createDocumentFragment();
    for (const n of slice) {
      const opt = document.createElement("option");
      opt.value = n;
      frag.appendChild(opt);
    }
    els.list.appendChild(frag);

    const extra = names.length > MAX ? ` (showing first ${MAX})` : "";
    els.status.textContent = `Data loaded: ${rowsCount()} rows, ${names.length} artists${extra}`;
  }

  function rowsCount(){ return DATA_ROWS.length; }

  // UI events
  els.btnLoad?.addEventListener("click", () => els.inputCsv?.click());

  els.inputCsv?.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      els.status.textContent = `Reading ${file.name}…`;
      const text = await file.text();
      const rows = parseCSV(text);

      DATA_ROWS = rows;

      const names = uniqArtists(DATA_ROWS);
      buildArtistDatalist(names);

      els.outRows.textContent = String(DATA_ROWS.length);

      // Reset input so same file triggers again
      e.target.value = "";
    } catch (err) {
      console.error(err);
      els.status.textContent = "CSV load failed (see console).";
      alert("CSV load failed. Check console.");
    }
  });

  els.form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const artist = (els.artist.value || "").trim();
    const price = (els.price.value || "").trim();

    // basic guardrails
    if (!artist) return alert("Pick an artist.");
    if (!price || Number(price) <= 0) return alert("Enter a purchase price.");

    els.outArtist.textContent = artist;
    els.outPrice.textContent = price;
    els.outRows.textContent = String(DATA_ROWS.length);

    els.results.classList.remove("is-hidden");
    els.results.scrollIntoView({ behavior: "smooth", block: "start" });

    // Next step: call your real PriceCheck engine here.
    // runPriceCheck({ artist, price, rows: DATA_ROWS });
  });

})();
