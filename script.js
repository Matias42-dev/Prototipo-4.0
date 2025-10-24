// -----------------------------
// SISTEMA DE LOGIN SIMULADO
// -----------------------------
const users = {
  alumno: { username: "alumno", password: "1234", view: "studentView" },
  docente: { username: "docente", password: "1234", view: "teacherView" },
  admin: { username: "admin", password: "1234", view: "adminView" }
};

const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

loginBtn.addEventListener("click", () => {
  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users[role];
  if (user && username === user.username && password === user.password) {
    document.getElementById("loginView").classList.add("hidden");
    document.getElementById(user.view).classList.remove("hidden");
  } else {
    loginError.style.display = "block";
  }
});

// Botones de cierre de sesión
document.querySelectorAll(".logout").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("main").forEach(m => m.classList.add("hidden"));
    document.getElementById("loginView").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
});

// -----------------------------
// FUNCIONES SIMULADAS
// -----------------------------
const generateQR = document.getElementById("generateQR");
const qrCodeDiv = document.getElementById("qrCode");
const attendanceList = document.getElementById("attendanceList");

if (generateQR) {
  generateQR.addEventListener("click", () => {
    qrCodeDiv.innerHTML = "";
    const randomCode = "Clase-" + Math.floor(Math.random() * 10000);
    new QRCode(qrCodeDiv, randomCode);
    localStorage.setItem("qrCode", randomCode);
  });
}

const registerBtn = document.getElementById("registerAttendance");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const code = document.getElementById("manualCode").value;
    const storedCode = localStorage.getItem("qrCode");
    if (code === storedCode) {
      alert("Asistencia registrada correctamente.");
      let records = JSON.parse(localStorage.getItem("attendance") || "[]");
      records.push({ code, time: new Date().toLocaleTimeString() });
      localStorage.setItem("attendance", JSON.stringify(records));
    } else {
      alert("Código incorrecto.");
    }
  });
}

if (attendanceList) {
  const records = JSON.parse(localStorage.getItem("attendance") || "[]");
  attendanceList.innerHTML = records.map(r => `<li>${r.code} - ${r.time}</li>`).join("");
}
