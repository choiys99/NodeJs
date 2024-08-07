const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 10; // 스레드풀 크기 설정

setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/0 finished");
  console.log("=========");

  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);

  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("prodcess.next"));

  crypto.pbkdf2("choi", "salt", 100000, 1024, "sha512", () => {
    console.log((Date.now() - start) / 1000, "초 ");
  });
  crypto.pbkdf2("choi", "salt", 100000, 1024, "sha512", () => {
    console.log((Date.now() - start) / 1000, "초 ");
  });
  crypto.pbkdf2("choi", "salt", 100000, 1024, "sha512", () => {
    console.log((Date.now() - start) / 1000, "초 ");
  });
  crypto.pbkdf2("choi", "salt", 100000, 1024, "sha512", () => {
    console.log((Date.now() - start) / 1000, "초 ");
  });
});

console.log("hello from the top-level code");
