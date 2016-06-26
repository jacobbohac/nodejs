var DataViewModel = function (data) {
    this.date = ko.observable(data.date);
    this.amount = ko.observable(data.amount);    
}

var DataListViewModel = function () {
    this.dataItems = ko.observableArray();
}

$(function () {
    var viewModel = new DataListViewModel();
      
    var self = this;    
    
    $.getJSON("/api/alcohol", function (data) {        
        $.each(data.dataItems, function (index, value) {            
            viewModel.dataItems.push(new DataViewModel({ date: value.date, amount: value.amount }));            
        });
    });

    ko.applyBindings(viewModel);
});