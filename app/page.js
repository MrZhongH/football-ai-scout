"use client";

import { useEffect, useState } from "react";


export default function Home(){


const [keyword,setKeyword]=useState("");

const [team,setTeam]=useState(null);

const [fixtures,setFixtures]=useState([]);

const [loading,setLoading]=useState(false);




/**
 * 加载今日比赛
 */
async function loadFixtures(){

try{

const res =
await fetch("/api/fixtures");


const data =
await res.json();


if(data.response){

setFixtures(
data.response.slice(0,5)
);

}


}catch(error){

console.log(error);

}

}



useEffect(()=>{

loadFixtures();

},[]);




/**
 * 全球球队搜索
 */
async function searchTeam(){


if(!keyword){

return;

}


setLoading(true);


try{


const res =
await fetch(
`/api/team-search?q=${encodeURIComponent(keyword)}`
);


const data =
await res.json();



if(
data.response &&
data.response.length>0
){

setTeam(
data.response[0]
);


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

padding:40,

fontFamily:"Arial",

background:"#f7f9fc",

minHeight:"100vh"

}}

>



<h1>

⚽ 欢迎来到可乐的足球分析

</h1>


<p>

Football AI Scout V15.2.1

</p>




<h2>

🔥 今日真实比赛

</h2>



{

fixtures.map((f,i)=>(


<div

key={i}

style={{

background:"#fff",

padding:20,

margin:"15px 0",

borderRadius:15,

boxShadow:"0 3px 10px #ddd"

}}

>


<h3>

{f.teams.home.name}

 VS

{f.teams.away.name}

</h3>


<p>

🏆 {f.league.name}

</p>


<p>

🕒

{

new Date(
f.fixture.date
).toLocaleString()

}

</p>


</div>


))

}





<h2>

🌍 全球球队搜索

</h2>



<input


value={keyword}


onChange={

(e)=>

setKeyword(e.target.value)

}


placeholder="输入球队，例如 皇马 / 曼城 / Real Madrid"


style={{

padding:12,

width:"70%",

fontSize:16

}}


/>



<button


onClick={searchTeam}


style={{

padding:12,

marginLeft:10,

cursor:"pointer"

}}

>

搜索

</button>






{

loading &&

<p>

正在查询全球球队数据...

</p>

}






{

team &&


<div


style={{

marginTop:30,

background:"#fff",

padding:30,

borderRadius:20,

boxShadow:"0 3px 15px #ddd"

}}

>



<img

src={team.team.logo}

width="100"

alt="logo"

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

{team.team.founded || "暂无"}

</p>





<h3>

🏟 主场信息

</h3>



<p>

球场：

{team.venue?.name || "暂无"}

</p>



<p>

城市：

{team.venue?.city || "暂无"}

</p>



<p>

容量：

{team.venue?.capacity || "暂无"}

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
