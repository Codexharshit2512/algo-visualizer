var editor = ace.edit("editor");
// editor.setTheme("ace/theme/monokai");
editor.setHighlightActiveLine(true);
$("#theme-selector").change(function (e) {
  const theme = $("#theme-selector").val();
  editor.setTheme(`ace/theme/${theme}`);
  localStorage.setItem("theme", JSON.stringify(theme));
});
editor.session.setMode(`ace/mode/c_cpp`);
$("#font-selector").change(function (e) {
  let val = $("#font-selector").val();
  $("#editor")[0].style.fontSize = `${val}px`;
  localStorage.setItem("fontSize", JSON.stringify(val));
});

$(".open-console-btn").click(function (e) {
  $(".console-input-container").toggleClass("open");
  //   console.log($(".far.fa-chart-bar"));
  let str = `0`;
  if ($(".console-input-container").hasClass("open")) {
    str = `180deg`;
  }
  $(".fas.fa-chevron-down").css({
    transform: `rotate(${str})`,
  });
});

$("#lang-selector").change(function (e) {
  const val = $("#lang-selector").val();
  editor.session.setMode(`ace/mode/${val}`);
  localStorage.setItem("language", JSON.stringify(val));
});

$(".run-code-btn").click(function (e) {
  const program = editor.session.getValue();
  if (program.length == 0) return;
  const stdin = $("#console-input").val();
  const val = $("#lang-selector").val();
  const lang = assignValue(val);
  const data = {
    program,
    stdin,
    language: lang,
  };
  console.log(data);
  $(".output").html("");
  $(".cpu-time").html("");
  $(".memory").html("");
  $(".output-container").append($(loadingHtml));
  fetch("https://algo-visualizer242.herokuapp.com/execute", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode == 400) throw new Error("error");
      handleOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

function assignValue(val) {
  switch (val) {
    case "javascript":
      return "nodejs";
    case "python":
      return "python3";
      break;
    case "c_cpp":
      return "cpp14";
      break;
    case "java":
      return "java";
      break;
    default:
      break;
  }
}

function handleOutput(res) {
  $(".loading-container").remove();
  console.log($(loadingHtml));
  console.log(res);
  const arr = res.body.output.split("\n");
  const time = res.body.cpuTime;
  const memory = res.body.memory;
  let op = $(createOutput(arr));
  $(".cpu-time").html(`<div class="cpu-time">Time:${time}</div>`);
  $(".memory").html(`<div class="memory">Memory:${memory}</div>`);
  $(".output").html(op);
}

function createOutput(arr) {
  let str = ``;
  arr.forEach((op) => {
    str += `${op}</br>`;
  });
  return `<p>${str}</p>`;
}

const loadingHtml = `<div class="loading-container">
 <div class="loading">Running...</div>
</div>`;

let dragging = false;
$(".dragbar").mousedown(function (e) {
  dragging = true;
  $("body").mousemove(handleMousemove);
});

$("body").mouseup(function (e) {
  if (dragging) {
    dragging = false;
    $("body")[0].removeEventListener("mousemove", handleMousemove);
  }
});

// $("body").click(function(){

// })

function handleMousemove(e) {
  if (dragging) {
    const xCor = e.pageX;
    let width = $("body").width();
    let val = (((width - xCor) / width) * 100).toFixed(3);
    if (val < 0) val = 0;
    else if (val > 100) val = 100;
    console.log(val);
    $(".output-container").css({ width: `${val}%` });
  }
}
let fullscreen = false;
$(".fas.fa-expand-arrows-alt").click(function (e) {
  fullscreen = true;
  showEscapeMsg(5000);
  $("#editor").toggleClass("fullscreen");
});

function showEscapeMsg(time) {
  $("body").append($(escapeHtml));
  setTimeout(() => {
    $(".escape-msg").remove();
  }, time);
}

$("body").keydown(function (e) {
  if (e.key == "Escape" && fullscreen) {
    fullscreen = false;
    $(".escape-msg").remove();
    $("#editor").toggleClass("fullscreen");
  }
});
editor.on("change", function () {
  const program = editor.session.getValue();
  localStorage.setItem("code", JSON.stringify(program));
});
let escapeHtml = ` <div class="escape-msg">
Press <strong class="bold">Esc</strong> to exit full screen
</div>`;

$(document).ready(function () {
  const program = localStorage.getItem("code")
    ? JSON.parse(localStorage.getItem("code"))
    : "";
  const language = localStorage.getItem("language")
    ? JSON.parse(localStorage.getItem("language"))
    : "c_cpp";
  const theme = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : "monokai";
  const size = localStorage.getItem("fontSize")
    ? JSON.parse(localStorage.getItem("fontSize"))
    : "12";
  // console.log(language);
  // console.log(JSON.parse(theme));
  // console.log(size);
  editor.setTheme(`ace/theme/${theme}`);
  $("#editor")[0].style.fontSize = `${size}px`;
  editor.session.setMode(`ace/mode/${language}`);
  editor.session.setValue(program, -1);
  $("#lang-selector").val(language);
  $("#font-selector").val(size);
  $("#theme-selector").val(theme);
});
