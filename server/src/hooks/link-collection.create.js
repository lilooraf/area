// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (_options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.trigger_app || !data.react_app || !data.trigger_action || !data.react_action)
      throw new Error('Your object must have those following property: \'trigger_app\', \'react_app\', \'trigger_action\', \'react_action\'');
    return context;
  };
};
