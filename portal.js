'use strict';
const study=document.getElementById('study');
const ordinary=document.getElementById('ordinary');
const status=document.getElementById('status');
for(const link of [study,ordinary])link.addEventListener('click',event=>{if(link.getAttribute('aria-disabled')==='true')event.preventDefault();});
async function prepareEntry(){
  try{
    const response=await fetch('connection.json?v='+Math.floor(Date.now()/60000),{cache:'no-store'});
    if(!response.ok)throw new Error('entry_unavailable');
    const config=await response.json();
    if(config.enabled!==true)throw new Error('entry_closed');
    const origin=new URL(config.origin);
    if(origin.protocol!=='https:'||origin.username||origin.password||origin.pathname!=='/'||origin.search||origin.hash||!/^[-a-z0-9]+\.trycloudflare\.com$/i.test(origin.hostname))throw new Error('invalid_destination');
    study.href=new URL('/study',origin).href;
    ordinary.href=origin.origin+'/';
    for(const link of [study,ordinary]){link.setAttribute('aria-disabled','false');link.tabIndex=0;}
    status.textContent='研究说明与同意将在下一页呈现。';
  }catch{
    for(const link of [study,ordinary]){link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.tabIndex=-1;}
    status.textContent='入口暂未开放，请稍后再来。';
  }
}
prepareEntry();
