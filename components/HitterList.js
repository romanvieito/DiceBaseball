import React from "react";

class HitterList extends React.Component {
  render() {
    return (
      <React.Fragment>
          <table className="">
            <thead>
              <tr>
                <th scope="col">HITTERS</th>
                <th scope="col">H-AB</th>
                <th scope="col">AVG</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
                <tr key={i}>
                  <td>Hitter {v}</td>
                  <td>0-1</td>
                  <td>.000</td>
                </tr>
              ))}
            </tbody>
          </table>
      </React.Fragment>
    );
  }
}

export default HitterList;