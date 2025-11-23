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

            console.log("This button got pressed for signing in with this data:\n");
            const studentID = formData.get("studentID");
            const grade = formData.get("grade");
            console.log(studentID, ", ", grade);
            const file= await fetch('./ExampleData/data.txt');
            if(!file.ok){
                throw new Error("File was not found");                
            }
            let contents = await file.text();
            contents += "\n" + studentID + "," + grade;
            console.log("Updated contents:\n", contents);

        }
        catch(error){
            console.log("Erorr loading txt file: ", error)
            return null;
        }

    })
}

async function showGrades(){
    const tableBody = document.getElementById("studentTableBody");
    let totalGrades=0;
    try{
        const file = await fetch('./ExampleData/data.txt');
        if (!file.ok){
            console.error("File Not Found");
        }
        let data = await file.text();
        let cleanedData = [];
        for(const items of data.split("\n")){
            cleanedData.push(items.split(","));
        }

        cleanedData.forEach(item=>{
            const row = document.createElement('tr');

            const studentIDCell = document.createElement('td');
            studentIDCell.textContent = item[0];

            const gradeCell = document.createElement('td');
            gradeCell.textContent = item[1];
            
            totalGrades+=Number(item[1]);

            row.appendChild(studentIDCell);
            row.appendChild(gradeCell);

            tableBody.appendChild(row);
        })

        const row = document.createElement('tr');
        const emptyCell = document.createElement('td');
        const emptyCell2 = document.createElement('td');
        row.appendChild(emptyCell);
        row.appendChild(emptyCell2);

        const averageCell = document.createElement('td');
        let average = totalGrades/cleanedData.length

        averageCell.textContent = average.toFixed(2);
        row.appendChild(averageCell);
        tableBody.appendChild(row);
    }
    catch(error){
        console.log("Erorr loading txt file: ", error)
        return null;
    }

}
window.addEventListener("DOMContentLoaded", submitGrades);
window.addEventListener("DOMContentLoaded", showGrades);