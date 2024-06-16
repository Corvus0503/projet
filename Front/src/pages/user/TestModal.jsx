import React from "react";
//import Modal from 'react-modal';
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal } from "react-bootstrap";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import Swal from "sweetalert2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "70%",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement(document.getElementById('root'));
const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const PhotoUploadButton = styled("label")(({ backgroundImage }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #ccc",
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  cursor: "pointer",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));

const TestModal = ({ List, chargerListAdmin }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setModUser(List);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const suggestions = [{ label: "Admin" }, { label: "AG" }, { label: "User" }];

  const [state, setState] = useState({ date: new Date() });
  const [confirmMdp, setConfirmMdp] = useState("");
  const [modUser, setModUser] = useState({
    MATRICULE: "",
    FONCTION_AG: "",
    MAIL_AG: "",
    NOM_AG: "",
    NOM_UTIL_AG: "",
    TYPE_AG: "User",
    PRENOM_AG: "",
    ADRESSE_AG: "",
    TEL_AG: "",
    PASSWORD: "",
    PHOTO: null,
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: "",
  });

  const updateUser = (id) => {
    const formDataToSend = new FormData();
    for (const key in modUser) {
      formDataToSend.append(key, modUser[key]);
    }
    axios
      .put(`http://localhost:8080/admin/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setModUser({
          MATRICULE: "",
          FONCTION_AG: "",
          MAIL_AG: "",
          NOM_AG: "",
          NOM_UTIL_AG: "",
          TYPE_AG: "",
          PRENOM_AG: "",
          ADRESSE_AG: "",
          TEL_AG: "",
          PASSWORD: "",
          PHOTO: null,
          GENRE: "",
          ACTIVATION: "",
          CODE_DIVISION: "",
        });
        chargerListAdmin();
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Informations modifiés",
          text: "Information uutilisteur modifiés avec succès !",
        });
        console.log("Le USer a été ajouté avec succès.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleChange = (e) => {
    setModUser({ ...modUser, [e.target.name]: e.target.value });
  };

  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setModUser({ ...modUser, PHOTO: file });

    // Display selected image in the button
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <IconButton onClick={openModal}>
        <CreateIcon color="primary" />
      </IconButton>

      <Modal className="fade" show={modalIsOpen} onHide={closeModal}>
        <Modal.Body>
          <ValidatorForm onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  name="PHOTO"
                  onChange={handleFileChange}
                />
                <PhotoUploadButton
                  htmlFor="raised-button-file"
                  backgroundImage={imagePreview}
                >
                  {imagePreview ? null : (
                    <div>
                      {List.PHOTO && (
                        <img
                          src={require(`../../uploads/${List.PHOTO}`)} // Serve the photo from the "uploads" directory on the server
                          alt={List.NOM_AG}
                          style={{ width: "150px", height: "150px" }}
                          className="rounded-pill" // Adjust the image size as needed
                        />
                      )}
                    </div>
                  )}
                </PhotoUploadButton>
                <TextField
                  type="text"
                  name="MATRICULE"
                  value={List.MATRICULE}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Matricule"
                  validators={[
                    "required",
                    "minStringLength: 4",
                    "maxStringLength: 9",
                  ]}
                />

                <TextField
                  type="text"
                  name="CODE_DIVISION"
                  value={modUser.CODE_DIVISION}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Code division"
                  validators={[
                    "required",
                    "minStringLength: 1",
                    "maxStringLength: 9",
                  ]}
                />

                <TextField
                  type="text"
                  name="FONCTION_AG"
                  //id="standard-basic"
                  value={modUser.FONCTION_AG}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Fonction"
                  validators={[
                    "required",
                    "minStringLength: 4",
                    "maxStringLength: 9",
                  ]}
                />

                <AutoComplete
                  options={suggestions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={modUser.TYPE_AG}
                      onChange={handleChange}
                      name="TYPE_AG"
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <TextField
                  type="text"
                  name="NOM_UTIL_AG"
                  //id="standard-basic"
                  value={modUser.NOM_UTIL_AG}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Nom d'utilisteur"
                  validators={[
                    "required",
                    "minStringLength: 1",
                    "maxStringLength: 9",
                  ]}
                />

                <TextField
                  type="text"
                  name="NOM_AG"
                  label="Nom"
                  onChange={handleChange}
                  value={modUser.NOM_AG}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="text"
                  name="PRENOM_AG"
                  label="Prenom"
                  onChange={handleChange}
                  value={modUser.PRENOM_AG}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="email"
                  name="MAIL_AG"
                  label="Email"
                  value={modUser.MAIL_AG}
                  onChange={handleChange}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required", "email non valide"]}
                />
                <TextField
                  type="text"
                  name="ADRESSE_AG"
                  label="Adresse"
                  onChange={handleChange}
                  value={modUser.ADRESSE_AG}
                  errorMessages={["this field is required"]}
                  validators={["required"]}
                />

                <TextField
                  type="text"
                  name="TEL_AG"
                  value={modUser.TEL_AG}
                  label="Contact"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  name="PASSWORD"
                  type="text"
                  label="Password"
                  value={modUser.PASSWORD}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={(e) => setConfirmMdp(e.target.value)}
                  value={confirmMdp}
                  validators={["required", "isPasswordMatch"]}
                  errorMessages={[
                    "this field is required",
                    "password didn't match",
                  ]}
                />
                <RadioGroup
                  row
                  name="GENRE"
                  sx={{ mb: 2 }}
                  value={modUser.GENRE}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="M"
                    label="Homme"
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />

                  <FormControlLabel
                    value="F"
                    label="Femme"
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={modUser.ACTIVATION === "Activé"}
                      onChange={handleChange}
                      name="ACTIVATION"
                      value={
                        modUser.ACTIVATION === "Activé" ? "Desactivé" : "Activé"
                      }
                    />
                  }
                  label={
                    modUser.ACTIVATION === "Activé" ? "Activé" : "Desactivé"
                  }
                  labelPlacement="end"
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    updateUser(List.MATRICULE);
                  }}
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  {/*<Icon>send</Icon>*/}
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TestModal;
