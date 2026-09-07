/* ==========================================================
   EDIT YOUR GIFT HERE
   ==========================================================
   Change only the values inside DATA. Save the file, then
   refresh index.html.
*/
const DATA = {
  name: "Maryoma",



  message: `شكرا انك في حياتي ، سنة عدت و كنا فيها سوا و مرينا بحاجات كتير ، الحلو و الوحش ، عدينا بأوقات صعبة بس خرجنا منها سوا ، شكرا انك دايما بتبقي جنبي و شكرا انك بترخمي عليا عامة احلى رخامة ف الدنيا و شكرا على حاجات كتير اوي ، كل سنة و انتي كويسة و كل سنة و احنا سوا و عقبال السنين الجاية كلها و يوما ما نحتفل بعيد ميلادك و احنا ف بيتنا ❤️ `,

  finalTitle: "And this is just the beginning...",
  finalMessage: "Whatever happens next, I hope you keep smiling, keep dreaming, and keep being the amazing person you are.",

  // Put your photos inside the "images" folder.
  photos: [
    { file: "photo1.jpg", caption: "أجمل يوم بينا عامة" },
    { file: "photo2.jpg", caption: "السينما العظيمة" },
    { file: "photo3.jpg", caption: "يوم التيك توكات العظيييم" },
    { file: "photo4.jpg", caption: "تيشيرت السينيوووور" },
    { file: "photo5.jpg", caption: "شوفتيني ف كل حالاتي حتى و انا زلبطة" },
    { file: "photo6.jpg", caption: "اليوم التحفة  تاني ❤️" }
  ],

  timeline: [
    { date: "The beginning", title: "اول يوم شوفتك فيه", text: "اول مره شوفتك حسيت اني منبهر." },
    { date: "A favorite day", title: "يوم الشال", text: "اليوم ده انا كنت مبسوط فوق ما تتخيلي." },
    { date: "Today", title: "عيد ميلادك", text: "و دلوقتي احنا هنا ، كل سنة و احنا سوا. 🎂" }
  ],

  // Optional: put an audio file in the "music" folder.
  music: "birthday.mp3"
};

const $ = id => document.getElementById(id);

// Fill content
$("name").textContent = DATA.name;
$("message").textContent = DATA.message;
$("finalTitle").textContent = DATA.finalTitle;
$("finalMessage").textContent = DATA.finalMessage;

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => $("loader").classList.add("done"), 1550);
});

// Cinematic gallery + fallback placeholders
const gallery = $("gallery");
DATA.photos.forEach((photo, i) => {
  const card = document.createElement("article");
  card.className = "photo";
  const img = document.createElement("img");
  img.src = `images/${photo.file}`;
  img.alt = `Memory ${i+1}`;
  img.loading = i < 2 ? "eager" : "lazy";
  img.onerror = () => {
    img.src = `https://placehold.co/1200x900/eee/555?text=Add+${encodeURIComponent(photo.file)}`;
  };
  const caption = document.createElement("p");
  caption.textContent = photo.caption;
  card.append(img, caption);
  card.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(card);
});

// Timeline
const timeline = $("timeline");
DATA.timeline.forEach(item => {
  const el = document.createElement("article");
  el.className = "timeline-item";
  el.innerHTML = `<div class="date"></div><h4></h4><p></p>`;
  el.querySelector(".date").textContent = item.date;
  el.querySelector("h4").textContent = item.title;
  el.querySelector("p").textContent = item.text;
  timeline.appendChild(el);
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal-on-scroll").forEach(el => revealObserver.observe(el));

// Gift opening
function confetti() {
  const holder = $("confetti");
  for (let i=0;i<100;i++) {
    const p=document.createElement("span");
    p.className="confetti-piece";
    p.style.left=`${Math.random()*100}vw`;
    p.style.setProperty("--x",`${(Math.random()-.5)*260}px`);
    p.style.animationDelay=`${Math.random()*.7}s`;
    p.style.transform=`rotate(${Math.random()*180}deg)`;
    p.style.background=`hsl(${Math.random()*360} 70% 75%)`;
    holder.appendChild(p);
    setTimeout(()=>p.remove(),3600);
  }
}
$("openGift").addEventListener("click", () => {
  $("openGift").classList.add("opening");
  setTimeout(() => {
    $("intro").classList.add("hidden");
    $("content").classList.remove("hidden");
    confetti();
    window.scrollTo({top:0,behavior:"smooth"});
    setupMusic();
  }, 720);
});

// Music
function setupMusic(){
  if (!DATA.music || !DATA.music.trim()) return;
  const audio=$("music");
  audio.src=`music/${DATA.music}`;
  audio.volume=.55;
  audio.play().then(()=>$("musicBtn").classList.remove("hidden"))
    .catch(()=>$("musicBtn").classList.remove("hidden"));
}
$("musicBtn").addEventListener("click",()=>{
  const audio=$("music");
  if(audio.paused){audio.play();$("musicBtn").classList.add("playing")}
  else{audio.pause();$("musicBtn").classList.remove("playing")}
});

// Lightbox
let currentPhoto=0;
function openLightbox(index){
  currentPhoto=index;
  const photo=DATA.photos[index];
  $("lightboxImg").src=`images/${photo.file}`;
  $("lightboxCaption").textContent=photo.caption;
  $("lightbox").classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeLightbox(){ $("lightbox").classList.add("hidden"); document.body.style.overflow=""; }
function showPhoto(delta){
  currentPhoto=(currentPhoto+delta+DATA.photos.length)%DATA.photos.length;
  openLightbox(currentPhoto);
}
$("closeLightbox").addEventListener("click",closeLightbox);
$("prevPhoto").addEventListener("click",()=>showPhoto(-1));
$("nextPhoto").addEventListener("click",()=>showPhoto(1));
$("lightbox").addEventListener("click",e=>{if(e.target===$("lightbox"))closeLightbox()});
document.addEventListener("keydown",e=>{
  if($("lightbox").classList.contains("hidden")) return;
  if(e.key==="Escape") closeLightbox();
  if(e.key==="ArrowLeft") showPhoto(-1);
  if(e.key==="ArrowRight") showPhoto(1);
});
