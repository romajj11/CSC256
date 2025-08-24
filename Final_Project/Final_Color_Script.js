// Main JavaScript for Color Palette Maker

const grid = document.getElementById('grid');
const toast = document.getElementById('toast');
const favPanel = document.getElementById('favorites-panel');
const favGrid = document.getElementById('favGrid');

// Generate random hex color
function randHex(){ return '#' + Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0').toUpperCase(); }
// Validate hex input
function isValidHex(v){return /^#([0-9A-Fa-f]{6})$/.test(v)}

// Show toast messages
function showToast(msg){ toast.textContent = msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 1500); }

// Create a color swatch element
function createSwatch(color){
const tpl = document.getElementById('swatch-template');
const node = tpl.content.firstElementChild.cloneNode(true);
const colorEl = node.querySelector('.swatch-color');
const hexInput = node.querySelector('.hex');
const lockBtn = node.querySelector('.lock');
const copyBtn = node.querySelector('.copy');

// Apply color to swatch
function applyColor(hex){ colorEl.style.background = hex; hexInput.value = hex.toUpperCase(); }
applyColor(color);

// Copy hex
copyBtn.addEventListener('click', async ()=>{ await navigator.clipboard.writeText(hexInput.value); showToast('Copied ' + hexInput.value); });

// Lock/unlock swatch
lockBtn.addEventListener('click', ()=>{ const pressed = lockBtn.getAttribute('aria-pressed') === 'true'; lockBtn.setAttribute('aria-pressed', String(!pressed)); node.dataset.locked = String(!pressed); });
node.addEventListener('dblclick', ()=>{ lockBtn.click(); });

// Edit hex manually
hexInput.addEventListener('change', ()=>{ const v = hexInput.value.trim().toUpperCase(); if(isValidHex(v)) applyColor(v); else { showToast('Enter valid hex like #A1B2C3'); hexInput.value = color; } });

node.getColor = ()=> hexInput.value;
node.setColor = applyColor;
node.isLocked = ()=> node.dataset.locked === 'true';
return node;
}

// Initial render
function renderInitial(){ grid.innerHTML=''; for(let i=0;i<5;i++){ grid.appendChild(createSwatch(randHex())); } }

// Regenerate palette
function regenerate(all=false){ [...grid.children].forEach(s=>{ if(all || !s.isLocked()) s.setColor(randHex()); }); }

// Get current palette
function currentPalette(){ return [...grid.children].map(s=>s.getColor()); }

// Local storage for favorites
const KEY='cp_palettes_v1';
function loadPalettes(){ try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
function savePalettes(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }

// Add current palette to favorites
function addCurrentToFavorites(){ const list = loadPalettes(); const palette = { id: crypto.randomUUID(), colors: currentPalette(), ts: Date.now() }; list.unshift(palette); savePalettes(list); showToast('Palette saved'); renderFavorites(); }

// Render favorites
function renderFavorites(){ const list = loadPalettes(); favGrid.innerHTML=''; list.forEach(p=>{ const card = document.createElement('article'); card.className='fav-card'; const strip = document.createElement('div'); strip.className='fav-strip'; p.colors.forEach(c=>{ const cell=document.createElement('div'); cell.style.background=c; strip.appendChild(cell); }); card.append(strip); favGrid.appendChild(card); }); favPanel.hidden = list.length === 0; }

// Button events
document.getElementById('generate').addEventListener('click', ()=>regenerate(true));
document.getElementById('shuffleUnlocked').addEventListener('click', ()=>regenerate(false));
document.getElementById('save').addEventListener('click', addCurrentToFavorites);
document.getElementById('clearAll').addEventListener('click', ()=>{ if(confirm('Delete all saved palettes?')){ localStorage.removeItem(KEY); renderFavorites(); } });

// Keyboard shortcuts
document.addEventListener('keydown', (e)=>{ if(e.code==='Space'){ e.preventDefault(); regenerate(true); } });

// Init
renderInitial();
renderFavorites();
