// Brallent site effects — Profound-style
(function(){
"use strict";
// mobile nav
var burger=document.getElementById('burger'), navLinks=document.getElementById('navLinks');
if(burger&&navLinks){ burger.addEventListener('click',function(){ navLinks.classList.toggle('open'); }); }
// hero rotating word
var rot=document.getElementById('rotator');
if(rot){
  var words=['业务','内容生产','知识管理','日常运营'], i=0;
  setInterval(function(){
    rot.classList.add('out');
    setTimeout(function(){ i=(i+1)%words.length; rot.textContent=words[i]; rot.classList.remove('out'); },300);
  },2800);
}
// scroll reveals
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.rv,.rv-blur').forEach(function(el){ io.observe(el); });
// counters
var cio=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return; cio.unobserve(e.target);
    var el=e.target, to=parseFloat(el.dataset.to), dec=parseInt(el.dataset.dec||'0'), t0=null;
    function tick(t){ if(!t0)t0=t; var p=Math.min((t-t0)/1400,1), v=to*(1-Math.pow(1-p,3));
      el.textContent=v.toFixed(dec); if(p<1)requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  });
},{threshold:.4});
document.querySelectorAll('.count').forEach(function(el){ cio.observe(el); });
// chat demo autoplay
var chat=document.getElementById('chatDemo');
if(chat){
  var reply='已分析 1,200 条会话：退换货政策、发货时效、发票开具是 Top 3 高频问题。标准话术已生成，客服智能体已上线试运行。';
  var ids=['bUser','bWork','bTools','t1','t2','t3','bAi','bChip','bCard'];
  function hideAll(){ ids.forEach(function(id){ var el=document.getElementById(id); if(el)el.classList.remove('show'); }); document.getElementById('bAi').textContent=''; }
  function show(id){ var el=document.getElementById(id); if(el)el.classList.add('show'); }
  function typeReply(){
    var el=document.getElementById('bAi'); show('bAi'); var i=0;
    var timer=setInterval(function(){
      el.textContent=reply.slice(0,++i);
      if(i>=reply.length){ clearInterval(timer); setTimeout(function(){ show('bChip'); setTimeout(function(){ show('bCard'); setTimeout(loop,6000); },900); },500); }
    },42);
  }
  function loop(){
    hideAll();
    setTimeout(function(){ show('bUser');
      setTimeout(function(){ show('bWork');
        var s=0, wt=document.getElementById('workTxt');
        var ct=setInterval(function(){ wt.textContent='工作中 '+(++s)+'s'; if(s>=3){clearInterval(ct); wt.textContent='工作完成'; } },1000);
        show('bTools');
        setTimeout(function(){ show('t1');
          setTimeout(function(){ show('t2');
            setTimeout(function(){ show('t3');
              setTimeout(typeReply,700);
            },800);
          },800);
        },800);
      },900);
    },600);
  }
  var started=false;
  var dio=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting&&!started){ started=true; loop(); dio.disconnect(); } });
  },{threshold:.3});
  dio.observe(chat);
}
// particle network (supports multiple canvases: .particles)
document.querySelectorAll('canvas.particles').forEach(function(cv){
  var ctx=cv.getContext('2d'), W,H,pts=[];
  function size(){ var r=cv.parentElement.getBoundingClientRect(); W=cv.width=r.width; H=cv.height=r.height; }
  size(); window.addEventListener('resize',size);
  var n=parseInt(cv.dataset.count||'70',10);
  for(var i=0;i<n;i++)pts.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006,r:Math.random()*1.6+.6});
  (function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(function(p){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x*W,p.y*H,p.r,0,7); ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fill();
    });
    for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
      var a=pts[i],b=pts[j],dx=(a.x-b.x)*W,dy=(a.y-b.y)*H,d=Math.sqrt(dx*dx+dy*dy);
      if(d<130){ ctx.beginPath(); ctx.moveTo(a.x*W,a.y*H); ctx.lineTo(b.x*W,b.y*H); ctx.strokeStyle='rgba(255,255,255,'+(0.14*(1-d/130))+')'; ctx.lineWidth=1; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  })();
});
// carousel
var track=document.getElementById('carTrack');
if(track){
  var dots=document.getElementById('carDots'), n=track.children.length;
  for(var i=0;i<n;i++){ var d=document.createElement('span'); d.className='dot'+(i===0?' on':''); dots.appendChild(d); }
  function cur(){ var w=track.children[0].offsetWidth+16; return Math.min(n-1,Math.round(track.scrollLeft/w)); }
  function upd(){ var c=cur(); dots.querySelectorAll('.dot').forEach(function(dd,ii){ dd.classList.toggle('on',ii===c); }); }
  track.addEventListener('scroll',function(){ window.requestAnimationFrame(upd); });
  document.getElementById('carPrev').onclick=function(){ track.scrollBy({left:-336,behavior:'smooth'}); };
  document.getElementById('carNext').onclick=function(){ track.scrollBy({left:336,behavior:'smooth'}); };
}
})();
