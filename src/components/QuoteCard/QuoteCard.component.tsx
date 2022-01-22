import { useState, useEffect } from "react";

import "./QuoteCard.styles.scss";

import Button from "../Button/Button.component";
import Loader from "../Loader/Loader.component";

const QuoteCard = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const getQuote = () => {
    setLoading(true);
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const index: number = Math.floor(Math.random() * 1643);
        const quote: string = data[index].text;
        const author: string = data[index].author;
        setQuote(quote);
        author !== null ? setAuthor(author) : setAuthor("Unknown");
        setLoading(false);
      });
  };

  useEffect(() => getQuote(), []);

  return loading ? (
    <Loader />
  ) : (
    <div className='quote-card'>
      <div className='quote-text'>
        <h1>“{quote}“</h1>
      </div>
      <div className='quote-author'>
        <span>- {author}</span>
      </div>
      <div className='quote-card-btns'>
        <a href={`https://twitter.com/intent/tweet?text=${quote}`} target='_blank'>
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
