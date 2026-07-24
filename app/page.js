"use client";

import { useState } from "react";

export default function Home() {

  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  async function searchFootball() {

    if (!keyword) {
      alert("请输入球队或联赛");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        `/api/football?q=${keyword}`
      );

      const data = await res.json();

      setResult(data);

    } catch (error) {

      setResult({
        error: "数据请求失败"
      });

    }

    setLoading(false);
  }



  const games = [
    ['曼城 vs 阿森纳','英超','★★★★★'],
    ['皇马 vs 巴萨','西甲','★★★★☆'],
    ['拜仁 vs 多特','德甲','★★★★']
  ];



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


      <p>
        Football AI Scout V15.0
      </p>



      <h2>
        🔥 今日重点比赛
      </h2>



      {
        games.map((g,i)=>(

          <div
            key={i}
            style={{
              background:"#f5f7fb",
              padding:20,
              margin:15,
              borderRadius:15
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





      <h2>
        🌍 全球足球搜索
      </h2>



      <input

        value={keyword}

        onChange={
          (e)=>setKeyword(e.target.value)
        }

        placeholder="输入球队 / 联赛 / 比赛"

        style={{
          padding:12,
          width:"70%",
          fontSize:16
        }}

      />



      <button

        onClick={searchFootball}

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
          正在查询足球数据...
        </p>
      }





      {
        result &&

        <div
          style={{
            marginTop:30
          }}
        >

          <h2>
            🔎 搜索结果
          </h2>


          <pre

            style={{
              background:"#111",
              color:"#fff",
              padding:20,
              borderRadius:10,
              overflow:"auto"
            }}

          >

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
