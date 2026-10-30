import './style.css';
import { WHATSAPP, HORARIOS, T3, BURGERS, ESPECIALES, SECCIONES, TABS, RECETA } from './data.js';
import ILUSTRACION from './assets/ilustracion.js';
import { VB, LETRAS } from './assets/logo.js';

/* =============== SVGs (logo + ilustración) =============== */
const letras = LETRAS.map((d, i) => `<path class="l" style="--i:${i}" fill="currentColor" fill-rule="evenodd" d="${d}"/>`).join('');
document.getElementById('logoPaths').innerHTML = LETRAS.map(d => `<path d="${d}"/>`).join('');
document.getElementById('logoIntro').innerHTML = letras;
document.getElementById('logoHero').innerHTML = letras;
document.getElementById('escena').innerHTML = ILUSTRACION;
/* =============== UTIL =============== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>"$"+n.toLocaleString("es-AR");
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
$$("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =============== INTRO =============== */
(function(){
  const intro=$("#intro");
  if(reduce){intro.remove();document.documentElement.style.setProperty("--d0","0s");return}
  setTimeout(()=>intro.classList.add("fuera"),1250);
  setTimeout(()=>intro.remove(),2400);
})();

/* =============== OLAS (se generan) =============== */
function olaPath(w,h,base,amp,lam){let d=`M0 ${base}`;for(let x=0;x<w;x+=lam){d+=` Q${x+lam/4} ${base-amp} ${x+lam/2} ${base} T${x+lam} ${base}`}return d+` V${h} H0 Z`}
function olas(el,col1,col2,col3){
  const w=2880,h=120;
  el.innerHTML=`<svg class="o1" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${olaPath(w,h,46,18,240)}" fill="${col1}" stroke="#1B1B1A" stroke-width="3"/></svg>
  <svg class="o2" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${olaPath(w,h,58,14,180)}" fill="${col2}" stroke="#1B1B1A" stroke-width="3"/></svg>
  <svg class="o3" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${olaPath(w,h,70,10,160)}" fill="${col3}" stroke="#1B1B1A" stroke-width="3"/></svg>`;
}
olas($("#olasHero"),"#86ADA8","#EFE5D6","#F1EBE0");
olas($("#olasPie"),"#86ADA8","#EFE5D6","#E5213A");

/* burbujas */
function burbujas(el,n,min,max){for(let i=0;i<n;i++){const s=document.createElement("span");const z=min+Math.random()*(max-min);s.style.cssText=`left:${Math.random()*100}%;width:${z}px;height:${z}px;animation-duration:${3+Math.random()*4}s;animation-delay:${-Math.random()*6}s;--x:${(Math.random()*60-30).toFixed(0)}px`;el.appendChild(s)}}
burbujas($("#burbujas2"),12,8,20);

/* cinta */
const est=`<svg viewBox="0 0 100 100"><use href="#estrellaSym" fill="currentColor"/></svg>`;
const ct=`<span><b class="wide">The real burger</b>${est}<b class="wide">#sunsetgang</b>${est}<b class="wide">González Catán</b>${est}<b class="wide">Birra · fernet · plancha</b>${est}</span>`;
$("#cinta").innerHTML=ct+ct;

/* =============== PARALLAX =============== */
const ilu=$("#ilu"),logoHero=$(".hero .logo"),nav=$("#nav");let lastY=0,tick=false,mx=0,my=0;
function frame(){
  const y=scrollY;
  if(y<1200){ilu.style.transform=`translate3d(0,${y*.16}px,0)`;ilu.style.setProperty('--mx',mx.toFixed(3));ilu.style.setProperty('--my',my.toFixed(3));logoHero.style.transform=`translateY(${y*.35}px)`;logoHero.style.opacity=Math.max(0,1-y/650)}
  nav.classList.toggle("solid",y>60);
  nav.classList.toggle("esconder",y>500&&y>lastY+4);
  if(y<lastY-4||y<500)nav.classList.remove("esconder");
  lastY=y;tick=false;
}
if(!reduce){
  addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
  addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
}else addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>60),{passive:true});

/* =============== CARTA =============== */
let tabActual="burgers";
$("#tabs").innerHTML=TABS.map(([k,n,c])=>`<button class="tab ${k==tabActual?"on":""}" role="tab" data-t="${k}" style="--tc:${c}"><span class="fondo" style="background:${c}"></span>${n}</button>`).join("");
function titulo(lineas,color){
  const t=$("#titulo");t.classList.remove("in");t.style.color=color;let c=0;
  t.innerHTML=lineas.map(l=>`<span class="lin">${[...l].map(ch=>`<span class="ch" style="--c:${c++}">${ch==" "?"&nbsp;":ch}</span>`).join("")}</span>`).join("");
  if(tituloVisto||reduce)requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("in")));
}
let tituloVisto=false;
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){tituloVisto=true;$("#titulo").classList.add("in");o.disconnect()}},{threshold:.3}).observe($("#titulo"));
function pill(nombre,precio,col){return `<button class="pill" style="--c:${col||"var(--azul)"}" data-add="${nombre}|${precio}" aria-label="Agregar ${nombre} ${fmt(precio)}">${fmt(precio)}</button>`}
function render(){
  const p=$("#panel");
  if(tabActual=="burgers"){
    titulo(["The real","burger"],"var(--azul)");$("#estrella").classList.remove("oculta");
    const T=["Simple","Doble","Triple"];
    p.innerHTML=`<div class="cuerpo panel"><div class="lista"><p class="pista mano"><svg viewBox="0 0 44 26" aria-hidden="true"><path d="M2 6 Q 20 0 34 14" stroke="#E5213A" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 16 L35 15 L34 8" stroke="#E5213A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>tocá el ojito para ver de qué está hecha cada una</p><div class="fila-h"><span></span><span>Simple</span><span>Doble</span><span>Triple</span></div>
    ${BURGERS.map(([n,d,pr,nu],k)=>`<div class="fila" style="--k:${k}" data-nombre="${n}" data-precios='${JSON.stringify(pr)}'><div><div class="nm">${n}${botonOjo(n,k)}${nu?'<span class="nueva mano">¡nueva!</span>':""}</div><div class="ds">${d}</div></div>${pr.map((x,i)=>pill(`${n} ${T[i]}`,x)).join("")}</div><div class="despiece" id="dp-${k}"></div>`).join("")}</div>
    <div class="lado"><div class="caja">${ESPECIALES.map(([n,d,x],j)=>`<div><div class="item in" data-nombre="${n}" data-precios='[${x}]'><div><div class="nm">${n}${botonOjo(n,"e"+j)}</div><div class="ds">${d}</div></div>${pill(n,x,"var(--lila)").replace('class="pill"','class="pill solo"')}</div><div class="despiece" id="dp-e${j}"></div></div>`).join("")}</div>
    <svg class="zigzag" viewBox="0 0 340 16" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 ${Array.from({length:34},(_,i)=>`L${i*10+10} ${i%2?14:2}`).join(" ")}" stroke="#E5213A" stroke-width="2.5" fill="none" stroke-linejoin="round"/></svg>
    <p class="nota-v">*Opcional: convertí tu hamburguesa favorita en veggie con medallón de lenteja.</p>
    <div class="adic"><b>Adicionales</b><p>Carne 120 g $3.000 · Cheddar, danbo, panceta, huevo, cebolla caramelizada, pepinos $1.500 · Papas sabor Doritos $2.000</p></div>
    <a class="btn btn-rojo" target="_blank" href="${wa("Hola Sunset! Quiero hacer un pedido 🍔")}">Pedí por WhatsApp</a></div></div>`;
  } else {
    const s=SECCIONES[tabActual];titulo(s.titulo,s.color);$("#estrella").classList.add("oculta");
    p.innerHTML=`<div class="cuerpo panel"><div class="lista"><p class="mano" style="font-size:28px;color:${s.color};margin-bottom:6px">${s.nota}</p><p class="pista mano"><svg viewBox="0 0 44 26" aria-hidden="true"><path d="M2 6 Q 20 0 34 14" stroke="#E5213A" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 16 L35 15 L34 8" stroke="#E5213A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>tocá el ojito para ver qué trae cada uno</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:0 40px">${s.items.map(([n,d,x],k)=>`<div class="item" style="--k:${k}" data-nombre="${n}" data-precios='[${x}]'><div><div class="nm">${n}${botonOjo(n,tabActual+k)}</div><div class="ds">${d}</div></div>${pill(n,x,s.color).replace('class="pill"','class="pill solo"')}</div>${RECETA[n]?`<div class="despiece" id="dp-${tabActual+k}"></div>`:""}`).join("")}</div></div></div>`;
  }
  observar($$("#panel .fila,#panel .item:not(.in),#panel .zigzag"));$$("#panel .ojo").forEach((o,i)=>o.style.setProperty('--pd',(i*.37%5).toFixed(2)+'s'));abierto=null;
}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b||b.dataset.t==tabActual)return;tabActual=b.dataset.t;$$(".tab").forEach(x=>x.classList.toggle("on",x==b));render()});

/* =============== PEDIDO =============== */
let pedido=[],modo="Delivery";
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-add]");if(!b)return;
  const [n,p]=b.dataset.add.split("|");const f=pedido.find(x=>x.n==n);if(f)f.q++;else pedido.push({n,p:+p,q:1});
  b.classList.remove("hit");void b.offsetWidth;b.classList.add("hit");
  const r=b.getBoundingClientRect();const m=document.createElement("span");m.className="mas1";m.textContent="+1";m.style.left=r.left+r.width/2-14+"px";m.style.top=r.top-6+"px";document.body.appendChild(m);setTimeout(()=>m.remove(),900);
  pintar();aviso(`${n} al pedido`);const fl=$("#flot");fl.classList.remove("salta");void fl.offsetWidth;fl.classList.add("salta");
});
function pintar(){
  const c=pedido.reduce((a,x)=>a+x.q,0);$("#cnt").textContent=c;$("#flot").classList.toggle("ver",c>0);
  $("#listaP").innerHTML=pedido.length?pedido.map((x,i)=>`<div class="lp"><b>${x.n}</b><span class="p">${fmt(x.p*x.q)}</span><div class="q"><button data-m="${i}" aria-label="Quitar uno">−</button>${x.q}<button data-s="${i}" aria-label="Sumar uno">+</button></div></div>`).join(""):`<div class="vacio">Todavía no agregaste nada.<span class="mano">arrancá por la Shelby</span></div>`;
  $("#tot").textContent=fmt(pedido.reduce((a,x)=>a+x.p*x.q,0));
}
$("#listaP").addEventListener("click",e=>{const m=e.target.dataset.m,s=e.target.dataset.s;if(s!=null)pedido[s].q++;if(m!=null){pedido[m].q--;if(!pedido[m].q)pedido.splice(m,1)}pintar()});
const abrir=()=>{$("#cajon").classList.add("on");$("#velo").classList.add("on")},cerrar=()=>{$("#cajon").classList.remove("on");$("#velo").classList.remove("on")};
$("#flot").onclick=abrir;$("#cerrar").onclick=cerrar;$("#velo").onclick=cerrar;addEventListener("keydown",e=>{if(e.key=="Escape")cerrar()});
$("#modo").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;modo=b.dataset.m;$$("#modo button").forEach(x=>x.classList.toggle("on",x==b));$("#fDir").style.display=modo=="Delivery"?"":"none"});
$("#enviar").onclick=()=>{
  if(!pedido.length){aviso("Agregá algo primero");return}
  let t="*Pedido web · SUNSET*\n\n";pedido.forEach(x=>t+=`• ${x.q}x ${x.n} — ${fmt(x.p*x.q)}\n`);
  t+=`\n*Total:* ${$("#tot").textContent}\n*Modo:* ${modo}\n*Nombre:* ${$("#fNom").value||"-"}\n`;if(modo=="Delivery")t+=`*Dirección:* ${$("#fDir").value||"-"}\n`;
  t+=`*Pago:* ${$("#fPago").value}\n`;if($("#fNota").value)t+=`*Aclaraciones:* ${$("#fNota").value}\n`;open(wa(t),"_blank");
};
let at;function aviso(m){const a=$("#aviso");a.textContent=m;a.classList.add("on");clearTimeout(at);at=setTimeout(()=>a.classList.remove("on"),1500)}
pintar();

/* =============== CLUB =============== */
let sellos=4;
function pintarSellos(nuevo){
  $("#sellos").innerHTML=Array.from({length:10},(_,i)=>i==9?`<span class="sello premio ${sellos>=9?"gana":""}">FREE</span>`:`<span class="sello ${i<sellos?"on":""}" style="${i<sellos&&!(nuevo&&i==sellos-1)?"animation:none;transform:rotate(-12deg)":""}">${i<sellos?"S":i+1}</span>`).join("");
  $("#sellosTxt").textContent=sellos>=9?"¡Combo simple gratis!":`${sellos} de 9 · válido en salón y retiro`;
}
$("#sumar").onclick=()=>{sellos=sellos>=9?0:sellos+1;pintarSellos(true);if(sellos==9)aviso("¡Ganaste un combo simple!")};
pintarSellos(false);

/* =============== HORARIOS / ESTADO =============== */
const DIAS=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const hh=m=>`${Math.floor(m/60)}:${String(m%60).padStart(2,"0")}`.replace(":00","");
function ahoraAR(){return new Date(new Date().toLocaleString("en-US",{timeZone:"America/Argentina/Buenos_Aires"}))}
function estado(){
  const n=ahoraAR(),d=n.getDay(),m=n.getHours()*60+n.getMinutes();
  const t=HORARIOS[d].find(([a,c])=>m>=a&&m<c);if(t)return[true,`Plancha prendida · hasta las ${hh(t[1])}`];
  const p=HORARIOS[d].find(([a])=>a>m);if(p)return[false,`Abrimos hoy a las ${hh(p[0])}`];
  for(let i=1;i<8;i++){const dd=(d+i)%7;if(HORARIOS[dd].length)return[false,`Abrimos ${i==1?"mañana":"el "+DIAS[dd].toLowerCase()} a las ${hh(HORARIOS[dd][0][0])}`]}
}
function pintarEstado(){const[on,t]=estado();$("#vivo").classList.toggle("off",!on);$("#vivo span").textContent=t}
pintarEstado();setInterval(pintarEstado,60000);
(function(){const d=ahoraAR().getDay();$("#horas").innerHTML=[2,3,4,5,6,0,1].map(i=>`<div class="${i==d?"hoy":""}"><span>${DIAS[i]}</span><b>${HORARIOS[i].length?HORARIOS[i].map(([a,c])=>`${hh(a)} a ${hh(c)}`).join(" · "):"Cerrado"}</b></div>`).join("")})();

const OUT="#1B1B1A";
/* =============== DESPIECE: ¿DE QUÉ ESTÁ HECHO? =============== */
/* RECETAS (editar acá). pila = se arma por capas · contenido = piezas en caja/plato */
const NOMBRE={panArriba:"Pan",panAbajo:"Pan",panSemillas:"Pan con semillas",subArriba:"Pan de sándwich",subAbajo:"Pan de sándwich",panchoAbajo:"Pan de pancho",salchicha:"Salchicha",
  tapaAbajo:"Tapitas",tapaArriba:"Tapitas",ddl:"Dulce de leche",bano:"Baño de chocolate",
  carne:"Medallón de carne 120 g",pollo:"Medallón de pollo",lenteja:"Medallón de lenteja",
  cheddar:"Cheddar",danbo:"Queso danbo",azul:"Queso azul",provo:"Provolone",fundido:"Cheddar fundido",queso:"Queso",
  bacon:"Panceta ahumada",cebcar:"Cebolla caramelizada",cebolla:"Cebolla",lechuga:"Lechuga",tomate:"Tomate",jamon:"Jamón",huevo:"Huevo",
  pepinos:"Pepinos agridulces",guac:"Guacamole",nachos:"Nachos",aros:"Aros de cebolla",champ:"Champiñones",criolla:"Salsa criolla",
  sLibra:"Salsa de libra",sStacker:"Salsa stacker",sTasty:"Salsa tasty original",sBigmac:"Salsa BigMac",bbq:"Barbacoa",mayo:"Mayonesa",
  alioli:"Alioli",ketchup:"Ketchup",mostaza:"Mostaza",papasPay:"Papas pay",parmesano:"Queso parmesano",picante:"Salsa picante (opcional)",
  bolonesa:"Salsa boloñesa",takis:"Takis",doritos:"Doritos"};
const ORDEN=["cebcar","bacon","jamon","huevo","champ","aros","pepinos","guac","nachos","bolonesa","criolla","tomate","cebolla","lechuga","takis","doritos","parmesano","papasPay","sLibra","sStacker","sTasty","sBigmac","bbq","mayo","alioli","ketchup","mostaza","picante"];
const ALTO={panArriba:76,panAbajo:34,subArriba:54,subAbajo:30,panchoAbajo:44,salchicha:26,tapaAbajo:20,tapaArriba:20,ddl:12,bano:14,
  carne:30,pollo:32,lenteja:28,queso:9,bacon:13,cebcar:11,cebolla:9,lechuga:17,tomate:13,jamon:10,huevo:15,pepinos:10,guac:13,nachos:18,
  aros:15,champ:14,criolla:10,salsa:8,papasPay:12,parmesano:9,bolonesa:14,takis:14,doritos:16};
const QUESO={cheddar:"#F2A93B",danbo:"#F3D27A",azul:"#EDE6D2",provo:"#E9B85C",fundido:"#F6B13E",queso:"#F3D27A"};
const SALSA={sLibra:"#E8823D",sStacker:"#E07A3F",sTasty:"#F09A55",sBigmac:"#F2A56A",bbq:"#5E2014",mayo:"#F5ECCF",alioli:"#F3EAD0",ketchup:"#D8262B",mostaza:"#E8B92A",picante:"#C21E1E"};
const PANKEY={panArriba:"pan",panAbajo:"pan",subArriba:"sub",subAbajo:"sub",panchoAbajo:"pancho",tapaArriba:"tapa",tapaAbajo:"tapa"};
const ond=(x0,x1,y,a,n)=>{let d=`M${x0} ${y}`;const s=(x1-x0)/n;for(let i=0;i<n;i++)d+=` Q${x0+s*i+s/2} ${y+(i%2?a:-a)} ${x0+s*(i+1)} ${y}`;return d};
const L=-140,R=140,O2=`stroke="${OUT}" stroke-width="3" stroke-linejoin="round"`;
function capaSVG(k,h,op){
  let s="";
  switch(k){
    case "panArriba":s=`<path d="M${L-4} ${h} Q${L-8} 8 0 0 Q${R+8} 8 ${R+4} ${h} Z" fill="#E39B57" ${O2}/><path d="M${L+40} ${h*.5} Q${L+70} ${h*.18} -20 ${h*.16}" stroke="#F6C98A" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      if(op&&op.semillas)[[-70,22],[-36,13],[0,10],[36,14],[72,22],[-52,38],[-14,30],[22,32],[58,40],[-90,46],[92,48]].forEach(([x,y],i)=>s+=`<ellipse cx="${x}" cy="${y}" rx="4.5" ry="2.4" fill="#FFF3D6" stroke="${OUT}" stroke-width="1.2" transform="rotate(${i*31} ${x} ${y})"/>`);break;
    case "panAbajo":s=`<path d="M${L-4} 0 H${R+4} Q${R+6} ${h} ${R-20} ${h} H${L+20} Q${L-6} ${h} ${L-4} 0 Z" fill="#E39B57" ${O2}/><rect x="${L-2}" y="1.5" width="${R-L+4}" height="6" fill="#F2C27E"/>`;break;
    case "subArriba":s=`<path d="M${L-14} ${h} Q${L-16} ${h*.25} ${L+30} ${h*.12} Q0 -4 ${R-30} ${h*.12} Q${R+16} ${h*.25} ${R+14} ${h} Z" fill="#E8A867" ${O2}/>`;[-70,-20,30,80].forEach(x=>s+=`<path d="M${x-14} ${h*.62} Q${x} ${h*.3} ${x+14} ${h*.2}" stroke="${OUT}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`);
      s+=`<path d="M${L+20} ${h*.55} Q${L+40} ${h*.28} ${L+80} ${h*.22}" stroke="#F8D3A0" stroke-width="5" fill="none" stroke-linecap="round"/>`;break;
    case "subAbajo":s=`<path d="M${L-14} 0 H${R+14} Q${R+16} ${h} ${R-24} ${h} H${L+24} Q${L-16} ${h} ${L-14} 0 Z" fill="#E8A867" ${O2}/><rect x="${L-12}" y="1.5" width="${R-L+24}" height="6" fill="#F6CF95"/>`;break;
    case "panchoAbajo":s=`<path d="M${L-10} 6 Q${L-14} ${h} ${L+30} ${h} H${R-30} Q${R+14} ${h} ${R+10} 6 Q${R-4} 20 ${R-30} 18 H${L+30} Q${L+4} 20 ${L-10} 6 Z" fill="#E8A867" ${O2}/><path d="M${L+30} 18 H${R-30}" stroke="#F6CF95" stroke-width="5" stroke-linecap="round"/>`;break;
    case "salchicha":s=`<rect x="${L-22}" y="0" width="${R-L+44}" height="${h}" rx="${h/2}" fill="#C0553A" ${O2}/><path d="M${L} ${h*.32} H${R-10}" stroke="#E58A6B" stroke-width="4" stroke-linecap="round"/>`;[-90,-30,30,90].forEach(x=>s+=`<path d="M${x} 4 Q${x+6} ${h/2} ${x} ${h-4}" stroke="#8E3626" stroke-width="2" fill="none"/>`);break;
    case "tapaAbajo":case "tapaArriba":s=`<rect x="${L+10}" y="0" width="${R-L-20}" height="${h}" rx="${h/2}" fill="#E6C08A" ${O2}/><path d="M${L+30} ${h*.4} H${R-30}" stroke="#F3DDB5" stroke-width="3" stroke-linecap="round"/>`;break;
    case "ddl":s=`<path d="${ond(L+10,R-10,5,3,10)} L${R-10} ${h} L${L+10} ${h} Z" fill="#B0682F" ${O2}/>`;break;
    case "bano":s=`<path d="M${L+4} ${h} Q${L} 2 ${L+30} 0 H${R-30} Q${R} 2 ${R-4} ${h} Z" fill="${op=="blanco"?"#F4ECDD":"#4A2C1C"}" ${O2}/><path d="M${L+30} 5 Q0 0 ${R-40} 5" stroke="${op=="blanco"?"#FFFFFF":"#7A4A30"}" stroke-width="3" fill="none" stroke-linecap="round"/>`;break;
    case "carne":case "pollo":case "lenteja":{const f={carne:"#6B3B24",pollo:"#D6923A",lenteja:"#7A5A30"}[k],f2={carne:"#8A5232",pollo:"#F0B95A",lenteja:"#9C7A48"}[k];
      s=`<rect x="${L-10}" y="0" width="${R-L+20}" height="${h}" rx="${h/2}" fill="${f}" ${O2}/>`;for(let i=0;i<11;i++)s+=`<circle cx="${L+10+i*27}" cy="${7+(i%3)*7}" r="${1.8+(i%2)}" fill="${f2}"/>`;
      s+=`<path d="${ond(L+8,R-8,6,2,9)}" stroke="${f2}" stroke-width="2.5" fill="none" opacity=".8"/>`;break;}
    case "queso":{const c=QUESO[op]||QUESO.cheddar,larga=op=="fundido";let d=`M${L-14} 0 H${R+14} V${h}`;[[118,15],[88,8],[52,20],[14,10],[-24,18],[-62,9],[-98,16],[-124,7]].forEach(([x,l])=>{l=larga?l*1.6:l;d+=` L${x+8} ${h} Q${x+8} ${h+l} ${x} ${h+l} Q${x-8} ${h+l} ${x-8} ${h}`});d+=` L${L-14} ${h} Z`;
      s=`<path d="${d}" fill="${c}" ${O2}/>`;if(op=="azul")for(let i=0;i<10;i++)s+=`<circle cx="${L+i*30}" cy="4" r="2" fill="#5A7BB5"/>`;break;}
    case "bacon":s=`<path d="${ond(L-14,R+10,5,4,8)}" stroke="${OUT}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="${ond(L-14,R+10,5,4,8)}" stroke="#B5432F" stroke-width="7.5" fill="none" stroke-linecap="round"/><path d="${ond(L-14,R+10,5,4,8)}" stroke="#F2C9B0" stroke-width="2" fill="none" stroke-dasharray="14 10"/>`;break;
    case "cebcar":s=`<path d="${ond(L-4,R+4,5,4,14)}" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${ond(L-4,R+4,5,4,14)}" stroke="#9A5A24" stroke-width="6" fill="none" stroke-linecap="round"/>`;break;
    case "cebolla":for(let i=0;i<6;i++)s+=`<ellipse cx="${L+22+i*47}" cy="4" rx="22" ry="4" fill="#F1E3F3" stroke="${OUT}" stroke-width="2.2"/><ellipse cx="${L+22+i*47}" cy="4" rx="13" ry="2" fill="none" stroke="#CDB3D6" stroke-width="1.5"/>`;break;
    case "lechuga":s=`<path d="${ond(L-20,R+20,6,6,12)} L${R+14} ${h} L${L-14} ${h} Z" fill="#7FB04A" ${O2}/><path d="${ond(L-10,R+10,8,4,10)}" stroke="#B6D97F" stroke-width="2" fill="none"/>`;break;
    case "tomate":for(let i=0;i<3;i++)s+=`<ellipse cx="${L+48+i*92}" cy="6" rx="50" ry="7" fill="#E0483A" stroke="${OUT}" stroke-width="2.6"/><ellipse cx="${L+40+i*92}" cy="5" rx="5" ry="2" fill="#F58C6E"/><ellipse cx="${L+60+i*92}" cy="6" rx="5" ry="2" fill="#F58C6E"/>`;break;
    case "jamon":s=`<path d="${ond(L-10,R+10,4,3,8)}" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${ond(L-10,R+10,4,3,8)}" stroke="#EBA3A0" stroke-width="6" fill="none" stroke-linecap="round"/>`;break;
    case "huevo":s=`<path d="M${L-12} 8 Q${L+20} -2 0 2 Q${R-20} -3 ${R+12} 8 Q${R} 15 0 13 Q${L} 15 ${L-12} 8 Z" fill="#FFFBF0" ${O2}/><ellipse cx="14" cy="6" rx="26" ry="6" fill="#F5B52A" stroke="${OUT}" stroke-width="2.4"/>`;break;
    case "pepinos":for(let i=0;i<6;i++)s+=`<ellipse cx="${L+22+i*47}" cy="5" rx="21" ry="4.6" fill="#7BA23C" stroke="${OUT}" stroke-width="2.2"/><ellipse cx="${L+22+i*47}" cy="5" rx="11" ry="2" fill="#C5DA8A"/>`;break;
    case "guac":s=`<path d="${ond(L-8,R+8,5,4,10)}" stroke="${OUT}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="${ond(L-8,R+8,5,4,10)}" stroke="#8DB33A" stroke-width="8" fill="none" stroke-linecap="round"/>`;break;
    case "nachos":for(let i=0;i<6;i++){const x=L-12+i*54;s+=`<path d="M${x} ${h} L${x+26} 0 L${x+52} ${h} Z" fill="#F2C33A" ${O2}/>`};break;
    case "doritos":for(let i=0;i<7;i++){const x=L-14+i*46;s+=`<path d="M${x} ${h} L${x+22} 0 L${x+44} ${h} Z" fill="#F28C28" ${O2}/><circle cx="${x+18}" cy="${h*.6}" r="1.6" fill="#B5431A"/><circle cx="${x+27}" cy="${h*.75}" r="1.6" fill="#B5431A"/>`};break;
    case "takis":for(let i=0;i<9;i++){const x=L-6+i*34;s+=`<rect x="${x}" y="${(i%2)*3}" width="28" height="${h-3}" rx="${(h-3)/2}" fill="#8E2B3A" ${O2} transform="rotate(${(i%3-1)*12} ${x+14} ${h/2})"/><path d="M${x+8} 3 L${x+12} ${h-4} M${x+16} 3 L${x+20} ${h-4}" stroke="#C25062" stroke-width="2"/>`};break;
    case "papasPay":for(let i=0;i<26;i++){const x=L-10+i*11.5,a=(i*37%30)-15;s+=`<rect x="${x}" y="2" width="4" height="${h}" rx="1.5" fill="#F2C14E" stroke="${OUT}" stroke-width="1.3" transform="rotate(${a} ${x+2} ${h/2})"/>`};break;
    case "parmesano":for(let i=0;i<30;i++){const x=L+(i*37%280),y=(i*13%7);s+=`<rect x="${x}" y="${y}" width="6" height="3" rx="1" fill="#FBF3DC" stroke="${OUT}" stroke-width=".9" transform="rotate(${i*29} ${x+3} ${y+1.5})"/>`};break;
    case "bolonesa":s=`<path d="${ond(L-6,R+6,6,4,9)}" stroke="${OUT}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="${ond(L-6,R+6,6,4,9)}" stroke="#A8321F" stroke-width="9" fill="none" stroke-linecap="round"/>`;for(let i=0;i<9;i++)s+=`<circle cx="${L+14+i*31}" cy="${4+(i%2)*4}" r="3.2" fill="#6B2A16"/>`;break;
    case "criolla":for(let i=0;i<18;i++)s+=`<rect x="${L+i*16}" y="${2+(i%2)*3}" width="9" height="6" rx="1.5" fill="${["#E0483A","#5E9C3A","#F3E6C8"][i%3]}" stroke="${OUT}" stroke-width="1.2"/>`;break;
    case "aros":for(let i=0;i<5;i++)s+=`<ellipse cx="${L+26+i*57}" cy="7" rx="27" ry="6" fill="none" stroke="${OUT}" stroke-width="10"/><ellipse cx="${L+26+i*57}" cy="7" rx="27" ry="6" fill="none" stroke="#D6913A" stroke-width="6"/>`;break;
    case "champ":for(let i=0;i<7;i++){const x=L+4+i*40;s+=`<path d="M${x} ${h} Q${x+18} -4 ${x+36} ${h} Z" fill="#C9A47A" ${O2}/><path d="M${x+14} ${h-3} Q${x+18} ${h-8} ${x+22} ${h-3}" stroke="#8A6A44" stroke-width="2" fill="none"/>`};break;
    default: if(SALSA[k])s=`<path d="${ond(L,R,4,3,12)}" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${ond(L,R,4,3,12)}" stroke="${SALSA[k]}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
function pila(nombre,temp){ // capas de abajo hacia arriba
  const b=RECETA[nombre]||{q:["cheddar"],t:[]};const c=[];
  const tops=()=>[...b.t].sort((x,y)=>ORDEN.indexOf(x)-ORDEN.indexOf(y)).forEach(t=>c.push([t]));
  if(b.pan=="alfajor"){c.push(["tapaAbajo"],["ddl"],["tapaArriba"],["bano","negro"]);return c}
  if(b.pan=="pancho"){c.push(["panchoAbajo"],["salchicha"]);b.q.forEach(q=>c.push(["queso",q]));tops();return c}
  const sub=b.pan=="sub",m=b.medallon||"carne",n=sub?2:(m=="carne"?temp+1:1);
  c.push([sub?"subAbajo":"panAbajo",{semillas:b.semillas}]);
  for(let i=0;i<n;i++){c.push([m]);b.q.forEach(q=>c.push(["queso",q]));if(b.fundido&&i==n-1)c.push(["queso","fundido"])}
  tops();c.push([sub?"subArriba":"panArriba",{semillas:b.semillas}]);return c;
}
function despieceSVG(nombre,temp){
  const capas=pila(nombre,temp),G=24;let yA=0,yE=0,arm=[],exp=[];
  capas.forEach(([k],i)=>{const kk=k=="queso"?"queso":(SALSA[k]?"salsa":k);const h=ALTO[kk]||10;const solapa=(kk=="queso"||kk=="salsa")?h*.55:0;
    yA-=h-solapa;yE-=h+(i?G:0);arm.push(yA);exp.push(yE)});
  const altoE=-yE+40,altoA=-yA,off=(altoE-altoA)/2;
  const vistos=new Map();let gs="",ls="";
  capas.forEach(([k,op],i)=>{const kk=k=="queso"?"queso":(SALSA[k]?"salsa":k);const h=ALTO[kk]||10;
    gs+=`<g data-a="${(arm[i]-off).toFixed(1)}" data-e="${exp[i].toFixed(1)}" style="transform:translateY(${(arm[i]-off-260).toFixed(1)}px);opacity:0">${capaSVG(k,h,op)}</g>`;
    const lab=k=="queso"?op:(PANKEY[k]=="pan"&&op&&op.semillas?"panSemillas":k);const key=PANKEY[k]||lab;
    if(!vistos.has(key)){vistos.set(key,lab);const cuantos=capas.filter(([x,o])=>(x=="queso"?o:x)==(k=="queso"?op:k)).length;
      const txt=(NOMBRE[lab]||lab)+(cuantos>1&&!PANKEY[k]?` ×${cuantos}`:"");const y=exp[i]+h/2;
      ls+=`<g class="et" style="transition-delay:${(.15+i*.05).toFixed(2)}s"><circle cx="${R+16}" cy="${y.toFixed(1)}" r="4" fill="#C7B3F5"/><path d="M${R+20} ${y.toFixed(1)} H${R+52}" stroke="#C7B3F5" stroke-width="2" stroke-dasharray="4 4"/><text x="${R+60}" y="${(y+7).toFixed(1)}">${txt}</text></g>`}});
  const ings=[...vistos.values()];
  return {svg:`<svg class="desp" viewBox="${L-50} ${(yE-20).toFixed(0)} ${R-L+400} ${altoE.toFixed(0)}" role="img" aria-label="Despiece de ${nombre}: ${ings.map(v=>NOMBRE[v]||v).join(", ")}">${gs}${ls}</svg>`,ings};
}
/* ---- piezas sueltas (entradas / postres) ---- */
const PIEZA={tequeno:"Tequeños",muzza:"Bastones de muzzarella",pollo:"Bastones de pollo",aro:"Aros de cebolla",nugget:"Nuggets de pollo",carita:"Caritas de papa",
  dip:"Dips de salsa a elección",dipT:"Dip de salsa tártara",papas:"Papas fritas",cheddarTop:"Cheddar",panceta:"Panceta",verdeo:"Verdeo",nachosP:"Nachos",
  bolonesaTop:"Salsa boloñesa",crema:"Crema ácida",frambuesa:"Frambuesas bañadas en chocolate blanco y con leche"};
function piezaSVG(k,i){
  const o=`stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"`;
  switch(k){
    case "tequeno":return `<rect x="-30" y="-9" width="60" height="18" rx="9" fill="#E7B25E" ${o}/><path d="M-18 -8 Q-12 0 -18 8 M-4 -8 Q2 0 -4 8 M10 -8 Q16 0 10 8" stroke="#B9813A" stroke-width="2" fill="none"/>`;
    case "muzza":return `<rect x="-30" y="-8" width="60" height="16" rx="7" fill="#D99A45" ${o}/><ellipse cx="27" cy="0" rx="5" ry="7" fill="#F6E7B0" ${o}/><circle cx="-12" cy="-2" r="1.5" fill="#B9813A"/><circle cx="4" cy="3" r="1.5" fill="#B9813A"/>`;
    case "pollo":return `<rect x="-30" y="-8" width="60" height="16" rx="7" fill="#C07A35" ${o}/><circle cx="-16" cy="-1" r="2" fill="#E3A65A"/><circle cx="-2" cy="3" r="2" fill="#E3A65A"/><circle cx="14" cy="-2" r="2" fill="#E3A65A"/>`;
    case "aro":return `<ellipse cx="0" cy="0" rx="21" ry="16" fill="none" stroke="${OUT}" stroke-width="11"/><ellipse cx="0" cy="0" rx="21" ry="16" fill="none" stroke="#D6913A" stroke-width="7"/>`;
    case "nugget":return `<path d="M-18 -4 Q-16 -16 -2 -14 Q14 -18 18 -4 Q22 10 6 14 Q-10 18 -16 8 Q-22 2 -18 -4 Z" fill="#D69B48" ${o}/><circle cx="-6" cy="-4" r="1.6" fill="#F0C27A"/><circle cx="6" cy="4" r="1.6" fill="#F0C27A"/>`;
    case "carita":return `<circle r="17" fill="#E9B85C" ${o}/><circle cx="-6" cy="-4" r="2.6" fill="${OUT}"/><circle cx="6" cy="-4" r="2.6" fill="${OUT}"/><path d="M-8 4 Q0 12 8 4" stroke="${OUT}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    case "dip":case "dipT":{const c=k=="dipT"?"#F1EBCF":["#F2A93B","#5E2014","#F3EAD0","#D8262B"][i%4];return `<path d="M-20 -4 Q-18 16 0 16 Q18 16 20 -4 Z" fill="#FFFDF8" ${o}/><ellipse cx="0" cy="-4" rx="20" ry="6" fill="${c}" ${o}/>`}
    case "papas":{let s="";for(let j=0;j<16;j++){const x=-70+j*9,a=(j*41%50)-25,hh=46+(j*17%22);s+=`<rect x="${x}" y="${-hh/2}" width="9" height="${hh}" rx="2" fill="#F2C14E" ${o} transform="rotate(${a} ${x+4} 0)"/>`}return s}
    case "nachosP":{let s="";for(let j=0;j<11;j++){const x=-80+j*15,y=(j%3)*8-8;s+=`<path d="M${x} ${y+20} L${x+16} ${y-12} L${x+34} ${y+20} Z" fill="#F2C33A" ${o} transform="rotate(${(j*37%40)-20} ${x+17} ${y+4})"/>`}return s}
    case "cheddarTop":return `<path d="M-80 -6 Q-60 -22 -40 -6 T0 -6 T40 -6 T80 -6" stroke="${OUT}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-80 -6 Q-60 -22 -40 -6 T0 -6 T40 -6 T80 -6" stroke="#F2A93B" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    case "bolonesaTop":return [[-50,-10],[-15,4],[20,-12],[52,2],[-30,16],[34,18]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#A8321F" ${o}/><circle cx="${x+2}" cy="${y-2}" r="2.6" fill="#6B2A16"/>`).join("");
    case "crema":return [[-36,-18],[10,-22],[44,-6],[-6,8]].map(([x,y])=>`<path d="M${x-12} ${y+6} Q${x-12} ${y-6} ${x} ${y-10} Q${x+12} ${y-6} ${x+12} ${y+6} Z" fill="#FBF6EA" ${o}/>`).join("");
    case "panceta":return [[-60,-14],[-24,-24],[16,-16],[50,-24],[-40,6],[30,4],[64,-4]].map(([x,y],j)=>`<rect x="${x}" y="${y}" width="16" height="9" rx="2" fill="#B5432F" ${o} transform="rotate(${j*27} ${x+8} ${y+4})"/>`).join("");
    case "verdeo":return [[-50,-28],[-12,-8],[24,-28],[58,-12],[-30,10],[8,14],[44,8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${OUT}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="5" fill="none" stroke="#5E9C3A" stroke-width="2.6"/>`).join("");
    case "frambuesa":{const c=i%2?"#F4ECDD":"#6A3A22";let s=`<path d="M-15 2 Q-16 -16 0 -17 Q16 -16 15 2 Q14 18 0 18 Q-14 18 -15 2 Z" fill="${c}" ${o}/>`;[[-6,-6],[5,-7],[0,2],[-7,7],[7,6]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="${i%2?"#D9C9AE":"#8E5636"}" stroke-width="1.5"/>`);return s+`<path d="M-4 -17 L0 -24 L4 -17" fill="#5E9C3A" ${o}/>`}
  }
  return "";
}
function contenidoSVG(nombre){
  const r=RECETA[nombre],W=420;let pos=[],y0=60;
  if(r.pila){r.p.forEach(([k],j)=>pos.push({k,i:j,x:W/2,y:150-(j==0?0:10)}));}
  else{const items=[];r.p.forEach(([k,n])=>{const vis=k=="papas"?1:Math.min(n,10);for(let j=0;j<vis;j++)items.push({k,i:j})});
    const cols=items.length>16?6:items.length>8?5:4,cw=W/(cols+.6);items.forEach((it,j)=>{const c=j%cols,f=Math.floor(j/cols);it.x=cw*.8+c*cw+(f%2?cw*.35:0);it.y=y0+30+f*58;it.rot=((j*47)%40)-20;pos.push(it)})}
  const filas=r.pila?1:Math.ceil(pos.length/(pos.length>16?6:pos.length>8?5:4)),altoPlato=r.pila?240:filas*58+90,H=Math.max(altoPlato+40,r.p.length*52+60);
  const plato=r.plato=="caja"?`<path d="M14 ${y0-10} H${W-14} L${W-30} ${y0+altoPlato-30} H30 Z" fill="#C9A06A" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><path d="M14 ${y0-10} L40 ${y0-36} H${W-40} L${W-14} ${y0-10}" fill="#B88C55" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><text x="${W/2}" y="${y0+altoPlato-44}" text-anchor="middle" class="sello">SUNSET</text>`
    :`<ellipse cx="${W/2}" cy="${y0+altoPlato/2-14}" rx="${W/2-6}" ry="${altoPlato/2+6}" fill="#FFFDF8" stroke="${OUT}" stroke-width="3"/><ellipse cx="${W/2}" cy="${y0+altoPlato/2-14}" rx="${W/2-30}" ry="${altoPlato/2-18}" fill="none" stroke="#E2D9C7" stroke-width="3"/>`;
  const piezas=pos.map((p,j)=>`<g class="pz" style="--x:${p.x.toFixed(0)}px;--y:${p.y.toFixed(0)}px;--r:${p.rot||0}deg;transition-delay:${(j*.045).toFixed(2)}s"><g transform="scale(${r.pila?1.7:1})">${piezaSVG(p.k,p.i)}</g></g>`).join("");
  const GR=["papas","nachosP","cheddarTop","bolonesaTop","crema","panceta","verdeo"];const ley=r.p.map(([k,n],j)=>`<g transform="translate(${W+40} ${60+j*52})"><g class="et" style="transition-delay:${(.3+j*.08).toFixed(2)}s"><g transform="scale(${GR.includes(k)?.26:.62})">${piezaSVG(k,0)}</g><text x="44" y="8">${n>1&&k!="papas"?"×"+n+" ":""}${PIEZA[k]}</text></g></g>`).join("");
  return {svg:`<svg class="desp cont" viewBox="0 0 ${W+560} ${H}" role="img" aria-label="${nombre}: ${r.p.map(([k,n])=>(n>1?n+" ":"")+PIEZA[k]).join(", ")}">${plato}${piezas}${ley}</svg>`,ings:r.p.map(([k,n])=>(n>1&&k!="papas"?n+" ":"")+PIEZA[k])};
}
const OJO=`<svg viewBox="0 0 40 28" aria-hidden="true"><g class="ab"><path d="M3 14 Q20 -1 37 14 Q20 29 3 14 Z" fill="#FFFDF8" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><g class="iris"><circle cx="20" cy="14" r="6.6" fill="currentColor"/><circle cx="22.4" cy="11.6" r="2.1" fill="#FFFDF8"/></g></g><g class="ce"><path d="M3 12 Q20 26 37 12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M8.5 17.5 L5.5 22.5 M15.5 20.4 L14.5 25.6 M24.5 20.4 L25.5 25.6 M31.5 17.5 L34.5 22.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g></svg>`;
function botonOjo(nombre,i){return RECETA[nombre]?`<button class="ojo" data-ojo="${i}" aria-expanded="false" aria-controls="dp-${i}" aria-label="Ver de qué está hecho: ${nombre}" title="¿De qué está hecho?">${OJO}</button>`:""}
let abierto=null;
function abrirDespiece(btn){
  const i=btn.dataset.ojo,box=$("#dp-"+i);
  if(abierto&&abierto!=btn)cerrarDespiece(abierto);
  if(btn.classList.contains("on")){cerrarDespiece(btn);return}
  abierto=btn;btn.classList.add("on");btn.setAttribute("aria-expanded","true");
  const fila=btn.closest("[data-nombre]"),nombre=fila.dataset.nombre,precios=JSON.parse(fila.dataset.precios);
  box.dataset.temp=precios.length>1?1:0;pintarDespiece(box,nombre,precios,true,fila.dataset.add);box.classList.add("abierto");
}
function cerrarDespiece(btn){btn.classList.remove("on");btn.setAttribute("aria-expanded","false");const box=$("#dp-"+btn.dataset.ojo);box.classList.remove("abierto");if(abierto==btn)abierto=null}
function pintarDespiece(box,nombre,precios,caer,addNombre){
  const temp=+box.dataset.temp,TN=["Simple","Doble","Triple"],r=RECETA[nombre],cont=r.tipo=="contenido";
  const d=cont?contenidoSVG(nombre):despieceSVG(nombre,temp);
  const art=r.pan=="pancho"?"así está hecho el":r.pan=="sub"?"así está hecho el":cont?"esto trae:":"así está hecha la";
  const nAdd=(addNombre||nombre)+(precios.length>1?" "+TN[temp]:"");
  box.innerHTML=`<div class="dp-in"><div class="dp-card">
    <div class="dp-art">${d.svg}</div>
    <div class="dp-info"><span class="mano">${art}</span><h4 class="wide">${nombre}</h4>
      <ul class="dp-chips">${d.ings.map(k=>`<li>${NOMBRE[k]||k}</li>`).join("")}</ul>
      ${precios.length>1?`<div class="seg dp-seg">${precios.map((p,j)=>`<button class="${j==temp?"on":""}" data-temp="${j}">${TN[j]}</button>`).join("")}</div>`:""}
      <div class="dp-acc"><button class="btn btn-borde dp-armar" style="padding:11px 20px;font-size:14px">${cont?"Servir de nuevo":"Armar"}</button>
      ${precios[temp]?`<button class="btn btn-rojo dp-add" data-add="${nAdd}|${precios[temp]}" style="padding:12px 22px;font-size:15px">Agregar ${fmt(precios[temp])}</button>`:""}</div>
    </div></div></div>`;
  const svg=box.querySelector(".desp");
  if(cont){
    const servir=()=>{svg.classList.remove("abierta","servida");void svg.getBoundingClientRect();requestAnimationFrame(()=>requestAnimationFrame(()=>svg.classList.add("servida","abierta")))};
    reduce?svg.classList.add("servida","abierta"):servir();box.querySelector(".dp-armar").onclick=servir;return;
  }
  const gs=[...svg.querySelectorAll("g[data-a]")];
  const armado=y=>gs.forEach((g,i)=>{g.style.transition=`transform .6s cubic-bezier(.34,1.56,.64,1) ${y?i*.07:0}s, opacity .3s ${y?i*.07:0}s`;g.style.transform=`translateY(${g.dataset.a}px)`;g.style.opacity=1});
  const separar=()=>{gs.forEach((g,i)=>{g.style.transition=`transform .8s cubic-bezier(.2,.8,.2,1) ${i*.035}s`;g.style.transform=`translateY(${g.dataset.e}px)`});svg.classList.add("abierta");box.querySelector(".dp-armar").textContent="Armar"};
  const juntar=()=>{svg.classList.remove("abierta");gs.forEach((g,i)=>{g.style.transition=`transform .6s cubic-bezier(.34,1.56,.64,1) ${(gs.length-i)*.03}s`;g.style.transform=`translateY(${g.dataset.a}px)`});box.querySelector(".dp-armar").textContent="Desarmar"};
  if(reduce){gs.forEach(g=>{g.style.transform=`translateY(${g.dataset.e}px)`;g.style.opacity=1});svg.classList.add("abierta")}
  else if(caer){requestAnimationFrame(()=>requestAnimationFrame(()=>armado(true)));setTimeout(separar,gs.length*70+650)}
  else{gs.forEach(g=>{g.style.transition="none";g.style.opacity=1;g.style.transform=`translateY(${g.dataset.e}px)`});svg.classList.add("abierta")}
  box.querySelector(".dp-armar").onclick=()=>svg.classList.contains("abierta")?juntar():separar();
  box.querySelectorAll("[data-temp]").forEach(b=>b.onclick=()=>{box.dataset.temp=b.dataset.temp;pintarDespiece(box,nombre,precios,false,addNombre)});
}
document.addEventListener("click",e=>{const o=e.target.closest(".ojo");if(o)abrirDespiece(o)});
addEventListener("pointermove",e=>{if(!abierto)return;const r=abierto.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),l=Math.hypot(dx,dy)||1,k=Math.min(1,l/120);
  const iris=abierto.querySelector(".iris");iris.style.transform=`translate(${(dx/l*3.4*k).toFixed(2)}px,${(dy/l*2.4*k).toFixed(2)}px)`},{passive:true});

/* =============== CURSOR HAMBURGUESA =============== */
(function(){
  if(reduce||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  const c=document.createElement("div");c.id="cursor";c.setAttribute("aria-hidden","true");
  c.innerHTML=`<svg viewBox="-34 -34 68 68"><g class="cu-todo"><g class="cu-tapa"><path d="M-27 -4 Q-28 -24 0 -26 Q28 -24 27 -4 Z" fill="#E39B57" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="-9" cy="-17" rx="2.6" ry="1.4" fill="#FFF3D6"/><ellipse cx="3" cy="-20" rx="2.6" ry="1.4" fill="#FFF3D6"/><ellipse cx="13" cy="-14" rx="2.6" ry="1.4" fill="#FFF3D6"/><ellipse cx="-17" cy="-10" rx="2.4" ry="1.3" fill="#FFF3D6"/></g>
    <path d="M-28 -1 Q-20 -6 -12 -1 T4 -1 T20 -1 T30 -1 L28 4 L-28 4 Z" fill="#7FB04A" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M-27 3 H27 V6 L18 6 Q18 12 13 12 Q9 12 9 6 L-6 6 Q-6 14 -11 14 Q-16 14 -16 6 L-27 6 Z" fill="#F2A93B" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>
    <rect x="-28" y="6" width="56" height="11" rx="5.5" fill="#6B3B24" stroke="${OUT}" stroke-width="3"/>
    <path d="M-27 17 H27 Q27 27 18 27 H-18 Q-27 27 -27 17 Z" fill="#E39B57" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/></g></svg>`;
  document.body.appendChild(c);document.documentElement.classList.add("cursor-burger");
  let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y,vis=false,ang=0;
  addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;if(!vis){vis=true;x=tx;y=ty;c.classList.add("ver")}
    const t=e.target;const campo=t.closest&&t.closest("input,textarea,select");c.classList.toggle("oculto",!!campo);
    c.classList.toggle("hover",!!(t.closest&&t.closest("a,button,.pill,.ojo,[role=tab],label")))},{passive:true});
  document.addEventListener("pointerleave",()=>{vis=false;c.classList.remove("ver")});
  addEventListener("pointerdown",()=>{c.classList.add("click");migas(tx,ty)});addEventListener("pointerup",()=>c.classList.remove("click"));
  function migas(px,py){for(let i=0;i<7;i++){const m=document.createElement("i");m.className="miga";const a=Math.random()*Math.PI*2,d=24+Math.random()*28;
    m.style.cssText=`left:${px}px;top:${py}px;--dx:${(Math.cos(a)*d).toFixed(0)}px;--dy:${(Math.sin(a)*d-10).toFixed(0)}px;--r:${(Math.random()*360).toFixed(0)}deg`;document.body.appendChild(m);setTimeout(()=>m.remove(),650)}}
  (function loop(){const dx=tx-x,dy=ty-y;x+=dx*.22;y+=dy*.22;ang+=((Math.max(-18,Math.min(18,dx*.6)))-ang)*.15;
    c.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${ang.toFixed(1)}deg)`;requestAnimationFrame(loop)})();
})();

/* =============== PALMERAS CON VIENTO =============== */
/* Un solo viento para toda la página: brisa constante + ráfagas suaves que
   viajan de izquierda a derecha. Tronco con inercia (resorte), copa que llega
   un poco tarde y cada hoja con su propio aleteo. */
const NS="http://www.w3.org/2000/svg";
const HOJA="M0 0 C 28 -20 78 -26 122 -4 C 116 0 110 4 104 6 L 108 16 L 96 10 L 96 22 L 84 12 L 82 26 L 70 14 L 66 28 L 56 14 L 50 26 L 42 12 L 34 22 L 28 9 L 18 16 L 14 6 Z";
const NERVIO="M2 -1 C 30 -14 76 -18 118 -4";
function palmeraSVG(lado){
  // lado: hacia dónde se inclina el tronco ("der" o "izq")
  const s=lado=="der"?1:-1, B=[120,440], C=[120+s*34,118], K=[120+s*-6,280];
  // tronco: centro curvo (cuadrática) y anillos
  const pt=t=>[(1-t)*(1-t)*B[0]+2*(1-t)*t*K[0]+t*t*C[0],(1-t)*(1-t)*B[1]+2*(1-t)*t*K[1]+t*t*C[1]];
  const N=18;let izq=[],der=[],anillos="";
  for(let i=0;i<=N;i++){const t=i/N,[x,y]=pt(t),w=15-6*t,[x2,y2]=pt(Math.min(1,t+.01)),dx=x2-x,dy=y2-y,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;
    izq.push([x+nx*w,y+ny*w]);der.push([x-nx*w,y-ny*w]);
    if(i>0&&i<N)anillos+=`<path d="M${(x+nx*w).toFixed(1)} ${(y+ny*w).toFixed(1)} Q${(x+dy/l*3).toFixed(1)} ${(y+6).toFixed(1)} ${(x-nx*w).toFixed(1)} ${(y-ny*w).toFixed(1)}" stroke="${OUT}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`}
  const tronco=`M${izq.map(p=>p.map(v=>v.toFixed(1)).join(" ")).join(" L")} L${der.reverse().map(p=>p.map(v=>v.toFixed(1)).join(" ")).join(" L")} Z`;
  // hojas: [ángulo, largo, lado(1 der / -1 izq), tono, atrás?]
  const H=[[-62,.82,1,"#8F8A68"],[-62,.82,-1,"#8F8A68"],[-34,1.02,1,"#8F8A68"],[-34,1.02,-1,"#8F8A68"],
           [-8,1.12,1,"#9D9878"],[-8,1.12,-1,"#9D9878"],[22,1.06,1,"#A9A47F"],[22,1.06,-1,"#A9A47F"],[52,.86,1,"#A9A47F"],[52,.86,-1,"#A9A47F"],[-84,.72,1,"#9D9878"]];
  const hojas=H.map(([a,l,f,c],i)=>`<g class="hj" data-a="${a}" data-l="${l}" data-f="${f}" data-i="${i}" transform="translate(${C[0]} ${C[1]}) scale(${f*l} ${l}) rotate(${a})"><path d="${HOJA}" fill="${c}" stroke="${OUT}" stroke-width="${(3.2/l).toFixed(2)}" stroke-linejoin="round"/><path d="${NERVIO}" stroke="${OUT}" stroke-width="${(1.8/l).toFixed(2)}" fill="none" opacity=".55"/></g>`).join("");
  const cocos=`<g stroke="${OUT}" stroke-width="2.6"><circle cx="${C[0]-8}" cy="${C[1]+12}" r="9" fill="#6B4A2E"/><circle cx="${C[0]+7}" cy="${C[1]+14}" r="9" fill="#7A563A"/><circle cx="${C[0]}" cy="${C[1]+4}" r="8" fill="#5E4028"/></g>`;
  return {C,B,html:`<svg viewBox="0 0 240 440" aria-hidden="true"><g class="tr"><path d="${tronco}" fill="#A4765A" stroke="${OUT}" stroke-width="3.4" stroke-linejoin="round"/>${anillos}<g class="cp">${hojas}${cocos}</g></g></svg>`};
}
const VIENTO={t:0};
function viento(t){ // 0..~1.3
  const brisa=.45+.12*Math.sin(t*.31)+.08*Math.sin(t*.77+1.7)+.05*Math.sin(t*1.9+.4);
  const r=Math.sin(t*.105+.6), rafaga=r>0?Math.pow(r,6)*.75:0;      // ráfaga cada ~60 s
  const r2=Math.sin(t*.23+2.1), rafaga2=r2>0?Math.pow(r2,10)*.35:0;  // ráfagas chicas
  return brisa+rafaga+rafaga2;
}
class Resorte{constructor(k,c){this.k=k;this.c=c;this.x=0;this.v=0}paso(obj,dt){const a=this.k*(obj-this.x)-this.c*this.v;this.v+=a*dt;this.x+=this.v*dt;return this.x}}
const PALMAS=[];
function registrarSVG(el){
  const lado=el.dataset.lado||"der";const p=palmeraSVG(lado);el.innerHTML=p.html;
  const tr=el.querySelector(".tr"),cp=el.querySelector(".cp"),hj=[...el.querySelectorAll(".hj")].map(g=>({g,a:+g.dataset.a,l:+g.dataset.l,f:+g.dataset.f,fase:Math.random()*6.28,fr:2.1+Math.random()*1.6,r:new Resorte(18+Math.random()*8,4.5)}));
  PALMAS.push({tipo:"svg",el,p,tr,cp,hj,tronco:new Resorte(3.2+Math.random(),1.9),copa:new Resorte(9,3),vis:false,x:0,esc:.8+Math.random()*.4});
}
function registrarCapa(el){ // palmeras de la ilustración (raster)
  PALMAS.push({tipo:"capa",el,a:el.querySelector(".palma-a"),c:el.querySelector(".copa"),tronco:new Resorte(3.4,2),copa:new Resorte(10,3.2),vis:false,x:0,esc:1});
}
$$(".palmera[data-lado]").forEach(registrarSVG);
$$(".palma").forEach(registrarCapa);
const ioP=new IntersectionObserver(es=>es.forEach(e=>{const p=PALMAS.find(q=>q.el==e.target);if(p){p.vis=e.isIntersecting;if(p.vis)p.x=e.boundingClientRect.left/innerWidth}}),{rootMargin:"120px"});
PALMAS.forEach(p=>ioP.observe(p.el));
let tPrev=performance.now();
function soplar(now){
  const dt=Math.min(.05,(now-tPrev)/1000);tPrev=now;VIENTO.t+=dt;const T=VIENTO.t;
  for(const p of PALMAS){
    if(!p.vis)continue;
    const w=viento(T-p.x*2.2)*p.esc;           // la ráfaga llega antes a la izquierda
    const aT=p.tronco.paso(-.6+w*2.6,dt);       // tronco: lento, poco recorrido
    const aC=p.copa.paso(w*4.2+(aT+.6)*.8,dt);  // copa: llega tarde y exagera un poco
    if(p.tipo=="svg"){
      p.tr.setAttribute("transform",`rotate(${aT.toFixed(2)} ${p.p.B[0]} ${p.p.B[1]})`);
      p.cp.setAttribute("transform",`rotate(${(aC*.55).toFixed(2)} ${p.p.C[0]} ${p.p.C[1]})`);
      for(const h of p.hj){
        const flame=Math.sin(T*h.fr+h.fase)*(.8+w*2.4)+Math.sin(T*h.fr*2.3+h.fase*1.7)*(.3+w*.9);
        const d=h.r.paso(w*h.l*7*(h.f>0?1:1.25)+flame,dt);  // las del lado del viento se doblan más
        h.g.setAttribute("transform",`translate(${p.p.C[0]} ${p.p.C[1]}) rotate(${d.toFixed(2)}) scale(${h.f*h.l} ${h.l}) rotate(${h.a})`);
      }
    }else{
      p.a.style.transform=`rotate(${aT.toFixed(2)}deg)`;
      const fl=Math.sin(T*2.4)*(.5+w*1.2)+Math.sin(T*5.1+1)*(.2+w*.5);
      p.c.style.transform=`rotate(${(aC+fl).toFixed(2)}deg) skewX(${((aC+fl)*-.35).toFixed(2)}deg)`;
    }
  }
  requestAnimationFrame(soplar);
}
if(!reduce)requestAnimationFrame(soplar);else PALMAS.forEach(p=>{p.vis=true});

/* =============== REVEAL =============== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
function observar(els){els.forEach(el=>reduce?el.classList.add("in"):io.observe(el))}
observar($$(".rev,.tarjeta"));
render();
