Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given the main page was open 
When the user see list of events are loaded
Then the details of the events are invisible

Scenario: User can expand an event to see its details
Given the main page was open
When the user see list of events are loaded
And click on the “Show Details” button on any of the event card
Then specific event is being expanded with details and the „Show Details” button is replace by the „Hide Details” button

Scenario: User can collapse an event to hide its details
Given the main page was open
And the user clicked on the “Show Details” button on any of the event card
When user clicks on the “Hide Details” button on any of the event cards that were clicked in the previous step
Then the specific event is being collapsed and the event card will be shown without details
