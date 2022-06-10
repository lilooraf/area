// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (_options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.signin && !data.signout && !data.update)
      throw new Error('Body must be either signin, signout or update');

    if ((data.signin  && (data.signout || data.update )) &&
        (data.signout && (data.signin  || data.update )) &&
        (data.update  && (data.signin  || data.signout)))
      throw new Error('Body must be either signin, signout or update');

    return context;
  };
};
