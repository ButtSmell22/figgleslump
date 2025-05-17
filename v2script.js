window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
  }, 1500);
});

function launchConfetti() {
  confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
}

// Fix: Create Audio object on first user interaction
let clickSound;
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener("change", () => {
    if (!clickSound) {
      clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    }
    clickSound.currentTime = 0;
    clickSound.play();
    updateProgress();
  });
});

function updateProgress() {
  const total = 25;
  const answered = Array.from({ length: total }, (_, i) =>
    document.querySelector(`input[name="q${i+1}"]:checked`)
  ).filter(Boolean).length;
  const percent = Math.floor((answered / total) * 100);
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressPercent").textContent = percent + "%";
}

function getResult() {
  const total = 25;
  const answers = [];
  for (let i = 1; i <= total; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (!sel) {
      alert("Please answer all 25 questions!");
      return;
    }
    answers.push(sel.value);
  }
  // Tally up
  const tally = {};
  answers.forEach(a => tally[a] = (tally[a] || 0) + 1);
  const result = Object.entries(tally).sort((a,b) => b[1] - a[1])[0][0];

  // Expanded personalities
  const data = {
    pwr: {
      title: "Pressurized Water Reactor (PWR)",
      text: "You are the embodiment of steady reliability. Just like a PWR keeps cool water under pressure to prevent boiling, you keep your cool under stress and maintain a balanced perspective. Your friends depend on you to make thoughtful decisions and carry everyone forward with a calm, methodical approach. You value safety and stability, and you excel when given a clear set of guidelines to follow.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PWR_schematic_diagram.svg/640px-PWR_schematic_diagram.svg.png"
    },
    bwr: {
      title: "Boiling Water Reactor (BWR)",
      text: "You bring warmth and energy wherever you go. Like a BWR that boils its own water to generate power, you tackle challenges head-on and adapt quickly to new situations. Your directness and transparency help others see exactly where they stand with you. You thrive in dynamic environments and often encourage those around you to ‘turn up the heat’ when things get stale.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/BWR_schematic_diagram.svg/640px-BWR_schematic_diagram.svg.png"
    },
    rbmk: {
      title: "RBMK Reactor",
      text: "Bold and unconventional describe you best. An RBMK’s design was unique—it could be refueled without shutting down—just as you find ways to innovate on the fly. Your spontaneity can catch people by surprise, but it also leads to breakthroughs that a more cautious approach might miss. You’re happiest when pushing boundaries and exploring uncharted territory, though you know it requires careful planning to manage risks.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/RBMK_En.svg/640px-RBMK_En.svg.png"
    },
    chrnbl: {
      title: "Chernobyl Reactor",
      text: "Your passion burns bright—sometimes unpredictably. Just as the Chernobyl reactor’s story is one of intense energy release, you have an emotional intensity that can inspire or overwhelm. You feel deeply and act from the heart, and your charisma draws people in even when your impulses lead to turbulence. You’ve learned that with great power comes great responsibility, and you’re always striving to harness your energy more safely.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/1b/PWR_schematic_diagram.svg/640px-PWR_schematic_diagram.svg.png"
    },
    agr: {
      title: "Advanced Gas-cooled Reactor (AGR)",
      text: "Wisdom and tradition guide you. AGRs use graphite and carbon dioxide to maintain their core—materials tested over decades—just as you rely on proven methods and life experience. You may not chase every new trend, but you incorporate innovation where it makes sense, always with an eye toward safety and longevity. Others come to you for grounded advice and a steady hand.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/AGR_schematic.svg/640px-AGR_schematic.svg.png"
    },
    sfr: {
      title: "Sodium-cooled Fast Reactor (SFR)",
      text: "You operate at high efficiency and love optimizing systems. Like an SFR that uses liquid sodium to transfer heat quickly, you streamline processes and solve problems with precision. You’re future-focused, eager to reduce waste and maximize output, and you enjoy experimenting with next-gen ideas. Your analytical mind spots improvements others often overlook.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SFR_schematic.svg/640px-SFR_schematic.svg.png"
    },
    msr: {
      title: "Molten Salt Reactor (MSR)",
      text: "Visionary and adaptable, you see possibilities where others see obstacles. MSRs dissolve fuel in liquid salt to operate at low pressure—an elegant solution to many challenges. You think outside the box and pivot gracefully when new information emerges. Creativity is your core strength, and you inspire others to embrace change for a cleaner, brighter future.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/MSR_schematic.svg/640px-MSR_schematic.svg.png"
    }
  };

  // Supportive nuclear-energy memes
  const memes = {
    pwr: "https://i.imgflip.com/5qf8bc.jpg",
    bwr: "https://i.imgflip.com/6n6v9d.jpg",
    rbmk: "https://i.imgflip.com/6n6vcz.jpg",
    chrnbl: "https://i.imgflip.com/6n6vgi.jpg",
    agr: "https://i.imgflip.com/6n6vl2.jpg",
    sfr: "https://i.imgflip.com/6n6vnd.jpg",
    msr: "https://i.imgflip.com/6n6vp8.jpg"
  };

  // Apply result
  const { title, text, image } = data[result];
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultText").textContent = text;
  document.getElementById("resultImage").src = image;
  document.getElementById("memeImage").src = memes[result];
  document.getElementById("resultBox").style.display = "block";
  launchConfetti();
}