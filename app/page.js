"use client";

import { useState } from "react";


export default function Home() {


const [keyword,setKeyword] = useState("");

const [loading,setLoading] = useState(false);

const [data,setData] = useState(null);


async function searchTeam(){


if(!keyword){
alert("请输入球队名称");
return;
}


setLoading(true);


try{


const res = await fetch(
`/api/team-search?q=${encodeURIComponent(keyword)}`
);


const json = await res.json();


setData(json);


}catch(error){

console.log(error);

}


setLoading(false);


}



return (

<main
style={{
padding:40,
fontFamily:"Arial",
background:"#ffffff",
minHeight:"100vh"
}}
>


<h1>
⚽ 欢迎来到可乐的足球分析
</h1>


<h2>
Football AI Scout V15.3.1
</h2>



<hr/>



<h2>
🌍 全球球队搜索引擎
</h2>



<div>


<input

value={keyword}

onChange={
(e)=>setKeyword(e.target.value)
}

onKeyDown={
(e)=>{
if(e.key==="Enter"){
searchTeam();
}
}
}

placeholder="输入球队，例如 皇马 / 曼城 / 拜仁 / Real Madrid"

style={{

padding:15,

width:"70%",

fontSize:16,

borderRadius:8,

border:"1px solid #ccc"

}}

/>



<button

onClick={searchTeam}

style={{

padding:"15px 25px",

marginLeft:10,

borderRadius:8,

cursor:"pointer"

}}

>

{
loading?
"搜索中..."
:
"搜索"
}

</button>


</div>





{
data &&

<div

style={{

marginTop:30,

background:"#f5f7fb",

padding:25,

borderRadius:15

}}

>


<h2>
🔎 搜索结果
</h2>



{
data.error ?

<p>
{data.error}
</p>


:

<>


<h3>
球队：
{
data.team || keyword
}
</h3>



<p>
状态：
✅ API连接成功
</p>



<pre

style={{

background:"#fff",

padding:20,

borderRadius:10,

overflow:"auto"

}}

>

{
JSON.stringify(
data,
null,
2
)
}

</pre>


</>


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


);


}
