// ===== HOME PAGE =====
// ---- Data: edit this list to add/remove/reorder modules ----
const modules = [
  {
    icon: "❄️",
    title: "DASHBOARD",
    desc: "Overview of temperatures, zones, and KPIs. Quick status in one place.",
    color: "blue",
    cta: "OPEN MODULE",
    page: "dashboard",
    disabled: false
  },
  {
    icon: "🛎️",
    title: "ALARMS",
    desc: "Critical alerts, warnings, and event history. Fast triage for incidents.",
    color: "red",
    cta: "OPEN MODULE",
    page: "alarms",
    disabled: false
  },
  {
    icon: "🏠",
    title: "WAREHOUSE",
    desc: "Site zones, devices, and facility overview. Assets & monitoring panels.",
    color: "orange",
    cta: "OPEN MODULE",
    page: "warehouse",
    disabled: false
  },
  {
    icon: "🚚",
    title: "TRUCK",
    desc: "Fleet status, cold-chain monitoring, and routes. Door / temp snapshots.",
    color: "yellow",
    cta: "OPEN MODULE",
    page: "truck",
    disabled: false
  },
  {
    icon: "📍",
    title: "MAP",
    desc: "Sites, parking plan, and live geo overview. Quickly locate activity.",
    color: "brown",
    cta: "OPEN MODULE",
    page: "map",
    disabled: false
  },
  {
    icon: "🔑",
    title: "REPORTS",
    desc: "Demo summaries: KPIs, uptime, and energy highlights for stakeholders.",
    color: "green",
    cta: "COMING SOON",
    page: null,
    disabled: true
  }
];

function renderModules() {
  const grid = document.getElementById("cardsGrid");

  grid.innerHTML = modules.map(m => {
    const tag = m.disabled ? "div" : "a";
    const navAttr = m.disabled ? "" : `href="#" data-nav="${m.page}"`;
    const disabledClass = m.disabled ? "is-disabled" : "";

    return `
      <${tag} class="card ${disabledClass}" ${navAttr}>
        <div class="card__top">
          <div class="card__icon">${m.icon}</div>
          <div class="card__title">${m.title}</div>
        </div>
        <div class="card__footer card__footer--${m.color}">
          <div class="card__desc">${m.desc}</div>
          <div class="card__cta">${m.cta}</div>
        </div>
      </${tag}>
    `;
  }).join("");
}

renderModules();


// ===== DASHBOARD =====
(function(){

  const zones = [
    { name: "Chiller", temp: 6.5 },
    { name: "Air Handling Unit", temp: 15.2 },
    { name: "Cold Room", temp: 22.8 },
    { name: "Loading Bay", temp: 8.9 },
    { name: "Office Area", temp: 19.4 },
  ];
  function statusOf(t){ if(t<=10) return "normal"; if(t<20) return "warning"; return "alarm"; }
  document.getElementById("zoneGrid-dashboard").innerHTML = zones.map(z => `
    <div class="zone ${statusOf(z.temp)}">
      <div class="zone-title">${z.name}</div>
      <div class="temp">${z.temp}°C</div>
    </div>
  `).join("");

})();

// ===== ALARMS =====
(function(){

  const alarms = [
    { device: "chiller-01",   zone: "Chiller",     severity: "alarm",   message: "Compressor overload",      time: "02:14" },
    { device: "freezer-01",   zone: "Cold Room",   severity: "alarm",   message: "High temperature",         time: "01:52" },
    { device: "ruck-bay-co2", zone: "Loading Bay", severity: "warning", message: "CO₂ level elevated",       time: "01:10" },
    { device: "env-co2-ahu",  zone: "AHU",         severity: "warning", message: "Filter service due",       time: "00:44" },
    { device: "office-area",  zone: "Office",      severity: "normal",  message: "Door left open (resolved)",time: "00:20" },
  ];
  const label = { normal: "Normal", warning: "Warning", alarm: "Alarm" };
  document.getElementById("alarmRows").innerHTML = alarms.map(a => `
    <tr>
      <td>${a.device}</td>
      <td>${a.zone}</td>
      <td><span class="sev-pill ${a.severity}">${label[a.severity]}</span></td>
      <td>${a.message}</td>
      <td>${a.time}</td>
      <td><button class="ack-btn">Acknowledge</button></td>
    </tr>
  `).join("");

})();

// ===== WAREHOUSE =====
(function(){

  // ---- Plants overview data ----
  const plants = [
    { name: "warehouse", status: "online", desc: "General storage area – main cooling unit.", extra: "3 active alarms", extraRight: "CTRL-01 gateway", fill: 60 },
    { name: "Chiller", status: "offline", desc: "Main cooling unit. Padua, Italy.", extra: "2 active alarms device: chiller-01", extraRight: "", fill: 40 },
    { name: "hvac-ahu", status: "online", desc: "Air handling, temp & humidity.", extra: "1 warning model: env-co2-ahu", extraRight: "", fill: 75 },
    { name: "cold-room", status: "online", desc: "Refrigerated storage – Bologna, Italy.", extra: "room-temp OK device: freezer-01", extraRight: "", fill: 90 },
    { name: "loading-Bay", status: "offline", desc: "Truck loading / environment.", extra: "CO₂ high device: ruck-bay-co2", extraRight: "", fill: 30 },
    { name: "office-area", status: "online", desc: "Indoor comfort monitoring.", extra: "0 alarms comfort only", extraRight: "", fill: 95 },
  ];

  const gateways = [
    { name: "Gateways", status: "online", desc: "CTRL-01 &nbsp;•&nbsp; gw-logbot", extra: "Activated · plant: warehouse", extraRight: "Deactivated · test" },
    { name: "Devices", status: "online", desc: "chiller-01 · freezer-01 · ruck-bay-co2", extra: "All OK", extraRight: "" },
    { name: "Model: chiller", status: "online", desc: "room-temp · setpoint · defrost-active · alarms_count", extra: "0-13 °C / 1-12 °C / BOOL / BOOL", extraRight: "" },
  ];

  function renderPlantGrid(id, list){
    document.getElementById(id).innerHTML = list.map(p => `
      <div class="plant-card">
        <div class="p-head"><b>${p.name}</b><span class="status-chip ${p.status}">${p.status === "online" ? "● Online" : "● Offline"}</span></div>
        <div class="p-desc">${p.desc}</div>
        <div class="plant-foot"><span>${p.extra}</span><span>${p.extraRight}</span></div>
        <div class="mini-progress"><div class="fill" style="width:${p.fill}%"></div></div>
      </div>
    `).join("");
  }
  renderPlantGrid("plantsGrid", plants);
  renderPlantGrid("gatewaysGrid", gateways);

  // ---- Alarm trucks overview ----
  const trucks = [
    { name: "Freezer Truck", device: "freezer-01", status: "alarm",
      stats: [["Active alarms","7"], ["Supply temp","-18°C"], ["Defrost cycle","Running"]],
      tags: ["High alarm count","Door closed"] },
    { name: "Loading-Bay Truck", device: "ruck-bay-co2", status: "warning",
      stats: [["CO₂ level","1400 ppm"], ["Filter alarm","On"], ["Airflow","Low"]],
      tags: ["Check CO₂ & ventilation","Filter service recommended"] },
    { name: "Chiller", device: "chiller-01", status: "normal",
      stats: [["Room temp","6.5°C"], ["Setpoint","7.0°C"], ["Active alarms","0"]],
      tags: ["Compressor OK","No active alarms"] },
  ];
  const pillLabel = { normal: "Normal", warning: "Warning", alarm: "Alarm" };
  document.getElementById("truckCards-warehouse").innerHTML = trucks.map(t => `
    <div class="truck-card">
      <div class="head">
        <div><h4>${t.name}</h4><div class="device">Device: ${t.device}</div></div>
        <span class="pill ${t.status}">${pillLabel[t.status]}</span>
      </div>
      <div class="stats">${t.stats.map(([k,v]) => `${k}: <b>${v}</b><br>`).join("")}</div>
      <div class="tags">${t.tags.map(tag => `<span class="tag2">${tag}</span>`).join("")}</div>
    </div>
  `).join("");

  // ---- Alarms by device bars ----
  const alarmsByDevice = [
    { name: "freezer-01", count: 7, max: 7 },
    { name: "chiller-01", count: 5, max: 7 },
    { name: "hvac-ahu",   count: 3, max: 7 },
    { name: "loading-Bay",count: 2, max: 7 },
    { name: "office-area",count: 1, max: 7 },
  ];
  document.getElementById("alarmBars").innerHTML = alarmsByDevice.map(d => `
    <div class="bar-item">
      <div class="bl-top"><span>${d.name}</span><span>${d.count}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(d.count/d.max)*100}%"></div></div>
    </div>
  `).join("");

  // ---- Component health ----
  const health = [
    { name: "Outdoor Coil", status: "OK", cls: "health-ok" },
    { name: "Indoor Coil", status: "OK", cls: "health-ok" },
    { name: "Refrigerant Charge", status: "LOW", cls: "health-low" },
    { name: "Airflow", status: "OK", cls: "health-ok" },
    { name: "Filter Alarm", status: "ALARM", cls: "health-alarm" },
  ];
  document.getElementById("healthList").innerHTML = health.map(h => `
    <div><span>● ${h.name}</span><span class="${h.cls}">${h.status}</span></div>
  `).join("");

})();

// ===== TRUCK PANEL =====
(function(){

  // ---- Data: edit to update the page ----
  const logisticsRoads = [
    { label: "To Warehouse",   status: "normal",  leftText: "En route to warehouse…", rightText: "" },
    { label: "From Warehouse", status: "normal",  leftText: "", rightText: "Leaving warehouse – delivered" },
  ];

  const serviceRoads = [
    { status: "normal", leftText: "All systems ok", rightText: "Route recommended" },
    { status: "alarm",  leftText: "Route OK – all plants normal", rightText: "Alarm – service needed" },
  ];

  const visualRoads = [
    { status: "alarm", leftText: "Delivering to warehouse…", rightText: "" },
  ];

  const trucks = [
    {
      name: "Freezer Truck", device: "freezer-01", status: "alarm",
      stats: [["Active alarms","7"], ["Supply temp","-18°C"], ["Defrost cycle","Running"]],
      tags: ["High alarm count","Door closed"]
    },
    {
      name: "Loading-Bay Truck", device: "ruck-bay-co2", status: "warning",
      stats: [["CO₂ level","1400 ppm"], ["Filter alarm","On"], ["Airflow","Low"]],
      tags: ["Check CO₂ & ventilation","Filter service recommended"]
    },
    {
      name: "Chiller", device: "chiller-01", status: "normal",
      stats: [["Room temp","6.5°C"], ["Setpoint","7.0°C"], ["Active alarms","0"]],
      tags: ["Compressor OK","No active alarms"]
    },
  ];

  function buildRoad({status, leftText, rightText}){
    return `
      <div class="road">
        <div class="status-strip ${status}"></div>
        ${leftText ? `<div class="text-left">${leftText}</div>` : ""}
        ${rightText ? `<div class="text-right">${rightText}</div>` : ""}
        <div class="truck-icon">🚛</div>
        <div class="truck-badge right ${status}">${status === "alarm" ? "🚨" : status === "warning" ? "⚠️" : "🚚"}</div>
      </div>
    `;
  }

  function renderRoads(containerId, roads, withLabel){
    const el = document.getElementById(containerId);
    el.innerHTML = roads.map(r => `
      <div class="road-row">
        ${withLabel && r.label ? `<div class="road-label">${r.label}</div>` : ""}
        ${buildRoad(r)}
      </div>
    `).join("");
  }

  renderRoads("logisticsRoads", logisticsRoads, true);
  renderRoads("serviceRoads", serviceRoads, false);
  renderRoads("visualRoads", visualRoads, false);

  // ---- Truck overview cards ----
  const truckCards = document.getElementById("truckCards-truck");
  const pillLabel = { normal: "Normal", warning: "Warning", alarm: "Alarm" };
  truckCards.innerHTML = trucks.map(t => `
    <div class="truck-card">
      <div class="head">
        <div>
          <h4>${t.name}</h4>
          <div class="device">Device: ${t.device}</div>
        </div>
        <span class="pill ${t.status}">${pillLabel[t.status]}</span>
      </div>
      <div class="stats">
        ${t.stats.map(([k,v]) => `${k}: <b>${v}</b><br>`).join("")}
      </div>
      <div class="tags">
        ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
  `).join("");

  // ---- Overall alarm status chip, derived from truck data ----
  const worst = trucks.some(t => t.status === "alarm") ? "Alarm"
              : trucks.some(t => t.status === "warning") ? "Warning" : "Normal";
  document.getElementById("alarmStatusChip").textContent = worst;

})();

// ===== MAP (lazy-initialized by router) =====
(function(){

  // ---- Data: edit these values to update the whole page ----
  const zones = [
    { name: "Chiller",         temp: 6.5  },
    { name: "Air Handling Unit", temp: 15.2 },
    { name: "Cold Room",       temp: 22.8 },
    { name: "Loading Bay",     temp: 8.9  },
    { name: "Office Area",     temp: 19.4 },
  ];

  const devices = [
    { name: "FREEZER", alarms: 2, temp: "-18°C", door: "CLOSED" },
    { name: "CHILLER", alarms: 7, temp: "5°C",   door: "CLOSE"  },
    { name: "ELA ROOM", alarms: 0, temp: "22°C", door: "CLOSED" },
    { name: "OFFICE",  alarms: 0, temp: "21°C",  door: "OPEN"   },
  ];

  // markers: [lat, lng, status]  status: normal | warning | alarm
  const markers = [
    { lat: -36.85, lng: 174.76, status: "normal", label: "Auckland Site" },
    { lat: -41.28, lng: 173.28, status: "warning", label: "Nelson Depot"  },
    { lat: -43.53, lng: 172.63, status: "alarm",   label: "Christchurch Cold Store" },
    { lat: -46.41, lng: 168.35, status: "normal",  label: "Southland Store" },
    { lat: -45.87, lng: 170.50, status: "warning", label: "Dunedin Store" },
  ];

  function statusOf(temp){
    if (temp <= 10) return "normal";
    if (temp < 20) return "warning";
    return "alarm";
  }

  // ---- Render zone cards ----
  const zoneGrid = document.getElementById("zoneGrid-map");
  zones.forEach(z => {
    const st = statusOf(z.temp);
    const div = document.createElement("div");
    div.className = `zone ${st}`;
    div.innerHTML = `<div class="zone-title">${z.name}</div><div class="temp">${z.temp}°C</div>`;
    zoneGrid.appendChild(div);
  });

  // ---- Render device cards ----
  const deviceCards = document.getElementById("deviceCards");
  devices.forEach(d => {
    const doorClass = d.door === "OPEN" ? "door-open" : "door-closed";
    const card = document.createElement("div");
    card.className = "device-card";
    card.innerHTML = `
      <h3>${d.name}</h3>
      <div class="device-row alarms"><span class="label">🔔 Alarms</span><span class="value">${d.alarms}</span></div>
      <div class="device-row temp"><span class="label">🌡️ Temperature</span><span class="value">${d.temp}</span></div>
      <div class="device-row ${doorClass}"><span class="label">🚪 Door</span><span class="value">${d.door}</span></div>
    `;
    deviceCards.appendChild(card);
  });

  // ---- Map (created lazily by the router the first time this page is shown, ----
  // ---- since Leaflet can't size itself correctly inside a hidden container) ----
  function initMap() {
    const map = window.__leafletMap = L.map('map').setView([-41.5, 172.8], 5.2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const colors = { normal: "#22c55e", warning: "#eab308", alarm: "#dc2626" };
    markers.forEach(m => {
      L.circleMarker([m.lat, m.lng], {
        radius: 10,
        fillColor: colors[m.status],
        color: "#fff",
        weight: 2,
        fillOpacity: 0.95
      }).addTo(map).bindPopup(`<b>${m.label}</b><br>Status: ${m.status}`);
    });
  }
  window.initMap = initMap;

})();

// =====================================================
// ROUTER
// =====================================================
let mapInitialized = false;

function showPage(name) {
  document.querySelectorAll(".app-page").forEach(p => {
    p.classList.toggle("active", p.dataset.page === name);
  });
  window.scrollTo(0, 0);
  if (name === "map" && !mapInitialized) {
    mapInitialized = true;
    setTimeout(initMap, 50); // wait for the section to become visible before sizing the map
  } else if (name === "map" && window.__leafletMap) {
    setTimeout(() => window.__leafletMap.invalidateSize(), 50);
  }
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-nav]");
  if (!el) return;
  e.preventDefault();
  showPage(el.dataset.nav);
});