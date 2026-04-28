// ========== TRIP DATA ==========
const defaultDays = [
  {
    num: 'DAY 1',
    title: 'Touchdown Bangkok',
    location: 'Bangkok',
    vibe: '✈️ Easy landing day — save energy for what\'s coming',
    activities: [
      'Land at Suvarnabhumi Airport, grab a SIM card',
      'Check in near Asok / Sukhumvit area',
      'Late lunch at Terminal 21 Asok food court',
      'Evening walk around Sukhumvit Neon Strip',
      'Late Thai massage to recover from the flight',
      'Quick street food dinner — Pad Thai, mango sticky rice'
    ]
  },
  {
    num: 'DAY 2',
    title: 'Bangkok → Pattaya',
    location: 'Bangkok → Pattaya',
    vibe: '🚌 Road trip vibes — Pattaya awaits',
    activities: [
      'Morning hotel breakfast',
      'Grab a minivan / taxi to Pattaya (~2 hrs)',
      'Check in to hotel near Beach Road or Central Pattaya',
      'Afternoon chill at the beach, explore the strip',
      'Seafood dinner by the ocean',
      'First taste of Walking Street nightlife 🍻'
    ]
  },
  {
    num: 'DAY 3',
    title: 'Shoot, Swim & Sin City',
    location: 'Pattaya',
    vibe: '🔫💦 Action-packed day — guns in the morning, water in the afternoon',
    activities: [
      'Morning: Dragon Shooting Club (rated 4.8⭐) — try rifles, pistols, shotguns',
      'Lunch: local Thai spot near Pattaya Beach',
      'Afternoon: Jet ski at Jomtien Beach (TSA Thailand, rated 5.0⭐)',
      'Optional: parasailing or banana boat ride',
      'Freshen up, pre-drinks at the hotel',
      'Night: Walking Street adult show (69 Show / Big Eye 99) + bar crawl'
    ]
  },
  {
    num: 'DAY 4',
    title: 'Island & Adrenaline Day',
    location: 'Pattaya',
    vibe: '🏝️ Go big — this is the highlight day',
    activities: [
      'Morning: speedboat to Koh Larn island',
      'Snorkeling, beach time, fresh grilled seafood on the island',
      'Afternoon: parasailing or paramotor experience over the sea',
      'Optional: ATV off-road or flyboarding back on mainland',
      'Sunset beers by Pattaya Beach',
      'Night: last night in Pattaya — hit Walking Street hard 🔥'
    ]
  },
  {
    num: 'DAY 5',
    title: 'Back to Bangkok',
    location: 'Pattaya → Bangkok',
    vibe: '🏙️ Return to the city — polish mode activated',
    activities: [
      'Late checkout, grab brunch before leaving',
      'Transfer back to Bangkok (~2 hrs)',
      'Check into second Bangkok hotel near Asok/Siam',
      'Afternoon shopping at ICONSIAM — high-end brands + indoor floating market',
      'Dinner at a rooftop Bangkok restaurant with skyline view',
      'Chill night — bars around Thong Lo or Ekkamai'
    ]
  },
  {
    num: 'DAY 6',
    title: 'Bangkok Slay Day',
    location: 'Bangkok',
    vibe: '🛍️💆 Shopping, eats, and spa recovery',
    activities: [
      'Morning: Chatuchak Weekend Market or MBK Center for bargain shopping',
      'Street food lunch — khao man gai, boat noodles, mango rice',
      'Afternoon: full Thai massage session at Health Land Asoke (rated 4.2⭐, open till 11pm)',
      'Terminal 21 Asok for final souvenirs and fashion',
      'Dinner: Yaowarat (Chinatown) for legendary street food',
      'Night: Khao San Road or RCA for one last big night 🎉'
    ]
  },
  {
    num: 'DAY 7',
    title: 'Final Day & Fly Home',
    location: 'Bangkok',
    vibe: '😭 Last day — make it count',
    activities: [
      'Slow morning, hotel breakfast',
      'Last-minute shopping — grab gifts, snacks, Thai tea',
      'Final Thai massage or foot massage',
      'Pad Thai from a legendary street stall',
      'Airport transfer — Suvarnabhumi or Don Mueang',
      'Board the plane with the best memories 🇹🇭✈️'
    ]
  }
];

let days = JSON.parse(localStorage.getItem('tripDays')) || JSON.parse(JSON.stringify(defaultDays));
let tripSettings = JSON.parse(localStorage.getItem('tripSettings')) || { dates: '', people: '', tagline: '' };
let logistics = JSON.parse(localStorage.getItem('tripLogistics')) || {};
let editModeOpen = false;
let currentEditDay = null;
let currentLogisticsKey = null;

const logisticsConfig = {
  flight: {
    title: 'Edit Flight Details',
    fields: [
      { id: 'flightOutVal', label: 'Outbound Flight (e.g. CX757 HKG→BKK, 29 May 08:00)', placeholder: 'CX757 HKG→BKK, 29 May 08:00' },
      { id: 'flightReturnVal', label: 'Return Flight (e.g. CX758 BKK→HKG, 4 Jun 22:00)', placeholder: 'CX758 BKK→HKG, 4 Jun 22:00' }
    ],
    displayIds: ['flightOut', 'flightReturn']
  },
  hotelBKK1: {
    title: 'Bangkok Hotel (Arrival Night)',
    fields: [
      { id: 'hotelBKK1Name', label: 'Hotel Name', placeholder: 'e.g. Novotel Bangkok Sukhumvit 20' },
      { id: 'hotelBKK1Info', label: 'Check-in / Check-out / Address', placeholder: 'e.g. 29 May – 30 May · Sukhumvit Soi 20' }
    ],
    displayIds: ['hotelBKK1', 'hotelBKK1Sub']
  },
  hotelPAT: {
    title: 'Pattaya Hotel (3 Nights)',
    fields: [
      { id: 'hotelPATName', label: 'Hotel Name', placeholder: 'e.g. Amari Pattaya' },
      { id: 'hotelPATInfo', label: 'Check-in / Check-out / Address', placeholder: 'e.g. 30 May – 2 Jun · Beach Road' }
    ],
    displayIds: ['hotelPAT', 'hotelPATSub']
  },
  hotelBKK2: {
    title: 'Bangkok Hotel (Return, 3 Nights)',
    fields: [
      { id: 'hotelBKK2Name', label: 'Hotel Name', placeholder: 'e.g. Kimpton Maa-Lai Bangkok' },
      { id: 'hotelBKK2Info', label: 'Check-in / Check-out / Address', placeholder: 'e.g. 2 Jun – 4 Jun · Sukhumvit' }
    ],
    displayIds: ['hotelBKK2', 'hotelBKK2Sub']
  }
};

// ========== RENDER FUNCTIONS ==========
function renderDays() {
  const grid = document.getElementById('daysGrid');
  grid.innerHTML = '';
  days.forEach((day, idx) => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="day-header">
        <span class="day-num">${escHtml(day.num)}</span>
        <span class="day-title">${escHtml(day.title)}</span>
        <span class="day-location">${escHtml(day.location)}</span>
        <button class="day-edit-btn" onclick="openDayEdit(${idx})"><i class="fa fa-pen"></i> Edit</button>
      </div>
      <div class="day-body">
        ${day.vibe ? `<p class="day-vibe">${escHtml(day.vibe)}</p>` : ''}
        <ul class="day-activities">
          ${day.activities.map(a => `<li>${escHtml(a)}</li>`).join('')}
        </ul>
      </div>`;
    grid.appendChild(card);
  });
}

function renderLogistics() {
  const keys = ['flightOut', 'flightReturn', 'hotelBKK1', 'hotelBKK1Sub', 'hotelPAT', 'hotelPATSub', 'hotelBKK2', 'hotelBKK2Sub'];
  keys.forEach(k => {
    const el = document.getElementById(k);
    if (el && logistics[k]) {
      el.textContent = logistics[k];
      el.style.color = '';
    }
  });
}

function renderTripSettings() {
  if (tripSettings.dates) document.getElementById('heroDateDisplay').innerHTML = `<i class="fa fa-calendar"></i> ${escHtml(tripSettings.dates)}`;
  if (tripSettings.people) document.getElementById('heroPeopleDisplay').innerHTML = `<i class="fa fa-users"></i> ${escHtml(tripSettings.people)}`;
}

// ========== EDIT MODE ==========
function toggleEditMode() {
  editModeOpen = !editModeOpen;
  const panel = document.getElementById('editPanel');
  const btn = document.getElementById('editToggleBtn');
  panel.style.display = editModeOpen ? 'block' : 'none';
  btn.classList.toggle('active', editModeOpen);
  if (editModeOpen) {
    document.getElementById('editDates').value = tripSettings.dates || '';
    document.getElementById('editPeople').value = tripSettings.people || '';
    document.getElementById('editTagline').value = tripSettings.tagline || '';
  }
}

function saveTripSettings() {
  tripSettings.dates = document.getElementById('editDates').value.trim();
  tripSettings.people = document.getElementById('editPeople').value.trim();
  tripSettings.tagline = document.getElementById('editTagline').value.trim();
  localStorage.setItem('tripSettings', JSON.stringify(tripSettings));
  renderTripSettings();
  toggleEditMode();
}

// ========== DAY EDIT ==========
function openDayEdit(idx) {
  currentEditDay = idx;
  const day = days[idx];
  document.getElementById('dayModalTitle').textContent = `Edit ${day.num}`;
  document.getElementById('dayEditTitle').value = day.title;
  document.getElementById('dayEditLocation').value = day.location;
  document.getElementById('dayEditActivities').value = day.activities.join('\n');
  document.getElementById('dayEditVibe').value = day.vibe || '';
  document.getElementById('dayModal').style.display = 'flex';
}

function saveDayEdit() {
  if (currentEditDay === null) return;
  const day = days[currentEditDay];
  day.title = document.getElementById('dayEditTitle').value.trim() || day.title;
  day.location = document.getElementById('dayEditLocation').value.trim() || day.location;
  day.activities = document.getElementById('dayEditActivities').value.split('\n').map(s => s.trim()).filter(Boolean);
  day.vibe = document.getElementById('dayEditVibe').value.trim();
  localStorage.setItem('tripDays', JSON.stringify(days));
  document.getElementById('dayModal').style.display = 'none';
  renderDays();
}

function closeDayModal(e) {
  if (e.target.id === 'dayModal') document.getElementById('dayModal').style.display = 'none';
}

// ========== LOGISTICS EDIT ==========
function editLogistics(key) {
  currentLogisticsKey = key;
  const cfg = logisticsConfig[key];
  document.getElementById('modalTitle').textContent = cfg.title;
  const fieldsEl = document.getElementById('modalFields');
  fieldsEl.innerHTML = cfg.fields.map(f => `
    <div class="edit-row">
      <label>${escHtml(f.label)}</label>
      <input type="text" id="${f.id}" placeholder="${escHtml(f.placeholder)}" value="${escHtml(logistics[f.id] || '')}" />
    </div>`).join('');
  document.getElementById('logisticsModal').style.display = 'flex';
}

function saveLogistics() {
  const cfg = logisticsConfig[currentLogisticsKey];
  cfg.fields.forEach((f, i) => {
    const val = document.getElementById(f.id).value.trim();
    logistics[f.id] = val;
    const displayEl = document.getElementById(cfg.displayIds[i]);
    if (displayEl) {
      displayEl.textContent = val || (i === 0 ? '✏️ Click Edit to add details' : '');
      displayEl.style.color = val ? '' : '';
    }
  });
  localStorage.setItem('tripLogistics', JSON.stringify(logistics));
  document.getElementById('logisticsModal').style.display = 'none';
}

function closeModal(e) {
  if (e.target.id === 'logisticsModal') document.getElementById('logisticsModal').style.display = 'none';
}

// ========== MAP ==========
const mapUrls = {
  bangkok: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496116.2836905714!2d100.36529264999999!3d13.724663299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2shk!4v1714300000000!5m2!1sen!2shk',
  pattaya: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62128.06513093498!2d100.8670068!3d12.9235557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102b29b9b93b285%3A0x30b2c4e5b7c8f7a2!2sPattaya%20City%2C%20Bang%20Lamung%20District%2C%20Chon%20Buri%2C%20Thailand!5e0!3m2!1sen!2shk!4v1714300000000!5m2!1sen!2shk'
};

function switchMap(city) {
  document.getElementById('mapFrame').src = mapUrls[city];
  document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
}

// ========== HELPERS ==========
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ========== INIT ==========
window.addEventListener('DOMContentLoaded', () => {
  renderDays();
  renderLogistics();
  renderTripSettings();
});
