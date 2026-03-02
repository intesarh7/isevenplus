// generateColleges.js
const fs = require("fs");

const countries = ["India","USA","Canada","UK","Australia"];
const fields = ["Engineering","Medical","Management","Science","Arts"];
const exams = ["JEE","NEET","SAT"];

let data = [];

for (let i = 1; i <= 1000; i++) {
  data.push({
    id: i,
    name: `Global University ${i}`,
    country: countries[Math.floor(Math.random()*countries.length)],
    city: `City ${i}`,
    fields: [fields[Math.floor(Math.random()*fields.length)]],
    examAccepted: [exams[Math.floor(Math.random()*exams.length)]],
    minScore: Math.floor(Math.random()*1500),
    rankThreshold: Math.floor(Math.random()*50000),
    budget: ["Low","Medium","High"][Math.floor(Math.random()*3)],
    type: Math.random() > 0.5 ? "Public" : "Private"
  });
}

fs.writeFileSync("colleges.json", JSON.stringify(data,null,2));