const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname,'../script.js'),'utf8');
function run(apkUrl) {
 const hero={href:'#download'}, download={hidden:true}, fallback={hidden:false}, status={textContent:'Unavailable'};
 const nodes={'[data-apk-fallback]':fallback,'[data-apk-status]':status};
 vm.runInNewContext(source,{URL,window:{INDOFREQ_SITE:{apkUrl,apkVersion:'v-test',apkSize:'10 MB'}},document:{documentElement:{classList:{add(){}}},querySelector:s=>nodes[s]||null,querySelectorAll:()=>[hero,download]}});
 return {hero,download,fallback,status};
}
const bad=['',undefined,'not a URL','javascript:alert(1)','http://github.com/a/b/releases/download/v/a.apk','https://example.com/a.apk','https://github.com/a/b/releases/tag/v','https://github.com/a/b/releases/download/v/a.zip','https://user:pass@github.com/a/b/releases/download/v/a.apk','https://github.com/a/b/releases/download/v/a.apk?x=1'];
for(const url of bad){const r=run(url);assert.equal(r.hero.href,'#download');assert.equal(r.download.hidden,true);assert.equal(r.fallback.hidden,false);}
for(const url of ['https://github.com/example/example/releases/download/test/app.apk','https://github.com/example/example/releases/latest/download/app.apk']){const r=run(url);assert.equal(r.hero.href,url);assert.equal(r.download.href,url);assert.equal(r.download.hidden,false);assert.equal(r.fallback.hidden,true);assert.ok(r.status.textContent.includes('v-test'));}
console.log('PASS: 12 download configuration cases (synthetic URLs; no network requests).');
