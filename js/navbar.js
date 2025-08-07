async function loadNavbar() {
  const container = document.createElement("div");
  try {
    const res = await fetch("components/navbar.html");
    const html = await res.text();
    container.innerHTML = html;
    document.body.insertBefore(container, document.body.firstChild);

    const logoutBtn = document.getElementById("logoutBtnNav");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "login.html";
      });
    }

    const hamburger = container.querySelector(".hamburger");
    const navLinks = container.querySelector(".nav-links");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }

  } catch (err) {
    console.error("Navbar loading failed:", err);
  }
}

const page = window.location.pathname;
if (page.includes("user.html") || page.includes("admin.html")) {
  loadNavbar();
}
