import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
  Autocomplete,
  Button,
  Grid,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Breadcrumb from "../../../utils/Breadcrumb";
import { Modal} from '@mui/material';
import Swal from 'sweetalert2';


const AutoComplete = styled(Autocomplete)(() => ({
  width: "100%",
  marginBottom: "13px",
}));

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
    boxShadow: theme.shadows[5],
  }));
  const CustomModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const suggestions = [
    {label : "Paypal"},
    {label : "AG"},
  ]

const TransModal = ({supInfo, setSupInfo, isOpen, toogleModal, placeOrder}) => {

  const handleChange = (event) => {
    event.persist();
    setSupInfo({ ...supInfo, [event.target.name]: event.target.value });
  };

  return (
    <CustomModal open={isOpen} onClose={toogleModal}>
        <Container>            
              <ValidatorForm onError={() => null} onSubmit={placeOrder} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'un nouveau Division </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                        <TextField
                            type="text"
                            name="deliveryAddress"
                            label="Adresse de livraison"
                            placeholder="Saisir ici le code le nom du produit...."
                            onChange={handleChange}
                            value={supInfo.deliveryAddress}
                            validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                            errorMessages={["this field is required"]}
                          />              

                        <AutoComplete
                          options={suggestions}
                          getOptionLabel={(option) => option.label}
                          value={{ label: supInfo.payementMode }} // Set value as an object with label property
                          onChange={handleChange}
                          name="payementMode"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Type"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        /> 

                          <div className="text-center">

                          <Button color="primary" className="me-2 "  variant="outlined" type="submit">
                              Enregister
                            </Button>
                            <Button color="secondary" className=" me-2 ms-1 ps-4 pe-4" variant="outlined" onClick={toogleModal}>
                              Fermer
                            </Button>
                            
                          </div>
                      </Grid>
                  </div>

              </ValidatorForm>

        </Container> 

    
    </CustomModal>
  )
}

export default TransModal