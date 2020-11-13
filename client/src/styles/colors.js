const regex = /^([0-9a-f]{3}){1,2}$/i;

const colors = {
  LIGHT_GREEN: '#54A158', // new issue button
  LIGHT_BLUE: '#2D6CD0', // login / register button
  GHOST_WHITE: '#F6F6F6', // close issue button
  THIN_GRAY: '#F8F8FA', // issue list header
  LIGHT_GRAY: '#D8DBDF', // input border
  LIGHT_GRAY2: '#DCE0E4', // issue list border
  DARK_GRAY: '#4F555E', // cogwheel
  DARK_RED: '#cb2431', // closed issue svg
  GRAY: '#A0A0A0', // sign in github
  CLOUDY_WHITE: '#FAFBFC', // login background
  DARK_WHITE: '#F6F8FA', // issue comment
  LIGHT_SKYBLUE: '#F2F8FE', // issue owner
  LIGHT_BLACK: '#25292E', // navi bar
  BLUE: '#2B67CF', // picked label
  BLACK: '#000',
  WHITE: '#FFF',

  RANDOM: () =>
    Math.round(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0'),

  isValid: color => regex.test(color),

  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color/3943023
  getBackgroundTextColor: color => {
    const number = Number('0x' + color);
    const shift = color.length === 6;
    const mask = shift ? 0xff : 0xf;
    const red = number >> (8 << shift);
    const green = (number >> (4 << shift)) & mask;
    const blue = number & mask;
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? '000000'
      : 'ffffff';
  },
};

export default colors;
