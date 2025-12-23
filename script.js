const WHATSAPP_NUMBER = "96565750302"; // حط رقمك الدولي بدون +

function initWhatsApp(){
  const waLink = document.getElementById("waLink");
  if (waLink){
    waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }
}

function initYear(){
  const y = document.getElementById("year");
  if (y){
    y.textContent = new Date().getFullYear();
  }
}

function setActiveNav(){
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(link=>{
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === page){
      link.classList.add("active");
    }
  });
}

function initTripForm(){
  const form = document.getElementById("tripForm");
  const copyBtn = document.getElementById("copyBtn");
  if (!form) return;

  function buildMessage(data){
    return [
      "طلب رحلة جديد ✈️",
      `الاسم: ${data.name}`,
      `التواصل: ${data.phone}`,
      `الوجهة: ${data.dest}`,
      `الأيام: ${data.days}`,
      `البالغين: ${data.adults}`,
      `الأطفال: ${data.kids}`,
      `ملاحظات: ${data.notes || "-"}`,
      "",
      "تم الإرسال من الموقع."
    ].join("\n");
  }

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const msg = buildMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  if (copyBtn){
    copyBtn.addEventListener("click", async ()=>{
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const msg = buildMessage(data);
      try{
        await navigator.clipboard.writeText(msg);
        copyBtn.textContent = "تم النسخ ✅";
        setTimeout(()=>copyBtn.textContent="نسخ النص", 1200);
      }catch{
        alert("ماقدر أنسخ. انسخ يدويًا إذا لزم.");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  initWhatsApp();
  initYear();
  setActiveNav();
  initTripForm();
});
