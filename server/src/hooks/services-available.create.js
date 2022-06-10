// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (_options = {}) => {
  return async context => {
    const { data } = context;
    if (!data.name || !data.body)
      throw new Error('Your object must have those following property: \'name\' and \'body\'');
    return context;
  };
};
