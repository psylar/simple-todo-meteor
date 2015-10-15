Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers ({
    tasks: function() {
      if(Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {created: -1}});
      } else {
        return Tasks.find({}, {sort: {created: -1}});
      }
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      event.preventDefault();
      console.log(event);
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        created: new Date()
      });

      event.target.text.value = "";
    },

    "change .hide-completed": function(event) {
      Session.set("hideCompleted", event.target.checked);
    }

  });

  Template.task.events({
    "click .toggle-checked": function() {
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },

    "click .delete": function () {
      Tasks.remove(this._id);
    }
  }) 

  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
