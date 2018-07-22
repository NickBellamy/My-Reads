//Takes a string in camelCase and returns a human readable capitalised title
export const convertFromCamel = camelCase => {
  let title = camelCase.replace(/([A-Z])/g, ' $1');
  return title[0].toUpperCase() + title.slice(1);
};