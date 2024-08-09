const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilsePro = (file) => {
  // promise 가 생성될 때 즉시 호출되는 소위 실행자 함수를 사용 하고 함수는 두개의 인수
  return new Promise((ressole, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('파일을 찾을 수 없습니다.');
      ressole(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('파일을 찾을 수 없습니다.');
      resolve('성공');
    });
  });
};

const getDogPic = async () => {
  try {
    //async 자동으로 promise 반환
    const data = await readFilsePro(`${__dirname}/dog.txt`);
    //await promise 해결될 때까지 이 시점에서 코드실행을 중지
    console.log(`${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random `
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random `
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random `
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('랜덤 이미지가 생성 되었습니다.');
  } catch (err) {
    // console.log(err);
    throw err;
  }
  return '222222';
};

(async () => {
  try {
    console.log('11111111111111');
    const x = await getDogPic();
    console.log(x);
    console.log('33333333333333');
  } catch (err) {
    console.log('errrrrr');
  }
})();

// console.log('111111111111111');

// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3333333333333');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// readFilsePro(`${__dirname}/doggg.txt`)
//   .then((data) => {
//     console.log(`${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random `);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
