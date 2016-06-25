var TodoViewModel = function (data){
    this.name = ko.observable(data.name);
    this.complete = ko.observable(data.complete);
}

var TodoListViewModel = function (){
    this.todoItems = ko.observableArray();
}

$(function () {
    var viewModel = new TodoListViewModel();
    
    // these are fake todos for now
    viewModel.todoItems.push(new TodoViewModel({ name: "Add fake todos", complete: true }));
    viewModel.todoItems.push(new TodoViewModel({ name: "Get todos with Ajax", complete: false }));

    ko.applyBindings(viewModel);
});

