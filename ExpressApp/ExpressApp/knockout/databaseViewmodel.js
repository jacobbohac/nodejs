var DataViewModel = function (data) {
    this.date = ko.observable(data.date);
    this.amount = ko.observable(data.amount);    
}

var DataListViewModel = function () {
    this.dataItems = ko.observableArray();
}

var date = ko.observable();
var amount = ko.observable();
var viewModel = new DataListViewModel();

function addRecord(){
    console.log('button clicked!');

    $.post("/api/alcohol", { "date" : date, "amount" : amount }, function (response) {
        console.log(response);
    }, 'json');
    
    viewModel.dataItems = ko.observableArray();

    $.getJSON("/api/alcohol", function (data) {        
        $.each(data.dataItems, function (index, value) {
            viewModel.dataItems.push(new DataViewModel({ date: value.date, amount: value.amount }));
        });
    });
}

$(function () {
      
    var self = this;    
    
    $.getJSON("/api/alcohol", function (data) {        
        $.each(data.dataItems, function (index, value) {            
            viewModel.dataItems.push(new DataViewModel({ date: value.date, amount: value.amount }));            
        });
    });
    
    ko.applyBindings(viewModel);
});