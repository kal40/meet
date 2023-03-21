Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the main page was open
When user does not specify the number of events to be shown
Then the user will receive the first 32 upcoming events on the screen

Scenario: User can change the number of events they want to see
Given the main page was open
When user types on the number of events to be shown
Then user will receive the “typed” number of upcoming events on the screen
