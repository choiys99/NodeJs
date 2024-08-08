const fs = require('fs');
const superagent = require('superagent');

const readFilsePro = (file) => {
  return new Promise();
};

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random `)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Rondom dog image saved to file!');
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
