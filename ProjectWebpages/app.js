/*
  Project Robin — shared app helpers
  ------------------------------------
  Loaded by every page after project-robin.css and data/parts.js.
  Handles: reading/writing the parts list (baseline from data/parts.js,
  edits layered on top in localStorage so they persist and stay in sync
  between pages), the build log, and small formatting helpers.
*/

(function () {
  const PARTS_KEY = "robinParts";
  const LOG_KEY = "robinBuildLog";

  const STATUS_META = {
    installed: { label: "Installed", icon: "🟢", className: "status-installed" },
    purchased: { label: "Purchased", icon: "🔵", className: "status-purchased" },
    ordered: { label: "Ordered", icon: "🟡", className: "status-ordered" },
    needed: { label: "Needed", icon: "🔴", className: "status-needed" }
  };

  function loadParts() {
    try {
      const raw = localStorage.getItem(PARTS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read saved parts, falling back to seed data:", err);
    }
    const seed = Array.isArray(window.ROBIN_PARTS) ? window.ROBIN_PARTS : [];
    saveParts(seed);
    return seed.map((p) => ({ ...p }));
  }

  function saveParts(parts) {
    try {
      localStorage.setItem(PARTS_KEY, JSON.stringify(parts));
    } catch (err) {
      console.warn("Could not save parts to localStorage:", err);
    }
  }

  function resetPartsToSeed() {
    const seed = Array.isArray(window.ROBIN_PARTS) ? window.ROBIN_PARTS.map((p) => ({ ...p })) : [];
    saveParts(seed);
    return seed;
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function findPart(parts, id) {
    return parts.find((p) => p.id === id);
  }

  function updatePartStatus(id, status) {
    const parts = loadParts();
    const part = findPart(parts, id);
    if (part) {
      part.status = status;
      saveParts(parts);
    }
    return parts;
  }

  function addPart(newPart) {
    const parts = loadParts();
    let id = slugify(newPart.name || "new-part");
    let suffix = 2;
    const baseId = id;
    while (findPart(parts, id)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }
    const record = {
      id,
      name: newPart.name || "Untitled part",
      subsystem: newPart.subsystem || "Unassigned",
      status: newPart.status || "needed",
      estCost: newPart.estCost != null ? Number(newPart.estCost) : null,
      actualCost: newPart.actualCost != null ? Number(newPart.actualCost) : null,
      isEstimate: newPart.actualCost == null,
      pn: newPart.pn || "TBD",
      brand: newPart.brand || "TBD",
      installed: newPart.status === "installed",
      mileage: newPart.mileage != null ? Number(newPart.mileage) : null,
      torque: newPart.torque || "TBD — verify factory manual",
      lastChanged: newPart.lastChanged || (newPart.status === "installed" ? "Recorded" : "Not installed"),
      replacement: newPart.replacement || "Not set",
      rating: newPart.rating != null ? Number(newPart.rating) : null,
      recommendation: newPart.recommendation || "",
      notes: newPart.notes || ""
    };
    parts.push(record);
    saveParts(parts);
    return { parts, record };
  }

  function formatMoney(n) {
    if (n == null || Number.isNaN(Number(n))) return "TBD";
    return `$${Number(n).toLocaleString()}`;
  }

  function renderStars(rating) {
    if (rating == null) return "";
    const r = Math.max(0, Math.min(5, Math.round(rating)));
    return "★".repeat(r) + "☆".repeat(5 - r);
  }

  function statusPillHtml(status) {
    const meta = STATUS_META[status] || STATUS_META.needed;
    return `<span class="status-pill ${meta.className}">${meta.icon} ${meta.label}</span>`;
  }

  // ---- Build log ----
  function loadLog() {
    try {
      const raw = localStorage.getItem(LOG_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read saved build log:", err);
    }
    return [];
  }

  function saveLog(entries) {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(entries));
    } catch (err) {
      console.warn("Could not save build log:", err);
    }
  }

  function addLogEntry(entry) {
    const entries = loadLog();
    entries.unshift({
      date: entry.date || new Date().toISOString().slice(0, 10),
      installed: entry.installed || "",
      hours: entry.hours || "",
      problems: entry.problems || "None",
      solution: entry.solution || "",
      lessons: entry.lessons || ""
    });
    saveLog(entries);
    return entries;
  }

  // ---- Dependency / readiness checks ----
  function evaluateDependencyRule(rule, parts) {
    const items = rule.requirements.map((req) => {
      const part = findPart(parts, req.partId);
      const ready = !!part && rule.readyStatuses.includes(part.status);
      return {
        label: req.label,
        ready,
        status: part ? part.status : "missing",
        partId: req.partId
      };
    });
    const allReady = items.every((i) => i.ready);
    return { ...rule, items, allReady };
  }

  function dependencyChecklistHtml(rule, parts) {
    const evaluated = evaluateDependencyRule(rule, parts);
    const rows = evaluated.items
      .map((item) => {
        const icon = item.ready ? "✅" : "❌";
        const statusLabel = item.status === "missing" ? "not tracked yet" : (STATUS_META[item.status] || {}).label || item.status;
        return `<div class="alert-item${item.ready ? " ok" : ""}"><strong>${icon} ${item.label}</strong><span>Current status: ${statusLabel}</span></div>`;
      })
      .join("");
    const summary = evaluated.allReady
      ? `<div class="alert-item ok"><strong>✅ Ready</strong><span>${evaluated.description}</span></div>`
      : `<div class="alert-item"><strong>⏳ Not yet ready</strong><span>${evaluated.description}</span></div>`;
    return `<h4 style="margin: 0 0 10px;">${evaluated.title}</h4><div class="alert-list">${summary}${rows}</div>`;
  }

  window.RobinApp = {
    STATUS_META,
    loadParts,
    saveParts,
    resetPartsToSeed,
    updatePartStatus,
    addPart,
    findPart,
    slugify,
    formatMoney,
    renderStars,
    statusPillHtml,
    loadLog,
    saveLog,
    addLogEntry,
    evaluateDependencyRule,
    dependencyChecklistHtml
  };
})();
