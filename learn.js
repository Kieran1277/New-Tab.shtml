(() => {
  const CSS = `
    .content {
      position: fixed;
      z-index: 999999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50rem;
      height: 30rem;
      background-color: rgb(25, 59, 160);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: aliceblue;
      font-size: larger;
      border-radius: 50px;
      box-shadow: 0 0 20px 5px black;
    }
    .content h1 { margin: 2px; }
    #download {
      width: 10rem;
      height: 3rem;
      background-color: rgb(51, 0, 255);
      color: rgb(217, 217, 217);
      border-radius: 5px;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
  `;

  const DOWNLOAD_URL =
  "https://cdn.jsdelivr.net/gh/Bijeet-D/Ocean-Learn@main/Ocean-Learn-Download.html";

  // ---- Update popup (only shown for version 1 or an unparseable version) ----
  const version = parseFloat(document.querySelector(".version-label")?.textContent ?? "1");

  if (version === 1 || Number.isNaN(version)) {
    const style = document.createElement("style");
    style.textContent = CSS;

    const popup = document.createElement("div");
    popup.className = "content";
    popup.innerHTML = `
      <h1>Update Oceanic-gms</h1>
      <p>Minor fixes + analytics tracking</p>
      <button id="download">Download New File</button>
    `;

    document.head.appendChild(style);
    document.body.appendChild(popup);

    // Fetch only when the user actually clicks, not on every page load
    popup.querySelector("#download").addEventListener("click", async () => {
      try {
        const res = await fetch(DOWNLOAD_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const url = URL.createObjectURL(new Blob([await res.text()], { type: "text/html" }));
        const link = Object.assign(document.createElement("a"), {
          href: url,
          download: "oceanic-gms.html",
        });
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (err) {
        console.error("Download failed:", err);
      }
    });
  }

  // ---- Page tweaks ----
  const heading = document.querySelector("body > main > h3");
  if (heading) {
    heading.innerHTML =
      'This <a href="https://github.com/kieran1277">Github</a> Is Very Cool. All Games Are Not Sourced From There.';
  }

  const REMOVE_IDS = [
    "I~woke~up~next~to~...-gm-card",
    "Five~Nights~at~Eps...-gm-card",
  ];

  function applyCardTweaks() {
    const soundboard = document.getElementById("Soundboard-gm-card");
    if (!soundboard) return false; // cards not rendered yet

    REMOVE_IDS.forEach((id) => document.getElementById(id)?.remove());

    soundboard.addEventListener("click", () => {
      alert("PLEASE DONT ABUSE THE SOUNDBOARD IN CLASS \n \n pls... it isn't funny");
    });
    return true;
  }

  // Try immediately; otherwise wait for the cards to appear
  if (!applyCardTweaks()) {
    const observer = new MutationObserver(() => {
      if (applyCardTweaks()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
