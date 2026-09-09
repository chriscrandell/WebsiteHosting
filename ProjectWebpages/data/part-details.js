/*
  Project Robin — extended part detail records
  ----------------------------------------------
  part-detail.html reads a ?part=<id> query string and looks up the matching
  record here (id must match a part's "id" in data/parts.js). Only a few
  parts have write-ups so far — as you work through the build, add a new
  entry keyed by the part's id and its detail page will "just exist" at
  part-detail.html?part=<id>, no new HTML file needed.

  diagram.status: "none" | "planned" | "ready"
    - "none": no diagram yet, page shows an empty slot.
    - "planned": you've noted it's coming; shows the note as a caption.
    - "ready": set diagram.src to an image/SVG path (e.g. inside a
      /diagrams folder next to this site) and it will be displayed.

  Torque values are left as "TBD — verify factory manual" on purpose.
  Don't fill in a number here unless it's confirmed against the W201/M104
  factory service manual (WIS/EPC) or the part's own install instructions.
*/

window.ROBIN_PART_DETAILS = {
  "m104-long-block": {
    overview: "Long block swap: M104 3.2L sourced from a 1996–97 W210, going into the W201 chassis in place of the original M102 1.8. Priority is reliability and longevity — this is the foundation the turbo build sits on.",
    difficulty: "Major — full engine swap",
    estHours: "TBD",
    tools: ["Engine hoist/crane", "Engine stand", "Full metric socket set", "Torque wrench (multiple ranges)", "Timing tools for M104"],
    procedure: [
      "Confirm donor engine compression and inspect timing components before pulling the trigger on the swap.",
      "Document and photograph the M102 removal for reference.",
      "Fabricate/adapt engine mounts and cradle to accept the M104 (see engine-mounts-swap).",
      "Dry-fit before final install to confirm accessory and turbo clearance.",
      "Confirm wiring harness and ECU plan (see wiring-harness-adaptation, standalone-ecu) before first start."
    ],
    torqueNotes: "TBD — verify factory manual (head bolts, main/rod caps, and mount hardware all have distinct specs and sequences).",
    alternatives: "Other M104 displacements were considered; 3.2L chosen for the torque curve and turbo response goals.",
    diagram: { status: "none", note: "" },
    buildNotes: ""
  },

  "turbo-kit": {
    overview: "Small-frame turbo sized to prioritize spool speed and throttle response over outright top-end, targeting roughly 300–350 hp at the wheels while keeping the car reliable as a daily driver.",
    difficulty: "Major",
    estHours: "TBD",
    tools: ["Flare wrench set", "Torque wrench", "Boost leak tester", "Gasket scraper"],
    procedure: [
      "Confirm oil feed and return routing before mounting the turbo (see turbo-oil-feed-return).",
      "Mount wastegate and boost control hardware (see wastegate-boost-control).",
      "Route intercooler piping with attention to underhood clearance (see intercooler-piping).",
      "Do not start the car until ECU mapping and harness validation are complete — see Dependency tracking."
    ],
    torqueNotes: "TBD — verify factory manual and the turbo manufacturer's install guide.",
    alternatives: "Larger frame turbos were considered and set aside in favor of responsiveness for hill climb and autocross use.",
    diagram: { status: "none", note: "" },
    buildNotes: ""
  },

  "bilstein-b8-air-cups": {
    overview: "Bilstein B8 struts/shocks paired with air cups for slight, on-demand ride-height adjustment — keeping the B8 damping character while letting the car sit low for events and higher for daily driving.",
    difficulty: "Moderate",
    estHours: "TBD",
    tools: ["Spring compressor (if applicable)", "Torque wrench", "Alignment equipment access (post-install)"],
    procedure: [
      "Install Bilstein B8 struts/shocks per kit instructions.",
      "Fit air cups and route air lines to the chosen compressor/tank location.",
      "Set baseline ride height, then get an alignment before the car goes back on the road."
    ],
    torqueNotes: "TBD — verify factory manual for strut mount and control arm hardware.",
    alternatives: "Full air suspension was not the goal — this is a small, controlled adjustment range on top of B8 damping.",
    diagram: { status: "none", note: "" },
    buildNotes: ""
  },

  "sparco-terra-wheels": {
    overview: "Sparco Terra wheels in bronze — the settled-on wheel choice after considering Gullideckel/\"manhole cover\" wheels, Maxilite 8×17s, OZ Racing rally wheels, and a white finish.",
    difficulty: "Easy (mount/balance) — fitment check recommended",
    estHours: "TBD",
    tools: ["Torque wrench", "Tire mounting/balancing (shop or in-house)"],
    procedure: [
      "Confirm offset/backspacing clears the suspension and brake package before ordering.",
      "Mount and balance tires.",
      "Torque wheel bolts to spec and re-check after the first heat cycle."
    ],
    torqueNotes: "TBD — verify factory manual for wheel bolt torque.",
    alternatives: "Gullideckel, Maxilite 8×17, OZ Racing, and white wheels were all considered and set aside.",
    diagram: { status: "none", note: "" },
    buildNotes: ""
  },

  "engine-mounts-swap": {
    overview: "Fabricated/adapted engine mounts and cradle to fit the M104 into the W201's M102 mount points.",
    difficulty: "Major — fabrication",
    estHours: "TBD",
    tools: ["Welder", "Fabrication table/jig", "Engine hoist for fit checks"],
    procedure: [
      "Mock up engine position for correct driveline angle and firewall/accessory clearance.",
      "Fabricate or adapt mount brackets.",
      "Verify under load (engine torque reaction) before committing to final welds."
    ],
    torqueNotes: "TBD — verify factory manual for mount hardware grade and torque.",
    alternatives: "Off-the-shelf M104-swap mount kits may exist depending on donor/recipient chassis pairing — worth checking before fully fabricating from scratch.",
    diagram: { status: "none", note: "" },
    buildNotes: ""
  }
};
