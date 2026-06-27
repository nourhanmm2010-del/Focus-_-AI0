// ================= SETTINGS =================

let darkMode = false;
let english = true;


// ================= TIMER =================

let seconds = 0;
let timer = null;


// ================= TASK STORAGE =================

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


// load saved study time

let savedTime =
localStorage.getItem("studySeconds");


if(savedTime){

    seconds = Number(savedTime);

}



loadTasks();





// ================= THEME =================

function changeTheme(){

    darkMode = !darkMode;

    document.body.classList.toggle("dark");


    document.querySelector(".settings button").innerHTML =
    darkMode ? "☀️ Light" : "🌙 Dark";

}






// ================= LANGUAGE =================


function changeLanguage(){

    english = !english;


    if(english){

        document.getElementById("subtitle").innerHTML =
        "Your smart study assistant";


        document.getElementById("subjects").innerHTML =
        "Subjects";


        document.getElementById("focus").innerHTML =
        "Focus Time";


        document.getElementById("progress").innerHTML =
        "Progress";


        document.getElementById("planTitle").innerHTML =
        "Today's Plan";


        document.getElementById("addBtn").innerHTML =
        "Add";


        document.getElementById("taskInput").placeholder =
        "Add study task";


    }else{


        document.getElementById("subtitle").innerHTML =
        "مساعدك الذكي للمذاكرة";


        document.getElementById("subjects").innerHTML =
        "المواد";


        document.getElementById("focus").innerHTML =
        "وقت التركيز";


        document.getElementById("progress").innerHTML =
        "الإنجاز";


        document.getElementById("planTitle").innerHTML =
        "خطة اليوم";


        document.getElementById("addBtn").innerHTML =
        "إضافة";


        document.getElementById("taskInput").placeholder =
        "اكتب مهمة مذاكرة";

    }

}







// ================= TASKS =================


function addTask(){


let input =
document.getElementById("taskInput");


let text = input.value;



if(text === ""){

alert("Write a task first");

return;

}



tasks.push({

text:text,

done:false

});



saveTasks();


renderTasks();


input.value="";



}








function renderTasks(){


let list =
document.getElementById("tasks");


list.innerHTML = "";



tasks.forEach((task,index)=>{


let li =
document.createElement("li");



li.innerHTML = `

<input type="checkbox"

${task.done ? "checked" : ""}

onclick="completeTask(${index})">


<span>
📚 ${task.text}
</span>

`;



if(task.done){

li.style.textDecoration =
"line-through";

}



list.appendChild(li);



});


updateProgress();

}







function completeTask(index){


tasks[index].done =
!tasks[index].done;



saveTasks();


renderTasks();


}







function saveTasks(){


localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);


}




function loadTasks(){

renderTasks();

}








// ================= PROGRESS =================



function updateProgress(){


let total =
tasks.length;


let done =
tasks.filter(t => t.done).length;



let percent = 0;



if(total > 0){

percent =
Math.round(done / total * 100);

}



document.getElementById("progressNumber")
.innerHTML =
percent + "%";


}










// ================= STUDY TIMER =================




function startTimer(){


if(timer) return;



timer =
setInterval(()=>{


seconds++;



saveStudyTime();




let h =
Math.floor(seconds / 3600);



let m =
Math.floor((seconds % 3600)/60);



let s =
seconds % 60;



document.getElementById("time")
.innerHTML =
`${h}:${m}:${s}`;





document.getElementById("focusHours")
.innerHTML =
Math.floor(seconds/60)
+ " Minutes";



},1000);



}







function pauseTimer(){


clearInterval(timer);

timer = null;


}








function resetTimer(){


pauseTimer();


seconds = 0;



saveStudyTime();



document.getElementById("time")
.innerHTML =
"00:00:00";



document.getElementById("focusHours")
.innerHTML =
"0 Hours";


}







// ================= SAVE TIME =================


function saveStudyTime(){


localStorage.setItem(

"studySeconds",

seconds

);


}







// ================= AI ASSISTANT =================


function explainLesson(){

let text =
document.getElementById("aiInput").value;


if(text===""){

alert("Write a lesson first");
return;

}


document.getElementById("aiResult").innerHTML =

`
📚 Explanation:

The lesson is about:

${text}

<br><br>

Step by step:

1) Understand the main idea
<br>
2) Remember the important points
<br>
3) Practice with questions
`;

}





function summarizeLesson(){


let text =
document.getElementById("aiInput").value;


if(text===""){

alert("Write a lesson first");
return;

}



let words =
text.split(" ");



let summary =
words.slice(0, Math.min(20, words.length))
.join(" ");



document.getElementById("aiResult").innerHTML =

`
📝 Summary:

${summary} ...

<br><br>

⭐ Key points:
<br>
• Review the main concepts
<br>
• Focus on important definitions
`;

}





function makeQuiz(){


let text =
document.getElementById("aiInput").value;



document.getElementById("aiResult").innerHTML =

`
❓ Quiz:

1) What is the main idea of:
<br>
"${text}"

<br><br>

2) Explain the important points.

<br><br>

3) Give an example.
`;

}