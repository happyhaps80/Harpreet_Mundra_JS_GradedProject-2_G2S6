let names = [
  "Software Engineer | John Doe",
  "Software Engineer | Riya",
  "Manager | Rahul Roy",
  "HR | Priya Desai",
  "Manager | Rakesh Ranjan",
  "Manager | Godse",
];
//Sort names in ascending order
let sortedNames = names.sort();

//reference
let input = document.getElementById("input");

//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});
function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}

// -------------------------------------------------------
let j = 0;
f();
document.getElementById("prev").style.visibility = "hidden";
function prev() {
  if (j > 0) {
    f();
    j--;
  }
  if (j == 0) {
    document.getElementById("prev").style.visibility = "hidden";
    document.getElementById("next").style.visibility = "visible";
  } else if (j == 5) {
    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("prev").style.visibility = "visible";
  } else {
    document.getElementById("prev").style.visibility = "visible";
    document.getElementById("next").style.visibility = "visible";
  }
}
function next() {
  if (j <= 5) {
    f();
    j++;
  }
  if (j == 5) {
    document.getElementById("next").style.visibility = "hidden";
  } else if (j == 0) {
    document.getElementById("prev").style.visibility = "hidden";
    document.getElementById("next").style.visibility = "visible";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }
}

function f() {
  fetch("./data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //---------name & application-----
      document.querySelector("#name").innerHTML = data.resume[j].basics.name;
      document.querySelector("#applied").innerHTML =
        data.resume[j].basics.AppliedFor;

      //----------personal info---------
      document.querySelector("#email").innerHTML = data.resume[j].basics.email;
      document.querySelector("#phone").innerHTML = data.resume[j].basics.phone;
      let text = data.resume[j].basics.profiles.network;
      let result = text.link(data.resume[j].basics.profiles.url);
      document.querySelector("#Linkedin").innerHTML = result;

      //---------address---------
      document.querySelector("#address").innerHTML =
        data.resume[j].basics.location.address;
      document.querySelector("#postalCode").innerHTML =
        data.resume[j].basics.location.postalCode;
      document.querySelector("#city").innerHTML =
        data.resume[j].basics.location.city;
      document.querySelector("#state").innerHTML =
        data.resume[j].basics.location.state;

      // ---------skills-------------------
      let i = 0;
      document.getElementById("skills").innerHTML = "";
      while (i < data.resume[j].skills.keywords.length) {
        document.getElementById("skills").innerHTML +=
          "<li> " + data.resume[j].skills.keywords[i] + "</li>";
        i++;
      }

      //--------------------hobbies------------
      i = 0;
      document.getElementById("hobbies").innerHTML = "";
      while (i < data.resume[j].interests.hobbies.length) {
        document.getElementById("hobbies").innerHTML +=
          "<li> " + data.resume[j].interests.hobbies[i] + "</li>";
        i++;
      }

      //--------------work------------------
      document.querySelector("#Company").innerHTML =
        data.resume[j].work["Company Name"];
      document.querySelector("#Position").innerHTML =
        data.resume[j].work.Position;
      document.querySelector("#Start").innerHTML =
        data.resume[j].work["Start Date"];
      document.querySelector("#End").innerHTML =
        data.resume[j].work["End Date"];
      document.querySelector("#Summary").innerHTML =
        data.resume[j].work.Summary;

      //--------------projects---------------
      document.querySelector("#pname").innerHTML = data.resume[j].projects.name;
      document.querySelector("#description").innerHTML =
        data.resume[j].projects.description;

      //--------------Education------------
      document.querySelector("#ugi").innerHTML =
        data.resume[j].education.UG.institute;
      document.querySelector("#ugc").innerHTML =
        data.resume[j].education.UG.course;
      document.querySelector("#ugs").innerHTML =
        data.resume[j].education.UG["Start Date"];
      document.querySelector("#uge").innerHTML =
        data.resume[j].education.UG["End Date"];
      document.querySelector("#ugcg").innerHTML =
        data.resume[j].education.UG.cgpa;

      document.querySelector("#ssi").innerHTML =
        data.resume[j].education["Senior Secondary"].institute;
      document.querySelector("#ssc").innerHTML =
        data.resume[j].education["Senior Secondary"].cgpa;

      document.querySelector("#hsi").innerHTML =
        data.resume[j].education["High School"].institute;
      document.querySelector("#hsc").innerHTML =
        data.resume[j].education["High School"].cgpa;

      //--------------Internship------------
      document.querySelector("#iCompany").innerHTML =
        data.resume[j].Internship["Company Name"];
      document.querySelector("#iPosition").innerHTML =
        data.resume[j].Internship.Position;
      document.querySelector("#iStart").innerHTML =
        data.resume[j].Internship["Start Date"];
      document.querySelector("#iEnd").innerHTML =
        data.resume[j].Internship["End Date"];
      document.querySelector("#iSummary").innerHTML =
        data.resume[j].Internship.Summary;

      //--------------achievements------------
      document.querySelector("#achievements").innerHTML =
        data.resume[j].achievements.Summary;
    })
    .catch(function (err) {
      console.log(err);
    });
}
