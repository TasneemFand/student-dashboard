/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderOptionState,
  Avatar,
  CircularProgress,
  Popper,
} from "@mui/material";
import { CustomizedTextField } from "./FormFieldsStyles";
import { isEmpty } from "lodash";

type AutoCompleteController = {
  control: Control<Record<string, unknown>>;
  readOnly: boolean;
  fieldName: keyof Record<string, unknown>;
  label?: string;
  options: string[] | Array<Record<string, string>>;
  renderOption?:
    | ((
        props: React.HTMLAttributes<HTMLLIElement>,
        option: string | Record<string, string>,
        state: AutocompleteRenderOptionState
      ) => React.ReactNode)
    | undefined;
  required?: boolean;
  multiple?: boolean;
  disableCloseOnSelect?: boolean;
  limitTags?: number;
  anOpenLoad?: boolean;
  renderTags?:
    | ((
        value: (string | Record<string, string>)[],
        getTagProps: AutocompleteRenderGetTagProps,
        ownerState: AutocompleteOwnerState<
          string | Record<string, string>,
          boolean,
          false,
          false,
          "div"
        >
      ) => React.ReactNode)
    | undefined;
  filterSelectedOptions?: boolean;
  disableClearable?: boolean;
  getOptionDisabled?:
    | ((option: string | Record<string, string>) => boolean)
    | undefined;
  renderWithImg?: boolean;
  displayedValue?: Record<string, any>;
  otherValue?: Record<string, any>
};

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const AutoCompleteController = ({
  filterSelectedOptions = true,
  disableClearable,
  renderWithImg,
  displayedValue,
  otherValue,
  ...props
}: AutoCompleteController) => {
  const [open, setOpen] = useState(false);
  const [autoCompleteoptions, setOptions] = useState<
    string[] | Record<string, string>[]
  >(props.options);
  const loading = props.anOpenLoad && open && autoCompleteoptions.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(props.options);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    if (!props.anOpenLoad && open) {
      setOptions(props.options);
    }
  }, [open, props.anOpenLoad]);

  return (
    <Controller
      control={props.control}
      name={props.fieldName}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        return (
          <Autocomplete
            {...props}
            {...field}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={loading}
            disablePortal
            multiple={props.multiple}
            disableCloseOnSelect={props.disableCloseOnSelect}
            limitTags={props.limitTags}
            options={autoCompleteoptions}
            filterSelectedOptions={filterSelectedOptions}
            value={
              displayedValue && (displayedValue as any).id === value ? displayedValue.label :
              otherValue ? otherValue :
              value as
                | string
                | null
                | Record<string, string>
                | (string | Record<string, string>)[]
            }
            getOptionLabel={(option: string | Record<string, string>) =>
              typeof option === "object" ? option?.label : option
            }
            sx={{
              flexBasis: "32%",
              "& .MuiAutocomplete-endAdornment": {
                display: props.readOnly ? "none" : "flex",
              },
            }}
            ListboxProps={{
              style: {
                maxHeight: 150,
              },
            }}
            // ChipProps={{
            //   sx: {
            //     fontSize: "1rem",
            //   },
            // }}
            PopperComponent={({ style, ...props }) => (
              <Popper
                {...props}
                style={{ ...style, height: 0 }} // width is passed in 'style' prop
              />
            )}
            componentsProps={{
              popper: {
                sx: {
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                },
              },
            }}
            onChange={(_e, value) => {
              onChange(
                value ? (typeof value === "object" ?  (value as any).id ? (value as any).id : (value as any).label : value) : ""
              );
            }}
            isOptionEqualToValue={(option, value) => {
              return typeof option === "object" && typeof value === "object"
                ? option.label === value.label
                : option === value;
            }}
            renderOption={props.renderOption}
            readOnly={props.readOnly}
            renderInput={(params) => {
              return (
                <>
                  <CustomizedTextField
                    {...params}
                    error={Boolean(error)}
                    helperText={error?.message}
                    required={props.required}
                    label={props.label}
                    readOnly={props.readOnly}
                    variant={props.readOnly ? "standard" : "outlined"}
                    InputProps={{
                      ...params.InputProps,
                      required:
                        props.required && props.multiple
                          ? (value as (string | Record<string, string>)[])
                              .length <= 0
                          : props.required
                            ? !value
                            : false,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {disableClearable
                            ? null
                            : params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                      startAdornment: !isEmpty(value) ? (
                        renderWithImg ? (
                          <Avatar
                            sx={{ width: 24, height: 24, marginRight: "4px" }}
                          />
                        ) : (
                          <div style={{ maxHeight: 110, overflowY: "scroll" }}>
                            {params.InputProps.startAdornment}
                          </div>
                        )
                      ) : (
                        params.InputProps.startAdornment
                      ),
                    }}
                  />
                </>
              );
            }}
          />
        );
      }}
    />
  );
};
