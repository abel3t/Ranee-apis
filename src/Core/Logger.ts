import chalk from 'chalk';

/**
 *
 * @param name {string} The name of Logging
 * @param [args] {Object} The arguments to stringify
 */
function info(name: string, args?: Object): void {
  const current = new Date().toISOString();
  const type = chalk.greenBright('[info]');
  const timeString = chalk.green(`time: ${current}`);
  const nameString = chalk.yellow(`name: ${name}`);

  if (args) {
    console.info(`>> ${type} ${timeString} ${nameString} data: ${JSON.stringify(args)}`);
  } else {
    console.info(`>> ${type} ${timeString} ${nameString}`);
  }
}

function error(error: Error): void {
  const current = new Date().toISOString();
  const type = chalk.red('[error]');
  const timeString = chalk.green(`time: ${current}`);
  const errorString = chalk.yellow(`Error: ${error.message}`);
  console.error(`>> ${type} ${timeString} ${errorString}`);
}

export default {
  info,
  error
};