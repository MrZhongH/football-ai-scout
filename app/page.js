"use client";

import {useState} from "react";


export default function Home(){

const [keyword,setKeyword]=useState("");

const [team,setTeam]=useState(null);

const [loading,setLoading]=useState(false);



async function searchTeam(){


if(!keyword)return;


setLoading(true);


const res = await fetch(
`/api/team-search?q=${encodeURIComponent(keyword)}`
);


const data = await res.json();



console.log(data);



if(data.response && data.response.length>0){

setTeam(data.response[0].team);

}else{

setTeam(null);

}


setLoading(false);


}



return (

<main
style={{
padding:40,
fontFamily:"Arial"
}}
>


<h1>
⚽ 欢迎来到可乐的足球分析
</h1>


<h2>
Football AI Scout V15.4
</h2>



<hr/>


<h2>
🌍 全球球队搜索引擎
</h2>



<input

value={keyword}

onChange={
e=>setKeyword(e.target.value)
}


placeholder="输入球队，例如 皇马 曼城 拜仁"


style={{

padding:15,

width:"70%"

}}

/>



<button

onClick={searchTeam}

style={{

padding:15,

marginLeft:10

}}

>

{
loading?
"搜索中..."
:
"搜索"
}

</button>





{

team &&

<div

style={{

marginTop:30,

background:"#f5f7fb",

padding:25,

borderRadius:15

}}

>


<h2>
🎯 搜索结果
</h2>


<img

src={team.logo}

width="120"

/>



<h2>

{team.name}

</h2>



<p>
国家：
{team.country}
</p>



<p>
成立：
{team.founded}
</p>



<a

href={`/team/${team.id}`}

>

<button>

进入球队分析

</button>


</a>



</div>


}




<h2>
📊 数据模块
</h2>


<ul>

<li>球队信息</li>

<li>Logo</li>

<li>积分排名</li>

<li>近期比赛</li>

<li>历史交锋</li>

<li>伤停信息</li>

<li>球员阵容</li>

</ul>



</main>


)

}
