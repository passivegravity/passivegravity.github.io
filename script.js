function sendToDiscord() {
    // Check if the user has exceeded the submission limit
    if (hasExceededSubmissionLimit()) {
      console.log('Submission limit exceeded');
      return;
    }
  
    // Get the form values
    var username = document.getElementById('username').value;
    var codingLanguage = document.getElementById('coding-language').value;
    var ideaDescription = document.getElementById('idea-description').value;
  
    // Webhook URL
    var webhookURL = "https://discord.com/api/webhooks/1111782512113496074/dieib7Ny335uWYxDsOaWNBteG_67S_vuEPIG7xxzeECpKRDlI7rYn_Wgw63c0ZDl5Xtv";
  
    // Set the color for the embed (magenta)
    var embedColor = "#FF00FF";
  
    // Construct the webhook payload
    var payload = {
      username: 'Form Submission',
      embeds: [
        {
          color: parseInt(embedColor.replace("#", ""), 16),
          fields: [
            { name: 'Username', value: username },
            { name: 'Coding Language', value: codingLanguage },
            { name: 'Idea Description', value: ideaDescription }
          ]
        }
      ]
    };
  
    // Send the payload to the Discord webhook using axios
    axios.post(webhookURL, payload)
      .then(function(response) {
        console.log('Form submission sent to Discord');
        // Add any success handling here
  
        // Update the submission count for the current IP or machine
        updateSubmissionCount();
  
        // Check if the submission limit has been reached
        if (hasExceededSubmissionLimit()) {
          // Hide the submit button and show the "Limit API" text
          var submitButton = document.getElementById('submit-button');
          var limitText = document.getElementById('limit-text');
  
          submitButton.style.display = 'none';
          limitText.style.display = 'block';
        }
      })
      .catch(function(error) {
        console.error('Error sending form submission to Discord:', error);
        // Add any error handling here
      });
  }
  
  function hasExceededSubmissionLimit() {
    var submissionCount = getSubmissionCount();
    return submissionCount >= 2;
  }
  
  function getSubmissionCount() {
    // Get the submission count from local storage or cookies
    var submissionCount = localStorage.getItem('submissionCount');
  
    // If no submission count exists, initialize it to 0
    if (!submissionCount) {
      submissionCount = 0;
    }
  
    return parseInt(submissionCount);
  }
  
  function updateSubmissionCount() {
    var submissionCount = getSubmissionCount();
    submissionCount++;
  
    // Update the submission count in local storage or cookies
    localStorage.setItem('submissionCount', submissionCount);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const inputFields = document.getElementsByClassName("input-field");
  
    Array.from(inputFields).forEach(function(field) {
      const maxLength = field.getAttribute("maxlength");
      const charCount = field.nextElementSibling;
  
      field.addEventListener("input", function() {
        const remainingChars = maxLength - this.value.length;
        charCount.textContent = remainingChars;
      });
    });
  });
  