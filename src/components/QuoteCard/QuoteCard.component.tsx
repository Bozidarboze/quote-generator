import { useState, useEffect } from "react";

import "./QuoteCard.styles.scss";

import Button from "../Button/Button.component";
import Loader from "../Loader/Loader.component";

export interface IQuotes {
  text: string;
  author: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [quotes, setQuotes] = useState<IQuotes[]>([]);

  const fetchQuotes = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFailed(true);
      });
  };

  // eslint-disable-next-line
  useEffect(() => fetchQuotes(), []);

  useEffect(() => {
    loading === false && getQuote();
  }, [loading]);

  const getQuote = () => {
    setLoading(true);
    const index: number = Math.floor(Math.random() * 1643);
    const quote: string = quotes[index].text;
    const author: string = quotes[index].author;
    setQuote("“" + quote + "“");
    author !== null ? setAuthor(author) : setAuthor("Unknown");
    setLoading(false);
  };

  return failed ? (
    <h1 style={{ textAlign: "center" }}>Failed to reach our server. Try again later.</h1>
  ) : loading ? (
    <Loader />
  ) : (
    <div id='quote-box' className='quote-card'>
      <div id='text' className='quote-text'>
        <h1>{quote}</h1>
      </div>
      <div id='author' className='quote-author'>
        <span>- {author}</span>
      </div>
      <div className='quote-card-btns'>
        <a id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${quote}`} target='_blank' rel='noreferrer'>
          <Button twitter='twitter-btn' label='Post on Twitter' />
        </a>
        <div id='new-quote' onClick={getQuote}>
          <Button label='Get Quote' />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
