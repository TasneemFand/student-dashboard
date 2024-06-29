import { Control, SubmitHandler, useForm } from "react-hook-form";
import { TNewForm, FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, InputLabel } from "@mui/material";
import { TextFieldController } from "../../../../../components/FormComponents";
import { useLocales, useTranslate } from "../../../../../locales";
import { DatePickerController } from "../../../../../components/FormComponents/DatePickerController";
import { AutoCompleteController } from "../../../../../components/FormComponents/AutoCompleteController";
import { CountryType, countries } from "../../../../../constants/countries";
import toast, { Toaster } from "react-hot-toast";
import { useGetStudents } from "../../components/Table/hooks/useGetStudents";
import { useCreateStudent } from "../hooks/useCreateStudent";

type TProps = {
  handleClose: () => void;
};
export const NewStudentForm = ({ handleClose }: TProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<TNewForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      birthDate: undefined,
      city: "",
      country: "",
      firstName: "",
      gender: undefined,
      grade: undefined,
      lastName: "",
      phone: "",
      remarks: "",
    },
  });

  const { refetch } = useGetStudents();
  const { handleCreateStudent } = useCreateStudent();

  const onSubmit: SubmitHandler<TNewForm> = async (values) => {
    try {
      console.log(values, "values");
      await handleCreateStudent(values);
      toast.success("Successfully Added");
      refetch();
      handleClose();
    } catch (error) {
      toast.error("Error happend");
    }
  };
  const genericControl = control as unknown as Control<Record<string, unknown>>;
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="firstName" sx={{ marginBottom: 1 }}>
              {t("firstName")}*
            </InputLabel>
            <TextFieldController
              id="firstName"
              control={genericControl}
              fieldName="firstName"
              required={true}
              readOnly={false}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="lastName" sx={{ marginBottom: 1 }}>
              {t("lastName")}*
            </InputLabel>
            <TextFieldController
              id="lastName"
              control={genericControl}
              fieldName="lastName"
              required={true}
              readOnly={false}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="birthDate" sx={{ marginBottom: 1 }}>
              {t("birthDate")}*
            </InputLabel>
            <DatePickerController
              control={genericControl}
              fieldName="birthDate"
              required={true}
              readOnly={false}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="grade" sx={{ marginBottom: 1 }}>
              {t("grade")}*
            </InputLabel>
            <AutoCompleteController
              control={genericControl}
              fieldName="grade"
              required={true}
              readOnly={false}
              options={[
                {
                  id: "42fd7157-0b75-4184-a0f8-efceb52bb4a7",
                  label: currentLang.value === "en" ? "Grade 8" : "الصف الثامن",
                },
                {
                  id: "5b7d2349-d5e1-406d-a9ee-2b6b03b9bdbf",
                  label: currentLang.value === "en" ? "Grade 9" : "الصف التاسع",
                },
              ]}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="gender" sx={{ marginBottom: 1 }}>
              {t("gender")}*
            </InputLabel>
            <AutoCompleteController
              control={genericControl}
              fieldName="gender"
              required={true}
              readOnly={false}
              options={[
                {
                  id: "be9f259f-ca22-4184-bb05-0fd4c0bd9e87",
                  label: currentLang.value === "en" ? "female" : "أنثى",
                },
                {
                  id: "408a14d0-fb95-4df0-a0d4-9042dc52ad4f",
                  label: currentLang.value === "en" ? "male" : "ذكر",
                },
              ]}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="country" sx={{ marginBottom: 1 }}>
              {t("country")}*
            </InputLabel>
            <AutoCompleteController
              control={genericControl}
              readOnly={false}
              fieldName="country"
              required={true}
              options={countries}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${(
                      option as CountryType
                    ).code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${(
                      option as CountryType
                    ).code.toLowerCase()}.png`}
                    alt=""
                  />
                  {(option as CountryType).label} (
                  {(option as CountryType).code})
                </Box>
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="city" sx={{ marginBottom: 1 }}>
              {t("city")}*
            </InputLabel>
            <TextFieldController
              id="city"
              control={genericControl}
              fieldName="city"
              required={true}
              readOnly={false}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel htmlFor="phone" sx={{ marginBottom: 1 }}>
              {t("Mobile")}*
            </InputLabel>
            <TextFieldController
              id="phone"
              control={genericControl}
              fieldName="phone"
              required={true}
              readOnly={false}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="remarks" sx={{ marginBottom: 1 }}>
              {t("Notes")}
            </InputLabel>
            <TextFieldController
              id="remarks"
              control={genericControl}
              fieldName="remarks"
              required={false}
              readOnly={false}
              multiline={true}
              rows={4}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            sx={{
              width: "50%",
            }}
            disabled={isSubmitting || !isDirty}
            variant="contained"
          >
            {t("addButton")}
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              width: "50%",
              backgroundColor: "white",
              border: "1px solid rgba(31, 123, 244, 1)",
            }}
          >
            {t("cancel")}
          </Button>
        </Box>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
