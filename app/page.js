"use client";

import {useState} from "react";


export default function Home(){


const [keyword,setKeyword]=useState("");



function searchTeam(){

alert("按钮正常");


}



return (

<main style={{padding:40}}>


<h1>
Football AI Scout V15.4 TEST
</h1>


<input

value={keyword}

onChange={
e=>setKeyword(e.target.value)
}

style={{
padding:15
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


</main>

)

}
