import React, { useState } from 'react'
import '../styles/LoginM.css';
const LoginM = () => {
  const [dodatnoZaRegistraciju, setDodatnoZaRegistraciju] = useState(false);
  const [PrijaviSeOrganizator, setPrijaviSeOrganizator] = useState(false);
  return (
    <div className='NaCentarDiva'>
    <form>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" />
    </div>
    {!dodatnoZaRegistraciju && (
      <div className='RazmakniBotune'>
    <button type="submit" className="btn btn-primary ">Submit</button>
    <button className='btn btn-primary' onClick={() => {
      setDodatnoZaRegistraciju(true);
    }}>Registriraj se</button>
    </div>
    )}
    {dodatnoZaRegistraciju && (
<>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input type="name" className="form-control" id="name" />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck2"
                  onChange={() => {
                    setPrijaviSeOrganizator(!PrijaviSeOrganizator);
                  }}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Registriraj se kao organizator
                </label>
              </div>
              {PrijaviSeOrganizator && (
                <div className="mb-3">
                  <label htmlFor="adress" className="form-label">
                    Adresa:
                  </label>
                  <input type="adress" className="form-control" id="adress" />
                </div>
              )}
            </>
    )}
    {dodatnoZaRegistraciju  && (
            <button type="submit" className="btn btn-primary">
              Registriraj se
            </button>
          )}
  </form>
  </div>
  )
}

export default LoginM;