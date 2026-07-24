"use client";

import {useState} from "react";


export default function Home(){


const [keyword,setKeyword]=useState("");

const [result,setResult]=useState(null);



async function searchTeam(){


console.log("search:",keyword);



const res = await fetch(
"/api/team-search?q="+keyword
);


const data = await res.json();


console.log(data);


setResult(data);


}



return (

<main
style={{
padding:40
}}
>


<h1>
⚽ 欢迎来到可乐的足球分析
</h1>


<h2>
Football AI Scout V15.4
</h2>



<h2>
🌍 全球球队搜索引擎
</h2>



<input

value={keyword}

onChange={
e=>setKeyword(e.target.value)
}

placeholder="输入皇马/曼城/拜仁"

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
搜索
</button>



{

result &&

<div>

<h2>
结果:
</h2>


<pre>

{
JSON.stringify(
result,
null,
2
)
}

</pre>


</div>


}


</main>


)


}
