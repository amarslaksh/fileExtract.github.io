let result = '';
let fileName = '';
/*on change will get the data from upload
in event we have all file related information*/
function getFileDetails(event) {
    fileName = event.files[0].name.split('.').pop();
    if(fileName == 'txt') {
        event.files[0].text().then(
            function (data) {
                result = Array.of(data.split('\n').join('\n'));
                getFileInfo(result);
            }
        );
    } else {
        alert('Please upload only txt files');
    }
}
//getting the file details and looping through the necessary details
function getFileInfo(result) {
    let data;
    for(let row of result){
        //separate using Experience keyword - considering every resume must have this keyword
        data = row.substring(row.indexOf("Experience")).split(/[)]/);
        let splitData = data.filter((val,index) => {
            let values = val[index].split('\n');
            return values;
        });
        getDataObject(splitData);

    }
}
let completeData = [];

//get the data list from the filtered values and pushing values
function getDataObject(objects) {
    let convertStr = objects.toString().split(',');
    let spliceData = convertStr.slice(0,3)
    for(let i=0; i<spliceData.length; i++) {
        let splitVal = spliceData[i].split('\n');
        completeData.push({
            title: splitVal[1],
            year: splitVal[2].concat(')')
        });
    }

    let desc = convertStr.slice(3,convertStr.length-1);
    let year = desc[28].toString().split('[-\n]').concat(')');
    desc.map(function(val, index) {
        if(val.indexOf('Directeur') !== -1) {
            let title = val.toString().split('\n');
            completeData.push({
                title: title[2] + title[3],
                year: year.toString().replace(/\n/g,' ')
            });
        } else if(val.indexOf('Responsable Marketing') !== -1 ||
            val.indexOf('Responsable Marché ') !== -1) {
            let title = val.toString().split('\n');
            completeData.push({
                title: title[1],
                year: title[2] + title[3].concat(')')
            });
        }
    });
    document.getElementById('result').textContent = JSON.stringify(completeData);
}

