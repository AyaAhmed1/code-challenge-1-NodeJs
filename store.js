#!/usr/bin/env node
var fs = require('fs');
const readline = require('readline');
var key = (process.argv[3]);
var value = (process.argv[4]);
if ((process.argv[2] == 'add') && process.argv[3] && process.argv[4]) {
  console.log("add");
  fs.appendFileSync('file', '\r\n' + key + ":" + value, 'utf8');
}

else if (process.argv[2] == 'list') {
  console.log('list')
  Data = fs.readFileSync('file', 'utf8')
  console.log(Data)
}

else if ((process.argv[2] == 'get') && process.argv[3]) {
  console.log('get');
  var val_key = process.argv[3]
  const rl = readline.createInterface({
    input: fs.createReadStream('file')
  });
  rl.on('line', (line) => {
    line_data = line.toString().split(':');
    if (val_key == line_data[0]) {
      console.log(line_data[1])
    }
  });
}
else if ((process.argv[2] == 'remove') && process.argv[3]) {
  console.log('Remove');
  var val_key = process.argv[3]
  str = " "
  const rl = readline.createInterface({
    input: fs.createReadStream('file')
  });
  rl.on('line', (line) => {
    line_data = line.toString().split(':');
    if (val_key != line_data[0]) {
      str = str + '\r\n' + line
    }
  });
  rl.on('close', function () {
    fs.writeFileSync('file', str, 'utf8');
  });
}
else if (process.argv[2] == 'clear') {
  fs.writeFileSync('file', '', 'utf8');
}
else {
  console.log("Wrong Option")
}
