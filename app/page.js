"use client";

import { useState } from "react";


export default function Home(){


const [keyword,setKeyword] = useState("");

const [teams,setTeams] = useState([]);

const [loading,setLoading] = useState(false);



async function searchTeam(){


if(!keyword.trim()){

alert("请输入球队英文名称");

return;

}



try{


setLoading(true);



const response = await fetch(

`/api/team-search?q=${encodeURIComponent(keyword)}`

);



const data = await response.json();



console.log("SEARCH RESULT:",data);



setTeams(data.teams || []);



}

catch(error){

console.log(error);

alert("搜索失败");

}


finally{

setLoading(false);

}


}




return (

<main
style={{
padding:"40px",
fontFamily:"Arial, sans-serif"
}}
>


<h1>

⚽ 欢迎来到可乐的足球分析

</h1>



<h2>

Football AI Scout V15.6

</h2>



<hr/>


<h2>

🌍 全球球队搜索引擎

</h2>



<div
style={{
display:"flex",
gap:"10px"
}}
>


<input

value={keyword}

onChange={
(e)=>setKeyword(e.target.value)
}


placeholder="请输入英文球队名，例如 Real Madrid"


style={{

flex:1,

padding:"15px",

fontSize:"18px",

border:"1px solid #ccc",

borderRadius:"8px"

}}


/>



<button

onClick={searchTeam}

style={{

padding:"15px 30px",

fontSize:"18px",

cursor:"pointer",

borderRadius:"8px"

}}

>


{

loading

?

"搜索中..."

:

"搜索"

}


</button>



</div>





<hr
style={{
marginTop:"30px"
}}
/>



<h2>

📊 搜索结果

</h2>



{

teams.length===0 &&

<p>

请输入英文球队名称进行搜索

</p>

}




{

teams.map((team)=>(


<div

key={team.id}

style={{

border:"1px solid #ddd",

padding:"20px",

marginTop:"15px",

borderRadius:"10px"

}}

>


<div
style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}
>


{

team.logo &&

<img

src={team.logo}

width="80"

height="80"

/>

}



<div>


<h2>

{team.name}

</h2>



<p>

{team.country}

</p>



</div>



</div>




<button

onClick={()=>{

window.location.href =
`/team/${team.id}`;

}}


style={{

marginTop:"15px",

padding:"10px 20px",

cursor:"pointer"

}}

>


进入球队分析


</button>



</div>



))


}





<hr

style={{

marginTop:"50px"

}}

/>




<h2>

📊 数据模块

</h2>



<ul>

<li>球队基本信息</li>

<li>球队 Logo</li>

<li>积分排名</li>

<li>比赛赛程</li>

<li>近期比赛</li>

<li>历史交锋</li>

<li>伤停信息</li>

<li>球员阵容</li>

<li>AI比赛预测</li>

</ul>



</main>

);


}
