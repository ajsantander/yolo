const chalk = require('chalk');
const ethers = require('ethers');

const signature = 'unit [value] [sourceDenom] [destDenom]';
const description = 'Converts between ether denominations.';
const help = chalk`
Converts a given Ether denomination into another. If no value is specified, will list all denominations. Default sourceDenom is wei. Default destDenom is ether.

{red Eg:}

{blue > yolo convert 1000000 wei ether}
0.000000000001 ether

`;

module.exports = {
  signature,
  description,
  register: (program) => {
    program
      .command(signature, {noHelp: true})
      .description(description)
      .on('--help', () => console.log(help))
      .action((value, sourceDenom, destDenom) => {
        // If no value is given, list all denominations.
        if(!value) {
          console.log(units);
          return;
        }

        // Default denominations.
        sourceDenom = sourceDenom || 'wei';
        destDenom = destDenom || 'ether';

        // Identify units.
        if(!units[sourceDenom]) throw new Error(`Unrecognized source denomination: ${sourceDenom}.`);
        if(!units[destDenom]) throw new Error(`Unrecognized dest denomination: ${destDenom}.`);

        // Convert source to wei.
        const sourceWei = ethers.utils.parseUnits(value, sourceDenom);

        // Convert source to dest.
        const dest = ethers.utils.formatUnits(sourceWei, destDenom);

        // Output.
        console.log(`${dest} ${destDenom}`);
      });
  }
};

const units = {
  wei:        '1',
  kwei:       '1000',
  Kwei:       '1000',
  babbage:    '1000',
  femtoether: '1000',
  mwei:       '1000000',
  Mwei:       '1000000',
  lovelace:   '1000000',
  picoether:  '1000000',
  gwei:       '1000000000',
  Gwei:       '1000000000',
  shannon:    '1000000000',
  nanoether:  '1000000000',
  nano:       '1000000000',
  szabo:      '1000000000000',
  microether: '1000000000000',
  micro:      '1000000000000',
  finney:     '1000000000000000',
  milliether: '1000000000000000',
  milli:      '1000000000000000',
  ether:      '1000000000000000000',
  kether:     '1000000000000000000000',
  grand:      '1000000000000000000000',
  mether:     '1000000000000000000000000',
  gether:     '1000000000000000000000000000',
  tether:     '1000000000000000000000000000000'
}

