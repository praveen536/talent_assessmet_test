myapp.controller("myCon", quizController);
function quizController($http, $scope, $q, $timeout, WizardHandler,$filter, $state,$stateParams,$location,$anchorScroll) {
    var quizList = this;
    quizList.baseUrl='/'; 
    quizList.title = "QuizApp";
    quizList.showQzTimeReqEror = false;
    quizList.finalsubmit=false;
    quizList.isReview=false;
    quizList.showQzTimeReqErorMsg='';
    quizList.totalAtemp=[];
    quizList.countdown = 6; //defalult timer 20 second

    // review quiz
    quizList.review=function(){
        quizList.isReview=quizList.isReview ? false:true;
    }
    // getting quiz list from json
    $http.get(quizList.baseUrl+'question.json').then(function (res) {
        quizList.quiz = res.data;
        quizList.currentQueId = res.data.questions[0].id;
    });

    quizList.wizardClick = function (type, data = [], qdata) {
        quizList.showQzTimeReqEror = false;
        if (quizList.ans[data.id] == false) {
            quizList.showQzTimeReqEror = true;
            quizList.showQzTimeReqErorMsg = "Please select one option";
            // return false;
        }
        if (type == "next") {
            quizList.step += 1;
            if (!quizList.finalsubmit) {
                quizList.resetCountdown(); quizList.qzTimer();                
            }
        }else if (type == "back") {
            quizList.step -= 1;
        }else if (type == "final") {
            quizList.submitForm(data);
        }
        var cqid = quizList.quiz.questions[quizList.step - 1].id
        quizList.currentQueId = cqid;
    }

    quizList.qzTimer = function () {
        if (quizList.countdown > 0) {
            quizList.countdown--;
            digits(quizList.countdown) <= 1 ? quizList.countdown = '0' + quizList.countdown : quizList.countdown;
            myTimeout = $timeout(quizList.qzTimer, 1000);
        } else if (quizList.countdown == 0) {
            // diasble question base on timer
            $timeout.cancel(myTimeout);
            quizList.disQue[quizList.currentQueId] = true;
            quizList.showQzTimeReqErorMsg = "Timeout click on next button";
            quizList.showQzTimeReqEror = true;
        }
    }
    // quiz timer start on controller load
    var myTimeout = $timeout(quizList.qzTimer, 1000);

    // for reset countdown
    quizList.resetCountdown = function () {
        quizList.countdown = 6;
        $timeout.cancel(myTimeout);
    }
    const digits = (num, count = 0) => { if (num) { return digits(Math.floor(num / 10), ++count); }; return count; };

    // quiz form submit
    quizList.submitForm = function (qdata) {
        quizList.finalsubmit=true;
        quizList.isReview=true;
        quizList.resetCountdown();quizList.countdown = 00;
        angular.element(".card-body").find(".form-check-input").attr("disabled", "disabled");
        // count total que atempt
        quizList.totalAtemp= quizList.quiz.questions;
        quizList.totalAtemp2=0;
        quizList.totalAtemp2=quizList.totalAtemp.filter(function(i){
            if (i.submited_option!=undefined) {
                return quizList.totalAtemp2=quizList.totalAtemp2+1;
            }
        });
        // count total correct answered question
        quizList.totalCorrAns2=0;
        quizList.totalWrongAns2=0;
        quizList.totalNotAns2=0;
        quizList.quiz.questions.forEach(i => {
            if (i.submited_option) {
                i.options.forEach(j => {
                    if (j.isAnswer && i.submited_option==j.id) {quizList.totalCorrAns2=quizList.totalCorrAns2+1;}
                    if (j.isAnswer && i.submited_option!=j.id) {quizList.totalWrongAns2=quizList.totalWrongAns2+1;}
                });
            }else{
                quizList.totalNotAns2=quizList.totalNotAns2+1;
            }
        });
        $scope.score=(quizList.totalCorrAns2/quizList.quiz.questions.length)*100;
        showchart($scope.score);
    }
    
    // chart
    function showchart(score) {
        // pie chart
        quizList.pieData = {
            series: [score, 100 - score]
        };

        // donut chart
        quizList.donutOptions = {
            donut: true,
            donutWidth: 60,
            donutSolid: true,
            startAngle: 270,
            total: 200,
            showLabel: false
        };
    }
    // scroll to top in angularjs
    $location.hash('scroecard');
    $anchorScroll();
     
}