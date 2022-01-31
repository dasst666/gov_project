butt.onclick = function() {

    // Taking value from input form in index.html
    var valRU = document.getElementById('elem2').value;
    var IIN_BIN = document.getElementById('elem1').value;

    var valEng;
    if (valRU == "ИИН"){
        valEng = "IIN"
    }else{
        valEng = "BIN"
    }

    // fetching and manipulatin data from api
    fetch(`http://0.0.0.0:8000/get_iin_bin?option=${valEng}&iin_bin=${IIN_BIN}`)
    .then(response => response.json()).then(data => {
        console.log(data.input.iin)
        // document.querySelector("#post-items-container").innerText = data.egov.e_035.fio
        // console.log(data.egov.e_035.fio)
        // console.log(Object.keys(data.browser_tasks.taxpayer_search_iin.kgd_taxpayer_search).length);

        var div = document.getElementById('kgd_items');
        div.innerHTML += " ";

        // checking input value BIN or IIN from html 
        if (valEng == "IIN"){                
        // IIN info display
        

        jsonParsedArray = data.browser_tasks.taxpayer_search_iin.kgd_taxpayer_search;
        for (key in jsonParsedArray) {
            if (jsonParsedArray.hasOwnProperty(key)) {
                console.log(key + " : " + jsonParsedArray[key]);
                var textnode = document.createTextNode(key + " : " + jsonParsedArray[key]); // Create a text node
                var node = document.createElement("LI"); // Create a <li> node
                node.appendChild(textnode);
                document.getElementById("kgd_items").appendChild(node);
            }
          }
          
        }else{
            // BIN info display
            founders = data.egov_bin.e_032["founders"];
            delete data.egov_bin.e_032["founders"];
            jsonParsedArray = data.egov_bin.e_032
            // creating HTML elements for BIN results
            for (key in jsonParsedArray) {
                if (jsonParsedArray.hasOwnProperty(key)) {
                    console.log(key + " : " + jsonParsedArray[key]);
                    var textnode = document.createTextNode(key + " : " + jsonParsedArray[key]); // Create a text node
                    var node = document.createElement("LI"); // Create a <li> node
                    node.appendChild(textnode);
                    document.getElementById("kgd_items").appendChild(node);
                }
              }
            // creating HTML elements for founders in Bin result
            for(i in founders){
                if(founders.hasOwnProperty(i)){
                    var textnode = document.createTextNode(i + " : " + founders[i]); // Create a text node
                    var node = document.createElement("LI"); // Create a <li> node
                    node.appendChild(textnode);
                    document.getElementById("kgd_items").appendChild(node);
                }
            }
        }

        
        
    }).catch(
        console.log('404'),
        document.querySelector("#post-items-container").innerText = "Данные не найдены"
    )
    
};