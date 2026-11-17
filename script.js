/* ==========================================================================
   EcoRoute — dashboard interaction layer
   Scope: sidebar navigation, form validation, and revealing/populating
   results. Route-calculation logic is intentionally NOT implemented here —
   the functions below are the integration points for the JS developer.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* Sidebar panel switching                                            */
  /* ------------------------------------------------------------------ */
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-panel]');
  const panels = document.querySelectorAll('.panel');
  const topbarTitle = document.getElementById('topbarTitle');

  const panelTitles = {
    'panel-overview': 'Overview',
    'panel-planner': 'Plan a Route',
    'panel-history': 'Trip History',
    'panel-impact': 'Impact Report',
  };

  function showPanel(panelId) {
    panels.forEach(p => p.classList.toggle('active', p.id === panelId));
    sidebarLinks.forEach(link => link.classList.toggle('active', link.dataset.panel === panelId));
    if (topbarTitle && panelTitles[panelId]) topbarTitle.textContent = panelTitles[panelId];
    closeMobileSidebar();
    document.querySelector('.dashboard-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => showPanel(link.dataset.panel));
  });

  // Buttons elsewhere on the page (e.g. Overview's CTA) that jump to a panel
  document.querySelectorAll('[data-goto-panel]').forEach(btn => {
    btn.addEventListener('click', () => showPanel(btn.dataset.gotoPanel));
  });

  /* ------------------------------------------------------------------ */
  /* Mobile sidebar toggle                                              */
  /* ------------------------------------------------------------------ */
  const sidebar = document.getElementById('dashboardSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('dashboardOverlay');

  function closeMobileSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
  }

  sidebarToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('open');
  });
  overlay?.addEventListener('click', closeMobileSidebar);

  /* ------------------------------------------------------------------ */
  /* Route planner form: validation + submit                           */
  /* ------------------------------------------------------------------ */
  const form = document.getElementById('plannerForm');
  const startInput = document.getElementById('start');
  const destinationInput = document.getElementById('destination');

  const setFieldError = (input, show) => {
    input.classList.toggle('invalid', show);
    const errorEl = form.querySelector(`.field-error[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.classList.toggle('show', show);
  };

  const validateForm = () => {
    let valid = true;

    if (!startInput.value.trim()) { setFieldError(startInput, true); valid = false; }
    else setFieldError(startInput, false);

    if (!destinationInput.value.trim()) { setFieldError(destinationInput, true); valid = false; }
    else setFieldError(destinationInput, false);

    return valid;
  };

  [startInput, destinationInput].forEach(input => {
    input.addEventListener('input', () => setFieldError(input, false));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO (JS developer): replace this with a real call to the
    // route/emissions calculation logic, keyed on `start` and
    // `destination` (and `distanceInput` if no map API is used).
    // renderResults() below expects a data object shaped like
    // PLACEHOLDER_RESULTS — populate it with real values and call
    // renderResults(realData) once calculations are available.
    renderResults(PLACEHOLDER_RESULTS);
    revealResults();
  });

  /* ------------------------------------------------------------------ */
  /* Placeholder result data (demo only — remove once real data flows) */
  /* ------------------------------------------------------------------ */
  const PLACEHOLDER_RESULTS = {
    car:   { distance: 42, fuel: 3.4, co2: 9.8 },
    bus:   { distance: 44, co2: 3.1 },
    train: { distance: 40, co2: 1.6 },
    bike:  { distance: 38, co2: 0 },
  };

  /**
   * Populates the DOM with a results object shaped like PLACEHOLDER_RESULTS.
   * This is the integration point the JS developer should call with
   * real data: renderResults(dataFromCalculationModule).
   */
  function renderResults(data) {
    document.getElementById('carDistance').textContent = `${data.car.distance} km`;
    document.getElementById('carFuel').textContent = `${data.car.fuel} L`;
    document.getElementById('carCO2').textContent = `${data.car.co2} kg`;

    document.getElementById('busDistance').textContent = `${data.bus.distance} km`;
    document.getElementById('busCO2').textContent = `${data.bus.co2} kg`;

    document.getElementById('trainDistance').textContent = `${data.train.distance} km`;
    document.getElementById('trainCO2').textContent = `${data.train.co2} kg`;

    document.getElementById('bikeDistance').textContent = `${data.bike.distance} km`;
    document.getElementById('bikeCO2').textContent = `${data.bike.co2} kg`;

    const distances = [data.car.distance, data.bus.distance, data.train.distance, data.bike.distance];
    document.getElementById('metricDistance').textContent =
      `${Math.min(...distances)}–${Math.max(...distances)} km`;
    document.getElementById('metricFuel').textContent = `${data.car.fuel} L`;
    const co2Values = [data.car.co2, data.bus.co2, data.train.co2, data.bike.co2];
    document.getElementById('metricCO2').textContent =
      `${Math.min(...co2Values)}–${Math.max(...co2Values)} kg`;

    const maxCO2 = Math.max(...co2Values, 1);
    const setBar = (barId, valueId, value) => {
      const pct = Math.max((value / maxCO2) * 100, value === 0 ? 2 : 4);
      document.getElementById(barId).style.width = `${pct}%`;
      document.getElementById(valueId).textContent = `${value} kg`;
    };
    setBar('barCar', 'barCarValue', data.car.co2);
    setBar('barBus', 'barBusValue', data.bus.co2);
    setBar('barTrain', 'barTrainValue', data.train.co2);
    setBar('barBike', 'barBikeValue', data.bike.co2);

    const modeLabels = { car: 'Car', bus: 'Bus', train: 'Train', bike: 'Bicycle' };
    const lowest = Object.entries(data).reduce((best, [mode, values]) =>
      values.co2 < best.values.co2 ? { mode, values } : best,
      { mode: 'car', values: data.car }
    );
    document.getElementById('ecoOption').textContent = modeLabels[lowest.mode];

    const recommendCard = document.querySelector('.recommend-card');
    const metricValueEl = recommendCard.querySelector('.recommend-metric .metric-value');
    if (metricValueEl) metricValueEl.textContent = `${lowest.values.co2} kg`;
  }

  function revealResults() {
    const resultsArea = document.getElementById('resultsArea');
    resultsArea.hidden = false;
    resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

});
