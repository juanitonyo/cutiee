const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      drawerOpen: false,
      dialogOpen: false,
      selectedPlace: null,
      activeImageIndex: 0,
      isMobile: window.innerWidth <= 768,
      places: [
        { 
          title: 'Unang kita hehe', 
          date: '12/14/2025', 
          lat: 14.5507296, 
          lng: 121.047822,
          images: ['images/bgc (coj)/bgc1.jpg'],
          description: 'Basta dito, nacute-an talaga ako sa\'yo HAHAHAA'
        },
        { 
          title: 'Maginhawa Fest (First pics wowerz)', 
          date: '12/14/2025', 
          lat: 14.6456, 
          lng: 121.0608,
          images: ['images/maginhawa fest/maginhawafest1.jpg', 'images/maginhawa fest/maginhawafest2.jpg'],
          description: 'Our first photo together! Dito sa Maginhawa Fest...'
        },
        { 
          title: 'First date~', 
          date: '01/30/2026', 
          lat: 14.7363856, 
          lng: 121.0575783,
          images: ['images/first date/firstdate1.jpg', 'images/first date/firstdate2.jpg', 'images/first date/firstdate3.jpg'],
          description: 'The first date na hindi pa first date daw. Sure ka ba? 😏'
        },
        { 
          title: 'Teralune swimmingggg', 
          date: '01/31/2026', 
          lat: 14.76112, 
          lng: 121.0293989,
          images: ['images/teralune/teralune1.png'],
          description: 'PASS SA HALATAAA!!!'
        },
        { 
          title: 'Quick review: Shaokao - di masarap', 
          date: '02/02/2026', 
          lat: 14.6461359, 
          lng: 121.0583708,
          images: ['images/bday pero aamin/shaokao.jpg'],
          description: 'Yah, ampangit.'
        },
        { 
          title: 'Ice creaaaam!!!', 
          date: '02/02/2026', 
          lat: 14.6461092, 
          lng: 121.0601238,
          images: ['images/bday pero aamin/icecream1.jpg','images/bday pero aamin/icecream2.jpg','images/bday pero aamin/icecream3.jpg'],
          description: 'Sponsored by Bini Mira. Panisss 🫶'
        },
        { 
          title: 'Ang clingy! Kalalaking tao >:(', 
          date: '02/02/2026', 
          lat: 14.6461359, 
          lng: 121.0583708,
          images: ['images/bday pero aamin/bgcdate1.jpg','images/bday pero aamin/bgcdate2.jpg','images/bday pero aamin/bgcdate3.jpg'],
          description: 'HAHAHAHHAA AYAW UMUWI?!?!?!'
        },
        { 
          title: 'Walang pake sa ma-issue :>', 
          date: '02/09/2026', 
          lat: 14.1416667, 
          lng: 121.0193695,
          images: ['images/tagaytay/tagaytay1.jpg','images/tagaytay/tagaytay2.jpg','images/tagaytay/tagaytay3.jpg','images/tagaytay/tagaytay4.jpg'],
          description: 'Ah, bakod na bakod'
        },
      ]
    }
  },
  methods: {
    zoomToPlace(place) {
      map.flyTo([place.lat, place.lng], 15, {
        animate: true,
        duration: 1.5
      });
      this.drawerOpen = false;
    },
    openPlaceDialog(place) {
      this.selectedPlace = place;
      this.activeImageIndex = 0;
      this.dialogOpen = true;
    },
    prevImage() {
      this.activeImageIndex = 
        this.activeImageIndex === 0 
        ? this.selectedPlace.images.length - 1 
        : this.activeImageIndex - 1;
    },
    nextImage() {
      this.activeImageIndex = 
        this.activeImageIndex === this.selectedPlace.images.length - 1 
        ? 0 
        : this.activeImageIndex + 1;
    },
  },
  mounted() {
    // Update isMobile on resize
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    const waitForMap = setInterval(() => {
      if (typeof map !== 'undefined') {
        clearInterval(waitForMap);
        plotPlaces(this.places, (place) => {
          this.openPlaceDialog(place);
        });
      }
    }, 100);
  },
});

app.use(PrimeVue.Config, {
  theme: {
    preset: PrimeUIX.Themes.Aura
  }
});

app.component('p-drawer', PrimeVue.Drawer);
app.component('p-timeline', PrimeVue.Timeline);
app.component('p-dialog', PrimeVue.Dialog);

app.mount('#app');