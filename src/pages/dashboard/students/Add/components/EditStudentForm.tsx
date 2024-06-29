import { Control, SubmitHandler, useForm } from "react-hook-form";
import { TNewForm, FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Grid, InputLabel } from "@mui/material";
import { TextFieldController } from "../../../../../components/FormComponents";
import { useLocales, useTranslate } from "../../../../../locales";
import { DatePickerController } from "../../../../../components/FormComponents/DatePickerController";
import { AutoCompleteController } from "../../../../../components/FormComponents/AutoCompleteController";
import { CountryType, countries } from "../../../../../constants/countries";
import toast, { Toaster } from "react-hot-toast";
import { useGetStudents } from "../../components/Table/hooks/useGetStudents";
import { useGetStudentById } from "../hooks/useGetStudentById";
import { useEffect } from "react";
import { useEdit } from "../hooks/useEdit";

type TProps = {
  handleClose: () => void;
};
export const EditStudentForm = ({ handleClose }: TProps) => {
  const { data, isLoading } = useGetStudentById();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<TNewForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      birthDate: "",
      city: "",
      country: "",
      firstName: "",
      gender: "",
      grade: "",
      lastName: data?.lastName || "",
      phone: data?.phone || "",
      remarks: data?.remarks || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        birthDate: data.birthDate || "",
        city: data.city || "",
        country: data.country || "",
        firstName: data.firstName || "",
        gender: data.gender.id || "",
        grade: data.grade.id || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        remarks: data.remarks || "",
      });
    }
  }, [data, reset]);

  const { refetch } = useGetStudents();
  const { handleEditStudent } = useEdit();

  const onSubmit: SubmitHandler<TNewForm> = async (values) => {
    try {
      await handleEditStudent(values);
      toast.success("Successfully Modified");
      refetch();
      handleClose();
    } catch (error) {
      toast.error("Error happend");
    }
  };
  const genericControl = control as unknown as Control<Record<string, unknown>>;
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  if (isLoading) {
    return (
      <Box sx={{width: "600px", height: "639.2px", display: "flex", justifyContent: "center"}}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
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
              displayedValue={{id: data?.grade.id, label: currentLang.value === "en" ? data?.grade.translations?.[0].name :  data?.grade.translations?.[1].name}}
              otherValue={{id: data?.grade.id === "42fd7157-0b75-4184-a0f8-efceb52bb4a7" ? "5b7d2349-d5e1-406d-a9ee-2b6b03b9bdbf" : "42fd7157-0b75-4184-a0f8-efceb52bb4a7", 
                label: data?.grade.id === "42fd7157-0b75-4184-a0f8-efceb52bb4a7" ? currentLang.value === "en" ? "Grade 9" : "الصف التاسع" : currentLang.value === "en" ? "Grade 8" : "الصف الثامن"
              }}
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
              displayedValue={{id: data?.gender.id, label: currentLang.value === "en" ? data?.gender.translations?.[1].name :  data?.gender.translations?.[0].name}}
              otherValue={{id: data?.gender.id === "be9f259f-ca22-4184-bb05-0fd4c0bd9e87" ? "408a14d0-fb95-4df0-a0d4-9042dc52ad4f" : "be9f259f-ca22-4184-bb05-0fd4c0bd9e87", 
                label: data?.grade.id === "be9f259f-ca22-4184-bb05-0fd4c0bd9e87" ? currentLang.value === "en" ? "male" : "ذكر" : currentLang.value === "en" ? "female" : "أنثى"
              }}
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
            {t("Save")}
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
