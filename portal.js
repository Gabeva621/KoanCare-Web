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
    ready=true;renderLocale();
  }catch{
    for(const link of [study,ordinary]){link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.tabIndex=-1;}
    ready=false;renderLocale();
  }
}
let lang=localStorage.getItem('kc-language')==='en'?'en':'zh';
let ready=null;
const translations={zh:{note:'写下此刻，慢慢读。',eyebrow:'为日常保留一点思考空间',title:'让一个困境，有片刻回响。',lead:'不必急着整理所有思绪。从此刻的一句话开始。',entryTitle:'按自己的节奏，留下一点理解。',entryHeading:'KoanCare · 在线入口',invitation:'进入后，你可以先阅读研究说明，再决定是否参与。',study:'参与研究 ↗',ordinary:'或进入日常反思',small:'若下一页暂时无法打开，请稍后再试。',footer:'KoanCare · 日常反思与研究',ending:'此刻，留一点余地。'},en:{note:'Write a little. Read at your own pace.',eyebrow:'A little room for everyday reflection',title:'A small dilemma. A moment to reflect.',lead:'There is no need to gather every thought. Start with a sentence about this moment.',entryTitle:'At your own pace, leave a little understanding.',entryHeading:'KoanCare · Welcome',invitation:'Read the study information before deciding whether to participate.',study:'Research study ↗',ordinary:'Or enter everyday reflection',small:'If the next page is unavailable, please try again later.',footer:'KoanCare · Everyday reflection and research',ending:'Leave a little room for this moment.'}};
function renderLocale(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=lang==='zh'?'KoanCare · 在线研究':'KoanCare · Reflection and research';
 for(const el of document.querySelectorAll('[data-copy]'))el.textContent=translations[lang][el.dataset.copy];
 status.textContent=ready===true?(lang==='zh'?'研究说明与同意将在下一页呈现。':'Study information and consent appear on the next page.'):ready===false?(lang==='zh'?'入口暂未开放，请稍后再来。':'The entry is unavailable. Please return later.'):(lang==='zh'?'正在准备入口……':'Preparing the entry…');
 if(ready)for(const el of [study,ordinary]){const url=new URL(el.href);url.search=lang==='en'?'?lang=en':'';el.href=url.href;}
 document.querySelector('.brand').setAttribute('aria-label',lang==='zh'?'KoanCare 首页':'KoanCare home');
}
document.getElementById('locale').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';localStorage.setItem('kc-language',lang);renderLocale();});
renderLocale();
prepareEntry();
