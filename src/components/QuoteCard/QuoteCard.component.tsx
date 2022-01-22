import { useState, useEffect } from "react";

import "./QuoteCard.styles.scss";

import Button from "../Button/Button.component";
import Loader from "../Loader/Loader.component";

export interface IQuotes {
  text: string;
  author: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState("Twitter Quote Generator!");
  const [author, setAuthor] = useState("Try it out!");
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<IQuotes[]>([]);

  const fetchQuotes = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Failed to fetch quotes, retrying...");
        fetchQuotes();
      });
  };

  // eslint-disable-next-line
  useEffect(() => fetchQuotes(), []);

  const getQuote = () => {
    setLoading(true);
    const index: number = Math.floor(Math.random() * 1643);
    const quote: string = quotes[index].text;
    const author: string = quotes[index].author;
    setQuote("“" + quote + "“");
    author !== null ? setAuthor(author) : setAuthor("Unknown");
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='quote-card'>
      <div className='quote-text'>
        <h1>{quote}</h1>
      </div>
      <div className='quote-author'>
        <span>- {author}</span>
      </div>
      <div className='quote-card-btns'>
        <a href={`https://twitter.com/intent/tweet?text=${quote}`} target='_blank' rel='noreferrer'>
          <Button twitter='twitter-btn' label='Post on Twitter' />
        </a>
        <div onClick={getQuote}>
          <Button label='Get Quote' />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
