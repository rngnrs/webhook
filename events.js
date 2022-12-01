const events = {
  ping: data => {
    return "zen" in data;
  },
  push: data => {
    return  "pusher" in data
      && "ref" in data;
  },
  "workflow_run.requested": data => {
    return "workflow_run" in data
      && "requested" === data.action;
  },
  "workflow_run.in_progress": data => {
    return "workflow_run" in data
      && "in_progress" === data.action;
  },
  "workflow_run.completed": data => {
    return "workflow_run" in data
      && "completed" === data.action;
  }
};

function getEventByData(data) {
  return Object.keys(events).find(key => events[key](data) === true);
}

module.exports = {
  getEventByData
}