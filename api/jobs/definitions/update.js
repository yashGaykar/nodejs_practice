const { JobHandlers } = require("../handlers");



const updateDefinitions = (agenda) => {

    agenda.define("updateExamResults", JobHandlers.updateExamResults);
    
    
}

module.exports = { updateDefinitions }
