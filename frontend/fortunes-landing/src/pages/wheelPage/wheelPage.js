import React from 'react';

import Wheel from './../../components/wheel/wheel';

function WheelPage( props ) {
    /* 
   * The list of items that will be present on the wheel.
   * Each item has to have:
   * - name: String
   * - weight: double ( the predisposition of that item being selected )
   * Later, this hardcoded list will be replaced with a list received from a database.
   */
  const items = [
    {
      name: "Gummy Bears",
      weight: 10.0
    },
    {
      name: "Nothing",
      weight: 23.0
    },
    {
      name: "Laptop",
      weight: 5.0
    },
    {
      name: "Yacht",
      weight: 2.0
    },
    {
      name: "Soap",
      weight: 40.0
    },
    {
      name: "Headphones",
      weight: 20.0
    }
  ];

    return (
        <>
            <Wheel items={ items }/>
        </>
    );
}

export default WheelPage;