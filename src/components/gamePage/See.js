import React, { useState, useEffect } from "react"
import { db } from '../../lib/firebase'
import { connect } from 'react-redux'

function See (props) {

    return (
      <div>
        <h1>See</h1>
      </div>
    );
  }
See = connect((state)=>(state))(See)
export default See