import React, { useState } from 'react';
import { Sun, Moon, Utensils, Heart, Printer, Star, RefreshCw } from 'lucide-react';

// --- 👵 婆婆的私房菜库 (严格筛选版) ---
// 规则：无羊肉、无紫菜、无猪肝、无红枣、无豆浆、无油炸、少豆制品(豆腐除外)
const recipePool = {
    breakfast: [
        {
            name: "小米南瓜粥 + 煮鸡蛋",
            steps: ["小米南瓜加水，电饭煲煮粥模式。", "鸡蛋同时放蒸屉上。"],
            nutrition: "养胃，补蛋白",
            tip: "小米粥熬出油皮最养人，南瓜甜丝丝的，不放糖也好喝。",
            imgDesc: "一碗金黄粘稠的小米南瓜粥，旁边卧着两个白煮蛋。"
        },
        {
            name: "瘦肉丸子汤泡馍",
            steps: ["里脊肉馅加葱姜水搅上劲，水开下丸子。", "加盐、香菜，泡入馒头块。", "（注：用的猪瘦肉）"],
            nutrition: "补铁，热乎",
            tip: "早上吃点肉丸子，一天都有劲儿。丸子我做得小小的，好嚼。",
            imgDesc: "一碗飘着香菜的瘦肉丸子汤，泡着吸饱汤汁的馒头块。"
        },
        {
            name: "玉米面糊糊 + 蒸红薯",
            steps: ["水开撒细玉米面，边撒边搅至粘稠。", "红薯洗净蒸熟。"],
            nutrition: "粗粮纤维，防便秘",
            tip: "吃点粗粮清清肠，红薯甜丝丝的，不用放糖。",
            imgDesc: "一碗金灿灿细腻的玉米面糊糊，旁边放着橙红瓤的红薯。"
        },
        {
            name: "热牛奶 + 鸡蛋煎馒头片",
            steps: ["馒头切片，裹上全蛋液，煎至金黄。", "热一杯纯牛奶（避开豆浆）。"],
            nutrition: "高钙早餐",
            tip: "牛奶比豆浆稳妥。馒头裹了蛋液再煎，外酥里嫩，不吸油。",
            imgDesc: "金黄酥软的馒头片，旁边是一杯温热的纯牛奶。"
        },
        {
            name: "黑米莲子粥 + 煮鸡蛋",
            steps: ["黑米、莲子（去芯）提前泡，煮粥。", "（注：避开红枣，用莲子清心）"],
            nutrition: "安神补血",
            tip: "莲子去芯了不苦，去火。黑米多煮会儿就软烂了。",
            imgDesc: "紫黑色的粥里，点缀着白色的莲子，旁边是白煮蛋。"
        },
        {
            name: "蔬菜鸡蛋软饼 + 玉米汁",
            steps: ["西葫芦丝、面粉、鸡蛋搅成糊摊饼。", "玉米榨汁（避开豆浆）。"],
            nutrition: "维生素全面",
            tip: "软饼子不费牙。玉米汁甜丝丝的，比豆浆好喝。",
            imgDesc: "一张金黄带绿丝的软饼，配一杯香甜的玉米汁。"
        },
        {
            name: "鲜肉小馄饨",
            steps: ["纯瘦肉馅包馄饨。", "碗底放虾皮、香油（不放紫菜）。"],
            nutrition: "易吞咽，开胃",
            tip: "馄饨皮滑溜溜的，吃完浑身热乎。汤里没放紫菜，放心喝。",
            imgDesc: "皮薄如纱的小馄饨在清汤里浮沉，透出粉色的肉馅。"
        },
        {
            name: "山药瘦肉粥",
            steps: ["大米煮开，下切碎的山药和肉末。", "出锅前撒点盐和葱花。"],
            nutrition: "健脾养胃",
            tip: "山药健脾胃，肉末切得碎碎的，和粥融在一起，特别香。",
            imgDesc: "白糯的粥里混合着粉色的肉末和白色的山药丁。"
        }
    ],
    dinnerNoodle: [ // 周一、周三吃面
        {
            name: "排骨豆角焖面",
            steps: ["排骨炒香下豆角，加水。", "铺湿面条焖10分钟。", "水干拌匀淋蒜醋。"],
            nutrition: "菜肉面一锅出",
            tip: "咱山西人的命根子！面条吸满了排骨汤，比肉还香！一定要淋醋！",
            imgDesc: "酱色的焖面，面条根根分明裹满酱汁，夹杂着豆角和排骨。"
        },
        {
            name: "西红柿鸡蛋肉酱面",
            steps: ["肉末炒散，下西红柿炒出浓汁。", "淋入蛋液做卤，浇面。"],
            nutrition: "酸甜开胃",
            tip: "加了肉末和鸡蛋，这卤子才够味，酸酸的特别开胃。",
            imgDesc: "白面条浇着红黄相间的肉末西红柿卤。"
        },
        {
            name: "家常炒面片",
            steps: ["面片煮八分熟捞出。", "配瘦肉片、洋葱、木耳炒香。"],
            nutrition: "筋道入味",
            tip: "面片揪得薄薄的，炒出来干香干香的，越嚼越有味。",
            imgDesc: "盘子里是裹满酱色的面片，配着木耳和肉片。"
        },
        {
            name: "茄子肉丁打卤面",
            steps: ["茄子切丁炸软（或蒸软），肉丁炒香。", "加水炖煮勾芡浇面。"],
            nutrition: "软糯咸香",
            tip: "茄子卤最下饭...哦不，下若！卤子多浇点。",
            imgDesc: "浓油赤酱的茄子肉丁卤，盖在手擀面上。"
        }
    ],
    dinnerRice: [ // 周二、周四、周五配饭
        {
            name: "土豆炖牛腩 + 米饭",
            steps: ["牛腩焯水，和土豆块加酱油炖烂。", "汤汁拌饭。"],
            nutrition: "高蛋白，补铁",
            tip: "牛肉炖得烂糊糊的，土豆也是面的，汤汁拌饭香得能吃两碗。",
            imgDesc: "红亮的牛肉块和软糯的土豆块在浓汤里。"
        },
        {
            name: "粉蒸排骨/瘦肉 + 米饭",
            steps: ["肉裹蒸肉粉，垫红薯。", "上锅蒸40分钟。"],
            nutrition: "油脂少，好消化",
            tip: "蒸出来的肉不油腻，肉汁都渗到下面的红薯里了，比肉还好吃！",
            imgDesc: "笼屉里铺着米粉裹着的排骨，下面隐约可见金黄的红薯。"
        },
        {
            name: "白菜粉条豆腐炖猪肉 + 米饭",
            steps: ["五花肉煸炒，下白菜豆腐炖煮。", "最后下粉条炖软乎。"],
            nutrition: "山西经典大烩菜",
            tip: "周五吃这个最舒坦！这就是咱长治人的大烩菜，粉条吸溜吸溜的。",
            imgDesc: "一锅热气腾腾的烩菜，粉条透亮，白菜软烂，豆腐入味。"
        },
        {
            name: "冬瓜丸子汤 + 馒头/饭",
            steps: ["瘦肉馅团丸子，水开下锅。", "下冬瓜片煮透明，撒虾皮。"],
            nutrition: "清淡去水肿",
            tip: "冬瓜去水肿，丸子补铁。清清爽爽的，晚上吃不沉。",
            imgDesc: "清汤里飘着白色的冬瓜片和粉嫩的肉丸子。"
        }
    ],
    dinnerWeekend: [ // 周六日儿子做
        {
            name: "山西过油肉 (家庭版) + 米饭",
            steps: ["【儿子任务】里脊肉上浆滑油。", "配木耳、蒜苔爆炒，淋老陈醋。"],
            nutrition: "山西名菜",
            tip: "儿子！这菜考验火候，肉要嫩，醋要香，好好给媳妇露一手！",
            imgDesc: "金黄油亮的肉片，配着黑木耳和蒜苔。"
        },
        {
            name: "红烧肉炖鹌鹑蛋 + 时蔬",
            steps: ["【儿子任务】五花肉煸出油，炒糖色炖烂。", "加鹌鹑蛋收汁。"],
            nutrition: "解馋硬菜",
            tip: "儿子！把肥油煸出去，做成入口即化。媳妇想吃肉，这个最合适。",
            imgDesc: "红润透亮的红烧肉和虎皮鹌鹑蛋。"
        },
        {
            name: "清蒸鲈鱼 + 炒青菜",
            steps: ["【儿子任务】鲈鱼划刀腌制，蒸8分钟。", "淋蒸鱼豉油泼热油。"],
            nutrition: "DHA补脑",
            tip: "儿子！蒸鱼要看好时间，别老了。这个对宝宝脑子好。",
            imgDesc: "一条造型漂亮的清蒸鱼，葱丝铺面。"
        },
        {
            name: "香菇炖土鸡 (去油)",
            steps: ["【儿子任务】土鸡焯水，加干香菇慢炖。", "撇去浮油喝汤吃肉。"],
            nutrition: "增强免疫力",
            tip: "儿子！鸡汤一定要把油撇干净，别让你媳妇喝一嘴油。",
            imgDesc: "砂锅里金黄的鸡汤，大块鸡肉和香菇。"
        }
    ]
};

// 初始默认菜单（您之前指定的那一套，作为基础）
const defaultMenu = [
    { day: "星期一", theme: "豆角焖面最解馋", breakfast: recipePool.breakfast[0], dinner: recipePool.dinnerNoodle[0], type: "noodle" },
    { day: "星期二", theme: "牛肉补劲头", breakfast: recipePool.breakfast[1], dinner: recipePool.dinnerRice[0], type: "rice" },
    { day: "星期三", theme: "开胃肉酱面", breakfast: recipePool.breakfast[2], dinner: recipePool.dinnerNoodle[1], type: "noodle" },
    { day: "星期四", theme: "蒸菜不上火", breakfast: recipePool.breakfast[3], dinner: recipePool.dinnerRice[1], type: "rice" },
    { day: "星期五", theme: "经典烩菜暖人心", breakfast: recipePool.breakfast[4], dinner: recipePool.dinnerRice[2], type: "rice" }, // 默认周五大烩菜
    { day: "星期六", theme: "儿子掌勺·硬菜", breakfast: recipePool.breakfast[5], dinner: recipePool.dinnerWeekend[0], type: "weekend" },
    { day: "星期日", theme: "儿子掌勺·滋补", breakfast: recipePool.breakfast[6], dinner: recipePool.dinnerWeekend[1], type: "weekend" }
];

export default function App() {
    const [currentMenu, setCurrentMenu] = useState(defaultMenu);
    const [animate, setAnimate] = useState(false);

    // 随机生成菜单逻辑
    const randomizeMenu = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);

        const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        const newMenu = defaultMenu.map((day, index) => {
            let newDinner;
            // 保持周一三吃面，二四五吃米，周末儿子做的结构
            if (day.type === 'noodle') {
                newDinner = getRandom(recipePool.dinnerNoodle);
            } else if (day.type === 'rice') {
                 // 稍微增加周五出现大烩菜的概率，因为是婆婆推荐
                 if (index === 4 && Math.random() > 0.3) { 
                     newDinner = recipePool.dinnerRice.find(r => r.name.includes("白菜粉条")); 
                 } else {
                     newDinner = getRandom(recipePool.dinnerRice);
                 }
            } else {
                newDinner = getRandom(recipePool.dinnerWeekend);
            }

            return {
                ...day,
                breakfast: getRandom(recipePool.breakfast), // 早餐随机
                dinner: newDinner
            };
        });
        setCurrentMenu(newMenu);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#fdf6e3] pb-12 font-serif print:bg-white print:pb-0">
             <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
                body { font-family: 'Noto Serif SC', serif; }
                .pattern-bg {
                    background-image: radial-gradient(#d4d4d4 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                @media print {
                    .no-print { display: none !important; }
                    .print-break-inside-avoid { break-inside: avoid; }
                    body { background-color: white; -webkit-print-color-adjust: exact; }
                    .pattern-bg { background-image: none; }
                    /* 强制显示背景色 */
                    .bg-orange-50 { background-color: #fff7ed !important; }
                    .bg-red-50 { background-color: #fef2f2 !important; }
                }
                .fade-enter { opacity: 0; transform: scale(0.95); }
                .fade-enter-active { opacity: 1; transform: scale(1); transition: opacity 300ms, transform 300ms; }
            `}</style>

            <div className="pattern-bg min-h-screen">
                {/* Header */}
                <header className="bg-orange-700 text-orange-50 p-6 shadow-lg text-center relative overflow-hidden print:bg-white print:text-black print:p-2 print:border-b-2 print:border-black print:shadow-none">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none print:hidden">
                        <Utensils size={200} className="absolute -left-10 -top-10 rotate-12" />
                        <Heart size={150} className="absolute -right-10 bottom-0 -rotate-12" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mb-2 print:hidden">
                         <span className="bg-orange-600 text-xs px-2 py-1 rounded-full text-white">🚫 羊肉/紫菜/猪肝/红枣/豆浆</span>
                         <span className="bg-orange-600 text-xs px-2 py-1 rounded-full text-white">🍜 周一三吃面</span>
                         <span className="bg-red-500 text-xs px-2 py-1 rounded-full text-white font-bold">👨‍🍳 周末儿子做饭</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-wider relative z-10 print:text-2xl">妈妈的小灶·爱心周记</h1>
                    <p className="text-orange-200 text-lg relative z-10 print:text-gray-600 print:text-sm">长治婆婆定制版（贴冰箱专用）</p>
                </header>

                {/* 操作按钮区 (打印时不显示) */}
                <div className="no-print flex justify-center gap-4 mt-6 mb-4">
                    <button 
                        onClick={randomizeMenu}
                        className="flex items-center gap-2 bg-white border-2 border-orange-600 text-orange-700 px-6 py-2 rounded-full shadow hover:bg-orange-50 transition-all active:scale-95"
                    >
                        <RefreshCw size={18} className={animate ? "animate-spin" : ""} /> 
                        换一换 (生成下周菜单)
                    </button>
                    <button 
                        onClick={handlePrint} 
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow transition-colors font-bold active:scale-95"
                    >
                        <Printer size={18} /> 
                        一键打印
                    </button>
                </div>
                <p className="no-print text-center text-xs text-gray-500 mb-6">💡 提示：点击“换一换”可以随机搭配出新的一周，够吃一个月不重样！</p>

                {/* 菜单网格 */}
                <main className={`container mx-auto px-4 max-w-4xl print:max-w-full print:px-0 transition-opacity duration-300 ${animate ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-4">
                        {currentMenu.map((dayItem, index) => (
                            <div key={index} className={`bg-white rounded-xl shadow-md overflow-hidden border ${dayItem.day.includes('六') || dayItem.day.includes('日') ? 'border-red-300' : 'border-orange-200'} print:shadow-none print:border-gray-300 print:rounded-lg print-break-inside-avoid`}>
                                {/* 星期几标题 */}
                                <div className={`${dayItem.day.includes('六') || dayItem.day.includes('日') ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'} p-2 text-center border-b print:bg-gray-100 print:border-gray-300`}>
                                    <h3 className={`text-lg font-bold ${dayItem.day.includes('六') || dayItem.day.includes('日') ? 'text-red-900' : 'text-orange-900'} print:text-black`}>
                                        {dayItem.day} 
                                    </h3>
                                </div>

                                <div className="p-3 space-y-3">
                                    {/* 早餐 */}
                                    <div className="relative pl-3 border-l-2 border-amber-300 print:border-gray-400">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="text-amber-500 print:text-black"><Sun size={16}/></div>
                                            <span className="text-xs font-bold text-gray-400 uppercase print:text-gray-600">早餐</span>
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 print:text-black">{dayItem.breakfast.name}</h4>
                                        <div className="text-xs text-gray-600 mb-1 leading-relaxed">
                                            {dayItem.breakfast.steps.join(' ')}
                                        </div>
                                    </div>

                                    {/* 晚餐 */}
                                    <div className={`relative pl-3 border-l-2 ${dayItem.dinner.name.includes('儿子') ? 'border-red-400' : 'border-indigo-400'} print:border-gray-400`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`${dayItem.dinner.name.includes('儿子') ? 'text-red-500' : 'text-indigo-500'} print:text-black`}>
                                                 {dayItem.dinner.name.includes('儿子') ? <Star size={16}/> : <Moon size={16}/>}
                                            </div>
                                            <span className={`text-xs font-bold uppercase print:text-gray-600 ${dayItem.dinner.name.includes('儿子') ? 'text-red-500' : 'text-gray-400'}`}>
                                                {dayItem.dinner.name.includes('儿子') ? '儿子做硬菜' : '晚餐'}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 print:text-black">{dayItem.dinner.name}</h4>
                                        <div className="text-xs text-gray-600 mb-1 leading-relaxed">
                                            {dayItem.dinner.steps.join(' ')}
                                        </div>
                                        {/* 婆婆叮嘱 */}
                                        <div className={`${dayItem.dinner.name.includes('儿子') ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'} mt-1 p-1.5 rounded text-[10px] italic print:bg-gray-50 print:text-black print:border print:border-gray-200`}>
                                            <span className="font-bold not-italic">
                                                {dayItem.dinner.name.includes('儿子') ? '喊儿子：' : '婆婆说：'}
                                            </span>
                                            {dayItem.dinner.tip}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center text-orange-300 text-sm pb-8 print:text-gray-400 print:mt-4">
                        —— 饭菜香，家才暖 (长治婆婆监制) ——
                    </div>
                </main>
            </div>
        </div>
    );
}