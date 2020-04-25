// Version Table ( belle interface mais sans sorting)

import React from 'react';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import moment from 'moment';

// Define table header
const PlanningHeader = () => {
  return (
    <MDBTableHead color="cyan lighten-4">
      <tr>
        <th>Location</th>
        <th>Start</th>
        <th>End</th>
        <th>Remove</th>
        <th>Edit</th>
        {/* <th>Infos</th> */}
      </tr>
    </MDBTableHead>
  );
};

const PlanningBody = (props) => {
  const sortedTrip = props.tripData.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));

  //
  const rows = sortedTrip.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.location}</td>
        <td>{moment(row.startDate).format('YYYY-MM-DD')}</td>
        <td>{moment(row.endDate).format('YYYY-MM-DD')}</td>
        <td>
          <MDBBtn gradient="peach" tag="a" onClick={() => props.removeTrip(row.id)}>
            <MDBIcon icon="trash" />
          </MDBBtn>
        </td>
        <td>
          <MDBBtn gradient="aqua" tag="a" onClick={() => props.openModalEdit(row.id)}>
            <MDBIcon icon="pen" />
          </MDBBtn>
        </td>
        {/* <td>
          <MDBBtn gradient="purple" tag="a" onClick={() => props.getInfo(row.id)}>
            <MDBIcon icon="info" />
          </MDBBtn>
        </td> */}
      </tr>
    );
  });

  return <MDBTableBody color="rgba-white-strong">{rows}</MDBTableBody>;
};

const Planning = (props) => {
  const { tripData, removeTrip, openModalEdit, getInfo } = props;

  if (tripData === {}) {
    return <h2>You don't have any trip planned yet</h2>;
  } else {
    return (
      <MDBTable hover>
        <PlanningHeader />
        <PlanningBody tripData={tripData} removeTrip={removeTrip} openModalEdit={openModalEdit} getInfo={getInfo} />
      </MDBTable>
    );
  }
};

export default Planning;

/////////////////////////////////////////////////////////////////

/*
//Version Data Table (moche mais avec sorting et pagination)

import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Planning = (props) => {
  const data = {
    columns: [
      {
        label: 'Location',
        field: 'location',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Start',
        field: 'startDate',
        sort: 'asc',
        width: 270
      },
     
      {
        label: 'End',
        field: 'endDate',
        sort: 'asc',
        width: 100
      }
    ],
    rows: 
        props.tripData
    
  };

// onClick={() => props.removeTrip(index)

  return ( 
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  )
}

  export default Planning;

*/
