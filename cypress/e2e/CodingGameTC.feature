Feature:  Flight search Feature
  Scenario: Searching for Skyscanner website
    Given A user opens Google page
    When  A user search for "Skyscanner"
    Then  The "Skyscanner" is displayed as first website in the SRP 
  Scenario: Searching for available fliths 
    Given A user opens the website
    When  A user select one-way Flight
    When  A user set "Paris Orly" as departure
    When  A user set "TNG" as destination
    When  A user set departure date as Day:"29",Month:"décembre",Year:"2022"
    When  A user select direct Flight
    When  A user clicks on search button
    Then  The SRP is openened ,all flights displayed parts from "ORY" to "TNG" and all flights are direct  
  