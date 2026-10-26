/* Static localization only. No analytics, tracking, or notification data on this site. */
const languageNames={"en-US":"English (US)","en-AU":"English (Australia)","en-CA":"English (Canada)","en-GB":"English (UK)","ar":"العربية","bn":"বাংলা","ca":"Català","zh-Hans":"简体中文","zh-Hant":"繁體中文","hr":"Hrvatski","cs":"Čeština","da":"Dansk","nl":"Nederlands","fi":"Suomi","fr":"Français","fr-CA":"Français (Canada)","de":"Deutsch","el":"Ελληνικά","gu":"ગુજરાતી","he":"עברית","hi":"हिन्दी","hu":"Magyar","id":"Bahasa Indonesia","it":"Italiano","ja":"日本語","kn":"ಕನ್ನಡ","ko":"한국어","ms":"Bahasa Melayu","ml":"മലയാളം","mr":"मराठी","nb":"Norsk","or":"ଓଡ଼ିଆ","pl":"Polski","pt-BR":"Português (Brasil)","pt-PT":"Português (Portugal)","pa":"ਪੰਜਾਬੀ","ro":"Română","ru":"Русский","sk":"Slovenčina","sl":"Slovenščina","es-MX":"Español (México)","es":"Español (España)","sv":"Svenska","ta":"தமிழ்","te":"తెలుగు","th":"ไทย","tr":"Türkçe","uk":"Українська","ur":"اردو","vi":"Tiếng Việt"};
const selector=document.querySelector('#locale');
for(const [code,label] of Object.entries(languageNames)){const option=document.createElement('option');option.value=code;option.textContent=label;if(code!=='en-US')selector.append(option);}
async function setLocale(code){
 if(!Object.hasOwn(languageNames,code))code='en-US';
 try{const response=await fetch(new URL('locales/'+encodeURIComponent(code)+'.json',document.baseURI));if(!response.ok)throw new Error('Missing language');const copy=await response.json();
  document.documentElement.lang=code;document.documentElement.dir=['ar','he','ur'].includes(code)?'rtl':'ltr';
  for(const node of document.querySelectorAll('[data-i18n]')){const key=node.getAttribute('data-i18n');node.textContent=copy[key]||key;}
  for(const node of document.querySelectorAll('[data-i18n-aria]'))node.setAttribute('aria-label',copy[node.dataset.i18nAria]||node.dataset.i18nAria);
  for(const node of document.querySelectorAll('[data-i18n-alt]'))node.setAttribute('alt',copy[node.dataset.i18nAlt]||node.dataset.i18nAlt);
  const shot=document.querySelector('#app-screenshot');if(shot)shot.src=new URL('assets/screenshots/'+code+'.png',document.baseURI).href;
  selector.value=code;try{sessionStorage.setItem('notgone-language',code);}catch{}
 }catch{selector.value='en-US';}
}
selector.addEventListener('change',()=>setLocale(selector.value));
let initial='en-US';try{initial=sessionStorage.getItem('notgone-language')||initial;}catch{}
setLocale(initial);
