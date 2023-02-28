const { updateDefinitions } =  require("./update");

const definitions = [updateDefinitions];

 const allDefinitions = (agenda) => {
  definitions.forEach((definition) => definition(agenda));
};

module.exports = { allDefinitions }