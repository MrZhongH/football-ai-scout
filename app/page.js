"use client";

import { useEffect, useState } from "react";


export default function Home(){


const [keyword,setKeyword]=useState("");

const [team,setTeam]=useState(null);

const [matches,setMatches]=useState([]);

const [h2h,setH2h]=useState([]);

const [injuries,setInjuries]=useState([]);

const [loading,setLoading]=useState(false);



/*
搜索球队
*/

async function searchTeam(){


if(!keyword)return;


setLoading(true);


try{


const res=
await fetch(
`/api/team-search?q=${encodeURIComponent(keyword)}`
);


const data=
await res.json();



if(
data.response &&
data.response.length>0
){


const teamData=
data.response[0];


setTeam(teamData);



loadTeamData(
teamData.team.id
);


}


}catch(e){

console.log(e);

}


setLoading(false);


}



/*
加载球队分析数据
*/

async function loadTeamData(id){



// 最近比赛

const matchRes=
await fetch(
`/api/last-matches?team=${id}`
);


const matchData=
await matchRes.json();


if(matchData.response){

setMatches(
matchData.response
);

}




// 伤停

const injuryRes=
await fetch(
`/api/injuries?team=${id}`
);


const injuryData=
await injuryRes.json();



if(injuryData.response){

setInjuries(
injuryData.response
);

}


}






return (

<main

style={{

padding:40,

fontFamily:"Arial",

background:"#f5f7fb",

minHeight:"100vh"

}}

>



<h1>

⚽ 欢迎来到可乐的足球分析

</h1>


<p>

Football AI Scout V15.3

</p>




<h2>

🌍 搜索球队

</h2>



<input

value={keyword}

onChange={
(e)=>setKeyword(e.target.value)
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

marginLeft:10

}}

>

搜索

</button>





{
loading &&

<p>

正在分析球队数据...

</p>

}





{

team &&


<div>


{/*球队基本信息*/}


<div

style={{

background:"#fff",

padding:25,

marginTop:30,

borderRadius:20

}}

>


<img

src={team.team.logo}

width="100"

/>



<h1>

{team.team.name}

</h1>



<p>

🌍 国家:

{team.team.country}

</p>



<p>

📅 成立:

{team.team.founded || "暂无"}

</p>



<h3>

🏟 主场

</h3>


<p>

{team.venue?.name || "暂无"}

</p>


</div>






{/* 最近比赛 */}

<h2>

🔥 最近比赛

</h2>


{

matches.slice(0,5).map((m,i)=>(


<div

key={i}

style={{

background:"#fff",

padding:15,

margin:"10px 0",

borderRadius:12

}}

>


<p>

{m.teams.home.name}

 vs

 {m.teams.away.name}

</p>


<p>

比分:

{m.goals.home}

-

{m.goals.away}

</p>



<p>

时间:

{
new Date(
m.fixture.date
).toLocaleDateString()
}

</p>



</div>


))


}





{/* 下一场比赛 */}

<h2>

📅 下一场比赛

</h2>


{

matches[0] &&


<div

style={{

background:"#fff",

padding:20,

borderRadius:15

}}

>


<h3>

{matches[0].teams.home.name}

 VS

{matches[0].teams.away.name}

</h3>


<p>

赛事:

{matches[0].league.name}

</p>


</div>


}






{/*伤停*/}


<h2>

🚑 伤停信息

</h2>


{

injuries.length===0

?

<p>

暂无伤停数据

</p>

:

injuries.slice(0,5).map((x,i)=>(

<div key={i}>

{x.player.name}

-

{x.player.reason}

</div>

))

}





</div>

}





<h2>

📊 分析模块

</h2>


<ul>

<li>
联赛排名
</li>

<li>
近期状态
</li>

<li>
历史交锋
</li>

<li>
伤停情况
</li>

<li>
球队阵容
</li>

<li>
AI预测
</li>

</ul>




</main>

);


}
