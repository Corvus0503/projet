import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import { Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Breadcrumb from "../../utils/Breadcrumb";
import { Modal } from "@mui/material";
import Swal from "sweetalert2";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const NewProduits = ({ isOpen, onClose, chargerListProduct }) => {
  const [state, setState] = useState({ date: new Date() });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    nom: "",
    description: "",
    prix: 0,
  });

  const addNewDivision = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", selectedPhoto); // Append the selected photo to form data
      formData.append("nom", product.nom);
      formData.append("description", product.description);
      formData.append("prix", product.prix);
      await axios.post(`http://localhost:8080/api/produits`, formData);
      chargerListProduct();
      onClose();
      Swal.fire({
        icon: "success",
        title: "Demande soumise",
        text: "Votre demande a été soumise avec succès !",
      });
    } catch (error) {
      console.log(`Erreur : ${error}`);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Votre demande a été soumise avec succès !",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(product);
    addNewDivision();
    setProduct({
      nom: "",
      description: "",
      prix: "",
    });
  };

  const handleChange = (event) => {
    event.persist();
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const { date } = state;

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <CustomModal open={isOpen} onClose={handleCloseModal}>
      <Container>
        <ValidatorForm onError={() => null} onSubmit={handleSubmit}>
          <div className=" card center shadow p-5">
            <h1 align="left"> Ajout d'un nouveau produit </h1>
            <hr />
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "block", marginBottom: "16px" }}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{
                    width: "50px",
                    height: " 50px",
                    marginBottom: "16px",
                  }}
                />
              )}
              <TextField
                type="text"
                name="nom"
                label="Nom"
                placeholder="Saisir ici le code le nom du produit...."
                onChange={handleChange}
                value={product.nom}
                validators={[
                  "required",
                  "minStringLength: 1",
                  "maxStringLength: 9",
                ]}
                errorMessages={["this field is required"]}
              />

              <TextField
                type="text"
                name="description"
                id="standard-basic"
                placeholder="Saisir ici la description...."
                value={product.description}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Description"
                validators={[
                  "required",
                  "minStringLength: 1",
                  "maxStringLength: 9",
                ]}
              />

              <TextField
                type="text"
                name="prix"
                id="standard-basic"
                value={product.prix}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                placeholder="Saisir ici le prix...."
                label="Prix"
                validators={[
                  "required",
                  "minStringLength: 4",
                  "maxStringLength: 9",
                ]}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Date picker"
                      id="mui-pickers-date"
                      sx={{ mb: 2, width: "100%" }}
                    />
                  )}
                />
              </LocalizationProvider>

              <div className="text-center">
                <Button
                  color="primary"
                  className="me-2 "
                  variant="outlined"
                  type="submit"
                >
                  Enregister
                </Button>
                <Button
                  color="secondary"
                  className=" me-2 ms-1 ps-4 pe-4"
                  variant="outlined"
                  onClick={handleCloseModal}
                >
                  Fermer
                </Button>
              </div>
            </Grid>
          </div>
        </ValidatorForm>
      </Container>
    </CustomModal>
  );
};

export default NewProduits;
