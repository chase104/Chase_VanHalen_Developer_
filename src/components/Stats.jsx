const Stats = () => {
  return (
    <section id="stats" className="stats bg-light container">
      <div className="row ">
        <div className="col-md-3 col-sm-6 text-center">
          <h2 className="counter xl-text" data-target="328">
            328
          </h2>
          <p>Happy Customers</p>
        </div>

        <div className="col-md-3 col-sm-6 text-center">
          <h2 className="counter xl-text" data-target="285"></h2>
          <p>Issues Solved</p>
        </div>

        <div className="col-md-3 col-sm-6 text-center">
          <h2 className="counter xl-text" data-target="159"></h2>
          <p>Good Reviews</p>
        </div>

        <div className="col-md-3 col-sm-6 text-center">
          <h2 className="counter xl-text" data-target="128"></h2>
          <p>Case Studies</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
