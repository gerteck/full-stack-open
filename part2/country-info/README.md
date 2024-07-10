# Country-Info Application

At https://studies.cs.helsinki.fi/restcountries/ we can find a service that offers a lot of information related to different countries in a so-called machine-readable format via the REST API. This is an application that allows you to view information from different countries.

General Idea:

**Ex 2.18**
* Queries for all Countries
* Search Field that filters countries to be shown
* If only one country, show info

**Ex 2.19**
* When there are multiple countries, show button will retrieve data for that country.

**Ex 2.20**
* Add weather report for the capital of country, when only one country shown.

Open Weather API Key in `.env.local` in project root:
```
VITE_OPEN_WEATHER_API_KEY=<INSERTKEYHERE>
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

