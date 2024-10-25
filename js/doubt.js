// Function to update subjects based on the selected class
function updateSubjects() {
  var classDropdown = document.getElementById("class-dropdown");
  var subjectDropdown = document.getElementById("subject-dropdown");
  var selectedClass = classDropdown.value;

  // Clear existing options
  subjectDropdown.innerHTML = "";

  // Add subjects based on the selected class
  if (selectedClass === "class6") {
    addSubjectOptions(["Mathematics", "Science", "English", "Social Science", "Hindi"]);
  } else if (selectedClass === "class7") {
    addSubjectOptions(["Mathematics", "Science", "English", "Social Science", "Hindi"]);
  } else if (selectedClass === "class8") {
    addSubjectOptions(["Mathematics", "Science", "English", "Social Science", "Hindi"]);
  } else if (selectedClass === "class9") {
    addSubjectOptions(["Mathematics", "Science", "English", "Social Science", "Hindi"]);
  } else if (selectedClass === "class10") {
    addSubjectOptions(["Mathematics", "Science", "English", "Social Science", "Hindi"]);
  }

  function addSubjectOptions(subjects) {
    subjects.forEach(function (subject) {
      var option = document.createElement("option");
      option.value = subject.toLowerCase();
      option.text = subject;
      subjectDropdown.add(option);
    });
  }
}

// Function to display the selected image in the image-preview element
function displayImage() {
  var fileInput = document.getElementById("file-input");
  var imagePreview = document.getElementById("image-preview");
  var removeFileButton = document.getElementById("remove-file");

  // Check if a file is selected
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    // Read the selected image as a data URL
    reader.readAsDataURL(fileInput.files[0]);

    // Show the remove file button
    removeFileButton.style.display = "inline-block";
  }
}

// Function to remove the selected file and reset the file input
function removeFile() {
  var fileInput = document.getElementById("file-input");
  var imagePreview = document.getElementById("image-preview");
  var removeFileButton = document.getElementById("remove-file");

  // Reset the file input
  fileInput.value = "";

  // Hide the remove file button
  removeFileButton.style.display = "none";

  // Clear the image preview
  imagePreview.src = "";
}

// Function to handle doubt submission
// Function to handle doubt submission

async function submitDoubt() {
  var selectedClass = document.getElementById("class-dropdown").value;
  var selectedSubject = document.getElementById("subject-dropdown").value;
  var imageInput = document.getElementById("file-input");
  var doubtText = document.getElementById("doubt-textarea").value;

  // Check if a file is selected
  if (imageInput.files && imageInput.files[0]) {
    var formData = new FormData();
    formData.append("user", "John Doe"); 
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("description", doubtText);
    formData.append("image", imageInput.files[0]);

    // Use fetch to send the data to the server
    try {
      const response = await fetch("http://localhost:5000/submitDoubt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Doubt submitted successfully");
        getAllDoubts();
        // Reset the form
        document.getElementById("class-dropdown").value = "class6"; // Set the default class if needed
        document.getElementById("subject-dropdown").innerHTML = ""; // Clear subject dropdown
        document.getElementById("file-input").value = ""; // Clear file input
        document.getElementById("image-preview").src = ""; // Clear image preview
        document.getElementById("doubt-textarea").value = ""; // Clear doubt textarea

        // Hide the remove file button
        document.getElementById("remove-file").style.display = "none";
      } else {
        console.error("Error submitting doubt");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("No image selected");
  }
}

// Function to fetch and display all doubts
// Existing functions...

// Function to fetch and display all doubts


function toggleFormVisibility() {
  const formContainer = document.getElementById("floating-form-container");
  const overlay = document.querySelector(".floating-form-overlay");

  if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
      overlay.style.display = "block";
  } else {
      formContainer.style.display = "none";
      overlay.style.display = "none";
  }
}
function openDetailedTile(doubt) {
  // Create a modal for the detailed view
  const modal = document.createElement("div");
  modal.className = "detailed-tile-modal";

  // Create a container for the detailed content
  const detailedContainer = document.createElement("div");
  detailedContainer.className = "detailed-container";

  // Create the image element for detailed view
  const detailedImage = document.createElement("img");
  detailedImage.src = `http://localhost:5000/uploads/${doubt._id}.${doubt.file_type}`;
  detailedImage.alt = "Doubt Image";
  detailedImage.className = "detailed-image";

  // Create the detailed information container
  const detailedInfoContainer = document.createElement("div");
  detailedInfoContainer.className = "detailed-info-container";

  // Populate user, class, subject, and description information
  const detailedUserInfo = document.createElement("p");
  detailedUserInfo.className = "detailed-info-text";
  detailedUserInfo.innerText = `Posted by User: ${doubt.user}`;

  const detailedClassInfo = document.createElement("p");
  detailedClassInfo.className = "detailed-info-text";
  detailedClassInfo.innerText = `Class: ${doubt.class}`;

  const detailedSubjectInfo = document.createElement("p");
  detailedSubjectInfo.className = "detailed-info-text";
  detailedSubjectInfo.innerText = `Subject: ${doubt.subject}`;

  const detailedDescriptionInfo = document.createElement("p");
  detailedDescriptionInfo.className = "detailed-info-text";
  detailedDescriptionInfo.innerText = `Description: ${doubt.description}`;

  // Create a rectify textbox
  const rectifyTextbox = document.createElement("textarea");
  rectifyTextbox.id = "rectify-textbox";
  rectifyTextbox.placeholder = "Rectify the doubt...";

  // Create a submit button for rectification
  const rectifyButton = document.createElement("button");
  rectifyButton.innerText = "Rectify";
  rectifyButton.addEventListener("click", function () {
    const rectificationText = rectifyTextbox.value;
    // Handle rectification (send to server, update UI, etc.)
    console.log("Rectification:", rectificationText);
    // Close the detailed tile modal
    modal.style.display = "none";
  });

  // Append detailed information and rectify elements to the detailed info container
  detailedInfoContainer.appendChild(detailedUserInfo);
  detailedInfoContainer.appendChild(detailedClassInfo);
  detailedInfoContainer.appendChild(detailedSubjectInfo);
  detailedInfoContainer.appendChild(detailedDescriptionInfo);

  // Append image and detailed info container to the detailed container
  detailedContainer.appendChild(detailedImage);
  detailedContainer.appendChild(detailedInfoContainer);
  detailedContainer.appendChild(rectifyTextbox);
  detailedContainer.appendChild(rectifyButton);

  // Append the detailed container to the modal
  modal.appendChild(detailedContainer);

  // Append the modal to the body
  document.body.appendChild(modal);

  // Close the modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
}




// Function to fetch and display all doubts
async function getAllDoubts() {
  try {
    const response = await fetch("http://localhost:5000/allDoubts");
    const data = await response.json();

    const allDoubtsContainer = document.getElementById("all-doubts-list");
    allDoubtsContainer.innerHTML = ""; // Clear existing list

    data.forEach(async (doubt) => {
      const tile = document.createElement("div");
      tile.className = "doubt-tile";
      tile.setAttribute("data-doubt-id", doubt._id); // Add a data attribute for the doubt ID

      // Create the image element
      const imageElement = document.createElement("img");
      imageElement.src = `http://localhost:5000/uploads/${doubt._id}.${doubt.file_type}`;
      imageElement.alt = "Doubt Image";

      // Create the doubt information container
      const infoContainer = document.createElement("div");
      infoContainer.className = "doubt-info";

      // Populate user, class, subject, and description information
      const userInfo = document.createElement("p");
      userInfo.className = "info-text";
      userInfo.innerText = `Posted by User: ${doubt.user}`;

      const classInfo = document.createElement("p");
      classInfo.className = "info-text";
      classInfo.innerText = `Class: ${doubt.class}`;

      const subjectInfo = document.createElement("p");
      subjectInfo.className = "info-text";
      subjectInfo.innerText = `Subject: ${doubt.subject}`;

      const descriptionInfo = document.createElement("p");
      descriptionInfo.innerText = `Description: ${doubt.description}`;

      // Append information to the container
      infoContainer.appendChild(userInfo);
      infoContainer.appendChild(classInfo);
      infoContainer.appendChild(subjectInfo);

      // Append image and information container to the tile
      tile.appendChild(infoContainer);
      tile.appendChild(imageElement);
      tile.appendChild(descriptionInfo);

      // Add a click event listener to each doubt tile
      tile.addEventListener("click", function () {
        openDetailedTile(doubt);
      });

      // Append the tile to the allDoubtsContainer
      allDoubtsContainer.appendChild(tile);
    });

    console.log("Doubts fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching doubts:", error);
  }
}

// ... (Your existing code)

// Call getAllDoubts when the page loads
window.onload = getAllDoubts;
