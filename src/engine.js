const $=s=>document.querySelector(s);
const KEY="overkill:v1";
const st={mode:"DEG",prec:12,hist:[],ans:0};
function load(){try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");if(d.mode==="DEG"||d.mode==="RAD")st.mode=d.mode;if([8,12,15].includes(d.prec))st.prec=d.prec;if(Array.isArray(d.hist))st.hist=d.hist.slice(0,100);if(typeof d.ans==="number")st.ans=d.ans}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}

class CalcError extends Error{constructor(kind,msg,pos){super(msg);this.kind=kind;this.pos=pos}}
const dom=(m,p)=>new CalcError("domínio",m,p);

const rad=x=>st.mode==="DEG"?x*Math.PI/180:x;
const deg=x=>st.mode==="DEG"?x*180/Math.PI:x;
const z=x=>Math.abs(x)<1e-15?0:x;
function fact(n){if(!Number.isInteger(n)||n<0)throw dom("Fatorial exige inteiro não negativo");if(n>170)throw new CalcError("numérico","Fatorial acima de 170 excede o limite");let r=1;for(let i=2;i<=n;i++)r*=i;return r}
const FN={
sin:[1,x=>z(Math.sin(rad(x)))],cos:[1,x=>z(Math.cos(rad(x)))],
tan:[1,x=>{const c=Math.cos(rad(x));if(Math.abs(c)<1e-15)throw dom("Tangente indefinida neste ângulo");return z(Math.sin(rad(x))/c)}],
asin:[1,x=>{if(x<-1||x>1)throw dom("asin exige valor entre −1 e 1");return deg(Math.asin(x))}],
acos:[1,x=>{if(x<-1||x>1)throw dom("acos exige valor entre −1 e 1");return deg(Math.acos(x))}],
atan:[1,x=>deg(Math.atan(x))],
sinh:[1,Math.sinh],cosh:[1,Math.cosh],tanh:[1,Math.tanh],
sqrt:[1,x=>{if(x<0)throw dom("Raiz quadrada de número negativo");return Math.sqrt(x)}],
cbrt:[1,Math.cbrt],
ln:[1,x=>{if(x<=0)throw dom("Logaritmo exige valor positivo");return Math.log(x)}],
log:[1,x=>{if(x<=0)throw dom("Logaritmo exige valor positivo");return z(Math.log10(x))}],
log2:[1,x=>{if(x<=0)throw dom("Logaritmo exige valor positivo");return Math.log2(x)}],
exp:[1,Math.exp],abs:[1,Math.abs],floor:[1,Math.floor],ceil:[1,Math.ceil],round:[1,Math.round],trunc:[1,Math.trunc],
fact:[1,fact],mod:[2,(a,b)=>{if(b===0)throw dom("Módulo por zero");return a-b*Math.floor(a/b)}],
pow:[2,Math.pow],min:["v",Math.min],max:["v",Math.max]
};
const CONST={pi:Math.PI,e:Math.E,phi:(1+Math.sqrt(5))/2,tau:2*Math.PI};

function tokenize(s){
  s=s.trimEnd();
  const re=/\s*(?:(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([πτ√])|(.))/gy;
  const out=[];let m;
  while(re.lastIndex<s.length&&(m=re.exec(s))){
    const txt=m[1]||m[2]||m[3]||m[4];const p=m.index+m[0].length-txt.length;
    if(m[1])out.push({t:"num",v:parseFloat(m[1]),p});
    else if(m[2])out.push({t:"id",v:m[2].toLowerCase(),p});
    else if(m[3])out.push({t:"id",v:{"π":"pi","τ":"tau","√":"sqrt"}[m[3]],p});
    else{
      const map={"×":"*","÷":"/","−":"-","–":"-",";":","};const c=map[m[4]]||m[4];
      if(!"+-*/^!%(),".includes(c))throw new CalcError("sintaxe","Caractere inesperado “"+m[4]+"”",p);
      out.push({t:"op",v:c,p});
    }
  }
  if(re.lastIndex<s.length&&!m)throw new CalcError("sintaxe","Caractere inesperado",re.lastIndex);
  return out;
}

function evaluate(src){
  const t=tokenize(src);let i=0;const end=src.trimEnd().length;
  const peek=()=>t[i],next=()=>t[i++];
  const isOp=(v)=>peek()&&peek().t==="op"&&peek().v===v;
  const fin=x=>{if(!Number.isFinite(x))throw new CalcError("numérico","Resultado fora do intervalo representável",peek()?peek().p:end);return x};
  function expr(){let l=term();while(isOp("+")||isOp("-")){const o=next().v;const r=term();l=o==="+"?l+r:l-r}return fin(l)}
  function term(){
    let l=unary();
    for(;;){
      const k=peek();if(!k)break;
      if(k.t==="op"&&(k.v==="*"||k.v==="/")){
        next();const r=unary();
        if(k.v==="/"){if(r===0)throw dom("Divisão por zero",k.p);l=l/r}else l=l*r;
      }else if(k.t==="num"||k.t==="id"||(k.t==="op"&&k.v==="(")){l=l*power()}
      else break;
    }
    return fin(l);
  }
  function unary(){
    if(isOp("-")){next();return -unary()}
    if(isOp("+")){next();return unary()}
    return power();
  }
  function power(){
    const b=postfix();
    if(isOp("^")){const k=next();const e=unary();
      if(b<0&&!Number.isInteger(e))throw dom("Potência fracionária de base negativa",k.p);
      if(b===0&&e<0)throw dom("Zero elevado a expoente negativo",k.p);
      return fin(Math.pow(b,e));}
    return b;
  }
  function postfix(){
    let v=primary();
    while(isOp("!")||isOp("%")){const k=next();v=k.v==="!"?fact2(v,k.p):v/100}
    return v;
  }
  function fact2(v,p){try{return fact(v)}catch(e){e.pos=p;throw e}}
  function primary(){
    const k=next();
    if(!k)throw new CalcError("sintaxe","Expressão incompleta",end);
    if(k.t==="num")return k.v;
    if(k.t==="op"&&k.v==="("){const v=expr();if(!isOp(")"))throw new CalcError("sintaxe","Faltou fechar o parêntese",peek()?peek().p:end);next();return v}
    if(k.t==="id"){
      if(k.v==="ans")return st.ans;
      if(k.v in CONST&&!isOp("("))return CONST[k.v];
      const f=FN[k.v];
      if(!f)throw new CalcError("sintaxe","Nome desconhecido “"+k.v+"”",k.p);
      let args=[];
      if(isOp("(")){
        next();
        if(!isOp(")")){args.push(expr());while(isOp(",")){next();args.push(expr())}}
        if(!isOp(")"))throw new CalcError("sintaxe","Faltou fechar o parêntese",peek()?peek().p:end);
        next();
      }else if(f[0]===1){args=[power()]}
      else throw new CalcError("sintaxe","Função “"+k.v+"” exige parênteses",k.p);
      if(f[0]!=="v"&&args.length!==f[0])throw new CalcError("sintaxe","“"+k.v+"” espera "+f[0]+" argumento(s)",k.p);
      if(f[0]==="v"&&!args.length)throw new CalcError("sintaxe","“"+k.v+"” exige ao menos um argumento",k.p);
      try{return fin(f[1](...args))}catch(e){if(e instanceof CalcError&&e.pos===undefined)e.pos=k.p;throw e}
    }
    throw new CalcError("sintaxe","Símbolo inesperado “"+k.v+"”",k.p);
  }
  if(!t.length)throw new CalcError("sintaxe","Expressão vazia",0);
  const v=expr();
  if(i<t.length)throw new CalcError("sintaxe","Símbolo inesperado “"+t[i].v+"”",t[i].p);
  return v;
}

function fmt(x){
  if(Object.is(x,-0))x=0;
  if(Number.isInteger(x)&&Math.abs(x)<1e15)return String(x);
  const n=parseFloat(x.toPrecision(st.prec));
  const a=Math.abs(n);
  if(a>=1e15||(a>0&&a<1e-6))return n.toExponential(Math.max(0,st.prec-1)).replace(/\.?0+e/,"e");
  return String(n);
}

const ex=$("#expr"),prev=$("#prev"),res=$("#res"),err=$("#err");
let lastText="";

function showErr(e){
  if(e instanceof CalcError)err.textContent="Erro de "+e.kind+" (posição "+((e.pos||0)+1)+"): "+e.message;
  else err.textContent="Erro inesperado";
}
function live(){
  err.textContent="";
  const s=ex.value;
  if(!s.trim()){res.textContent=lastText;return}
  try{res.textContent="= "+fmt(evaluate(s));res.dataset.v=res.textContent.slice(2)}catch(e){res.textContent=""}
}
function commit(){
  let s=ex.value;
  if(!s.trim())return;
  if(/^\s*[*\/^×÷]/.test(s))s="ans"+s;
  try{
    const v=evaluate(s);
    st.ans=v;
    const r=fmt(v);
    st.hist.unshift({e:s,r});st.hist=st.hist.slice(0,100);
    prev.textContent=s;lastText=r;res.textContent=r;res.dataset.v=r;ex.value="";err.textContent="";
    save();renderHist();
  }catch(e){showErr(e)}
}
function insert(txt){
  const a=ex.selectionStart??ex.value.length,b=ex.selectionEnd??a;
  ex.value=ex.value.slice(0,a)+txt+ex.value.slice(b);
  const c=a+txt.length;ex.focus({preventScroll:true});ex.setSelectionRange(c,c);live();
}
function back(){
  const a=ex.selectionStart??ex.value.length,b=ex.selectionEnd??a;
  if(a!==b){ex.value=ex.value.slice(0,a)+ex.value.slice(b);ex.setSelectionRange(a,a)}
  else if(a>0){ex.value=ex.value.slice(0,a-1)+ex.value.slice(a);ex.setSelectionRange(a-1,a-1)}
  live();
}
function renderHist(){
  const ul=$("#hist");ul.textContent="";
  st.hist.forEach(h=>{
    const li=document.createElement("li"),b=document.createElement("button"),r=document.createElement("b");
    b.type="button";r.textContent=" = "+h.r;b.append(document.createTextNode(h.e),r);
    b.onclick=()=>{ex.value=h.e;ex.focus({preventScroll:true});live()};
    li.append(b);ul.append(li);
  });
}

const KEYS=[
["C","clr","op"],["⌫","bs","op"],["(","(","op"],[")",")","op"],
["sin","sin(","op"],["cos","cos(","op"],["tan","tan(","op"],["^","^","op"],
["ln","ln(","op"],["log","log(","op"],["√","sqrt(","op"],["!","!","op"],
["7","7"],["8","8"],["9","9"],["÷","/","op"],
["4","4"],["5","5"],["6","6"],["×","*","op"],
["1","1"],["2","2"],["3","3"],["−","-","op"],
["0","0"],[".","."],["π","pi","op"],["+","+","op"],
["ans","ans","op"],["%","%","op"],["e","e","op"],[",",",","op"],
["=","eq","eq"]
];
const pad=$("#pad");
KEYS.forEach(([l,v,c])=>{
  const b=document.createElement("button");b.type="button";b.textContent=l;if(c)b.className=c;
  b.setAttribute("aria-label",({bs:"Apagar",clr:"Limpar",eq:"Calcular"})[v]||l);
  b.onclick=()=>{
    if(v==="clr"){ex.value="";prev.textContent="";lastText="";res.textContent="";err.textContent="";ex.focus({preventScroll:true})}
    else if(v==="bs")back();
    else if(v==="eq")commit();
    else insert(v);
  };
  pad.append(b);
});

ex.addEventListener("input",live);
ex.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();commit()}else if(e.key==="Escape"){ex.value="";live()}});
async function copy(){
  const v=res.dataset.v;if(!v)return;
  try{await navigator.clipboard.writeText(v);const o=res.textContent;res.textContent="copiado";setTimeout(()=>{res.textContent=o},700)}catch(e){}
}
res.onclick=copy;
res.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();copy()}};
$("#mode").onclick=()=>{st.mode=st.mode==="DEG"?"RAD":"DEG";$("#mode").textContent=st.mode;save();live()};
$("#prec").onchange=e=>{st.prec=parseInt(e.target.value,10);save();live()};
$("#clr").onclick=()=>{if(st.hist.length&&confirm("Apagar todo o histórico?")){st.hist=[];save();renderHist()}};

load();
$("#mode").textContent=st.mode;$("#prec").value=String(st.prec);renderHist();
if(matchMedia("(pointer:fine)").matches)ex.focus();else ex.setAttribute("inputmode","none");
