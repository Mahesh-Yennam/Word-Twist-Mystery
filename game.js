/**
 * Word Twist Mystery - Core Game Engine
 * Atmospheric Noir Anagram Detective Vocabulary Challenge
 * Pure Vanilla JavaScript & Synthesized Web Audio API
 */

(function () {
  'use strict';

  // --- Sound Engine (Web Audio API) ---
  let audioCtx = null;
  let isMuted = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      if (type === 'tap') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'pop') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'twist') {
        // Whoosh pitch sweep
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'valid') {
        // Ascending major chord
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.22);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.22);
        });
      } else if (type === 'master') {
        // Grand 4-note victory chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.24, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.4);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.4);
        });
      } else if (type === 'buzz') {
        // Low error buzz
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'hint') {
        // Ethereal bell ping
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'caseSolved') {
        // Triumphant Fanfare
        [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.11);
          gain.gain.setValueAtTime(0.28, now + idx * 0.11);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.11 + 0.5);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.11);
          osc.stop(now + idx * 0.11 + 0.5);
        });
      } else if (type === 'timeout') {
        // Descending cold tone
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.5);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // --- Curated Noir Detective Case Files & Lexicons ---
  // Each case contains a title, the 6 available letters, and the complete set of valid dictionary anagram words.
  const CASE_DOSSIERS = [
    {
      title: 'Case #1: The Brass Pocketwatch',
      letters: 'PLANET',
      words: [
        // 3-letters
        'ALE', 'ALP', 'ALT', 'ANT', 'APE', 'APT', 'ATE', 'EAT', 'LAP', 'LET', 'NET', 'PAL', 'PAN', 'PAT', 'PEA', 'PEN', 'PET', 'PLE', 'TAN', 'TAP', 'TEA', 'TEN',
        // 4-letters
        'LANE', 'LATE', 'LEAN', 'LEAP', 'LEPT', 'NAPE', 'NEAT', 'PALE', 'PANE', 'PANT', 'PATE', 'PEAL', 'PEAT', 'PELT', 'PLAN', 'PLAT', 'PLEA', 'TALE', 'TAPE', 'TEAL',
        // 5-letters
        'LEANT', 'LEPTA', 'PANEL', 'PETAL', 'PLANE', 'PLANT', 'PLATE', 'PLEAT',
        // 6-letter master
        'PLANET'
      ]
    },
    {
      title: 'Case #2: The Whispering Gallery',
      letters: 'STREAM',
      words: [
        'ARE', 'ARM', 'ART', 'EAR', 'ERA', 'MAT', 'RAM', 'RAT', 'SAM', 'SAT', 'SEA', 'SET', 'TAR', 'TEA',
        'ARMS', 'ARTS', 'EAST', 'MAST', 'MATE', 'MATS', 'MEAT', 'RAMS', 'RATE', 'RATS', 'REST', 'SEAM', 'SEAT', 'STAR', 'STEM', 'TEAM', 'TEAR', 'TERM',
        'ASTER', 'MATES', 'MEATS', 'RATES', 'RESAT', 'SMART', 'SMEAR', 'STARE', 'STEAM', 'TAMES', 'TEAMS', 'TEARS', 'TERMS',
        'MASTER', 'STREAM'
      ]
    },
    {
      title: 'Case #3: The Midnight Garden',
      letters: 'GARDEN',
      words: [
        'AGE', 'AND', 'ARE', 'DAN', 'DEN', 'EAR', 'END', 'ERA', 'GAD', 'RAD', 'RAG', 'RAN', 'RED',
        'AGED', 'DARE', 'DARN', 'DEAN', 'DEAR', 'EARN', 'GEAR', 'NEAR', 'RAGE', 'RAND', 'READ', 'REND',
        'ANGER', 'DANGER', 'RANGED',
        'DANGER', 'GARDEN'
      ]
    },
    {
      title: 'Case #4: The Silver Chalice',
      letters: 'SILVER',
      words: [
        'IRE', 'LIE', 'REI', 'REV', 'SIR', 'VIE',
        'EVIL', 'ISLE', 'LIER', 'LIES', 'LIVE', 'RILE', 'RISE', 'RIVE', 'SIRE', 'VEIL', 'VIER', 'VILE',
        'LIVER', 'LIVES', 'RIVES', 'SLIER', 'VEILS',
        'SILVER'
      ]
    },
    {
      title: 'Case #5: The Starlight Express',
      letters: 'FLIGHT',
      words: [
        'FIG', 'FIT', 'GIG', 'HIT', 'LIG', 'LIT',
        'GIFT', 'GILT', 'HILT', 'LIFT',
        'LIGHT',
        'FLIGHT'
      ]
    },
    {
      title: 'Case #6: The Ancient Castle Crypt',
      letters: 'CASTLE',
      words: [
        'ACT', 'ALE', 'ALT', 'ATE', 'CAT', 'EAR', 'EAT', 'LET', 'SAC', 'SEA', 'SET', 'TEA',
        'ACTS', 'ALES', 'ALTS', 'CATS', 'LACE', 'LAST', 'LATE', 'LEAT', 'LEST', 'SALE', 'SALT', 'SCAT', 'SEAL', 'SEAT', 'SECT', 'SLAT', 'TALE', 'TEAL',
        'CASTE', 'LACES', 'LEAST', 'SLATE', 'STALE', 'STEAL', 'TALES', 'TEALS',
        'CASTLE'
      ]
    },
    {
      title: 'Case #7: The Golden Sovereign',
      letters: 'GOLDEN',
      words: [
        'DEN', 'DOE', 'DOG', 'DON', 'EGO', 'END', 'GEL', 'GOD', 'LED', 'LOG', 'NOD', 'OLD', 'ONE',
        'DOGE', 'DONE', 'GLEN', 'GOLD', 'GONE', 'LODE', 'LONE', 'LONG', 'NODE', 'NOEL', 'OGLE',
        'LODGE', 'OGLED',
        'GOLDEN'
      ]
    },
    {
      title: 'Case #8: The Velvet Shadow',
      letters: 'SPRING',
      words: [
        'GIN', 'NIP', 'PIG', 'PIN', 'RIG', 'RIN', 'RIP', 'SIN', 'SIP', 'SIR',
        'GRIN', 'GRIP', 'IRNS', 'PIGS', 'PING', 'PINS', 'PIRN', 'RIGS', 'RING', 'RIPS', 'SIGN', 'SING', 'SPIN',
        'GRINS', 'GRIPS', 'PRIGS', 'RINGS',
        'SPRING'
      ]
    },
    {
      title: 'Case #9: The Winter Masquerade',
      letters: 'WINTER',
      words: [
        'NET', 'NEW', 'NEWT', 'NIT', 'TIE', 'TIN', 'TWIN', 'WET', 'WIN', 'WIRE', 'WIT',
        'RENT', 'RITE', 'TIER', 'TIRE', 'TWIN', 'VENT', 'WENT', 'WIRE', 'WITE', 'WRIT',
        'INTER', 'TWINE', 'WRITE',
        'WINTER'
      ]
    },
    {
      title: 'Case #10: The Cryptic Dancer',
      letters: 'DANCER',
      words: [
        'ACE', 'AND', 'ARC', 'ARE', 'CAN', 'CAR', 'DAN', 'DEN', 'EAR', 'END', 'ERA', 'RAD', 'RAN', 'RED',
        'ACED', 'ACRE', 'CADRE', 'CANE', 'CARD', 'CARE', 'DACE', 'DARE', 'DARN', 'DEAN', 'DEAR', 'EARN', 'NARC', 'NEAR', 'RACE', 'READ', 'REND',
        'ACRED', 'ARCED', 'CANED', 'CANER', 'CRANE', 'RACED',
        'DANCER'
      ]
    }
  ];

  // --- Game State Variables ---
  let currentCaseIndex = 0;
  let activeCase = null;
  let availableLetters = []; // 6 letters in current rack order
  let rackLetterStates = []; // [{ letter: 'P', used: false, originalIndex: 0 }]
  let answerIndices = [];    // Indices into rackLetterStates

  let validWordsSet = new Set();
  let solvedWordsSet = new Set();
  let revealedHints = new Map(); // word => Set of revealed letter indices

  let hasSolvedMasterWord = false;
  let score = 0;
  let highScore = parseInt(localStorage.getItem('word_twist_highscore') || '0', 10);
  let casesSolvedCount = parseInt(localStorage.getItem('word_twist_cases_solved') || '0', 10);

  let gameMode = 'timed'; // 'timed' or 'zen'
  let timeRemaining = 120; // 2 minutes in seconds
  let timerInterval = null;
  let isRunning = false;
  let isPaused = false;
  let hintsRemaining = 3;

  // --- DOM Elements ---
  const caseTitleEl = document.getElementById('caseTitleEl');
  const rankTagEl = document.getElementById('rankTagEl');
  const scoreVal = document.getElementById('scoreVal');
  const highScoreVal = document.getElementById('highScoreVal');
  const timerVal = document.getElementById('timerVal');
  const progressVal = document.getElementById('progressVal');
  const keyStatusText = document.getElementById('keyStatusText');
  const keyCard = document.getElementById('keyCard');

  const boardContainer = document.getElementById('boardContainer');
  const wordColumnsWrapper = document.getElementById('wordColumnsWrapper');
  const feedbackBanner = document.getElementById('feedbackBanner');
  const answerTray = document.getElementById('answerTray');
  const letterRack = document.getElementById('letterRack');

  // Control Buttons
  const rulesBtn = document.getElementById('rulesBtn');
  const modeToggleBtn = document.getElementById('modeToggleBtn');
  const hintBtn = document.getElementById('hintBtn');
  const hintsLeftEl = document.getElementById('hintsLeftEl');
  const pauseBtn = document.getElementById('pauseBtn');
  const muteBtn = document.getElementById('muteBtn');

  const twistBtn = document.getElementById('twistBtn');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  // Modals
  const startOverlay = document.getElementById('startOverlay');
  const startBtn = document.getElementById('startBtn');
  const pauseOverlay = document.getElementById('pauseOverlay');
  const resumeBtn = document.getElementById('resumeBtn');

  const caseSolvedOverlay = document.getElementById('caseSolvedOverlay');
  const victoryMasterWord = document.getElementById('victoryMasterWord');
  const victoryWordsTally = document.getElementById('victoryWordsTally');
  const victoryScoreTally = document.getElementById('victoryScoreTally');
  const victoryRankTally = document.getElementById('victoryRankTally');
  const nextCaseBtn = document.getElementById('nextCaseBtn');

  const caseFailedOverlay = document.getElementById('caseFailedOverlay');
  const failReasonText = document.getElementById('failReasonText');
  const unsolvedWordsList = document.getElementById('unsolvedWordsList');
  const retryCaseBtn = document.getElementById('retryCaseBtn');
  const newMysteryBtn = document.getElementById('newMysteryBtn');

  const rulesOverlay = document.getElementById('rulesOverlay');
  const closeRulesBtn = document.getElementById('closeRulesBtn');

  // --- Initialize High Score on Load ---
  if (highScoreVal) highScoreVal.textContent = highScore;

  // Initialize Pause Button State (Disabled before game launch per requirement)
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.style.opacity = '0.4';
    pauseBtn.style.pointerEvents = 'none';
  }

  // --- Detective Rank Calculation ---
  function getDetectiveRank(pts) {
    if (pts >= 12000) return 'Master Sleuth';
    if (pts >= 7000) return 'Chief Inspector';
    if (pts >= 3500) return 'Senior Investigator';
    if (pts >= 1200) return 'Junior Detective';
    return 'Rookie Sleuth';
  }

  function updateRankDisplay() {
    const rank = getDetectiveRank(score);
    if (rankTagEl) rankTagEl.textContent = rank;
  }

  // --- Shuffle Utility (Fisher-Yates) ---
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // --- Load Case Dossier ---
  function loadCase(caseIdx) {
    currentCaseIndex = caseIdx % CASE_DOSSIERS.length;
    activeCase = CASE_DOSSIERS[currentCaseIndex];

    if (caseTitleEl) {
      caseTitleEl.textContent = activeCase.title;
    }

    // Set up lexicon
    validWordsSet = new Set(activeCase.words.map(w => w.toUpperCase()));
    solvedWordsSet.clear();
    revealedHints.clear();
    hasSolvedMasterWord = false;

    // Reset letters & rack
    // Shuffle the starting 6 letters so they are scrambled
    let scrambled = shuffleArray(activeCase.letters.split(''));
    // Ensure not already in solved word form if possible
    if (scrambled.join('') === activeCase.letters && scrambled.length > 2) {
      scrambled = shuffleArray(scrambled);
    }

    rackLetterStates = scrambled.map((letter, idx) => ({
      letter: letter,
      used: false,
      originalIndex: idx
    }));
    answerIndices = [];

    // Render Board Slots
    renderBoard();
    renderLetterRack();
    renderAnswerTray();

    // Reset status displays
    updateHUD();
    setFeedback('Dossier opened. Uncover the 6-letter cipher to crack the case!', 'normal');
  }

  // --- Render Word Slots Board ---
  function renderBoard() {
    if (!wordColumnsWrapper) return;
    wordColumnsWrapper.innerHTML = '';

    // Group valid words by length: 3, 4, 5, 6
    const grouped = { 3: [], 4: [], 5: [], 6: [] };
    activeCase.words.forEach(w => {
      const len = w.length;
      if (grouped[len]) grouped[len].push(w.toUpperCase());
    });

    // Sort words alphabetically within each length group
    [3, 4, 5, 6].forEach(len => {
      grouped[len].sort();
    });

    // Render columns
    [3, 4, 5, 6].forEach(len => {
      const words = grouped[len];
      if (words.length === 0) return;

      const colDiv = document.createElement('div');
      colDiv.className = 'word-column';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'col-header';
      headerDiv.innerHTML = `<span>${len}-LETTER CIPHERS</span> <span id="colCount-${len}">0/${words.length}</span>`;
      colDiv.appendChild(headerDiv);

      const slotsList = document.createElement('div');
      slotsList.className = 'slots-list';

      words.forEach(w => {
        const isMaster = (len === 6);
        const slotDiv = document.createElement('div');
        slotDiv.className = `word-slot ${isMaster ? 'master-slot' : ''}`;
        slotDiv.id = `slot-${w}`;
        slotDiv.dataset.word = w;

        // Render letter boxes
        for (let i = 0; i < len; i++) {
          const box = document.createElement('span');
          box.className = 'slot-letter-box';
          box.textContent = '';
          slotDiv.appendChild(box);
        }

        slotsList.appendChild(slotDiv);
      });

      colDiv.appendChild(slotsList);
      wordColumnsWrapper.appendChild(colDiv);
    });
  }

  // Update a single word slot when solved or hinted
  function updateSlotDisplay(word, isSolved) {
    const slot = document.getElementById(`slot-${word}`);
    if (!slot) return;

    if (isSolved) {
      slot.classList.add('solved');
      const boxes = slot.querySelectorAll('.slot-letter-box');
      for (let i = 0; i < word.length; i++) {
        boxes[i].textContent = word[i];
        boxes[i].classList.remove('hint-box');
      }
    } else {
      // Check for hints
      const hintSet = revealedHints.get(word);
      if (hintSet && hintSet.size > 0) {
        const boxes = slot.querySelectorAll('.slot-letter-box');
        hintSet.forEach(pos => {
          if (boxes[pos]) {
            boxes[pos].textContent = word[pos];
            boxes[pos].classList.add('hint-box');
          }
        });
      }
    }
  }

  // --- Render Answer Tray ---
  function renderAnswerTray() {
    if (!answerTray) return;
    answerTray.innerHTML = '';

    answerIndices.forEach((rackIdx, slotIdx) => {
      const state = rackLetterStates[rackIdx];
      const tile = document.createElement('div');
      tile.className = 'answer-tile';
      tile.textContent = state.letter;
      tile.title = 'Click to return letter to rack';
      tile.addEventListener('click', () => {
        removeAnswerLetter(slotIdx);
      });
      answerTray.appendChild(tile);
    });
  }

  // --- Render Bottom Letter Rack ---
  function renderLetterRack(isTwisting = false) {
    if (!letterRack) return;
    letterRack.innerHTML = '';

    rackLetterStates.forEach((state, idx) => {
      const tile = document.createElement('div');
      tile.className = `rack-tile ${state.used ? 'used' : ''} ${isTwisting ? 'flipping' : ''}`;
      tile.textContent = state.letter;
      tile.dataset.idx = idx;

      tile.addEventListener('click', () => {
        if (!state.used) {
          selectRackLetter(idx);
        }
      });

      letterRack.appendChild(tile);
    });
  }

  // --- Player Letter Actions ---
  function selectRackLetter(idx) {
    if (idx < 0 || idx >= rackLetterStates.length) return;
    if (rackLetterStates[idx].used) return;

    initAudio();
    playSound('pop');

    rackLetterStates[idx].used = true;
    answerIndices.push(idx);

    renderAnswerTray();
    renderLetterRack();
  }

  function removeAnswerLetter(slotIdx) {
    if (slotIdx < 0 || slotIdx >= answerIndices.length) return;

    initAudio();
    playSound('tap');

    const rackIdx = answerIndices[slotIdx];
    rackLetterStates[rackIdx].used = false;
    answerIndices.splice(slotIdx, 1);

    renderAnswerTray();
    renderLetterRack();
  }

  function clearAnswerTray() {
    if (answerIndices.length === 0) return;

    initAudio();
    playSound('tap');

    answerIndices.forEach(rackIdx => {
      rackLetterStates[rackIdx].used = false;
    });
    answerIndices = [];

    renderAnswerTray();
    renderLetterRack();
  }

  // --- Twist (Shuffle) Rack Letters ---
  function twistLetters() {
    initAudio();
    playSound('twist');

    // Shuffle only the currently available rack letters
    // First, map which letters were selected
    const selectedLetters = answerIndices.map(rIdx => rackLetterStates[rIdx].letter);

    // Permute all 6 original letters
    const allLetters = rackLetterStates.map(s => s.letter);
    const scrambled = shuffleArray(allLetters);

    // Reconstruct states and re-map selected letters
    rackLetterStates = scrambled.map((char, idx) => ({
      letter: char,
      used: false,
      originalIndex: idx
    }));

    // Re-bind used status for answers
    answerIndices = [];
    const usedIndices = new Set();
    selectedLetters.forEach(ch => {
      const matchIdx = rackLetterStates.findIndex((st, i) => st.letter === ch && !usedIndices.has(i));
      if (matchIdx !== -1) {
        rackLetterStates[matchIdx].used = true;
        usedIndices.add(matchIdx);
        answerIndices.push(matchIdx);
      }
    });

    renderAnswerTray();
    renderLetterRack(true);
  }

  // --- Word Submission & Validation ---
  function submitCurrentWord() {
    initAudio();
    if (answerIndices.length < 3) {
      setFeedback('⚠️ Words must be at least 3 letters long.', 'warning');
      playSound('buzz');
      shakeTray();
      return;
    }

    const currentWord = answerIndices.map(idx => rackLetterStates[idx].letter).join('');

    // Check if already solved
    if (solvedWordsSet.has(currentWord)) {
      setFeedback(`🔍 "${currentWord}" has already been logged in the dossier!`, 'warning');
      playSound('buzz');
      shakeTray();
      return;
    }

    // Check if valid in current case lexicon
    if (validWordsSet.has(currentWord)) {
      // Success!
      solvedWordsSet.add(currentWord);
      updateSlotDisplay(currentWord, true);

      // Score calculation
      const wordLen = currentWord.length;
      let pts = 100;
      if (wordLen === 4) pts = 250;
      if (wordLen === 5) pts = 500;
      if (wordLen === 6) pts = 1000;

      score += pts;
      updateHighScore();

      if (wordLen === 6) {
        hasSolvedMasterWord = true;
        playSound('master');
        setFeedback(`🎉 MASTER CIPHER "${currentWord}" UNLOCKED! Case Clearance Authorized! (+${pts} pts)`, 'master-key');
      } else {
        playSound('valid');
        setFeedback(`✨ Discovered "${currentWord}"! (+${pts} pts)`, 'success');
      }

      // Clear tray after successful word
      clearAnswerTray();
      updateHUD();

      // Check if all words found for complete case mastery
      if (solvedWordsSet.size === validWordsSet.size) {
        caseSolved(true);
      }
    } else {
      // Invalid word
      playSound('buzz');
      setFeedback(`❌ "${currentWord}" is not recognized in this case dossier.`, 'error');
      shakeTray();
    }
  }

  function shakeTray() {
    if (answerTray) {
      answerTray.classList.remove('shake-tray');
      void answerTray.offsetWidth; // Trigger reflow
      answerTray.classList.add('shake-tray');
    }
  }

  // --- Hint System ---
  function useHint() {
    if (hintsRemaining <= 0) {
      setFeedback('💡 No hints remaining for this investigation!', 'warning');
      playSound('buzz');
      return;
    }

    // Find all unsolved words
    const unsolvedWords = Array.from(validWordsSet).filter(w => !solvedWordsSet.has(w));
    if (unsolvedWords.length === 0) {
      setFeedback('All words have already been solved!', 'normal');
      return;
    }

    // Prioritize 6-letter word if not solved yet, otherwise shortest unsolved
    let targetWord = unsolvedWords.find(w => w.length === 6);
    if (!targetWord) {
      targetWord = unsolvedWords.sort((a, b) => a.length - b.length)[0];
    }

    // Find next unrevealed letter in target word
    if (!revealedHints.has(targetWord)) {
      revealedHints.set(targetWord, new Set());
    }
    const hintsForWord = revealedHints.get(targetWord);
    let revealedIndex = -1;
    for (let i = 0; i < targetWord.length; i++) {
      if (!hintsForWord.has(i)) {
        hintsForWord.add(i);
        revealedIndex = i;
        break;
      }
    }

    if (revealedIndex !== -1) {
      hintsRemaining--;
      if (hintsLeftEl) hintsLeftEl.textContent = hintsRemaining;
      updateSlotDisplay(targetWord, false);
      playSound('hint');
      setFeedback(`💡 Clue revealed: Letter "${targetWord[revealedIndex]}" exposed for a ${targetWord.length}-letter word!`, 'success');
    }
  }

  // --- Feedback Banner Helper ---
  function setFeedback(msg, styleClass) {
    if (!feedbackBanner) return;
    feedbackBanner.className = 'feedback-banner';
    if (styleClass && styleClass !== 'normal') {
      feedbackBanner.classList.add(styleClass);
    }
    feedbackBanner.textContent = msg;
  }

  // --- HUD and High Score Updates ---
  function updateHUD() {
    if (scoreVal) scoreVal.textContent = score;
    if (highScoreVal) highScoreVal.textContent = highScore;

    if (progressVal) {
      progressVal.textContent = `${solvedWordsSet.size} / ${validWordsSet.size}`;
    }

    if (keyStatusText) {
      if (hasSolvedMasterWord) {
        keyStatusText.textContent = '🔓 Solved!';
        keyStatusText.classList.add('unlocked');
        keyCard?.classList.add('unlocked-card');
      } else {
        keyStatusText.textContent = '🔒 Locked';
        keyStatusText.classList.remove('unlocked');
        keyCard?.classList.remove('unlocked-card');
      }
    }

    // Column counters
    [3, 4, 5, 6].forEach(len => {
      const counterEl = document.getElementById(`colCount-${len}`);
      if (counterEl) {
        const total = Array.from(validWordsSet).filter(w => w.length === len).length;
        const found = Array.from(solvedWordsSet).filter(w => w.length === len).length;
        counterEl.textContent = `${found}/${total}`;
      }
    });

    updateRankDisplay();
  }

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('word_twist_highscore', highScore.toString());
      if (highScoreVal) highScoreVal.textContent = highScore;
    }
  }

  // --- Timer Engine ---
  function startTimer() {
    clearInterval(timerInterval);
    if (gameMode === 'zen') {
      if (timerVal) {
        timerVal.textContent = '∞ Zen';
        timerVal.classList.remove('critical-timer');
      }
      return;
    }

    updateTimerDisplay();
    timerInterval = setInterval(() => {
      if (!isRunning || isPaused) return;

      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        handleTimeExpired();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!timerVal) return;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    timerVal.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (timeRemaining <= 20) {
      timerVal.classList.add('critical-timer');
    } else {
      timerVal.classList.remove('critical-timer');
    }
  }

  function handleTimeExpired() {
    if (hasSolvedMasterWord) {
      // Solved master word: Qualified for next round!
      caseSolved(false);
    } else {
      // Failed to find 6-letter master word
      caseFailed();
    }
  }

  // --- Case End Conditions ---
  function caseSolved(allWordsFound = false) {
    isRunning = false;
    isPaused = false;
    clearInterval(timerInterval);
    playSound('caseSolved');

    // Disable Pause Button on Case Over
    if (pauseBtn) {
      pauseBtn.disabled = true;
      pauseBtn.innerHTML = '⏸️ Pause';
      pauseBtn.style.opacity = '0.4';
      pauseBtn.style.pointerEvents = 'none';
    }

    casesSolvedCount++;
    localStorage.setItem('word_twist_cases_solved', casesSolvedCount.toString());

    // Time bonus
    let timeBonus = 0;
    if (gameMode === 'timed' && timeRemaining > 0) {
      timeBonus = timeRemaining * 10;
      score += timeBonus;
    }
    if (allWordsFound) {
      score += 1500; // Mastery bonus
    }
    updateHighScore();
    updateHUD();

    // Populate Victory Modal
    const sixLetterWords = Array.from(validWordsSet).filter(w => w.length === 6);
    const masterWordShown = sixLetterWords.find(w => solvedWordsSet.has(w)) || sixLetterWords[0];

    if (victoryMasterWord) victoryMasterWord.textContent = masterWordShown;
    if (victoryWordsTally) victoryWordsTally.textContent = `${solvedWordsSet.size} of ${validWordsSet.size} words`;
    if (victoryScoreTally) victoryScoreTally.textContent = `+${timeBonus + (allWordsFound ? 1500 : 0)} bonus pts (Total: ${score})`;
    if (victoryRankTally) victoryRankTally.textContent = getDetectiveRank(score);

    caseSolvedOverlay?.classList.remove('hidden');
  }

  function caseFailed() {
    isRunning = false;
    isPaused = false;
    clearInterval(timerInterval);
    playSound('timeout');

    // Disable Pause Button on Game Over
    if (pauseBtn) {
      pauseBtn.disabled = true;
      pauseBtn.innerHTML = '⏸️ Pause';
      pauseBtn.style.opacity = '0.4';
      pauseBtn.style.pointerEvents = 'none';
    }

    // Populate reveal of unsolved words
    if (unsolvedWordsList) {
      unsolvedWordsList.innerHTML = '';
      const unsolved = Array.from(validWordsSet).filter(w => !solvedWordsSet.has(w));
      // Sort: 6-letter words first
      unsolved.sort((a, b) => b.length - a.length || a.localeCompare(b));

      unsolved.forEach(w => {
        const tag = document.createElement('span');
        tag.className = `reveal-word-tag ${w.length === 6 ? 'master-tag' : ''}`;
        tag.textContent = `${w} (${w.length})`;
        unsolvedWordsList.appendChild(tag);
      });
    }

    caseFailedOverlay?.classList.remove('hidden');
  }

  // --- Game Flow Orchestration ---
  function startNewInvestigation(caseIndexToLoad = 0) {
    initAudio();
    isRunning = true;
    isPaused = false;
    timeRemaining = 120;
    hintsRemaining = 3;
    if (hintsLeftEl) hintsLeftEl.textContent = hintsRemaining;

    // Enable Pause Button during active play
    if (pauseBtn) {
      pauseBtn.disabled = false;
      pauseBtn.innerHTML = '⏸️ Pause';
      pauseBtn.style.opacity = '1';
      pauseBtn.style.pointerEvents = 'auto';
    }

    loadCase(caseIndexToLoad);
    startTimer();

    startOverlay?.classList.add('hidden');
    caseSolvedOverlay?.classList.add('hidden');
    caseFailedOverlay?.classList.add('hidden');
    pauseOverlay?.classList.add('hidden');
  }

  function togglePause() {
    if (!isRunning) return;
    isPaused = !isPaused;

    if (isPaused) {
      pauseOverlay?.classList.remove('hidden');
      if (pauseBtn) pauseBtn.innerHTML = '▶️ Resume';
    } else {
      pauseOverlay?.classList.add('hidden');
      if (pauseBtn) pauseBtn.innerHTML = '⏸️ Pause';
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (muteBtn) {
      muteBtn.innerHTML = isMuted ? '🔇 Muted' : '🔊 Sound';
    }
  }

  // --- Physical Keyboard Controls ---
  window.addEventListener('keydown', (e) => {
    // If modal open (except pause), ignore typing
    const anyModalOpen = (!startOverlay.classList.contains('hidden') ||
                          !caseSolvedOverlay.classList.contains('hidden') ||
                          !caseFailedOverlay.classList.contains('hidden') ||
                          !rulesOverlay.classList.contains('hidden'));

    if (e.code === 'KeyP') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (anyModalOpen || !isRunning || isPaused) return;

    if (e.code === 'Enter') {
      e.preventDefault();
      submitCurrentWord();
    } else if (e.code === 'Backspace' || e.code === 'Delete') {
      e.preventDefault();
      if (answerIndices.length > 0) {
        removeAnswerLetter(answerIndices.length - 1);
      }
    } else if (e.code === 'Space' || e.code === 'KeyS' && e.ctrlKey) {
      e.preventDefault();
      twistLetters();
    } else if (e.code === 'KeyC') {
      e.preventDefault();
      clearAnswerTray();
    } else if (e.code === 'KeyH') {
      e.preventDefault();
      useHint();
    } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      // Typed a letter
      const typedChar = e.key.toUpperCase();
      // Find unused matching letter in rack
      const rackIdx = rackLetterStates.findIndex(st => st.letter === typedChar && !st.used);
      if (rackIdx !== -1) {
        selectRackLetter(rackIdx);
      }
    }
  });

  // --- Event Bindings ---
  startBtn?.addEventListener('click', () => {
    // Read selected mode
    const selectedRadio = document.querySelector('input[name="gameMode"]:checked');
    if (selectedRadio) {
      gameMode = selectedRadio.value;
      if (modeToggleBtn) {
        modeToggleBtn.textContent = (gameMode === 'timed') ? '⏱️ Timed' : '🧘 Zen';
      }
    }
    startNewInvestigation(0);
  });

  modeToggleBtn?.addEventListener('click', () => {
    gameMode = (gameMode === 'timed') ? 'zen' : 'timed';
    modeToggleBtn.textContent = (gameMode === 'timed') ? '⏱️ Timed' : '🧘 Zen';
    if (isRunning) {
      startTimer();
    }
  });

  pauseBtn?.addEventListener('click', togglePause);
  resumeBtn?.addEventListener('click', togglePause);
  muteBtn?.addEventListener('click', toggleMute);

  twistBtn?.addEventListener('click', twistLetters);
  submitBtn?.addEventListener('click', submitCurrentWord);
  clearBtn?.addEventListener('click', clearAnswerTray);
  hintBtn?.addEventListener('click', useHint);

  nextCaseBtn?.addEventListener('click', () => {
    startNewInvestigation(currentCaseIndex + 1);
  });

  retryCaseBtn?.addEventListener('click', () => {
    startNewInvestigation(currentCaseIndex);
  });

  newMysteryBtn?.addEventListener('click', () => {
    const nextIdx = (currentCaseIndex + 1) % CASE_DOSSIERS.length;
    startNewInvestigation(nextIdx);
  });

  rulesBtn?.addEventListener('click', () => {
    rulesOverlay?.classList.remove('hidden');
  });

  closeRulesBtn?.addEventListener('click', () => {
    rulesOverlay?.classList.add('hidden');
  });

  // First-time preview setup
  loadCase(0);
})();
