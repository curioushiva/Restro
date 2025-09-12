import "./Card4Su.css"

const Card4Su = () => {
  return (
    <div className="Su-card4">
      <div className="Su-heading">
        <h1></h1>
      </div>
      <div className="Su-exploreres">
        {Array.from({ length: 9 }).map((val, idx) => {
          return (
            <div className="Su-explore1" key={idx}>
            </div>)
        })}
      </div>
    </div>
  );
};

export default Card4Su;
