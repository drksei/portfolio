const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));

app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    const input = document.querySelector("input");
    if (input && document.activeElement === input) {
      await delay(150);
      getInputValue();
      removeInput();
      await delay(150);
      new_line();
    }
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  if (input) input.focus();
});

document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById("closeBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.reload(true);
    });
  }
  
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
});

async function open_terminal(){
  createText("Hello there! and welcome to my portfolio ;)");
  await delay(700);
  createText(">> OS: Connection established!");
  await delay(900);
  new_line();
}

function new_line(){
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
  input.setAttribute("placeholder", "Type a command... or write 'help' to more info.");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
  
  app.scrollTop = app.scrollHeight;
}

function removeInput(){
  const div = document.querySelector(".type");
  if (div) app.removeChild(div);
}

async function getInputValue(){
  const input = document.querySelector("input");
  if (!input) return;
  
  const value = input.value.trim();
  if (value === "") return; 
  
  const lowerValue = value.toLowerCase(); 
  
  if(lowerValue === "ls"){
    trueValue(value); 
    createCode("projects", "All my personal projects and relevant info.");
    createCode("me", "Information about me :).");
    createCode("social", "All my social networks.");
    createCode("clear", "Clean terminal screen.");
    createCode("reload", "Reload terminal interface");
    createCode("exit", "Kill terminal");
  }
  else if (lowerValue === "help") {
    trueValue(value);
    createText("Use <span style='color: blue;'>'ls'</span> to show command list.");
  }
  else if(lowerValue === "me"){
    trueValue(value);
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
  else if(lowerValue === "social"){
    trueValue(value);
    createText("<a href='https://github.com/drksei' target='_blank'><i class='fab fa-github white'></i> github.com/drksei</a>");
    createText("<a href='https://gitlab.com/keneth.rapalo' target='_blank'><i class='fab fa-gitlab white'></i> gitlab.com/keneth.rapalo</a>");
    createText("<a href='https://www.linkedin.com/in/keneth-rapalo/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/keneth-rapalo</a>");
    createText("<a href='https://www.instagram.com/_keneth.r/' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/_keneth.r</a>");
  }
  else if(lowerValue === "projects"){ 
    trueValue(value);
    createText("<a href='https://gitlab.com/keneth.rapalo/plinga_studios' target='_blank'><i class='fab fa-gitlab white'></i> Five Nights in Darkness.</a> use <span style='color: yellow;'>'./fnid.exe'</span> to play.");  
    createText("<a href='https://gitlab.com/keneth.rapalo/rock' target='_blank'><i class='fab fa-gitlab white'></i> Rock.</a>");  
  }
else if(lowerValue === "clear"){
    const elements = app.querySelectorAll("p, div.type, div.type2, div:not(.type):not(.type2)");
    
    elements.forEach(e => e.remove());
    
    const iframes = app.querySelectorAll("iframe");
    iframes.forEach(e => e.remove());
    
    createCode("Type 'ls'", "to show all command list, write <span style='color: yellow;'>'help'</span> to show more info.");
    
    await delay(500);
}
  else if(lowerValue === "reload"){
    window.location.reload(true);
  }

  else if(lowerValue === "./fnid" || lowerValue === "./fnid.exe") {
  trueValue(value);
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
    trueValue(value);
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
  else{
    falseValue(value);
    createErrorText(`Oops! command not found: "${value}"`);
  }
  
  app.scrollTop = app.scrollHeight;
}

function trueValue(value){
  const div = document.createElement("div");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  const div = document.createElement("div");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  p.style.color = "#ff1500";
  app.appendChild(p);
}

document.addEventListener('DOMContentLoaded', function() {
  open_terminal();
});