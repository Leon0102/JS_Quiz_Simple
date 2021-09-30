const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const quiz =$('#quiz');
const nextBtn = $('#next');
const prevBtn = $('#prev');
const restartBtn = $('#start');

const app ={ 
    questions :[
    {
        question: "What is 2*5?",
        choices: [2 ,5 ,10, 15, 20],
        correctAnswer: 10
    },
    {
        question: "What is 3*5?",
        choices: [3 ,4 ,10, 15, 20],
        correctAnswer: 15
    },
    {
        question: "What is 2*10?",
        choices: [2 ,5 ,10, 15, 20],
        correctAnswer: 20
    },
    {
        question: "What is 2*1?",
        choices: [2 ,5 ,10, 15, 20],
        correctAnswer: 2
    }
    ],
    questionsCount:0,
    answerCount:[],
    start: function() {
        // Tạo question
        this.createQuestionElement(0);
        // Xử lý sự kiện
        this.handleEvent();
    },  
    createQuestionElement: function(index){
        var qElement =  document.createElement('div');
        qElement.setAttribute('id',"question");
        quiz.appendChild(qElement);
        var header = document.createElement('h2');
        header.innerText ='Question ' + index;
        qElement.appendChild(header);
        var question = document.createElement('h3');
        question.innerText = this.questions[index].question;
        qElement.appendChild(question);
        var listChoice = document.createElement('ul');
        qElement.appendChild(listChoice);
        var selections = [];
        this.questions[index].choices.forEach(function(item){
            return selections.push('<li class="radio__choice"><input type="radio" name="answer" value="'+item+'">' + item + '</li>');
        },[])
        listChoice.innerHTML = selections.join('');
        // console.log(this.questions); 

    },
    choose: function (){
        const rbs = document.querySelectorAll('input[name="answer"]');
        let selectedValue;
          for (const rb of rbs) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
        return app.answerCount.push(selectedValue);
        
    },
    displayNext: function(){
        if(quiz.hasChildNodes)
        {
            if(app.questionsCount < app.questions.length) {
                $('#question').remove();
                $('#start').style.display = 'none';
                app.createQuestionElement(app.questionsCount);
            }
            else{
            $('#question').remove();
            $('#prev').style.display = 'none';
            $('#next').style.display = 'none';
            $('#start').style.display = 'block';
        }
        }
        else{
            app.displayScore();
            app.questionsCount=0;
            app.createQuestionElement(app.questionsCount);
        }
         if(app.questionsCount === 1){
          $('#prev').style.display = 'block';
        } else if(app.questionsCount=== 0){
          $('#prev').style.display = 'none';
        }   
    },
    displayScore: function(){
        var numCorrect =0;
        for (var i = 0; i < app.answerCount.length; i++) {
            if (Number(app.answerCount[i]) === app.questions[i].correctAnswer) {
            numCorrect++;
        }
    }
        if(app.answerCount.length == app.questions.length){
            var qElement =  document.createElement('div');
            qElement.setAttribute('id',"score");
            var header = document.createElement('h2');
            header.innerText ='Your Score: ' + numCorrect;
            quiz.appendChild(qElement);
            qElement.appendChild(header);

        }
        console.log(numCorrect);
    },
    checkAnswer: function(){
        var isCheck = false;
        var choices = $$('input[name="answer"]');
        for(var i=0; i<choices.length; i++){
            if(choices[i].checked == true)
            {
                isCheck = true;
                break;
            }
        }
    },
    handleEvent: function(){
            // $('.button').onmouseenter = function () {
            // $(this).classList.add('active');
            // };
            //  $('.button').addEventListener('mouseleave', function () {
            //  $(this).classList.remove('active');
            // });
            nextBtn.onmouseenter=function () {
                this.classList.add('active');
            }
            nextBtn.onmouseleave=function () {
                this.classList.remove('active');
            }
            prevBtn.onmouseenter=function () {
                this.classList.add('active');
            }
            prevBtn.onmouseleave=function () {
                this.classList.remove('active');
            }
            nextBtn.onclick = function(e){
                e.preventDefault();
                // app.Score();
                app.choose();
                app.displayScore();
                app.questionsCount++;
                console.log(app.questionsCount);
                console.log(app.answerCount);
                app.displayNext();
            }
            prevBtn.onclick = function(e){
                e.preventDefault();
                // app.Score();
                app.questionsCount--;
                console.log(app.questionsCount);
                app.displayNext();
            }
            restartBtn.onclick= function(e){
                e.preventDefault();
                app.questionsCount=0;
                app.answerCount=[];
                app.createQuestionElement(app.questionsCount);
                $('#score').remove();
                $('#prev').style.display = 'block';
                $('#next').style.display = 'block';
                $('#start').style.display = 'none';
            }
    }
}
app.start();