var count = 0;

function createForm(formTitle) {
    var getWrapRight = document.getElementById('wrap-right');
    const formBuild = document.createElement('div');
    formBuild.classList.add('form-build');
    formBuild.innerHTML = `
        <div id="form-wrap">
            <div id="form-head">
                <div id="form-title">${formTitle}</div>
                <button id="form-exit" onClick="removeForm(this)">X</button>
            </div>
            <div id="form-body">
                <div class="group type">
                    <label>Type</label>
                    <select>
                        <option value="text">text</option>
                        <option value="button">button</option>
                        <option value="email">email</option>
                        <option value="number">number</option>
                        <option value="password">password</option>
                    </select>
                </div>

                <div class="group label">
                    <label>Label</label>
                    <div class="wrap-input">
                        <input type="text">
                        <span></span>
                    </div>
                </div>

                <div class="group name">
                    <label>Name</label>
                    <div class="wrap-input">
                        <input type="text">
                        <span></span>
                    </div>
                </div>

                <div class="group id">
                    <label>Id</label>
                    <div class="wrap-input">
                        <input type="text">
                        <span></span>
                    </div>
                </div>

                <div class="group placeholder">
                    <label>Placeholder</label>
                    <div class="wrap-input">
                        <input type="text">
                        <span></span>
                    </div>
                </div>

                <div class="group require">
                    <label>Require</label>
                    <span class="span-check">
                        <input type="checkbox">
                    </span>
                </div>
            </div>
        </div>
    `;
    getWrapRight.appendChild(formBuild);
}

function removeForm(button) {
    var formWrap = button.parentNode.parentNode.parentNode;
    formWrap.remove();
}

function addFormInput() {
    count++;
    const formTitle = 'Input field';
    createForm(formTitle);
}

function addFormTextarea() {
    count++;
    const formTitle = 'Textarea field';
    createForm(formTitle);

    let listFormBuild = document.querySelectorAll('.form-build');
    for (const iterator of listFormBuild) {
        if(iterator.querySelector('#form-title').textContent == formTitle) {

            let listOption = iterator.querySelectorAll('option');
            for (const i of listOption) {
                if (i.value == 'text') {
                    continue;
                }
                else {
                    i.parentNode.removeChild(i);
                }
            };

            const groupRow = document.createElement('div');
            groupRow.classList.add('group','row');
            groupRow.innerHTML = `
                <label>Row</label>
                <input type="number" value="30" min=0>
            `;
            iterator.querySelector('#form-wrap').appendChild(groupRow);

            const groupCol = document.createElement('div');
            groupCol.classList.add('group','column');
            groupCol.innerHTML = `
                <label>Column</label>
                <input type="number" value="10" min=0>
            `;
            iterator.querySelector('#form-wrap').appendChild(groupCol);
        }
    }
}

function addFormBtn() {
    count++;
    const formTitle = 'Button field';
    createForm(formTitle);

    let listFormBuild = document.querySelectorAll('.form-build');
    for (const iterator of listFormBuild) {
        if(iterator.querySelector('#form-title').textContent == formTitle) {
            iterator.querySelector('select').value = 'button';

            let listOption = iterator.querySelectorAll('option');
            for (const i of listOption) {
                if (i.value == 'button') {
                    continue;
                }
                else {
                    i.parentNode.removeChild(i);
                }
            };
        }
    }
}

function createNew() {
    let listFormBuild = document.querySelectorAll('.form-build');
    let wrapRight = document.querySelector('#wrap-right');
    for (const iterator of listFormBuild) {
        wrapRight.removeChild(iterator);
    }
}

function setData(myObj, element) {
    myObj.valueTitle = element.querySelector("#form-title").textContent;
    myObj.valueType = element.querySelector("select").value;
    myObj.valueLabel = element.querySelector('.label input').value;
    myObj.valueName = element.querySelector('.name input').value;
    myObj.valueId = element.querySelector('.id input').value;
    myObj.valuePlaceholder = element.querySelector('.placeholder input').value;
    const require = element.querySelector('.require input');
    const isChecked = require.checked;
    if (isChecked) {
        myObj.valueRequire = true;
    }
    else {
        myObj.valueRequire = false;
    }
}

function saveData() {
    const arrTemp = [];
    const listForm = document.querySelectorAll('.form-build');
    // console.log(listForm.length);
    for (let index = 0; index<listForm.length; index++) {
        const element = listForm[index];
        var formTitles = element.querySelector('#form-title').textContent;
        // console.log(formTitle);

        switch (formTitles) {
            case 'Input field':
                const inputForm = {};
                setData(inputForm, element);
                if(validateCheck(element)) {
                    arrTemp.push(inputForm);
                }
                break;
            case 'Textarea field':
                const textareaForm = {};
                setData(textareaForm, element);
                if(validateCheck(element)) {
                    arrTemp.push(textareaForm);
                }
                break;
            case 'Button field':
                const buttonForm = {};
                setData(buttonForm, element);
                if(validateCheck(element)) {
                    arrTemp.push(buttonForm);
                }
                break;

            default:
                break;
            }
    }

    const myArr = JSON.stringify(arrTemp); 
    if(localStorage.getItem('FORMSDATA')) {
        localStorage.setItem('FORMSDATA', myArr);
    }
    else {
        localStorage.setItem('FORMSDATA', myArr);
    }

}

function showForms() {
    window.location.href = 'show.html';
}

function setValueForForms(element, item) {
    element.querySelector('select').value = item.valueType.trim();
    element.querySelector('.label input').value = item.valueLabel.trim();
    element.querySelector('.name input').value = item.valueName.trim();
    element.querySelector('.id input').value = item.valueId.trim();
    element.querySelector('.placeholder input').value = item.valuePlaceholder.trim();
    const checkbox = item.valueRequire;
    if (checkbox) {
        element.querySelector('.require input').checked = true;
    } 
    else {
        element.querySelector('.require input').checked = false;
    }
}

(function loadData() {
    const dataArr = localStorage.getItem('FORMSDATA');
    const convertDataArr = JSON.parse(dataArr);
    console.log(convertDataArr);
    for (const item of convertDataArr) {
        console.log(item);
        switch (item.valueTitle) {
            case 'Input field':
                addFormInput();
                break;
            case 'Textarea field':
                addFormTextarea();
                break;
            case 'Button field':
                addFormBtn();
                break;
            default:
                break;
        }
    }

    const listForm = document.querySelectorAll('.form-build');
    for (let i = 0; i < listForm.length; i++)  {
        if (convertDataArr[i].formTitle == 'Textarea field') {
            listForm[i].querySelector('.row input').value = convertDataArr[i].valueRow;
            listForm[i].querySelector('.column input').value = convertDataArr[i].valueColumn;
        }
        setValueForForms(listForm[i], convertDataArr[i]);
    }
})();

function validateCheck(item) {
    var result = true;
    const listForm = document.querySelectorAll('.form-build');
    const label = item.querySelector('.label input');
    const name = item.querySelector('.name input');
    const id = item.querySelector('.id input');

    const errorLabel = item.querySelector('.label span'); 
    const errorName = item.querySelector('.name span'); 
    const errorId = item.querySelector('.id span'); 

    if(label.value.trim() === '') {
        errorLabel.innerHTML = 'Trường này không được trống!';
        errorLabel.style.color = 'red';
        label.style.borderColor = 'red';
        result = false;
    }
    else {
        errorLabel.innerHTML = '';
        errorLabel.style.color = '';
        label.style.borderColor = '';
    }

    if(name.value.trim() === '') {
        errorName.innerHTML = 'Trường này không được trống!';
        errorName.style.color = 'red';
        name.style.borderColor = 'red';
        result = false;
        
    }
    else {
        errorName.innerHTML = '';
        errorName.style.color = '';
        name.style.borderColor = '';
        validateName(name, errorName, result);
    }

    if(id.value.trim() === '') {
        errorId.innerHTML = 'Trường này không được trống!';
        errorId.style.color = 'red';
        id.style.borderColor = 'red';
        result = false;
    }
    else {
        errorId.innerHTML = '';
        errorId.style.color = '';
        id.style.borderColor = '';
        validateId(id, errorId, result);
    }
    
    return result;
}

function validateName(name, errorName, result) {
    // Biểu thức chính quy để kiểm tra
    var nameRegex = /^[a-zA-Z][a-zA-Z0-9-_]*$/;

    // Kiểm tra nếu tên hợp lệ
    if (!nameRegex.test(name.value)) {
        errorName.innerHTML = 'Tên bắt đầu bằng một chữ cái(a-z hoặc A-Z), tên có thể chứ các chữ cái (a-z hoặc A-Z)!' 
        + 'chữ số (0-9), dấu gạch dưới(_), hoặc dấu gạch ngang(-)';
        errorName.style.color = 'red';
        name.style.borderColor = 'red';
        result = false;   
    }
    return result;
}

function validateId(id, errorId, result) {
     // Biểu thức chính quy để kiểm tra
    var idRegex = /^[a-zA-Z][a-zA-Z0-9-_]*$/;

    // Kiểm tra nếu ID hợp lệ
    if (!idRegex.test(id.value)) {
        errorId.innerHTML = 'Tên bắt đầu bằng một chữ cái(a-z hoặc A-Z), tên có thể chứ các chữ cái (a-z hoặc A-Z)!' 
        + 'chữ số (0-9), dấu gạch dưới(_), hoặc dấu gạch ngang(-)';
        errorId.style.color = 'red';
        id.style.borderColor = 'red';
        result = false;
    }
    return result;
}



  
