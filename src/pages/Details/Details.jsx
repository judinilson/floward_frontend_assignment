import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { countriesActions } from "../../store";
import { Loader } from "../../components";
export { Details };

function Details() {
  const { alphaCode } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector((x) => x.country);

  useEffect(() => {
    dispatch(countriesActions.getCountry({ alphaCode }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const objectKeys = (keys) => {
    for (const key in keys) {
      if (keys[key].name) {
        return keys[key].name + " " + keys[key]?.symbol;
      } else {
        return keys[key];
      }
    }
  };

  return (
    <>
      {country.length && (
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <th>Common Name</th>
              <td>{country[0]?.name.common}</td>
            </tr>
            <tr>
              <th>Official Name</th>
              <td>{country[0]?.name.official}</td>
            </tr>
            <tr>
              <th>Currencies</th>
              <td>{objectKeys(country[0]?.currencies)}</td>
            </tr>
            <tr>
              <th>Languages</th>
              <td>{objectKeys(country[0]?.languages)}</td>
            </tr>
            <tr>
              <th>Flag</th>
              <td>{country[0]?.flag}</td>
            </tr>
          </tbody>
        </table>
      )}
      <Loader data={country} />
    </>
  );
}
