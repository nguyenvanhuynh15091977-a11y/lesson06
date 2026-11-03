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
