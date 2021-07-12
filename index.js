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
    while (arr.includes(tmp)) {
        tmp = generateRandomInt();
    }
    return (tmp);
}

function generateRandomInt() {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

// ---------- Sorting Driver ----------
// sortDriver is called when the user clicks the sort button
// inputs = unsorted array, type of sorting algo; returns = sorted arr
function sortDriver(arr, sortingAlgo) {
    if (sortingAlgo == "merge") {
        return (mergeSort(arr));
    }
    if (sortingAlgo == "bubble") {
        return (bubbleSort(arr));
    }
    if (sortingAlgo == "quick") {
        return (quickSort(arr));
    }
    if (sortingAlgo == "heap") {
        return (heapSort(arr));
    }
}


// ---------- Sorting Algorithms ----------
//  For all of my sorting algorithms it is important that I call the buildVisualizer func
//  everytime that I move an element
// ---- Merge Sort ----
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = arr.length / 2;
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return (merge(mergeSort(left), mergeSort(right)));
}

function merge(L, R) {
    let result_arr = [], indexL = 0, indexR = 0;
    while (indexL < L.length && indexR < R.length) {
        if (L[indexL] <= R[indexR]) {
            result_arr.push(L[indexL]);
            indexL += 1;
        }else {
            result_arr.push(R[indexR]);
            indexR += 1;
        }
    }
    while (indexL < L.length) {
        result_arr.push(L[indexL])
        indexL += 1;
    }
    while (indexR < R.length) {
        result_arr.push(R[indexR]);
        indexR += 1;
    }
    return result_arr;
}

// ---- Quick Sort ----
function quickSort(arr) {
    console.log("Quick");
    return (arr);
}

// ---- Bubble Sort ----
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 2; i ++){
        for (let j = 0; j < arr.length - 1; j ++){
            if (arr[j] > arr[j+1]){
                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
    return (arr);
}

// ---- Heap Sort ----
function heapSort(arr) {
    console.log("Heap");
    return (arr);
}

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
        type: 'bar', //bar, horizontalbar, pie, line, doughnut, radar, polarArea
        data: {
            labels: length_arr,
            datasets: [{
                label: 'This should be hidden',
                data: arr,
                backgroundColor: ['turquoise']
            }]
        },
        options: {
            scales: {
                xAxes: [{ gridLines: { display: false } }],
                yAxes: [{ gridLines: { display: false } }]
            },
            legend: {
                display: false,
                labels: { display: false }
            },
            tooltips: { enabled: false }
        }
    });
    out_container.appendChild(myChart);
}

// Constants for minimum and maximum vals for arr
const MIN = 5;
const MAX = 200;

// Build initial array to be loaded each time the project is loaded
let current_arr = generateArray(150);
render(current_arr);


// ---------- Button Listener ----------
var sort_button = document.getElementById('sort');
sort_button.addEventListener('click', function () {
    // define our sorting algo as whichever radio button is clicked
    let sortingAlgo = document.querySelector('input[name = "sorting_algo"]:checked').value;
    sorted_arr = sortDriver(unsorted_arr, sortingAlgo);
    console.log(sorted_arr)
    render(sorted_arr);
});


// ---------- Slider Code ----------
let slider = document.getElementById('length_slider');
let length = slider.value;
let length_label = document.getElementById('length_label');
length_label.textContent = length;


slider.oninput = function() {
    length = slider.value;
    unsorted_arr = generateArray(length);
    length_label.textContent = length;
    render(unsorted_arr);
}


// Code I was considering using if I decide to implement the comparator feature as well as a drop down menu
// div id="toolbar2">
//         <input type="text" id="length2" placeholder="Enter array length">
        
//         <div class="dropdown">
//             <button class="dropbtn">Algorithm 1</button>
//             <div class="dropdown_content">
//                 <p>Merge Sort</p>
//                 <p>Bubble Sort</p>
//                 <p>Quick Sort</p>
//                 <p>Heap Sort</p>
//             </div>
//         </div>
//         <div class="dropdown">
//             <button class="dropbtn">Algorithm 2</button>
//             <div class="dropdown_content">
//                 <p>Merge Sort</p>
//                 <p>Bubble Sort</p>
//                 <p>Quick Sort</p>
//                 <p>Heap Sort</p>
//             </div>
//         </div>
//         <div class="dropdown">
//             <button class="dropbtn">Algorithm 3</button>
//             <div class="dropdown_content">
//                 <p>Merge Sort</p>
//                 <p>Bubble Sort</p>
//                 <p>Quick Sort</p>
//                 <p>Heap Sort</p>
//             </div>
//         </div>
//     </div>