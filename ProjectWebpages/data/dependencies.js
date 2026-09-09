/*
  Project Robin — dependency/readiness rules
  ---------------------------------------------
  Each rule lists the part ids (from data/parts.js) that must be at or past
  a given status before a milestone is safe to attempt. These are checked
  live against the current parts data (seed + your localStorage edits), so
  the checklist here and on dependency-tracking.html always reflects real
  status, not a hardcoded snapshot.

  readyStatuses: which statuses count as "this requirement is satisfied".
*/

window.ROBIN_DEPENDENCIES = [
  {
    id: "turbo-install",
    title: "Turbo install readiness",
    description: "Everything the turbo needs in place before it goes on the engine.",
    readyStatuses: ["installed", "purchased"],
    requirements: [
      { partId: "turbo-oil-feed-return", label: "Oil feed & return lines" },
      { partId: "wastegate-boost-control", label: "Wastegate & boost control hardware" },
      { partId: "standalone-ecu", label: "ECU mapping & harness validation" },
      { partId: "exhaust-system", label: "Downpipe / exhaust path" }
    ]
  },
  {
    id: "engine-swap-start",
    title: "Engine swap — ready to fire",
    description: "Core dependencies before the M104 is started for the first time in the car.",
    readyStatuses: ["installed", "purchased"],
    requirements: [
      { partId: "m104-long-block", label: "M104 long block" },
      { partId: "engine-mounts-swap", label: "Mounts / cradle adaptation" },
      { partId: "wiring-harness-adaptation", label: "Wiring harness adaptation" },
      { partId: "standalone-ecu", label: "ECU mapping & harness validation" },
      { partId: "cooling-system-upgrade", label: "Cooling system" },
      { partId: "fuel-system-upgrade", label: "Fuel system" }
    ]
  },
  {
    id: "ride-height-adjustable",
    title: "Adjustable ride height ready",
    description: "Suspension pieces needed before the air-cup ride height adjustment can be used.",
    readyStatuses: ["installed"],
    requirements: [
      { partId: "bilstein-b8-air-cups", label: "Bilstein B8 struts/shocks + air cups" }
    ]
  }
];
