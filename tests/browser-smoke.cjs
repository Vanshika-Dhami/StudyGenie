const { chromium } = require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../frontend/Genie final');
const artifacts=path.resolve(process.env.STUDYGENIE_TEST_OUTPUT || 'work/browser');fs.mkdirSync(artifacts,{recursive:true});
const notes='# Understanding neural networks\n\nA clear guide to **learning from data**. हिन्दी मूल्य 3.14, देवनागरी १२३, symbols ± ≥ ∑ × ₹ © € and 50% remain readable. العربية 中文 தமிழ் stay intact.\n\n## 1. The core idea\n\nA network transforms inputs into predictions through connected layers. Each connection carries a weight.\n\n> Learning adjusts these weights to reduce prediction error.\n\n### The neuron\n\nThe weighted sum is \\(z = \\sum_{i=1}^{n} w_i x_i + b\\).\n\n$$\\sigma(z)=\\frac{1}{1+e^{-z}}$$\n\n- **Inputs:** observed features\n- **Weights:** learned importance\n- **Activation:** introduces nonlinearity\n\n## 2. Training the model\n\n| Step | Purpose |\n| --- | --- |\n| Forward pass | Make a prediction |\n| Backpropagation | Compute gradients |\n| Optimization | Update the weights |\n\n```python\n'+'very_long_code_line_'.repeat(20)+'\n```\n\n<img src=x onerror="window.__unsafe=true"><script>window.__unsafe=true</script>';
let branches=6,quizCompleted=false,posts=[],sourceSubmissions=[];
const data={notes:{content_text:notes},summary:{content_text:'## The essentials\n\nNetworks learn by adjusting weights.'},mindmap:{},flashcards:{content_json:{cards:[{front:'What is a neuron?',back:'A weighted combination of inputs.'},{front:'Why activation?',back:'To model nonlinear patterns.'}]}},questions:{content_json:[{question:'Explain backpropagation.',answer:'It computes **gradients** through the chain rule.'}]},quiz:{content_json:{quizId:'quiz1',questions:[{question:'What do weights represent?',options:['Learned importance','Sample count']}] }},revision:{content_text:'## Your revision plan\n\nReview weights and activations.'}};
let turns=[], generationFailure=0, offlineGeneration=false;
const source={id:'lecture',user_id:'alice',status:'ready',title:'Neural Networks · From intuition to understanding'};
const second={...source,id:'lecture2',title:'Electric Charges & Fields'};
const server=http.createServer((req,res)=>{let url=decodeURIComponent(req.url.split('?')[0]);if(url==='/')url='/dashboard.html';const file=path.resolve(root,'.'+url);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[path.extname(file)]||'text/plain');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,...(process.env.STUDYGENIE_BROWSER?{executablePath:process.env.STUDYGENIE_BROWSER}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});page.on('requestfailed',req=>errors.push(req.url()+': '+req.failure()?.errorText));
 await page.addInitScript(()=>{window.supabaseClient={auth:{getSession:async()=>({data:{session:{access_token:'fixture'}}}),signOut:async()=>({})}};});
 await page.route('**/npm/@supabase/supabase-js@2',route=>route.fulfill({body:'/* auth mocked for browser test */',contentType:'text/javascript'}));
 await page.route('http://localhost:4000/**',async route=>{
  const req=route.request(),u=new URL(req.url()),selected=u.pathname.includes('/lecture2')?second:source;let payload={};
  if(req.method()==='POST'&&u.pathname.includes('/features/')&&generationFailure){await route.fulfill({status:generationFailure,json:{error:'Provider busy'},headers:{'Access-Control-Allow-Origin':'*'}});return;}
  if(req.method()==='POST'&&u.pathname.includes('/features/')&&offlineGeneration){await route.abort('failed');return;}
  if(req.method()==='POST')posts.push(u.pathname);
  if(u.pathname==='/api/config/public')payload={supabaseUrl:'https://example.supabase.co',supabaseAnonKey:'fixture'};
  else if(u.pathname==='/api/me')payload={user:{id:'alice',email:'student@example.test',profile:{full_name:'Alex'}}};
  else if(u.pathname==='/api/study-sources'){if(req.method()==='POST'){sourceSubmissions.push(req.postDataJSON());source.language=req.postDataJSON().language;payload={cached:true,source};}else payload={sources:[second,source,{id:"failed",status:"error"},{id:"stale",status:"processing"}]};}
  else if(u.pathname.endsWith('/features'))payload={source:selected,features:Object.fromEntries(Object.keys(data).map(k=>[k,{generated:true}])),quizCompleted};
  else if(u.pathname.includes('/features/')){const type=u.pathname.split('/').pop();if(type==='mindmap')data.mindmap={content_json:{central:'Neural Networks',branches:Array.from({length:branches},(_,i)=>({topic:['The neuron','Network architecture','Learning process','Activation functions','Model evaluation','Practical applications'][i%6],children:['Core principles and connections','A useful example from the lecture','How this relates to the bigger picture']}))}};payload={feature:data[type]===null?null:{feature_type:type,title:type,...data[type]}};}
  else if(u.pathname.endsWith('/chat')){if(req.method()==='POST'){const body=req.postDataJSON();turns.push({question:body.message,answer:'Weights describe the **importance** of each input.',excerpts:[1,3]});}payload={turns,nextBefore:null};}
  else if(u.pathname.includes('/quizzes/')){quizCompleted=true;payload={attempt:{score:1,total:1,percentage:100,answers:[{question:'What do weights represent?',correctAnswer:'Learned importance',isCorrect:true,explanation:'Weights scale each input.'}]}};}
  else payload={source:selected,transcript:{title:source.title,duration_seconds:3600}};
  await route.fulfill({json:payload,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Allow-Methods':'GET, POST, OPTIONS'}});
 });
 const base=`http://127.0.0.1:${server.address().port}`;
 const open=async(type)=>{await page.goto(base+`/${type}.html?sourceId=lecture`);await page.waitForFunction(()=>!document.getElementById('featureStatus').textContent.includes('Opening saved'));};
 const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal page overflow');
 try{
  await open('notes');await page.waitForSelector('.markdown h2');await page.waitForSelector('mjx-container',{timeout:30000});assert.equal(await page.evaluate(()=>!!window.__unsafe),false);assert.equal(posts.length,0);assert.equal(await page.locator('#regenerateFeature').count(),0);assert.match(await page.locator('.markdown').innerText(),/हिन्दी मूल्य 3\.14.*१२३.*± ≥ ∑ × ₹ © €.*50%.*العربية 中文 தமிழ்/s);await noOverflow();
  await page.screenshot({path:path.join(artifacts,'notes-desktop.png'),fullPage:true});
  for(const count of [1,3,6,11]){branches=count;await open('mindmap');assert.equal(await page.locator('.map-branch').count(),count);await noOverflow();}
  branches=6;await open('mindmap');await page.screenshot({path:path.join(artifacts,'mindmap-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});for(const type of ['notes','mindmap','flashcards','questions','quiz','chat']){await open(type);await noOverflow();if(type==='mindmap')await page.screenshot({path:path.join(artifacts,'mindmap-mobile.png'),fullPage:true});}
  assert.equal(posts.length,0,'opening views must never generate');
  await open('revision');assert.match(await page.locator('#featureStatus').innerText(),/Complete a quiz/);
  await open('flashcards');await page.locator('#recallCard').click();assert.match(await page.locator('#recallCard').innerText(),/weighted combination/);
  await open('quiz');await page.locator('input[value="0"]').check();await page.getByRole('button',{name:'Finish quiz'}).click();await page.waitForSelector('.quiz-score');assert.equal(posts.filter(p=>p.includes('/quizzes/')).length,1);
  await open('revision');assert.match(await page.locator('#featureContent').innerText(),/revision plan/);
  await open('chat');await page.locator('textarea').fill('What do weights mean?');await page.getByRole('button',{name:'Send question'}).click();await page.waitForSelector('.chat-turn');await page.reload();await page.waitForSelector('.chat-turn');assert.equal(await page.locator('.chat-turn').count(),1);
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/dashboard.html?sourceId=lecture');await page.waitForFunction(()=>document.querySelector('[data-tool="mindmap"]').textContent.includes('Open'));await page.screenshot({path:path.join(artifacts,'dashboard.png'),fullPage:true});
  await page.selectOption('#lectureLanguage','hi');await page.locator('#lectureUrl').fill('https://youtu.be/qOMxCZ0SzBQ');await page.locator('#generateNotes').click();await page.waitForFunction(()=>document.querySelector('#lectureMeta')?.textContent.includes('हिन्दी'));assert.equal(sourceSubmissions.at(-1).language,'hi');
  await page.selectOption('#savedLectures','lecture2');
  await page.waitForFunction(()=>document.querySelector('#lectureTitle').textContent==='Electric Charges & Fields');
  assert.equal(new URL(page.url()).searchParams.get('sourceId'),'lecture2');
  await page.reload();await page.waitForFunction(()=>document.querySelector('#lectureTitle').textContent==='Electric Charges & Fields');
  assert.match(await page.locator('#resumeProgress').innerText(),/Notes ready.*6\/6.*Quiz completed/);
  const generationPosts=posts.filter(p=>p.includes('/features/')).length;
  await page.locator('[data-tool="mindmap"]').click();await page.waitForSelector('.mindmap');
  assert.equal(new URL(page.url()).searchParams.get('sourceId'),'lecture2');
  await page.locator('#dashboardLink').click();await page.waitForFunction(()=>document.querySelector('[data-tool="mindmap"]')?.textContent.includes('Open'));
  assert.equal(new URL(page.url()).searchParams.get('sourceId'),'lecture2');
  await page.selectOption('#savedLectures','lecture');await page.waitForFunction(()=>document.querySelector('#lectureTitle').textContent.includes('Neural Networks'));
  await page.goBack();await page.waitForFunction(()=>document.querySelector('#lectureTitle').textContent==='Electric Charges & Fields');
  assert.equal(await page.locator('#savedLectures option').count(),3,'only two ready lectures plus placeholder');
  await page.goto(base+'/dashboard.html');await page.waitForFunction(()=>document.querySelector('#lectureTitle').textContent==='Electric Charges & Fields');
  assert.equal(new URL(page.url()).searchParams.get('sourceId'),'lecture2');
  assert.equal(posts.filter(p=>p.includes('/features/')).length,generationPosts);
  await page.setViewportSize({width:390,height:844});await noOverflow();await page.screenshot({path:path.join(artifacts,'resume-mobile.png'),fullPage:true});
  data.summary=null;await open('summary');
  for(const status of [429,503]){generationFailure=status;await page.locator('#generateFeature').click();await page.waitForFunction(()=>document.querySelector('#featureStatus').textContent.includes('retry later'));assert.match(await page.locator('#featureStatus').innerText(),/lecture is already saved/);assert.equal(await page.locator('#generateFeature').isEnabled(),true);}
  generationFailure=0;
  assert.deepEqual(errors.filter(e=>!e.includes('429')&&!e.includes('503')),[]);console.log('Browser checks passed: Markdown, MathJax, XSS sanitization, 1/3/6/11-branch maps, desktop/mobile overflow, read-only opens, flashcards, quiz unlock, chat reload, dashboard saved states, ready-only picker, URL reload/back, scoped Resume progress, 429/503 messages.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});

