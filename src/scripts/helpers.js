async function submitGrades(){
    const form = document.getElementById("gradeForm");
    if(!form){
        console.error("Grade Form Not Found")
        return;
    }
    form.addEventListener('submit', async function(event){
        event.preventDefault();

        try{
            const formData = new FormData(this);
            const studentID = formData.get("studentID");
            const grade = formData.get("grade");

            await fetch("https://li0l0grfo7.execute-api.us-east-2.amazonaws.com/grades",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                studentID: studentID,
                grade: grade
                })
            });

            alert("Grades have been submitted");
            showGrades();
        }
        catch(error){
            console.log("Error Showing Grades: " + error);
        }

    });
}

async function showGrades(){
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";  

    let totalGrades=0;

    try{
        const res = await fetch("https://li0l0grfo7.execute-api.us-east-2.amazonaws.com/grades");
        const data = await res.json();
    
        data.forEach(item=>{
            const row = document.createElement('tr');

            const studentIDCell = document.createElement('td');
            studentIDCell.textContent = item.studentID;

            const gradeCell = document.createElement('td');
            gradeCell.textContent = item.grade;
            
            totalGrades+=Number(item.grade);

            row.appendChild(studentIDCell);
            row.appendChild(gradeCell);

            tableBody.appendChild(row);
        })

        const avgrow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        const emptyCell2 = document.createElement('td');
        avgrow.appendChild(emptyCell);
        avgrow.appendChild(emptyCell2);

        const averageCell = document.createElement('td');
        let average = totalGrades/data.length

        averageCell.textContent = average.toFixed(2);
        avgrow.appendChild(averageCell);
        tableBody.appendChild(avgrow);
    }
    catch(error){
        console.log("Erorr loading grades: ", error)
    }

}
window.addEventListener("DOMContentLoaded", submitGrades);
window.addEventListener("DOMContentLoaded", showGrades);