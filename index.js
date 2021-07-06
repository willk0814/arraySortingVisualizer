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
        var tmp = arr;
        return (mergeSort(arr, 0, arr.length, tmp));
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
// ---- Merge Sort ----
function mergeSort(arr, leftStart, rightEnd, tmp) {
    console.log('Reached Merge Sort');
    if (leftStart >= rightEnd){
        return;
    }
    var middle = (leftStart + rightEnd) / 2;
    // Call mergeSort on each of the halves
    mergeSort(arr, leftStart, middle);
    mergeSort(arr, middle + 1, rightEnd);
    mergeHalves(arr, leftStart, rightEnd);
}

function mergeHalves(arr,leftStart, rightEnd, tmp) {
    console.log('Reached MergeHalves()');
    var leftEnd = (rightEnd + leftStart) / 2;
    var rightStart = leftEnd + 1;
    var size = rightEnd - leftStart + 1;

    var left_index = leftStart;
    var right_index = rightStart;
    var tmp_index = leftStart;

    while (left_index <= leftEnd && right_index <= rightEnd){
        if (arr[left_index] <= arr[right_index]){
            tmp[tmp_index] = arr[left_index];
            left_index += 1;
            console.log("left_index: " + left_index);
        } else{
            tmp[tmp_index] = arr[right_index];
            right_index +=1;
            console.log("right_index: " + left_index);
        }
        tmp_index += 1;
    }
    // Need to copy array over here
}

// ---- Quick Sort ----
function quickSort(arr) {
    console.log("Quick");
    return (arr);
}

// ---- Bubble Sort ----
function bubbleSort(arr) {
    console.log("Bubble");
    return (arr);
}

// ---- Heap Sort ----
function heapSort(arr) {
    console.log("Heap");
    return (arr);
}


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// ---------- Display Functions ----------
// constructs the visualization in the DOM
// inputs = arr (either pre, during, or post sorting). returns = nothing
function render(arr) {
    length_arr = [];
    for (let i = 0; i < arr.length; i++) {
        length_arr[i] = i;
    }


    // delete the current chart before building the new one
    let current_chart = document.getElementById('myChart');
    current_chart.parentNode.removeChild(current_chart);

    let out_container = document.getElementById('out_container')
    let myChart = document.createElement('canvas');
    myChart.id = 'myChart'; 

    let arrChart = new Chart(myChart, {
        type: "bar", //bar, horizontalbar, pie, line, doughnut, radar, polarArea
        data: {
            labels: length_arr,
            datasets: [{
                label:'',
                data: arr
            }]
        },
        options: {
            legend: {
                display:false,
                labels: {
                    display:false
                }
            },
            tooltips: {
                enabled:false
            }

        }
    })
    out_container.appendChild(myChart);
}

// Constants for minimum and maximum vals for arr
const MIN = 5;
const MAX = 200;

// Build initial array to be loaded each time the project is loaded
let current_arr = generateArray(150);
render(current_arr);


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
    render(current_arr)
    sorted_arr = sortDriver(current_arr, sortingAlgo);
    render(sorted_arr);
      
})

