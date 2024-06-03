import inquirer from "inquirer";
class student {
    static counter = 20000;
    id;
    name;
    balance;
    courses;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 200;
    }
    // method to  enroll student balance
    enroll_courses(course) {
        this.courses.push(course);
    }
    // method to view student balance
    view_balance() {
        console.log(`balance for ${this.name}: $${this.balance}`);
    }
    // method to paid student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(` $${amount}: fees succesfully paid for! ${this.name}`);
        console.log(`Remaing balance:${this.balance} `);
    }
    // method to  display student status
    show_student_status() {
        console.log(`id:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`courses:${this.courses}`);
        console.log(`balance:${this.balance}`);
    }
}
// difining a calss student manage student
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student 
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(`student:${name} added succesfully.${Student.id}`);
    }
    //method to enroll a student
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_courses(course);
            console.log(`${student.name},in rolled${course}:succesfully`);
        }
    }
    // method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found please correct a new ID");
        }
    }
    // method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found please correct a new ID");
        }
    }
    // method to display a dtudent status
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_student_status();
        }
    }
    //method to find student by student ID
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main function to run the  program
async function main() {
    console.log("Welcome To Governor House Initiave program-Student Mangemetnt System");
    console.log("-".repeat(60));
    let Student_Manager = new student_manager();
    // while loop to keep program runing
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "select an option",
                choices: ["Add student", "Enroll student", "View student balance", "Pay fees", "Show status", "Exit"],
            }]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add student":
                let input_name = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter student name",
                    }]);
                Student_Manager.add_student(input_name.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                Student_Manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    }]);
                Student_Manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                Student_Manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    }]);
                Student_Manager.show_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exit....");
                process.exit();
        }
    }
}
// calling a main function
main();
