import React, { useState } from "react";
import { useCountry, useCountryWithName, useField } from "./hooks";

const Country = ({ country }) => {
  // country is the object returned by the useCountry hook
  if (!country) {
    return <div>Type to start searching, e.g. "Nepal"</div>;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

// const App = () => {
//   const { reset, ...nameInput } = useField("text");
//   const countryHook = useCountry();

//   const fetch = (e) => {
//     e.preventDefault();
//     // console.log("fetching...", nameInput.value);
//     countryHook.setSearchValue(nameInput.value);
//   };

//   return (
//     <div>
//       <form onSubmit={fetch}>
//         <input {...nameInput} />
//         <button>find</button>
//       </form>

//       <Country country={countryHook.country} />
//     </div>
//   );
// };

const App = () => {
  const { reset, ...nameInput } = useField("text");
  const [name, setName] = useState("");
  const country = useCountryWithName(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
