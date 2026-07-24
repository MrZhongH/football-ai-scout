"use client";

import {useState} from "react";

export default function Home(){

const [msg,setMsg]=useState("等待点击");


function test(){

console.log("clicked");

alert("React按钮正常运行");

setMsg("点击成功");

}


return (

<main style={{
padding:"40px",
fontFamily:"Arial"
}}>


<h1>
Football AI Scout V15.4 TEST
</h1>


<button
onClick={test}
style={{
padding:"15px 30px",
fontSize:"20px"
}}
>
CLICK
</button>


<h2>
{msg}
</h2>


</main>

)

}
