var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
canvas.width = 620;
canvas.height = 350;

var image = new Image();
var imageLogo = new Image();

let btn_download = document.querySelector(".btn_download");
let btn_add_text = document.querySelector("#btn-add-text");
let box_add_text = document.querySelector("#box-add-text");
let btn_add_logo = document.querySelector("#btn-add-logo");
let box_add_logo = document.querySelector("#box-add-logo");
let btn_select_logo = document.querySelector("#btn_select_logo");
let input_logo = document.querySelector("#input_logo");

function chenChu() {
  // Nút chèn chữ
  let btn_chen = document.querySelector("#btn_chen");
  // Input trục X
  let input_rangeX = document.querySelector("#input_rangeX");
  // Set max bằng width của canvas
  input_rangeX.setAttribute("max", canvas.width);
  // Input trục Y
  let input_rangeY = document.querySelector("#input_rangeY");
  // Set max bằng height của canvas
  input_rangeY.setAttribute("max", canvas.height);
  // Input màu sắc
  let input_color = document.querySelector("#input_color");
  // Input xoay
  let input_rotate = document.querySelector("#input_rotate");
  // Input size
  let input_size = document.querySelector("#input_size");
  // Input alpha
  let input_alpha = document.querySelector("#input_alpha");
  // In đậm 
  let input_bold = document.querySelector("#input_bold");

  function draw() {
    let trucX = document.querySelector("#input_rangeX").value;
    let trucY = document.querySelector("#input_rangeY").value;
    let mausac = document.querySelector("#input_color").value;
    let kichthuoc = document.querySelector("#input_size").value;
    let chu = document.getElementById("input_text").value;
    let xoay = document.getElementById("input_rotate").value;
    let alpha = document.getElementById("input_alpha").value;
    let font = document.getElementById("select_font").value;

    let italic = document.getElementById("input_italic");
    let bold = document.getElementById("input_bold");


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.font = `${italic.checked ? 'italic' : ''} ${bold.checked ? 'bold' : ''} ${kichthuoc}px ${font}`;
    ctx.fillStyle = mausac;
    ctx.globalAlpha = alpha / 100;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.translate(trucX, trucY);
    ctx.rotate((xoay * Math.PI) / 180);

    ctx.fillText(chu, 0, 0);

    ctx.restore();
  }
  btn_chen.onclick = draw;
  input_rangeX.onchange = draw;
  input_rangeY.onchange = draw;
  input_color.onchange = draw;
  input_rotate.onchange = draw;
  input_size.onchange = draw;
  input_alpha.onchange = draw;
  input_bold.onchange = draw;
  input_italic.onchange = draw;
  select_font.onchange = draw;

  btn_download.onclick = () => {
    var link = document.createElement("a");
    link.download = "result.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
    console.log("download");
  };
}

function chenLogo() {
  // Input trục X
  let input_logoX = document.querySelector("#input_logoX");
  // Set max bằng width của canvas
  input_logoX.setAttribute("max", canvas.width);
  // Input trục Y
  let input_logoY = document.querySelector("#input_logoY");
  // Set max bằng height của canvas
  input_logoY.setAttribute("max", canvas.height);
  // Input xoay
  let input_rotate_logo = document.querySelector("#input_rotate_logo");
  // Input độ mờ
  let input_alpha_logo = document.querySelector("#input_alpha_logo");
  // Input kích thước
  let input_logoSize = document.querySelector("#input_logoSize");
  input_logoSize.setAttribute("max", canvas.height);

  function draw() {
    let trucX = document.querySelector("#input_logoX").value;
    let trucY = document.querySelector("#input_logoY").value;
    let kichthuoc = document.querySelector("#input_logoSize").value;
    let alpha = document.getElementById("input_alpha_logo").value;
    let xoay = document.getElementById("input_rotate_logo").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.globalAlpha = alpha / 100;
    ctx.translate(trucX, trucY);
    ctx.rotate((Math.PI / 180) * xoay);
    ctx.drawImage(
      imageLogo,
      - kichthuoc / 2,
      - kichthuoc / 2,
      kichthuoc,
      kichthuoc
    );
    ctx.restore();
  }

  input_logoX.onchange = draw;
  input_logoY.onchange = draw;
  input_logoSize.onchange = draw;
  input_rotate_logo.onchange = draw;
  input_alpha_logo.onchange = draw;

  btn_download.onclick = () => {
    var link = document.createElement("a");
    link.download = "result.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
  };
}

// Vẽ ảnh xem trước khi ảnh được load
image.onload = () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};
// Vẽ ảnh logo
imageLogo.onload = () => {
  ctx.drawImage(imageLogo, 0, 0, 100, 100);
};

btn_add_text.onclick = () => {
  box_add_text.style.display = "block";
  btn_download.style.display = "block";
  box_add_logo.style.display = "none";
  chenChu();
};
btn_add_logo.onclick = () => {
  box_add_logo.style.display = "block";
  btn_download.style.display = "block";
  btn_select_logo.style.display = "inline-block";
  box_add_text.style.display = "none";
  chenLogo();
};

input_file.onchange = (e) => {
  let url = URL.createObjectURL(e.target.files[0]);
  image.src = url;
};

input_logo.onchange = (e) => {
  let url = URL.createObjectURL(e.target.files[0]);
  imageLogo.src = url;
};
