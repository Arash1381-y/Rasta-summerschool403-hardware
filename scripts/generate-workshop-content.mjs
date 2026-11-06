import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(repoRoot, 'content', 'source');
const outputFile = path.join(repoRoot, 'src', 'data', 'workshopContent.js');

const gameInstructions = {
  '/games/text-number.html': 'یک متن فارسی وارد کنید و آن را به عدد تبدیل کنید. سپس جهت تبدیل را عوض کنید و یک عدد را دوباره به متن برگردانید.',
  '/games/color-pick.html': 'مقدار سه رنگ قرمز، سبز و آبی را تغییر دهید و اثر هر عدد را روی رنگ نهایی ببینید.',
  '/games/pixel-number.html': 'برای هر خانهٔ تصویر یک رنگ انتخاب کنید و تصویر ۳ در ۳ را به مجموعه‌ای از اعداد تبدیل کنید.',
  '/games/fingers-count-0.html': 'با باز و بسته کردن انگشت‌ها، عددهای مختلف را با دست‌ها نمایش دهید.',
  '/games/fingers-count-1.html': 'دو جفت دست را تغییر دهید و بررسی کنید رقم دهگان و یکان چگونه کنار هم یک عدد می‌سازند.',
  '/games/fingers-count-2.html': 'دو انگشت فعال را تغییر دهید و همهٔ حالت‌های ممکن صفر و یک را بسازید.',
  '/games/fingers-count-3.html': 'چهار بیت را با انگشت‌ها تغییر دهید و مقدار دودویی و دهدهی هر حالت را مقایسه کنید.',
  '/games/sentence-0.html': 'کلمه‌ها را جابه‌جا کنید تا دستور گذاشتن فیل در یخچال به ترتیب درست ساخته شود.',
  '/games/sentence-1.html': 'کلمه‌ها را طوری مرتب کنید که در هر دو حالتِ خالی یا پُر بودن یخچال، زرافه داخل آن قرار بگیرد.',
  '/games/sentence-2.html': 'با استفاده از «یا» و «!» جملهٔ شرطی خواسته‌شده را بسازید.',
  '/games/switch.html': 'روی مربع ورودی و لوزی سوییچ کلیک کنید و تغییر خروجی را مشاهده کنید.',
  '/games/not.html': 'ورودی و سوییچ مدار را تغییر دهید و مقدار درست خروجی گیت NOT را در جدول وارد کنید.',
  '/games/and.html': 'دو ورودی مدار را تغییر دهید و جدول درستی گیت AND را کامل کنید.',
  '/games/or.html': 'دو ورودی مدار را تغییر دهید و جدول درستی گیت OR را کامل کنید.',
  '/games/transistor.html': 'ورودی داده و ورودی کنترل را تغییر دهید و ببینید ترانزیستور چه زمانی مسیر خروجی را باز می‌کند.',
  '/games/half-adder.html': 'همهٔ حالت‌های دو ورودی را امتحان کنید و خروجی‌های Sum و Carry را در جدول کامل کنید.',
  '/games/LogicGatesTraine/sum.html': 'برای خروجی Sum گیت مناسب را انتخاب کنید و پاسخ خود را با جدول درستی بررسی کنید.',
  '/games/LogicGatesTraine/carry.html': 'برای خروجی Carry گیت مناسب را انتخاب کنید و پاسخ خود را با جدول درستی بررسی کنید.',
  '/games/full-adder.html': 'سه ورودی A و B و Carry-in را تغییر دهید و جدول درستی جمع‌کنندهٔ کامل را تکمیل کنید.',
  'https://jp.pellet.name/hep/logiga/': 'مدار خواسته‌شده در متن را در شبیه‌ساز رسم و آزمایش کنید.',
  '/games/or-mem.html': 'ورودی مدار OR را ابتدا ۱ و سپس ۰ کنید و ببینید چگونه مقدار ۱ در حلقهٔ بازخورد باقی می‌ماند.',
  '/games/and-mem.html': 'ورودی مدار AND را تغییر دهید و بررسی کنید حلقهٔ بازخورد چگونه مقدار ۰ را نگه می‌دارد.',
  '/games/sr-latch-no-not.html': 'ورودی‌های Set و Reset را جداگانه تغییر دهید و اثر هرکدام را روی مقدار ذخیره‌شده ببینید.',
  '/games/sr-latch.html': 'حالت‌های مجاز ورودی‌های Set و Reset را آزمایش کنید و از فعال‌کردن هم‌زمان آن‌ها پرهیز کنید.',
  '/games/d-latch.html': 'ورودی داده و فعال‌ساز را تغییر دهید و ببینید خروجی در چه زمانی تغییر می‌کند یا ثابت می‌ماند.',
  '/games/clk-sig-labeled.html': 'برچسب‌های سیگنال را بررسی کنید و یک دورهٔ کامل، سطح بالا و سطح پایین را پیدا کنید.',
  '/games/clk-sig.html': 'با دکمه‌های تندتر و کندتر، دورهٔ تناوب سیگنال کلاک را تغییر دهید.',
  '/games/clk-sig-event.html': 'نقاط مشخص‌شده روی موج را مقایسه کنید و ببینید یک رویداد در چه زمان‌هایی می‌تواند رخ دهد.',
  '/games/clk-sig-rise-fall.html': 'لبه‌های بالارونده و پایین‌رونده را روی موج پیدا کنید و تغییر سرعت کلاک را نیز امتحان کنید.',
  '/games/clk-sig-level-edge-labeled.html': 'تفاوت سطح بالا و پایین با لبه‌های بالارونده و پایین‌رونده را روی نمودار بررسی کنید.',
  '/games/enable-latch/index.html': 'ورودی داده و فعال‌ساز را تغییر دهید و بررسی کنید خروجی در چه زمانی تغییر می‌کند یا ثابت می‌ماند.',
  '/games/clock-latch/index.html': 'ورودی داده را در سطح‌های مختلف کلاک تغییر دهید و اثر آن را روی خروجی ببینید.',
  '/games/active-low-latch/index.html': 'ورودی داده را تغییر دهید و بررسی کنید این لچ در کدام سطح کلاک فعال است.',
  '/games/FlipFlop/index.html': 'ورودی داده را تغییر دهید و ببینید فلیپ‌فلاپ فقط در لبهٔ بالاروندهٔ کلاک مقدار جدید را ذخیره می‌کند.',
};

const volumes = [
  {
    number: '۱',
    slug: 'volume-1',
    title: 'زیر پوست کامپیوتر-جلد اول',
    file: 'زیر پوست کامپیوتر-جلد اول _ کاموا.html',
    callouts: [
      'این ماشین هر حرف الفبا را به یک عدد دو رقمی تبدیل می‌کند. برای نمونه، عدد ۱۲ معادل حرف «ر» و عدد ۰۲ معادل حرف «ب» است. با کنار هم گذاشتن عددهای مربوط به حروف، هر واژه به یک عدد تبدیل می‌شود.',
      'هر جفت دست یک رقم را نشان می‌دهد. جفت دست اول رقم یکان و جفت دست دوم رقم دهگان را می‌سازد؛ بنابراین می‌توان عددهایی بزرگ‌تر از ۹ را نمایش داد.',
      'هر انگشت دو حالت دارد؛ پس دو انگشت در مجموع ۴ حالت می‌سازند. در نتیجه می‌توان عددهای ۰ تا ۳ را با دو بیت نمایش داد.',
    ],
    games: [
      {after: 'ماشین اول دقیقا همین کار را برای شما انجام می‌دهد', title: 'مبدل متن و عدد', src: '/games/text-number.html', height: 330},
      {after: 'میزان استفاده از هر رنگ با یک عدد بین ۰ تا ۲۵۵ مشخص می‌شود', title: 'انتخاب رنگ RGB', src: '/games/color-pick.html', height: 420},
      {after: 'رنگ‌های مورد استفاده در هر پیکسل را به یک عدد متناظر کنیم', title: 'تبدیل تصویر ۳ در ۳ به اعداد', src: '/games/pixel-number.html', height: 520},
      {after: 'ممکن است روشی که شما انتخاب می‌کنید مشابه این بازی باشد', title: 'نمایش عدد با انگشت‌ها', src: '/games/fingers-count-0.html', height: 500},
      {after: 'نگاهی به این بازی بیندازید', title: 'نمایش دهگان و یکان با دست‌ها', src: '/games/fingers-count-1.html', height: 520},
      {after: 'از ترکیبیات استفاده کنید و تعداد حالات ممکن دست‌ها را بدست آورید', title: 'دو انگشت و دو بیت', src: '/games/fingers-count-2.html', height: 500},
      {after: 'سعی کنید تمام اعداد این بازه را با انگشتان این دست بسازید', title: 'چهار انگشت و چهار بیت', src: '/games/fingers-count-3.html', height: 520},
    ],
  },
  {
    number: '۲',
    slug: 'volume-2',
    title: 'زیر پوست کامپیوتر-جلد دوم',
    file: 'زیر پوست کامپیوتر-جلد دوم _ کاموا.html',
    callouts: [
      'باید هر دو حالت را در نظر بگیریم: اگر یخچال خالی بود، در را باز می‌کنیم، زرافه را داخل آن می‌گذاریم و در را می‌بندیم. اگر فیل داخل یخچال بود، ابتدا فیل را بیرون می‌آوریم و سپس همین مراحل را برای زرافه انجام می‌دهیم.',
    ],
    images: [
      {before: 'البته، ما صرفا محدود به سه دروازه منطقی نیستیم', src: '/images/NOT_2.png', alt: 'نماد و جدول درستی گیت‌های NOT، AND و OR'},
      {after: 'مدار مورد نظر را بسازیم:', src: '/images/Screenshot_from_2025-09-15_15-17-58.png', alt: 'مدار ساخته‌شده از گیت AND و گیت NOT'},
    ],
    games: [
      {after: '«بستن» به صورت «!باز کردن» نوشته می‌شود', title: 'جمله‌سازی ۱', src: '/games/sentence-0.html', height: 650},
      {after: 'چه یخچال خالی بوده باشد یا پر از فیل، چگونه باید این کار را انجام دهیم', title: 'گذاشتن زرافه در یخچال', src: '/games/sentence-1.html', height: 650},
      {after: 'اگر فیل داخل یخچال بود، آنگاه فیل را از داخل یخچال بردار', title: 'جمله‌سازی ۲', src: '/games/sentence-2.html', height: 620},
      {after: 'خروجی را در دایره سمت راست مشاهده کنید', title: 'سوییچ ساده', src: '/games/switch.html', height: 430},
      {after: 'خروجی مرتبط با آن را با کلیک روی مربع‌ها جدول، به درستی وارد کنید', title: 'گیت NOT', src: '/games/not.html', height: 650},
      {after: 'خروجی مشاهده شده را در جدول وارد و آن را تکمیل کنید', title: 'گیت AND', src: '/games/and.html', height: 650},
      {after: 'مشابه قسمت قبلی با تغییر وضعیت سوییچ‌ها برای تغییر ورودی‌ها', title: 'گیت OR', src: '/games/or.html', height: 650},
      {after: 'ترانزیستورها، مشابه مینی‌گیم زیر', title: 'ترانزیستور به‌عنوان سوییچ', src: '/games/transistor.html', height: 430},
      {after: '1\t0\t0\n0\t0\t1\n0\t1\t0\n0\t1\t1', title: 'ساخت مدار از جدول درستی', src: 'https://jp.pellet.name/hep/logiga/', height: 720},
    ],
  },
  {
    number: '۴',
    slug: 'volume-4',
    title: 'زیر پوست کامپیوتر-جلد چهارم',
    file: 'زیر پوست کامپیوتر-جلد چهارم _ کاموا.html',
    images: [
      {after: 'این کلید در همان لحظه بستگی دارد.', src: '/images/photo_2025-09-17_00-55-13.jpg', alt: 'نمودار مدار منطقی ترکیبی بدون حافظه'},
      {after: 'مثلا 11 و 01 را با هم جمع بزنیم، چه کار کنیم؟', src: '/images/Screenshot_2025-09-07_110421.png', alt: 'نمونهٔ جمع دودویی و انتقال رقم نقلی'},
      {after: 'بیت‌های خروجی بلوک Full Adder هستند.', src: '/images/Screenshot_2025-09-15_144442_m36ygWO.png', alt: 'بلوک Full Adder با ورودی‌ها و خروجی‌های آن'},
      {after: 'قابلیت‌هایی مانند AND و OR و XOR و... را پیاده‌سازی می‌کند.', src: '/images/SN74S181N.jpg', alt: 'تراشهٔ چهار بیتی ALU مدل SN74S181N'},
    ],
    callouts: [
      'خیر. تبدیل عدد دودویی به دهدهی، انجام جمع و تبدیل دوبارهٔ پاسخ به دودویی، مدار را بی‌دلیل پیچیده می‌کند. بهتر است جمع مستقیماً با بیت‌ها و گیت‌های منطقی انجام شود.',
      'دو بیت ورودی چهار حالت مختلف دارند: ۰۰، ۰۱، ۱۰ و ۱۱. برای نمایش نتیجهٔ جمع نیز به دو بیت خروجی نیاز داریم: یکی برای Sum و دیگری برای Carry-out.',
      'خروجی Sum با گیت XOR و خروجی Carry-out با گیت AND ساخته می‌شود.',
      'برای خروجی Sum به گیتی نیاز دارید که فقط هنگام متفاوت بودن دو ورودی، ۱ شود. برای Carry-out نیز گیتی لازم است که تنها هنگام ۱ بودن هر دو ورودی، ۱ شود.',
      'برای ساخت نیم‌جمع‌کننده، دو ورودی A و B را هم‌زمان به یک گیت XOR و یک گیت AND وصل کنید. خروجی XOR همان Sum و خروجی AND همان Carry-out است.',
      'در جمع دودویی، حاصل ۱ + ۱ برابر ۱۰ است؛ صفر در ستون فعلی نوشته می‌شود و یک به ستون بعدی انتقال پیدا می‌کند.',
      'برای هر ترکیب A و B و Carry-in، ابتدا مجموع سه بیت را حساب کنید. بیت سمت راست پاسخ، Sum و بیت سمت چپ، Carry-out است.',
      'ابتدا A و B را با یک نیم‌جمع‌کننده جمع کنید.',
      'سپس Sum مرحلهٔ اول را با Carry-in وارد نیم‌جمع‌کنندهٔ دوم کنید.',
      'دو خروجی Carry را با یک گیت OR ترکیب کنید تا Carry-out نهایی ساخته شود.',
      'یک Full Adder از دو Half Adder و یک گیت OR ساخته می‌شود. نیم‌جمع‌کنندهٔ اول A و B را جمع می‌کند؛ نیم‌جمع‌کنندهٔ دوم Sum میانی را با Carry-in جمع می‌کند و گیت OR دو Carry میانی را به Carry-out تبدیل می‌کند.',
      'برای ساخت جمع‌کنندهٔ چندبیتی، Carry-out هر ستون را به Carry-in ستون بعدی وصل کنید. جمع از کم‌ارزش‌ترین بیت شروع می‌شود و به سمت بیت‌های پرارزش‌تر ادامه پیدا می‌کند.',
    ],
    games: [
      {after: 'حالت‌های مختلف را خودتان کشف کنید', title: 'نیم‌جمع‌کننده و جدول درستی', src: '/games/half-adder.html', height: 670},
      {after: 'هر کدام از خروجی‌های S و Cout را جداگانه بسازید', title: 'انتخاب گیت خروجی Sum', src: '/games/LogicGatesTraine/sum.html', height: 620},
      {after: 'هر کدام از خروجی‌های S و Cout را جداگانه بسازید', title: 'انتخاب گیت خروجی Carry', src: '/games/LogicGatesTraine/carry.html', height: 620},
      {after: 'در بازی زیر جدول درستی تمام جمع‌کننده را تکمیل نمایید', title: 'جمع‌کننده کامل و جدول درستی', src: '/games/full-adder.html', height: 690},
      {after: 'شبیه‌ساز زیر رسم نمایید', title: 'ساخت مدار Half Adder', src: 'https://jp.pellet.name/hep/logiga/', height: 720},
      {after: 'توجه: برای دسترسی به بلوک آماده‌ی Half Adder', title: 'ساخت مدار Full Adder', src: 'https://jp.pellet.name/hep/logiga/', height: 720},
      {after: 'جمع‌کننده که بتواند دو عدد دو بیتی را با هم جمع بزند، بسازید', title: 'ساخت جمع‌کنندهٔ دوبیتی', src: 'https://jp.pellet.name/hep/logiga/', height: 720},
    ],
  },
  {
    number: '۵',
    slug: 'volume-5',
    title: 'زیر پوست کامپیوتر-جلد پنجم',
    file: 'زیر پوست کامپیوتر-جلد پنجم _ کاموا.html',
    images: [
      {after: 'لچ در شبیه ساز پایین به صورت بلوک', src: '/images/SR_2.png', alt: 'بلوک لچ با ورودی‌های Set و Reset'},
    ],
    callouts: [
      'این مدار می‌تواند مقدار ۰ را نگه دارد. وقتی یکی از ورودی‌های AND صفر شود، خروجی صفر است و همین صفر از مسیر بازخورد دوباره به ورودی برمی‌گردد؛ بنابراین خروجی صفر باقی می‌ماند.',
      'ورودی فعال‌ساز مشخص می‌کند چه زمانی داده اجازه دارد وارد حافظه شود. وقتی فعال‌ساز ۱ است، خروجی از داده پیروی می‌کند؛ وقتی فعال‌ساز ۰ است، مقدار قبلی بدون تغییر نگه داشته می‌شود.',
      'حالت‌هایی را پیدا کنید که خروجی باید بدون تغییر بماند. در این حالت‌ها هر دو ورودی Set و Reset باید صفر باشند.',
      'خروجی Set فقط زمانی ۱ است که هم داده و هم فعال‌ساز ۱ باشند؛ پس این بخش با یک گیت AND ساخته می‌شود.',
      'خروجی Reset زمانی ۱ است که فعال‌ساز ۱ و داده ۰ باشد. بنابراین داده را با NOT معکوس کنید و سپس آن را همراه فعال‌ساز به AND بدهید.',
      'خروجی AND مربوط به Set و خروجی مدار AND و NOT مربوط به Reset را به ورودی‌های لچ SR وصل کنید. در این حالت، فعال‌ساز تعیین می‌کند داده چه زمانی در لچ ذخیره شود.',
    ],
    games: [
      {after: 'مدار توانسته مقدار 1 را نگه دارد', title: 'حافظه با OR و بازخورد', src: '/games/or-mem.html', height: 520},
      {after: 'کدام بیت را می‌توان با این سلول ذخیره کرد', title: 'حافظه با AND و بازخورد', src: '/games/and-mem.html', height: 520},
      {after: 'ساده‌ترین روش ترکیب این است که مدارها پشت سر هم قرار بگیرند', title: 'هستهٔ اولیهٔ لچ SR', src: '/games/sr-latch-no-not.html', height: 620},
      {after: 'برای این کار به یک گیت NOT دیگر هم نیاز داریم', title: 'مدار لچ SR', src: '/games/sr-latch.html', height: 620},
      {after: 'یک بار دیگه میتوانیم این مدار را به جعبه‌ای به اسم دی لچ', title: 'لچ D و جدول درستی', src: '/games/d-latch.html', height: 650},
      {after: 'لچ در شبیه ساز پایین به صورت بلوک', title: 'ساخت سلول حافظه', src: 'https://jp.pellet.name/hep/logiga/', height: 720},
    ],
  },
  {
    number: '۶',
    slug: 'volume-6',
    title: 'زیر پوست کامپیوتر - جلد ششم',
    file: 'زیر پوست کامپیوتر - جلد ششم _ کاموا.html',
    callouts: [
      'می‌توانید از قبل روی یک زمان دقیق توافق کنید؛ برای مثال هر دو نفر درست در ساعت ۱۰:۳۰ دست بزنند. چون ساعت‌ها هماهنگ‌اند، هر دو رویداد هم‌زمان رخ می‌دهند.',
      'به‌جای انجام کار در تمام مدتِ سطح ۱، یک لحظهٔ مشخص را انتخاب می‌کنیم؛ مثلاً فقط هنگام تغییر کلاک از ۰ به ۱. به این لحظه لبهٔ بالارونده می‌گوییم.',
      'اگر کلاک مستقیماً به ورودی فعال‌ساز دی‌لچ وصل شود، داده در تمام مدتی که کلاک ۱ است می‌تواند روی خروجی اثر بگذارد. وقتی کلاک ۰ است، مقدار قبلی حفظ می‌شود.',
      'کافی است پیش از ورودی فعال‌ساز یک گیت NOT قرار دهیم. در این صورت دی‌لچ زمانی فعال می‌شود که کلاک ۰ باشد و هنگام کلاک ۱ مقدار قبلی را نگه می‌دارد.',
    ],
    games: [
      {after: 'تصویر زیر طول موج و فرکانس یک سیگنال را نشان می‌دهد', title: 'اجزای سیگنال کلاک', src: '/games/clk-sig-labeled.html', height: 430},
      {after: 'سیگنال‌های کلاک با دوره تناوب‌های مختلف را تولید کنید', title: 'تغییر دورهٔ تناوب کلاک', src: '/games/clk-sig.html', height: 430},
      {after: 'فلش‌ها نشان‌گر زمانی است که هر یک از افراد داخل اتاق', title: 'رویدادها روی سیگنال کلاک', src: '/games/clk-sig-event.html', height: 430},
      {after: 'راه حل شما برای رفع این مشکل چیست', title: 'لبهٔ بالارونده و پایین‌رونده', src: '/games/clk-sig-rise-fall.html', height: 430},
      {after: 'مدار‌های حساس به لبه می‌گوییم', title: 'سطح‌ها و لبه‌های کلاک', src: '/games/clk-sig-level-edge-labeled.html', height: 430},
      {after: 'یک بار دیگر دی لچ را ببینید', title: 'دی‌لچ با ورودی فعال‌ساز', src: '/games/enable-latch/index.html', height: 650},
      {before: 'شبیه‌ساز بالا کارکرد دی لچ با ورودی کلاک را نشان می‌دهد', title: 'دی‌لچ با ورودی کلاک', src: '/games/clock-latch/index.html', height: 650},
      {before: 'همانطور که می‌بینی، زمانی که کلاک 0 است', title: 'دی‌لچ فعال در سطح پایین', src: '/games/active-low-latch/index.html', height: 650},
      {after: 'به این شکل:', title: 'فلیپ‌فلاپ D', src: '/games/FlipFlop/index.html', height: 650},
    ],
  },
];

const normalize = (value) => value.replace(/\s+/g, ' ').trim();

function canonicalGamePath(src) {
  return src
    .replace(/\/index\.html$/, '')
    .replace(/\/([^/]+)\.html$/, '/$1');
}

function cleanInline(value) {
  return value
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/\*+/g, '')
    .replace(/_+/g, '')
    .replace(/\s+([،؛؟!.])/g, '$1')
    .trim();
}

function readBlocks(file) {
  const raw = fs.readFileSync(path.join(sourceRoot, file), 'utf8');
  const lines = raw.split(/\r?\n/);
  const start = lines.findIndex((line) => /زیر پوست کامپیوتر.*جلد/.test(line));
  const end = lines.findIndex((line, index) => index > start && line.includes('تمامی حقوق برای کاموا محفوظ است'));
  const body = lines.slice(start + 1, end === -1 ? undefined : end).join('\n');

  const rawBlocks = body.split(/\n[ \t]*\n/);

  return rawBlocks
    .map((rawBlock, index) => {
      const normalizedBlock = rawBlock.replace(/^\n+/, '');
      const firstLine = normalizedBlock.split('\n')[0] ?? '';
      const indent = firstLine.match(/^\s*/)?.[0].length ?? 0;
      const isListItem = /^\s*\*\s+/.test(firstLine) || /^\s*\*\s*$/.test(rawBlocks[index - 1] ?? '');
      const separator = normalizedBlock.includes('\t') ? '\n' : ' ';
      const text = cleanInline(normalizedBlock.split('\n').map((line) => line.trim()).join(separator));
      return {indent, isListItem, text};
    })
    .filter(({text}) => text)
    .filter(({text}) => !/^new(?:\s+Image[^\s]*)?$/i.test(text))
    .filter(({text}) => text !== 'Request failed: 404')
    .filter(({text}) => text !== '*')
    .filter(({text}) => !/^[-–—]{8,}$/.test(text));
}

function buildVolume(spec) {
  const blocks = readBlocks(spec.file);
  const pendingGames = spec.games.map((game) => ({...game, placed: false}));
  const pendingImages = (spec.images ?? []).map((image) => ({...image, placed: false}));
  const pendingCallouts = [...spec.callouts];
  const content = [];

  const placeGames = (position, normalizedText) => {
    for (const game of pendingGames) {
      if (!game.placed && game[position] && normalizedText.includes(normalize(game[position]))) {
        const instruction = gameInstructions[game.src];
        if (!instruction) throw new Error(`Missing instruction for ${game.src}`);
        content.push({type: 'instruction', text: instruction});
        content.push({type: 'game', title: game.title, src: canonicalGamePath(game.src), height: game.height});
        game.placed = true;
      }
    }
  };

  const placeImages = (position, normalizedText) => {
    for (const image of pendingImages) {
      if (!image.placed && image[position] && normalizedText.includes(normalize(image[position]))) {
        content.push({type: 'image', src: image.src, alt: image.alt});
        image.placed = true;
      }
    }
  };

  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex += 1) {
    const block = blocks[blockIndex];
    const normalizedText = normalize(block.text);

    if (normalizedText === 'دروازه منطقی «!» ⇐ گیت NOT دروازه منطقی «و» ⇐ گیت AND دروازه منطقی «یا» ⇐ گیت OR') {
      content.push({
        type: 'lines',
        lines: ['دروازه منطقی «!» ⇐ گیت NOT', 'دروازه منطقی «و» ⇐ گیت AND', 'دروازه منطقی «یا» ⇐ گیت OR'],
      });
      continue;
    }

    if (normalizedText === '11(2) + 10(2)= ?') {
      content.push({type: 'calculation', lines: blocks.slice(blockIndex, blockIndex + 5).map(({text}) => text)});
      blockIndex += 4;
      continue;
    }

    if (normalizedText === 'دستورالعمل بازی') continue;

    if (/^(پاسخ سوال(?: بالا)?|پاسخ بازی|راهنمایی(?: بازی| [۱۲۳])?|توضیح بیشتر!)$/.test(normalizedText)) {
      const calloutText = pendingCallouts.shift();
      if (!calloutText) throw new Error(`Missing callout text for ${spec.title}: ${normalizedText}`);
      content.push({type: 'callout', label: normalizedText, text: calloutText});
      continue;
    }

    const isHeading = block.indent >= 2 && !block.isListItem && block.text.length <= 90;
    const isTable = block.text.includes('\t');

    placeImages('before', normalizedText);
    placeGames('before', normalizedText);
    content.push({
      type: isHeading ? 'heading' : isTable ? 'table' : 'text',
      level: block.indent >= 4 ? 3 : 2,
      text: block.text,
    });
    placeImages('after', normalizedText);
    placeGames('after', normalizedText);
  }

  const unplaced = pendingGames.filter((game) => !game.placed);
  if (unplaced.length) {
    throw new Error(`Could not place games for ${spec.title}: ${unplaced.map((game) => game.src).join(', ')}`);
  }
  const unplacedImages = pendingImages.filter((image) => !image.placed);
  if (unplacedImages.length) throw new Error(`Could not place images for ${spec.title}: ${unplacedImages.map((image) => image.src).join(', ')}`);
  if (pendingCallouts.length) throw new Error(`Unused callout text for ${spec.title}: ${pendingCallouts.length}`);

  return {...spec, games: undefined, images: undefined, callouts: undefined, blocks: content};
}

const generated = volumes.map(buildVolume);
fs.mkdirSync(path.dirname(outputFile), {recursive: true});
fs.writeFileSync(
  outputFile,
  `// Generated from the archived Kamva article exports by scripts/generate-workshop-content.mjs.\n` +
    `// Edit the source text or placement map, then run: npm run content:generate\n\n` +
    `export const workshopVolumes = ${JSON.stringify(generated, null, 2)};\n`,
  'utf8',
);

console.log(`Generated ${path.relative(repoRoot, outputFile)} with ${generated.reduce((sum, volume) => sum + volume.blocks.length, 0)} blocks.`);
