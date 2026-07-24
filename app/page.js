"use client";

import { useState } from "react";

export default function Home() {

  const games = [
    ["曼城 vs 阿森纳", "英超", "★★★★★"],
    ["皇马 vs 巴萨", "西甲", "★★★★☆"],
    ["拜仁 vs 多特", "德甲", "★★★★"]
  ];

  const [keyword, setKeyword] = useState("");
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);


  async function searchTeam(){

    if(!keyword) return;

    setLoading(true);

    try{

      const res = await fetch(
        `/api/football?q=${encodeURIComponent(keyword)}`
      );

      const data = await res.json();


      if(data.response && data.response.length > 0){

        setTeam(data.response[0]);

      }else{

        setTeam(null);

      }


    }catch(error){

      console.log(error);
      setTeam(null);

    }


    setLoading(false);

  }



  return (

<main
style={{
padding:"40px",
fontFamily:"Arial",
background:"#f7f9fc",
minHeight:"100vh"
}}
>


<h1>
⚽ 欢迎来到可乐的足球分析
</h1>


<p>
Football AI Scout V15.1
</p>



<h2>
🔥 今日重点比赛
</h2>



{
games.map((g,i)=>(

<div
key={i}
style={{
background:"#fff",
padding:"20px",
margin:"15px 0",
borderRadius:"15px",
boxShadow:"0 3px 10px #ddd"
}}
>

<h3>
{g[0]}
</h3>

<p>
联赛：{g[1]}
</p>

<p>
关注指数：{g[2]}
</p>


<button>
查看比赛数据
</button>


</div>

))
}



<hr/>


<h2>
🌍 全球足球搜索
</h2>


<div
style={{
display:"flex",
gap:"10px"
}}
>


<input

value={keyword}

onChange={(e)=>setKeyword(e.target.value)}

placeholder="输入球队，例如 Real Madrid"

style={{
padding:"12px",
width:"70%",
fontSize:"16px"
}}

/>


<button

onClick={searchTeam}

style={{
padding:"12px 25px",
cursor:"pointer"
}}

>

搜索

</button>


</div>



{
loading &&

<p>
正在查询真实数据...
</p>

}




{
team &&


<div

style={{
marginTop:"30px",
background:"#fff",
padding:"25px",
borderRadius:"20px",
boxShadow:"0 3px 15px #ddd"
}}

>


<img

src={team.team.logo}

width="100"

/>


<h2>

{team.team.name}

</h2>


<p>
🌍 国家：
{team.team.country}
</p>


<p>
📅 成立年份：
{team.team.founded}
</p>



<h3>
🏟 球场信息
</h3>


<p>
{team.venue?.name}
</p>


<p>
地址：
{team.venue?.address}
</p>


<p>
城市：
{team.venue?.city}
</p>


<p>
容量：
{team.venue?.capacity}
</p>


</div>


}




<h2>
📊 数据模块
</h2>


<ul>

<li>
比赛赛程
</li>

<li>
积分排名
</li>

<li>
近期比赛记录
</li>

<li>
历史交锋
</li>

<li>
伤停信息
</li>

<li>
球队阵容
</li>


</ul>



</main>

  );
}
