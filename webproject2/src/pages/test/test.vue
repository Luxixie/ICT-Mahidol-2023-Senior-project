<template>
    <el-row>
        <el-col :offset="9" style="margin-top: 5%;">
            <section class="container3">
            <!--questionBox-->
            <div class="questionBox" id="app">

                <!-- transition -->
                <transition :duration="{ enter: 500, leave: 300 }" enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut" mode="out-in">

                    <!--qusetionContainer-->
                    <div class="questionContainer" v-if="questionIndex < quiz.questions.length"
                        v-bind:key="questionIndex">

                        <header>
                            <h1 class="title is-6">Stock Quiz</h1>
                            <!--progress-->
                            <div class="progressContainer">
                                <progress class="progress is-info is-small"
                                    :value="(questionIndex / quiz.questions.length) * 100" max="100">{{(questionIndex /
                                    quiz.questions.length) * 100}}%</progress>
                                <p>{{(questionIndex / quiz.questions.length) * 100}}% complete</p>
                            </div>
                            <!--/progress-->
                        </header>

                        <!-- questionTitle -->
                        <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

                        <!-- quizOptions -->
                        <div class="optionContainer">
                            <div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"
                                @click="selectOption(index)"
                                :class="{ 'is-selected': userResponses[questionIndex] == index }" :key="index">
                                {{ index | charIndex }}. {{ response.text }}
                            </div>
                        </div>

                        <!--quizFooter: navigation and progress-->
                        <footer class="questionFooter">

                            <!--pagination-->
                            <nav class="pagination" role="navigation" aria-label="pagination">

                                <!-- back button -->
                                <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                                    Back
                                </a>

                                <!-- next button -->
                                <a class="button" :class="(userResponses[questionIndex] == null) ? '' : 'is-active'"
                                    v-on:click="next();" :disabled="questionIndex >= quiz.questions.length">
                                    {{ (userResponses[questionIndex] == null) ? 'Skip' : 'Next' }}
                                </a>

                            </nav>
                            <!--/pagination-->

                        </footer>
                        <!--/quizFooter-->

                    </div>
                    <!--/questionContainer-->

                    <!--quizCompletedResult-->
                    <div v-if="questionIndex >= quiz.questions.length" v-bind:key="questionIndex"
                        class="quizCompleted has-text-centered">

                        <!-- quizCompletedIcon: Achievement Icon -->
                        <span class="icon">
                            <i class="fa" :class="score() > 3 ? 'fa-check-circle-o is-active' : 'fa-times-circle'"></i>
                        </span>

                        <!--resultTitleBlock-->
                        <h2 class="title">
                            You did {{ (score() > 8 ? 'an amazing' : (score()< 4 ? 'a poor' : 'a good')) }} job! </h2>
                                <p class="subtitle">
                                    Total score: {{ score() }} / {{ quiz.questions.length }}
                                </p>
                                <br>
                                <a class="button" @click="Goknowledgehomepage()"> Back to knowledge Homepage<i class="fa fa-refresh"></i></a>
                                <br>
                                <br>
                                <br>
                                <a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>
                                <!--/resultTitleBlock-->

                    </div>
                    <!--/quizCompetedResult-->

                </transition>

            </div>
            <!--/questionBox-->

        </section>
        </el-col>
       
    </el-row>

</template>

<script>
import  axios from "axios"
export default {
    data() {
        return {
            quiz: {},
            questionIndex: 0,
            userResponses: {},
            isActive: false,
            testscore :0
        }
    },
    filters: {
        charIndex: function (i) {
            return String.fromCharCode(97 + i);
        }
    },
    methods: {
        restart: function () {
            var id = this.$store.state.accountid;
            var chapter = this.$route.params.chapter
            var Score = this.testscore 
            console.log(Score)
            var result ={
                chapter:chapter,
                userid:id,
                score:this.testscore 
            }
            console.log(result)
            axios.post('http://127.0.0.1:8088/quizinput/', result).then((res)=>{
                console.log(res.data)
            })
            this.questionIndex = 0;
            this.userResponses = Array(this.quiz.questions.length).fill(null);
        },
        Goknowledgehomepage(){
            var id = this.$store.state.accountid;
            var chapter = this.$route.params.chapter
            var Score = this.testscore 
            console.log(Score)
            var result ={
                chapter:chapter,
                userid:id,
                score:this.testscore 
            }
            console.log(result)
            axios.post('http://127.0.0.1:8088/quizinput/', result).then((res)=>{
                console.log(res.data)
            })
            this.$router.push('/knowledgeHome')
        },
        selectOption: function (index) {

            this.$set(this.userResponses, this.questionIndex, index);

        },
        next: function () {
            
            if (this.questionIndex < this.quiz.questions.length)
                this.questionIndex++;
        },

        prev: function () {
            if (this.quiz.questions.length > 0) this.questionIndex--;
        },
        // Return "true" count in userResponses
        score: function () {
    
            
            var score = 0;
            console.log(score)
             console.log(this.userResponses.length)
            for (let i = 0; i < this.userResponses.length; i++) {
                console.log( typeof this.quiz.questions[i].responses[this.userResponses[i]])
                console.log(this.quiz.questions[i].responses[this.userResponses[i]].correct)
                if (
                  
                    typeof this.quiz.questions[i].responses[this.userResponses[i]] !== "undefined" &&
                    this.quiz.questions[i].responses[this.userResponses[i]].correct
                )   
                {
                  
                    score = score + 1;
                     console.log(score)
                }
            }
           

            //console.log(reuslt)
            //axios.post('http://127.0.0.1:8088/quizinput/', reuslt)
            this.testscore = score
            return score;
            

            //return this.userResponses.filter(function(val) { return val }).length;
        }
    },
    created() {
        console.log(this.$route.params.chapter)
        

        axios.post('http://127.0.0.1:8088/question/' + this.$route.params.chapter).then(res => {


            var quiz = {
                user: "test",
                questions: res.data
            }

            this.quiz = quiz
            this.userResponseSkelaton = Array(this.quiz.questions.length).fill(null);
            this.userResponses = Array(this.quiz.questions.length).fill(null);
            console.log(this.quiz)
            console.log(this.userResponseSkelaton)
        });

    },

}
</script>


<style lang="scss">
$trans_duration: 0.3s;
$primary_color: #3D5AFE;

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");


.button {
    transition: $trans_duration;
}

.title,
.subtitle {
    font-family: Montserrat, sans-serif;
    font-weight: normal;
}

.animated {
    transition-duration: $trans_duration/2;
}

.container3 {
    margin: 0 0.5rem;
}

.questionBox {

    max-width: 30rem;
    width: 30rem;
    min-height: 30rem;

    background: #e1f5ea;
    position: relative;
    display: flex;

    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    header {
        background: rgba(0, 0, 0, 0.025);
        padding: 1.5rem;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        h1 {
            font-weight: bold;
            margin-bottom: 1rem !important;
        }

        .progressContainer {
            width: 60%;
            margin: 0 auto;

            >progress {
                margin: 0;
                border-radius: 5rem;
                overflow: hidden;
                border: none;

                color: $primary_color;

                &::-moz-progress-bar {
                    background: $primary_color;
                }

                &::-webkit-progress-value {
                    background: $primary_color;
                }
            }

            >p {
                margin: 0;
                margin-top: 0.5rem;
            }
        }
    }

    .titleContainer {
        text-align: center;
        margin: 0 auto;
        padding: 1.5rem;

    }

    .quizForm {
        display: block;
        white-space: normal;

        height: 100%;
        width: 100%;

        .quizFormContainer {
            height: 100%;
            margin: 15px 18px;

            .field-label {
                text-align: left;
                margin-bottom: 0.5rem;
            }
        }
    }

    .quizCompleted {
        width: 100%;
        padding: 1rem;
        text-align: center;

        >.icon {
            color: #FF5252;
            font-size: 5rem;

            .is-active {
                color: #00E676;
            }
        }
    }

    .questionContainer {
        white-space: normal;

        height: 100%;
        width: 100%;

        .optionContainer {
            margin-top: 12px;
            flex-grow: 1;

            .option {
                border-radius: 290486px;
                padding: 9px 18px;
                margin: 0 18px;
                margin-bottom: 12px;
                background: #e1d4fe;
                transition: $trans_duration;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.05);
                color: rgba(0, 0, 0, 0.85);
                border: transparent 1px solid;

                &.is-selected {
                    border-color: rgba(black, 0.25);
                    background-color: #e1d4fe;
                }

                &:hover {
                    background-color: #e1d4fe;
                }

                &:active {
                    transform: scaleX(0.9);
                }
            }
        }

        .questionFooter {
            background: rgba(0, 0, 0, 0.025);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            width: 100%;
            align-self: flex-end;

            .pagination {
                //padding: 10px 15px;
                margin: 15px 25px;
            }
        }
    }
}

.pagination {
    display: flex;
    justify-content: space-between;
}

.button {
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5rem;
    margin: 0 0.25rem;

    transition: 0.3s;

    &:hover {
        cursor: pointer;
        background: #ECEFF1;
        border-color: rgba(0, 0, 0, 0.25);
    }

    &.is-active {
        background: $primary_color;
        color: white;
        border-color: transparent;

        &:hover {
            background: darken($primary_color, 10%);

        }
    }
}

@media screen and (min-width: 769px) {
    .questionBox {
        align-items: center;
        justify-content: center;

        .questionContainer {
            display: flex;
            flex-direction: column;
        }
    }
}

@media screen and (max-width: 768px) {
    .sidebar {
        height: auto !important;
        border-radius: 6px 6px 0px 0px;
    }
}
</style>


  
