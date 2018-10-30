'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const appendFile = util.promisify(require('fs').appendFile);

async function build() {
  const root = path.resolve(__dirname, '..');
  const sourceDir = path.resolve(root, 'src');
  const targetDir = path.resolve(root, 'lib');
  const jsTarget = targetDir;
  const cssTarget = path.resolve(targetDir, 'css');
  const hackFileName = 'antd-globals-hiding-hack'
  const hackFileSource = path.resolve(
    sourceDir,
    'less',
    hackFileName + '.less'
  );
  const hackFileOutputPath = path.resolve(
    cssTarget,
    hackFileName + '.css'
  );

  try {
    // clean
    process.stdout.write('Cleaning... \n');
    const cleanResult = await exec('npm run clean');

    // transpiling and copy js
    process.stdout.write('Transpiling js with babel... \n');
    const jsResult = await exec(`babel ${sourceDir} --out-dir ${jsTarget}`);

    // copy css
    process.stdout.write('Copying library style definitions... \n');
    const cssResult = await exec(`cpy ${sourceDir}/css/style.css ${cssTarget}`);

    // compile antd-hack less into css and copy it into lib
    process.stdout.write('Implementing antd hack... \n');
    const heckResult = await exec(
      `lessc --js ${hackFileSource} ${hackFileOutputPath}`
    );
    // append lib/index.js with line importing antd-hack
    const linesToBeAdded = [
      '',
      '',
      '// this line has been added by scripts/build.js',
      "require('./css/antd-globals-hiding-hack.css');",
      '',
    ]
    await appendFile(
      `${targetDir}/index.js`,
      linesToBeAdded.join('\n')
    );

    process.stdout.write('Success! \n');
  } catch (e) {
    process.stderr.write(e)
    process.exit()
  }
}

build();
