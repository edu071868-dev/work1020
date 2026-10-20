/**
 * 국방예산 & 주요사업 분야별·신규사업 대시보드
 * Client-side Reactive Application
 */

// ============================================================================
// 1. Initial Default Dataset (2027년 국방예산 정부안 기준)
// ============================================================================
const DEFAULT_DATASET = [
  {
    id: 1,
    sector: "① 자주국방 & 전작권 전환",
    name: "전작권 전환 및 자주국방 핵심전력 확보",
    unit: "억원",
    prev: 90222,
    curr: 121744,
    diff: 31522,
    rate: "34.9%",
    desc: "전작권 전환 및 자주국방 예산 34.9% 대폭 증액 (KF-21 양산, 핵추진잠수함 착수, L-SAM 등)",
    isNew: false
  },
  {
    id: 2,
    sector: "② 효율적 군 인력구조 전환",
    name: "상비예비군 운영 예산",
    unit: "억원",
    prev: 87,
    curr: 256,
    diff: 169,
    rate: "194.3%",
    desc: "평시 추가훈련을 통한 전시 즉각 전투력 발휘 보장 (+169억원 증액, 3,700명 → 7,000명)",
    isNew: false
  },
  {
    id: 3,
    sector: "② 효율적 군 인력구조 전환",
    name: "예비군 훈련비 총예산",
    unit: "억원",
    prev: 688,
    curr: 903,
    diff: 215,
    rate: "31.3%",
    desc: "’30년까지 최저시급 수준 지급 목표 단계적 인상 (+215억원, +31.3%, 동원훈련 13만원)",
    isNew: false
  },
  {
    id: 4,
    sector: "③ AI·유무인 복합체계(MUM-T)",
    name: "AI·유무인 복합체계 총예산",
    unit: "억원",
    prev: 4968,
    curr: 7727,
    diff: 2759,
    rate: "55.5%",
    desc: "첨단 유·무인 복합체계 전환 집중 투자 (+2,759억원, +55.5%, 로봇·무인감시 양산)",
    isNew: false
  },
  {
    id: 5,
    sector: "③ AI·유무인 복합체계(MUM-T)",
    name: "피지컬 AI 실증사업",
    unit: "억원",
    prev: 0,
    curr: 430,
    diff: 430,
    rate: "신규",
    desc: "[신규 430억원] 수송·주둔지 경계·위험물 취급 등 병력절감 효과 큰 분야 피지컬 AI 로봇 실증",
    isNew: true
  },
  {
    id: 6,
    sector: "④ 드론 / 대드론 역량강화",
    name: "드론·대드론 역량강화 예산",
    unit: "억원",
    prev: 6788,
    curr: 8061,
    diff: 1273,
    rate: "18.8%",
    desc: "공격형 드론 확충 및 다층 대드론 방어체계 고도화 (+1,273억원, +18.8%, 레이저 대공무기)",
    isNew: false
  },
  {
    id: 7,
    sector: "④ 드론 / 대드론 역량강화",
    name: "50만 드론전사 양성 교육훈련",
    unit: "억원",
    prev: 296,
    curr: 771,
    diff: 475,
    rate: "160.5%",
    desc: "교육용 상용드론 17,320대(+5,943대), 시뮬레이터 및 대드론 교육장비 대폭 확충 (+475억원, +160.5%)",
    isNew: false
  },
  {
    id: 8,
    sector: "⑤ 장병 복무여건 & 간부 처우",
    name: "부사관 단기복무장려금 총예산",
    unit: "억원",
    prev: 531.5,
    curr: 1152,
    diff: 620.5,
    rate: "116.7%",
    desc: "지원 인원 확대(9,600명) 및 단가 인상(1,000만→1,200만원) 반영 (+620.5억원, +116.7%)",
    isNew: false
  },
  {
    id: 9,
    sector: "⑤ 장병 복무여건 & 간부 처우",
    name: "단기복무 부사관 적금 매칭지원금",
    unit: "억원",
    prev: 0,
    curr: 189,
    diff: 189,
    rate: "신규",
    desc: "[신규 189억원] 기술집약형 부사관 육성, 월 최대 30만원(3년 만기 시 약 2,310만원 목돈 형성) 정부 매칭",
    isNew: true
  },
  {
    id: 10,
    sector: "⑤ 장병 복무여건 & 간부 처우",
    name: "간부 전세자금 지원단가 (관사 기준)",
    unit: "억원",
    prev: 2.11,
    curr: 2.24,
    diff: 0.13,
    rate: "6.2%",
    desc: "중위 전세가의 84% 수준으로 인상 (+6.2%, 관사 전세자금 지원 현실화)",
    isNew: false
  },
  {
    id: 11,
    sector: "⑤ 장병 복무여건 & 간부 처우",
    name: "간부숙소 미입주자 전세자금 지원",
    unit: "억원",
    prev: 0,
    curr: 1.05,
    diff: 1.05,
    rate: "신규",
    desc: "[신규 지원] 숙소 미배정 간부 1,054명 대상 전세자금 신규 지원 (주거복지 사각지대 해소)",
    isNew: true
  },
  {
    id: 12,
    sector: "⑤ 장병 복무여건 & 간부 처우",
    name: "병사 단체상해보험 도입",
    unit: "억원",
    prev: 0,
    curr: 69,
    diff: 69,
    rate: "신규",
    desc: "[신규 69억원] 군 복무 중 부상 시 합당한 보상을 위한 현역·상근 29만명 대상 단체상해보험 신설 ('27년 하반기)",
    isNew: true
  },
  {
    id: 13,
    sector: "⑥ 미래 국방기술 주권 확보",
    name: "국방반도체 R&D 기술개발",
    unit: "억원",
    prev: 132,
    curr: 565,
    diff: 433,
    rate: "328.0%",
    desc: "[신규 R&D 565억원] 국방반도체법 시행에 따른 무기체계 맞춤형 반도체 자립 및 전용 트랙 신설 (+328.0%)",
    isNew: false
  },
  {
    id: 14,
    sector: "⑥ 미래 국방기술 주권 확보",
    name: "한국형 첨단항공추진체계(엔진)",
    unit: "억원",
    prev: 0,
    curr: 90,
    diff: 90,
    rate: "신규",
    desc: "[신규 90억원] 무인전투기용 5,500 lbf급 엔진(20억) + 첨단엔진 기반기술(70억) 독자개발 착수",
    isNew: true
  },
  {
    id: 15,
    sector: "⑥ 미래 국방기술 주권 확보",
    name: "고출력 레이저 하드킬 기술",
    unit: "억원",
    prev: 0,
    curr: 121,
    diff: 121,
    rate: "신규",
    desc: "[신규 121억원] 첨단 지향성에너지 하드킬 요격 핵심기술 및 양자 기술 R&D 신규 착수",
    isNew: true
  },
  {
    id: 16,
    sector: "⑦ 방산 생태계 & 중소기업 육성",
    name: "K-방산 스타트업 발굴·육성",
    unit: "억원",
    prev: 54,
    curr: 124,
    diff: 70,
    rate: "129.6%",
    desc: "민간 혁신 기술기업의 방산 진입 1~3단계 전주기 패키지 지원 확대 (+129.6%)",
    isNew: false
  },
  {
    id: 17,
    sector: "⑦ 방산 생태계 & 중소기업 육성",
    name: "방산혁신기업 지원 예산",
    unit: "억원",
    prev: 659,
    curr: 758,
    diff: 99,
    rate: "15.0%",
    desc: "첨단 전략산업 개편 및 방산혁신기업 100개 → 200개 확대 지원 (+15.0%)",
    isNew: false
  },
  {
    id: 18,
    sector: "⑦ 방산 생태계 & 중소기업 육성",
    name: "중소기업 기술 軍 실증시험 지원",
    unit: "억원",
    prev: 78,
    curr: 174,
    diff: 96,
    rate: "123.1%",
    desc: "중소기업 개발품의 군 환경 실증 및 성능검증 과제 약 70개 규모로 대폭 확대 (+123.1%)",
    isNew: false
  },
  {
    id: 19,
    sector: "⑦ 방산 생태계 & 중소기업 육성",
    name: "중소기업 수출 패키지 지원",
    unit: "억원",
    prev: 512,
    curr: 627,
    diff: 115,
    rate: "22.5%",
    desc: "해외 시장 개척(278억), 글로벌 공급망 GVC30(348억) 진입 패키지 지원 (+22.5%)",
    isNew: false
  },
  {
    id: 20,
    sector: "⑧ 국민체감형 병무서비스",
    name: "생성형 AI 병무상담 챗봇 구축",
    unit: "억원",
    prev: 0,
    curr: 19,
    diff: 19,
    rate: "신규",
    desc: "[신규 19억원] RAG 및 AI 에이전트 기반의 24시간 원스톱 맞춤형 행정 상담 체계 구축",
    isNew: true
  },
  {
    id: 21,
    sector: "⑧ 국민체감형 병무서비스",
    name: "병무청 동원훈련 통합관리시스템",
    unit: "억원",
    prev: 0,
    curr: 14,
    diff: 14,
    rate: "신규",
    desc: "[신규 14억원] 국방부-병무청 이원화된 동원훈련 행정업무 병무청 일원화 시스템 구축",
    isNew: true
  },
  {
    id: 22,
    sector: "⑧ 국민체감형 병무서비스",
    name: "국외체류자 입영·소집 항공여비",
    unit: "억원",
    prev: 0,
    curr: 6,
    diff: 6,
    rate: "신규",
    desc: "[신규 6억원] 재외국민 자발적 병역이행 지원을 위한 국내 입국 편도항공료 신규 지원(약 400명)",
    isNew: true
  }
];

// ============================================================================
// 2. Application State
// ============================================================================
const state = {
  rawData: JSON.parse(JSON.stringify(DEFAULT_DATASET)),
  currentFileName: "2027년_국방예산.xlsx (기본 데이터)",
  filteredData: [],
  sectors: {},
  newProjects: [],
  activeSectorFilter: "all",
  activeTypeFilter: "all", // 'all' | 'new' | 'existing'
  searchQuery: "",
  sort: {
    field: "id",
    order: "asc" // 'asc' | 'desc'
  },
  charts: {
    sectorCompare: null,
    sectorShare: null,
    newRank: null,
    newSector: null
  }
};

// ============================================================================
// 3. Helper Functions: Number & Text Formatting
// ============================================================================
function formatNumber(num, fractionDigits = 0) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return Number(num).toLocaleString("ko-KR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2
  });
}

function parseNumber(val) {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  const str = String(val).replace(/,/g, "").trim();
  if (str === "" || str === "-" || str === "신규") return 0;
  const n = parseFloat(str);
  return isNaN(n) ? 0 : n;
}

function formatEokWon(amountEok) {
  if (!amountEok || amountEok === 0) return "0원";
  if (amountEok >= 10000) {
    const jo = (amountEok / 10000).toFixed(1);
    return `약 ${jo}조 원`;
  }
  return `약 ${formatNumber(amountEok)}억 원`;
}

// Escape HTML for security
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 4. Data Processing & Aggregation
// ============================================================================
function processData() {
  const sectorsMap = {};
  const newProjectsList = [];

  state.rawData.forEach((item, index) => {
    // Ensure item has ID
    if (!item.id) item.id = index + 1;

    // Detect if New Project
    const isExplicitNew =
      String(item.rate || "").includes("신규") ||
      String(item.name || "").includes("[신규") ||
      String(item.desc || "").includes("[신규") ||
      String(item.desc || "").includes("신규 ");
    const isZeroPrev = (!item.prev || item.prev === 0) && item.curr > 0;
    
    item.isNew = item.isNew !== undefined ? item.isNew : (isExplicitNew || isZeroPrev);

    // Calculate diff & rate if not available
    if (item.diff === undefined || item.diff === null || isNaN(item.diff)) {
      item.diff = item.curr - item.prev;
    }

    if (!item.rate || item.rate === "") {
      if (item.isNew || item.prev === 0) {
        item.rate = "신규";
      } else {
        const r = ((item.curr - item.prev) / item.prev) * 100;
        item.rate = `${r > 0 ? "+" : ""}${r.toFixed(1)}%`;
      }
    } else if (typeof item.rate === "number") {
      item.rate = `${(item.rate * 100).toFixed(1)}%`;
    }

    // Sector Aggregation
    const sectorKey = item.sector || "기타";
    if (!sectorsMap[sectorKey]) {
      sectorsMap[sectorKey] = {
        name: sectorKey,
        items: [],
        totalPrev: 0,
        totalCurr: 0,
        totalDiff: 0,
        newCount: 0,
        newCurr: 0
      };
    }

    sectorsMap[sectorKey].items.push(item);
    sectorsMap[sectorKey].totalPrev += item.prev || 0;
    sectorsMap[sectorKey].totalCurr += item.curr || 0;
    sectorsMap[sectorKey].totalDiff += (item.diff !== undefined ? item.diff : (item.curr - item.prev)) || 0;
    
    if (item.isNew) {
      sectorsMap[sectorKey].newCount += 1;
      sectorsMap[sectorKey].newCurr += item.curr || 0;
      newProjectsList.push(item);
    }
  });

  // Calculate sector growth rate
  Object.values(sectorsMap).forEach(sec => {
    if (sec.totalPrev > 0) {
      const r = ((sec.totalCurr - sec.totalPrev) / sec.totalPrev) * 100;
      sec.rate = `${r > 0 ? "+" : ""}${r.toFixed(1)}%`;
      sec.rateNum = r;
    } else {
      sec.rate = "신규";
      sec.rateNum = 999;
    }
  });

  state.sectors = sectorsMap;
  state.newProjects = newProjectsList.sort((a, b) => (b.curr || 0) - (a.curr || 0));

  applyFilterAndSort();
}

function applyFilterAndSort() {
  let list = [...state.rawData];

  // 1. Sector Filter
  if (state.activeSectorFilter !== "all") {
    list = list.filter(item => item.sector === state.activeSectorFilter);
  }

  // 2. Type Filter (All / New / Existing)
  if (state.activeTypeFilter === "new") {
    list = list.filter(item => item.isNew);
  } else if (state.activeTypeFilter === "existing") {
    list = list.filter(item => !item.isNew);
  }

  // 3. Search Query Filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter(item => {
      const name = (item.name || "").toLowerCase();
      const sector = (item.sector || "").toLowerCase();
      const desc = (item.desc || "").toLowerCase();
      return name.includes(q) || sector.includes(q) || desc.includes(q);
    });
  }

  // 4. Sort
  const { field, order } = state.sort;
  list.sort((a, b) => {
    let vA = a[field];
    let vB = b[field];

    if (field === "rate") {
      // Treat '신규' as highest growth
      vA = String(vA).includes("신규") ? 999999 : parseFloat(String(vA).replace(/[%+,]/g, "")) || 0;
      vB = String(vB).includes("신규") ? 999999 : parseFloat(String(vB).replace(/[%+,]/g, "")) || 0;
    } else if (typeof vA === "string") {
      return order === "asc" ? vA.localeCompare(vB) : vB.localeCompare(vA);
    }

    if (vA < vB) return order === "asc" ? -1 : 1;
    if (vA > vB) return order === "asc" ? 1 : -1;
    return 0;
  });

  state.filteredData = list;
  renderAll();
}

// ============================================================================
// 5. DOM Renderers: KPIs, Charts, Cards, Tables
// ============================================================================
function renderAll() {
  renderFileStatus();
  renderKPIs();
  renderCharts();
  renderSectorCards();
  renderNewProjectsSpotlight();
  renderTable();
  updatePillsAndDropdowns();
}

function renderFileStatus() {
  document.getElementById("currentFileName").textContent = state.currentFileName;
  document.getElementById("currentFileMeta").textContent = `${state.rawData.length}개 세부사업 분석 중 (${state.newProjects.length}건 신규)`;
  document.getElementById("navNewCount").textContent = state.newProjects.length;
}

function renderKPIs() {
  let totalPrev = 0;
  let totalCurr = 0;
  let totalDiff = 0;
  let totalNew = 0;

  state.rawData.forEach(item => {
    totalPrev += item.prev || 0;
    totalCurr += item.curr || 0;
    totalDiff += (item.diff !== undefined ? item.diff : (item.curr - item.prev)) || 0;
    if (item.isNew) {
      totalNew += item.curr || 0;
    }
  });

  const rate = totalPrev > 0 ? ((totalCurr - totalPrev) / totalPrev) * 100 : 0;
  const newShare = totalCurr > 0 ? (totalNew / totalCurr) * 100 : 0;

  // Find top investment sector
  let topSectorName = "-";
  let topSectorValue = 0;
  Object.values(state.sectors).forEach(sec => {
    if (sec.totalCurr > topSectorValue) {
      topSectorValue = sec.totalCurr;
      topSectorName = sec.name;
    }
  });
  const topSectorShare = totalCurr > 0 ? ((topSectorValue / totalCurr) * 100).toFixed(1) : 0;

  // Set KPI DOM
  document.getElementById("kpiCurrTotal").textContent = formatNumber(totalCurr);
  document.getElementById("kpiCurrTotalWon").textContent = formatEokWon(totalCurr);

  document.getElementById("kpiPrevTotal").textContent = formatNumber(totalPrev);
  document.getElementById("kpiPrevTotalWon").textContent = `전년도: ${formatEokWon(totalPrev)}`;

  document.getElementById("kpiDiffTotal").textContent = `${totalDiff >= 0 ? "+" : ""}${formatNumber(totalDiff)}`;
  document.getElementById("kpiRateTotal").textContent = `전년비: ${rate >= 0 ? "+" : ""}${rate.toFixed(1)}%`;

  document.getElementById("kpiNewTotal").textContent = formatNumber(totalNew);
  document.getElementById("kpiNewShare").textContent = `신규 비중: ${newShare.toFixed(1)}% (총 ${state.newProjects.length}개 사업)`;

  document.getElementById("kpiCountTotal").textContent = state.rawData.length;
  document.getElementById("kpiCountSub").textContent = `신규 ${state.newProjects.length}건 / 계속 ${state.rawData.length - state.newProjects.length}건`;

  document.getElementById("kpiTopSectorName").textContent = topSectorName;
  document.getElementById("kpiTopSectorValue").textContent = `${formatNumber(topSectorValue)}억원 (${topSectorShare}%)`;

  // Summary badge in New Projects section
  document.getElementById("newCountSummary").textContent = state.newProjects.length;
  document.getElementById("newAmountSummary").textContent = formatNumber(totalNew);
}

// Chart.js Visualizations
function renderCharts() {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded yet");
    return;
  }

  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  const textColor = isDark ? "#94a3b8" : "#475569";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)";

  const sectorEntries = Object.values(state.sectors);
  const sectorLabels = sectorEntries.map(s => s.name.replace(/^[①-⑩]\s*/, ""));
  const sectorPrev = sectorEntries.map(s => s.totalPrev);
  const sectorCurr = sectorEntries.map(s => s.totalCurr);

  // Palette
  const chartColors = [
    "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b",
    "#06b6d4", "#ec4899", "#6366f1", "#14b8a6"
  ];

  // 1. Sector Comparison Bar Chart
  const ctxCompare = document.getElementById("chartSectorCompare")?.getContext("2d");
  if (ctxCompare) {
    if (state.charts.sectorCompare) state.charts.sectorCompare.destroy();
    state.charts.sectorCompare = new Chart(ctxCompare, {
      type: "bar",
      data: {
        labels: sectorLabels,
        datasets: [
          {
            label: "2026년 기준 (억원)",
            data: sectorPrev,
            backgroundColor: isDark ? "rgba(148, 163, 184, 0.4)" : "#cbd5e1",
            borderRadius: 4
          },
          {
            label: "2027년 정부안 (억원)",
            data: sectorCurr,
            backgroundColor: "rgba(59, 130, 246, 0.85)",
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { family: "inherit", size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${formatNumber(ctx.parsed.y)} 억원`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor, font: { size: 10 } },
            grid: { display: false }
          },
          y: {
            ticks: {
              color: textColor,
              callback: val => formatNumber(val)
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // 2. Sector Share Donut Chart
  const ctxShare = document.getElementById("chartSectorShare")?.getContext("2d");
  if (ctxShare) {
    if (state.charts.sectorShare) state.charts.sectorShare.destroy();
    state.charts.sectorShare = new Chart(ctxShare, {
      type: "doughnut",
      data: {
        labels: sectorLabels,
        datasets: [{
          data: sectorCurr,
          backgroundColor: chartColors.slice(0, sectorLabels.length),
          borderWidth: 2,
          borderColor: isDark ? "#161e2e" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: textColor, font: { family: "inherit", size: 11 }, boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const val = ctx.parsed;
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                return ` ${ctx.label}: ${formatNumber(val)} 억원 (${pct}%)`;
              }
            }
          }
        },
        cutout: "60%"
      }
    });
  }

  // 3. New Projects Ranking Horizontal Bar Chart
  const ctxNewRank = document.getElementById("chartNewProjectsRank")?.getContext("2d");
  if (ctxNewRank) {
    if (state.charts.newRank) state.charts.newRank.destroy();

    const topNew = state.newProjects.slice(0, 8);
    const newLabels = topNew.map(item => item.name);
    const newValues = topNew.map(item => item.curr);

    state.charts.newRank = new Chart(ctxNewRank, {
      type: "bar",
      indexAxis: "y",
      data: {
        labels: newLabels,
        datasets: [{
          label: "2027년 예산 (억원)",
          data: newValues,
          backgroundColor: "rgba(139, 92, 246, 0.85)",
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` 편성예산: ${formatNumber(ctx.parsed.x)} 억원`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor, callback: val => formatNumber(val) },
            grid: { color: gridColor }
          },
          y: {
            ticks: { color: textColor, font: { size: 11 } },
            grid: { display: false }
          }
        }
      }
    });
  }

  // 4. New Projects Distribution by Sector
  const ctxNewSector = document.getElementById("chartNewBySector")?.getContext("2d");
  if (ctxNewSector) {
    if (state.charts.newSector) state.charts.newSector.destroy();

    const newSectorMap = {};
    state.newProjects.forEach(p => {
      const s = p.sector.replace(/^[①-⑩]\s*/, "");
      newSectorMap[s] = (newSectorMap[s] || 0) + p.curr;
    });

    const nLabels = Object.keys(newSectorMap);
    const nValues = Object.values(newSectorMap);

    state.charts.newSector = new Chart(ctxNewSector, {
      type: "doughnut",
      data: {
        labels: nLabels,
        datasets: [{
          data: nValues,
          backgroundColor: ["#8b5cf6", "#a855f7", "#c084fc", "#6366f1", "#ec4899", "#3b82f6"],
          borderWidth: 2,
          borderColor: isDark ? "#161e2e" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: textColor, font: { family: "inherit", size: 10 }, boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const val = ctx.parsed;
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                return ` ${ctx.label}: ${formatNumber(val)} 억원 (${pct}%)`;
              }
            }
          }
        },
        cutout: "55%"
      }
    });
  }
}

// Render Sector Cards & Interactive Accordion
function renderSectorCards() {
  const container = document.getElementById("sectorCardsContainer");
  if (!container) return;

  let totalAllCurr = 0;
  state.rawData.forEach(item => totalAllCurr += (item.curr || 0));

  let html = "";
  Object.values(state.sectors).forEach((sec, idx) => {
    const share = totalAllCurr > 0 ? ((sec.totalCurr / totalAllCurr) * 100).toFixed(1) : 0;
    const isUp = sec.totalDiff >= 0;

    html += `
      <div class="sector-card" data-sector-name="${escapeHtml(sec.name)}">
        <div class="sector-card-top" onclick="toggleSectorAccordion(this)">
          <div class="sector-header-row">
            <div class="sector-title-wrap">
              <span class="sector-badge-id">#${idx + 1}</span>
              <h3 class="sector-name">${escapeHtml(sec.name)}</h3>
            </div>
            <span class="sector-accordion-toggle">
              세부보기 ▼
            </span>
          </div>

          <div class="sector-metrics-row">
            <div class="sm-metric">
              <span class="sm-label">'27 정부안</span>
              <span class="sm-val text-blue">${formatNumber(sec.totalCurr)}억</span>
            </div>
            <div class="sm-metric">
              <span class="sm-label">증감액</span>
              <span class="sm-val ${isUp ? 'text-green' : ''}">${isUp ? '+' : ''}${formatNumber(sec.totalDiff)}억</span>
            </div>
            <div class="sm-metric">
              <span class="sm-label">증감률</span>
              <span class="sm-val ${isUp ? 'text-green' : ''}">${escapeHtml(sec.rate)}</span>
            </div>
          </div>

          <div class="sector-progress-wrap">
            <div class="sector-progress-bar">
              <div class="sector-progress-fill" style="width: ${Math.min(100, Math.max(2, share))}%;"></div>
            </div>
            <div class="sector-progress-label">
              <span>전체 재원 점유율</span>
              <span><strong>${share}%</strong> (${formatEokWon(sec.totalCurr)})</span>
            </div>
          </div>

          <div class="sector-footer-row">
            <div class="sector-tag-group">
              <span>총 ${sec.items.length}개 사업</span>
              ${sec.newCount > 0 ? `<span class="tag-new-count">신규 ${sec.newCount}건 (${formatNumber(sec.newCurr)}억)</span>` : ''}
            </div>
            <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.5rem;" onclick="filterByThisSector(event, '${escapeHtml(sec.name)}')">
              표 필터링
            </button>
          </div>
        </div>

        <div class="sector-sublist">
          ${sec.items.map(item => `
            <div class="subproject-item" onclick="openDetailModal(${item.id})">
              <div class="subproject-header">
                <span class="subproject-name">
                  ${item.isNew ? '<span class="badge-table-new">신규</span>' : ''}
                  ${escapeHtml(item.name)}
                </span>
                <span class="subproject-budget">${formatNumber(item.curr)} 억원</span>
              </div>
              <p class="subproject-desc">${escapeHtml(item.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Toggle single accordion
window.toggleSectorAccordion = function(element) {
  const card = element.closest('.sector-card');
  const sublist = card.querySelector('.sector-sublist');
  const toggleText = card.querySelector('.sector-accordion-toggle');
  
  if (sublist.classList.contains('is-open')) {
    sublist.classList.remove('is-open');
    toggleText.innerHTML = '세부보기 ▼';
  } else {
    sublist.classList.add('is-open');
    toggleText.innerHTML = '접기 ▲';
  }
};

// Filter by clicked sector
window.filterByThisSector = function(event, sectorName) {
  event.stopPropagation();
  state.activeSectorFilter = sectorName;
  document.getElementById("sectorFilterSelect").value = sectorName;
  applyFilterAndSort();
  showToast(`'${sectorName}' 분야로 필터링되었습니다.`, 'info');
  document.getElementById("sectionExplorer").scrollIntoView({ behavior: 'smooth' });
};

// Render New Projects Spotlight Cards
function renderNewProjectsSpotlight() {
  const container = document.getElementById("newCardsContainer");
  if (!container) return;

  if (state.newProjects.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">검출된 신규 사업이 없습니다.</div>`;
    return;
  }

  let html = "";
  state.newProjects.forEach(item => {
    html += `
      <div class="new-card" onclick="openDetailModal(${item.id})">
        <div>
          <div class="new-card-badge-row">
            <span class="badge-new-tag">✨ 신규 사업</span>
            <span class="new-card-sector" title="${escapeHtml(item.sector)}">${escapeHtml(item.sector)}</span>
          </div>
          <h3 class="new-card-title">${escapeHtml(item.name)}</h3>
          
          <div class="new-card-amount-box">
            <span class="new-card-amount-label">2027년 편성 예산</span>
            <span class="new-card-amount-value">${formatNumber(item.curr)} <small style="font-size:0.75rem;">${escapeHtml(item.unit || '억원')}</small></span>
          </div>

          <div class="new-card-desc">
            ${escapeHtml(item.desc)}
          </div>
        </div>

        <div class="new-card-footer">
          <button class="btn-detail-link">
            원문 근거 전문 확인 →
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Data Table
function renderTable() {
  const tbody = document.getElementById("dataTableBody");
  const rowCountInfo = document.getElementById("tableRowCountInfo");
  if (!tbody) return;

  if (state.filteredData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          일치하는 세부 사업이 없습니다. 검색어나 필터를 변경해 보세요.
        </td>
      </tr>
    `;
    rowCountInfo.textContent = `0건 표시 중 (전체 ${state.rawData.length}건)`;
    return;
  }

  let html = "";
  state.filteredData.forEach(item => {
    const isNew = item.isNew;
    const isUp = item.diff > 0;
    
    html += `
      <tr class="${isNew ? 'row-new' : ''}" onclick="openDetailModal(${item.id})">
        <td class="col-id">${item.id}</td>
        <td class="col-sector">${escapeHtml(item.sector)}</td>
        <td class="col-name">
          ${escapeHtml(item.name)}
          ${isNew ? '<span class="badge-table-new">신규</span>' : ''}
        </td>
        <td class="col-unit">${escapeHtml(item.unit || '억원')}</td>
        <td class="col-num">${formatNumber(item.prev)}</td>
        <td class="col-num"><strong>${formatNumber(item.curr)}</strong></td>
        <td class="col-num ${isUp ? 'text-green' : ''}">${isUp ? '+' : ''}${formatNumber(item.diff)}</td>
        <td class="col-num">
          ${isNew 
            ? '<span class="badge-table-rate-new">신규</span>' 
            : `<span class="${isUp ? 'badge-table-rate-up' : ''}">${escapeHtml(item.rate)}</span>`
          }
        </td>
        <td class="col-desc" title="${escapeHtml(item.desc)}">${escapeHtml(item.desc)}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  rowCountInfo.textContent = `총 ${state.rawData.length}건 중 ${state.filteredData.length}건 표시 중`;
}

// Update Filter Pills & Sector Dropdown
function updatePillsAndDropdowns() {
  // Counts
  const countAll = state.rawData.length;
  const countNew = state.newProjects.length;
  const countExisting = countAll - countNew;

  document.getElementById("countAllPill").textContent = countAll;
  document.getElementById("countNewPill").textContent = countNew;
  document.getElementById("countExistingPill").textContent = countExisting;

  // Sector dropdown
  const select = document.getElementById("sectorFilterSelect");
  if (select) {
    const curVal = state.activeSectorFilter;
    let optHtml = `<option value="all">모든 분야 전체</option>`;
    Object.keys(state.sectors).forEach(secName => {
      optHtml += `<option value="${escapeHtml(secName)}">${escapeHtml(secName)}</option>`;
    });
    select.innerHTML = optHtml;
    select.value = curVal;
  }
}

// ============================================================================
// 6. Modal Detail Viewer
// ============================================================================
window.openDetailModal = function(itemId) {
  const item = state.rawData.find(d => d.id === itemId);
  if (!item) return;

  document.getElementById("modalBadge").textContent = item.sector;
  document.getElementById("modalTitle").textContent = item.name;
  document.getElementById("modalId").textContent = `#${item.id}`;
  document.getElementById("modalPrev").textContent = `${formatNumber(item.prev)} ${item.unit || '억원'}`;
  document.getElementById("modalCurr").textContent = `${formatNumber(item.curr)} ${item.unit || '억원'}`;
  document.getElementById("modalDiff").textContent = `${item.diff >= 0 ? '+' : ''}${formatNumber(item.diff)} ${item.unit || '억원'}`;
  document.getElementById("modalRate").textContent = item.rate;
  
  const typeBadge = document.getElementById("modalTypeBadge");
  if (item.isNew) {
    typeBadge.innerHTML = `<span class="badge-new-tag">✨ 신규 사업</span>`;
  } else {
    typeBadge.innerHTML = `<span class="badge-tag">계속 사업</span>`;
  }

  document.getElementById("modalDesc").textContent = item.desc || "상세 설명이 등록되어 있지 않습니다.";

  const modal = document.getElementById("detailModal");
  modal.style.display = "flex";
};

function closeDetailModal() {
  document.getElementById("detailModal").style.display = "none";
}

// ============================================================================
// 7. File Upload & Intelligent Column Detection
// ============================================================================
function handleFile(file) {
  if (!file) return;

  const reader = new FileReader();
  const fileName = file.name;

  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      
      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON array of objects (raw row array)
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (!rows || rows.length < 2) {
        showToast("파일에 데이터가 충분하지 않습니다.", "error");
        return;
      }

      // Find header row (search first 5 rows for keywords like '분야' or '사업')
      let headerRowIdx = 0;
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        const row = rows[i];
        if (row && row.some(cell => String(cell).includes("분야") || String(cell).includes("사업") || String(cell).includes("연번"))) {
          headerRowIdx = i;
          break;
        }
      }

      const headers = rows[headerRowIdx].map(h => String(h || "").trim());

      // Intelligent column index mapping
      let colMap = {
        id: -1,
        sector: -1,
        name: -1,
        unit: -1,
        prev: -1,
        curr: -1,
        diff: -1,
        rate: -1,
        desc: -1
      };

      headers.forEach((h, idx) => {
        const clean = h.toLowerCase().replace(/[\s\(\)_-\[\]]/g, "");
        if (clean.includes("연번") || clean.includes("순번") || clean === "no" || clean === "id") {
          colMap.id = idx;
        } else if (clean.includes("분야") || clean.includes("중점영역") || clean.includes("대분야")) {
          colMap.sector = idx;
        } else if (clean.includes("세부사업") || clean.includes("사업명") || clean.includes("주요지표") || clean.includes("항목")) {
          colMap.name = idx;
        } else if (clean.includes("단위") || clean.includes("구분/단위")) {
          colMap.unit = idx;
        } else if (clean.includes("2026") || clean.includes("전년") || clean === "a") {
          colMap.prev = idx;
        } else if (clean.includes("2027") || clean.includes("정부안") || clean === "b" || clean.includes("당해")) {
          colMap.curr = idx;
        } else if (clean.includes("증감") || clean.includes("b-a") || clean.includes("증감액")) {
          colMap.diff = idx;
        } else if (clean.includes("증가율") || clean.includes("증감률") || clean.includes("%")) {
          colMap.rate = idx;
        } else if (clean.includes("원문") || clean.includes("핵심내용") || clean.includes("근거") || clean.includes("비고") || clean.includes("내용")) {
          colMap.desc = idx;
        }
      });

      // Fallback column positions if header mapping didn't find them (standard A to I layout)
      if (colMap.sector === -1) colMap.sector = 1;
      if (colMap.name === -1) colMap.name = 2;
      if (colMap.unit === -1) colMap.unit = 3;
      if (colMap.prev === -1) colMap.prev = 4;
      if (colMap.curr === -1) colMap.curr = 5;
      if (colMap.diff === -1) colMap.diff = 6;
      if (colMap.rate === -1) colMap.rate = 7;
      if (colMap.desc === -1) colMap.desc = 8;

      const parsedItems = [];
      for (let r = headerRowIdx + 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;

        const name = row[colMap.name];
        const sector = row[colMap.sector];
        if (!name && !sector) continue; // Skip blank lines

        const item = {
          id: colMap.id !== -1 && row[colMap.id] ? parseInt(row[colMap.id]) : parsedItems.length + 1,
          sector: String(sector || "기타").trim(),
          name: String(name || "").trim(),
          unit: colMap.unit !== -1 ? String(row[colMap.unit] || "억원").trim() : "억원",
          prev: parseNumber(row[colMap.prev]),
          curr: parseNumber(row[colMap.curr]),
          diff: colMap.diff !== -1 && row[colMap.diff] !== undefined ? parseNumber(row[colMap.diff]) : undefined,
          rate: colMap.rate !== -1 && row[colMap.rate] !== undefined ? String(row[colMap.rate]).trim() : "",
          desc: colMap.desc !== -1 && row[colMap.desc] ? String(row[colMap.desc]).trim() : ""
        };

        parsedItems.push(item);
      }

      if (parsedItems.length === 0) {
        showToast("추출된 유효 데이터가 없습니다. 서식을 확인해 주세요.", "warning");
        return;
      }

      state.rawData = parsedItems;
      state.currentFileName = fileName;
      state.activeSectorFilter = "all";
      state.activeTypeFilter = "all";
      state.searchQuery = "";
      
      processData();
      showToast(`성공: '${fileName}'에서 ${parsedItems.length}개 사업을 로드했습니다.`, "success");

    } catch (err) {
      console.error(err);
      showToast(`파일 처리 중 오류가 발생했습니다: ${err.message}`, "error");
    }
  };

  reader.readAsArrayBuffer(file);
}

// ============================================================================
// 8. Template & Export Features
// ============================================================================
function downloadTemplate() {
  const headers = [
    "연번",
    "분야 (중점영역)",
    "세부 사업 / 주요 지표",
    "구분/단위",
    "2026년 (A)",
    "2027년 정부안 (B)",
    "증감 (B-A)",
    "증가율 (%)",
    "핵심 내용 및 보도자료 박스 원문 근거"
  ];

  const sampleRows = [
    [1, "① 첨단전력 확보", "차세대 AI 방공무기 양산", "억원", 1000, 1500, 500, "50.0%", "조기전력화 추진"],
    [2, "② 유무인 복합체계", "드론봇 정찰 소대 신규 창설", "억원", 0, 320, 320, "신규", "[신규 320억원] 무인정찰체계 신설"]
  ];

  const csvContent = "\uFEFF" + [headers.join(","), ...sampleRows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "국방예산_대시보드_입력양식_템플릿.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("표준 CSV 서식 템플릿이 다운로드되었습니다.", "info");
}

function exportCurrentCSV() {
  const headers = [
    "연번",
    "분야 (중점영역)",
    "세부 사업 / 주요 지표",
    "구분/단위",
    "2026년 (A)",
    "2027년 정부안 (B)",
    "증감 (B-A)",
    "증가율 (%)",
    "핵심 내용 및 보도자료 박스 원문 근거"
  ];

  const rows = state.filteredData.map(item => [
    item.id,
    `"${item.sector}"`,
    `"${item.name}"`,
    `"${item.unit || '억원'}"`,
    item.prev,
    item.curr,
    item.diff,
    `"${item.rate}"`,
    `"${(item.desc || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `국방예산_필터데이터_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("현재 필터링된 데이터가 CSV로 내보내졌습니다.", "success");
}

function exportCurrentExcel() {
  if (typeof XLSX === "undefined") {
    showToast("XLSX 라이브러리를 불러올 수 없습니다. CSV로 내보내주세요.", "error");
    return;
  }

  const exportData = state.filteredData.map(item => ({
    "연번": item.id,
    "분야 (중점영역)": item.sector,
    "세부 사업 / 주요 지표": item.name,
    "구분/단위": item.unit || "억원",
    "2026년 (A)": item.prev,
    "2027년 정부안 (B)": item.curr,
    "증감 (B-A)": item.diff,
    "증가율 (%)": item.rate,
    "핵심 내용 및 보도자료 박스 원문 근거": item.desc
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "예산데이터");
  XLSX.writeFile(wb, `국방예산_대시보드_${new Date().toISOString().slice(0, 10)}.xlsx`);
  showToast("Excel(.xlsx) 파일이 생성되었습니다.", "success");
}

// Reset to default
function resetDefaultData() {
  state.rawData = JSON.parse(JSON.stringify(DEFAULT_DATASET));
  state.currentFileName = "2027년_국방예산.xlsx (기본 데이터)";
  state.activeSectorFilter = "all";
  state.activeTypeFilter = "all";
  state.searchQuery = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("btnClearSearch").style.display = "none";
  processData();
  showToast("기본 2027년 국방예산안 데이터로 복원되었습니다.", "info");
}

// ============================================================================
// 9. Toast Notification System
// ============================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "warning") icon = "⚠️";
  if (type === "error") icon = "❌";

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ============================================================================
// 10. Event Listeners & Initialization
// ============================================================================
document.addEventListener("DOMContentLoaded", function() {
  // 1. Initial Data Process
  processData();

  // 2. File Upload input
  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function(e) {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });

  // 3. Drag & Drop on entire window
  window.addEventListener("dragover", function(e) {
    e.preventDefault();
    document.body.classList.add("dragover");
    document.getElementById("dropZoneNotice")?.classList.add("is-active");
  });

  window.addEventListener("dragleave", function(e) {
    if (e.clientX <= 0 || e.clientY <= 0) {
      document.body.classList.remove("dragover");
      document.getElementById("dropZoneNotice")?.classList.remove("is-active");
    }
  });

  window.addEventListener("drop", function(e) {
    e.preventDefault();
    document.body.classList.remove("dragover");
    document.getElementById("dropZoneNotice")?.classList.remove("is-active");
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // 4. Download template & Reset buttons
  document.getElementById("btnDownloadTemplate").addEventListener("click", downloadTemplate);
  document.getElementById("btnResetData").addEventListener("click", resetDefaultData);
  document.getElementById("btnExportCSV").addEventListener("click", exportCurrentCSV);
  document.getElementById("btnExportExcel").addEventListener("click", exportCurrentExcel);
  document.getElementById("btnPrint").addEventListener("click", () => window.print());

  // 5. Theme Toggle
  const btnTheme = document.getElementById("btnThemeToggle");
  const darkIcon = btnTheme.querySelector(".theme-icon-dark");
  const lightIcon = btnTheme.querySelector(".theme-icon-light");

  const savedTheme = localStorage.getItem("budget_dashboard_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  btnTheme.addEventListener("click", function() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("budget_dashboard_theme", next);
    updateThemeIcons(next);
    renderCharts();
  });

  function updateThemeIcons(theme) {
    if (theme === "dark") {
      darkIcon.style.display = "inline";
      lightIcon.style.display = "none";
    } else {
      darkIcon.style.display = "none";
      lightIcon.style.display = "inline";
    }
  }

  // 6. Search Input
  const searchInput = document.getElementById("searchInput");
  const btnClearSearch = document.getElementById("btnClearSearch");

  searchInput.addEventListener("input", function(e) {
    state.searchQuery = e.target.value;
    btnClearSearch.style.display = state.searchQuery ? "block" : "none";
    applyFilterAndSort();
  });

  btnClearSearch.addEventListener("click", function() {
    searchInput.value = "";
    state.searchQuery = "";
    btnClearSearch.style.display = "none";
    applyFilterAndSort();
  });

  // 7. Sector Filter Dropdown
  document.getElementById("sectorFilterSelect").addEventListener("change", function(e) {
    state.activeSectorFilter = e.target.value;
    applyFilterAndSort();
  });

  // 8. Type Filter Pills (All / New / Existing)
  document.querySelectorAll(".pill-btn[data-type-filter]").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".pill-btn[data-type-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeTypeFilter = btn.getAttribute("data-type-filter");
      applyFilterAndSort();
    });
  });

  // 9. Table Header Sort
  document.querySelectorAll(".data-table th.sortable").forEach(th => {
    th.addEventListener("click", function() {
      const field = th.getAttribute("data-sort");
      if (state.sort.field === field) {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
      } else {
        state.sort.field = field;
        state.sort.order = "desc";
      }
      applyFilterAndSort();
    });
  });

  // 10. Sector Accordion Expand/Collapse All
  document.getElementById("btnExpandAllSectors")?.addEventListener("click", function() {
    document.querySelectorAll(".sector-sublist").forEach(el => el.classList.add("is-open"));
    document.querySelectorAll(".sector-accordion-toggle").forEach(el => el.innerHTML = "접기 ▲");
  });

  document.getElementById("btnCollapseAllSectors")?.addEventListener("click", function() {
    document.querySelectorAll(".sector-sublist").forEach(el => el.classList.remove("is-open"));
    document.querySelectorAll(".sector-accordion-toggle").forEach(el => el.innerHTML = "세부보기 ▼");
  });

  // 11. Modal Close
  document.getElementById("btnModalClose")?.addEventListener("click", closeDetailModal);
  document.getElementById("btnModalConfirm")?.addEventListener("click", closeDetailModal);
  document.getElementById("detailModal")?.addEventListener("click", function(e) {
    if (e.target === this) closeDetailModal();
  });

  // 12. Smooth Scroll Subnav Active Link Update
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", function() {
    const fromTop = window.scrollY + 120;
    navLinks.forEach(link => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const section = document.querySelector(targetId);
        if (section) {
          if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
          }
        }
      }
    });
  });
});
