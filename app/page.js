"use client";

import { useState } from "react";


export default function Home(){

const [keyword,setKeyword]=useState("");

const [teams,setTeams]=useState([]);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");



async function searchTeam(){

if(!keyword.trim()){
    setError("请输入球队名称");
    return;
}


setLoading(true);
setError("");
setTeams([]);


try{


const res = await fetch(
    `/api/team-search?q=${encodeURIComponent(keyword)}`
);


const data = await res.json();



if(data.error){

    setError(data.error);

}
else{

    setTeams(
        data.response || []
    );

}



}catch(e){

console.log(e);

setError(
"搜索失败，请稍后再试"
);


}



setLoading(false);


}





return (

<main
style={{
padding:"40px",
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



<div>


<input

value={keyword}

placeholder="输入球队，例如 皇马 / Real Madrid / 曼城"

onChange={
e=>setKeyword(e.target.value)
}


style={{

width:"70%",
padding:"15px",
fontSize:"18px"

}}


/>



<button

onClick={searchTeam}

style={{

padding:"15px 30px",
marginLeft:"10px",
fontSize:"18px",
cursor:"pointer"

}}

>

搜索

</button>


</div>



{
loading &&

<p>
正在搜索球队...
</p>

}



{
error &&

<p
style={{
color:"red"
}}
>

{error}

</p>

}




{

teams.length>0 &&

<div>


<h2>
搜索结果
</h2>



{

teams.map(
(item,index)=>{


const team=item.team;


return (

<div

key={index}

style={{

border:"1px solid #ddd",
borderRadius:"10px",
padding:"20px",
marginTop:"20px"

}}

>


<img

src={team.logo}

width="80"

/>


<h2>
{team.name}
</h2>


<p>
国家：
{team.country}
</p>


<p>
球队ID：
{team.id}
</p>



<button

style={{

padding:"10px 20px"

}}

onClick={()=>{

window.location.href =
`/team/${team.id}`

}}

>

查看球队分析

</button>


</div>


)


}

)


}



</div>


}





<hr/>


<h2>
📊 数据模块
</h2>


<ul>

<li>
球队基本信息
</li>

<li>
球队 Logo
</li>

<li>
积分排名
</li>

<li>
比赛赛程
</li>

<li>
近期比赛
</li>

<li>
历史交锋
</li>

<li>
伤停信息
</li>

<li>
球员阵容
</li>


</ul>




</main>


)


}
