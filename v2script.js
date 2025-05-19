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
      image: "https://energyeducation.ca/wiki/images/0/00/Wattsbar.jpg"
    },
    bwr: {
      title: "Boiling Water Reactor (BWR)",
      text: "You bring warmth and energy wherever you go. Like a BWR that boils its own water to generate power, you tackle challenges head-on and adapt quickly to new situations. Your directness and transparency help others see exactly where they stand with you. You thrive in dynamic environments and often encourage those around you to ‘turn up the heat’ when things get stale.",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Leibstadt_Kernkraftwerk_Leibstadt_AG.jpg"
    },
    rbmk: {
      title: "RBMK Reactor",
      text: "Bold and unconventional describe you best. An RBMK’s design was unique—it could be refueled without shutting down—just as you find ways to innovate on the fly. Your spontaneity can catch people by surprise, but it also leads to breakthroughs that a more cautious approach might miss. You’re happiest when pushing boundaries and exploring uncharted territory, though you know it requires careful planning to manage risks.",
      image: "https://www.energyencyclopedia.com/data/web/img-nuclear-energy/the-nuclear-reactors/rbmk-type-reactor/125624623.jpg"
    },
    chrnbl: {
      title: "Chernobyl Reactor",
      text: "Your passion burns bright—sometimes unpredictably. Just as the Chernobyl reactor’s story is one of intense energy release, you have an emotional intensity that can inspire or overwhelm. You feel deeply and act from the heart, and your charisma draws people in even when your impulses lead to turbulence. You’ve learned that with great power comes great responsibility, and you’re always striving to harness your energy more safely.",
      image: "https://i.insider.com/5d49e9e721214c4b1902bcc0?width=800&format=jpeg&auto=webp"
    },
    agr: {
      title: "Advanced Gas-cooled Reactor (AGR)",
      text: "Wisdom and tradition guide you. AGRs use graphite and carbon dioxide to maintain their core—materials tested over decades—just as you rely on proven methods and life experience. You may not chase every new trend, but you incorporate innovation where it makes sense, always with an eye toward safety and longevity. Others come to you for grounded advice and a steady hand.",
      image: "https://www.energyencyclopedia.com/data/web/img-nuclear-energy/the-nuclear-reactors/gas-cooled-reactor-gcr-and-advanced-gas-cooled-reactor-agr/34064150.jpg"
    },
    sfr: {
      title: "Sodium-cooled Fast Reactor (SFR)",
      text: "You operate at high efficiency and love optimizing systems. Like an SFR that uses liquid sodium to transfer heat quickly, you streamline processes and solve problems with precision. You’re future-focused, eager to reduce waste and maximize output, and you enjoy experimenting with next-gen ideas. Your analytical mind spots improvements others often overlook.",
      image: "https://www.powermag.com/wp-content/uploads/2019/11/fig-2-superphenix-fast-reactor-nuclear.jpg"
    },
    msr: {
      title: "Molten Salt Reactor (MSR)",
      text: "Visionary and adaptable, you see possibilities where others see obstacles. MSRs dissolve fuel in liquid salt to operate at low pressure—an elegant solution to many challenges. You think outside the box and pivot gracefully when new information emerges. Creativity is your core strength, and you inspire others to embrace change for a cleaner, brighter future.",
      image: "https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_1755_16990010033008599.jpg"
    }
  };

  // Supportive nuclear-energy memes
  const memes = {
    pwr: "https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/470566970_2606107346243739_9062253029217436329_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=V4oLQFP1GNgQ7kNvwFYEwvQ&_nc_oc=Adktmx8idjQPW2J-eC9smSDPOQ6nUK6z6aw8zUYZxCfM1DWoMvjCJA5mWfhqthjZ6YyQwWv6shNjpU24HAyy7x2g&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=ILV5KVxOrNSAvb7chHMp7A&oh=00_AfI8SVWWc8-f_H5X4YylR3eIS4xYAYbMMyd3PN-LKQrCAQ&oe=682EB523",
    bwr: "https://www.reddit.com/media?url=https%3A%2F%2Fexternal-preview.redd.it%2FrSEDpboGC1RYHIAtmVsIEXCf8xppqe4UmPlQdWjURLU.jpg%3Fauto%3Dwebp%26s%3Df6b968f8eba4b16f9842e3601f65e71a855dc891",
    rbmk: "https://www.siliconrepublic.com/wp-content/uploads/2014/12/img/nuclear-power-plant-meme-2.jpg",
    chrnbl: "https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/480770157_1156709595855910_4521139476380274031_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f8HCwaPXITMQ7kNvwFeeqa_&_nc_oc=AdmW-6FHK1Mr0sGCXgZl_C6T874g8SrVtPuLGi7WSaU_CeCSerqpo69hOQ8yHHK0pKBsyhKuyb-HkmTASPr66bkg&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=iJK5xQHMOOrXdkb9q1h9lg&oh=00_AfLTDrK0E2Gw7sL0gopDIcTekt9gnoTOqn-60Q5nbKBp_Q&oe=682EB005",
    agr: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBukaDw0_-TcB3_C9ux-F8B15OAfCucwUBrg&s",
    sfr: "https://images7.memedroid.com/images/UPLOADED254/66422594e0906.jpeg",
    msr: "https://pbs.twimg.com/media/DSPKbZFWkAAhiUV.jpg"
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