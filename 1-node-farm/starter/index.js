const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./module/replaceTemplate');
// const slugify = require("slugify");
// const replaceTemplate = require("./modules/replaceTemplate");
// node 외부 경로 받을 수 있음 require

//////////////////
// file

// 차단,동기장식
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // 파일읽기의 동기기버전 (경로/인코딩된문자)
// // console.log(textIn);

// const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut); // text 생성
// // console.log("File written!");

// // 비차단,비동기
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("1번 에러!!");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     if (err) return console.log("2번 에러!!");

//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       if (err) return console.log("3번 에러!!");

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         // console.log("파일이 작성되었습니다.");
//       });
//     });
//   });
// });
// console.log("will read file");

//////////////////
// server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(data);

const server = http.createServer((req, res) => {
  // 요청이 서버에 도달할 때마다 실행되는 콜백함수를 허용
  const { query, pathname } = url.parse(req.url, true);
  //(요청한 url경로,true = 쿼리문자열을 자동으로 객체 ,false 또는 생략하면 쿼리문자열을 문자열형태로)

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.end(data);

    // NOT found
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>찾을 수 없는 페이지입니다.</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  // listen = 수신대기)  .. > 8000은 서버가 수신할 포트 번호
  console.log('Listening to requests on port 8000');
  // http://127.0.0.1:8000
});
