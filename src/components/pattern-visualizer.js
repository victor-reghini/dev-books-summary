import { patternAnimations, buildObjectInspectorState } from "../../books/design-patterns/examples/pattern-animations.js";
import { cleanCodeAnimations } from "../../books/clean-code/examples/clean-code-animations.js";
import { grokkingAlgorithmsAnimations } from "../../books/grokking-algorithms/examples/grokking-algorithms-animations.js";
import { highlightJson } from "../utils/code-highlighter.js";
import { getLang, t } from "../../books/design-patterns/explanations/i18n.js";
import { cleanCodeAnimStepsI18n } from "../../books/design-patterns/examples/flowchart-i18n.js";
import { icons } from "./icons.js";

const paletteCycle = ["blue", "emerald", "cyan", "violet", "amber"];

function normalizeAnimSpec(raw, patternId = "") {
  if (!raw) return null;
  if (raw.steps?.[0]?.packet) return raw; // Already in GoF format

  const pid = patternId || raw.id || "";
  const isGrokking = String(pid).startsWith("ga-cap-");
  const ccI18n = cleanCodeAnimStepsI18n[pid] || cleanCodeAnimStepsI18n[raw.id];

  return {
    code: raw.code,
    layerIndex: raw.layerIndex || 1,
    scopeType: raw.scopeType === "CLASS" ? "CLASS" : "OBJECT",
    nodes: raw.nodes.map((n, idx) => ({
      id: n.id,
      label: n.label,
      stereotype: n.stereotype || n.stereo || "«participant»",
      addr: n.addr || (isGrokking ? `0xGA${idx}0` : `0xCC${idx}0`),
      x: n.x,
      y: n.y,
      color: n.color || paletteCycle[idx % paletteCycle.length]
    })),
    links: raw.links.map((l) => ({
      from: l.from,
      to: l.to,
      label: l.label,
      dashed: Boolean(l.dashed || l.style === "dashed")
    })),
    steps: raw.steps.map((s, idx) => {
      const nodeStates = {};
      (s.activeNodes || []).forEach((nid, i) => {
        nodeStates[nid] = i === 0 ? "CALLING" : "ACTIVE";
      });

      const enStep = ccI18n?.en?.steps?.[idx];
      const esStep = ccI18n?.es?.steps?.[idx];
      const itStep = ccI18n?.it?.steps?.[idx];
      const frStep = ccI18n?.fr?.steps?.[idx];

      return {
        id: idx + 1,
        tag: isGrokking
          ? {
              pt: `ETAPA 0${idx + 1} • FLUXO ALGORÍTMICO`,
              en: `STEP 0${idx + 1} • ALGORITHMIC FLOW`,
              es: `PASO 0${idx + 1} • FLUJO ALGORÍTMICO`,
              it: `PASSAGGIO 0${idx + 1} • FLUSSO ALGORITMICO`,
              fr: `ÉTAPE 0${idx + 1} • FLUX ALGORITHMIQUE`
            }
          : {
              pt: `ETAPA 0${idx + 1} • FLUXO CLEAN CODE`,
              en: `STEP 0${idx + 1} • CLEAN CODE FLOW`,
              es: `PASO 0${idx + 1} • FLUJO CÓDIGO LIMPIO`,
              it: `PASSAGGIO 0${idx + 1} • FLUSSO CODICE PULITO`,
              fr: `ÉTAPE 0${idx + 1} • FLUX DE CODE PROPRE`
            },
        title: {
          pt: s.title,
          en: enStep?.title || s.title,
          es: esStep?.title || s.title,
          it: itStep?.title || s.title,
          fr: frStep?.title || s.title
        },
        desc: {
          pt: s.narration,
          en: enStep?.narration || s.narration,
          es: esStep?.narration || s.narration,
          it: itStep?.narration || s.narration,
          fr: frStep?.narration || s.narration
        },
        packet: {
          from: s.from,
          to: s.to,
          call: s.call,
          returnVal: isGrokking ? "OK • STEP" : "OK • CLEAN",
          type: isGrokking ? "ALGO" : "REFACTOR"
        },
        activeNodes: s.activeNodes || [s.from, s.to],
        nodeStates,
        customState: s.state || {}
      };
    })
  };
}

let activeTimer = null;

function getBoxBorderPoint(center, target, w = 146, h = 58, extraOffset = 0) {
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  if (dx === 0 && dy === 0) return { x: center.x, y: center.y };

  const hw = w / 2;
  const hh = h / 2;
  const scale = Math.min(
    Math.abs(hw / (dx || 0.0001)),
    Math.abs(hh / (dy || 0.0001))
  );

  const bx = center.x + dx * scale;
  const by = center.y + dy * scale;

  if (extraOffset !== 0) {
    const dist = Math.hypot(dx, dy);
    const ox = (dx / dist) * extraOffset;
    const oy = (dy / dist) * extraOffset;
    return { x: bx + ox, y: by + oy };
  }

  return { x: bx, y: by };
}

function calculateSafePillPosition(fromNode, toNode, nodes, call) {
  const isSelfCall = fromNode.id === toNode.id;
  const callStr = call || "";
  const pillW = Math.max(120, Math.min(220, callStr.length * 7.2 + 24));
  const pillH = 28;

  if (isSelfCall) {
    const midX = Math.max(pillW / 2 + 10, Math.min(880 - pillW / 2 - 10, fromNode.x));
    const midY = Math.max(22, fromNode.y - 78);
    return { midX, midY, pillW, pillH, minY: fromNode.y, maxY: fromNode.y };
  }

  const rawMidX = (fromNode.x + toNode.x) / 2;
  const midX = Math.max(pillW / 2 + 10, Math.min(880 - pillW / 2 - 10, rawMidX));

  function hasCollision(x, y) {
    return nodes.some(n => {
      const ox = Math.abs(n.x - x) < (146 / 2 + pillW / 2 + 6);
      const oy = Math.abs(n.y - y) < (58 / 2 + pillH / 2 + 6);
      return ox && oy;
    });
  }

  const minY = Math.min(fromNode.y, toNode.y);
  const maxY = Math.max(fromNode.y, toNode.y);

  let candidates = [];
  if (minY >= 130) {
    candidates = [46, 38, 292, 308];
  } else if (maxY <= 130) {
    candidates = [288, 300, 46];
  } else {
    candidates = [46, 288, 165];
  }

  for (const cy of candidates) {
    if (!hasCollision(midX, cy)) {
      return { midX, midY: cy, pillW, pillH, minY, maxY };
    }
  }

  for (const dx of [-35, 35, -70, 70]) {
    const sx = Math.max(pillW / 2 + 10, Math.min(880 - pillW / 2 - 10, midX + dx));
    for (const cy of candidates) {
      if (!hasCollision(sx, cy)) {
        return { midX: sx, midY: cy, pillW, pillH, minY, maxY };
      }
    }
  }

  return { midX, midY: 46, pillW, pillH, minY, maxY };
}

export function stopActiveVisualizerTimer() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
}

export function renderPatternVisualizer(container, pattern) {
  stopActiveVisualizerTimer();

  const anim = normalizeAnimSpec(
    patternAnimations[pattern.id] ||
      cleanCodeAnimations[pattern.id] ||
      grokkingAlgorithmsAnimations[pattern.id],
    pattern.id
  );
  if (!anim) {
    container.innerHTML = "";
    return;
  }

  let currentStepIndex = 0;
  let isPlaying = false;
  let speedMs = 2600;
  let selectedTargetId = null;

  const nodesMap = {};
  anim.nodes.forEach(n => {
    nodesMap[n.id] = n;
  });

  function getLoc(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    const lang = getLang();
    return obj[lang] || obj.pt || obj.en || "";
  }

  function render() {
    const lang = getLang();
    const step = anim.steps[currentStepIndex];
    const totalSteps = anim.steps.length;

    const fromNode = nodesMap[step.packet.from] || anim.nodes[0];
    const toNode = nodesMap[step.packet.to] || anim.nodes[1] || anim.nodes[0];
    const isSelfCall = fromNode.id === toNode.id;

    const stateInfo = buildObjectInspectorState(anim.code, step, nodesMap, selectedTargetId);
    if (step.customState && stateInfo.data && stateInfo.data.attributes) {
      Object.assign(stateInfo.data.attributes, step.customState);
    }
    const currentTargetId = stateInfo.selectedNode.id;

    const pill = calculateSafePillPosition(fromNode, toNode, anim.nodes, step.packet.call);

    let leaderLineSvg = "";
    if (pill.midY < pill.minY - 29) {
      leaderLineSvg = `
        <line x1="${pill.midX}" y1="${pill.midY + 15}" x2="${pill.midX}" y2="${pill.minY - 29}" class="pe-pill-leader-line" />
        <circle cx="${pill.midX}" cy="${pill.minY - 29}" r="2.5" class="pe-pill-leader-dot" />
      `;
    } else if (pill.midY > pill.maxY + 29) {
      leaderLineSvg = `
        <line x1="${pill.midX}" y1="${pill.maxY + 29}" x2="${pill.midX}" y2="${pill.midY - 15}" class="pe-pill-leader-line" />
        <circle cx="${pill.midX}" cy="${pill.maxY + 29}" r="2.5" class="pe-pill-leader-dot" />
      `;
    }

    container.innerHTML = `
      <section class="pe-visualizer-shell" aria-label="${t("vizTitle")}">
        <!-- Top Protocol-Explorer Telemetry Strip -->
        <div class="pe-telemetry-bar">
          <div class="pe-telemetry-left">
            <span class="pe-status-pill">
              <span class="pe-status-dot"></span>
              ${t("nowLearning")}
            </span>
            <span class="pe-pattern-code-badge">${anim.code}</span>
            <strong class="pe-telemetry-name">${pattern.name}</strong>
            <span class="pe-step-count-pill">${totalSteps} ${t("stepsLabel")}</span>
          </div>

          <div class="pe-telemetry-right">
            <div class="pe-layer-indicator" title="${t("gofLayerLabel")}">
              <span class="pe-layer-label">${t("gofLayerLabel")}</span>
              <div class="pe-layer-blocks" role="group" aria-label="${t("gofLayerLabel")}">
                <span class="pe-layer-block ${anim.layerIndex === 1 ? "active creational" : ""}" title="${t("catCreational")}">1:C</span>
                <span class="pe-layer-block ${anim.layerIndex === 2 ? "active structural" : ""}" title="${t("catStructural")}">2:S</span>
                <span class="pe-layer-block ${anim.layerIndex === 3 ? "active behavioral" : ""}" title="${t("catBehavioral")}">3:B</span>
              </div>
            </div>

            <div class="pe-scope-indicator" title="${t("scopeLabel")}">
              <span class="pe-layer-label">${t("scopeLabel")}</span>
              <div class="pe-layer-blocks">
                <span class="pe-layer-block ${anim.scopeType === "CLASS" ? "active" : ""}">${t("scopeClass")}</span>
                <span class="pe-layer-block ${anim.scopeType === "OBJECT" ? "active" : ""}">${t("scopeObject")}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Interactive Timeline Scrubber -->
        <div class="pe-timeline-bar" role="tablist" aria-label="${t("stepsLabel")}">
          ${anim.steps.map((s, idx) => {
            const stateClass = idx === currentStepIndex ? "active" : (idx < currentStepIndex ? "completed" : "");
            return `
              <button
                type="button"
                role="tab"
                aria-selected="${idx === currentStepIndex}"
                class="pe-step-pill ${stateClass}"
                data-step-idx="${idx}"
              >
                <span class="pe-step-num">${idx < currentStepIndex ? "✓" : `0${s.id}`}</span>
                <span class="pe-step-tag">${getLoc(s.tag)}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Main SVG Topology & Animated Message Flow Canvas -->
        <div class="pe-canvas-container">
          <svg class="pe-topology-svg" viewBox="0 0 880 350" role="img" aria-label="${pattern.name} runtime topology">
            <defs>
              <marker id="pe-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" opacity="0.6" />
              </marker>
              <marker id="pe-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)" />
              </marker>
            </defs>

            <!-- Structural Connection Edges -->
            ${anim.links.map(link => {
              const n1 = nodesMap[link.from];
              const n2 = nodesMap[link.to];
              if (!n1 || !n2) return "";
              const isCurrentEdge =
                (step.packet.from === link.from && step.packet.to === link.to) ||
                (step.packet.from === link.to && step.packet.to === link.from);

              const isSelf = link.from === link.to;
              if (isSelf) {
                return `
                  <g class="pe-edge-group ${isCurrentEdge ? "is-active" : ""}">
                    <path
                      d="M ${n1.x - 30} ${n1.y - 29} C ${n1.x - 40} ${n1.y - 65}, ${n1.x + 40} ${n1.y - 65}, ${n1.x + 30} ${n1.y - 29}"
                      class="pe-edge-line ${link.dashed ? "dashed" : ""} ${isCurrentEdge ? "active" : ""}"
                      fill="none"
                      marker-end="url(#${isCurrentEdge ? "pe-arrow-active" : "pe-arrow-muted"})"
                    />
                  </g>
                `;
              }

              const p1 = getBoxBorderPoint(n1, n2, 146, 58, 0);
              const p2 = getBoxBorderPoint(n2, n1, 146, 58, 6);

              return `
                <g class="pe-edge-group ${isCurrentEdge ? "is-active" : ""}">
                  <line
                    x1="${p1.x}" y1="${p1.y}"
                    x2="${p2.x}" y2="${p2.y}"
                    class="pe-edge-line ${link.dashed ? "dashed" : ""} ${isCurrentEdge ? "active" : ""}"
                    marker-end="url(#${isCurrentEdge ? "pe-arrow-active" : "pe-arrow-muted"})"
                  />
                </g>
              `;
            }).join("")}

            <!-- Active Animated Packet Path & Gliding Capsule -->
            ${!isSelfCall ? (() => {
              const fp1 = getBoxBorderPoint(fromNode, toNode, 146, 58, 0);
              const fp2 = getBoxBorderPoint(toNode, fromNode, 146, 58, 6);
              return `
                <line
                  x1="${fp1.x}" y1="${fp1.y}"
                  x2="${fp2.x}" y2="${fp2.y}"
                  class="pe-active-flight-line"
                  marker-end="url(#pe-arrow-active)"
                />
                <circle r="6" class="pe-packet-dot">
                  <animateMotion
                    dur="${Math.max(0.9, speedMs / 1800)}s"
                    repeatCount="indefinite"
                    path="M ${fp1.x} ${fp1.y} L ${fp2.x} ${fp2.y}"
                  />
                </circle>
              `;
            })() : `
              <path
                d="M ${fromNode.x - 30} ${fromNode.y - 29} C ${fromNode.x - 40} ${fromNode.y - 65}, ${fromNode.x + 40} ${fromNode.y - 65}, ${fromNode.x + 30} ${fromNode.y - 29}"
                class="pe-self-loop-path"
                fill="none"
              />
              <circle r="6" class="pe-packet-dot">
                <animateMotion
                  dur="${Math.max(0.9, speedMs / 1800)}s"
                  repeatCount="indefinite"
                  path="M ${fromNode.x - 30} ${fromNode.y - 29} C ${fromNode.x - 40} ${fromNode.y - 65}, ${fromNode.x + 40} ${fromNode.y - 65}, ${fromNode.x + 30} ${fromNode.y - 29}"
                />
              </circle>
            `}

            <!-- Participant Nodes -->
            ${anim.nodes.map((node, nIdx) => {
              const isNodeActive = step.activeNodes && step.activeNodes.includes(node.id);
              const isSender = step.packet.from === node.id;
              const isReceiver = step.packet.to === node.id;
              const stateText = (step.nodeStates && step.nodeStates[node.id]) || "IDLE";
              const w = 146;
              const h = 58;
              const rx = node.x - w / 2;
              const ry = node.y - h / 2;
              return `
                <g
                  class="pe-node-group ${isNodeActive ? "active" : ""} ${isSender ? "is-sender" : ""} ${isReceiver ? "is-receiver" : ""} color-${node.color}"
                  data-node-idx="${nIdx}"
                  tabindex="0"
                  role="button"
                  aria-label="${node.label} ${node.stereotype} ${stateText}"
                >
                  <rect x="${rx}" y="${ry}" width="${w}" height="${h}" rx="8" class="pe-node-box" />
                  <text x="${node.x}" y="${ry + 15}" text-anchor="middle" class="pe-node-stereotype">${node.stereotype}</text>
                  <text x="${node.x}" y="${ry + 32}" text-anchor="middle" class="pe-node-title">${node.label}</text>
                  <text x="${rx + 10}" y="${ry + 49}" class="pe-node-addr">${node.addr}</text>
                  <text x="${rx + w - 10}" y="${ry + 49}" text-anchor="end" class="pe-node-state-badge">${stateText}</text>
                </g>
              `;
            }).join("")}

            <!-- Edge Labels Layer (Always on top of nodes with clean halo) -->
            <g class="pe-edge-labels-layer">
              ${anim.links.map(link => {
                const n1 = nodesMap[link.from];
                const n2 = nodesMap[link.to];
                if (!n1 || !n2) return "";
                const isCurrentEdge =
                  (step.packet.from === link.from && step.packet.to === link.to) ||
                  (step.packet.from === link.to && step.packet.to === link.from);

                const isSelf = link.from === link.to;
                if (isSelf) {
                  return `
                    <text
                      x="${n1.x}"
                      y="${n1.y - 68}"
                      text-anchor="middle"
                      class="pe-edge-label ${isCurrentEdge ? "active" : ""}"
                    >${link.label}</text>
                  `;
                }

                const p1 = getBoxBorderPoint(n1, n2, 146, 58, 0);
                const p2 = getBoxBorderPoint(n2, n1, 146, 58, 6);
                let lMidX = (p1.x + p2.x) / 2;
                let lMidY = (p1.y + p2.y) / 2;
                const isHorizontal = Math.abs(p1.y - p2.y) < 20;
                const isVertical = Math.abs(p1.x - p2.x) < 20;

                if (isHorizontal) {
                  lMidY -= 12;
                } else if (isVertical) {
                  lMidX += 8;
                } else {
                  lMidY -= 10;
                }

                return `
                  <text
                    x="${lMidX}"
                    y="${lMidY}"
                    text-anchor="${isVertical ? "start" : "middle"}"
                    class="pe-edge-label ${isCurrentEdge ? "active" : ""}"
                  >${link.label}</text>
                `;
              }).join("")}
            </g>

            <!-- Floating Call Packet Pill (Positioned above/below to never obstruct flowchart components) -->
            ${leaderLineSvg}
            <g class="pe-floating-packet-pill" transform="translate(${pill.midX}, ${pill.midY})">
              <rect x="${-pill.pillW / 2}" y="-15" width="${pill.pillW}" height="30" rx="6" class="pe-packet-pill-bg" />
              <text x="0" y="4" text-anchor="middle" class="pe-packet-pill-text">${step.packet.call}</text>
            </g>
          </svg>
        </div>

        <!-- Playback Controls & Step Narration Deck -->
        <div class="pe-controls-deck">
          <div class="pe-playback-buttons">
            <button type="button" class="pe-ctrl-btn primary" id="pe-btn-play" aria-label="${isPlaying ? t("btnPause") : t("btnPlay")}">
              ${isPlaying ? icons.pause || "❚❚" : icons.play || "▶"}
              <span>${isPlaying ? t("btnPause") : t("btnPlay")}</span>
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-prev" ${currentStepIndex === 0 ? "disabled" : ""} aria-label="${t("btnPrevStep")}">
              ← <span>${t("btnPrevStep")}</span>
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-next" ${currentStepIndex === totalSteps - 1 ? "disabled" : ""} aria-label="${t("btnNextStep")}">
              <span>${t("btnNextStep")}</span> →
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-reset" aria-label="${t("btnReset")}">
              ↺ <span>${t("btnReset")}</span>
            </button>
          </div>

          <div class="pe-speed-selector" role="group" aria-label="${t("speedLabel")}">
            <span class="pe-speed-label">${t("speedLabel")}:</span>
            <button type="button" class="pe-speed-btn ${speedMs === 3800 ? "active" : ""}" data-speed="3800">0.5x</button>
            <button type="button" class="pe-speed-btn ${speedMs === 2600 ? "active" : ""}" data-speed="2600">1x</button>
            <button type="button" class="pe-speed-btn ${speedMs === 1400 ? "active" : ""}" data-speed="1400">2x</button>
          </div>
        </div>

        <!-- Step Explanation Callout -->
        <div class="pe-step-narration-box">
          <div class="pe-step-narration-header">
            <span class="pe-step-badge">${t("stepPrefix")} 0${step.id}/0${totalSteps} • ${getLoc(step.tag)}</span>
            <code class="pe-inflight-code">${fromNode.label} → ${toNode.label} : ${step.packet.call} ⇒ ${step.packet.returnVal}</code>
          </div>
          <h3 class="pe-step-title">${getLoc(step.title)}</h3>
          <p class="pe-step-desc">${getLoc(step.desc)}</p>
        </div>

        <!-- Live Object State & Runtime Architecture Inspector -->
        <div class="pe-inspector-grid">
          <!-- Left: Call Stack & Runtime Participants -->
          <div class="pe-inspector-panel">
            <div class="pe-inspector-header">
              <span>${t("inspectorCallStackTitle")}</span>
              <span class="pe-inspector-sub">${fromNode.label} → ${toNode.label}</span>
            </div>
            <div class="pe-participants-list" role="listbox" aria-label="${t("inspectorCallStackTitle")}">
              <!-- Target Receiver Card -->
              <div
                class="pe-participant-card ${currentTargetId === toNode.id ? "selected" : ""} color-${toNode.color}"
                data-node-id="${toNode.id}"
                tabindex="0"
                role="option"
                aria-selected="${currentTargetId === toNode.id}"
              >
                <div class="pe-participant-header">
                  <span class="pe-participant-badge receiver">${t("tabReceiver")}</span>
                  <span class="pe-participant-addr">${toNode.addr}</span>
                </div>
                <strong class="pe-participant-title">${toNode.label}</strong>
                <div class="pe-participant-role">${toNode.stereotype}</div>
                <div class="pe-participant-state">
                  <span class="pe-state-indicator">●</span>
                  <span>${step.nodeStates[toNode.id] || "ACTIVE"}</span>
                </div>
              </div>

              <!-- Caller Sender Card -->
              <div
                class="pe-participant-card ${currentTargetId === fromNode.id ? "selected" : ""} color-${fromNode.color}"
                data-node-id="${fromNode.id}"
                tabindex="0"
                role="option"
                aria-selected="${currentTargetId === fromNode.id}"
              >
                <div class="pe-participant-header">
                  <span class="pe-participant-badge sender">${t("tabSender")}</span>
                  <span class="pe-participant-addr">${fromNode.addr}</span>
                </div>
                <strong class="pe-participant-title">${fromNode.label}</strong>
                <div class="pe-participant-role">${fromNode.stereotype}</div>
                <div class="pe-participant-state">
                  <span class="pe-state-indicator">●</span>
                  <span>${step.nodeStates[fromNode.id] || "CALLING"}</span>
                </div>
              </div>

              <!-- Scope Snapshot Card -->
              <div
                class="pe-participant-card ${currentTargetId === "snapshot" ? "selected" : ""}"
                data-node-id="snapshot"
                tabindex="0"
                role="option"
                aria-selected="${currentTargetId === "snapshot"}"
              >
                <div class="pe-participant-header">
                  <span class="pe-participant-badge snapshot">GLOBAL</span>
                  <span class="pe-participant-addr">${anim.nodes.length} NÓS</span>
                </div>
                <strong class="pe-participant-title">${t("tabSnapshot")}</strong>
                <div class="pe-participant-role">${step.packet.call} ⇒ ${step.packet.returnVal}</div>
              </div>
            </div>
          </div>

          <!-- Right: Live Object State Inspector -->
          <div class="pe-inspector-panel">
            <div class="pe-inspector-header">
              <span>${t("inspectorObjectTitle")}</span>
              <span class="pe-inspector-sub">${stateInfo.selectedNode.label} (${stateInfo.selectedNode.addr})</span>
            </div>

            <div class="pe-object-inspector-body">
              <!-- Highlighted Live JSON Object State -->
              <pre class="pe-object-state-code" tabindex="0"><code>${highlightJson(stateInfo.data)}</code></pre>

              <!-- State Mutation Callout -->
              <div class="pe-state-mutation-callout">
                <div class="pe-mutation-header">
                  <span class="pe-mutation-badge">${stateInfo.selectedNode.stereotype}</span>
                  <strong class="pe-mutation-title">${t("stateExplanationTitle")}</strong>
                </div>
                <p class="pe-mutation-desc">${getLoc(stateInfo.explanation)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    bindEvents();
  }

  function startTimer() {
    stopActiveVisualizerTimer();
    activeTimer = setInterval(() => {
      if (currentStepIndex < anim.steps.length - 1) {
        currentStepIndex++;
        render();
      } else {
        isPlaying = false;
        stopActiveVisualizerTimer();
        render();
      }
    }, speedMs);
  }

  function bindEvents() {
    // Step timeline clicks
    container.querySelectorAll(".pe-step-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        isPlaying = false;
        stopActiveVisualizerTimer();
        currentStepIndex = parseInt(btn.getAttribute("data-step-idx"), 10) || 0;
        render();
      });
    });

    // Play / Pause
    const btnPlay = container.querySelector("#pe-btn-play");
    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          if (currentStepIndex >= anim.steps.length - 1) {
            currentStepIndex = 0;
          }
          startTimer();
        } else {
          stopActiveVisualizerTimer();
        }
        render();
      });
    }

    // Prev
    const btnPrev = container.querySelector("#pe-btn-prev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentStepIndex > 0) {
          isPlaying = false;
          stopActiveVisualizerTimer();
          currentStepIndex--;
          render();
        }
      });
    }

    // Next
    const btnNext = container.querySelector("#pe-btn-next");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentStepIndex < anim.steps.length - 1) {
          isPlaying = false;
          stopActiveVisualizerTimer();
          currentStepIndex++;
          render();
        }
      });
    }

    // Reset
    const btnReset = container.querySelector("#pe-btn-reset");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        isPlaying = false;
        stopActiveVisualizerTimer();
        currentStepIndex = 0;
        render();
      });
    }

    // Speed buttons
    container.querySelectorAll(".pe-speed-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        speedMs = parseInt(btn.getAttribute("data-speed"), 10) || 2600;
        if (isPlaying) {
          startTimer();
        }
        render();
      });
    });

    // Node / Tab selection for live object inspector
    container.querySelectorAll("[data-node-id]").forEach(el => {
      const selectNode = () => {
        const id = el.getAttribute("data-node-id");
        if (id && id !== selectedTargetId) {
          selectedTargetId = id;
          render();
        }
      };
      el.addEventListener("click", selectNode);
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectNode();
        }
      });
    });

    // SVG node interaction in topology graph
    container.querySelectorAll(".pe-node-group").forEach(nodeEl => {
      const selectGraphNode = () => {
        const nodeIdx = parseInt(nodeEl.getAttribute("data-node-idx"), 10);
        const clickedNode = anim.nodes[nodeIdx];
        if (clickedNode && clickedNode.id !== selectedTargetId) {
          selectedTargetId = clickedNode.id;
          render();
        }
      };
      nodeEl.addEventListener("click", selectGraphNode);
      nodeEl.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectGraphNode();
        }
      });
    });
  }

  render();
}

