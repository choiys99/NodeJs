const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  /*
  전체 파일을 모두 읽어와야 하므로 느린동작 & 메모리에 이 데이터를 저장해야함(data 변수)
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  서버에 요청이 들어오면 fs 모듈을 통해 txt 파일을 읽어온다
  이 작업은 요청에 의해서 비동기 적으로 실행되지만 만약 읽어오는 파일의 크기가 크다면, 이를 다 읽어올 때
  까지 기다렸다가 콜백이 실행되기 때문에 파일이 적을 경우에만 적합하다.
  */
  //
  //
  // readable stream 생성

  /*
  const readable = fs.createReadStream("test11-file.txt");
  //파일 읽기가 시작되면 작은 데이터 조각 (shunk)로 읽어짐
  readable.on("data", (chunk) => {
    //http response 응답 객체 (res)에 write 를 호출해 chunk를 클라이언트에 전달
    res.write(chunk);
  });
  // 파일 읽기가 완료되면 http의 읍당을 완료한다.
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  });
;

/*
이 방식은 백프레셔 현상이 발생할 수 있다
데이터 생성 속도 >> 데이터 소비속도,네트워크가 느린경우 네트워크 버퍼가 금방차 시스템 메모리를 차지하고
이로 인해 성능 저하가 발생 할 수 있다
*/
  // pipe 메서드 사용하기
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

//pipe 메소드는 redable 스트립과 writable 스트림을 자동으로 연결해준다
// redable 읽기 속도를 제어해 데이터 흐름을 관리해줌

server.listen(8000, "127.0.0.1", () => {
  console.log("대기중...");
});

//
//
//

// Streams
// 데이터를 작은 조각 (chunk)로 나누어서 처리하는 방식
// 전체 데이터를 읽거나 쓰지않고,메모리에 저장도 하지않는다.
// 따라서 큰 데이터를 효율적으로 다룰 수 있고, 메모리 절약 및 더 빠른 I/O작업 처리가 가능해진다.,
// Streams 또한 Event Emitter의 인스턴스
// 따라서 Event를 emit하고 그에 대한 리스너 &핸들러에 의해 이벤트 루프를 통해 핸들링된다.

// 4가지 종류의 Streams
// Readable
// 데이터를 읽을 수 있는 Streams
// http request, fs read Streams
// 발생시키는 주요 이벤트로는 data,end

// Wrieable
// 데이터를 쓸 수 있는 Streams
// http response, fs write Streams
// drain,finish와 같은 이벤트가 있다
