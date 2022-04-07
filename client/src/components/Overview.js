import React, { useState } from 'react';
import Navigation from './Nav';
import Footer from './Footer';
import Modal from 'react-modal';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_ISSUE } from '../utils/mutations';
import { QUERY_FACILITIES } from '../utils/queries';
import { AuthProvider } from '../contexts/AuthContext';

function Overview() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_FACILITIES);
  const [addIssue, { error }] = useMutation(ADD_ISSUE);
  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentFacility, setCurrentFacility] = useState();
  const [issueType, setIssueType] = useState('Electrical');

  const facilities = data?.facilities || [];

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)"
    },
    content: {
      top: "50%",
      left: "50%",
      right: "300px",
      bottom: "300px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  Modal.setAppElement('body');

  function openModal(facility) {
    setCurrentFacility(facility);

    console.log(facility._id)

    setIsOpen(true)
  };

  function closeModal() {
    setCurrentFacility(null);
    setIsOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let myFacility = currentFacility;

    console.log('Inside handle form submit');

    try {

      const { _id } = currentFacility;
      console.log({ _id, issueType });

      const newFacility = await addIssue({
        variables: {
          _id,
          issueType
        }
      });

      console.log(newFacility);
      closeModal();
    }
    catch (e) {
      console.error(e);
    }
  }

  if (!facilities.length) {
    return <h3>Loading</h3>;
  }
  return (
    <>
      <Navigation></Navigation>
      <main>


        <div id="filter" className="container">
          <div className="d-flex px-4 mb-3">
            <div className="dropdown mr-1">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                id="dropdownMenuOffset"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-offset="10,20"
              >

                Filter
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuOffset"
              >
                <div className="dropdown-item text-success">Job Location</div>
                <div className="dropdown-item text-success">Job Type</div>
              </div>
            </div>
          </div>
        </div>



        <h4 className="contact-number" href="tel:555-555-5555">If this issuse needs immediate attention please call or text Cody Hanks 801-123-4567
        </h4>

        <div id="projectCards" className="container d-flex px-3">
          <div className="row justify-content-center">
            {facilities && facilities.map(facility => (

              <div key={facility._id} id="Cards-border" className="card col-lg-3 col-md-4 col-sm-12 m-2">
                <img src={facility.photoName} className="card-img-top" alt="..." />
                <div className="card-body d-flex row">
                  <h5 className="card-title">{facility.facilityName}</h5>


                  <a className="card-text card-title">

                    {facility.address}
                  </a>
                </div>
                <button onClick={() => openModal(facility)}>Add Issue</button>

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Example Modal"
                  style={customStyles}>
                  <div>
                    <p>{currentFacility?.facilityName}</p>
                    <form onSubmit={handleFormSubmit}>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}>
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Structural</option>
                      </select>
                      <button>Submit Issue</button>
                    </form>
                  </div>
                </Modal>

                <h6 className="card-subtitle mb-2">Tasks To-Do</h6>
                <ul className="list-group list-group-flush">
                  {facility.issues && facility.issues.map(issue =>
                  (
                    <li className="list-group-item">{issue}</li>
                  ))}

                  {/* <li className="list-group-item">Bathroom</li>
                  <li className="list-group-item">Cabinets</li>
                  <li className="list-group-item">Landscaping</li> */}
                </ul>
                <div className="card-footer text-center">

                </div>
              </div>

            ))}


          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Overview;
