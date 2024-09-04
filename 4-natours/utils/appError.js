class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // 부모 클래스(Error)의 생성자를 호출하여 메시지를 설정합니다.

    this.statusCode = statusCode; // 에러 상태 코드 설정
    this.status = `${statusCode}`.startsWith('4') ? '실패' : 'error'; // 4xx 상태 코드에 따라 'fail' 또는 'error' 설정
    this.isOperational = true; // 예상 가능한 운영적 에러 확인

    // 스택 트레이스를 캡처하여 에러 객체에 추가 (에러 발생위치를 추적)
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
