const photos = {
  essay:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=90',
  trail:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&q=90',
  book:'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=90',
  quote:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=90',
  split:'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&q=90',
  statement:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90',
  summit:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=90',
  expedition:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=90'
};
const samples={
  essay:{title:'Somewhere,\nfar from noise.',subtitle:'On learning to be still in places that make you feel small.',meta:'FRENCH ALPS · 45°55′N',number:'VOL. 01 — 2026'},
  trail:{title:'The long way\nis the good way.',subtitle:'18 kilometres · 1,420 m elevation · a reminder to keep moving.',meta:'DOLOMITES, ITALY',number:'TRAIL 023 — 2026'},
  book:{title:'The stories\nwe carry.',subtitle:'Jack London’s The Star Rover — a luminous meditation on freedom, resilience, and the reach of the human spirit.',meta:'JACK LONDON · THE STAR ROVER',number:'BOOK NOTES / 004'},
  quote:{title:'There is beauty\nin taking\nthe slower road.',subtitle:'A small note to remember what matters.',meta:'NOTES TO SELF',number:'ISSUE 012'},
  split:{title:'Into the\nopen air.',subtitle:'Notes from a place measured in horizons, weather, and time.',meta:'NORTHERN RIDGE · 58°35′N',number:'FIELD JOURNAL — 2026'},
  statement:{title:'Stay curious.',subtitle:'The places that change us rarely announce themselves at first.',meta:'NOTES FROM THE ROAD',number:'VOL. 02 — 2026'},
  summit:{title:'Earn the view.',subtitle:'One last climb. One wide-open horizon. All worth the effort.',meta:'HIGH CAMP · 3,840 M',number:'SUMMIT LOG / 007',summitLabel:'07  /  SUMMIT LOG'},
  expedition:{title:'Beyond the\nlast switchback.',subtitle:'A field record of rough weather, steady legs, and the long route home.',meta:'NORTH FORK · 46°51′N',number:'EXPEDITION 008 · 2026'}
};
const $=s=>document.querySelector(s);
const fields=['title','subtitle','meta','number'];
let current='essay'; let bgOverrides={};
const subtitleSizes={essay:35,trail:35,book:35,quote:35,split:35,statement:35,summit:35,expedition:35};
const titleSizes={essay:87,trail:72,book:74,quote:82,split:72,statement:78,summit:88,expedition:96};
const metaSizes={essay:22,trail:22,book:22,quote:22,split:22,statement:22,summit:22,expedition:22};
const compositionMarkers={essay:'01  /  PHOTO ESSAY',trail:'02  /  TRAIL LOG',book:'03  /  BOOK NOTES',quote:'04  /  QUIET QUOTE',split:'05  /  FIELD SPREAD',statement:'06  /  FRAMED STATEMENT',expedition:'08  /  EXPEDITION INDEX'};
const headlineFonts={
  barlow:"'Barlow Condensed',Impact,sans-serif",
  oswald:"'Oswald','Arial Narrow',sans-serif"
};

const artboard=$('#artboard');
function setHeadlineFont(){ document.documentElement.style.setProperty('--font-headline',headlineFonts[$('#fontInput').value]||headlineFonts.barlow); updatePreview(); }
$('#fontInput').addEventListener('change',setHeadlineFont);
function updatePreview(){
 const compositionMarker=$('#compositionMarkerInput').value.trim();
 $('#compositionMarkerPreview').textContent=compositionMarker;
 $('#compositionMarkerPreview').hidden=!compositionMarkers[current]||!compositionMarker;
 $('#compositionMarkerField').hidden=!compositionMarkers[current];
 $('#compositionMarkerSizeField').hidden=false;
 const compositionMarkerSize=Number($('#compositionMarkerSizeInput').value);
 if(Number.isFinite(compositionMarkerSize)&&compositionMarkerSize>=8&&compositionMarkerSize<=32){
   $('#compositionMarkerPreview').style.fontSize=compositionMarkerSize+'px';
   $('#summitMarkerPreview').style.fontSize=compositionMarkerSize+'px';
 }
 const summitLabel=$('#summitLabelInput').value.trim();
 $('#summitMarkerPreview').textContent=summitLabel;
 $('#summitMarkerPreview').hidden=current!=='summit'||!summitLabel;
 $('#summitLabelField').hidden=current!=='summit';
 $('#titlePreview').textContent=$('#titleInput').value;
 const titleSize=Number($('#titleSizeInput').value);
 if(Number.isFinite(titleSize)&&titleSize>=24&&titleSize<=180) $('#titlePreview').style.fontSize=titleSize+'px';
 const subtitle=$('#subtitlePreview');
 subtitle.textContent=$('#subtitleInput').value;
 const subtitleSize=Number($('#subtitleSizeInput').value);
 if(Number.isFinite(subtitleSize)&&subtitleSize>=12&&subtitleSize<=64) subtitle.style.fontSize=subtitleSize+'px';
 $('#metaPreview').textContent=$('#metaInput').value;
 $('#editionPreview').textContent=$('#numberInput').value;
 const metaRow=$('#metaRow');
 const metaSize=Number($('#metaSizeInput').value);
 if(Number.isFinite(metaSize)&&metaSize>=10&&metaSize<=48) metaRow.style.fontSize=metaSize+'px';
 metaRow.hidden=!$('#metaLineToggle').checked;
 metaRow.style.display=metaRow.hidden?'none':'';
 let url=bgOverrides[current]||photos[current];
 const gradientToggle=$('#backgroundGradientToggle');
 const gradientEnabled=gradientToggle ? gradientToggle.checked : true;
 $('#artboard').classList.toggle('gradient-disabled',!gradientEnabled);
 $('#photoBg').style.backgroundImage=gradientEnabled
   ? `linear-gradient(160deg,rgba(36,57,47,.08),rgba(8,18,13,.08)),url(${JSON.stringify(url)})`
   : `url(${JSON.stringify(url)})`;
 const textShadowToggle=$('#textShadowToggle');
 const textShadowEnabled=textShadowToggle ? textShadowToggle.checked : false;
 $('#artboard').classList.toggle('text-shadow-enabled',textShadowEnabled);
}
function setTemplate(name){current=name;artboard.className='artboard template-'+name;document.querySelectorAll('[data-template]').forEach(b=>b.classList.toggle('active',b.dataset.template===name));const s=samples[name];fields.forEach(f=>$('#'+f+'Input').value=s[f]);$('#compositionMarkerInput').value=compositionMarkers[name]||'';$('#summitLabelInput').value=s.summitLabel||'';$('#titleSizeInput').value=titleSizes[name];$('#subtitleSizeInput').value=subtitleSizes[name];$('#metaSizeInput').value=metaSizes[name];$('#photoUrlInput').value='';updatePreview();}
document.querySelectorAll('[data-template]').forEach(b=>b.addEventListener('click',()=>setTemplate(b.dataset.template)));
fields.forEach(f=>$('#'+f+'Input').addEventListener('input',updatePreview));
$('#compositionMarkerInput').addEventListener('input',updatePreview);
$('#compositionMarkerSizeInput').addEventListener('input',updatePreview);
$('#summitLabelInput').addEventListener('input',updatePreview);
$('#subtitleSizeInput').addEventListener('input',updatePreview);
$('#titleSizeInput').addEventListener('input',updatePreview);
$('#metaSizeInput').addEventListener('input',updatePreview);
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
