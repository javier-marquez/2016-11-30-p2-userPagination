//Select all the student ListItems to be able to operate on them individually
var fullStudentsList = document.getElementsByClassName("student-item");
//Select the first container to append the paginationDiv later on
var container = document.querySelector("div[class=page");


//Returns number of pagination listItems
var defineNumberOfPages = function (arr) {
    var numberOfPages;

    if (fullStudentsList.lenght % 10 > 0) { //is there a round number of students?
        numberOfPages = fullStudentsList.length / 10;

    } else {
        numberOfPages = fullStudentsList.length / 10 + 1; //this means that there are not 10 round students

    }
    numberOfPages = Math.floor(numberOfPages);
    return numberOfPages;
}


//create the li inside  div.pagination > ul
var createAppendPagLi = function (i, parentElement) {

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.innerText = i;
    //Making the first page active
    if (i == 1) {
        a.classList.add("active");
    } 
    //Mirroring the class of "a" in he "li" to be able to use .index() on the "li" and its siblings
    //any workaround?
    if (a.classList.contains("active")) {
        li.classList.add("active");
    }
    li.appendChild(a);
    parentElement.appendChild(li);
    console.log(li);
    console.log(a.innerText);

}

var appendCreatePagination = function (int, parentElement) {
    var paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination";

    var paginationUl = document.createElement("ul");
    for (var i = 1; i <= int; i++) {
        createAppendPagLi(i, paginationUl);
        console.log("pageNumberAdded");
    }

    paginationDiv.appendChild(paginationUl);
    parentElement.appendChild(paginationDiv);


}






//Create the pagination div
appendCreatePagination(defineNumberOfPages(fullStudentsList), container);

//gets the index of the active page listItem
var currentPageIndex = function () {
    //Getting the index of the "li" in relation with its siblings, any workaround to get the index of the "a"?
    var index = $("li.active").index();
    return index + 1; //i.e. 1 means student 1 to 10.
}

var showSelectedStudents = function (intPageIndex) {
    //select all students hide them
    $(fullStudentsList).hide();
    //range of students to show
    var maxInclusiveInt = intPageIndex * 10 - 1; //we substract one to be able to use the same index 
    var minInclusiveInt = maxInclusiveInt - 9;

    //Shows 10 students
    for (minInclusiveInt; minInclusiveInt <= maxInclusiveInt; minInclusiveInt++) {
        $(fullStudentsList[minInclusiveInt]).show();
    }

}

//display first round of students
showSelectedStudents(currentPageIndex());

//using jquery to manipulate the paginatio classes
$(".pagination").on("click", "a", function () {
    //remove "active" class from all the li
    $(this).parent().siblings().removeClass("active");
    //remove "active" class from all a inside the pagination
    $(this).parent().siblings().children().removeClass("active");
    //toggle the "active" class on the a and its parent
    $(this).addClass("active");
    $(this).parent().addClass("active");
    //display a new round of students
    showSelectedStudents(currentPageIndex());
});



/*
div.student-search
    input type="text" placeholder="Search for Students"


*/








