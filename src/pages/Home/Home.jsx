import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { countriesActions } from "../../store/";
import { Loader } from "../../components";
export { Home };

function Home() {
  const dispatch = useDispatch();
  const { countries } = useSelector((x) => x.countries);

  useEffect(() => {
    dispatch(countriesActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {countries.length && (
        <table className="table">
          <caption>List of Countries</caption>
          <thead>
            <tr>
              <th scope="col">cca2</th>
              <th scope="col">Name</th>
              <th scope="col">Capital</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.cca3}>
                <td>{country?.cca2}</td>
                <td>{country?.name.common}</td>
                <td>{country?.capital}</td>
                <td>
                  <Link
                    to={`details/${country.cca3}`}
                    className="btn btn-link-dark"
                  >
                    <BsFillEyeFill />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Loader data={countries} />
    </>
  );
}
