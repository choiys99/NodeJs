const fs = require("fs");
const http = require("http");
const url = require("url");
// node 외부 경로 받을 수 있음 require

//////////////////
// file

// 차단,동기장식
const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // 파일읽기의 동기기버전 (경로/인코딩된문자)
// console.log(textIn);

const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // text 생성
// console.log("File written!");

// 비차단,비동기
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("1번 에러!!");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log("2번 에러!!");

    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      if (err) return console.log("3번 에러!!");

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("파일이 작성되었습니다.");
      });
    });
  });
});
// console.log("will read file");

//////////////////
// server

const server = http.createServer((req, res) => {
  // 요청이 서버에 도달할 때마다 실행되는 콜백함수를 허용
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    res.end("overview 입니다");
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    res.end("product 입니다");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>찾을 수 없는 페이지입니다.</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  // listen = 수신대기)  .. > 8000은 서버가 수신할 포트 번호
  console.log("Listening to requests on port 8000");
  // http://127.0.0.1:8000
});

test;
