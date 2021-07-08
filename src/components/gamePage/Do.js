import React, { useState, useEffect } from "react"
import { db } from '../../lib/firebase'
import { connect } from 'react-redux'

function Do (props) {

    return (
      <div>
        <h1>Do</h1>
      </div>
    );
  }
Do = connect((state)=>(state))(Do)
export default Do