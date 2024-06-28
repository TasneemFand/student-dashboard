import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, InputLabel } from "@mui/material";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { LoginFormSchema, TLoginForm } from "./login-schema";
import { TextFieldController } from "../../../../components/FormComponents";
import { useAuthContext } from "../../../../auth/hooks";
import { useRouter, useSearchParams } from "../../../../routes/hooks";
import { PATH_AFTER_LOGIN } from "../../../../config-global";
import toast, { Toaster } from "react-hot-toast";

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      password: "",
      userName: "",
    },
  });

  const { login } = useAuthContext();

  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const onSubmit: SubmitHandler<TLoginForm> = async (values) => {
    try {
      await login?.(values.userName, values.password);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      toast.error("Error happend");
      reset();
    }
  };

  const genericControl = control as unknown as Control<Record<string, unknown>>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel htmlFor="User Name" sx={{ marginBottom: 1 }}>
            User Name
          </InputLabel>
          <TextFieldController
            id="name"
            control={genericControl}
            fieldName="userName"
            required={true}
            readOnly={false}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="Password" sx={{ marginBottom: 1 }}>
            Password
          </InputLabel>
          <TextFieldController
            id="Password"
            control={genericControl}
            fieldName="password"
            required={true}
            type="password"
            readOnly={false}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 3 }}>
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting || !isDirty}
          variant="contained"
        >
          Sign In
        </Button>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
};
