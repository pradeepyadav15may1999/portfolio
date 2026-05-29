
// Cursor
const cd = document.getElementById('cd'), cr = document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.proj-card,.sk-chip').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cr.style.width='48px';cr.style.height='48px';cr.style.borderColor='rgba(0,201,167,.7)';});
  el.addEventListener('mouseleave',()=>{cr.style.width='32px';cr.style.height='32px';cr.style.borderColor='rgba(0,201,167,.5)';});
});

// Scroll bar
window.addEventListener('scroll',()=>{
  document.getElementById('sb').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
  // Active nav
  let cur='';
  document.querySelectorAll('section').forEach(s=>{if(window.scrollY>=s.offsetTop-140)cur=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--teal)':'';});
});

// Mobile nav
function tm(){document.getElementById('nl').classList.toggle('open');}
function cm(){document.getElementById('nl').classList.remove('open');}

// Scroll reveal
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*70);ro.unobserve(e.target);}});
},{threshold:0.1});
document.querySelectorAll('.rev').forEach(r=>ro.observe(r));

// Skill bars
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){
    e.target.querySelectorAll('.sk-fill').forEach(f=>{setTimeout(()=>{f.style.width=f.dataset.w+'%';},200);});
    so.unobserve(e.target);
  }});
},{threshold:0.2});
document.querySelectorAll('.skills-wrap').forEach(w=>so.observe(w));

// Terminal typewriter
const lines=[
  '> Loading dataset…',
  '> Cleaning: 43 nulls removed',
  '> Correlation matrix computed',
  '> Outliers flagged: 12',
  '> Report exported ✓'
];
let li=0,ci=0;
const tel=document.getElementById('ttype');
function type(){
  if(li>=lines.length){li=0;tel.textContent='';}
  if(ci<lines[li].length){tel.textContent+=lines[li][ci++];setTimeout(type,45);}
  else{ci=0;li++;tel.textContent+='\n';setTimeout(type,700);}
}
setTimeout(type,1000);

// Form
function sendMsg(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('fe').value.trim();
  const m=document.getElementById('fm').value.trim();
  if(!n||!e||!m){alert('Please fill in all fields.');return;}
  const btn=document.querySelector('.f-submit');
  btn.textContent='Sending…';btn.style.background='var(--muted)';
  setTimeout(()=>{btn.style.display='none';document.getElementById('fs2').style.display='block';},1200);
}
