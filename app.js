// ============================================================
// FIREBASE CONFIG
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyD2hsah_Ny9c6kjX4_e-DsOUeyzWJmx57A",
  authDomain:        "bro-trip-2026-thai-happy.firebaseapp.com",
  projectId:         "bro-trip-2026-thai-happy",
  storageBucket:     "bro-trip-2026-thai-happy.firebasestorage.app",
  messagingSenderId: "684584318593",
  appId:             "1:684584318593:web:0864e3d0327d508efdbf80"
};

firebase.initializeApp(firebaseConfig);
const db       = firebase.firestore();
const TRIP_DOC = db.collection('trips').doc('bro-trip-2026');
const DAYS_COL = db.collection('trips').doc('bro-trip-2026').collection('days');

// ============================================================
// DEFAULT TRIP DATA
// ============================================================
const defaultDays = [
  {
    id: 'day1', num: 'DAY 1', order: 0,
    title: 'Touchdown Bangkok', location: 'Bangkok',
    vibe: '\u2708\ufe0f Easy landing day \u2014 save energy for what\'s coming',
    activities: [
      { time: 'Arrival',    title: 'Land at Suvarnabhumi, grab a SIM card',       price: 'Free SIM ~THB 299',     description: 'AIS or DTAC counters right after customs' },
      { time: 'Afternoon',  title: 'Check in near Asok / Sukhumvit',               price: 'Hotel TBD',             description: 'Drop bags, freshen up, explore the area' },
      { time: '13:00',      title: 'Lunch at Terminal 21 Asok food court',         price: 'THB 60\u2013120 / meal', description: 'Top floor food court \u2014 legendary cheap eats' },
      { time: 'Evening',    title: 'Sukhumvit Neon Strip walk',                    price: 'Free',                  description: 'Vibe check, grab street snacks' },
      { time: '21:00+',     title: 'Late Thai massage to recover from flight',      price: 'THB 250\u2013400 / hr',  description: 'Healthy Massage Sukhumvit 19 \u2014 open till midnight' },
      { time: 'Night',      title: 'Street food dinner \u2014 Pad Thai, mango sticky rice', price: 'THB 80\u2013150',   description: 'Grab from a street cart or night market' }
    ]
  },
  {
    id: 'day2', num: 'DAY 2', order: 1,
    title: 'Bangkok \u2192 Pattaya', location: 'Bangkok \u2192 Pattaya',
    vibe: '\ud83d\ude8c Road trip vibes \u2014 Pattaya awaits',
    activities: [
      { time: '08:00',     title: 'Hotel breakfast',                               price: 'Included / THB 150',    description: 'Fuel up before the road' },
      { time: '09:30',     title: 'Minivan / taxi to Pattaya',                     price: 'THB 130\u2013160 bus / THB 1,200 taxi', description: '~2 hrs, departs Ekkamai or On Nut' },
      { time: 'Afternoon', title: 'Check in near Beach Road or Central Pattaya',   price: 'Hotel TBD',             description: 'Base yourself close to Walking Street' },
      { time: '15:00',     title: 'Beach chill + explore the strip',               price: 'Free',                  description: 'Pattaya Beach Road, grab a coconut' },
      { time: '19:00',     title: 'Seafood dinner by the ocean',                   price: 'THB 400\u2013800 / person', description: 'Nong Nuch or beachfront seafood restaurants' },
      { time: '22:00+',    title: 'First taste of Walking Street nightlife',       price: 'THB 500\u20131,500 est.', description: 'Bars, clubs, live music \u2014 welcome to Pattaya \ud83c\udf7b' }
    ]
  },
  {
    id: 'day3', num: 'DAY 3', order: 2,
    title: 'Shoot, Swim & Sin City', location: 'Pattaya',
    vibe: '\ud83d\udd2b\ud83d\udca6 Guns in the morning, water in the afternoon',
    activities: [
      { time: '09:00\u201311:00', title: 'Dragon Shooting Club',                  price: 'THB 1,500\u20132,500',  description: 'Rated 4.8\u2b50 \u2014 rifles, pistols, shotguns. Ear protection provided.' },
      { time: '12:00',           title: 'Lunch near Pattaya Beach',               price: 'THB 150\u2013300',      description: 'Local Thai spot, avoid tourist traps' },
      { time: '13:30\u201316:30', title: 'Jet ski at Jomtien Beach',              price: 'THB 800\u20131,200 / 20 mins', description: 'TSA Thailand rated 5.0\u2b50 \u2014 book ahead, life jacket included' },
      { time: '15:00',           title: 'Parasailing or banana boat',             price: 'THB 500\u2013800',      description: 'Optional add-on at Jomtien Beach' },
      { time: '20:00',           title: 'Pre-drinks at hotel',                    price: 'THB 200\u2013400',      description: 'Grab beers from 7-Eleven and pre-game' },
      { time: '22:00+',          title: 'Walking Street adult show + bar crawl',  price: 'THB 1,000\u20132,000',  description: '69 Show or Big Eye 99, then hit the bars' }
    ]
  },
  {
    id: 'day4', num: 'DAY 4', order: 3,
    title: 'Island & Adrenaline Day', location: 'Pattaya',
    vibe: '\ud83c\udfdd\ufe0f Go big \u2014 this is the highlight day',
    activities: [
      { time: '08:00',           title: 'Speedboat to Koh Larn island',           price: 'THB 30 ferry / THB 1,500 speedboat', description: 'Ferry from Bali Hai Pier, ~45 mins' },
      { time: '09:30\u201312:00', title: 'Snorkeling + beach time on Koh Larn',   price: 'THB 300\u2013500',      description: 'Tawaen or Samae beach, crystal clear water' },
      { time: '12:30',           title: 'Grilled seafood on the island',          price: 'THB 400\u2013700',      description: 'Fresh grilled fish and prawns beachside' },
      { time: '14:00',           title: 'Parasailing or paramotor over the sea',  price: 'THB 800\u20131,500',    description: 'Best views of Pattaya from the air' },
      { time: '16:00',           title: 'ATV off-road or flyboarding (mainland)', price: 'THB 600\u20131,200',    description: 'Optional \u2014 book in advance' },
      { time: '18:30',           title: 'Sunset beers by Pattaya Beach',          price: 'THB 200\u2013400',      description: 'Last sunset in Pattaya \u2014 enjoy it' },
      { time: '22:00+',          title: 'Last night \u2014 hit Walking Street hard', price: 'THB 1,500\u20132,500', description: '\ud83d\udd25 Make it count \u2014 final Pattaya night' }
    ]
  },
  {
    id: 'day5', num: 'DAY 5', order: 4,
    title: 'Back to Bangkok', location: 'Pattaya \u2192 Bangkok',
    vibe: '\ud83c\udfd9\ufe0f Return to the city \u2014 polish mode activated',
    activities: [
      { time: '10:00',     title: 'Late checkout + brunch',                        price: 'THB 200\u2013400',      description: 'Last Pattaya meal \u2014 make it a good one' },
      { time: '12:00',     title: 'Transfer back to Bangkok',                      price: 'THB 130\u2013160 bus',  description: '~2 hrs, departs Pattaya bus terminal' },
      { time: '14:30',     title: 'Check into second Bangkok hotel',               price: 'Hotel TBD',             description: 'Asok or Siam area, central location' },
      { time: '16:00',     title: 'Shopping at ICONSIAM',                          price: 'Budget as needed',      description: 'Luxury brands + indoor floating market, Chao Phraya riverside' },
      { time: '19:30',     title: 'Rooftop dinner with Bangkok skyline view',      price: 'THB 800\u20131,500 / person', description: 'Book a table in advance, dress smart' },
      { time: '22:00',     title: 'Chill night \u2014 Thong Lo or Ekkamai bars',  price: 'THB 400\u2013800',      description: 'More upscale vibe, good cocktails' }
    ]
  },
  {
    id: 'day6', num: 'DAY 6', order: 5,
    title: 'Bangkok Slay Day', location: 'Bangkok',
    vibe: '\ud83d\udecd\ufe0f\ud83d\udc86 Shopping, eats, and spa recovery',
    activities: [
      { time: '10:00',     title: 'Chatuchak Weekend Market or MBK Center',        price: 'Budget as needed',      description: 'Chatuchak for unique finds, MBK for electronics + clothes' },
      { time: '13:00',     title: 'Street food lunch',                             price: 'THB 80\u2013150',       description: 'Khao man gai, boat noodles, mango sticky rice' },
      { time: '15:00',     title: 'Full Thai massage at Health Land Asoke',        price: 'THB 550\u2013800 / 2 hrs', description: 'Rated 4.2\u2b50, open till 11pm \u2014 book ahead' },
      { time: '17:30',     title: 'Terminal 21 Asok for souvenirs + fashion',      price: 'Budget as needed',      description: 'Best food court in Bangkok on the top floor too' },
      { time: '19:30',     title: 'Yaowarat Chinatown street food dinner',         price: 'THB 300\u2013600',      description: 'Legendary night market \u2014 roast duck, oyster omelette, dim sum' },
      { time: '22:00+',    title: 'Khao San Road or RCA final big night',         price: 'THB 600\u20131,200',    description: '\ud83c\udf89 Last proper night out \u2014 go all in' }
    ]
  },
  {
    id: 'day7', num: 'DAY 7', order: 6,
    title: 'Final Day & Fly Home', location: 'Bangkok',
    vibe: '\ud83d\ude22 Last day \u2014 make it count',
    activities: [
      { time: '09:00',     title: 'Slow morning + hotel breakfast',                price: 'Included / THB 150',    description: 'No rush, enjoy the last morning' },
      { time: '11:00',     title: 'Last-minute shopping',                          price: 'Budget as needed',      description: 'Gifts, Thai snacks, cha yen (Thai iced tea)' },
      { time: '13:00',     title: 'Final Thai massage or foot massage',            price: 'THB 250\u2013400 / hr',  description: 'One last session before the flight' },
      { time: '15:00',     title: 'Pad Thai from a legendary street stall',       price: 'THB 60\u2013100',       description: 'Tip Samai near Wat Saket is the OG' },
      { time: '17:00+',    title: 'Airport transfer',                              price: 'THB 200\u2013350 taxi',  description: 'Suvarnabhumi or Don Mueang \u2014 allow 2 hrs before flight' },
      { time: 'Departure', title: 'Board the plane with the best memories',       price: 'Priceless \ud83c\uddf9\ud83c\udded', description: 'See you on the next one \u2708\ufe0f' }
    ]
  }
];

// ============================================================
// STATE
// ============================================================
let days = JSON.parse(JSON.stringify(defaultDays));
let tripSettings    = { dates: '', people: '', tagline: '' };
let logistics       = {};
let editModeOpen    = false;
let currentEditDay  = null;
let currentLogisticsKey = null;
let firestoreReady  = false;

const logisticsConfig = {
  flight: {
    title: 'Edit Flight Details',
    fields: [
      { id: 'flightOutVal',    label: 'Outbound Flight',  placeholder: 'CX757 HKG\u2192BKK, 29 May 08:00' },
      { id: 'flightReturnVal', label: 'Return Flight',    placeholder: 'CX758 BKK\u2192HKG, 4 Jun 22:00'  }
    ],
    displayIds: ['flightOut', 'flightReturn']
  },
  hotelBKK1: {
    title: 'Bangkok Hotel (Arrival Night)',
    fields: [
      { id: 'hotelBKK1Name', label: 'Hotel Name',                     placeholder: 'e.g. Novotel Sukhumvit 20' },
      { id: 'hotelBKK1Info', label: 'Check-in / Check-out / Address', placeholder: '29 May \u2013 30 May \u00b7 Sukhumvit Soi 20' }
    ],
    displayIds: ['hotelBKK1', 'hotelBKK1Sub']
  },
  hotelPAT: {
    title: 'Pattaya Hotel (3 Nights)',
    fields: [
      { id: 'hotelPATName', label: 'Hotel Name',                     placeholder: 'e.g. Amari Pattaya' },
      { id: 'hotelPATInfo', label: 'Check-in / Check-out / Address', placeholder: '30 May \u2013 2 Jun \u00b7 Beach Road' }
    ],
    displayIds: ['hotelPAT', 'hotelPATSub']
  },
  hotelBKK2: {
    title: 'Bangkok Hotel (Return, 3 Nights)',
    fields: [
      { id: 'hotelBKK2Name', label: 'Hotel Name',                     placeholder: 'e.g. Kimpton Maa-Lai Bangkok' },
      { id: 'hotelBKK2Info', label: 'Check-in / Check-out / Address', placeholder: '2 Jun \u2013 4 Jun \u00b7 Sukhumvit' }
    ],
    displayIds: ['hotelBKK2', 'hotelBKK2Sub']
  }
};

// ============================================================
// SYNC STATUS
// ============================================================
function setSyncStatus(state, msg) {
  const bar = document.getElementById('syncBar');
  const el  = document.getElementById('syncStatus');
  el.innerHTML = msg;
  bar.className = 'sync-bar ' + state;
}

// ============================================================
// FIRESTORE LISTENERS
// ============================================================
function startListeners() {
  TRIP_DOC.onSnapshot(snap => {
    if (snap.exists) {
      const data = snap.data();
      if (data.settings)  { tripSettings = data.settings;  renderTripSettings(); }
      if (data.logistics) { logistics    = data.logistics;  renderLogistics(); }
    }
    if (!firestoreReady) {
      firestoreReady = true;
      setSyncStatus('synced', '<i class="fa fa-circle-check"></i> Live sync active \u2014 edits update for everyone instantly');
    }
  }, err => {
    setSyncStatus('error', '<i class="fa fa-triangle-exclamation"></i> Sync error: ' + err.message);
  });

  DAYS_COL.orderBy('order').onSnapshot(snap => {
    if (!snap.empty) {
      days = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      renderDays();
    }
  });
}

// ============================================================
// SEED DEFAULTS
// ============================================================
async function seedDefaults() {
  const snap = await TRIP_DOC.get();
  if (!snap.exists) await TRIP_DOC.set({ settings: tripSettings, logistics: {} });

  const daysSnap = await DAYS_COL.limit(1).get();
  if (daysSnap.empty) {
    const batch = db.batch();
    defaultDays.forEach((day, i) => {
      batch.set(DAYS_COL.doc(day.id), { ...day, order: i });
    });
    await batch.commit();
  }
}

// ============================================================
// RENDER DAYS
// ============================================================
function renderDays() {
  const grid = document.getElementById('daysGrid');
  grid.innerHTML = '';
  days.forEach((day, idx) => {
    const card = document.createElement('div');
    card.className = 'day-card';
    const activitiesHtml = (day.activities || []).map(a => {
      if (typeof a === 'string') {
        return `<li class="activity-row"><div class="activity-time"></div><div class="activity-main"><div class="activity-title">${escHtml(a)}</div></div><div class="activity-price"></div></li>`;
      }
      return `
        <li class="activity-row">
          <div class="activity-time">${escHtml(a.time || '')}</div>
          <div class="activity-main">
            <div class="activity-title">${escHtml(a.title || '')}</div>
            ${a.description ? `<div class="activity-desc">${escHtml(a.description)}</div>` : ''}
          </div>
          <div class="activity-price">${escHtml(a.price || '')}</div>
        </li>`;
    }).join('');

    card.innerHTML = `
      <div class="day-header">
        <span class="day-num">${escHtml(day.num)}</span>
        <span class="day-title">${escHtml(day.title)}</span>
        <span class="day-location">${escHtml(day.location)}</span>
        <button class="day-edit-btn" onclick="openDayEdit(${idx})"><i class="fa fa-pen"></i> Edit</button>
      </div>
      <div class="day-body">
        ${day.vibe ? `<p class="day-vibe">${escHtml(day.vibe)}</p>` : ''}
        <ul class="day-activities">${activitiesHtml}</ul>
      </div>`;
    grid.appendChild(card);
  });
}

// ============================================================
// RENDER LOGISTICS
// ============================================================
function renderLogistics() {
  const map = {
    flightOut:    'flightOutVal',
    flightReturn: 'flightReturnVal',
    hotelBKK1:    'hotelBKK1Name',
    hotelBKK1Sub: 'hotelBKK1Info',
    hotelPAT:     'hotelPATName',
    hotelPATSub:  'hotelPATInfo',
    hotelBKK2:    'hotelBKK2Name',
    hotelBKK2Sub: 'hotelBKK2Info'
  };
  Object.entries(map).forEach(([displayId, storeKey]) => {
    const el = document.getElementById(displayId);
    if (el && logistics[storeKey]) el.textContent = logistics[storeKey];
  });
}

// ============================================================
// RENDER TRIP SETTINGS
// ============================================================
function renderTripSettings() {
  if (tripSettings.dates)
    document.getElementById('heroDateDisplay').innerHTML = `<i class="fa fa-calendar"></i> ${escHtml(tripSettings.dates)}`;
  if (tripSettings.people)
    document.getElementById('heroPeopleDisplay').innerHTML = `<i class="fa fa-users"></i> ${escHtml(tripSettings.people)}`;
  if (tripSettings.tagline)
    document.getElementById('heroTagline').textContent = tripSettings.tagline;
}

// ============================================================
// EDIT MODE PANEL
// ============================================================
function toggleEditMode() {
  editModeOpen = !editModeOpen;
  const panel = document.getElementById('editPanel');
  const btn   = document.getElementById('editToggleBtn');
  panel.style.display = editModeOpen ? 'block' : 'none';
  btn.classList.toggle('active', editModeOpen);
  if (editModeOpen) {
    document.getElementById('editDates').value   = tripSettings.dates   || '';
    document.getElementById('editPeople').value  = tripSettings.people  || '';
    document.getElementById('editTagline').value = tripSettings.tagline || '';
  }
}

async function saveTripSettings() {
  tripSettings.dates   = document.getElementById('editDates').value.trim();
  tripSettings.people  = document.getElementById('editPeople').value.trim();
  tripSettings.tagline = document.getElementById('editTagline').value.trim();
  await TRIP_DOC.set({ settings: tripSettings }, { merge: true });
  toggleEditMode();
}

// ============================================================
// ACTIVITY EDITOR HELPERS
// ============================================================
function renderActivitiesEditor(activities) {
  const container = document.getElementById('activitiesEditor');
  container.innerHTML = '';
  (activities || []).forEach((a, i) => _appendActivityRow(container, a, i));
}

function addActivityRow() {
  const container = document.getElementById('activitiesEditor');
  _appendActivityRow(container, {}, container.children.length);
}

function _appendActivityRow(container, a, idx) {
  const wrapper = document.createElement('div');
  wrapper.className = 'activity-edit-block';
  wrapper.innerHTML = `
    <div class="activity-edit-row">
      <div class="aef">
        <label>Time</label>
        <input class="activity-input" data-field="time"        placeholder="e.g. 09:00\u201311:00" value="${escHtml(a.time||'')}" />
      </div>
      <div class="aef">
        <label>Price / Budget</label>
        <input class="activity-input" data-field="price"       placeholder="e.g. THB 1,500" value="${escHtml(a.price||'')}" />
      </div>
    </div>
    <div class="aef" style="margin-top:0.4rem">
      <label>Activity Title</label>
      <input class="activity-input" data-field="title"       placeholder="e.g. Dragon Shooting Club" value="${escHtml(a.title||'')}" />
    </div>
    <div class="aef" style="margin-top:0.4rem">
      <label>Description / Notes</label>
      <input class="activity-input" data-field="description" placeholder="e.g. Book taxi both ways, ear protection provided" value="${escHtml(a.description||'')}" />
    </div>
    <button class="remove-activity-btn" type="button" onclick="this.closest('.activity-edit-block').remove()"><i class="fa fa-trash"></i> Remove</button>
  `;
  container.appendChild(wrapper);
}

function collectActivities() {
  const blocks = document.querySelectorAll('#activitiesEditor .activity-edit-block');
  const result = [];
  blocks.forEach(block => {
    const inputs = block.querySelectorAll('.activity-input');
    const obj = {};
    inputs.forEach(inp => { obj[inp.getAttribute('data-field')] = inp.value.trim(); });
    if (obj.title || obj.time || obj.description || obj.price) result.push(obj);
  });
  return result;
}

// ============================================================
// DAY EDIT MODAL
// ============================================================
function openDayEdit(idx) {
  currentEditDay = idx;
  const day = days[idx];
  document.getElementById('dayModalTitle').textContent = `Edit ${day.num}`;
  document.getElementById('dayEditTitle').value        = day.title;
  document.getElementById('dayEditLocation').value     = day.location;
  document.getElementById('dayEditVibe').value         = day.vibe || '';
  renderActivitiesEditor(day.activities || []);
  document.getElementById('dayModal').style.display    = 'flex';
}

async function saveDayEdit() {
  if (currentEditDay === null) return;
  const day = days[currentEditDay];
  const updated = {
    title:      document.getElementById('dayEditTitle').value.trim()    || day.title,
    location:   document.getElementById('dayEditLocation').value.trim() || day.location,
    vibe:       document.getElementById('dayEditVibe').value.trim(),
    activities: collectActivities()
  };
  await DAYS_COL.doc(day.id).update(updated);
  document.getElementById('dayModal').style.display = 'none';
}

function closeDayModal(e) {
  if (e.target.id === 'dayModal') document.getElementById('dayModal').style.display = 'none';
}

// ============================================================
// LOGISTICS MODAL
// ============================================================
function editLogistics(key) {
  currentLogisticsKey = key;
  const cfg = logisticsConfig[key];
  document.getElementById('modalTitle').textContent = cfg.title;
  document.getElementById('modalFields').innerHTML = cfg.fields.map(f => `
    <div class="edit-row">
      <label>${escHtml(f.label)}</label>
      <input type="text" id="${f.id}" placeholder="${escHtml(f.placeholder)}" value="${escHtml(logistics[f.id]||'')}" />
    </div>`).join('');
  document.getElementById('logisticsModal').style.display = 'flex';
}

async function saveLogistics() {
  const cfg = logisticsConfig[currentLogisticsKey];
  cfg.fields.forEach(f => { logistics[f.id] = document.getElementById(f.id).value.trim(); });
  await TRIP_DOC.set({ logistics }, { merge: true });
  document.getElementById('logisticsModal').style.display = 'none';
}

function closeModal(e) {
  if (e.target.id === 'logisticsModal') document.getElementById('logisticsModal').style.display = 'none';
}

// ============================================================
// MAP
// ============================================================
const mapUrls = {
  bangkok: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496116.2836905714!2d100.36529264999999!3d13.724663299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2shk!4v1714300000000!5m2!1sen!2shk',
  pattaya: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62128.06513093498!2d100.8670068!3d12.9235557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102b29b9b93b285%3A0x30b2c4e5b7c8f7a2!2sPattaya%20City%2C%20Bang%20Lamung%20District%2C%20Chon%20Buri%2C%20Thailand!5e0!3m2!1sen!2shk!4v1714300000000!5m2!1sen!2shk'
};

function switchMap(city, e) {
  document.getElementById('mapFrame').src = mapUrls[city];
  document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
}

// ============================================================
// UTILS
// ============================================================
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============================================================
// BOOT
// ============================================================
window.addEventListener('DOMContentLoaded', async () => {
  setSyncStatus('connecting', '<i class="fa fa-circle-notch fa-spin"></i> Connecting to live sync...');
  try {
    await seedDefaults();
    startListeners();
  } catch(err) {
    setSyncStatus('error', '<i class="fa fa-triangle-exclamation"></i> Firebase error: ' + err.message);
    renderDays();
  }
});
