function renderManual(md,body){
  body.textContent="";
  let ul=null,pre=null,para=null;
  const inline=(el,text)=>{
    text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).forEach(p=>{
      if(!p)return;
      if(p[0]==="`"&&p.length>1){const c=document.createElement("code");c.textContent=p.slice(1,-1);el.append(c)}
      else if(p.startsWith("**")&&p.length>3){const b=document.createElement("strong");b.textContent=p.slice(2,-2);el.append(b)}
      else el.append(document.createTextNode(p));
    });
  };
  for(const line of md.split("\n")){
    if(line.startsWith("```")){pre=pre?null:body.appendChild(document.createElement("pre"));ul=null;para=null;continue}
    if(pre){pre.textContent+=(pre.textContent?"\n":"")+line;continue}
    const h=line.match(/^(#{1,3}) (.+)$/);
    if(h){const e=document.createElement("h"+(h[1].length+1));inline(e,h[2]);body.append(e);ul=null;para=null;continue}
    if(line.startsWith("- ")){
      if(!ul){ul=document.createElement("ul");body.append(ul)}
      const li=document.createElement("li");inline(li,line.slice(2));ul.append(li);para=null;continue;
    }
    if(!line.trim()){ul=null;para=null;continue}
    if(!para){para=document.createElement("p");body.append(para)}else para.append(document.createTextNode(" "));
    inline(para,line);
  }
}
function helpUI(){
  const body=$("#hlpBody"),sel=$("#hlpLang");
  let docs=null;
  const show=()=>{if(docs)renderManual(docs[sel.value]||docs.pt,body)};
  sel.onchange=show;
  fetch("MANUAL.md").then(r=>{if(!r.ok)throw new Error("http");return r.text()}).then(t=>{
    const parts=t.split(/^(?=# )/m).filter(p=>p.trim());
    docs={en:parts[0],pt:parts[1]||parts[0]};show();
  }).catch(()=>{body.textContent="Não foi possível carregar o manual. Ele está no arquivo MANUAL.md do repositório."});
}
if(typeof document!=="undefined"&&document.getElementById("help"))helpUI();
