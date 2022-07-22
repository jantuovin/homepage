interface DefaultPictureProp {
  className: string;
}

const DefaultPicture: React.FC<DefaultPictureProp> = ({ className }) => (
  <div className={`picture ${className}`}></div>
);

export default DefaultPicture;
