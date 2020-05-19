
## Requirements:
1. The list of cryptoCurrencies should be acquired from "https://www.stackadapt.com/coinmarketcap/map"
2. The list of prices for cryptocurrency should be acquired from https://www.stackadapt.com/coinmarketcap/quotes?id=[currencyId]
3. In the initial render, the table should first 5 currency ids details with price information.
4. The user should be able to sort by rank and price columns.
5. The user should be able to delete currency from the table until 1 is left. The deleted currency should be added to the dropdown.
6. The user should be able to add currency from the dropdown to the table until the table does not have 10 rows.
7. The currency list in the dropdown should exclude the currencies shown in the table.

## Design Decisions
1. I have used ant design libraries to render the UI. This way we will not reinvent the wheel and use industry-wide best practices when designing the UI.
2. The list of cryptocurrencies is too big to be shown as a simple dropdown. This simple dropdown approach creates performance issues as we are rendering 2000+ components to the drop-down list. I have categorized the content by the initial character used in the currency name. This has led to us rendering at max 300 elements per category. It allows the user to better navigate through the options and huge performance gain.
3. The inbuilt capabilities of the ant table library are used to provide the user with sorting capabilities.
4. Redux saga has been used to manage async actions. Thanks to generator functions, we can write asynchronous code, in a synchronous manner. It has allowed me to code while keeping redux core concepts in the fore-front.
5. If an error is caused while getting data from the backend, it is the responsibility of the backend to provide human-understandable details on the error message.
Architecture
 
![Architecture Overview](https://github.com/manjeet5/cryptocurrency/blob/dropdown/assets/architecture.png "Architecture Overview")

Please note that the above diagram is high level, there is scope to go into more detail regarding how the sagas are being used.

## Reflection
1. The current approach makes the project very extensible. If we were to add new functionalities, it could be very easily added without impacting existing functionalities.  However, the content of the dropdown is not normalized correctly. That could be a problem if we were to add the functionality to rename currencies.
2. The design decision to show categories in the dropdown list provides performance gain. But it could be improved depending on further conversations with the product manager. We could categorize based on ranks or other forms as well, to make the list smaller. This way the user could reach the currency they want to add more optimally.
3. There are no tests for this project. This will not be acceptable in the production-grade code. But due to time constraints, I will leave this topic for now.
4. The loading states are not captured in this project as well. I would have liked to create a loading reducer similar to error reducer, that would tackle all the loading states in the UI. This should improve the user experience as the user will get visual affirmation regarding their actions.
5. The limitations to add or delete currency from the table are handled using a silent kill approach - where the buttons are disabled. We could build a centralized notification reducer to let the user know why the button is disabled.

This doc is just a simple explanation of the design and architecture decisions. For more details and info, just reach out to me :-) 

## Run the project locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

