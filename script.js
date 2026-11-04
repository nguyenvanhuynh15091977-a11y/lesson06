(function(){
var d=document;
var form=d.getElementById("cform");
if(!form)return;

var to="ngokhai15022008@gmail.com";
var fields={
  name:d.getElementById("cName"),
  email:d.getElementById("cMail"),
  message:d.getElementById("cMsg")
};
var status=d.getElementById("cStatus");
var button=d.getElementById("cSend");
var count=d.getElementById("cCount");
var buttonText=button.querySelector(".t");

function say(text,ok){
  status.textContent=text;
  status.className="msg"+(ok?" ok":"");
}

fields.message.addEventListener("input",function(){
  count.textContent=fields.message.value.length+"/500";
});

Object.keys(fields).forEach(function(key){
  fields[key].addEventListener("input",function(){
    fields[key].parentNode.classList.remove("bad");
  });
});

form.addEventListener("submit",function(event){
  event.preventDefault();
  var invalid=[];

  if(!fields.name.value.trim())invalid.push(fields.name);
  if(!/^\S+@\S+\.\S+$/.test(fields.email.value.trim()))invalid.push(fields.email);
  if(fields.message.value.trim().length<10)invalid.push(fields.message);
  Object.keys(fields).forEach(function(key){
    fields[key].parentNode.classList.toggle("bad",invalid.indexOf(fields[key])!==-1);
  });

  if(invalid.length){
    say(invalid[0]===fields.message?"Tin nhắn cần ít nhất 10 ký tự.":invalid[0]===fields.email?"Email chưa đúng định dạng.":"Vui lòng nhập họ và tên.");
    form.classList.remove("shake");
    void form.offsetWidth;
    form.classList.add("shake");
    invalid[0].focus();
    return;
  }

  var subject=encodeURIComponent("Liên hệ từ CV: "+fields.name.value.trim());
  var body=encodeURIComponent(fields.message.value.trim()+"\n\n— "+fields.name.value.trim()+" ("+fields.email.value.trim()+")");
  window.location.href="mailto:"+to+"?subject="+subject+"&body="+body;
  say("Đã mở ứng dụng email. Kiểm tra nội dung và nhấn Gửi để hoàn tất.",true);
});
})();

/* Reveal content only after JavaScript is available, with a reduced-motion fallback. */
(function(){
var d=document;
d.documentElement.classList.add("js");
var elements=Array.prototype.slice.call(d.querySelectorAll(".reveal"));
function show(element,index){
  element.style.setProperty("--d",(index*0.12)+"s");
  element.classList.add("in");
  setTimeout(function(){
    element.classList.remove("reveal","in");
    element.style.removeProperty("--d");
  },900+index*120);
}
if("IntersectionObserver" in window){
  var order=0;
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        observer.unobserve(entry.target);
        show(entry.target,order++%4);
      }
    });
  },{threshold:.15});
  elements.forEach(function(element){observer.observe(element)});
}else{
  elements.forEach(show);
}
})();
