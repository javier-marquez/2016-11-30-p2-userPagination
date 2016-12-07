// This is just so that we can treat HTMLCollections like really-real Arrays
HTMLCollection.prototype.forEach = Array.prototype.forEach;


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

    li.appendChild(a);
    parentElement.appendChild(li);
    console.log(li);
    console.log(a.innerText);

}

var appendCreatePagination = function (int, parentElement) {            /**<--------- new resultsPagination */
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

//Create the pagination div with first page as active showing the 10 students by default
appendCreatePagination(defineNumberOfPages(fullStudentsList), container);               /**<--------- new initialisation */

//gets the index of the active page listItem
var currentPageIndex = function () {                                        
    //Getting the index of the "li" in relation with its siblings, any workaround to get the index of the "a"?
    var index = $("a.active").parent().index();                     /**<--------- do a find on the pagination add argument of the pagination target */
    return index + 1; //i.e. 1 means student 1 to 10.
}

var showSelectedStudents = function (intPageIndex) {                /**<--------- add argument arr */
    //select all students hide them
    $(fullStudentsList).hide();                                     /**<--------- add argument arr */
    //range of students to show
    var maxInclusiveInt = intPageIndex * 10 - 1; //we substract one to be able to use the same index 
    var minInclusiveInt = maxInclusiveInt - 9;

    //Shows 10 students
    for (minInclusiveInt; minInclusiveInt <= maxInclusiveInt; minInclusiveInt++) {
        $(fullStudentsList[minInclusiveInt]).show();
    }

}

//display first round of students
showSelectedStudents(currentPageIndex());                       /**<--------- invoke this with arguments pagination/resultsPagination  fullStudentsList/studentsFound */

//using jquery to manipulate the pagination classes                 /*Same function to be called everytime results are found*/
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


var createSearchBar = function () {
    //create the student search elements
    var $studentSearchDiv = $("<div class='student-search'></div>");
    var $searchInput = $("<input id='search-input' placeholder='Search for Students...'>");
    var $buttonStudentSearch = $("<button>Search</button>)");

    //Append the elements accordingly
    $studentSearchDiv.append($searchInput);
    $studentSearchDiv.append($buttonStudentSearch);

    console.log("search bar created and appended");

    return $studentSearchDiv;

}

//Append the searchbar at the end of the first child of the parentElement;
$(".page-header").append(createSearchBar());

//Attaching the event handler to the search button;
$(".student-search").on("click", "button", function () {
    console.log("button clicked");
    var $searchInput = $("div.student-search input");
    searchStudents($searchInput); //add more function

});


//global variable to store the string to search
var sanitizedSearch;
//array of results
var $resultsUl = $("<ul class='student-list results'></ul>");

var appendResultsUl = function(parentElement){
    $(parentElement).append($resultsUl);

}

appendResultsUl(container);

var student;
//var resultsIndex = [];
//no results message
var $noResultsMessage = $("<span class='no-results'></span>");
/***<-------add global arr studentsFound ------> */

//sanitizing the search value
var searchStudents = function (inputElement) {
    if (!(inputElement.val()) || $.trim(inputElement.val()) == "") {
        console.log("Search is invalid - reloading original pages");
        $noResultsMessage.text("Enter a name to search");
        $(".page-header").append($noResultsMessage);
        $noResultsMessage.show().delay(4000).fadeOut();
        $("ul.student-list.results").hide();
        $("div.pagination").show();
        showSelectedStudents(currentPageIndex());
    } else {
        sanitizedSearch = $.trim(inputElement.val()).toLowerCase();
        console.log(sanitizedSearch)

        //search on every student by name and email
        $.each(fullStudentsList, function (indexInArray, element) {
            var name = $(element).find("div.student-details h3").text();
            var email = $(element).find("div.student-details span.email").text();
            console.log("searching");
            //if we got a match we put the correponding index to the global variable resultStudents
            if (name.includes(sanitizedSearch) || (email.includes(sanitizedSearch))) {      /*<----- change*/
                
                student = $(fullStudentsList).slice(indexInArray, indexInArray+1);
                $("ul.student-list.results").append(student);
                
               

                

            }
        });
        displayStudentsSearch();
    }

}


var displayStudentsSearch = function () {

    //if there are results
    if ($("ul.student-list.results").children().length > 0) {
        //hide pagination
        $("div.pagination").hide();             
        //hide all students
        $(fullStudentsList).hide();             
        //show the selected students
        $("ul.student-list.results li").show();               /*<----- change*/
               
    } else {
        $noResultsMessage.text("Sorry no results, try again!");
        $(".page-header").append($noResultsMessage);
        $noResultsMessage.show().delay(4000).fadeOut();
    }

}

/*

Changes needed to use pagination on results
    searchStudents()
        When results are found
            slice() the li instead of the indexes and push them in to a new global array i.e. var studentsFound
        If there are no results 
            hide/remove the resultsPagination
            reinitialize the studentsFound
            hide/remove the results



    displayStudentsSearch()
        Instead of showing the same array elements keep them hidden
        Append all the results to show them
        Create a resultsPagination based on the results
        Append it as a sibling next to the pagination
        Initialize the resultsPagination







*/