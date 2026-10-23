(function(){
var P=[["index.html","Início"],["sobre.html","Sobre"],["servicos.html","Serviços"],["curriculo.html","Currículo"],["contato.html","Contato"]];
var cur=location.pathname.split("/").pop()||"index.html";
function $(s){return document.querySelector(s)}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
fetch("data/content.json").then(function(r){return r.json()}).then(init);
function init(D){
 var C=D.config;
 var nav=P.map(function(p){return '<li><a href="'+p[0]+'"'+(cur===p[0]?' aria-current="page"':'')+'>'+p[1]+'</a></li>'}).join("");
 document.body.insertAdjacentHTML("afterbegin",'<a class="skip" href="#main">Ir para o conteúdo</a><header class="top"><div class="wrap bar"><a class="logo" href="index.html">Rafael <span>Xavier</span></a><button class="burger" aria-label="Menu" aria-expanded="false">☰</button><nav aria-label="Principal"><ul>'+nav+'<li><button id="tema" aria-label="Alternar tema">◐</button></li><li><a class="btn" href="contato.html">Fale comigo</a></li></ul></nav></div></header>');
 document.body.insertAdjacentHTML("beforeend",'<footer><div class="wrap grid"><div><b>EngenIA Processos</b><br>Joinville / Barra Velha – SC<br>'+esc(C.cnpj)+'</div><div><a href="mailto:'+C.email+'">'+C.email+'</a><br><a href="'+C.linkedin+'" rel="noopener">LinkedIn</a><br><a href="https://wa.me/'+C.whatsapp+'" rel="noopener">WhatsApp</a></div><div><a href="privacidade.html">Política de Privacidade (LGPD)</a><br>© '+new Date().getFullYear()+' Rafael Xavier</div></div></footer><a class="wa" href="https://wa.me/'+C.whatsapp+'?text=Ol%C3%A1%20Rafael%2C%20vim%20pelo%20site." rel="noopener" data-ev="whatsapp">WhatsApp</a>');
 document.querySelectorAll("[data-agenda]").forEach(function(a){a.href=C.agenda});
 var b=$(".burger"),n=$("nav");
 b.onclick=function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o)};
 try{var t=localStorage.getItem("tema");if(t)document.documentElement.dataset.theme=t}catch(e){}
 $("#tema").onclick=function(){var d=document.documentElement,x=(d.dataset.theme==="dark"||(!d.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches))?"light":"dark";d.dataset.theme=x;try{localStorage.setItem("tema",x)}catch(e){}};
 var s=$("#servicos");if(s)s.innerHTML=D.servicos.map(function(x){return '<article class="card"><h3>'+esc(x.t)+'</h3><p><b>Problema:</b> '+esc(x.p)+'</p><p><b>Entregáveis:</b> '+esc(x.e)+'</p><p><small>Prazo: '+esc(x.prazo)+' · '+esc(x.f)+'</small></p>'+(s.dataset.full?'<a class="btn sec" href="contato.html?servico='+encodeURIComponent(x.t)+'">Solicitar</a>':'')+'</article>'}).join("");
 var d=$("#dores");if(d)d.innerHTML=D.dores.map(function(x){return '<div class="card">'+esc(x)+'</div>'}).join("");
 var tl=$("#timeline");if(tl)tl.innerHTML=D.timeline.map(function(x){return '<li><small>'+esc(x.d)+'</small><br><b>'+esc(x.t)+'</b> — '+esc(x.r)+'</li>'}).join("");
 var c=$("#comp");if(c)c.innerHTML=D.competencias.map(function(x){return '<li>'+esc(x)+'</li>'}).join("");
 var m=$("#metodo");if(m)m.innerHTML=D.metodo.map(function(x,i){return '<div class="card"><b>'+(i+1)+'.</b> '+esc(x)+'</div>'}).join("");
 var f=$("#form");if(f)form(f,C);
 document.addEventListener("click",function(e){var a=e.target.closest("[data-ev]");if(a&&window.gtag)gtag("event",a.dataset.ev)});
 cookies();
}
function form(f,C){
 var q=new URLSearchParams(location.search).get("servico");
 if(q){f.mensagem.value="Tenho interesse em: "+q+".\n";f.interesse.value="Consultoria"}
 var tel=f.telefone;tel.addEventListener("input",function(){var v=tel.value.replace(/\D/g,"").slice(0,11);v=v.replace(/^(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d{1,4})$/,"$1-$2");tel.value=v});
 var cnt=$("#cnt");f.mensagem.addEventListener("input",function(){cnt.textContent=f.mensagem.value.length+"/1000"});
 f.addEventListener("submit",function(e){
  e.preventDefault();var m=$("#msg");
  if(f.website.value)return;
  if(!f.lgpd.checked){m.textContent="É necessário aceitar o consentimento LGPD.";return}
  m.textContent="Enviando...";
  var fd=new FormData(f);fd.delete("website");
  fetch(C.formEndpoint,{method:"POST",body:fd,headers:{Accept:"application/json"}}).then(function(r){
   if(!r.ok)throw 0;m.textContent="Mensagem enviada! Retorno em até 2 dias úteis.";f.reset();if(window.gtag)gtag("event","form_submit")
  }).catch(function(){m.innerHTML='Não foi possível enviar agora. Fale por <a href="https://wa.me/'+C.whatsapp+'">WhatsApp</a> ou <a href="mailto:'+C.email+'">e-mail</a>.'});
 });
}
function cookies(){
 try{if(localStorage.getItem("ck"))return}catch(e){return}
 document.body.insertAdjacentHTML("beforeend",'<div class="ck" role="dialog" aria-label="Cookies"><p>Uso apenas cookies essenciais e, com seu consentimento, métricas de audiência. <a href="privacidade.html">Saiba mais</a>.</p><button class="btn" id="ok">Aceitar</button> <button class="btn sec" id="no">Recusar</button></div>');
 function cl(v){try{localStorage.setItem("ck",v)}catch(e){}$(".ck").remove()}
 $("#ok").onclick=function(){cl("1")};$("#no").onclick=function(){cl("0")};
}
if("serviceWorker"in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js")});
})();
