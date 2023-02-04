

window.onload = () => {
    const inputCount = 3;
    const inputArray = document.querySelector('.inputArray');
    const addInputBtn = document.querySelector('#addInputBtn');

    function drawResultsTable(sum, avg, min, max) {
        let table = document.querySelector('.results');
        table.innerHTML = '';
        let tableBody = document.createElement('tbody');
      
        let tableData = [
            ["Sum", "Average", "Min", "Max"],
            [sum, avg, min, max]
        ]

        tableData.forEach(function(rowData) {
          let row = document.createElement('tr');
      
          rowData.forEach(function(cellData) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });
      
          tableBody.appendChild(row);
        });
      
        table.appendChild(tableBody);
      }

    function calculateResult() {
        let values = [];
        document.querySelectorAll('.inputContainer>input[type=number]').forEach(node => {
            values.push(parseInt(node.value));
        });

        let sum = values.reduce((partialSum, a) => partialSum + a, 0);
        let average = sum / values.length;
        let min = Math.min(...values);
        let max = Math.max(...values);

        drawResultsTable(sum, average, min, max);

    }

    function addInputField() {
        let inputContainer = document.createElement('div')
        inputContainer.setAttribute('class', 'inputContainer')

        let inputCloseButton = document.createElement('p')
        inputCloseButton.innerText = "X"
        inputCloseButton.addEventListener('click',() => {inputArray.removeChild(inputContainer); calculateResult()})

        let inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'number');
        inputElement.addEventListener('keyup', calculateResult);
        inputElement.value = 0;

        inputContainer.appendChild(inputElement)
        inputContainer.appendChild(inputCloseButton)
        inputArray.insertBefore(inputContainer, addInputBtn);
    }

    addInputBtn.addEventListener('click', ()=>{addInputField(); calculateResult()});

    for (let i = 0; i < inputCount; i++)
        addInputField();

    drawResultsTable(0, 0, 0, 0);
}