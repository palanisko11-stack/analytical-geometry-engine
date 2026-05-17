// Jednoduché demo: načte obrázek a vytvoří X vrstev, každá s mírným posunem a rozostřením
const fileInput = document.getElementById('imgfile');
const stage = document.getElementById('stage');
const layersRange = document.getElementById('layers');
const regenBtn = document.getElementById('regen');
let imgURL = null;

fileInput.addEventListener('change', ()=>{
  const f = fileInput.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  imgURL = url;
  buildLayers();
});

regenBtn.addEventListener('click', ()=>{ if(imgURL) buildLayers(); });

function buildLayers(){
  const n = parseInt(layersRange.value,10);
  stage.innerHTML = '';
  for(let i=0;i<n;i++){
    const el = document.createElement('div');
    el.className = 'layer';
    el.style.backgroundImage = `url(${imgURL})`;
    // depth factor 0..1 (0=popředí, 1=zadní plan)
    const depth = i/(n-1);
    // blur and scale slightly by depth
    const blur = depth*6; // px
    const scale = 1 + depth*0.06;
    el.style.filter = `blur(${blur}px)`;
    el.style.transform = `translateZ(${ -depth*300 }px) scale(${scale})`;
    el.dataset.depth = depth;
    stage.appendChild(el);
  }
}

// mouse move parallax
stage.addEventListener('mousemove', (e)=>{
  const rect = stage.getBoundingClientRect();
  const cx = e.clientX - rect.left - rect.width/2;
  const cy = e.clientY - rect.top - rect.height/2;
  const maxShift = 40;
  const layers = stage.children;
  for(const el of layers){
    const depth = parseFloat(el.dataset.depth);
    const shiftX = -(cx/rect.width) * maxShift * (0.2 + (1-depth));
    const shiftY = -(cy/rect.height) * maxShift * (0.2 + (1-depth));
    el.style.left = shiftX + 'px';
    el.style.top = shiftY + 'px';
  }
});

// reset on leave
stage.addEventListener('mouseleave', ()=>{
  for(const el of stage.children){ el.style.left = '0px'; el.style.top = '0px'; }
});
