<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Recherche à facettes — PWA AutoSync</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1d4ed8">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
</head>
<body class="bg-gray-50 text-gray-800">

<!-- ✅ Bannière de mise à jour -->
<div id="update-banner" class="hidden fixed bottom-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white py-2 px-6 rounded-xl shadow-lg z-50">
  Nouvelle version disponible <button id="reload-btn" class="underline font-semibold ml-2">Recharger</button>
</div>

<div class="max-w-7xl mx-auto py-10 px-4">
  <h1 class="text-3xl font-bold mb-8 text-center">🔍 Recherche à facettes — PWA avec synchro</h1>

  <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">

    <!-- === FILTRES === -->
    <aside class="bg-white p-5 rounded-2xl shadow space-y-6 h-fit md:sticky md:top-6">
      <div>
        <label class="font-semibold text-sm text-gray-600">Recherche texte</label>
        <input id="search-text" type="text" placeholder="Nom ou mot-clé..."
               class="w-full mt-1 border border-gray-300 rounded-lg p-2" disabled />
      </div>

      <div>
        <label class="font-semibold text-sm text-gray-600 block mb-1">Siècle</label>
        <select id="filter-century" class="w-full border border-gray-300 rounded-lg p-2" disabled>
          <option value="">Tous</option>
        </select>
      </div>

      <div>
        <span class="font-semibold text-sm text-gray-600 block mb-1">Catégories</span>
        <div id="category-checkboxes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-sm text-gray-700">
          <p class="text-gray-400 text-sm">Chargement...</p>
        </div>
      </div>

      <div class="border-t pt-3 text-sm text-gray-500 flex justify-between items-center">
        <span id="result-count">0 résultat</span>
        <button id="refresh-btn" class="text-blue-600 hover:underline text-xs">🔄 Actualiser</button>
      </div>
    </aside>

    <!-- === RÉSULTATS === -->
    <main>
      <div id="results" class="space-y-4 text-gray-600">
        <p class="text-center text-gray-400">Chargement des données...</p>
      </div>
    </main>
  </div>
</div>

<script>
const DATA_URL = "https://example.com/data.json"; // ⚠️ à remplacer
const CACHE_KEY = "faceted_data_cache";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h
let data = [], fuse = null;

// --- DOM Elements ---
const resultsDiv = document.getElementById("results");
const resultCount = document.getElementById("result-count");
const categoryContainer = document.getElementById("category-checkboxes");
const centurySelect = document.getElementById("filter-century");
const searchInput = document.getElementById("search-text");
const refreshBtn = document.getElementById("refresh-btn");
const banner = document.getElementById("update-banner");
const reloadBtn = document.getElementById("reload-btn");

function renderResults(items) {
  resultsDiv.innerHTML = "";
  resultCount.textContent = `${items.length} résultat${items.length > 1 ? "s" : ""}`;
  if (!items.length) {
    resultsDiv.innerHTML = `<p class="text-center text-gray-500">Aucun résultat</p>`;
    return;
  }
  for (const item of items) {
    resultsDiv.innerHTML += `
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow transition">
        <div class="flex justify-between items-center mb-1">
          <h2 class="font-semibold text-lg">${item.nom}</h2>
          <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">${item.siecle || "-"}</span>
        </div>
        <p class="text-sm text-gray-500">${item.categorie || "—"}</p>
        <p class="text-gray-700 mt-1">${item.description || ""}</p>
      </div>`;
  }
}

function applyFilters() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCentury = centurySelect.value;
  const selectedCategories = [...categoryContainer.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value);

  let filtered = data;
  if (searchText) filtered = fuse.search(searchText).map(r => r.item);
  filtered = filtered.filter(item =>
    (!selectedCentury || item.siecle === selectedCentury) &&
    (!selectedCategories.length || selectedCategories.includes(item.categorie))
  );
  renderResults(filtered);
}

function setupFilters() {
  const categories = [...new Set(data.map(d => d.categorie))].filter(Boolean);
  categoryContainer.innerHTML = categories.map(cat => `
    <label class="flex items-center space-x-2 text-sm">
      <input type="checkbox" value="${cat}" class="accent-blue-600">
      <span>${cat}</span>
    </label>
  `).join("");

  const centuries = [...new Set(data.map(d => d.siecle))].filter(Boolean).sort();
  centurySelect.innerHTML = '<option value="">Tous</option>' + 
    centuries.map(c => `<option value="${c}">${c.toUpperCase()}</option>`).join("");

  searchInput.disabled = false;
  centurySelect.disabled = false;

  searchInput.addEventListener("input", applyFilters);
  centurySelect.addEventListener("change", applyFilters);
  categoryContainer.querySelectorAll("input[type=checkbox]").forEach(cb => cb.addEventListener("change", applyFilters));

  applyFilters();
}

function saveToCache(json) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: json }));
}

function loadFromCache() {
  const record = localStorage.getItem(CACHE_KEY);
  if (!record) return null;
  const parsed = JSON.parse(record);
  return (Date.now() - parsed.timestamp < CACHE_TTL) ? parsed.data : null;
}

async function loadData(forceRefresh = false) {
  try {
    if (!forceRefresh) {
      const cached = loadFromCache();
      if (cached) {
        data = cached;
        fuse = new Fuse(data, { keys: ["nom", "description", "categorie"], threshold: 0.4 });
        setupFilters();
        return;
      }
    }

    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Erreur de chargement du fichier JSON.");
    const json = await response.json();

    data = json;
    fuse = new Fuse(data, { keys: ["nom", "description", "categorie"], threshold: 0.4 });
    saveToCache(json);
    setupFilters();
  } catch (err) {
    resultsDiv.innerHTML = `<p class="text-center text-red-500">${err.message}</p>`;
  }
}

refreshBtn.addEventListener("click", () => {
  localStorage.removeItem(CACHE_KEY);
  loadData(true);
});

loadData();

// --- Gestion du Service Worker + Notification ---
if ('serviceWorker' in navigator) {
  let newWorker;
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      reg.addEventListener('updatefound', () => {
        newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            banner.classList.remove("hidden");
          }
        });
      });
    });

  reloadBtn.addEventListener('click', () => {
    newWorker.postMessage({ action: 'skipWaiting' });
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
</script>

</body>
</html>
