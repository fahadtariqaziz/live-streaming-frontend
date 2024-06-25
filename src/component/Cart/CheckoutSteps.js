import { StepLabel, Stepper, Typography , Step } from '@material-ui/core';
import LocalShippingIcon  from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import React, { Fragment } from 'react'
import "./CheckoutSteps.css";

const CheckoutSteps = ( {activeStep} ) => {    //aese chal nae rae the activeSteps destructure kiya phir dark hua text       //isme activesteps bhej rhe in shipping.js return men
  
    const steps = [ 
    {
        label : <Typography> Shipping Details </Typography>,
        icon : <LocalShippingIcon/>,
    },
    
    {
        label : <Typography> Confirm Order </Typography>,
        icon : <LibraryAddCheckIcon/>,
    },

    {
        label : <Typography> Payment </Typography>,
        icon : <AccountBalanceIcon/>,
    },

    ]


    const stepStyles = {
        boxSizing : "border-box",
    };

    return (
        <Fragment>

            <Stepper 
                alternativeLabel
                activeStep = {activeStep}
                style={stepStyles}
                >

            {
                steps.map( (item , index ) => (

                    <Step
                        key = {index}
                        active = { activeStep === index ? true : false }
                        complete = { activeStep >= index ? true : false }
                        >

                            <StepLabel  style={ {
                                color : activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
                            } }
                                icon = {item.icon}
                                >

                            {item.label}

                            </StepLabel>

                    </Step>
                ))
            }        

            </Stepper>

        </Fragment>
  )
}

export default CheckoutSteps