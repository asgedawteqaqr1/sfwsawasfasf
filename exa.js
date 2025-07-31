const fakeCommands = [
      { type: "text", text: "Connecting to secure node... " },
      { type: "text", text: "Bypassing firewall... " },
      { type: "matrix", text: "Injecting payload" },
      { type: "text", text: "Payload delivered." },
      { type: "text", text: "Establishing root access... " },
      { type: "text", text: "Access granted. Welcome Exanivar." },
      { type: "text", text: "" },
      { type: "text", text: "Decrypting system logs..." },
      { type: "text", text: "Extracting message..." }
    ];

    const messageLines = [
      "Never Compare Your Circus Area With My Wild Forest",
      "",
      "If You Want To See The Hunter Who Is Being Hunted",
      "",
      "Come To My Arena"
    ];

    const terminalOutput = document.getElementById("terminalOutput");
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");
    const typingElement = document.getElementById("typingText");
    const arenaButton = document.getElementById("arenaButton");

    let commandIndex = 0;

    function typeFakeCommands() {
      if (commandIndex >= fakeCommands.length) {
        setTimeout(showMainContent, 800);
        return;
      }

      const command = fakeCommands[commandIndex];

      if (command.type === "text") {
        typeLine(command.text, () => {
          terminalOutput.innerHTML += "\n";
          commandIndex++;
          setTimeout(typeFakeCommands, 300);
        });
      } else if (command.type === "matrix") {
        terminalOutput.innerHTML += command.text + "...\n";
        simulateMatrixDump(() => {
          terminalOutput.innerHTML += "\n[Payload Injection Complete]\n\n";
          commandIndex++;
          setTimeout(typeFakeCommands, 600);
        });
      }
    }

    function typeLine(line, callback, idx = 0) {
      if (idx < line.length) {
        terminalOutput.innerHTML += line.charAt(idx);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        setTimeout(() => typeLine(line, callback, idx + 1), 30);
      } else {
        callback();
      }
    }

    function simulateMatrixDump(doneCallback) {
      const charset = "0123456789ABCDEF";
      let linesGenerated = 0;
      const maxLines = 10;

      const interval = setInterval(() => {
        let line = "";
        for (let i = 0; i < 60; i++) {
          line += charset[Math.floor(Math.random() * charset.length)];
          if (i % 4 === 0) line += " ";
        }
        terminalOutput.innerHTML += line + "\n";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        linesGenerated++;

        if (linesGenerated >= maxLines) {
          clearInterval(interval);
          doneCallback();
        }
      }, 50);
    }

    function showMainContent() {
      loadingScreen.style.display = "none";
      mainContent.style.display = "flex";
      startTyping();
    }

    function startTyping() {
      let lineIndex = 0;
      let charIdx = 0;

      function typeLine() {
        if (lineIndex >= messageLines.length) {
          arenaButton.style.display = "inline-block";
setTimeout(() => {
  arenaButton.style.opacity = "1";
  arenaButton.style.animation = "glow 1s infinite ease-in-out, fadeInUp 0.6s ease-out";
}, 50);
          return;
        }

        const line = messageLines[lineIndex];
        if (charIdx <= line.length) {
          typingElement.innerHTML =
            messageLines.slice(0, lineIndex).join("<br>") +
            (lineIndex > 0 ? "<br>" : "") +
            line.slice(0, charIdx) +
            '<span class="cursor"></span>';
          charIdx++;
          setTimeout(typeLine, 40);
        } else {
          lineIndex++;
          charIdx = 0;
          setTimeout(typeLine, 500);
        }
      }

      typeLine();
    }

    typeFakeCommands();

    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase()))
      ) {
        e.preventDefault();
      }
    });
