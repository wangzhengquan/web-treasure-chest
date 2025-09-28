const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Echo 程序已启动。请输入文字，按回车键后会原样输出。输入 "exit" 退出。');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('再见！');
    rl.close();
  } else {
    console.log(input);
  }
});

rl.on('close', () => {
  process.exit(0);
});