import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [rquote, setRquote] = useState<string>('');
  const [bookmark, setBookmark] = useState<any[]>([]);
  const [next, setNext] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const fetchingQuote = async () => {
      const quote = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await quote.json();
      setRquote(data[0]);
    }
    fetchingQuote();
  }, [next])

  const handleNext = () => {
    setNext(prevNext => prevNext + 1);
  };
  const handleBookmark = () => {
    setBookmark([...bookmark, rquote]);
  };

  return (
    <div className="my-background-div flex flex-col justify-center items-center">
      <div className="bg-white w-[15rem] h-auto rounded-t p-2 shadow-md">
        <h1 className="text-black text-2xl font-bold text-center">The Quote</h1>
        <p className="text-gray-500 font-serif text-center p-2">{rquote}</p>
      </div>
      <div className="w-[15rem] text-white flex">
        <button className="flex-1 bg-red-600 rounded-bl p-2" onClick={handleBookmark}>Bookmark</button>
        <button className="flex-1 bg-black rounded-br p-2" onClick={handleNext}>Next</button>
      </div>
      <div onClick={() => setToggle(prev => !prev)} className="absolute cursor-pointer bg-red-600 p-2 rounded-md top-10 right-10">BookMarks</div>
      {toggle && bookmark.length > 0 ? (
        <div className="bg-white rounded-md absolute p-2 top-24 w-[15rem] flex flex-col gap-2 right-10">
          {bookmark.map((data, index) => (
            <div className="bg-gray-700 font-semibold text-white rounded-md p-2" key={index}>{data}</div>
          ))}
        </div>
      ) : null }
      {toggle && bookmark.length === 0 && (
        <div className="bg-gray-700 text-white font-semibold rounded-md absolute p-2 top-24 right-10">No Quotes Added</div>
      )}
    </div>
  )
}

export default App
