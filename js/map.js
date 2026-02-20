let map;

document.addEventListener('DOMContentLoaded', () => {
  map = L.map('map', {
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    zoomControl: true,
    tap: true,           // enable tap for mobile
    tapTolerance: 15,    // tap sensitivity
    touchZoom: true,     // pinch to zoom
  }).setView([14.5995, 120.9842], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 500);
});

function plotPlaces(places, onClickCallback) {
  places.forEach(place => {
    const icon = L.divIcon({
      className: '',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <!-- Heart shaped image - clip on img directly for better quality -->
          <div style="
            width: 60px;
            height: 60px;
            filter: drop-shadow(0 4px 10px rgba(37,99,235,0.5));
            animation: heartPulse 2s ease-in-out infinite;
          ">
            <img src="${place.images[0]}" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
              clip-path: path('M30 54 C30 54 4 36 4 19 C4 9 12 2 21 2 C25 2 30 6 30 6 C30 6 35 2 39 2 C48 2 56 9 56 19 C56 36 30 54 30 54Z');
            "/>
          </div>
          <!-- Pin tail -->
          <div style="width:3px; height:14px; background:#2563eb; border-radius:0 0 4px 4px; margin-top:-2px;"></div>
          <!-- Dot -->
          <div style="width:8px; height:8px; border-radius:50%; background:#2563eb; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
          <!-- Label -->
          <div style="
            margin-top: 4px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(4px);
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            color: #1e40af;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          ">${place.title}</div>
        </div>
      `,
      iconSize: [60, 110],
      iconAnchor: [30, 110],
      popupAnchor: [0, -110]
    });

    L.marker([place.lat, place.lng], { icon })
      .addTo(map)
      .on('click', () => {
        onClickCallback(place); // open Vue dialog
      });
  });
}