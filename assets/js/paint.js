const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas를 pixel 단위로 다루기 위해
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

// for the Pixel Maniplation (canvas 픽셀의 크기를 지정)
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // canvas 의 배경 default color 지정
ctx.strokeStyle = INITIAL_COLOR; // context 내부에서 지정되는 line color (default로 지정)
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //
//ctx.globalCompositeOperation = "destination-over";

let painting = false;
let filling = false;

const stopPainting = () => (painting = false);
const startPainting = () => (painting = true);

const onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in ", x, y);
    ctx.beginPath(); // path 는 line (현재 마우스 위치가 starting point) , click 하면 path 가 만들어지지 않는다.
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in ", x, y);
    ctx.lineTo(x, y); // previous position 에서 현재 위치까지 선을 잇는다
    ctx.stroke(); // stroke the current sub-path with the current stroke style (획을 긋는것)
  }
};

const handleColorClick = event => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color; // color를 click 했을때, fill color도 동시에 지정.
};

const handleRangeChange = event => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const handleCM = event => {
  event.preventDefault();
};

const handleSaveClick = () => {
  // const image = canvas.toDataURL("image/jpeg"); // image를 url로 변환
  const image = canvas.toDataURL(); // default 로 png 확장자 갖는다
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]"; // download 는 anchor tag의 속성: 파일명
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from(object) // object 로부터 array를 만들어준다
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
