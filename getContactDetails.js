function getData() {
  setTimeout(function() {
    var all_profile_data = document.body.innerHTML.replace(/\n/g, '').replace(/pv-profile-section pv-browsemap-section profile-section artdeco-container-card ember-view.*?<\/section/, '');
    var phoneArr = [];
    var emailArr = [];
    var emailFinder = all_profile_data.replace(/\\n/g, '').match(/\w+@\w+\.\w{2,5}\b|\w+\.\w+@\w+\.\w{2,5}\b|\w+_\w+@\w+\.\w{2,5}\b|\w+-\w+@\w+\.\w{2,5}\b|\w+\.\w+\.\w+@\w+\.\w{2,5}\b/g);
    if (emailFinder) {
      for (eml = 0; eml < emailFinder.length; eml++) {
        emailArr.push(emailFinder[eml]);
      }
    }
    var cleanEmail = emailArr.toString().replace(/.+@linkedin.com/g, '').replace(/^,/, '');
    var cleanEmailArr = JSON.parse('["' + cleanEmail.replace(/,/g, '","') + '"]');
    var phoneFinder = all_profile_data.match(/\b\d{3}-\d{3}-\d{4}\b|\b\d{3}\)-\d{3}-\d{4}\b|\b\d{3}\)\s*\d{3}-\d{4}\b|\b\d{3}\.\d{3}\.\d{4}\b/g);
    if (phoneFinder) {
      for (eml = 0; eml < phoneFinder.length; eml++) {
        var remove_commercial = phoneFinder[eml].replace(/^999.*|^833.*|^844.*|^855.*|^866.*|^800.*|^888.*|^1.*|^900.*|^877.*|^0.*/g, '');
        if (remove_commercial.length > 0) {
          phoneArr.push(remove_commercial);
        }
      }
    }
    var uniqueArr = function(arrArg) {
      return arrArg.filter(function(elem, pos, arr) {
        return arr.indexOf(elem) == pos;
      });
    };
    var phones = uniqueArr(phoneArr);
    var emails = uniqueArr(cleanEmailArr);
    if (phones.length > 0) {
      var data_output = phones + ', ' + emails;
    } else {
      var data_output = emails;
    }

    var createModElm = document.createElement("input");
    document.body.appendChild(createModElm);
    createModElm.setAttribute("id", "modalpop");
    document.getElementById("modalpop").value = data_output;
    createModElm.style.display = "block";
    createModElm.style.position = "fixed";
    createModElm.style.top = "1px";
    createModElm.style.left = "20%";
    createModElm.style.height = "5%";
    createModElm.style.width = "50%";
    createModElm.style.border = "3px solid blue";
    createModElm.style.background = "lightblue";
    createModElm.style.borderRadius = "10px";
    createModElm.style.zIndex = "10000";
    createModElm.select();
    document.execCommand("copy");
	document.body.removeChild(createModElm);
	alert(data_output +" has been copied to your clipboard");
	
  }, 60);
}

function clickButtons(classname) {
  var exta_profile_data = document.getElementsByClassName(classname);
  if (exta_profile_data.length > 0) {
    var extra_showState = exta_profile_data[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerText;
    var extra_showButton = exta_profile_data[0].getElementsByTagName("button")[0];
    if (extra_showState === "Show more ") {
      extra_showButton.click();
    }
  }
}
var btnclick = new Promise(function(resolve, reject) {
  resolve(clickButtons("pv-top-card-section__summary mt4 ember-view"));
});
btnclick.then(clickButtons("pv-profile-section pv-contact-info artdeco-container-card ember-view")).then(getData())
