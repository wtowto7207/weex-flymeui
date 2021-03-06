import defaultLang from 'weex-flymeui/lib/locale/lang/zh-CN';

let lang = defaultLang;

export const t = function (path, options) {
  let value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return value;
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function (l) {
  lang = l || lang;
};

export default { t, use };
