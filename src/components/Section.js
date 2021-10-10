import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Cart from './section/Cart'


export default  function Section () {
        return (
            <>
                    <Route path="/" component={Cart}  exact/>
            </>
        )
}
