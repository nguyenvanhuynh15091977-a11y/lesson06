(function(){
var $=function(i){return document.getElementById(i)};
var mode="login", SKEY="cv_users", CKEY="cv_session";
function store(op,k,v){try{if(op==="g")return localStorage.getItem(k);if(op==="s")localStorage.setItem(k,v);if(op==="d")localStorage.removeItem(k)}catch(e){}return null}
function users(){try{return JSON.parse(store("g",SKEY)||"{}")}catch(e){return {}}}
var mem={users:{},session:null};
function getUsers(){var u=users();return Object.keys(u).length?u:mem.users}
function saveUsers(u){mem.users=u;store("s",SKEY,JSON.stringify(u))}
function hash(s){
  if(window.crypto&&crypto.subtle){return crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")})}
  return Promise.resolve(btoa(unescape(encodeURIComponent(s))))
}
function toast(t){var e=$("toast");e.textContent=t;e.classList.remove("hidden");clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.add("hidden")},2600)}
function session(){var s=store("g",CKEY);return s?s:mem.session}
function render(){
  var s=session();
  $("btnLogin").classList.toggle("hidden",!!s);$("btnSignup").classList.toggle("hidden",!!s);
  $("btnLogout").classList.toggle("hidden",!s);$("who").classList.toggle("hidden",!s);
  if(s)$("who").textContent="Xin chào, "+s;
}
function setMode(m){
  mode=m;var su=m==="signup";
  $("tLogin").setAttribute("aria-selected",!su);$("tSignup").setAttribute("aria-selected",su);
  $("mTitle").textContent=su?"Tạo tài khoản":"Đăng nhập";$("submit").textContent=su?"Tạo tài khoản":"Đăng nhập";
  $("nameRow").classList.toggle("hidden",!su);$("passRow").classList.toggle("hidden",!su);
  $("fPass").autocomplete=su?"new-password":"current-password";
  $("msg").textContent="";
}
function open(m){setMode(m);$("overlay").classList.remove("hidden");$("fEmail").focus()}
function close(){$("overlay").classList.add("hidden");["fName","fEmail","fPass","fPass2"].forEach(function(i){$(i).value=""});$("msg").textContent=""}
function login(name){mem.session=name;store("s",CKEY,name);render();close();toast("Đăng nhập thành công")}
function err(t){var m=$("msg");m.className="msg";m.textContent=t}

$("btnLogin").onclick=function(){open("login")};
$("btnSignup").onclick=function(){open("signup")};
$("close").onclick=close;
$("overlay").addEventListener("click",function(e){if(e.target===this)close()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
$("tLogin").onclick=function(){setMode("login")};
$("tSignup").onclick=function(){setMode("signup")};
$("btnLogout").onclick=function(){mem.session=null;store("d",CKEY);render();toast("Đã đăng xuất")};

$("submit").onclick=function(){
  var email=$("fEmail").value.trim().toLowerCase(),pw=$("fPass").value,u=getUsers();
  if(!/^\S+@\S+\.\S+$/.test(email))return err("Email chưa đúng định dạng.");
  if(pw.length<6)return err("Mật khẩu cần ít nhất 6 ký tự.");
  if(mode==="signup"){
    var name=$("fName").value.trim();
    if(!name)return err("Vui lòng nhập họ và tên.");
    if(pw!==$("fPass2").value)return err("Hai mật khẩu chưa khớp.");
    if(u[email])return err("Email này đã có tài khoản. Hãy đăng nhập.");
    hash(pw).then(function(h){u[email]={name:name,h:h};saveUsers(u);login(name)});
  }else{
    if(!u[email])return err("Chưa có tài khoản với email này. Hãy tạo tài khoản.");
    hash(pw).then(function(h){if(u[email].h!==h)return err("Mật khẩu chưa đúng.");login(u[email].name)});
  }
};
$("fb").onclick=function(){login("Người dùng Facebook");toast("Demo: chưa kết nối Facebook thật")};
$("gg").onclick=function(){login("Người dùng Google");toast("Demo: chưa kết nối Google thật")};

/* glow on click */
document.addEventListener("click",function(e){
  var t=e.target.closest(".card,.chip,.btn,.glowable");if(!t)return;
  if(t.classList.contains("chip")){document.querySelectorAll(".chip.glow").forEach(function(c){c.classList.remove("glow")});t.classList.add("glow");return}
  if(t.classList.contains("card")){var was=t.classList.contains("glow");document.querySelectorAll(".card.glow").forEach(function(c){c.classList.remove("glow")});if(!was)t.classList.add("glow");return}
  t.classList.add("glow");setTimeout(function(){t.classList.remove("glow")},600);
});
document.querySelectorAll(".card[tabindex]").forEach(function(c){c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();c.click()}})});
render();
})();

/* contact form + reveal animation */
(function(){
var d=document;d.documentElement.classList.add("js");
var form=d.getElementById("cform");if(!form)return;
var ENDPOINT=""; // Dán link Formspree / Web3Forms vào đây nếu muốn gửi thẳng, không cần mở app email
var TO="ngokhai15022008@gmail.com";
var f={n:d.getElementById("cName"),e:d.getElementById("cMail"),m:d.getElementById("cMsg")};
var st=d.getElementById("cStatus"),btn=d.getElementById("cSend"),cnt=d.getElementById("cCount"),txt=btn.querySelector(".t");
function say(t,ok){st.textContent=t;st.className="msg"+(ok?" ok":"")}
function state(c,t){btn.className="btn solid full send"+(c?" "+c:"");txt.textContent=t}
f.m.addEventListener("input",function(){cnt.textContent=f.m.value.length+"/500"});
[f.n,f.e,f.m].forEach(function(i){i.addEventListener("input",function(){i.parentNode.classList.remove("bad")})});
function done(t,reset){state("done","Đã gửi");say(t,true);if(reset){form.reset();cnt.textContent="0/500"}setTimeout(function(){state("","Gửi tin nhắn")},3500)}
function fail(){state("","Gửi tin nhắn");say("Chưa gửi được. Bạn thử lại hoặc email trực tiếp cho mình nhé.")}
form.addEventListener("submit",function(ev){
  ev.preventDefault();
  var bad=[];
  if(!f.n.value.trim())bad.push(f.n);
  if(!/^\S+@\S+\.\S+$/.test(f.e.value.trim()))bad.push(f.e);
  if(f.m.value.trim().length<10)bad.push(f.m);
  [f.n,f.e,f.m].forEach(function(i){i.parentNode.classList.toggle("bad",bad.indexOf(i)>-1)});
  if(bad.length){
    say(bad[0]===f.m?"Tin nhắn cần ít nhất 10 ký tự.":bad[0]===f.e?"Email chưa đúng định dạng.":"Vui lòng nhập họ và tên.");
    form.classList.remove("shake");void form.offsetWidth;form.classList.add("shake");bad[0].focus();return;
  }
  var data={name:f.n.value.trim(),email:f.e.value.trim(),message:f.m.value.trim()};
  state("loading","Đang gửi...");say("");
  if(ENDPOINT){
    fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
      .then(function(r){r.ok?done("Đã gửi tin nhắn. Cảm ơn bạn!",true):fail()}).catch(fail);
  }else{
    setTimeout(function(){
      location.href="mailto:"+TO+"?subject="+encodeURIComponent("Liên hệ từ CV: "+data.name)+"&body="+encodeURIComponent(data.message+"\n\n— "+data.name+" ("+data.email+")");
      done("Đã mở ứng dụng email của bạn. Nhấn Gửi trong đó để hoàn tất.",false);
    },900);
  }
});
/* reveal on scroll */
var els=[].slice.call(d.querySelectorAll(".reveal"));
function show(el,i){el.style.setProperty("--d",(i*0.12)+"s");el.classList.add("in");setTimeout(function(){el.classList.remove("reveal","in");el.style.removeProperty("--d")},900+i*120)}
if("IntersectionObserver" in window){
  var k=0,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);show(e.target,k++%4)}})},{threshold:.15});
  els.forEach(function(el){io.observe(el)});
}else{els.forEach(show)}
})();
