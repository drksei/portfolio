const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));

let isProcessing = false;

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {

    if (isProcessing) return;

    const input = document.querySelector("input");
    if (input && document.activeElement === input) {
      isProcessing = true;

      const value = input.value;

      if (value.trim() !== "") {
        await delay(150);
        await getInputValue();
      }

      removeInput();
      await delay(150);
      new_line();

      isProcessing = false;
    }
  }
});

app.addEventListener("click", function (event) {
  const input = document.querySelector("input");
  if (input) input.focus();
});

document.addEventListener('DOMContentLoaded', function () {
  const closeBtn = document.getElementById("closeBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.reload(true);
    });
  }

  document.addEventListener('touchmove', function (e) {
    if (!e.target.closest('#app')) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
  });

  document.addEventListener('gestureend', function (e) {
    e.preventDefault();
  });

  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      const container = document.querySelector(".container");
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  setTimeout(() => {
    open_terminal();
  }, 100);
});

async function open_terminal() {
  createText("Hello there! and welcome to my portfolio ;)");
  await delay(700);
  createText(">> OS: Connection established!");
  await delay(900);
  new_line();
}

function new_line() {
  const existingType = document.querySelector(".type");
  if (existingType) {
    existingType.remove();
  }

  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path");
  p.textContent = "guest_user";
  span2.textContent = " @terminal-portfolio:";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);

  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Type a command... or write 'help' to get more info.");

  input.addEventListener("keydown", function (e) {
    e.stopPropagation();
  });

  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);

  setTimeout(() => {
    input.focus();
  }, 10);

  app.scrollTop = app.scrollHeight;
}

function removeInput() {
  const div = document.querySelector(".type");
  if (div) {
    div.remove();
  }
}

async function getInputValue() {
  const input = document.querySelector("input");
  if (!input) return;

  const value = input.value.trim();
  if (value === "") return;

  const lowerValue = value.toLowerCase();

  trueValue(value);

  if (lowerValue === "ls") {
    trueValue(value);
    createCode("projects", "Show or try my projects.", "rgb(255, 107, 107)");
    createCode("me", "Information about me :).", "rgb(78, 205, 196)");
    createCode("social", "All my social networks.", "rgb(255, 230, 109)");
    createCode("clear", "Clean terminal screen.", "rgb(255, 159, 28)");
    createCode("reload", "Reload terminal interface,", "rgb(191, 140, 240)");
    createCode("exit", "Kill terminal.", "rgb(255, 107, 107)");
  }
  
  else if (lowerValue === "help") {
    createText("Use <span style='color: blue;'>'ls'</span> to show command list.");
  }
  else if (lowerValue === "me") {
    createText("My name is Keneth.");
    createText('<img src="resources/profile.png" alt="Mi foto" style="max-width: 100px; border-radius: 10px;">');
    createText("<em><u>Computer Systems and Network Administrator & IT Technician Supporter & Hardware.</u></em>");
    createText("Passionate about technology with advanced knowledge in hardware architecture and software environments, I am a responsible person with the ability to learn and full availability.");

    let html = "<strong>Key Skills:</strong><ul>";
    const skills = "- Operating systems.@- Computer and mobile device maintenance.@- Low-level tool management: ADB, Fastboot, and Xiaomi MiFlashTool.@- Fundamental knowledge of native Android development.@";
    const items = skills.split("@");

    items.forEach(item => {
      if (item.trim() !== "") {
        html += `<li>${item.trim()}</li>`;
      }
    });

    html += "</ul>";
    createText(html);
  }
  else if (lowerValue === "social") {
    createText("<a href='https://github.com/drksei' target='_blank'><i class='fab fa-github white'></i> github.com/drksei</a>");
    createText("<a href='https://gitlab.com/keneth.rapalo' target='_blank'><i class='fab fa-gitlab white'></i> gitlab.com/keneth.rapalo</a>");
    createText("<a href='https://www.linkedin.com/in/keneth-rapalo/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/keneth-rapalo</a>");
    createText("<a href='https://www.instagram.com/_keneth.r/' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/_keneth.r</a>");
  }
  else if (lowerValue === "projects") {
    createText("<a href='https://gitlab.com/keneth.rapalo/plinga_studios' target='_blank'><i class='fab fa-gitlab white'></i> Five Nights in Darkness.</a> use <span style='color: yellow;'>'./fnid.exe'</span> to play.");
    createText("<a href='https://gitlab.com/keneth.rapalo/rock' target='_blank'><i class='fab fa-gitlab white'></i> Rock.</a>");
  }
  else if (lowerValue === "clear") {
    const elements = app.querySelectorAll("p, div.type, div.type2");

    elements.forEach(e => e.remove());

    createCode("Type 'ls'", "to show all command list, write <span style='color: yellow;'>'help'</span> to show more info.");

    await delay(500);
  }
  else if (lowerValue === "reload") {
    window.location.reload(true);
  }
  else if (lowerValue === "./fnid" || lowerValue === "./fnid.exe") {
    const iframeContainer = document.createElement("div");
    iframeContainer.innerHTML = `
      <iframe src="https://drksei.github.io/fnid/" 
              style="width: 100%; height: 400px; border: 1px solid #ff0000; margin-top: 10px;" 
              frameborder="0">
      </iframe>
    `;
    app.appendChild(iframeContainer);
  }
  else if (lowerValue === "exit") {
    createText("Session terminated.");

    setTimeout(() => {
      document.body.innerHTML = "";
      document.body.style.background = "black";
      document.body.style.backgroundImage = "none";

      const msg = document.createElement("h1");
      msg.style.color = "#00ff00";
      msg.style.fontFamily = "'Fira Code', monospace";
      msg.style.textAlign = "center";
      msg.style.marginTop = "20%";
      msg.innerText = "Terminal closed.";

      document.body.appendChild(msg);
    }, 800);
  }
  else {
    falseValue(value);
    createErrorText(`Oops! command not found: "${value}"`);
  }

  setTimeout(() => {
    app.scrollTop = app.scrollHeight;
  }, 50);
}

function trueValue(value) {
  const div = document.createElement("div");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = value;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement("div");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = value;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text, color = '#66C2CD') {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `<span style='color: ${color}'>${code}</span> <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  p.style.color = "#ff1500";
  app.appendChild(p);
}
