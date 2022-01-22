import "./Button.styles.scss";

interface props {
  label: string;
  twitter?: string;
}

const Button = ({ label, twitter }: props) => {
  return <div className={`quote-btn ${twitter}`}>{label}</div>;
};

export default Button;
