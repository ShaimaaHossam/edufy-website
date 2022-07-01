import { useState, useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";

import { useUploadFilesMutation } from "../../../redux/services/general";

import { useTranslation } from "react-i18next";

import {
  Box,
  Typography,
  Button,
  Tooltip,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { mdiDeleteOutline } from "@mdi/js";

import IconButton from "../IconButton";

const Input = forwardRef(
  ({ className, placeholder, value, isUploading, ...restProp }, ref) => {
    const { t } = useTranslation();

    const files = [...value];

    return (
      <Box
        className={className}
        sx={{ position: "relative", overflow: "hidden" }}
      >
        {isUploading ? (
          <Typography color="text.secondary">{t("uploading")}</Typography>
        ) : !files.length ? (
          <Typography color="text.secondary">{placeholder}</Typography>
        ) : files.length === 1 ? (
          <Typography>{files[0].name}</Typography>
        ) : (
          <Tooltip
            placement="bottom-start"
            title={
              <Box maxWidth={320}>
                {files.map((file) => (
                  <Typography key={file.name} variant="body2" noWrap>
                    {file.name}
                  </Typography>
                ))}
              </Box>
            }
          >
            <Typography display="inline" zIndex={1}>
              {t("files_count", { count: files.length })}
            </Typography>
          </Tooltip>
        )}

        <Box
          ref={ref}
          component="input"
          sx={{
            position: "absolute",
            top: -22,
            width: "100%",
            height: "calc(100% + 22px)",
          }}
          {...restProp}
        />
      </Box>
    );
  }
);

function FileInputSync({
  name,
  label,
  required,
  placeholder,
  accept,
  isMulti,

  onChange,

  error,
  helperText,

  ...restProps
}) {
  const { t } = useTranslation();

  const [uploadFiles] = useUploadFilesMutation();

  const inputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState(null);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    if (!selectedFiles) return;

    const onChange = onChangeRef.current;
    setIsUploading(true);
    uploadFiles([...selectedFiles])
      .unwrap()
      .then(({ data }) => {
        const paths = data.map(({ path }) => path);

        onChange(isMulti ? paths : paths[0]);
        setIsUploading(false);
        setUploadErrors(null);
      })
      .catch(({ data: { errors } }) => {
        setIsUploading(false);
        setUploadErrors(errors);
      });
  }, [selectedFiles, uploadFiles, isMulti]);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={error || !!uploadErrors}
      required={required}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <OutlinedInput
        id={name}
        type="file"
        name={name}
        label={label}
        placeholder={placeholder || isMulti ? t("dndFiles") : t("dndFile")}
        inputRef={inputRef}
        inputComponent={Input}
        inputProps={{ accept, multiple: isMulti, isUploading }}
        value={selectedFiles || ""}
        onChange={({ target: { files } }) =>
          files?.length && setSelectedFiles(files)
        }
        startAdornment={
          <InputAdornment position="start">
            <Button size="small" onClick={() => inputRef.current.click()}>
              {t("browse")}
            </Button>
          </InputAdornment>
        }
        endAdornment={
          !!selectedFiles?.length && (
            <InputAdornment position="end">
              {isUploading ? (
                <CircularProgress color="secondary" size={20} />
              ) : (
                <IconButton
                  aria-label="remove files"
                  edge="end"
                  size="medium"
                  icon={mdiDeleteOutline}
                  onClick={() => {
                    setSelectedFiles(null);
                    isMulti ? onChange([]) : onChange("");
                  }}
                />
              )}
            </InputAdornment>
          )
        }
        {...restProps}
      />

      {(!!uploadErrors || !!helperText) && (
        <FormHelperText>
          {!!uploadErrors ? Object.values(uploadErrors).join(", ") : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

FileInputSync.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  accept: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,

  onChange: PropTypes.func.isRequired,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default FileInputSync;
