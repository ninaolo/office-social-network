analytics.controller('agendaController', ['$scope', 'moment', 'agendaService', 'userService',
    function ($scope, moment, agendaService, userService) {

        $scope.pickHour = agendaService.getStartHour();
        $scope.pickMinute = agendaService.getStartMinute();
        $scope.attendees = [];

        // Fetch all users for the instant search.
        userService.getUsers().success(function (response) {
            $scope.users = response;
        });

        // Get the logged in user's parked activities.
        agendaService.getActivities({
            'user_id': userService.getUser().id
        }).success(function (response) {
            $scope.activities = response;
        });

        // A helper method for creating hour/minute ranges.
        $scope.range = function (start, end) {
            var rangeList = [];
            for (var i = 0; i <= (end - start); i++) {
                var digitWithLeadingZeros = (1e4 + "" + start + i).slice(-2);
                rangeList.push(digitWithLeadingZeros);
            }
            return rangeList;
        };

        $scope.getDate = function() {
            return agendaService.getDate();
        };

        $scope.getEndTime = function() {
            return agendaService.getEndTime();
        };

        $scope.getAgenda = function() {
            return agendaService.getAgenda();
        };

        $scope.changeStartTime = function (pickHour, pickMinute) {
            agendaService.changeStartTime(pickHour, pickMinute);
        };

        $scope.getTotalTime = function () {
            return agendaService.getTotalTime();
        };

        $scope.getAgendaTime = function (id) {
            var agendaTime = agendaService.getDate().clone();
            for (var i = 0; i < id; i++) {
                agendaTime.add(agendaService.getAgenda()[i].duration, 'minutes');
            }
            return agendaTime;
        };

        // This function is called from the droppable directive.
        $scope.handleDrop = function (id) {
            $scope.addToAgenda($scope.activities[id]);
        };

        $scope.newActivity = function () {
            alert("new");
        };

        $scope.addToAgenda = function (activity) {
            agendaService.addToAgenda(activity);
            agendaService.setEndTime(agendaService.getEndTime().add(activity.duration, 'minutes'));
        };

    }]);
