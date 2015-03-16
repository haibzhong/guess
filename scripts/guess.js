var app = angular.module("guessApp", []);

app.controller("guessCtrl", function($scope) {
    $scope.gResult = [];
    $scope.calc = function() {
        var r = $scope.obj.calc($scope.userInput),
            a = r[0], b = r[1];

        if (a  == 4) {
            $scope.gResult[$scope.gResult.length - 1].count = $scope.count + 1;
            $scope.finished = true;
        }

        if ( $scope.count == 0) {
            $scope.gResult.push({a: a, b: b, count: NaN});
        }

        $scope.results.push([++$scope.count, $scope.userInput, a + 'A' + b + 'B']);
        if (a != 4) {
            $scope.userInput = $scope.obj.guess($scope.userInput, a, b);
            $scope.calc();
        }
    }
    $scope.again = function () {
        $scope.obj = new tryGuess();
        $scope.userInput = $scope.obj.guess();
        $scope.finished = false;
        $scope.results = [];
        $scope.count = 0;
    }
    $scope.again();
});


function tryGuess () {
    var answers = [];
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i  = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i != j) {
                for (var k = 0; k < 10; k++) {
                    if (k != i && k != j) {
                        for (var l = 0; l < 10; l++) {
                            if (l != i && l != j && l != k) {
                                answers.push("" + numbers[i] + numbers[j] + numbers[k] + numbers[l]);
                            }
                        }
                    }
                }
            }
        }
    }
    this.answers = answers;
    this.genAnswer();
}

tryGuess.prototype.guess = function (guessed, a, b) {
    if (guessed) {
        var len = this.answers.length;
        var left = [];
        for (var i = 0; i < len; i++) {
            var r = this.calc(guessed, this.answers[i]);
            if (a == r[0] && b == r[1]) {
                left.push(this.answers[i])
            }
        }
        this.answers = left;
    }
    console.log(this.answers.length);
    return this.answers[parseInt(Math.random() * this.answers.length)];
}

tryGuess.prototype.calc = function(input, answer) {
    answer = answer || this.answer;
    var a = 0, b = 0;
    for (var i = 0; i < 4; i++) {
        if (input[i] == answer[i]) {
            a++;
        }
        for (var j = 0; j < 4; j++) {
            if (i != j && input[i] == answer[j]) {
                b++;
            }
        }
    }
    return [a, b];
}

tryGuess.prototype.genAnswer = function () {
    var answer = this.answers[parseInt(Math.random() * this.answers.length)];
    this.answer = answer;
    console.log(answer);
    return answer;
}
