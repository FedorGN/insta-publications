const photos = {
  essay:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=90',
  trail:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&q=90',
  book:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=90',
  quote:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=90',
  split:'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&q=90',
  statement:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90'
};
const samples={
  essay:{title:'Somewhere,\nfar from noise.',subtitle:'On learning to be still in places that make you feel small.',meta:'FRENCH ALPS · 45°55′N',number:'VOL. 01 — 2026'},
  trail:{title:'The long way\nis the good way.',subtitle:'18 kilometres · 1,420 m elevation · a reminder to keep moving.',meta:'DOLOMITES, ITALY',number:'TRAIL 023 — 2026'},
  book:{title:'The stories\nwe carry.',subtitle:'Jack London’s The Star Rover — a luminous meditation on freedom, resilience, and the reach of the human spirit.',meta:'JACK LONDON · THE STAR ROVER',number:'BOOK NOTES / 004'},
  quote:{title:'There is beauty\nin taking\nthe slower road.',subtitle:'A small note to remember what matters.',meta:'NOTES TO SELF',number:'ISSUE 012'},
  split:{title:'Into the\nopen air.',subtitle:'Notes from a place measured in horizons, weather, and time.',meta:'NORTHERN RIDGE · 58°35′N',number:'FIELD JOURNAL — 2026'},
  statement:{title:'Stay curious.',subtitle:'The places that change us rarely announce themselves at first.',meta:'NOTES FROM THE ROAD',number:'VOL. 02 — 2026'}
};
const $=s=>document.querySelector(s);
const fields=['title','subtitle','meta','number'];
let current='essay'; let bgOverrides={};
const headlineFonts={
  baskerville:"'Libre Baskerville',Georgia,serif",
  georgia:"Georgia,'Times New Roman',serif",
  newsreader:"'Newsreader',Georgia,serif"
};

const artboard=$('#artboard');
function setHeadlineFont(){ document.documentElement.style.setProperty('--font-serif',headlineFonts[$('#fontInput').value]||headlineFonts.baskerville); updatePreview(); }
$('#fontInput').addEventListener('change',setHeadlineFont);
function updatePreview(){
 $('#titlePreview').textContent=$('#titleInput').value;
 $('#subtitlePreview').textContent=$('#subtitleInput').value;
 $('#metaPreview').textContent=$('#metaInput').value;
 $('#editionPreview').textContent=$('#numberInput').value;
 const metaRow=$('#metaRow');
 metaRow.hidden=!$('#metaLineToggle').checked;
 metaRow.style.display=metaRow.hidden?'none':'';
 let url=bgOverrides[current]||photos[current];
 const gradientToggle=$('#backgroundGradientToggle');
 const gradientEnabled=gradientToggle ? gradientToggle.checked : true;
 $('#artboard').classList.toggle('gradient-disabled',!gradientEnabled);
 $('#photoBg').style.backgroundImage=gradientEnabled
   ? `linear-gradient(160deg,rgba(36,57,47,.08),rgba(8,18,13,.08)),url(${JSON.stringify(url)})`
   : `url(${JSON.stringify(url)})`;
 const title=$('#titlePreview'); const n=$('#titleInput').value.length;
 title.style.fontSize=(current==='statement'?Math.max(58,78-Math.max(0,n-36)*.38):current==='quote'?Math.max(57,82-Math.max(0,n-54)*.47):current==='split'?Math.max(55,72-Math.max(0,n-44)*.32):current==='trail'?Math.max(51,72-Math.max(0,n-51)*.38):current==='book'?Math.max(52,74-Math.max(0,n-50)*.38):Math.max(54,87-Math.max(0,n-49)*.48))+'px';
 const textShadowToggle=$('#textShadowToggle');
 const textShadowEnabled=textShadowToggle ? textShadowToggle.checked : false;
 $('#artboard').classList.toggle('text-shadow-enabled',textShadowEnabled);
}
function setTemplate(name){current=name;artboard.className='artboard template-'+name;document.querySelectorAll('[data-template]').forEach(b=>b.classList.toggle('active',b.dataset.template===name));const s=samples[name];fields.forEach(f=>$('#'+f+'Input').value=s[f]);$('#photoUrlInput').value='';updatePreview();}
document.querySelectorAll('[data-template]').forEach(b=>b.addEventListener('click',()=>setTemplate(b.dataset.template)));
fields.forEach(f=>$('#'+f+'Input').addEventListener('input',updatePreview));
$('#metaLineToggle').addEventListener('change',updatePreview);
$('#textShadowToggle').addEventListener('change',updatePreview);
$('#backgroundGradientToggle').addEventListener('change',updatePreview);
$('#photoInput').addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;bgOverrides[current]=URL.createObjectURL(file);updatePreview();});
$('#photoUrlInput').addEventListener('change',e=>{if(e.target.value.trim()){bgOverrides[current]=e.target.value.trim();updatePreview();}});
$('#resetBtn').addEventListener('click',()=>{delete bgOverrides[current];setTemplate(current);});
function scale(){const rect=$('.artboard-scale').getBoundingClientRect();artboard.style.setProperty('--preview-scale',rect.width/1080);}
window.addEventListener('resize',scale);if('ResizeObserver' in window)new ResizeObserver(scale).observe($('.artboard-scale'));
// Export uses html-to-image loaded on demand. The source images need CORS support.
$('#exportBtn').addEventListener('click',async()=>{
 const btn=$('#exportBtn');const label=btn.textContent;btn.textContent='Rendering…';btn.disabled=true;
 try{
   if(!window.htmlToImage){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';script.onload=resolve;script.onerror=reject;document.head.appendChild(script);});}
   await document.fonts.ready;
   const old=artboard.style.transform;artboard.style.transform='none';
   const data=await window.htmlToImage.toPng(artboard,{pixelRatio:1,width:1080,height:1350,cacheBust:true,skipAutoScale:true});
   artboard.style.transform=old;
   const a=document.createElement('a');a.href=data;a.download=`fieldnotes-${current}.png`;a.click();
 }catch(e){alert('Browser export was blocked (usually cross-origin sample photos or offline CDN). Upload your own photo, or use the included Playwright exporter.\n\n'+e.message);}
 finally{artboard.style.transform='';btn.disabled=false;btn.textContent=label;}
});
setHeadlineFont();setTemplate('essay');scale();
