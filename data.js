/* ---------- Wardrobe, occasions and the scoring rules (no DOM in this file) ---------- */
const SW = [
  { id: 'white', n: 'White', h: '#FFFFFF', neu: 1 }, { id: 'cream', n: 'Cream', h: '#F4E9D2', neu: 1 }, { id: 'sand', n: 'Sand', h: '#D8B98E', neu: 1 },
  { id: 'brown', n: 'Chestnut', h: '#8B5A3A', neu: 1 }, { id: 'grey', n: 'Grey', h: '#A8A8B8', neu: 1 }, { id: 'charcoal', n: 'Charcoal', h: '#4B4A5A', neu: 1 },
  { id: 'black', n: 'Black', h: '#25222E', neu: 1 }, { id: 'navy', n: 'Navy', h: '#2A3566', neu: 1 }, { id: 'denim', n: 'Denim blue', h: '#5E82BC', neu: 1 },
  { id: 'red', n: 'Cherry red', h: '#D8403C' }, { id: 'coral', n: 'Coral', h: '#F47A62' }, { id: 'burgundy', n: 'Burgundy', h: '#8B2742' },
  { id: 'orange', n: 'Tangerine', h: '#F5923A' }, { id: 'yellow', n: 'Sunshine yellow', h: '#F7CD3C' }, { id: 'olive', n: 'Olive', h: '#7E9448' },
  { id: 'green', n: 'Leaf green', h: '#3FA568' }, { id: 'mint', n: 'Mint', h: '#9FDEC3' }, { id: 'teal', n: 'Teal', h: '#1F9C9A' },
  { id: 'sky', n: 'Sky blue', h: '#8EC9F0' }, { id: 'cobalt', n: 'Cobalt', h: '#3769D8' }, { id: 'purple', n: 'Grape', h: '#7A50C8' },
  { id: 'lilac', n: 'Lilac', h: '#C5B0EC' }, { id: 'pink', n: 'Rose pink', h: '#F7A9C8' }, { id: 'hotpink', n: 'Hot pink', h: '#E8468F' }
];
const SWX = Object.fromEntries(SW.map(s => [s.id, s]));
const FAM = { red: 'red', coral: 'red', burgundy: 'red', pink: 'pink', hotpink: 'pink', orange: 'orange', yellow: 'yellow', olive: 'green', green: 'green', mint: 'green', teal: 'teal', sky: 'blue', cobalt: 'blue', purple: 'purple', lilac: 'purple' };
const FAMDEG = { red: 0, orange: 30, yellow: 55, green: 120, teal: 180, blue: 215, purple: 265, pink: 330 };
const FAVE = 'teal';

const SKINS = [['#FBE3D0', '#EDBFA6'], ['#F3CFB0', '#E0AD8C'], ['#E3B088', '#C99068'], ['#C68B5F', '#A66D46'], ['#9A6240', '#7B4A2E'], ['#6B4226', '#50301B']];
const HAIRS = [['long', 'Long and straight'], ['waves', 'Long waves'], ['bob', 'Bob with fringe'], ['pony', 'High ponytail'], ['buns', 'Space buns'], ['curls', 'Curly cloud'], ['braids', 'Two plaits'], ['pixie', 'Pixie crop']];
const HAIRCOLS = [['#2b2430', 'Black'], ['#4a2f27', 'Dark brown'], ['#7a4a2b', 'Chestnut'], ['#a6532b', 'Auburn'], ['#d9772e', 'Ginger'], ['#e8c26a', 'Honey blonde'], ['#f1e6c8', 'Platinum'], ['#f08bb4', 'Candy pink'], ['#5a8de0', 'Ocean blue'], ['#b79be8', 'Lilac']];
const EYECOLS = [['#6b4a2f', 'Brown'], ['#2b2430', 'Dark'], ['#3d7a5a', 'Green'], ['#4a78c2', 'Blue'], ['#8a8f9c', 'Grey']];
const PATTERNS = [['solid', 'Plain'], ['stripes', 'Stripes'], ['dots', 'Polka dots'], ['checks', 'Gingham'], ['flowers', 'Flowers'], ['stars', 'Stars']];

const I = (slot, id, name, col, w, f, m, v, x) => Object.assign({ slot, id, name, col, w, f, m, v }, x || {});
const ITEMS = [
  I('top', 'tee', 'Classic tee', 'white', 1, 2, 3, ['classic', 'sporty'], { vol: 1 }),
  I('top', 'longtee', 'Breton long-sleeve', 'white', 2, 2, 3, ['classic', 'artsy'], { vol: 1, pat: 'stripes', pcol: 'navy' }),
  I('top', 'tank', 'Tank top', 'coral', 0, 2, 3, ['sporty', 'street'], { vol: 0 }),
  I('top', 'polo', 'Polo shirt', 'white', 1, 3, 3, ['classic', 'sporty'], { vol: 1 }),
  I('top', 'shirt', 'Button-up shirt', 'sky', 2, 4, 2, ['classic'], { vol: 1 }),
  I('top', 'blouse', 'Puff-sleeve blouse', 'cream', 1, 4, 2, ['sweet', 'classic'], { vol: 1 }),
  I('top', 'turtle', 'Turtleneck', 'charcoal', 3, 3, 2, ['classic', 'artsy'], { vol: 0 }),
  I('top', 'jumper', 'Cable-knit jumper', 'lilac', 4, 3, 2, ['cosy', 'artsy'], { vol: 2 }),
  I('top', 'graphic', 'Star tee', 'charcoal', 1, 1, 3, ['street', 'artsy'], { vol: 1, logo: 1 }),
  I('top', 'jersey', 'Team jersey', 'cobalt', 1, 1, 3, ['sporty', 'street'], { vol: 2, logo: 1 }),
  I('top', 'sweatshirt', 'Sweatshirt', 'grey', 3, 1, 3, ['cosy', 'sporty'], { vol: 2 }),
  I('top', 'ruffle', 'Ruffle top', 'pink', 1, 3, 2, ['sweet'], { vol: 0 }),

  I('bottom', 'jeans', 'Straight jeans', 'denim', 2, 2, 2, ['classic', 'street'], { vol: 1 }),
  I('bottom', 'wide', 'Wide-leg trousers', 'sand', 2, 4, 2, ['classic', 'artsy'], { vol: 2, drag: 1 }),
  I('bottom', 'leggings', 'Leggings', 'black', 2, 1, 3, ['sporty', 'cosy'], { vol: 0, soft: 1 }),
  I('bottom', 'joggers', 'Joggers', 'grey', 2, 1, 3, ['cosy', 'sporty'], { vol: 2, soft: 1 }),
  I('bottom', 'cargo', 'Cargo trousers', 'olive', 2, 2, 3, ['street', 'sporty'], { vol: 2 }),
  I('bottom', 'shorts', 'Denim shorts', 'denim', 0, 2, 3, ['classic', 'street'], { vol: 1, bare: 1 }),
  I('bottom', 'sportshorts', 'Sports shorts', 'navy', 0, 1, 3, ['sporty'], { vol: 1, bare: 1, soft: 1 }),
  I('bottom', 'aline', 'Button-front skirt', 'burgundy', 1, 4, 1, ['classic', 'sweet'], { vol: 1, bare: 1 }),
  I('bottom', 'pleated', 'Pleated skirt', 'navy', 0, 3, 2, ['classic', 'sweet'], { vol: 1, bare: 1 }),
  I('bottom', 'maxi', 'Tiered maxi skirt', 'teal', 1, 3, 1, ['artsy', 'sweet'], { vol: 2, drag: 1 }),
  I('bottom', 'dungarees', 'Dungarees', 'denim', 2, 2, 3, ['artsy', 'street'], { vol: 2 }),
  I('bottom', 'pinafore', 'Pinafore', 'olive', 1, 3, 2, ['sweet', 'artsy'], { vol: 1, bare: 1 }),

  I('dress', 'teedress', 'T-shirt dress', 'teal', 1, 2, 2, ['classic', 'street'], { bare: 1, soft: 1, pat: 'stripes', pcol: 'white' }),
  I('dress', 'sundress', 'Sundress', 'sky', 0, 3, 2, ['sweet', 'artsy'], { bare: 1, pat: 'flowers', pcol: 'white' }),
  I('dress', 'party', 'Party dress', 'lilac', 1, 5, 1, ['sweet'], { bare: 1 }),
  I('dress', 'jumpsuit', 'Boiler suit', 'cobalt', 3, 3, 2, ['street', 'artsy'], {}),
  I('dress', 'knitdress', 'Knit dress', 'burgundy', 4, 4, 1, ['cosy', 'classic'], { bare: 1, soft: 1 }),
  I('dress', 'mandarin', 'Mandarin-collar dress', 'red', 1, 5, 1, ['classic', 'sweet'], { bare: 1 }),

  I('layer', 'denimj', 'Denim jacket', 'denim', 2, 2, 2, ['classic', 'street'], {}),
  I('layer', 'hoodie', 'Zip hoodie', 'lilac', 3, 1, 3, ['cosy', 'sporty', 'street'], {}),
  I('layer', 'cardigan', 'Cardigan', 'cream', 2, 3, 2, ['sweet', 'cosy', 'classic'], {}),
  I('layer', 'bomber', 'Bomber jacket', 'olive', 3, 2, 3, ['street', 'sporty'], {}),
  I('layer', 'raincoat', 'Raincoat', 'yellow', 2, 2, 2, ['artsy', 'classic'], { rain: 1 }),
  I('layer', 'puffer', 'Puffer jacket', 'coral', 5, 2, 2, ['cosy', 'sporty'], {}),
  I('layer', 'blazer', 'Blazer', 'navy', 2, 5, 1, ['classic'], {}),
  I('layer', 'coat', 'Long wool coat', 'sand', 5, 4, 1, ['classic'], {}),
  I('layer', 'gilet', 'Puffer gilet', 'teal', 3, 2, 3, ['sporty', 'cosy'], {}),

  I('shoes', 'sneakers', 'Canvas sneakers', 'white', 0, 2, 3, ['classic', 'street', 'sporty'], { grip: 1, closed: 1 }),
  I('shoes', 'hightops', 'High-tops', 'red', 1, 2, 3, ['street'], { grip: 1, closed: 1 }),
  I('shoes', 'trainers', 'Running trainers', 'mint', 0, 1, 3, ['sporty'], { grip: 1, closed: 1 }),
  I('shoes', 'flats', 'Ballet flats', 'black', 0, 4, 1, ['sweet', 'classic'], { closed: 1 }),
  I('shoes', 'maryjanes', 'Mary Janes', 'black', 0, 4, 1, ['sweet', 'classic'], { closed: 1 }),
  I('shoes', 'sandals', 'Sandals', 'sand', -1, 3, 1, ['artsy', 'sweet'], {}),
  I('shoes', 'ankle', 'Ankle boots', 'brown', 1, 3, 2, ['classic', 'artsy', 'street'], { grip: 1, closed: 1, splash: 1 }),
  I('shoes', 'rainboots', 'Rain boots', 'yellow', 1, 1, 2, ['artsy'], { closed: 1, rain: 1 }),
  I('shoes', 'snowboots', 'Snow boots', 'sand', 3, 1, 2, ['cosy'], { grip: 1, closed: 1, snow: 1, rain: 1 }),
  I('shoes', 'loafers', 'Loafers', 'brown', 0, 4, 1, ['classic'], { closed: 1 }),
  I('shoes', 'slides', 'Slides', 'pink', -1, 1, 0, ['cosy', 'sporty'], {}),

  I('socks', 'ankle', 'Ankle socks', 'white', 0, 0, 0, [], {}),
  I('socks', 'crew', 'Crew socks', 'white', 0, 0, 0, ['cosy', 'sporty'], {}),
  I('socks', 'knee', 'Knee-high socks', 'white', 1, 0, 0, ['sweet', 'classic'], {}),
  I('socks', 'tights', 'Tights', 'charcoal', 2, 0, 0, ['classic'], {}),

  I('head', 'cap', 'Baseball cap', 'yellow', 0, 0, 0, ['sporty', 'street'], { sun: 1 }),
  I('head', 'beanie', 'Bobble beanie', 'teal', 2, 0, 0, ['cosy', 'street'], {}),
  I('head', 'sunhat', 'Sun hat', 'sand', 0, 0, 0, ['artsy', 'sweet'], { sun: 1 }),
  I('head', 'bucket', 'Bucket hat', 'denim', 0, 0, 0, ['street', 'artsy'], { sun: 1 }),
  I('head', 'headband', 'Headband', 'burgundy', 0, 0, 0, ['sweet', 'classic'], { small: 1 }),
  I('head', 'bow', 'Hair bow', 'hotpink', 0, 0, 0, ['sweet'], { small: 1 }),
  I('head', 'beret', 'Beret', 'burgundy', 1, 0, 0, ['artsy', 'classic'], {}),
  I('head', 'clips', 'Hair clips', 'yellow', 0, 0, 0, ['sweet', 'artsy'], { small: 1 }),
  I('head', 'hijab', 'Hijab', 'cream', 1, 0, 0, [], { small: 1, sun: 1, wild: 1, snug: 1 }),

  I('eyes', 'glasses', 'Round glasses', 'black', 0, 0, 0, ['classic', 'artsy'], {}),
  I('eyes', 'sunnies', 'Sunglasses', 'red', 0, 0, 0, ['street', 'sporty'], { sun: 1, shades: 1 }),
  I('eyes', 'hearts', 'Heart sunglasses', 'hotpink', 0, 0, 0, ['sweet', 'street'], { sun: 1, shades: 1 }),

  I('neck', 'pendant', 'Star pendant', 'yellow', 0, 0, 0, ['sweet', 'classic'], {}),
  I('neck', 'beads', 'Bead necklace', 'orange', 0, 0, 0, ['artsy', 'sweet'], {}),
  I('neck', 'scarf', 'Scarf', 'teal', 2, 0, 0, ['cosy', 'classic'], { fabric: 1, snug: 1 }),
  I('neck', 'bandana', 'Bandana', 'red', 0, 0, 0, ['street', 'artsy'], { fabric: 1, pat: 'dots', pcol: 'white' }),

  I('bag', 'backpack', 'Backpack', 'red', 0, 0, 0, ['sporty', 'classic', 'street'], { free: 1, holds: 1, big: 1 }),
  I('bag', 'crossbody', 'Crossbody bag', 'black', 0, 0, 0, ['street', 'classic'], { free: 1, secure: 1, holds: 1, smart: 1 }),
  I('bag', 'tote', 'Tote bag', 'cream', 0, 0, 0, ['artsy', 'classic'], { holds: 1, big: 1 }),
  I('bag', 'beltbag', 'Belt bag', 'hotpink', 0, 0, 0, ['street', 'sporty'], { free: 1, secure: 1 }),
  I('bag', 'wristlet', 'Wristlet', 'yellow', 0, 0, 0, ['sweet', 'classic'], { smart: 1 }),

  I('extras', 'studs', 'Stud earrings', null, 0, 0, 0, ['classic', 'sweet'], {}),
  I('extras', 'hoops', 'Hoop earrings', null, 0, 0, 0, ['street', 'artsy'], {}),
  I('extras', 'bracelets', 'Friendship bracelets', null, 0, 0, 0, ['artsy', 'sweet'], { jangly: 1 }),
  I('extras', 'watch', 'Watch', null, 0, 0, 0, ['sporty', 'classic'], {}),
  I('extras', 'umbrella', 'Umbrella', null, 0, 0, 0, [], { brolly: 1 }),
  I('extras', 'mittens', 'Mittens', null, 2, 0, 0, ['cosy'], {})
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id + '@' + i.slot, i]));
const it = (slot, id) => id ? ITEM[id + '@' + slot] : null;
const VIBEWORD = { classic: 'classic', sweet: 'sweet', sporty: 'sporty', cosy: 'cosy', street: 'street style', artsy: 'arty' };
const NEUTRAL_CODE = ['white', 'black', 'grey', 'charcoal', 'navy'];

/* ---------- read an outfit into facts the rules can test ---------- */
function outfit(fit) {
  const o = { fit, dress: it('dress', fit.dress) };
  o.top = o.dress ? null : it('top', fit.top); o.bottom = o.dress ? null : it('bottom', fit.bottom);
  ['layer', 'shoes', 'socks', 'head', 'eyes', 'neck', 'bag'].forEach(s => { o[s] = it(s, fit[s]); });
  o.extras = (fit.extras || []).map(id => it('extras', id)).filter(Boolean);
  o.pieces = [o.top, o.bottom, o.dress, o.layer, o.shoes, o.socks, o.head, o.eyes, o.neck, o.bag].concat(o.extras).filter(Boolean);
  o.has = id => o.pieces.some(p => p.id === id);
  o.any = flag => o.pieces.some(p => p[flag]);
  o.colId = slot => o[slot] ? ((fit.col && fit.col[slot]) || o[slot].col) : null;
  o.patOf = slot => o[slot] ? ((fit.pat && fit.pat[slot]) || o[slot].pat || 'solid') : 'solid';
  o.pcolId = slot => { if (!o[slot]) return null; const base = SWX[o.colId(slot)]; return (fit.pcol && fit.pcol[slot]) || o[slot].pcol || (['white', 'cream', 'yellow', 'mint', 'sky', 'lilac', 'pink', 'sand', 'grey'].includes(base.id) ? 'navy' : 'white'); };
  o.warmth = o.pieces.reduce((a, p) => a + p.w, 0);
  let fs = 0, fw = 0; const add = (p, w) => { if (p) { fs += p.f * w; fw += w; } };
  add(o.dress, 2); add(o.top, 1); add(o.bottom, 1); add(o.layer, 1); add(o.shoes, 1);
  o.dressy = fs / fw;
  o.move = Math.min.apply(null, [o.dress, o.top, o.bottom, o.layer].filter(Boolean).map(p => p.m).concat([o.shoes ? o.shoes.m : 0]));
  const legsOut = !!((o.bottom && o.bottom.bare) || (o.dress && o.dress.bare));
  o.bareLegs = legsOut && !(o.socks && o.socks.id === 'tights');
  o.socksShow = !!o.socks && legsOut;
  const slots = ['dress', 'top', 'bottom', 'layer', 'shoes', 'head', 'bag'].filter(s => o[s]);
  if (o.neck && o.neck.fabric) slots.push('neck');
  if (o.socksShow) slots.push('socks');
  o.colors = []; o.patterns = [];
  slots.forEach(s => {
    o.colors.push({ slot: s, id: o.colId(s) });
    const p = o.patOf(s);
    if (p !== 'solid') { o.patterns.push({ slot: s, kind: p, base: o.colId(s), pc: o.pcolId(s) }); o.colors.push({ slot: s, id: o.pcolId(s) }); }
  });
  o.hasColor = id => o.colors.some(c => c.id === id);
  o.colorsOn = list => o.colors.filter(c => list.includes(c.slot)).map(c => c.id);
  o.face = o.dress ? 'dress' : 'top';
  return o;
}

/* ---------- occasions ---------- */
const OCCASIONS = [
  { id: 'school', day: 'Mon', title: 'First day at a new school', where: 'School gates, 8:00', sky: 'cloud', wx: '22°C, mild', warm: [3, 6], dress: [2, 3.4], dressWord: 'neat but relaxed', move: 2, vibes: ['classic', 'sweet'],
    texts: ['New school tomorrow and there is NO uniform. I want to look friendly, not like I tried too hard.', 'We walk loads between buildings and I have about a million books.'],
    musts: [{ t: 'A backpack for her books', ok: o => o.has('backpack'), her: 'Where do my books go though??' },
      { t: 'Shoes she can walk in all day', ok: o => !!o.shoes && o.shoes.m >= 2, her: 'My feet will be wrecked by lunch.' }], checks: [] },
  { id: 'sports', day: 'Tue', title: 'Sports day', where: 'School field, 13:00', sky: 'sun', wx: '31°C, blazing sun', warm: [0, 3], dress: [1, 2.2], dressWord: 'sporty', move: 3, vibes: ['sporty'],
    texts: ['Sports day!! I am in Yellow House and I am running the relay.', 'It is going to be BOILING. Please do not let me melt.'],
    musts: [{ t: 'Trainers or sneakers for the relay', ok: o => !!o.shoes && o.shoes.m >= 3, her: 'I cannot sprint in these!' },
      { t: 'Something yellow for Yellow House', ok: o => o.hasColor('yellow'), her: 'Everyone will think I am in the wrong house. I need yellow!' }],
    checks: [{ t: 'A cap or hat for the sun', ok: o => !!o.head && !!o.head.sun, her: 'I am going to fry out there with nothing on my head.' }] },
  { id: 'museum', day: 'Wed', title: 'Rainy museum trip', where: 'City art museum, 10:00', sky: 'rain', wx: '15°C, heavy rain', warm: [5, 9], dress: [1.7, 3.6], dressWord: 'smart-casual', move: 2, vibes: ['artsy', 'classic'],
    texts: ['Class trip to the art museum and it is POURING. We queue outside for ages.', 'I want to look a bit arty. Also I need somewhere to put my sketchbook.'],
    musts: [{ t: 'A bag that fits a sketchbook', ok: o => !!o.bag && !!o.bag.holds, her: 'I would have to carry my sketchbook around all day.' }],
    checks: [{ t: 'A raincoat or an umbrella', ok: o => o.has('raincoat') || o.has('umbrella'), her: 'I will be soaked before we even get inside.' },
      { t: 'Shoes that keep puddles out', ok: o => !!o.shoes && !!(o.shoes.rain || o.shoes.splash), her: 'Wet socks ALL day. Nooo.' }] },
  { id: 'skate', day: 'Thu', title: 'Roller disco birthday', where: 'Roller rink, 17:00', sky: 'indoor', wx: 'Indoors, 23°C', warm: [2, 6], dress: [1.8, 3.6], dressWord: 'party-casual', move: 2, vibes: ['sweet', 'street'],
    texts: ['Zoe is having a ROLLER DISCO for her birthday. Rental skates, so I need socks.', 'I will fall over a lot, so nothing long that could catch in the wheels. But it is a party. Make it fun!'],
    musts: [{ t: 'Socks for the rental skates', ok: o => !!o.socks, her: 'Rental skates with bare feet?? Ew.' },
      { t: 'Nothing long near the wheels', ok: o => !o.any('drag'), her: 'This is 100% getting tangled in my wheels.' },
      { t: 'At least one fun pattern', ok: o => o.patterns.length >= 1, her: 'It is a bit plain for a disco.' }], checks: [] },
  { id: 'concert', day: 'Fri', title: 'School concert', where: 'School hall, 18:30', sky: 'indoor', wx: 'Indoors, 21°C', warm: [3, 7], dress: [3.6, 5], dressWord: 'smart', move: 0, vibes: ['classic'], neutralOK: true,
    texts: ['I am playing violin in the concert on Friday. Dress code: black, white, grey or navy ONLY.', 'Mrs Lam says no noisy bracelets. I want to look grown-up up there.'],
    musts: [{ t: 'Only black, white, grey or navy', ok: o => o.colorsOn(['dress', 'top', 'bottom', 'layer', 'shoes', 'socks', 'head', 'neck']).every(c => NEUTRAL_CODE.includes(c)), her: 'Mrs Lam will send me home to change. Black, white, grey or navy only!' },
      { t: 'Smart shoes with closed toes', ok: o => !!o.shoes && !!o.shoes.closed && o.shoes.f >= 3, her: 'These shoes are not smart enough for the stage.' },
      { t: 'No jangly bracelets', ok: o => !o.any('jangly'), her: 'The bracelets will rattle every time I move my bow.' }], checks: [] },
  { id: 'hike', day: 'Sat', title: 'Hill hike and picnic', where: 'Country park, 9:30', sky: 'sun', wx: '24°C, sunny, windy on top', warm: [3, 6], dress: [1, 2.6], dressWord: 'outdoorsy', move: 2, vibes: ['sporty', 'cosy'],
    texts: ['Hiking with my cousins, then a picnic at the top. Sunny, but SO windy up there.', 'Last time I wore sandals and regretted everything.'],
    musts: [{ t: 'Shoes with grip for the trail', ok: o => !!o.shoes && !!o.shoes.grip, her: 'I will slide straight back down the hill in these.' },
      { t: 'A hands-free bag for snacks', ok: o => !!o.bag && !!o.bag.free, her: 'I need both hands for the scrambly bits.' },
      { t: 'A light layer for the windy top', ok: o => !!o.layer && o.layer.w <= 3, her: 'I need something light to pull on at the top. Not nothing, and not a winter coat.' }],
    checks: [{ t: 'A hat or sunglasses', ok: o => o.any('sun'), her: 'The sun will be in my eyes the whole way up.' }] },
  { id: 'grandma', day: 'Sun', title: 'Grandma’s 70th birthday lunch', where: 'Restaurant, 12:30', sky: 'indoor', wx: 'Indoors, chilly air-con', warm: [3, 7], dress: [3.2, 5], dressWord: 'smart and pretty', move: 0, vibes: ['sweet', 'classic'],
    texts: ['It is Grandma’s 70th! Big family lunch at a fancy restaurant.', 'She LOVES anything with flowers on it. And the air-con in there is freezing.'],
    musts: [{ t: 'Flowers somewhere, for Grandma', ok: o => o.patterns.some(p => p.kind === 'flowers'), her: 'Grandma will ask where the flowers are. She always does.' },
      { t: 'A cardigan or jacket for the air-con', ok: o => !!o.layer, her: 'I will shiver through the whole lunch.' }], checks: [] },
  { id: 'photo', day: 'Mon', title: 'Class photo day', where: 'School gym, 11:00', sky: 'indoor', wx: 'Indoors, 22°C', warm: [2, 6], dress: [2.6, 4.2], dressWord: 'neat', move: 0, vibes: ['classic', 'sweet'],
    texts: ['Class photo today. It goes in the yearbook FOREVER.', 'The photographer said no hats, and patterns go fuzzy on camera. I want a colour that makes me look awake.'],
    musts: [{ t: 'A plain top: no pattern, no logo', ok: o => o.patOf(o.face) === 'solid' && !o[o.face].logo, her: 'The photographer said patterns and logos go weird on camera.' },
      { t: 'No hat or sunglasses', ok: o => (!o.head || !!o.head.small) && !(o.eyes && o.eyes.shades), her: 'They will just make me take it off.' },
      { t: 'A real colour near her face', ok: o => !SWX[o.colId(o.face)].neu || (!!o.layer && !SWX[o.colId('layer')].neu), her: 'I will look washed out. I need a real colour near my face.' }], checks: [] },
  { id: 'market', day: 'Fri', title: 'Night market with friends', where: 'Night market, 19:00', sky: 'moon', wx: '27°C, warm evening', warm: [1, 4], dress: [1.5, 3.2], dressWord: 'casual', move: 2, vibes: ['street', 'artsy'],
    texts: ['Night market with the girls! It is hot, it is crowded, and I want bubble tea in one hand and snacks in the other.', 'So: hands free, money somewhere safe. Street style, please.'],
    musts: [{ t: 'A zip-up bag worn on her body', ok: o => !!o.bag && !!o.bag.secure, her: 'My purse is not safe in that crowd.' },
      { t: 'Closed-toe shoes for the crowd', ok: o => !!o.shoes && !!o.shoes.closed, her: 'Someone WILL stand on my toes.' }], checks: [] },
  { id: 'sleepover', day: 'Sat', title: 'Movie-night sleepover', where: 'Priya’s house, 18:00', sky: 'moon', wx: 'Indoors, 22°C', warm: [3, 8], dress: [1, 2.2], dressWord: 'as comfy as possible', move: 0, vibes: ['cosy'], shoesOff: true, comfy: true,
    texts: ['Sleepover at Priya’s! Movie marathon, popcorn, zero plans to go outside.', 'Comfy is the ONLY rule. Her mum says shoes off at the door.'],
    musts: [{ t: 'Soft, stretchy bottoms', ok: o => !!((o.bottom && o.bottom.soft) || (o.dress && o.dress.soft)), her: 'I cannot curl up on the sofa in these.' },
      { t: 'Cosy socks', ok: o => !!o.socks && o.socks.id !== 'tights', her: 'My feet will be cold on her floor.' },
      { t: 'No outdoor shoes (slides are fine)', ok: o => !o.shoes || o.shoes.id === 'slides', her: 'Shoes off at the door, remember?' }], checks: [] },
  { id: 'snow', day: 'Sun', title: 'Snow day', where: 'The park, 10:00', sky: 'snow', wx: '−3°C, snowing', warm: [11, 21], dress: [1, 3.2], dressWord: 'practical', move: 2, vibes: ['cosy', 'sporty'],
    texts: ['IT SNOWED. School is closed. Snowball fight in the park at ten.', 'I want to stay out for hours and still feel all ten fingers.'],
    musts: [{ t: 'Mittens for snowballs', ok: o => o.has('mittens'), her: 'How do I make snowballs without mittens?' },
      { t: 'Legs covered', ok: o => !o.bareLegs, her: 'Bare legs in the snow?!' }],
    checks: [{ t: 'A properly warm coat', ok: o => !!o.layer && o.layer.w >= 5, her: 'This is nowhere near warm enough for snow.' },
      { t: 'Boots that keep snow out', ok: o => !!o.shoes && !!(o.shoes.snow || o.shoes.rain), her: 'Snow is going to get straight into these.' },
      { t: 'A warm hat or a scarf', ok: o => o.has('beanie') || o.any('snug'), her: 'My ears!!' }] },
  { id: 'wedding', day: 'Sat', title: 'Cousin’s wedding party', where: 'Garden party, 15:00', sky: 'sun', wx: '25°C, sunny', warm: [1, 5], dress: [4.2, 5], dressWord: 'properly dressed up', move: 1, vibes: ['sweet', 'classic'],
    texts: ['My cousin Mei is getting MARRIED and I am invited to the garden party!', 'Mum’s rules: properly dressed up, and no white, because that is for the bride. And I want to dance.'],
    musts: [{ t: 'No white or cream clothes', ok: o => !o.colorsOn(['dress', 'top', 'bottom', 'layer']).some(c => c === 'white' || c === 'cream'), her: 'Mum will make me change. No white at a wedding!' },
      { t: 'Smart shoes she can dance in', ok: o => !!o.shoes && o.shoes.f >= 3, her: 'I cannot dance at a wedding in these.' },
      { t: 'A small smart bag', ok: o => !!o.bag && !!o.bag.smart, her: 'I need a little bag for my phone. A small one!' }], checks: [] },
  { id: 'free', day: 'Any', title: 'Free style', where: 'No rules', sky: 'star', wx: 'Any weather', free: true, vibes: [],
    texts: ['No plans today. Dress me however you like!', 'Save the ones you love to the lookbook.'], musts: [], checks: [] }
];
const OCC = Object.fromEntries(OCCASIONS.map(o => [o.id, o]));

const TIPS = {
  many: ['The three-colour rule', 'Pick one main colour, one helper colour and one small accent. White, black, grey, navy, denim and tan are neutrals, so they do not count.'],
  echo: ['Echo a colour', 'Repeat one colour in two places, like shoes that match the top or a bag that matches the skirt. The outfit instantly looks planned.'],
  pop: ['Add one pop', 'An all-neutral outfit is a blank page. One bright piece, even just a bag or a hat, gives the eye somewhere to land.'],
  pattern: ['One star pattern', 'Let one pattern be the star and keep everything else plain. If you mix two, make sure they share a colour.'],
  cold: ['Layers beat one thick thing', 'A tee, a cardigan and a jacket trap more warmth than one big jumper, and she can peel them off if the sun comes out.'],
  hot: ['Dress for the hottest hour', 'Short sleeves, bare ankles and no extra layers keep her cool. A hat does more than you would think.'],
  dressy: ['Shoes set the level', 'Shoes change how dressy an outfit feels faster than anything else. Trainers pull it down, flats and loafers pull it up.'],
  move: ['The sit, stretch, run test', 'If she cannot sit cross-legged, reach up and jog in it, it is wrong for an active day. Shoes are usually the weak link.'],
  vibe: ['Pick a lead piece', 'Choose the one piece that shouts the vibe she asked for, then make sure most of the outfit agrees with it.'],
  shape: ['Balance the shapes', 'Baggy on top goes with slim below, and the other way round. Baggy with baggy only works on sofa days.'],
  third: ['The third piece', 'Top plus bottom is two pieces. A third, like a jacket, a hat or a scarf, is what turns clothes into an outfit.'],
  less: ['Take one thing off', 'Stylists check the mirror before leaving and remove one accessory. Fewer pieces let the best one show.'],
  brief: ['Read the brief twice', 'Most outfits fail on one small thing she actually said. Tick off her must-haves first, then make it pretty.'],
  perfect: ['Now do it again', 'Every part of the brief is covered. Can you earn five stars for the same occasion with a completely different outfit?']
};

/* ---------- the judge ---------- */
const famList = o => { const f = {}; o.colors.forEach(c => { const k = FAM[c.id]; if (k) (f[k] = f[k] || new Set()).add(c.slot); }); return f; };
const joinAnd = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const lower = s => /^(Mary|Breton|T-shirt)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

function judge(fit, occ) {
  const o = outfit(fit), cats = [];
  let tip = null; const setTip = k => { if (!tip) tip = k; };
  let gripe = null; const setGripe = (s, pri) => { if (!gripe || pri > gripe.pri) gripe = { s, pri }; };

  /* 1. the occasion */
  { const notes = []; let s = 0;
    const [lo, hi] = occ.dress, d = o.dressy < lo ? lo - o.dressy : o.dressy > hi ? o.dressy - hi : 0;
    const ds = Math.max(0, Math.round(8 - 5 * d)); s += ds;
    if (d === 0) notes.push({ ok: true, t: `Dressed just right for “${occ.dressWord}”.` });
    else if (o.dressy < lo) { notes.push({ ok: false, t: `A little too casual. The plan calls for “${occ.dressWord}”.` }); setTip('dressy'); setGripe('I think I need to look a bit smarter than this.', d > 0.6 ? 3 : 1); }
    else { notes.push({ ok: false, t: `Too dressed up. The plan calls for “${occ.dressWord}”.` }); setTip('dressy'); setGripe('It is too fancy. I would feel silly.', d > 0.6 ? 3 : 1); }
    const short = Math.max(0, occ.move - o.move), ms = Math.max(0, 4 - 2 * short); s += ms;
    if (occ.move > 0) {
      if (!short) notes.push({ ok: true, t: 'She can move as much as the day needs.' });
      else { const weak = [o.shoes, o.dress, o.bottom, o.layer, o.top].filter(Boolean).filter(p => p.m < occ.move).map(p => lower(p.name)); notes.push({ ok: false, t: `Hard to move in: the ${joinAnd(weak.slice(0, 2))}.` }); setTip('move'); setGripe('I can barely move in this.', 2); }
    }
    const per = occ.musts.length ? 8 / occ.musts.length : 0; let mustPts = occ.musts.length ? 0 : 8;
    occ.musts.forEach(m => { const ok = !!m.ok(o); if (ok) mustPts += per; else { setTip('brief'); setGripe(m.her, 5); } notes.push({ ok, t: m.t, must: true }); });
    s += Math.round(mustPts);
    cats.push({ id: 'occasion', label: 'Fits the occasion', score: Math.min(20, s), notes }); }

  /* 2. weather and comfort */
  { const notes = []; const [lo, hi] = occ.warm, w = o.warmth, d = w < lo ? lo - w : w > hi ? w - hi : 0;
    let s = Math.max(0, 14 - 4 * d);
    if (!d) notes.push({ ok: true, t: `Warmth is just right for the day (${occ.wx}).` });
    else if (w < lo) { notes.push({ ok: false, t: `She would be cold. Add ${d > 2 ? 'a lot more' : 'a bit more'} warmth: a layer, longer sleeves or tights.` }); setTip('cold'); setGripe('I would be freezing in this.', d > 1 ? 4 : 2); }
    else { notes.push({ ok: false, t: `She would overheat. Swap ${d > 2 ? 'the heavy pieces' : 'one warm piece'} for something lighter.` }); setTip('hot'); setGripe('I am going to overheat in this.', d > 1 ? 4 : 2); }
    const per = occ.checks.length ? 6 / occ.checks.length : 0; let pts = occ.checks.length ? 0 : 6;
    occ.checks.forEach(m => { const ok = !!m.ok(o); if (ok) pts += per; else { setTip('brief'); setGripe(m.her, 5); } notes.push({ ok, t: m.t, must: true }); });
    s += Math.round(pts);
    cats.push({ id: 'weather', label: 'Right for the weather', score: Math.min(20, s), notes }); }

  /* 3. her vibe */
  { const notes = []; const parts = [];
    if (o.dress) parts.push([o.dress, 2]); if (o.top) parts.push([o.top, 1]); if (o.bottom) parts.push([o.bottom, 1]);
    if (o.shoes) parts.push([o.shoes, 1]); if (o.layer) parts.push([o.layer, 1]);
    [o.head, o.eyes, o.neck, o.bag].forEach(p => { if (p) parts.push([p, 0.5]); });
    const hit = p => p.wild || p.v.some(v => occ.vibes.includes(v));
    let tot = 0, got = 0; const yes = [], no = [];
    parts.forEach(([p, w]) => { tot += w; if (hit(p)) { got += w; if (w >= 1) yes.push(p); } else if (w >= 1) no.push(p); });
    const ratio = tot ? got / tot : 0; let s = Math.round(20 * Math.min(1, ratio / 0.7));
    const want = occ.vibes.map(v => VIBEWORD[v]).join(' or ');
    if (yes.length) notes.push({ ok: true, t: `The ${joinAnd(yes.slice(0, 3).map(p => lower(p.name)))} ${yes.length > 1 ? 'say' : 'says'} “${want}”.` });
    if (no.length) { notes.push({ ok: false, t: `The ${joinAnd(no.slice(0, 2).map(p => lower(p.name)))} ${no.length > 1 ? 'feel' : 'feels'} more ${VIBEWORD[no[0].v[0]]} than ${want}.` }); if (ratio < 0.7) { setTip('vibe'); setGripe('It is nice. It is just not really the vibe I asked for.', ratio < 0.4 ? 3 : 1); } }
    if (o.hasColor(FAVE)) { notes.push({ ok: true, t: 'You remembered teal is her favourite colour.' }); s = Math.min(20, s + 2); }
    cats.push({ id: 'vibe', label: 'Her vibe', score: s, notes }); }

  /* 4. colour */
  { const notes = []; const fam = famList(o), list = Object.keys(fam), k = list.length; let s;
    const echo = list.find(f => fam[f].size >= 2);
    if (k === 0) {
      if (occ.neutralOK) { s = 20; notes.push({ ok: true, t: 'All neutrals, exactly as the dress code asks.' }); }
      else if (o.patterns.length) { s = 18; notes.push({ ok: true, t: 'All neutrals, with a pattern to keep it interesting.' }); }
      else { s = 15; notes.push({ ok: null, t: 'All neutrals: calm and grown-up. One pop of colour would wake it up.' }); setTip('pop'); }
    } else if (k === 1) { s = 18; notes.push({ ok: true, t: `One colour family (${list[0]}) with neutrals. Clean and easy on the eye.` }); }
    else if (k === 2) { let d = Math.abs(FAMDEG[list[0]] - FAMDEG[list[1]]); d = Math.min(d, 360 - d);
      if (d <= 65) { s = 17; notes.push({ ok: true, t: `${list[0]} and ${list[1]} are neighbours on the colour wheel, so they blend.`.replace(/^./, c => c.toUpperCase()) }); }
      else if (d >= 150) { s = 17; notes.push({ ok: true, t: `${list[0]} and ${list[1]} are opposites on the colour wheel. Bold, and it works.`.replace(/^./, c => c.toUpperCase()) }); }
      else { s = 15; notes.push({ ok: null, t: `${list[0]} with ${list[1]} is a brave pairing. A neutral between them would calm it down.`.replace(/^./, c => c.toUpperCase()) }); } }
    else if (k === 3) { s = 13; notes.push({ ok: null, t: `Three colour families (${joinAnd(list)}). That is the limit before it gets noisy.` }); setTip('many'); }
    else { s = k === 4 ? 8 : 4; notes.push({ ok: false, t: `${k} colour families are fighting for attention. Keep two and swap the rest for neutrals.` }); setTip('many'); setGripe('There are a LOT of colours going on.', 3); }
    if (k >= 1 && k <= 3) { if (echo) { s += 2; notes.push({ ok: true, t: `The ${echo} shows up in two places, which makes it look planned.` }); } else if (s < 20) setTip('echo'); }
    if (o.patterns.length >= 3) { s -= 5; notes.push({ ok: false, t: 'Three patterns at once is a lot. Let one be the star.' }); setTip('pattern'); setGripe('So many patterns. My eyes!', 3); }
    else if (o.patterns.length === 2) { const a = o.patterns[0], b = o.patterns[1], share = [a.base, a.pc].some(c => c === b.base || c === b.pc);
      if (share) notes.push({ ok: true, t: 'Two patterns that share a colour. Nicely mixed.' }); else { s -= 2; notes.push({ ok: null, t: 'Two patterns with no colour in common. Match one colour between them.' }); setTip('pattern'); } }
    cats.push({ id: 'colour', label: 'Colour harmony', score: Math.max(0, Math.min(20, s)), notes }); }

  /* 5. styling */
  { const notes = []; let s = 8;
    const n = [o.head, o.eyes, o.neck, o.bag].filter(Boolean).length + o.extras.length;
    if (n === 0) { notes.push({ ok: null, t: 'No accessories. One or two would finish it.' }); setTip('third'); }
    else if (n >= 5) { s += 1; notes.push({ ok: false, t: `${n} accessories is a crowd. Take one or two off.` }); setTip('less'); setGripe('It is a lot of stuff. Can we take one thing off?', 2); }
    else { s += n === 1 ? 3 : 5; notes.push({ ok: true, t: n === 1 ? 'One accessory. A second would round it off.' : 'A good number of accessories.' }); }
    if (o.dress || occ.comfy) { s += 3; if (occ.comfy && !o.dress) notes.push({ ok: true, t: 'Baggy and soft is the whole point tonight.' }); }
    else { const a = o.top.vol, b = o.bottom.vol;
      if (a === 2 && b === 2) { notes.push({ ok: false, t: 'Baggy on top and baggy below hides her shape. Slim one of them down.' }); setTip('shape'); }
      else if (a === 0 && b === 0) { s += 2; notes.push({ ok: null, t: 'Fitted top and fitted bottom. Something looser would add shape.' }); }
      else { s += 3; notes.push({ ok: true, t: 'The shapes are balanced: one looser piece, one neater piece.' }); } }
    if (o.layer || o.head || (o.neck && o.neck.fabric)) { s += 3; notes.push({ ok: true, t: 'A third piece on top of the basics makes it an outfit.' }); } else setTip('third');
    if (o.shoes || occ.shoesOff) s += 1; else { s -= 6; notes.push({ ok: false, t: 'She has no shoes on!' }); setGripe('Um. Shoes??', 6); }
    cats.push({ id: 'style', label: 'Styling', score: Math.max(0, Math.min(20, s)), notes }); }

  const total = cats.reduce((a, c) => a + c.score, 0);
  const checks = occ.musts.concat(occ.checks).map(m => ({ t: m.t, ok: !!m.ok(o) }));
  const missed = checks.filter(c => !c.ok).length;
  const raw = total >= 90 ? 5 : total >= 78 ? 4 : total >= 64 ? 3 : total >= 48 ? 2 : 1;
  const cap = missed >= 4 ? 1 : missed >= 2 ? 2 : missed === 1 ? 3 : 5;   // missed must-haves limit the stars
  const stars = Math.min(raw, cap);
  const mood = stars === 5 ? 'grin' : stars >= 3 ? 'smile' : stars === 2 ? 'meh' : 'worried';
  const open = ['Are you pranking me??', 'Hmm. I do not think this is the one.', missed ? 'I like it, but you forgot something.' : 'It is nice… but something is a bit off.', 'Ooh, I really like this!', 'OKAY. I am never getting dressed without you again.'][stars - 1];
  const bubbles = [open];
  if (gripe && (stars < 5 || total < 97)) bubbles.push(gripe.s);
  else { const star = o.dress || o.layer || o.top; bubbles.push(`The ${lower(star.name)} is my favourite bit.`); }
  if (!tip) tip = 'perfect';
  return { total, stars, capped: raw > cap, cap, missed, mood, cats, bubbles, tip: TIPS[tip], checks, o };
}

if (typeof module !== 'undefined') module.exports = { SW, SWX, ITEMS, ITEM, it, OCCASIONS, OCC, outfit, judge, SKINS, HAIRS, HAIRCOLS, EYECOLS, PATTERNS, TIPS, VIBEWORD };
