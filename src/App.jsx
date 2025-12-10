import { useState } from "react";
import "./App.css";
import Switch from "react-switch";
import { FaMoon } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

function App() {
  //Save react icons as jsx elements
  let filledMoonCrescent = <FaMoon />;
  let emptyMoonCrescent = <FaRegMoon />;
  const [formData, setFormData] = useState({ searchTerm: "" });
  const [dictionaryData, setDictionaryData] = useState(null);
  const [fontClass, setFontClass] = useState("serif");
  const [lightMode, setLightMode] = useState(true);
  const [audioPath, setAudioPath] = useState("");
  const handleChangeMode = () => {
    setLightMode(!lightMode);
    let mode = lightMode ? "day" : "night";
    document.body.classList.remove("day");
    document.body.classList.remove("night");
    document.body.classList.add(mode);
  };
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
    //reset form data
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

      //set dictionary data
      setDictionaryData(data);
      console.log("dictionaryData", dictionaryData);
      //map over the phonetics array and see if audio exists in one of the array elements
      dictionaryData[0].phonetics.map((item) => {
        if (item.audio.length > 1) {
          console.log("item", item);
          //set audio
          setAudioPath(item.audio);
        } else {
          setAudioPath("");
        }
      });
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className={fontClass}>
      <header>
        <img src="/logo.svg" alt="book" />

        <div className="form-nd-switch">
          <form>
            <select
              name="fonts"
              defaultValue="serif"
              onChange={(e) => setFontClass(e.target.value)}
            >
              <option value="serif">Serif</option>
              <option value="san-serif">San Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </form>

          <Switch
            onChange={handleChangeMode}
            checked={lightMode}
            offColor="#4d4d4d"
            onColor="#999999"
            offHandleColor="#262626"
            onHandleColor="#e6e6e6"
            checkedIcon={emptyMoonCrescent}
            uncheckedIcon={filledMoonCrescent}
          />
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <search>
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            value={formData.searchTerm}
            onChange={handleChange}
          />
          <img src="/icon-search.svg" />
        </search>
      </form>
      {dictionaryData && (
        <div className="result-div">
          <h1>{dictionaryData[0].word}</h1>
          <h2>{dictionaryData[0].phonetic}</h2>
          {audioPath.length > 0 && (
            <audio controls>
              <source src={audioPath} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <div className="h3-hr">
            <h3>
              <em>{dictionaryData[0].meanings[0].partOfSpeech}</em>
            </h3>{" "}
            <hr />
          </div>

          <h4>Meaning</h4>
          <ul className="result-list">
            {dictionaryData[0].meanings[0].definitions.map((item, index) => (
              <li key={"index_" + index}>{item.definition}</li>
            ))}
          </ul>
          <div>
            {dictionaryData[0].meanings[0].synonyms.length > 0 && (
              <div>
                <h5>Synonyms </h5>
                <ol className="result-list">
                  {dictionaryData[0].meanings[0].synonyms.map((item, index) => (
                    <li key={"index_" + index}>{item}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="h3-hr">
            <h3>
              <em>{dictionaryData[0].meanings[1].partOfSpeech}</em>
            </h3>{" "}
            <hr />
          </div>
          <h4>Meaning</h4>
          <ul className="result-list">
            {dictionaryData[0].meanings[1].definitions.map((item, index) => (
              <li key={"index_" + index}>{item.definition}</li>
            ))}
          </ul>
          <p>
            Source
            <a href={dictionaryData[0].sourceUrls}>
              {dictionaryData[0].sourceUrls}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
