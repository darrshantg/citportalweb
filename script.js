// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa-P46BTzSiSqMI1AbA7IzBA21X3Cq0a8",
  authDomain: "cit-portal-7bd3e.firebaseapp.com",
  databaseURL: "https://cit-portal-7bd3e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cit-portal-7bd3e",
  storageBucket: "cit-portal-7bd3e.appspot.com",
  messagingSenderId: "629173744776",
  appId: "1:629173744776:web:fcdce37e06d9bf12535b3d",
  measurementId: "G-RYHM7XV0XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

var namebox = document.getElementById("Namebox");
var rollbox = document.getElementById("Rollbox");
var secbox = document.getElementById("Secbox");
var genbox = document.getElementById("Genbox");
var staffbox = document.getElementById("staffid");
var subbox = document.getElementById("subject");
var datebox = document.getElementById("date");
var todatebox = document.getElementById("to_date");
var markbox = document.getElementById("Markbox");

var insBtn = document.getElementById("insbtn");
var selBtn = document.getElementById("selbtn");
var updBtn = document.getElementById("updbtn");
var delBtn = document.getElementById("delbtn");
var attBtn = document.getElementById("attbtn");
var downBtn = document.getElementById("pdf");
var markbtn = document.getElementById("mark");


let f = 0;

function insertData() {
  const sub = subbox.value;
  set(ref(db,"Students/" + rollbox.value),{
    Name: namebox.value,
    RollNo: rollbox.value,
    Section: secbox.value,
    Gender: genbox.value,
    [sub]: markbox.value,
  })
  .then(() =>{
    alert("Added successfully!");
  })
  .catch((error) =>{
    alert("Error occured, unsuccessful!");
  })
}

function selectData() {
  const dbref = ref(db);
  get(child(dbref,"Students/"+ rollbox.value)).then((snapshot) =>{
    if(snapshot.exists()){
      namebox.value = snapshot.val().Name;
      secbox.value = snapshot.val().Section;
      genbox.value = snapshot.val().Gender;
    }
    else{
      alert("No data found");
    }
  })
  .catch((error) => {
    alert("Error occured, unsuccessful!"+error);
  });
}

function updateData() {
  const sub = subbox.value;
  update(ref(db,"Students/" + rollbox.value),{
    Name: namebox.value,
    Section: secbox.value,
    Gender: genbox.value,
    [sub]: markbox.value,
  })
  .then(() =>{
    alert("data updated successfully!");
  })
  .catch((error) =>{
    alert("Error occured, unsuccessful!");
  })
}

function deleteData() {
  remove(ref(db,"Students/" + rollbox.value))
  .then(() =>{
    alert("deleted successfully!");
  })
  .catch((error) =>{
    alert("Error occured, unsuccessful!");
  })
}


function viewAtt() {
    const dbref = ref(db);
    console.log("HI");
    console.log(datebox.value);
    if(datebox.value == null || datebox.value === "") {
      f = 1;
      get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Attendance")).then((snapshot) =>{
        if(snapshot.exists()){
          const dates = Object.keys(snapshot.val());   

          const p = document.createElement("h2");
          const node1 = document.createTextNode(`Overall attendance for ${subbox.value}`);
          p.appendChild(node1);
          document.getElementById("tab").appendChild(p);

          for(let k = 0 ; k < dates.length; k++){
            get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Attendance/" + dates[k])).then((snapshot) =>{
              
              
              const d = document.createElement("p");
              const node = document.createTextNode("Date:" + dates[k]);
              d.appendChild(node);
              document.getElementById("tab").appendChild(d);
  
              const tbl = document.createElement("table");
              const tblBody = document.createElement("tbody");
              const row = document.createElement("tr");
              for (let j = 0; j < 2; j++) {
                const cell = document.createElement("th");
                if(j === 0) {
                  const cellText = document.createTextNode("Roll No.");
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                }
                else{
                  const cellText = document.createTextNode("Attendance Status");
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                }
              }
              tblBody.appendChild(row);  
  
              const keys = Object.keys(snapshot.val()).map(key => parseInt(key));
              const att_arr = Object.values(snapshot.val());
  
              for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                const row = document.createElement("tr");
                for (let j = 0; j < 2; j++) {
                      if(j==0) {
                        const cell = document.createElement("td");
                        const cellText = document.createTextNode(keys[i]);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                      }
                      if(j==1) {
                        const cell = document.createElement("td");
                        const cellText = document.createTextNode(att_arr[i]);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                      }
                      tblBody.appendChild(row); 
                }
              }
              tbl.appendChild(tblBody);
              document.getElementById("tab").appendChild(tbl);
            })
          }
          
          /*
          let i;
          var present = 0;
          var absent = 0;
          for(i = 0; i<Object.keys(snapshot.val()).length; i++) {
            if(att_arr[i] === "present") {
              present++;
            }
            else {
              absent++;
            }
          }
          document.getElementById("display2").innerHTML = "Total Present:" + present;
          document.getElementById("display3").innerHTML = "Total Absent:" + absent;*/  
        }
        else{
          alert("No data found");
        }
        })
        .catch((error) => {
          alert("Error occured, unsuccessful!"+error);
        });
    }
    else if (todatebox.value === null || todatebox.value === ""){
      f = 1;
      console.log(datebox.value);
      const p = document.createElement("h2");
      const node1 = document.createTextNode(`Attendance for ${subbox.value} on ${datebox.value}`);
      p.appendChild(node1);
      document.getElementById("tab").appendChild(p);

      get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Attendance/" + datebox.value)).then((snapshot) =>{
        if(snapshot.exists()){
          console.log(datebox.value);
          const keys = Object.keys(snapshot.val()).map(key => parseInt(key));
          const att_arr = Object.values(snapshot.val());
          
          const d = document.createElement("p");
          const node = document.createTextNode("Date:" + datebox.value);
          d.appendChild(node);
          document.getElementById("tab").appendChild(d);

          const tbl = document.createElement("table");
          tbl.setAttribute("id","tbl");
          const tblBody = document.createElement("tbody");
          const row = document.createElement("tr");
          for (let j = 0; j < 2; j++) {
            const cell = document.createElement("th");
            if(j === 0) {
              const cellText = document.createTextNode("Roll No.");
              cell.appendChild(cellText);
              row.appendChild(cell);
            }
            else{
              const cellText = document.createTextNode("Attendance Status");
              cell.appendChild(cellText);
              row.appendChild(cell);
            }
          }
          tblBody.appendChild(row);
          for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 2; j++) {
                  if(j==0) {
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode(keys[i]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
                  if(j==1) {
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode(att_arr[i]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
                  tblBody.appendChild(row); 
            }
          }
          tbl.appendChild(tblBody);
          document.getElementById("tab").appendChild(tbl);
        }
        else {
          alert("No data found");
        }
      })
      .catch((error) => {
        alert("Error occured, unsuccessful!"+error);
      });
    }
    else {
      f = 1;
      console.log(todatebox.value);
      const p = document.createElement("h2");
      const node1 = document.createTextNode(`Attendance for ${subbox.value} from ${datebox.value} to ${todatebox.value}`);
      p.appendChild(node1);
      document.getElementById("tab").appendChild(p);
    
      get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Attendance")).then((snapshot) =>{
        if(snapshot.exists()){

          let startdate = datebox.value.split("-");
          let startday = startdate[0];

          let enddate = todatebox.value.split("-");
          let endday = enddate[0];

          let currdate = startdate;
          let currday = startday;

          console.log(datebox.value);
          const keys = Object.keys(snapshot.val());
          console.log(keys);
          
          let i = 0;
          while(currday >= startday && currday <= endday && i < keys.length){
            let date_key = keys[i];
            get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Attendance/" + keys[i])).then((snapshot) =>{
              if(snapshot.exists()){
                console.log(datebox.value);
                const keys = Object.keys(snapshot.val()).map(key => parseInt(key));
                const att_arr = Object.values(snapshot.val());
                
                const d = document.createElement("p");
                const node = document.createTextNode("Date:" + date_key);
                d.appendChild(node);
                document.getElementById("tab").appendChild(d);
      
                const tbl = document.createElement("table");
                tbl.setAttribute("id","tbl");
                const tblBody = document.createElement("tbody");
                const row = document.createElement("tr");
                for (let j = 0; j < 2; j++) {
                  const cell = document.createElement("th");
                  if(j === 0) {
                    const cellText = document.createTextNode("Roll No.");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
                  else{
                    const cellText = document.createTextNode("Attendance Status");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
                }
                tblBody.appendChild(row);
                for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                  const row = document.createElement("tr");
                  for (let j = 0; j < 2; j++) {
                        if(j==0) {
                          const cell = document.createElement("td");
                          const cellText = document.createTextNode(keys[i]);
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }
                        if(j==1) {
                          const cell = document.createElement("td");
                          const cellText = document.createTextNode(att_arr[i]);
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }
                        tblBody.appendChild(row); 
                  }
                }
                tbl.appendChild(tblBody);
                document.getElementById("tab").appendChild(tbl);
              }
              else {
                alert("No data found");
              }

            })
            .catch((error) => {
              alert("Error occured, unsuccessful!"+error);
            });
            i++;
            if(i < keys.length) {
              currdate = keys[i].split("-");
              currday = currdate[0];
            }
            
          }
        }
        else {
          alert("No data found");
        }
      })
      .catch((error) => {
        alert("Error occured, unsuccessful!"+error);
      });
    }
}

function dispdownBtn() {
  if(f==1) {
    console.log("1")
    downBtn.style.display = "block";
    downBtn.style.marginTop = 10 + 'px';
  }
  
}

function pdf() {
  window.jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();
	
// Source HTMLElement or a string containing HTML.
  var elementHTML = document.querySelector("#tab");

  doc.html(elementHTML, {
    callback: function(doc) {
        // Save the PDF
        doc.save("attendance.pdf");
    },
    x: 15,
    y: 15,
    width: 170, //target width in the PDF document
    windowWidth: 650 //window width in CSS pixels
  });
}

function markpdf() {
  const dbref = ref(db);

  get(child(dbref,"Staff/"+ staffbox.value + "/" + subbox.value + "/Internals")).then((snapshot) =>{
    if(snapshot.exists()){
      const roll_nos = Object.keys(snapshot.val());   
      const mark_arr = Object.values(snapshot.val());

      const div = document.createElement("div");   
      const p = document.createElement("h2");
      const node = document.createTextNode("Internal marks for " + subbox.value);
      p.appendChild(node);
      div.appendChild(p);

      const tbl = document.createElement("table");
      const tblBody = document.createElement("tbody");

      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
        const cell = document.createElement("th");
          if(j === 0) {
            const cellText = document.createTextNode("Roll No.");
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          else{
            const cellText = document.createTextNode("Marks");
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
      }
      tblBody.appendChild(row); 

      for(let i = 0; i < roll_nos.length; i++) {
        const row = document.createElement("tr");
        for(let j = 0; j < 2; j++){
          const cell = document.createElement("td");
          if(j == 0) {
            const cellText = document.createTextNode(roll_nos[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          else {
            const cellText = document.createTextNode(mark_arr[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
        }
        tblBody.appendChild(row);  
      }

      tbl.appendChild(tblBody);
      div.appendChild(tbl);

      window.jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF();
	

      doc.html(div, {
        callback: function(doc) {
        // Save the PDF
        doc.save(`${subbox.value} internal-marks.pdf`);
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
      });
    }
    else {
      alert("No data found");
    }
  })
  .catch((error) => {
    alert("Error occured, unsuccessful!"+error);
  }); 
}

insBtn.addEventListener('click',insertData);
selBtn.addEventListener('click',selectData);
updBtn.addEventListener('click',updateData);
delBtn.addEventListener('click',deleteData);
attBtn.addEventListener('click',viewAtt);
attBtn.addEventListener('click',dispdownBtn);
downBtn.addEventListener('click',pdf);
markbtn.addEventListener('click',markpdf);
