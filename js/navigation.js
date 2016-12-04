
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails() {
   $("#dvPersonalDetails").hide();
   $("#dvQuoteDetails").hide();
   $("#dvCarDetails").show();
   setActiveNavigation("carLink");
    // Hide the personal details section (dvPersonalDetails)
    // Hide the quote section (dvQuoteDetails)
    // Show the car details section (dvCarDetails)

  }

  function showPersonalDetails() {

  $("#dvCarDetails").hide();
  $("#dvQuoteDetails").hide();
  $("#dvPersonalDetails").show();
  setActiveNavigation("personalLink");
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
  }

  function showQuoteDetails() {
  $("#dvCarDetails").hide();
  $("#dvQuoteDetails").hide();
  $("#dvPersonalDetails").show();
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote() {

    //Perform validation to test that all data has been entered
    $("#dvCarDetails").hide();
    var emptyfields = validate fields("dvCarDetails");

    if (emptyfields === 0 )
    {
    var Gender = $("#dvPersonalDetails input: Radio[name = genderInput]:checked").val();
    var Age = $("#txtAge").val();
    var YearOfNoClaims = $("#dvPersonalDetails input: Radio[name = noclaimsInput]:checked").val();
    var CostOfCar = $("#txtEstimatedValue").val();
    var CarStorage = $("#storageInput").val();
    }

      //Get the values from the page elements that you need to create your JSON

      $.ajax({
          type: "GET",
          url: "http://localhost:53753/api/rating/CalculateRates",
          data: { (gender:Gender,age:Age,noClaimsBonus:YearOfNoClaims,costOfCar:CostOfCar,carStorage:CarStorage)}
        }).done(function(msg) {
          // Put the return value into Label created on quote details
          $("#dvQuoteDetails").text(msg.result);
          // Hide the Car Details section
          // Display the quote details page
      });
  }

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
