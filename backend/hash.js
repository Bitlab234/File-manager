const bcrypt = require('bcrypt');

const passwords = ['password1', 'password2'];

(async () => {
  for (const pass of passwords) {
    const hash = await bcrypt.hash(pass, 10);
    console.log(`${pass} => ${hash}`);
  }
})();