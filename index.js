
// ---------- Array Generation ----------
// Generates the array to be sorted; called intially and each time that the user
// chooses to generate a new array of values
// inputs = desired length; return = array of unique integers
function generateArray(length) {
    let arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(fillArrHelper(arr));
    }
    return (arr);
}

// Helper functions for array generation
// - fillArrHelper accepts the array and checks to see if randomly generated values
//      are unique to the array before returning to be pushed
// - generateRandomInt generates a random int between the constants MIN and MAX
function fillArrHelper(arr) {
    var tmp = generateRandomInt();
    while (arr.includes(tmp)){
        tmp = generateRandomInt();
    }
    return(tmp);
}

function generateRandomInt() {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

// ---------- Sorting Driver ----------
// sortDriver is called when the user clicks the sort button
// inputs = unsorted array, type of sorting algo; returns = sorted arr
function sortDriver(arr, sortingAlgo) {
    if (sortingAlgo == "merge"){
        return (mergeSort(arr));
    }
    if (sortingAlgo == "bubble"){
        return (bubbleSort(arr));
    }
    if (sortingAlgo == "quick"){
        return (quickSort(arr));
    }
    if (sortingAlgo == "heap"){
        return (heapSort(arr));
    }
}


// ---------- Sorting Algorithms ----------
//  For all of my sorting algorithms it is important that I call the buildVisualizer func
//  everytime that I move an element
// Merge Sort
function mergeSort(arr) {
    console.log("Merge");
    return (arr);
}

// Quick Sort
function quickSort(arr) {
    console.log("Quick");
    return (arr);
}

// Bubble Sort
function bubbleSort(arr) {
    console.log("Bubble");
    return (arr);
}

// Heap Sort
function heapSort(arr) {
    console.log("Heap");
    return (arr);
}


// ---------- Display Functions ----------
// constructs the visualization in the DOM
// inputs = arr (either pre, during, or post sorting). returns = nothing
function buildVisualization(arr) {
    // code to remove exising visualization prior to creating the new one
    let old_output_div = document.getElementById('out_div');
    old_output_div.parentNode.removeChild(old_output_div);

    // rendering code
    let output_div = document.createElement('out_div');
    output_div.id = 'out_div';
    let output = document.createElement('p');
    output.innerHTML = arr;
    output_div.appendChild(output);
    document.getElementById('out_container').appendChild(output_div)
}


// Constants for minimum and maximum vals for arr
const MIN = 1;
const MAX = 200;

// Build initial array to be loaded each time the project is loaded
let current_arr = generateArray(5);
buildVisualization(current_arr);


// ---------- Event Listener ----------
var sort_button = document.getElementById('sort');
sort_button.addEventListener('click', function() {
    // define our sorting algo as whichever radio button is clicked
    let sortingAlgo = document.querySelector('input[name = "sorting_algo"]:checked').value;
    // define array length from input
    let arrLength = document.getElementById('Length').value;
    // build an array based on the above parameters
    current_arr = generateArray(arrLength);
    // call the sortDriver with the above established sortingAlgo and array
    sorted_arr = sortDriver(current_arr, sortingAlgo);
    buildVisualization(sorted_arr);
    
})

