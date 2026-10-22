"""Dependency-free structure, local-link and packaging checks."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__();self.ids=set();self.refs=[];self.h1=0;self.main=0;self.lang=False;self.viewport=False;self.images=0;self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   assert a['id'] not in self.ids, f"duplicate id {a['id']}"
   self.ids.add(a['id'])
  if tag=='html':self.lang=a.get('lang')=='en'
  if tag=='meta' and a.get('name')=='viewport':self.viewport=True
  if tag=='h1':self.h1+=1
  if tag=='main':self.main+=1
  if tag=='img':
   self.images+=1
   assert all(k in a for k in ('alt','width','height')),a
  assert tag not in ('iframe','base'),tag
  if a.get('target')=='_blank':assert 'noopener' in a.get('rel','')
  for k in ('href','src'):
   if k in a:self.refs.append(a[k])
pages={n:Page(ROOT/n) for n in ('index.html','privacy.html')}
count=0
for name,page in pages.items():
 assert page.lang and page.viewport and page.h1==1 and page.main==1,name
 for ref in page.refs:
  u=urlsplit(ref)
  if u.scheme:
   assert u.scheme=='https',ref
   continue
  assert not ref.startswith('/'),ref
  target=ROOT/(unquote(u.path) or name)
  assert target.is_file(),f'{name}: missing {ref}'
  if u.fragment:assert u.fragment in pages[target.name].ids,ref
  count+=1
assert (ROOT/'.nojekyll').exists()
assert not list(ROOT.rglob('*.apk'))
assert not list(ROOT.rglob('google-services.json'))
css=(ROOT/'styles.css').read_text()
assert ':focus-visible' in css and 'prefers-reduced-motion' in css
print(f'PASS: {len(pages)} pages, {count} local references; landmarks, image metadata, subdirectory paths and package checks.')
