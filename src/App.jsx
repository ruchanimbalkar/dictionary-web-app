import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ searchTerm: "" });
  const [dictionaryData, setDictionaryData] = useState(null);
  //handle functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    getDictionaryData();
    event.preventDefault();
    console.log(formData, "formData");
    setWord(formData.searchTerm);
    setFormData({
      searchTerm: "",
    });
  };

  const getDictionaryData = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${formData.searchTerm}`
      );
      const data = await response.json();
      console.log("data", data);
      setDictionaryData(data);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <>
      <header>
        <img src="/logo.svg" alt="book" />
        <form>
          <select>
            <option>Serif</option>
          </select>
        </form>
      </header>
      <form onSubmit={handleSubmit}>
        <search>
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            value={FormData.searchTerm}
            onChange={handleChange}
          />
          <img src="/icon-search.svg" />
        </search>
      </form>
      {dictionaryData && (
        <div className="result-div">
          <h1>{dictionaryData[0].word}</h1>
          <h2>{dictionaryData[0].phonetic}</h2>
          <audio controls>
            <source
              src={dictionaryData[0].phonetics[2].audio}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
          <h3>{dictionaryData[0].meanings[0].partOfSpeech}</h3>
          <h4>Meaning</h4> <hr />
          <ol>
            {dictionaryData[0].meanings[0].definitions.map((item, key) => (
              <li index={"index_" + key}>{item.definition}</li>
            ))}
          </ol>
          <h5>{dictionaryData[0].meanings[0].synonyms}</h5>
          <h3>{dictionaryData[0].meanings[1].partOfSpeech}</h3>
          <h4>Meaning</h4> <hr />
          <ol>
            {dictionaryData[0].meanings[1].definitions.map((item, key) => (
              <li index={"index_" + key}>{item.definition}</li>
            ))}
          </ol>
          <p>
            {" "}
            Source{" "}
            <a href={dictionaryData[0].sourceUrls}>
              {dictionaryData[0].sourceUrls}
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
