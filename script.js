const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("open"));
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

const noticeOverlay = $("#noticeOverlay");
const closeNotice = () => noticeOverlay.classList.remove("show");
$("#closeNotice")?.addEventListener("click", closeNotice);
$("#understandBtn")?.addEventListener("click", closeNotice);
noticeOverlay?.addEventListener("click", e => { if (e.target === noticeOverlay) closeNotice(); });

setTimeout(() => {
  if (!sessionStorage.getItem("tatagroup_notice_seen")) noticeOverlay.classList.add("show");
}, 650);
function rememberNotice(){ sessionStorage.setItem("tatagroup_notice_seen","1"); }
$("#understandBtn")?.addEventListener("click", rememberNotice);
$("#closeNotice")?.addEventListener("click", rememberNotice);

const carInfo = {
  "Tata Nexon": "A bold compact SUV concept with a confident stance, practical proportions and a versatile everyday character.",
  "Tata Punch": "A compact SUV concept made for city life, with an expressive design and easy-to-live-with dimensions.",
  "Tata Harrier": "A premium SUV concept focused on a commanding presence, strong road character and comfortable journeys.",
  "Tata Safari": "A spacious SUV concept designed around family travel, generous seating and long-distance comfort."
};
const modal = $("#detailModal");
$$(".card-btn").forEach(btn => btn.addEventListener("click", () => {
  $("#modalTitle").textContent = btn.dataset.car;
  $("#modalText").textContent = carInfo[btn.dataset.car] || "Explore this featured model and contact us for more information.";
  modal.classList.add("show");
}));
$("#closeModal")?.addEventListener("click", () => modal.classList.remove("show"));
modal?.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });
$("#modalEnquire")?.addEventListener("click", () => modal.classList.remove("show"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const toTop = $("#toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
  const sections = ["home","cars","offers","about","contact"];
  let current = "home";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 160) current = id;
  });
  $$(".desktop-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});
toTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

$("#contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#name").value.trim();
  $("#formStatus").textContent = `Thanks ${name || "there"}! Your enquiry has been recorded in this demo.`;
  e.target.reset();
});

$("#year").textContent = new Date().getFullYear();
