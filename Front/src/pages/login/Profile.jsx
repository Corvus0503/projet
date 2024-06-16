import React from "react";
import { LockOpen, Person } from "@mui/icons-material";
import { Avatar, Button, Card, Divider, styled } from "@mui/material";
import { FlexBetween, FlexBox } from "../../components/FlexBox";
import { H4, Small } from "../../components/Typography";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import Swal from "sweetalert2";

const ContentBox = styled(FlexBox)({
  alignItems: "center",
  flexDirection: "column",
});

const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const StyedSmall = styled(Small)({
  color: "#08ad6c",
  padding: "2px 4px",
  borderRadius: "4px",
  background: "rgba(9, 182, 109, 0.15)",
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
  ":hover": { background: "transparent" },
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

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  marginLeft: "150px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Profile = ({ user }) => {
  const [confirmMdp, setConfirmMdp] = useState("");
  const [modUser, setModUser] = useState({
    MATRICULE: "",
    FONCTION_AG: "",
    MAIL_AG: "",
    NOM_AG: "",
    NOM_UTIL_AG: "",
    TYPE_AG: "user",
    PRENOM_AG: "",
    ADRESSE_AG: "",
    TEL_AG: "",
    PASSWORD: "",
    PHOTO: null,
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: "",
  });

  const handleChange = (e) => {
    setModUser({ ...modUser, [e.target.name]: e.target.value });
  };

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
        console.log("Le USer a été ajouté avec succès.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Voulez vous vrament modifier vos informations?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(id);
        Swal.fire("Confirmé!", "Inormation modifiés.", "success");
      }
    });
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== modUser.PASSWORD) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [modUser.PASSWORD]);

  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setModUser({ ...modUser, PHOTO: file });

    // Display selected image in the button
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setModUser(user[0]);
  }, []);

  console.log("modUser : ", modUser);
  return (
    <Container style={{ display: "flex" }}>
      <Card sx={{ pt: 3, width: 345 }} className="me-4">
        <Grid className="text-center">
          <div className="text-center ms-5">
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
              className="text-center"
              htmlFor="raised-button-file"
              backgroundImage={imagePreview}
            >
              {imagePreview ? null : (
                <div>
                  {user[0].PHOTO && (
                    <img
                      src={require(`../../uploads/${user[0].PHOTO}`)} // Serve the photo from the "uploads" directory on the server
                      alt={user[0].NOM_AG}
                      style={{ width: "150px", height: "150px" }}
                      className="rounded-pill" // Adjust the image size as needed
                    />
                  )}
                </div>
              )}
            </PhotoUploadButton>
          </div>
          <H4 sx={{ mt: "16px", mb: "8px" }}>
            {user[0].NOM_AG} {user[0].PRENOM_AG}
          </H4>
          <Small color="text.secondary">{user[0].FONCTION_AG}</Small>
        </Grid>
      </Card>

      <Card sx={{ pt: 3, width: 500, height: "500px" }} elevation={3}>
        <Divider />
        <ValidatorForm onSubmit={updateUser} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="NOM_AG"
                label="Nom"
                onChange={handleChange}
                value={modUser.NOM_AG}
                validators={["required"]}
                errorMessages={["Veuillez remplir ce champ"]}
              />

              <TextField
                type="text"
                name="PRENOM_AG"
                label="Prenom"
                onChange={handleChange}
                value={modUser.PRENOM_AG}
                validators={["required"]}
                errorMessages={["Veuillez remplir ce champ"]}
              />

              <TextField
                type="text"
                name="NOM_UTIL_AG"
                //id="standard-basic"
                value={modUser.NOM_UTIL_AG}
                onChange={handleChange}
                errorMessages={["Veuillez remplir ce champ"]}
                label="Nom d'utilisteur"
                validators={[
                  "required",
                  "minStringLength: 1",
                  "maxStringLength: 20",
                ]}
              />
              <TextField
                name="PASSWORD"
                type="password"
                label="Password"
                value={modUser.PASSWORD}
                onChange={handleChange}
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
                errorMessages={["Veuillez remplir ce champ"]}
                validators={["required"]}
              />

              <TextField
                type="text"
                name="TEL_AG"
                value={modUser.TEL_AG}
                label="Contact"
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["Veuillez remplir ce champ"]}
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
            </Grid>
          </Grid>
          <hr />
          <Button
            onClick={() => handleSubmit(modUser.MATRICULE)}
            color="success"
            variant="contained"
            type="submit"
          >
            {/*<Icon>send</Icon>*/}
            Modifier
          </Button>
        </ValidatorForm>
      </Card>
    </Container>
  );
};

export default Profile;
