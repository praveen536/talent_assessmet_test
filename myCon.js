myapp.controller("myCon", quizController);
function quizController($http, $scope, $q, $timeout, WizardHandler) {
    var quizList = this;
    quizList.title = "QuizApp";
    quizList.showQzTimeReqEror = false;
    quizList.finalsubmit=false;
    // getting quiz list from json
    $http.get('question.json').then(function (res) {
        console.log(res);
        quizList.quiz = res.data;
        // for (let i = 0; i < res.data.questions.length; i++) {
        //     console.log(res.data.questions[i].id);
        //     quizList.disQue[res.data.questions[i].id] = false;
        // }
        quizList.currentQueId = res.data.questions[0].id;
    });

    quizList.wizardClick = function (type, data = [], qdata) {
        quizList.showQzTimeReqEror = false;
        if (quizList.ans[data.id] == false) {
            quizList.showQzTimeReqEror = true;
            quizList.showQzTimeReqErorMsg = "Please select one option";
            // return false;
        }
        // console.log('go to '+type);
        console.log('data=');
        console.log(data);
        console.log('data.id=');
        // alert(WizardHandler.wizard().currentStepNumber());
        console.log(data.id);
        console.log(quizList.ans);
        console.log(quizList.ans[data.id]);
        if (type == "next") {
            quizList.step += 1;
            if (!quizList.finalsubmit) {
                quizList.resetCountdown(); quizList.qzTimer();                
            }
        }else if (type == "back") {
            quizList.step -= 1;
        }else if (type == "final") {
            console.log(data);
            quizList.submitForm(data);
        }
        // console.log(angular.element('#qid'+quizList.step).val());
        // // console.log(cqid);
        console.log('current step=' + quizList.step);
        var cqid = quizList.quiz.questions[quizList.step - 1].id
        quizList.currentQueId = cqid;
    }

    quizList.countdown = 20;
    quizList.qzTimer = function () {
        if (quizList.countdown > 0) {
            quizList.countdown--;
            digits(quizList.countdown) <= 1 ? quizList.countdown = '0' + quizList.countdown : quizList.countdown;
            myTimeout = $timeout(quizList.qzTimer, 1000);
        } else if (quizList.countdown == 0) {
            // diasble question base on timer
            console.log(quizList.currentQueId);
            $timeout.cancel(myTimeout);
            quizList.disQue[quizList.currentQueId] = true;
            quizList.showQzTimeReqErorMsg = "Timeout click on next button";
            quizList.showQzTimeReqEror = true;
        }
    }
    var myTimeout = $timeout(quizList.qzTimer, 1000);

    quizList.resetCountdown = function () {
        quizList.countdown = 20;
        $timeout.cancel(myTimeout);
    }
    const digits = (num, count = 0) => { if (num) { return digits(Math.floor(num / 10), ++count); }; return count; };

    // quiz form submit
    quizList.submitForm = function (qdata) {
        // alert('final submit');
        console.log('submit the quiz');
        console.log(qdata);
        quizList.finalsubmit=true;
        quizList.resetCountdown();quizList.countdown = 00;
        angular.element(".card-body").find(".form-check-input").attr("disabled", "disabled");
    }
}