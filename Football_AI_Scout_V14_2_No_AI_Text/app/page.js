export default function Home(){

const games=[
['曼城 vs 阿森纳','英超','★★★★★'],
['皇马 vs 巴萨','西甲','★★★★☆'],
['拜仁 vs 多特','德甲','★★★★']
];

return <main style={{padding:40,fontFamily:'Arial'}}>

<h1>⚽ 欢迎来到可乐的足球分析</h1>

<p>Football AI Scout V14.2</p>

<h2>🔥 今日重点比赛</h2>

{games.map((g,i)=>
<div key={i} style={{
background:'#f5f7fb',
padding:20,
margin:15,
borderRadius:15
}}>
<h3>{g[0]}</h3>
<p>联赛：{g[1]}</p>
<p>关注指数：{g[2]}</p>
<button>查看比赛数据</button>
</div>
)}

<h2>🌍 全球足球搜索</h2>

<input placeholder="输入球队 / 联赛 / 比赛"
style={{padding:12,width:'70%'}}/>

<button style={{padding:12}}>搜索</button>

<h2>📊 数据模块</h2>
<ul>
<li>比赛赛程</li>
<li>积分排名</li>
<li>近期比赛记录</li>
<li>历史交锋</li>
<li>伤停信息</li>
<li>球队阵容</li>
</ul>

</main>
}
